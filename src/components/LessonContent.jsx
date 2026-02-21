'use client';

import CodeBlock from './CodeBlock';

function renderBold(text) {
  if (!text) return text;
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    // Handle inline code
    const codeParts = part.split(/(`[^`]+`)/g);
    return codeParts.map((cp, j) => {
      if (cp.startsWith('`') && cp.endsWith('`')) {
        return <code key={`${i}-${j}`}>{cp.slice(1, -1)}</code>;
      }
      return cp;
    });
  });
}

export default function LessonContent({ conteudo }) {
  if (!conteudo || conteudo.length === 0) {
    return (
      <div className="lesson-content">
        <p>Conteúdo em breve... 🚧</p>
      </div>
    );
  }

  return (
    <div className="lesson-content">
      {conteudo.map((item, index) => {
        switch (item.tipo) {
          case 'h2':
            return <h2 key={index}>{item.texto}</h2>;
          
          case 'h3':
            return <h3 key={index}>{item.texto}</h3>;
          
          case 'p':
            if (item.texto.includes('\n')) {
              return (
                <ul key={index}>
                  {item.texto.split('\n').map((line, i) => {
                    const cleaned = line.replace(/^\d+\.\s*/, '');
                    return <li key={i}>{renderBold(cleaned)}</li>;
                  })}
                </ul>
              );
            }
            return <p key={index}>{renderBold(item.texto)}</p>;
          
          case 'code':
            return (
              <CodeBlock key={index} lang={item.lang || 'javascript'}>
                {item.texto}
              </CodeBlock>
            );
          
          case 'callout':
            return (
              <div key={index} className={`callout callout-${item.variante || 'info'}`}>
                {renderBold(item.texto)}
              </div>
            );
          
          case 'table':
            return (
              <table key={index}>
                <thead>
                  <tr>
                    {item.headers.map((h, i) => (
                      <th key={i}>{renderBold(h)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {item.rows.map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) => (
                        <td key={j}>{renderBold(cell)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            );
          
          default:
            return null;
        }
      })}
    </div>
  );
}
