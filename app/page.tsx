import { readSession } from "@/lib/server/session";
import { redirect } from "next/navigation";

export default function Home() {
  const s = readSession();
  redirect(s ? "/dashboard" : "/login");
}
