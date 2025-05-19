import './globals.css'; 
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pokémon Search',
  description: 'Search for Pokémon using the Pokémon GraphQL API',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}