import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const userInfoCookie = request.cookies.get('userInfo')?.value;

    if (userInfoCookie) {
        if (pathname === '/') {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        } else {
            return NextResponse.next();
        }
    } else {
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: ['/dashboard', '/sales/:path*', '/drivers', '/destinations/:path*', '/products/:path*', '/reports/:path*', '/worker-groups:path*'],
}