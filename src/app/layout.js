import './globals.css';
import { AuthProvider } from '@/components/AuthProvider';
import Sidebar from '@/components/Sidebar';
import ThemeProvider from '@/components/ThemeProvider';

export const metadata = {
  title: 'Trilhas Dev — Plataforma de Estudos',
  description: 'Aprenda Backend com JavaScript e Node.js — Do básico ao avançado',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <ThemeProvider>
          <AuthProvider>
            <div className="layout">
              <Sidebar />
              <main className="main-content">
                {children}
              </main>
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
