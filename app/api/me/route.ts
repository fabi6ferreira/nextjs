import { NextResponse } from "next/server";
import { getSession } from "@/lib/server/auth";

export async function GET() {
  const s = getSession();
  if(!s) return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
  return NextResponse.json(s);
}
