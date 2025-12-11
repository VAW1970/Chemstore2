import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient, UnitType, VerificationStatus } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

// GET - Listar reagentes
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') // valid, warning, expired

    const skip = (page - 1) * limit

    let where: any = {}

    // Filtro de busca
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { brand: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } },
        { sector: { contains: search, mode: 'insensitive' } },
      ]
    }

    // Filtro por status de vencimento
    if (status) {
      const now = new Date()
      const thirtyDaysFromNow = new Date()
      thirtyDaysFromNow.setDate(now.getDate() + 30)

      switch (status) {
        case 'valid':
          where.expirationDate = { gt: thirtyDaysFromNow }
          break
        case 'warning':
          where.expirationDate = {
            gt: now,
            lte: thirtyDaysFromNow
          }
          break
        case 'expired':
          where.expirationDate = { lte: now }
          break
      }
    }

    const [reagents, total] = await Promise.all([
      prisma.reagent.findMany({
        where,
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.reagent.count({ where }),
    ])

    // Adicionar status calculado
    const reagentsWithStatus = reagents.map(reagent => {
      const now = new Date()
      const thirtyDaysFromNow = new Date()
      thirtyDaysFromNow.setDate(now.getDate() + 30)

      let status = 'valid'
      if (reagent.expirationDate <= now) {
        status = 'expired'
      } else if (reagent.expirationDate <= thirtyDaysFromNow) {
        status = 'warning'
      }

      return {
        ...reagent,
        status,
      }
    })

    return NextResponse.json({
      reagents: reagentsWithStatus,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Erro ao listar reagentes:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// POST - Criar reagente
export async function POST(request: NextRequest) {
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

    // Verificar token e obter userId
    let userId

    try {
      if (!process.env.JWT_SECRET) {
        return NextResponse.json(
          { error: 'Erro de configuração do servidor' },
          { status: 500 }
        )
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET) as any
      userId = decoded.userId
    } catch (error: any) {
      console.error('Erro ao verificar token:', error.message)
      return NextResponse.json(
        { error: `Token inválido: ${error.message}` },
        { status: 401 }
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
      notes,
    } = await request.json()

    // Validações
    if (!name || !brand || !quantity || !unit || !expirationDate || !location || !shelf || !sector) {
      return NextResponse.json(
        { error: 'Todos os campos obrigatórios devem ser preenchidos' },
        { status: 400 }
      )
    }

    if (quantity <= 0) {
      return NextResponse.json(
        { error: 'Quantidade deve ser maior que zero' },
        { status: 400 }
      )
    }

    const reagent = await prisma.reagent.create({
      data: {
        name,
        brand,
        quantity: parseFloat(quantity),
        unit: unit as UnitType,
        expirationDate: new Date(expirationDate),
        location,
        shelf,
        sector,
        userId,
        notes,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(reagent, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar reagente:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

