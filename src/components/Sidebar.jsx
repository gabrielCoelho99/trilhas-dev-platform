'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { desafios } from '@/data/desafios';
import { aulasMap } from '@/data/aulas';
import { aulasExtraLogica } from '@/data/desafioExtra';
import { isCompleted, getTotalProgress } from '@/lib/progress';

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [progress, setProgress] = useState({ completed: 0, total: 52, percentage: 0 });

  useEffect(() => {
    setProgress(getTotalProgress(desafios));

    // Expand current desafio
    for (const d of desafios) {
      if (pathname.includes(d.slug)) {
        setExpanded(d.slug);
        break;
      }
    }
  }, [pathname]);

  const getAulasFor = (slug) => {
    if (slug === 'extra-logica') {
      return aulasExtraLogica.map(a => ({ id: a.id, titulo: a.titulo }));
    }
    return aulasMap[slug] || [];
  };

  const toggleExpand = (slug) => {
    setExpanded(expanded === slug ? null : slug);
  };

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
                      const completed = isCompleted(desafio.slug, aula.id);
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
