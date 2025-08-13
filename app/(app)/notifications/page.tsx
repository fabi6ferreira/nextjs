'use client';
import { useEffect, useState } from 'react';

type Notification = { id: string; title: string; time: string; read: boolean };

export default function NotificationsPage() {
  const [items, setItems] = useState<Notification[]>([]);

  useEffect(()=>{
    fetch('/api/notifications').then(r=>r.json()).then(setItems);
  },[]);

  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-bold">Notifications</h1>
      <ul className="space-y-3">
        {items.map(n => (
          <li key={n.id} className="rounded-xl bg-white p-4 ring-1 ring-black/5 shadow-sm flex items-center justify-between">
            <div>
              <div className="font-medium">{n.title}</div>
              <div className="text-xs text-neutral-500">{n.time}</div>
            </div>
            {!n.read && <span className="text-xs rounded-full bg-cyan-600/10 text-cyan-700 px-2 py-1">new</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
