import { cookies } from "next/headers";

export type Session = {
  userId: string;
  email: string;
  name: string;
  plan: "free" | "pro";
};

const SESSION_COOKIE = "session";

export function getSession(): Session | null {
  try {
    const raw = cookies().get(SESSION_COOKIE)?.value;
    if (!raw) return null;
    const s: Session = JSON.parse(Buffer.from(raw, "base64").toString("utf-8"));
    return s;
  } catch {
    return null;
  }
}

export function setSession(s: Session) {
  const val = Buffer.from(JSON.stringify(s), "utf-8").toString("base64");
  cookies().set(SESSION_COOKIE, val, { httpOnly: true, sameSite: "lax", path: "/" });
}

export function clearSession() {
  cookies().delete(SESSION_COOKIE);
}
