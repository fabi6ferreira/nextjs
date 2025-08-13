import { NextResponse } from "next/server";
import { readSession, encodeSession } from "@/lib/server/session";
import { db } from "@/lib/server/db";

export async function POST() {
  const s = readSession();
  if(!s) return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
  db.upgradePlan(s.userId);
  const updated = { ...s, plan: 'pro' as const };
  const res = NextResponse.json({ ok: true, plan: 'pro' });
  res.cookies.set("session", encodeSession(updated), { httpOnly: true, sameSite: "lax", path: "/" });
  return res;
}
