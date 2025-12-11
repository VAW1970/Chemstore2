import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient, UnitType, VerificationStatus } from '@prisma/client'
import jwt from 'jsonwebtoken'

// Força a renderização dinâmica (SSR) para esta rota também
export const dynamic = 'force-dynamic';

const prisma = new PrismaClient()

// GET - Buscar reagente por ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const reagent = await prisma.reagent.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    if (!reagent) {
      return NextResponse.json(
        { error: 'Reagente não encontrado' },
        { status: 404 }
      )
    }

    // Calcular status
    const now = new Date()
    const thirtyDaysFromNow = new Date()
    thirtyDaysFromNow.setDate(now.getDate() + 30)

    let status = 'valid'
    if (reagent.expirationDate <= now) {
      status = 'expired'
    } else if (reagent.expirationDate <= thirtyDaysFromNow) {
      status = 'warning'
    }

    return NextResponse.json({
      ...reagent,
      status,
    })
  } catch (error) {
    console.error('Erro ao buscar reagente:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// PUT - Atualizar reagente
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Obter token do header Authorization
    const authHeader = request.headers.get('authorization')
    console.log('🔍 API PUT - Header Authorization recebido:', authHeader ? 'Presente' : 'Ausente')
    
    if (!authHeader) {
      console.error('❌ API PUT - Header Authorization não encontrado')
      return NextResponse.json(
        { error: 'Usuário não autenticado' },
        { status: 401 }
      )
    }

    // Extrair token (remover "Bearer " se presente)
    const token = authHeader.startsWith('Bearer ') 
      ? authHeader.substring(7).trim() 
      : authHeader.trim()

    console.log('🔑 API PUT - Token extraído (primeiros 50 chars):', token.substring(0, 50) + '...')
    console.log('🔑 API PUT - Tamanho do token:', token.length)

    if (!token || token.length < 10) {
      console.error('❌ API PUT - Token inválido ou muito curto')
      return NextResponse.json(
        { error: 'Token inválido ou malformado' },
        { status: 401 }
      )
    }

    // Verificar token e obter dados do usuário
    let userId, userRole

    try {
      if (!process.env.JWT_SECRET) {
        console.error('❌ API PUT - JWT_SECRET não configurado')
        return NextResponse.json(
          { error: 'Erro de configuração do servidor' },
          { status: 500 }
        )
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET) as any
      userId = decoded.userId
      userRole = decoded.role
      console.log('✅ API PUT - Token válido para usuário:', userId)
    } catch (error: any) {
      console.error('❌ API PUT - Erro ao verificar token:', error.message)
      console.error('❌ API PUT - Token completo:', token)
      return NextResponse.json(
        { error: `Token inválido: ${error.message}` },
        { status: 401 }
      )
    }

    const reagent = await prisma.reagent.findUnique({
      where: { id: params.id },
    })

    if (!reagent) {
      return NextResponse.json(
        { error: 'Reagente não encontrado' },
        { status: 404 }
      )
    }

    // Verificar permissões (apenas admin pode editar reagentes de outros usuários)
    if (userRole !== 'ADMIN' && reagent.userId !== userId) {
      return NextResponse.json(
        { error: 'Você não tem permissão para editar este reagente' },
        { status: 403 }
      )
    }

    const {
      name,
      brand,
      quantity,
      unit,
      expirationDate,
      location,
      shelf,
      sector,
      verification,
      notes,
    } = await request.json()

    // Validações
    if (quantity !== undefined && quantity <= 0) {
      return NextResponse.json(
        { error: 'Quantidade deve ser maior que zero' },
        { status: 400 }
      )
    }

    const updateData: any = {}
    if (name) updateData.name = name
    if (brand) updateData.brand = brand
    if (quantity) updateData.quantity = parseFloat(quantity)
    if (unit) updateData.unit = unit as UnitType
    if (expirationDate) updateData.expirationDate = new Date(expirationDate)
    if (location) updateData.location = location
    if (shelf) updateData.shelf = shelf
    if (sector) updateData.sector = sector
    if (verification) updateData.verification = verification as VerificationStatus
    if (notes !== undefined) updateData.notes = notes

    const updatedReagent = await prisma.reagent.update({
      where: { id: params.id },
      data: updateData,
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(updatedReagent)
  } catch (error) {
    console.error('Erro ao atualizar reagente:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// DELETE - Remover reagente
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Obter token do header Authorization
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Usuário não autenticado' },
        { status: 401 }
      )
    }

    // Extrair token (remover "Bearer " se presente)
    const token = authHeader.startsWith('Bearer ') 
      ? authHeader.substring(7).trim() 
      : authHeader.trim()

    if (!token || token.length < 10) {
      return NextResponse.json(
        { error: 'Token inválido ou malformado' },
        { status: 401 }
      )
    }

    // Verificar token e obter dados do usuário
    let userId, userRole

    try {
      if (!process.env.JWT_SECRET) {
        return NextResponse.json(
          { error: 'Erro de configuração do servidor' },
          { status: 500 }
        )
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET) as any
      userId = decoded.userId
      userRole = decoded.role
    } catch (error: any) {
      console.error('Erro ao verificar token:', error.message)
      return NextResponse.json(
        { error: `Token inválido: ${error.message}` },
        { status: 401 }
      )
    }

    const reagent = await prisma.reagent.findUnique({
      where: { id: params.id },
    })

    if (!reagent) {
      return NextResponse.json(
        { error: 'Reagente não encontrado' },
        { status: 404 }
      )
    }

    // Verificar permissões (apenas admin pode deletar reagentes de outros usuários)
    if (userRole !== 'ADMIN' && reagent.userId !== userId) {
      return NextResponse.json(
        { error: 'Você não tem permissão para deletar este reagente' },
        { status: 403 }
      )
    }

    await prisma.reagent.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'Reagente removido com sucesso' })
  } catch (error) {
    console.error('Erro ao deletar reagente:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

