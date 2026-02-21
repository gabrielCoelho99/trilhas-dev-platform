'use client';

const STORAGE_KEY = 'trilhas-progress';

export function getProgress() {
  if (typeof window === 'undefined') return {};
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

export function isCompleted(desafioSlug, aulaId) {
  const progress = getProgress();
  const key = `${desafioSlug}-${aulaId}`;
  return !!progress[key];
}

export function toggleComplete(desafioSlug, aulaId) {
  const progress = getProgress();
  const key = `${desafioSlug}-${aulaId}`;
  
  if (progress[key]) {
    delete progress[key];
  } else {
    progress[key] = true;
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  return !!progress[key];
}

export function getDesafioProgress(desafioSlug, totalAulas) {
  const progress = getProgress();
  let completed = 0;
  
  for (let i = 1; i <= totalAulas; i++) {
    if (progress[`${desafioSlug}-${i}`]) {
      completed++;
    }
  }
  
  return {
    completed,
    total: totalAulas,
    percentage: totalAulas > 0 ? Math.round((completed / totalAulas) * 100) : 0,
  };
}

export function getTotalProgress(desafios) {
  const progress = getProgress();
  let totalCompleted = 0;
  let totalAulas = 0;
  
  for (const desafio of desafios) {
    totalAulas += desafio.totalAulas;
    for (let i = 1; i <= desafio.totalAulas; i++) {
      if (progress[`${desafio.slug}-${i}`]) {
        totalCompleted++;
      }
    }
  }
  
  return {
    completed: totalCompleted,
    total: totalAulas,
    percentage: totalAulas > 0 ? Math.round((totalCompleted / totalAulas) * 100) : 0,
  };
}
