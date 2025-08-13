import "./globals.css";

export const metadata = { title: "Illimitatus — Dashboard", description: "Demo com auth + fluxos" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
}
