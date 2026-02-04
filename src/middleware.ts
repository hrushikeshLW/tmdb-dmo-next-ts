import { NextRequest, NextResponse } from "next/server";
import { TOKEN } from "./common/constant";

export async function middleware(request: NextRequest) {
    const token = request.cookies.get(TOKEN)?.value;

    if (!token && request.nextUrl.pathname !== '/auth/login') {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    if (token && request.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/home', request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};