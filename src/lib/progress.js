import { createClient } from '@/lib/supabase-browser';

const supabase = createClient();

function getLessonKey(slug, aulaId) {
  return `${slug}-${aulaId}`;
}

// ========== SUPABASE FUNCTIONS ==========

export async function isCompletedAsync(slug, aulaId) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return isCompletedLocal(slug, aulaId);

  const { data } = await supabase
    .from('progress')
    .select('id')
    .eq('user_id', user.id)
    .eq('lesson_key', getLessonKey(slug, aulaId))
    .maybeSingle();

  return !!data;
}

export async function toggleCompleteAsync(slug, aulaId) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return toggleCompleteLocal(slug, aulaId);

  const key = getLessonKey(slug, aulaId);
  const isAlreadyDone = await isCompletedAsync(slug, aulaId);

  if (isAlreadyDone) {
    await supabase
      .from('progress')
      .delete()
      .eq('user_id', user.id)
      .eq('lesson_key', key);
    return false;
  } else {
    await supabase
      .from('progress')
      .insert({ user_id: user.id, lesson_key: key });
    return true;
  }
}

export async function getDesafioProgressAsync(slug, totalAulas) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return getDesafioProgressLocal(slug, totalAulas);

  const { data } = await supabase
    .from('progress')
    .select('lesson_key')
    .eq('user_id', user.id)
    .like('lesson_key', `${slug}-%`);

  const completed = data ? data.length : 0;
  return {
    completed,
    total: totalAulas,
    percentage: totalAulas > 0 ? Math.round((completed / totalAulas) * 100) : 0,
  };
}

export async function getTotalProgressAsync() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return getTotalProgressLocal();

  const { data } = await supabase
    .from('progress')
    .select('lesson_key')
    .eq('user_id', user.id);

  const completed = data ? data.length : 0;
  const total = 52;
  return {
    completed,
    total,
    percentage: Math.round((completed / total) * 100),
  };
}

// ========== LOCAL STORAGE FALLBACK ==========

function getProgress() {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem('trilhas-progress') || '{}');
  } catch {
    return {};
  }
}

function saveProgress(data) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('trilhas-progress', JSON.stringify(data));
}

export function isCompletedLocal(slug, aulaId) {
  const progress = getProgress();
  return progress[getLessonKey(slug, aulaId)] === true;
}

// Keep sync versions for backward compat
export function isCompleted(slug, aulaId) {
  return isCompletedLocal(slug, aulaId);
}

export function toggleCompleteLocal(slug, aulaId) {
  const progress = getProgress();
  const key = getLessonKey(slug, aulaId);
  progress[key] = !progress[key];
  saveProgress(progress);
  return progress[key];
}

export function toggleComplete(slug, aulaId) {
  return toggleCompleteLocal(slug, aulaId);
}

export function getDesafioProgressLocal(slug, totalAulas) {
  const progress = getProgress();
  let completed = 0;
  for (let i = 1; i <= totalAulas; i++) {
    if (progress[getLessonKey(slug, i)]) completed++;
  }
  return {
    completed,
    total: totalAulas,
    percentage: totalAulas > 0 ? Math.round((completed / totalAulas) * 100) : 0,
  };
}

export function getDesafioProgress(slug, totalAulas) {
  return getDesafioProgressLocal(slug, totalAulas);
}

export function getTotalProgressLocal() {
  const progress = getProgress();
  const completed = Object.values(progress).filter(Boolean).length;
  const total = 52;
  return {
    completed,
    total,
    percentage: Math.round((completed / total) * 100),
  };
}

export function getTotalProgress() {
  return getTotalProgressLocal();
}
