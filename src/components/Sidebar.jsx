'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { desafios } from '@/data/desafios';
import { aulasMap } from '@/data/aulas';
import { aulasExtraLogica } from '@/data/desafioExtra';
import { getTotalProgressAsync, isCompletedAsync } from '@/lib/progress';
import { useAuth } from '@/components/AuthProvider';
import { useTheme } from '@/components/ThemeProvider';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut, loading: authLoading } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [progress, setProgress] = useState({ completed: 0, total: 52, percentage: 0 });
  const [completedMap, setCompletedMap] = useState({});
  const isLoginPage = pathname === '/login';

  const getAulasFor = (slug) => {
    if (slug === 'extra-logica') {
      return aulasExtraLogica.map(a => ({ id: a.id, titulo: a.titulo }));
    }
    return aulasMap[slug] || [];
  };

  useEffect(() => {
    if (authLoading || isLoginPage) return;

    const loadProgress = async () => {
      const p = await getTotalProgressAsync();
      setProgress(p);
    };
    loadProgress();

    // Expand current desafio
    for (const d of desafios) {
      if (pathname.includes(d.slug)) {
        setExpanded(d.slug);
        break;
      }
    }
  }, [pathname, authLoading, user, isLoginPage]);

  useEffect(() => {
    if (authLoading || !expanded || isLoginPage) return;

    const loadCompleted = async () => {
      const aulas = getAulasFor(expanded);
      const map = {};
      for (const aula of aulas) {
        map[`${expanded}-${aula.id}`] = await isCompletedAsync(expanded, aula.id);
      }
      setCompletedMap(prev => ({ ...prev, ...map }));
    };
    loadCompleted();
  }, [expanded, authLoading, user, isLoginPage]);

  // Don't render sidebar on login page
  if (isLoginPage) return null;

  const toggleExpand = (slug) => {
    setExpanded(expanded === slug ? null : slug);
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
    router.refresh();
  };

  const userName = user?.user_metadata?.nome || user?.email?.split('@')[0] || 'Usuário';

  return (
    <>
      {/* Mobile Header */}
      <div className="mobile-header">
        <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)}>
          ☰
        </button>
        <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Trilhas Dev</span>
      </div>

      {/* Overlay */}
      <div 
        className={`sidebar-overlay ${mobileOpen ? 'open' : ''}`} 
        onClick={() => setMobileOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link href="/" className="sidebar-logo" onClick={() => setMobileOpen(false)}>
            <div className="sidebar-logo-icon">🚀</div>
            <div>
              <div className="sidebar-logo-text">Trilhas Dev</div>
              <div className="sidebar-logo-sub">Backend com JavaScript</div>
            </div>
          </Link>
        </div>

        {/* User Info */}
        {user && (
          <div className="sidebar-user">
            <div className="sidebar-user-avatar">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{userName}</div>
              <button className="sidebar-logout-btn" onClick={handleSignOut}>
                Sair
              </button>
            </div>
          </div>
        )}

        <nav className="sidebar-nav">
          {desafios.map((desafio) => {
            const aulas = getAulasFor(desafio.slug);
            const isActive = pathname.includes(desafio.slug);
            const isExpanded = expanded === desafio.slug;

            return (
              <div key={desafio.slug} className="sidebar-section">
                <div
                  className={`sidebar-section-header ${isActive ? 'active' : ''}`}
                  onClick={() => toggleExpand(desafio.slug)}
                  role="button"
                  tabIndex={0}
                >
                  <span className="sidebar-section-icon">{desafio.emoji}</span>
                  <span>{desafio.numero}</span>
                  <span style={{ marginLeft: 'auto', fontSize: '0.7rem', opacity: 0.5 }}>
                    {isExpanded ? '▾' : '▸'}
                  </span>
                </div>

                {isExpanded && (
                  <ul className="sidebar-lessons">
                    <li>
                      <Link
                        href={`/desafio/${desafio.slug}`}
                        className={`sidebar-lesson-link ${pathname === `/desafio/${desafio.slug}` ? 'active' : ''}`}
                        onClick={() => setMobileOpen(false)}
                      >
                        📋 Visão Geral
                      </Link>
                    </li>
                    {aulas.map((aula) => {
                      const completed = completedMap[`${desafio.slug}-${aula.id}`];
                      const aulaPath = `/desafio/${desafio.slug}/aula/${aula.id}`;
                      return (
                        <li key={aula.id}>
                          <Link
                            href={aulaPath}
                            className={`sidebar-lesson-link ${pathname === aulaPath ? 'active' : ''}`}
                            onClick={() => setMobileOpen(false)}
                          >
                            <span className={`sidebar-lesson-check ${completed ? 'completed' : ''}`}>
                              {completed ? '✓' : ''}
                            </span>
                            <span>{aula.titulo}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </nav>

        {/* Links Rápidos */}
        <div style={{ padding: '0.5rem 1rem', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>Links Rápidos</div>
          <Link href="/mapa" className={`sidebar-lesson-link ${pathname === '/mapa' ? 'active' : ''}`} onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '0.4rem 0.5rem', fontSize: '0.85rem' }}>🗺️ Mapa da Trilha</Link>
          <Link href="/glossario" className={`sidebar-lesson-link ${pathname === '/glossario' ? 'active' : ''}`} onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '0.4rem 0.5rem', fontSize: '0.85rem' }}>📖 Glossário</Link>
          <Link href="/conquistas" className={`sidebar-lesson-link ${pathname === '/conquistas' ? 'active' : ''}`} onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '0.4rem 0.5rem', fontSize: '0.85rem' }}>🏆 Conquistas</Link>
          <button className="theme-toggle" onClick={toggleTheme} style={{ width: '100%', marginTop: '0.5rem' }}>
            <span className="theme-toggle-icon">{theme === 'dark' ? '☀️' : '🌙'}</span>
            {theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
          </button>
        </div>

        <div className="sidebar-progress">
          <div className="sidebar-progress-label">
            Progresso geral: {progress.completed}/{progress.total} aulas ({progress.percentage}%)
          </div>
          <div className="sidebar-progress-bar">
            <div 
              className="sidebar-progress-fill" 
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
        </div>
      </aside>
    </>
  );
}
