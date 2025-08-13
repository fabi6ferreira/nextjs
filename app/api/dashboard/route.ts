import { NextResponse } from "next/server";
import { getSession } from "@/lib/server/auth";
import { getDashboardData } from "@/lib/server/data";

export async function GET() {
  const s = getSession();
  if(!s) return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
  const data = getDashboardData(s);
  return NextResponse.json(data);
}
