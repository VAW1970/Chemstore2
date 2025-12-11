import { NextResponse } from 'next/server'

export async function POST() {
  // Criar resposta de logout
  const response = NextResponse.json({
    message: 'Logout realizado com sucesso'
  })

  // Remover cookie HttpOnly
  response.cookies.set('token', '', {
    httpOnly: true,
    maxAge: 0,
    path: '/',
  })

  return response
}

