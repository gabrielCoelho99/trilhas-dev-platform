'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { desafios } from '@/data/desafios';
import { getDesafioProgress, getTotalProgress } from '@/lib/progress';

export default function Home() {
  const [totalProgress, setTotalProgress] = useState({ completed: 0, total: 52, percentage: 0 });
  const [desafioProgress, setDesafioProgress] = useState({});

  useEffect(() => {
    setTotalProgress(getTotalProgress(desafios));
    const progMap = {};
    for (const d of desafios) {
      progMap[d.slug] = getDesafioProgress(d.slug, d.totalAulas);
    }
    setDesafioProgress(progMap);
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="home-hero">
        <div className="home-badge">✨ Trilhas Inova 2024</div>
        <h1 className="home-title">Trilhas Dev</h1>
        <p className="home-subtitle">
          Plataforma completa de estudos de Backend com JavaScript e Node.js.
          Do básico ao deploy — com teoria, exemplos e exercícios práticos.
        </p>

        <div className="home-stats">
          <div className="home-stat">
            <div className="home-stat-number">6</div>
            <div className="home-stat-label">Desafios</div>
          </div>
          <div className="home-stat">
            <div className="home-stat-number">52</div>
            <div className="home-stat-label">Aulas</div>
          </div>
          <div className="home-stat">
            <div className="home-stat-number">{totalProgress.percentage}%</div>
            <div className="home-stat-label">Concluído</div>
          </div>
        </div>
      </section>

      {/* Cards */}
      <div className="desafio-grid">
        {desafios.map((desafio) => {
          const prog = desafioProgress[desafio.slug] || { completed: 0, total: desafio.totalAulas, percentage: 0 };
          return (
            <Link 
              key={desafio.slug} 
              href={`/desafio/${desafio.slug}`} 
              className="desafio-card"
            >
              <div className="desafio-card-header">
                <span className="desafio-card-emoji">{desafio.emoji}</span>
                <div>
                  <div className="desafio-card-number">{desafio.numero}</div>
                  <div className="desafio-card-title">{desafio.titulo}</div>
                </div>
              </div>
              <p className="desafio-card-desc">{desafio.descricao}</p>
              <div className="desafio-card-meta">
                <span className="desafio-card-lessons">
                  {prog.completed}/{desafio.totalAulas} aulas • {prog.percentage}%
                </span>
                <div className="desafio-card-progress">
                  <div 
                    className="desafio-card-progress-fill" 
                    style={{ width: `${prog.percentage}%` }}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
