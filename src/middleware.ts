import { NextResponse  } from 'next/server'
import { NextRequest } from 'next/server'
import { getToken } from "next-auth/jwt"

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const secret = process.env.NEXT_AUTH_SECRET
    const token =await getToken({req:request , secret});
    const url = request.nextUrl
    // console.log("req inside middlware is : ",request)
    // console.log("token inside middleware is : ",token)
    // console.log("url inside middleware is : ",url)
    console.log("request . url is : ",request.url)

    if(token &&
        (
            url.pathname.startsWith('/sign-in') ||
            url.pathname.startsWith('/sign-up') ||
            url.pathname.startsWith('/verify/:path*') ||
            url.pathname.startsWith('/dashboard/:path*') 
            //url.pathname.startsWith('/dashboard/:path*')
        )
    ){  const red = NextResponse.redirect(new URL('/dashboard', request.url))
      console.log("redirecte is  : ",red)
        return NextResponse.redirect(new URL('/dashboard', request.url))

    }

    if (!token && url.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
      }
    
    return NextResponse.next();
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/sign-in',
    '/sign-up',
    '/',
    '/dashboard/:path*',
    '/verify/:path*'
  ],
}