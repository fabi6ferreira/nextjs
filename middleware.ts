import { NextResponse, type NextRequest } from "next/server";
const PROTECTED = [/^\/dashboard/, /^\/notifications/, /^\/chatbot/, /^\/upgrade/];

export function middleware(req: NextRequest) {
  const has = req.cookies.get('session');
  const { pathname } = req.nextUrl;
  const isProtected = PROTECTED.some(r => r.test(pathname));
  const isLogin = pathname === '/login';

  if(isProtected && !has){
    const url = req.nextUrl.clone(); url.pathname = '/login'; return NextResponse.redirect(url);
  }
  if(isLogin && has){
    const url = req.nextUrl.clone(); url.pathname = '/dashboard'; return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
export const config = { matcher: ["/((?!_next|api|static|.*\\..*).*)"] };
