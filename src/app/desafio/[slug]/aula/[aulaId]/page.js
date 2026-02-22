'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { getDesafio } from '@/data/desafios';
import { aulasMap } from '@/data/aulas';
import { aulasExtraLogica } from '@/data/desafioExtra';
import { aulasDesafio1 } from '@/data/desafio1';
import { aulasDesafio2 } from '@/data/desafio2';
import { aulasDesafio3 } from '@/data/desafio3';
import { aulasDesafio4 } from '@/data/desafio4';
import { aulasDesafio5 } from '@/data/desafio5';
import { isCompletedAsync, toggleCompleteAsync } from '@/lib/progress';
import { useAuth } from '@/components/AuthProvider';
import LessonContent from '@/components/LessonContent';

const conteudoMap = {
  'extra-logica': aulasExtraLogica,
  'logica-js': aulasDesafio1,
  'js-avancado': aulasDesafio2,
  'nodejs': aulasDesafio3,
  'express': aulasDesafio4,
  'backend-completo': aulasDesafio5,
};

function getAulaData(slug, aulaId) {
  const aulas = conteudoMap[slug];
  if (!aulas) return null;
  return aulas.find(a => a.id === aulaId) || null;
}

export default function AulaPage({ params }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const aulaId = parseInt(resolvedParams.aulaId);
  const desafio = getDesafio(slug);
  const { user, loading: authLoading } = useAuth();
  const [completed, setCompleted] = useState(false);

  const allAulas = slug === 'extra-logica'
    ? aulasExtraLogica.map(a => ({ id: a.id, titulo: a.titulo }))
    : (aulasMap[slug] || []);

  const aulaData = getAulaData(slug, aulaId);

  const currentIndex = allAulas.findIndex(a => a.id === aulaId);
  const prevAula = currentIndex > 0 ? allAulas[currentIndex - 1] : null;
  const nextAula = currentIndex < allAulas.length - 1 ? allAulas[currentIndex + 1] : null;
  const currentAula = allAulas[currentIndex];

  useEffect(() => {
    if (authLoading) return;
    const load = async () => {
      setCompleted(await isCompletedAsync(slug, aulaId));
    };
    load();
  }, [slug, aulaId, authLoading, user]);

  const handleToggle = async () => {
    const newState = await toggleCompleteAsync(slug, aulaId);
    setCompleted(newState);
  };

  if (!desafio || !currentAula) {
    return (
      <div>
        <Link href="/" className="desafio-page-back">← Voltar</Link>
        <h1>Aula não encontrada</h1>
      </div>
    );
  }

  return (
    <>
      <div className="aula-header">
        <div className="aula-breadcrumb">
          <Link href="/">Início</Link>
          <span>/</span>
          <Link href={`/desafio/${slug}`}>{desafio.numero}</Link>
          <span>/</span>
          <span>Aula {aulaId}</span>
        </div>

        <h1 className="aula-title">
          {desafio.emoji} Aula {aulaId}: {currentAula.titulo}
        </h1>

        <button
          className={`aula-complete-btn ${completed ? 'completed' : ''}`}
          onClick={handleToggle}
        >
          {completed ? '✓ Aula concluída' : '○ Marcar como concluída'}
        </button>
      </div>

      {/* Conteúdo da aula */}
      {aulaData && aulaData.conteudo ? (
        <LessonContent conteudo={aulaData.conteudo} />
      ) : (
        <div className="lesson-content">
          <div className="callout callout-info">
            <strong>📝 Em construção</strong>
            O conteúdo interativo desta aula está sendo preparado. Por enquanto, consulte o README do {desafio.numero} para o material completo desta aula.
          </div>
        </div>
      )}

      {/* Navegação */}
      <div className="aula-nav">
        {prevAula ? (
          <Link href={`/desafio/${slug}/aula/${prevAula.id}`} className="aula-nav-btn">
            <span className="aula-nav-label">← Anterior</span>
            <span className="aula-nav-title">{prevAula.titulo}</span>
          </Link>
        ) : (
          <div />
        )}
        {nextAula ? (
          <Link href={`/desafio/${slug}/aula/${nextAula.id}`} className="aula-nav-btn next">
            <span className="aula-nav-label">Próxima →</span>
            <span className="aula-nav-title">{nextAula.titulo}</span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </>
  );
}
