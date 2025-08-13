'use client';
import { useState } from 'react';

type Msg = { role: 'user' | 'bot'; text: string };

export default function ChatbotPage(){
  const [messages, setMessages] = useState<Msg[]>([{role:'bot', text:'Olá! Como posso ajudar?'}]);
  const [input, setInput] = useState('');

  async function send(){
    const text = input.trim();
    if(!text) return;
    setInput('');
    setMessages(m => [...m, {role:'user', text}]);
    try{
      const res = await fetch('/api/chatbot', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ message: text }) });
      const data = await res.json();
      setMessages(m => [...m, {role:'bot', text: data.reply}]);
    }catch{ setMessages(m => [...m, {role:'bot', text: 'Erro a contactar o servidor.'}]); }
  }

  return (
    <div className="flex h-[70vh] flex-col rounded-2xl bg-white ring-1 ring-black/5 shadow-sm">
      <div className="flex-1 overflow-auto p-4 space-y-2">
        {messages.map((m,i)=>(
          <div key={i} className={m.role==='user' ? 'text-right' : 'text-left'}>
            <span className={m.role==='user' ? 'inline-block rounded-2xl bg-cyan-600/10 text-cyan-800 px-3 py-2' : 'inline-block rounded-2xl bg-neutral-100 px-3 py-2'}>{m.text}</span>
          </div>
        ))}
      </div>
      <div className="border-t p-3 flex gap-2">
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter') send(); }} placeholder="Escreve uma mensagem..." className="flex-1 rounded-xl border px-3 py-2" />
        <button onClick={send} className="rounded-xl bg-neutral-900 px-4 py-2 font-semibold text-white hover:bg-neutral-800">Enviar</button>
      </div>
    </div>
  );
}
