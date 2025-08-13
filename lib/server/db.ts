export type Role = 'admin'|'user';
export type User = { id: string; email: string; name: string; passwordHash: string; plan: 'free'|'pro'; role: Role };
export type Usage = { userId: string; usedCredits: number; creditLimit: number };
export type Notification = { id: string; userId: string; title: string; read: boolean; createdAt: string };

let idCounter = 2;
function uid(){ return String(idCounter++); }

// naive in-memory store (StackBlitz-friendly)
const users: User[] = [
  { id: '1', email: 'demo@demo.com', name: 'Illimitatus', passwordHash: 'demo123', plan: 'free', role: 'user' },
  { id: '99', email: 'admin@demo.com', name: 'Admin', passwordHash: 'admin123', plan: 'pro', role: 'admin' },
];
const usage: Usage[] = [
  { userId: '1', usedCredits: 25000, creditLimit: 35000 },
  { userId: '99', usedCredits: 62500, creditLimit: 100000 },
];
const notifications: Notification[] = [
  { id: 'n1', userId: '1', title: 'Novo lead via chatbot', read: false, createdAt: new Date(Date.now()-2*60*60*1000).toISOString() },
  { id: 'n2', userId: '1', title: 'Plano gratuito — 68% dos créditos usados', read: false, createdAt: new Date(Date.now()-26*60*60*1000).toISOString() },
  { id: 'n3', userId: '1', title: 'Post publicado: "5 Dicas de SEO em 2025"', read: true, createdAt: new Date(Date.now()-72*60*60*1000).toISOString() },
];

export const db = {
  findUserByEmail(email: string){ return users.find(u => u.email === email) || null; },
  getUser(id: string){ return users.find(u => u.id === id) || null; },
  listUsers(){ return users.slice(); },
  createUser(input: { email: string; name: string; password: string; role?: Role; plan?: 'free'|'pro'; }){
    if (users.some(u => u.email === input.email)) throw new Error('Email já existe');
    const user: User = {
      id: uid(),
      email: input.email,
      name: input.name,
      passwordHash: input.password,
      plan: input.plan || 'free',
      role: input.role || 'user',
    };
    users.push(user);
    usage.push({ userId: user.id, usedCredits: 0, creditLimit: user.plan === 'pro' ? 100000 : 35000 });
    return user;
  },
  getUsage(userId: string){ return usage.find(u => u.userId === userId) || null; },
  getNotifications(userId: string){ return notifications.filter(n => n.userId === userId).sort((a,b)=> b.createdAt.localeCompare(a.createdAt)); },
  upgradePlan(userId: string){
    const u = users.find(x=>x.id===userId);
    if(!u) return;
    u.plan = 'pro';
    const us = usage.find(x=>x.userId===userId);
    if(us) us.creditLimit = 100000;
  }
};
