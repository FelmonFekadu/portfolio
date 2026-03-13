import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const realm = 'Private Portfolio'

function unauthorized() {
  return new NextResponse('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': `Basic realm="${realm}", charset="UTF-8"`,
      'Cache-Control': 'private, no-store',
    },
  })
}

function readBasicAuthCredentials(authorization: string | null) {
  if (!authorization?.startsWith('Basic ')) {
    return null
  }

  const encoded = authorization.slice('Basic '.length)

  try {
    const decoded = atob(encoded)
    const separatorIndex = decoded.indexOf(':')

    if (separatorIndex === -1) {
      return null
    }

    return {
      username: decoded.slice(0, separatorIndex),
      password: decoded.slice(separatorIndex + 1),
    }
  } catch {
    return null
  }
}

export function middleware(request: NextRequest) {
  const username = process.env.BASIC_AUTH_USERNAME?.trim()
  const password = process.env.BASIC_AUTH_PASSWORD?.trim()

  if (!username || !password) {
    return new NextResponse('Site access is not configured.', {
      status: 503,
      headers: {
        'Cache-Control': 'private, no-store',
      },
    })
  }

  const credentials = readBasicAuthCredentials(request.headers.get('authorization'))

  if (!credentials) {
    return unauthorized()
  }

  if (credentials.username !== username || credentials.password !== password) {
    return unauthorized()
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/:path*',
}
