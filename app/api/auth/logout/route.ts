import { NextResponse, NextRequest } from "next/server";
import { clearSession } from "@/lib/server/auth";

export async function POST(req: NextRequest) {
  clearSession();
  const url = new URL('/login', req.url);
  return NextResponse.redirect(url);
}
