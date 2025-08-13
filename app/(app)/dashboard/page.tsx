'use client';
import { useEffect, useState } from 'react';
import { Settings, MessageSquare, Mail } from 'lucide-react';

type Data = {
  usedCredits: number;
  creditLimit: number;
  features: { id: string; title: string; description: string; icon: 'settings'|'message'|'mail' }[];
};

function ProgressRing({ value = 68 }: { value?: number }) {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  return (
    <svg viewBox="0 0 120 120" className="w-24 h-24">
      <circle cx="60" cy="60" r={radius} strokeWidth="12" className="fill-none stroke-neutral-200" />
      <circle cx="60" cy="60" r={radius} strokeWidth="12" strokeLinecap="round" style={{ strokeDasharray: circumference, strokeDashoffset: offset }} className="fill-none stroke-cyan-600 transition-[stroke-dashoffset] duration-700" />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="fill-neutral-800 font-semibold text-xl">{value}%</text>
    </svg>
  );
}

function Icon({name}:{name:'settings'|'message'|'mail'}){
  const cls = 'h-5 w-5';
  if(name==='settings') return <Settings className={cls}/>;
  if(name==='message') return <MessageSquare className={cls}/>;
  return <Mail className={cls}/>;
}

export default function DashboardPage(){
  const [data, setData] = useState<Data | null>(null);
  useEffect(()=>{ fetch('/api/dashboard').then(r=>r.json()).then(setData); },[]);
  if(!data) return <div className="p-4">A carregar...</div>;
  const pct = Math.round((data.usedCredits / data.creditLimit) * 100);

  return (
    <div>
      <header className="px-1">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Hi, Illimitatus</h1>
        <p className="mt-2 max-w-3xl text-neutral-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </header>

      <section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
          <div className="grid grid-cols-[1fr_auto] gap-4 items-center">
            <div>
              <div className="text-sm text-neutral-600">Used Credits:</div>
              <div className="mt-1 text-4xl font-extrabold tracking-tight">{data.usedCredits.toLocaleString('de-DE')}</div>
              <div className="mt-1 text-xs text-neutral-500">You reached <span className="font-medium">{data.usedCredits.toLocaleString('de-DE')}</span>/{data.creditLimit.toLocaleString('de-DE')}</div>
            </div>
            <ProgressRing value={pct} />
          </div>
        </div>

        <div className="rounded-2xl bg-cyan-600/80 p-5 shadow-sm ring-1 ring-black/5 text-white">
          <div className="flex h-full items-center justify-between gap-4">
            <div>
              <div className="text-xs/4 uppercase tracking-wider opacity-90">Subscription</div>
              <div className="mt-1 text-3xl font-extrabold">{pct >= 100 ? 'LIMIT REACHED' : 'FREE PLAN'}</div>
            </div>
            <a href="/upgrade" className="rounded-xl bg-white/90 px-4 py-2 text-sm font-semibold text-neutral-900 hover:bg-white">Upgrade Your Plan</a>
          </div>
        </div>
      </section>

      <section className="mt-6 space-y-4">
        {data.features.map(f => (
          <div key={f.id} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <div className="flex items-start gap-4">
              <div className="grid h-10 w-10 place-content-center rounded-xl bg-neutral-100 text-neutral-700"><Icon name={f.icon}/></div>
              <div className="flex-1">
                <div className="text-base font-semibold text-neutral-800">{f.title}</div>
                <p className="mt-1 text-sm text-neutral-600">{f.description}</p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
