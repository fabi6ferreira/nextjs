import { NextResponse } from "next/server";
import { getSession } from "@/lib/server/auth";

export async function POST(req: Request) {
  const s = getSession();
  if(!s) return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
  const { message } = await req.json();
  const lower = (message || '').toLowerCase();
  let reply = "Podes repetir?";
  if(lower.includes('preço') || lower.includes('plan')) reply = "O plano PRO custa 0€/mês nesta demo 😉";
  else if(lower.includes('olá') || lower.includes('ola')) reply = "Olá! Como estás?";
  else reply = "Recebi: '" + message + "'. Em breve respondo melhor!";
  return NextResponse.json({ reply });
}
