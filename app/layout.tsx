import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'EdTech Marketplace | Singapore Schools',
  description: 'Explore and discover innovative EdTech practices from across Singapore schools, supporting your digital transformation journey.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-animated">
        {children}
      </body>
    </html>
  );
}
