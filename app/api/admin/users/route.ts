import { NextResponse } from "next/server";
import { readSession, encodeSession } from "@/lib/server/session";
import { db } from "@/lib/server/db";

export async function GET() {
  const s = readSession();
  if(!s || s.role !== 'admin') return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  const users = db.listUsers().map(u => ({ id: u.id, email: u.email, name: u.name, role: u.role, plan: u.plan }));
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const s = readSession();
  if(!s || s.role !== 'admin') return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  const body = await req.json();
  try {
    const user = db.createUser({ email: body.email, name: body.name, password: body.password, role: body.role, plan: body.plan });
    return NextResponse.json({ ok: true, user: { id: user.id, email: user.email, name: user.name, role: user.role, plan: user.plan } });
  } catch (e:any) {
    return NextResponse.json({ message: e.message || 'Erro' }, { status: 400 });
  }
}
