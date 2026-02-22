'use client';

import { useState, useEffect, useMemo } from 'react';
import { glossario } from '@/data/glossario';

export default function GlossarioPage() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return glossario;
    const q = search.toLowerCase();
    return glossario.filter(item =>
      item.termo.toLowerCase().includes(q) ||
      item.definicao.toLowerCase().includes(q)
    );
  }, [search]);

  const grouped = useMemo(() => {
    const groups = {};
    for (const item of filtered) {
      const letter = item.termo[0].toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(item);
    }
    return groups;
  }, [filtered]);

  return (
    <div className="glossario-page">
      <h1>📖 Glossário de Programação</h1>
      <p className="subtitle">{glossario.length} termos essenciais explicados de forma simples</p>

      <div className="glossario-search">
        <input
          type="text"
          placeholder="🔍 Buscar termo, ex: variável, função, loop..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {Object.keys(grouped).sort().map(letter => (
        <div key={letter} className="glossary-group">
          <div className="glossary-letter">{letter}</div>
          {grouped[letter].map((item, i) => (
            <div key={i} className="glossary-item">
              <div className="glossary-term">{item.termo}</div>
              <div className="glossary-def">{item.definicao}</div>
              {item.exemplo && (
                <code className="glossary-example">{item.exemplo}</code>
              )}
            </div>
          ))}
        </div>
      ))}

      {filtered.length === 0 && (
        <p className="glossary-empty">Nenhum termo encontrado para a busca.</p>
      )}
    </div>
  );
}
