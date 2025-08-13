import "./globals.css";

export const metadata = { title: "Illimitatus — Dashboard", description: "Next.js demo stackblitz-ready" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
}
