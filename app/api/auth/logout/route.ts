import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const url = new URL('/login', req.url);
  const res = NextResponse.redirect(url);
  res.cookies.set("session", "", { path: "/", expires: new Date(0) });
  return res;
}
