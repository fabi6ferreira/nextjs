import { NextResponse, type NextRequest } from "next/server";
const PROTECTED = [/^\/dashboard/, /^\/notifications/, /^\/chatbot/, /^\/upgrade/, /^\/admin/];

export function middleware(req: NextRequest) {
  const cookie = req.cookies.get('session')?.value;
  const { pathname } = req.nextUrl;

  const isProtected = PROTECTED.some(r => r.test(pathname));
  const isLogin = pathname === '/login';

  let role: 'admin'|'user'|null = null;
  if (cookie) {
    try { role = JSON.parse(Buffer.from(cookie, 'base64').toString('utf-8')).role; } catch {}
  }

  if(isProtected && !cookie){
    const url = req.nextUrl.clone(); url.pathname = '/login'; return NextResponse.redirect(url);
  }
  if(isLogin && cookie){
    const url = req.nextUrl.clone(); url.pathname = '/dashboard'; return NextResponse.redirect(url);
  }
  if(pathname.startsWith('/admin') && role !== 'admin'){
    const url = req.nextUrl.clone(); url.pathname = '/dashboard'; return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
export const config = { matcher: ["/((?!_next|api|static|.*\\..*).*)"] };
