import { NextResponse } from "next/server";
import { db } from "@/lib/server/db";
import { encodeSession } from "@/lib/server/session";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const user = db.findUserByEmail(email);
  if(!user || user.passwordHash !== password) {
    return NextResponse.json({ message: "Credenciais inválidas" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  const value = encodeSession({ userId: user.id, email: user.email, name: user.name, plan: user.plan, role: user.role });
  res.cookies.set("session", value, { httpOnly: true, sameSite: "lax", path: "/" });
  return res;
}
