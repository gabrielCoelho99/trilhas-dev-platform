'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { desafios } from '@/data/desafios';
import { useAuth } from '@/components/AuthProvider';
import { getDesafioProgressAsync } from '@/lib/progress';

export default function MapaPage() {
  const { user, loading } = useAuth();
  const [progress, setProgress] = useState({});

  useEffect(() => {
    if (loading) return;
    const loadProgress = async () => {
      const prog = {};
      for (const d of desafios) {
        const result = await getDesafioProgressAsync(d.slug, d.totalAulas);
        prog[d.slug] = {
          completed: result.completed,
          total: d.totalAulas,
          percentage: result.percentage,
        };
      }
      setProgress(prog);
    };
    loadProgress();
  }, [loading, user]);

  const getStatus = (slug) => {
    const p = progress[slug];
    if (!p) return 'locked';
    if (p.percentage === 100) return 'completed';
    if (p.completed > 0) return 'in-progress';
    return 'locked';
  };

  const getStatusText = (slug) => {
    const p = progress[slug];
    const status = getStatus(slug);
    if (status === 'completed') return '✅ Concluído';
    if (status === 'in-progress') return `${p.completed}/${p.total}`;
    return '🔒 Não iniciado';
  };

  return (
    <div className="trilha-map">
      <h1>🗺️ Mapa da Trilha</h1>

      <div className="trilha-map-path">
        {desafios.map((desafio, index) => (
          <div key={desafio.slug} style={{ display: 'contents' }}>
            {index > 0 && (
              <div className={`trilha-map-connector ${getStatus(desafios[index - 1].slug) === 'completed' ? 'completed' : ''}`} />
            )}
            <Link
              href={`/desafio/${desafio.slug}`}
              className={`trilha-map-node ${getStatus(desafio.slug)}`}
            >
              <span className="node-emoji">{desafio.emoji}</span>
              <div className="node-info">
                <h3>{desafio.numero}: {desafio.titulo}</h3>
                <p>{desafio.totalAulas} aulas</p>
              </div>
              <span className={`node-status ${getStatus(desafio.slug)}`}>
                {getStatusText(desafio.slug)}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
