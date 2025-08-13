import { NextResponse } from "next/server";
import { getSession, setSession } from "@/lib/server/auth";

export async function POST(req: Request) {
  const s = getSession();
  if(!s) return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
  const body = await req.json();
  if(body.plan === 'pro'){ s.plan = 'pro'; setSession(s); }
  return NextResponse.json({ ok: true, plan: s.plan });
}
