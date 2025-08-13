import { NextResponse } from "next/server";
import { readSession } from "@/lib/server/session";
import { db } from "@/lib/server/db";

export async function GET() {
  const s = readSession();
  if(!s) return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
  const list = db.getNotifications(s.userId).map(n => ({ id: n.id, title: n.title, time: n.createdAt, read: n.read }));
  return NextResponse.json(list);
}
