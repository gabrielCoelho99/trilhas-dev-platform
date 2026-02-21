import './globals.css';
import Sidebar from '@/components/Sidebar';

export const metadata = {
  title: 'Trilhas Dev — Plataforma de Estudos',
  description: 'Aprenda Backend com JavaScript e Node.js — Do básico ao avançado',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="layout">
          <Sidebar />
          <main className="main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
