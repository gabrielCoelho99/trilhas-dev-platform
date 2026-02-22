'use client';

import { useRef } from 'react';

export default function Certificate({ userName, desafioTitulo, totalAulas }) {
  const canvasRef = useRef(null);

  const generatePDF = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 850;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 1200, 850);

    // Border
    ctx.strokeStyle = '#7c3aed';
    ctx.lineWidth = 6;
    ctx.strokeRect(30, 30, 1140, 790);

    // Inner border
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 2;
    ctx.strokeRect(45, 45, 1110, 760);

    // Header
    ctx.fillStyle = '#7c3aed';
    ctx.font = 'bold 42px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('CERTIFICADO DE CONCLUSÃO', 600, 130);

    // Divider
    ctx.beginPath();
    ctx.moveTo(300, 160);
    ctx.lineTo(900, 160);
    ctx.strokeStyle = '#e2e4ea';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Text
    ctx.fillStyle = '#5a5a7e';
    ctx.font = '20px Arial, sans-serif';
    ctx.fillText('Certificamos que', 600, 240);

    // Name
    ctx.fillStyle = '#1a1a2e';
    ctx.font = 'bold 38px Georgia, serif';
    ctx.fillText(userName || 'Estudante', 600, 310);

    // Description
    ctx.fillStyle = '#5a5a7e';
    ctx.font = '20px Arial, sans-serif';
    ctx.fillText('concluiu com sucesso o desafio', 600, 380);

    // Desafio title
    ctx.fillStyle = '#6366f1';
    ctx.font = 'bold 28px Georgia, serif';
    ctx.fillText(`"${desafioTitulo}"`, 600, 440);

    // Details
    ctx.fillStyle = '#5a5a7e';
    ctx.font = '18px Arial, sans-serif';
    ctx.fillText(`completando todas as ${totalAulas} aulas da trilha.`, 600, 500);

    // Date
    const date = new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
    ctx.fillText(`Data: ${date}`, 600, 570);

    // Platform name
    ctx.fillStyle = '#7c3aed';
    ctx.font = 'bold 22px Arial, sans-serif';
    ctx.fillText('🚀 Trilhas Dev — Plataforma de Estudos', 600, 660);

    ctx.fillStyle = '#9898b0';
    ctx.font = '14px Arial, sans-serif';
    ctx.fillText('Este certificado foi gerado automaticamente pela plataforma Trilhas Dev.', 600, 710);

    // Download
    const link = document.createElement('a');
    link.download = `certificado-${desafioTitulo?.replace(/\s+/g, '-').toLowerCase() || 'trilhas-dev'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="certificate-card">
      <h3>🎓 Certificado de Conclusão</h3>
      <p>Parabéns! Você completou todas as aulas deste desafio. Gere seu certificado!</p>
      <button className="certificate-btn" onClick={generatePDF}>
        📜 Gerar Certificado
      </button>
    </div>
  );
}
