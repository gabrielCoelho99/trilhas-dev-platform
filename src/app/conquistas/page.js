'use client';

import { useState, useEffect } from 'react';
import { badges } from '@/data/badges';
import { useAuth } from '@/components/AuthProvider';
import { getTotalProgressAsync } from '@/lib/progress';

export default function ConquistasPage() {
  const { user, loading } = useAuth();
  const [unlockedBadges, setUnlockedBadges] = useState([]);
  const [stats, setStats] = useState({ totalCompleted: 0 });

  useEffect(() => {
    if (loading) return;
    const loadData = async () => {
      const progressData = await getTotalProgressAsync();
      const totalCompleted = progressData.completed;
      setStats({ totalCompleted });

      // Determine which badges are unlocked based on progress
      const unlocked = badges.filter(badge => {
        if (badge.condicao.includes('totalCompleted')) {
          const threshold = parseInt(badge.condicao.split('>=')[1]);
          return totalCompleted >= threshold;
        }
        return false;
      }).map(b => b.id);

      setUnlockedBadges(unlocked);
    };
    loadData();
  }, [loading, user]);

  const unlockedCount = unlockedBadges.length;
  const totalBadges = badges.length;

  return (
    <div className="conquistas-page">
      <h1>🏆 Conquistas</h1>
      <p className="subtitle">Desbloqueie badges completando aulas e desafios!</p>

      <div className="conquistas-stats">
        <div className="conquistas-stat">
          <div className="stat-number">{unlockedCount}</div>
          <div className="stat-label">Desbloqueados</div>
        </div>
        <div className="conquistas-stat">
          <div className="stat-number">{totalBadges}</div>
          <div className="stat-label">Total</div>
        </div>
        <div className="conquistas-stat">
          <div className="stat-number">{stats.totalCompleted}</div>
          <div className="stat-label">Aulas feitas</div>
        </div>
      </div>

      <div className="badges-grid">
        {badges.map(badge => {
          const isUnlocked = unlockedBadges.includes(badge.id);
          return (
            <div key={badge.id} className={`badge-card ${isUnlocked ? 'unlocked' : 'locked'}`}>
              <span className="badge-icon">{badge.icone}</span>
              <div className="badge-info">
                <h3>{badge.nome}</h3>
                <p>{badge.descricao}</p>
                {isUnlocked && <span className="badge-date">✅ Desbloqueado!</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
