import { getSession } from "@/lib/server/auth";
import { redirect } from "next/navigation";

export default function Home() {
  const s = getSession();
  redirect(s ? "/dashboard" : "/login");
}
