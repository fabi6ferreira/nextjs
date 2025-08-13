export type User = { id: string; email: string; name: string; passwordHash: string; plan: 'free'|'pro' };
export type Usage = { userId: string; usedCredits: number; creditLimit: number };
export type Notification = { id: string; userId: string; title: string; read: boolean; createdAt: string };

// naive in-memory store (StackBlitz-friendly)
const users: User[] = [
  { id: '1', email: 'demo@demo.com', name: 'Illimitatus', passwordHash: 'demo123', plan: 'free' },
];
const usage: Usage[] = [{ userId: '1', usedCredits: 25000, creditLimit: 35000 }];
const notifications: Notification[] = [
  { id: 'n1', userId: '1', title: 'Novo lead via chatbot', read: false, createdAt: new Date(Date.now()-2*60*60*1000).toISOString() },
  { id: 'n2', userId: '1', title: 'Plano gratuito — 68% dos créditos usados', read: false, createdAt: new Date(Date.now()-26*60*60*1000).toISOString() },
  { id: 'n3', userId: '1', title: 'Post publicado: "5 Dicas de SEO em 2025"', read: true, createdAt: new Date(Date.now()-72*60*60*1000).toISOString() },
];

export const db = {
  findUserByEmail(email: string){ return users.find(u => u.email === email) || null; },
  getUser(id: string){ return users.find(u => u.id === id) || null; },
  getUsage(userId: string){ return usage.find(u => u.userId === userId) || null; },
  getNotifications(userId: string){ return notifications.filter(n => n.userId === userId).sort((a,b)=> b.createdAt.localeCompare(a.createdAt)); },
  upgradePlan(userId: string){
    const u = users.find(x=>x.userId===undefined && x.id===userId) || users.find(x=>x.id===userId);
    if(!u) return;
    u.plan = 'pro';
    const us = usage.find(x=>x.userId===userId);
    if(us) us.creditLimit = 100000;
  }
};
