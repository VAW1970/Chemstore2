import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      )
    }

    // Buscar usuário
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 401 }
      )
    }

    // Verificar senha
    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 401 }
      )
    }

    // Gerar token JWT
    const tokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    }
    console.log('🔐 API Login - Gerando token para:', tokenPayload)

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!, { expiresIn: '24h' })
    console.log('✅ API Login - Token gerado (primeiros 50 chars):', token.substring(0, 50) + '...')

    // Retornar usuário sem senha
    const { password: _, ...userWithoutPassword } = user

    // Criar resposta com cookie HttpOnly
    const response = NextResponse.json({
      message: 'Login realizado com sucesso',
      user: userWithoutPassword,
      token: token, // Incluir token no body para localStorage
    })

    // Definir cookie HttpOnly seguro
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: false, // Desenvolvimento - sempre false
      sameSite: 'lax',
      maxAge: 86400, // 24 horas
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Erro no login:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
