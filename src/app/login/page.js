'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase-browser';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push('/');
        router.refresh();
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { nome },
          },
        });
        if (error) throw error;
        setMessage('Conta criada! Verifique seu email para confirmar.');
      }
    } catch (err) {
      setError(err.message === 'Invalid login credentials'
        ? 'Email ou senha inválidos'
        : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGitHub = async () => {
    setError('');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) setError(error.message);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-logo">🚀 Trilhas Dev</h1>
          <p className="login-subtitle">
            {isLogin ? 'Entre na sua conta' : 'Crie sua conta'}
          </p>
        </div>

        {error && <div className="login-error">{error}</div>}
        {message && <div className="login-success">{message}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          {!isLogin && (
            <div className="login-field">
              <label htmlFor="nome">Nome</label>
              <input
                id="nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome"
                required={!isLogin}
              />
            </div>
          )}

          <div className="login-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              minLength={6}
              required
            />
          </div>

          <button type="submit" className="login-btn primary" disabled={loading}>
            {loading
              ? 'Carregando...'
              : isLogin ? 'Entrar' : 'Criar conta'
            }
          </button>
        </form>

        <div className="login-divider">
          <span>ou</span>
        </div>

        <button onClick={handleGitHub} className="login-btn github" type="button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          Entrar com GitHub
        </button>

        <p className="login-toggle">
          {isLogin ? 'Não tem conta? ' : 'Já tem conta? '}
          <button type="button" onClick={() => { setIsLogin(!isLogin); setError(''); setMessage(''); }}>
            {isLogin ? 'Criar conta' : 'Fazer login'}
          </button>
        </p>
      </div>
    </div>
  );
}
