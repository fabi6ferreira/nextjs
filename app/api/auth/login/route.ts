import { NextResponse } from "next/server";
import { setSession } from "@/lib/server/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  if (email === "demo@demo.com" && password === "demo123") {
    setSession({ userId: "1", email, name: "Illimitatus", plan: "free" });
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ message: "Credenciais inválidas" }, { status: 401 });
}
