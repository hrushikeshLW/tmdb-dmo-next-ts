import { NextRequest, NextResponse } from "next/server";
import { auth } from "../auth";
import { TOKEN } from "./common/constant";

export async function middleware(request: NextRequest) {
    const session = await auth();
    const token = request.cookies.get(TOKEN)?.value;
    const isAuthenticated = !!session || !!token;

    if (!isAuthenticated && request.nextUrl.pathname !== '/auth/login') {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    if (isAuthenticated && request.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/home', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
    ],
};