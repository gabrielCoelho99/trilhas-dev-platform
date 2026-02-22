'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase-browser';

export default function Quiz({ quiz, lessonKey }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  if (!quiz || quiz.length === 0) return null;

  const question = quiz[currentQ];

  const handleSelect = (index) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    if (index === question.correta) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < quiz.length - 1) {
      setCurrentQ(prev => prev + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setFinished(true);
      saveResult();
    }
  };

  const handleRetry = () => {
    setCurrentQ(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
  };

  const saveResult = async () => {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase.from('quiz_results').upsert({
        user_id: user.id,
        lesson_key: lessonKey,
        score: score + (selected === question.correta ? 1 : 0),
        total: quiz.length,
      }, { onConflict: 'user_id,lesson_key' });
    } catch (e) {
      console.error('Erro ao salvar quiz:', e);
    }
  };

  const percentage = Math.round(((score) / quiz.length) * 100);

  if (finished) {
    const finalScore = score;
    const finalPercentage = Math.round((finalScore / quiz.length) * 100);
    return (
      <div className="quiz-container">
        <div className="quiz-header">
          <span className="quiz-icon">📝</span>
          <h3>Resultado do Quiz</h3>
        </div>
        <div className="quiz-result">
          <div className={`quiz-result-score ${finalPercentage >= 70 ? 'good' : 'retry'}`}>
            {finalScore}/{quiz.length}
          </div>
          <p className="quiz-result-text">
            {finalPercentage === 100 && '🏆 Perfeito! Você acertou tudo!'}
            {finalPercentage >= 70 && finalPercentage < 100 && '✅ Ótimo trabalho! Você mandou bem!'}
            {finalPercentage >= 40 && finalPercentage < 70 && '📚 Bom, mas revise os pontos que errou.'}
            {finalPercentage < 40 && '💪 Não desista! Releia a aula e tente novamente.'}
          </p>
          <button className="quiz-btn primary" onClick={handleRetry}>
            🔄 Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <span className="quiz-icon">📝</span>
        <h3>Quiz — Teste seu conhecimento</h3>
        <span className="quiz-counter">{currentQ + 1}/{quiz.length}</span>
      </div>

      <div className="quiz-progress-bar">
        <div className="quiz-progress-fill" style={{ width: `${((currentQ) / quiz.length) * 100}%` }} />
      </div>

      <p className="quiz-question">{question.pergunta}</p>

      <div className="quiz-options">
        {question.opcoes.map((opcao, i) => {
          let className = 'quiz-option';
          if (answered) {
            if (i === question.correta) className += ' correct';
            else if (i === selected) className += ' wrong';
          } else if (i === selected) {
            className += ' selected';
          }

          return (
            <button key={i} className={className} onClick={() => handleSelect(i)}>
              <span className="quiz-option-letter">
                {String.fromCharCode(65 + i)}
              </span>
              {opcao}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className={`quiz-feedback ${selected === question.correta ? 'correct' : 'wrong'}`}>
          <strong>{selected === question.correta ? '✅ Correto!' : '❌ Incorreto!'}</strong>
          {question.explicacao && <p>{question.explicacao}</p>}
        </div>
      )}

      {answered && (
        <button className="quiz-btn primary" onClick={handleNext}>
          {currentQ < quiz.length - 1 ? 'Próxima →' : 'Ver resultado'}
        </button>
      )}
    </div>
  );
}
