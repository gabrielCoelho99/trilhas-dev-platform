'use client';

import { useState, useRef } from 'react';

export default function CodeSandbox({ codigoInicial, instrucao }) {
  const [code, setCode] = useState(codigoInicial || '');
  const [output, setOutput] = useState([]);
  const textareaRef = useRef(null);

  const runCode = () => {
    setOutput([]);
    const logs = [];

    const fakeConsole = {
      log: (...args) => logs.push({ type: 'log', text: args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ') }),
      warn: (...args) => logs.push({ type: 'warn', text: args.join(' ') }),
      error: (...args) => logs.push({ type: 'error', text: args.join(' ') }),
      table: (data) => logs.push({ type: 'log', text: JSON.stringify(data, null, 2) }),
    };

    try {
      const fn = new Function('console', code);
      fn(fakeConsole);
      setOutput(logs);
    } catch (err) {
      setOutput([...logs, { type: 'error', text: `❌ ${err.message}` }]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newCode = code.substring(0, start) + '  ' + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2;
      }, 0);
    }
  };

  return (
    <div className="sandbox-container">
      <div className="sandbox-header">
        <span>💻 Editor de Código</span>
        <button className="sandbox-run-btn" onClick={runCode}>
          ▶ Executar
        </button>
      </div>

      {instrucao && (
        <div className="sandbox-instruction">
          📋 {instrucao}
        </div>
      )}

      <textarea
        ref={textareaRef}
        className="sandbox-editor"
        value={code}
        onChange={e => setCode(e.target.value)}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        style={{
          width: '100%',
          minHeight: '180px',
          padding: '1rem',
          background: 'var(--bg-code)',
          color: 'var(--text-primary)',
          border: 'none',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.9rem',
          lineHeight: '1.6',
          resize: 'vertical',
          outline: 'none',
        }}
      />

      <div className="sandbox-output">
        {output.length === 0 ? (
          <div className="output-line" style={{ opacity: 0.5 }}>
            &gt; Clique em &quot;Executar&quot; para ver o resultado...
          </div>
        ) : (
          output.map((line, i) => (
            <div key={i} className={line.type === 'error' ? 'output-error' : 'output-line'}>
              &gt; {line.text}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
