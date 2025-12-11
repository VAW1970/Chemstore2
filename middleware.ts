import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Rotas públicas que não precisam de autenticação
  const publicRoutes = ['/login', '/api/auth/login', '/api/auth/me', '/api/auth/logout']

  // TEMPORÁRIO: Permitir acesso a todas as rotas do dashboard (autenticação feita pelo componente)
  const dashboardRoutes = ['/dashboard', '/reagents', '/reports', '/users', '/settings']
  const isDashboardRoute = dashboardRoutes.some(route => pathname.startsWith(route))

  // Permitir acesso a arquivos estáticos (imagens, ícones, etc)
  const isStaticFile = /\.(png|ico|jpg|jpeg|svg|gif|css|js|woff|woff2|ttf|eot)$/i.test(pathname)

  const isPublicRoute = publicRoutes.some(route =>
    pathname.startsWith(route)
  ) || isDashboardRoute || isStaticFile

  if (isPublicRoute) {
    return NextResponse.next()
  }

  // Verificar se existe token (header Authorization - usado pelo client)
  const token = request.headers.get('authorization')?.replace('Bearer ', '')

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Verificar se o token é válido
  try {
    jwt.verify(token, process.env.JWT_SECRET!)
  } catch (error) {
    // Token inválido, redirecionar para login
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any

    // Adicionar informações do usuário ao header da requisição
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('user-id', decoded.userId)
    requestHeaders.set('user-role', decoded.role)

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
