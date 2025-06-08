import './globals.css';
import { ReactNode } from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Carnet de contacts',
  description: 'Gestionnaire de contacts',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-gray-50">
        <nav className="bg-gray-100 p-4 shadow-md">
          <div className="container mx-auto flex space-x-4">
            <Link href="/contact" className="text-blue-600 hover:text-blue-800 font-medium">
              Liste des contacts
            </Link>
            <Link href="/contact/new" className="text-blue-600 hover:text-blue-800 font-medium">
              Ajouter un contact
            </Link>
          </div>
        </nav>
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}