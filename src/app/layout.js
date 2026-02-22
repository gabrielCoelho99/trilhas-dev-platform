import './globals.css';
import { AuthProvider } from '@/components/AuthProvider';
import Sidebar from '@/components/Sidebar';

export const metadata = {
  title: 'Trilhas Dev — Plataforma de Estudos',
  description: 'Aprenda Backend com JavaScript e Node.js — Do básico ao avançado',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          <div className="layout">
            <Sidebar />
            <main className="main-content">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
