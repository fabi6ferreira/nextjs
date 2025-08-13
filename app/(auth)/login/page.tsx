'use client';
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("demo@demo.com");
  const [password, setPassword] = useState("demo123");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    setLoading(false);
    if (res.ok) {
      window.location.href = '/dashboard';
    } else {
      const data = await res.json().catch(()=>({message:'Credenciais inválidas'}));
      setError(data.message);
    }
  }

  return (
    <div className="min-h-screen grid place-items-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
        <h1 className="text-xl font-bold">Entrar</h1>
        <p className="mt-1 text-sm text-neutral-600">Usa <code>demo@demo.com</code> / <code>demo123</code> para testar.</p>
        <div className="mt-4 space-y-3">
          <input className="w-full rounded-xl border p-2" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
          <input type="password" className="w-full rounded-xl border p-2" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
          {error && <div className="text-sm text-red-600">{error}</div>}
          <button disabled={loading} className="w-full rounded-xl bg-neutral-900 px-4 py-2 font-semibold text-white hover:bg-neutral-800 disabled:opacity-50">{loading? 'A entrar...' : 'Entrar'}</button>
        </div>
      </form>
    </div>
  );
}
