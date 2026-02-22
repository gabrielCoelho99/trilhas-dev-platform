'use client';

export default function ProgressBanner({ completed, total }) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const getPhrase = (pct) => {
    if (pct === 0) return '🌱 Comece sua jornada! Cada aula concluída é um passo em direção ao seu objetivo.';
    if (pct <= 10) return '🚀 Ótimo começo! Você já deu o primeiro passo. Continue assim!';
    if (pct <= 25) return '📚 Seu esforço está rendendo! Você já passou de 1/4 do caminho.';
    if (pct <= 50) return '🔥 Metade do caminho! Você é dedicado demais! Continue firme.';
    if (pct <= 75) return '⚡ Imparável! Mais da metade concluída. A reta final se aproxima!';
    if (pct < 100) return '🏆 Quase lá! Só faltam algumas aulas para completar tudo!';
    return '🎉 PARABÉNS! Você concluiu 100% das aulas! Você é uma lenda!';
  };

  return (
    <div className="progress-banner">
      <div className="progress-banner-top">
        <span className="progress-label">
          Progresso Geral — {completed}/{total} aulas
        </span>
        <span className="progress-percentage">{percentage}%</span>
      </div>
      <div className="progress-banner-bar">
        <div className="progress-banner-fill" style={{ width: `${percentage}%` }} />
      </div>
      <p className="progress-phrase">{getPhrase(percentage)}</p>
    </div>
  );
}
