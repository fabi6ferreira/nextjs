'use client';
import { useEffect, useState } from 'react';

export default function UpgradePage(){
  const [plan, setPlan] = useState<'free'|'pro'>('free');

  useEffect(()=>{
    fetch('/api/me').then(r=>r.json()).then(u=> setPlan(u.plan));
  },[]);

  async function upgrade(){
    const res = await fetch('/api/plan', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ plan: 'pro' }) });
    if(res.ok){ setPlan('pro'); alert('Plano atualizado para PRO ✅'); }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Upgrade de Plano</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-white p-6 ring-1 ring-black/5 shadow-sm">
          <h2 className="text-xl font-semibold">FREE</h2>
          <p className="mt-2 text-sm text-neutral-600">Até 35.000 créditos/mês</p>
          <div className="mt-4">
            <button disabled className="rounded-xl bg-neutral-200 px-4 py-2 text-neutral-600">Plano atual</button>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 ring-1 ring-black/5 shadow-sm">
          <h2 className="text-xl font-semibold">PRO</h2>
          <p className="mt-2 text-sm text-neutral-600">Até 100.000 créditos/mês + features avançadas</p>
          <div className="mt-4">
            <button onClick={upgrade} disabled={plan==='pro'} className="rounded-xl bg-cyan-600 px-4 py-2 font-semibold text-white disabled:opacity-50">
              {plan==='pro' ? 'Já és PRO' : 'Fazer upgrade'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
