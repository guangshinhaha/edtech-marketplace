import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'EdTech Marketplace',
  description: 'A marketplace where you can explore and discover EdTech practices from across Singapore schools',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50">
        {children}
      </body>
    </html>
  );
}
