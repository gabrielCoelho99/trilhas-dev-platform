'use client';

import { useState, useMemo } from 'react';
import { glossario } from '@/data/glossario';

export default function Glossary({ isOpen, onClose }) {
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

  if (!isOpen) return null;

  return (
    <div className="glossary-overlay" onClick={onClose}>
      <div className="glossary-panel" onClick={e => e.stopPropagation()}>
        <div className="glossary-header">
          <h2>📖 Glossário</h2>
          <button className="glossary-close" onClick={onClose}>✕</button>
        </div>

        <div className="glossary-search">
          <input
            type="text"
            placeholder="Buscar termo..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            autoFocus
          />
        </div>

        <div className="glossary-content">
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
            <p className="glossary-empty">Nenhum termo encontrado para &ldquo;{search}&rdquo;</p>
          )}
        </div>
      </div>
    </div>
  );
}
