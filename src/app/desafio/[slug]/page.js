'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { getDesafio } from '@/data/desafios';
import { aulasMap } from '@/data/aulas';
import { aulasExtraLogica } from '@/data/desafioExtra';
import { getDesafioProgressAsync, isCompletedAsync } from '@/lib/progress';
import { useAuth } from '@/components/AuthProvider';
import ProgressBanner from '@/components/ProgressBanner';
import Certificate from '@/components/Certificate';

export default function DesafioPage({ params }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const desafio = getDesafio(slug);
  const { user, loading: authLoading } = useAuth();
  const [progress, setProgress] = useState({ completed: 0, total: 0, percentage: 0 });
  const [completedMap, setCompletedMap] = useState({});

  const aulas = slug === 'extra-logica'
    ? aulasExtraLogica.map(a => ({ id: a.id, titulo: a.titulo }))
    : (aulasMap[slug] || []);

  useEffect(() => {
    if (authLoading || !desafio) return;

    const load = async () => {
      setProgress(await getDesafioProgressAsync(slug, desafio.totalAulas));
      const map = {};
      for (const aula of aulas) {
        map[aula.id] = await isCompletedAsync(slug, aula.id);
      }
      setCompletedMap(map);
    };
    load();
  }, [slug, desafio, authLoading, user]);

  if (!desafio) {
    return (
      <div>
        <Link href="/" className="desafio-page-back">← Voltar</Link>
        <h1>Desafio não encontrado</h1>
      </div>
    );
  }

  return (
    <>
      <div className="desafio-page-header">
        <Link href="/" className="desafio-page-back">← Voltar ao início</Link>
        <h1 className="desafio-page-title">
          {desafio.emoji} {desafio.titulo}
        </h1>
        <p className="desafio-page-desc">
          {desafio.descricao}
        </p>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
          {progress.completed}/{progress.total} aulas concluídas • {progress.percentage}%
        </p>
      </div>

      <ProgressBanner completed={progress.completed} total={progress.total} />

      {progress.percentage === 100 && (
        <Certificate
          userName={user?.user_metadata?.nome || user?.email?.split('@')[0]}
          desafioTitulo={desafio.titulo}
          totalAulas={desafio.totalAulas}
        />
      )}

      <div className="aula-list">
        {aulas.map((aula) => {
          const completed = completedMap[aula.id] || false;
          return (
            <Link
              key={aula.id}
              href={`/desafio/${slug}/aula/${aula.id}`}
              className="aula-list-item"
            >
              <div className={`aula-list-number ${completed ? 'completed' : ''}`}>
                {completed ? '✓' : aula.id}
              </div>
              <span className="aula-list-title">{aula.titulo}</span>
              <span className="aula-list-arrow">→</span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
