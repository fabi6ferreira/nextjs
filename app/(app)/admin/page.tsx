'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type U = { id: string; email: string; name: string; role: 'admin'|'user'; plan: 'free'|'pro' };

export default function AdminPage(){
  const [users, setUsers] = useState<U[]>([]);
  const [form, setForm] = useState({ email:'', name:'', password:'', role:'user', plan:'free' } as any);
  const [error, setError] = useState<string|null>(null);
  const router = useRouter();

  async function load(){
    const r = await fetch('/api/admin/users'); 
    if(r.status===403){ router.replace('/dashboard'); return; }
    const data = await r.json(); setUsers(data);
  }
  useEffect(()=>{ load(); },[]);

  async function createUser(e: React.FormEvent){
    e.preventDefault();
    setError(null);
    const res = await fetch('/api/admin/users', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) });
    if(!res.ok){ const d = await res.json().catch(()=>({message:'Erro'})); setError(d.message); return; }
    setForm({ email:'', name:'', password:'', role:'user', plan:'free' });
    await load();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin — Gestão de Utilizadores</h1>

      <form onSubmit={createUser} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 space-y-3 max-w-xl">
        <div className="grid grid-cols-2 gap-3">
          <input className="rounded-xl border p-2" placeholder="Nome" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
          <input className="rounded-xl border p-2" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
          <input className="rounded-xl border p-2 col-span-2" type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} />
          <select className="rounded-xl border p-2" value={form.role} onChange={e=>setForm({...form, role:e.target.value})}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <select className="rounded-xl border p-2" value={form.plan} onChange={e=>setForm({...form, plan:e.target.value})}>
            <option value="free">Free</option>
            <option value="pro">Pro</option>
          </select>
        </div>
        {error && <div className="text-sm text-red-600">{error}</div>}
        <button className="rounded-xl bg-neutral-900 px-4 py-2 font-semibold text-white hover:bg-neutral-800">Criar utilizador</button>
      </form>

      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
        <div className="text-sm font-semibold mb-3">Utilizadores ({users.length})</div>
        <div className="overflow-auto">
          <table className="min-w-[600px] w-full text-sm">
            <thead><tr className="text-left text-neutral-500"><th className="py-2">Nome</th><th>Email</th><th>Role</th><th>Plano</th></tr></thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="border-t">
                  <td className="py-2">{u.name}</td>
                  <td>{u.email}</td>
                  <td><span className={`rounded-full px-2 py-0.5 text-xs ${u.role==='admin'?'bg-amber-100 text-amber-800':'bg-neutral-100 text-neutral-700'}`}>{u.role}</span></td>
                  <td>{u.plan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
