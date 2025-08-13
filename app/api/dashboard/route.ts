import { NextResponse } from "next/server";
import { readSession } from "@/lib/server/session";
import { db } from "@/lib/server/db";

export async function GET() {
  const s = readSession();
  if(!s) return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
  const u = db.getUsage(s.userId);
  if(!u) return NextResponse.json({ message: 'No usage' }, { status: 404 });
  const features = [
    { id: "seo", title: "One-Time Click SEO-Optimized Wordpress Post Publishing", description: "Publica posts otimizados para SEO num clique.", icon: "settings" as const },
    { id: "chatbot", title: "Chatbot 24/7 - WhatsApp", description: "Atende clientes automaticamente no WhatsApp.", icon: "message" as const },
    { id: "emails", title: "Cold Emails Generator", description: "Gera emails a frio personalizados.", icon: "mail" as const },
  ];
  return NextResponse.json({ usedCredits: u.usedCredits, creditLimit: u.creditLimit, features });
}
