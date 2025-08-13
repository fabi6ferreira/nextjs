import { NextResponse } from "next/server";
import { readSession } from "@/lib/server/session";

export async function POST(req: Request) {
  const s = readSession();
  if(!s) return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
  const { message } = await req.json();
  const n8n = process.env.N8N_CHATBOT_URL;
  if(n8n){
    try {
      const r = await fetch(n8n, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ message, user: s.email }) });
      const data = await r.json().catch(()=>({}));
      const reply = (data && (data.reply || data.message)) || "Sem resposta do n8n.";
      return NextResponse.json({ reply });
    } catch {
      return NextResponse.json({ reply: "Erro a contactar o n8n." });
    }
  }
  const lower = (message || '').toLowerCase();
  let reply = "Podes repetir?";
  if(lower.includes('preço') || lower.includes('plan')) reply = "O plano PRO custa 0€/mês nesta demo 😉";
  else if(lower.includes('olá') || lower.includes('ola')) reply = "Olá! Como estás?";
  else reply = "Recebi: '" + message + "'.";
  return NextResponse.json({ reply });
}
