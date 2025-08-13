import type { Session } from "./auth";

export type DashboardData = {
  usedCredits: number;
  creditLimit: number;
  features: { id: string; title: string; description: string; icon: "settings"|"message"|"mail" }[];
};

export function getDashboardData(session: Session): DashboardData {
  const creditLimit = session.plan === "pro" ? 100_000 : 35_000;
  const usedCredits = session.plan === "pro" ? 62_500 : 25_000;
  return {
    usedCredits,
    creditLimit,
    features: [
      { id: "seo", title: "One-Time Click SEO-Optimized Wordpress Post Publishing", description: "Publica posts otimizados para SEO com meta tags e estrutura correta, num clique.", icon: "settings" },
      { id: "chatbot", title: "Chatbot 24/7 - WhatsApp", description: "Atende clientes automaticamente no WhatsApp com respostas rápidas e fallback para humano.", icon: "message" },
      { id: "emails", title: "Cold Emails Generator", description: "Gera emails a frio personalizados com base no ICP e tom de voz.", icon: "mail" },
    ],
  };
}

export type Notification = { id: string; title: string; time: string; read: boolean };

export function getNotifications(_session: Session): Notification[] {
  return [
    { id: "n1", title: "Novo lead via chatbot", time: "há 2h", read: false },
    { id: "n2", title: "Plano gratuito — 68% dos créditos usados", time: "há 1 dia", read: false },
    { id: "n3", title: "Post publicado: "5 Dicas de SEO em 2025"", time: "há 3 dias", read: true },
  ];
}
