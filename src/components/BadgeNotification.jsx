'use client';

export default function BadgeNotification({ badge, onClose }) {
  if (!badge) return null;

  return (
    <div className="badge-toast" onAnimationEnd={(e) => {
      if (e.animationName === 'fadeOut') onClose();
    }}>
      <span className="badge-toast-icon">{badge.icone}</span>
      <div className="badge-toast-text">
        <strong>🏅 Conquista desbloqueada!</strong>
        <span>{badge.nome}</span>
      </div>
    </div>
  );
}
