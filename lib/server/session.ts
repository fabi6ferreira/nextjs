import { cookies } from "next/headers";

export type Session = { userId: string; email: string; name: string; plan: 'free'|'pro' };
const COOKIE = "session";

export function readSession(): Session | null {
  try {
    const raw = cookies().get(COOKIE)?.value;
    if(!raw) return null;
    return JSON.parse(Buffer.from(raw, 'base64').toString('utf-8')) as Session;
  } catch { return null; }
}

export function encodeSession(s: Session){ return Buffer.from(JSON.stringify(s), 'utf-8').toString('base64'); }
