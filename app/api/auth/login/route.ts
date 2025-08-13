import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  if (email === "demo@demo.com" && password === "demo123") {
    const session = { userId: "1", email, name: "Illimitatus", plan: "free" };
    const res = NextResponse.json({ ok: true });
    const value = Buffer.from(JSON.stringify(session), "utf-8").toString("base64");
    res.cookies.set("session", value, { httpOnly: true, sameSite: "lax", path: "/" });
    return res;
  }
  return NextResponse.json({ message: "Credenciais inválidas" }, { status: 401 });
}
