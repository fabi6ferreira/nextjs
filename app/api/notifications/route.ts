import { NextResponse } from "next/server";
import { getSession } from "@/lib/server/auth";
import { getNotifications } from "@/lib/server/data";

export async function GET() {
  const s = getSession();
  if(!s) return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
  return NextResponse.json(getNotifications(s));
}
