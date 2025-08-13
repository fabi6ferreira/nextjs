'use client';
import Link from "next/link";
import { LogOut } from "lucide-react";
import BackButton from "@/components/back-button";
import { usePathname, useRouter } from "next/navigation";

const navBase = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/notifications", label: "Notifications" },
  { href: "/chatbot", label: "Chatbot 24/7" },
  { href: "/upgrade", label: "Upgrade Plan" },
];

import { useEffect, useState } from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(()=>{ fetch('/api/me').then(r=>r.json()).then(u=> setIsAdmin(u.role==='admin')).catch(()=>setIsAdmin(false)); },[]);
  const nav = isAdmin ? [...navBase, { href: '/admin', label: 'Admin' }] : navBase;
  const pathname = usePathname();
  const router = useRouter();

  async function logout(){
    await fetch('/api/auth/logout', { method:'POST' });
    router.replace('/login');
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl p-4 md:p-8">
        <div className="flex gap-6">
          <aside className="w-[260px] shrink-0 hidden md:block">
            <div className="sticky top-6 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
              <div className="flex items-center gap-3 rounded-xl bg-neutral-50 p-3">
                <div className="h-12 w-12 rounded-full bg-neutral-200" />
                <div className="flex-1">
                  <div className="text-sm font-semibold">Illimitatus</div>
                  <div className="text-xs text-neutral-500">Agency</div>
                </div>
              </div>

              <div className="mt-6">
                <div className="px-3 text-xs font-medium text-neutral-500">MENU</div>
                <nav className="mt-3 space-y-1">
                  {nav.map((it) => (
                    <Link key={it.href} href={it.href} className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium ${pathname===it.href? 'bg-cyan-600/10 text-cyan-700 ring-1 ring-cyan-600/20':'text-neutral-700 hover:bg-neutral-50'}`}>
                      <span>{it.label}</span>
                    </Link>
                  ))}
                </nav>

                <div className="mt-6 border-t pt-4">
                  <button onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50" type="button">
                    <span className="grid h-9 w-9 place-content-center rounded-lg bg-neutral-100"><LogOut className="h-4 w-4"/></span>
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1"><div className="mb-4"><BackButton /></div>{children}</main>
        </div>
      </div>
    </div>
  );
}
