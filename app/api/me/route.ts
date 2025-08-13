import { NextResponse } from "next/server";
import { readSession } from "@/lib/server/session";

export async function GET() {
  const s = readSession();
  if(!s) return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
  return NextResponse.json(s);
}
