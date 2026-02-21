# 🚀 Trilhas Dev — Plataforma de Estudos

Plataforma completa de estudos de **Backend com JavaScript e Node.js** — do básico ao deploy.

Construída com **Next.js 14**, design escuro premium e progresso salvo localmente.

## 📚 Conteúdo

| Módulo | Aulas | Temas |
|--------|-------|-------|
| 📘 Lógica de Programação | 9 | Variáveis, operadores, condicionais, loops, arrays, funções, strings, Date, I/O |
| 📗 JavaScript Avançado | 8 | Arrow functions, map/filter/reduce, destructuring, spread/rest, classes, JSON, try/catch, closures |
| 📙 Node.js | 10 | Runtime, NPM, CommonJS, ES Modules, fs, async/await, readline, HTTP, .env, nodemon |
| 📕 Express.js / REST | 9 | API REST, verbos HTTP, Express, rotas, middlewares, status codes, CRUD, CORS, MVC |
| 📒 Backend Completo | 8 | SQL, Prisma, migrations, JWT, bcrypt, relacionamentos, Multer, Swagger/deploy |
| 🧩 Extra: Lógica | 8 | Algoritmos, sequência, condicionais, loops, arrays, funções, strings, objetos |
| **Total** | **52 aulas** | |

## ✨ Features

- 🌙 **Dark theme premium** com gradientes
- ✅ **Progresso** — Marque aulas como concluídas (localStorage)
- 📋 **Code blocks** com botão de copiar
- 📱 **Responsivo** — Desktop e mobile
- ◀▶ **Navegação** — Prev/next entre aulas + sidebar
- 🚀 **Deploy** — Pronto para Vercel

## 🛠️ Tech Stack

- **Next.js 14** (App Router)
- **React 19**
- **CSS puro** (sem frameworks)
- **localStorage** para progresso

## 🚀 Rodando Localmente

```bash
# Clone o repositório
git clone https://github.com/SEU-USER/trilhas-dev-platform.git
cd trilhas-dev-platform

# Instale as dependências
npm install

# Rode o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## 📦 Deploy na Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Conecte este repositório no [vercel.com](https://vercel.com)
2. A Vercel detecta Next.js automaticamente
3. Pronto! 🎉

## 📁 Estrutura

```
src/
├── app/                    # Páginas (App Router)
│   ├── page.js             # Homepage/Dashboard
│   └── desafio/[slug]/     # Páginas dinâmicas
├── components/             # Componentes React
│   ├── Sidebar.jsx         # Navegação lateral
│   ├── CodeBlock.jsx       # Blocos de código
│   └── LessonContent.jsx   # Renderizador de aulas
├── data/                   # Conteúdo das aulas
│   ├── desafios.js         # Índice dos módulos
│   ├── desafio1-5.js       # Conteúdo por módulo
│   └── desafioExtra.js     # Módulo extra
└── lib/
    └── progress.js         # Sistema de progresso
```

## 📝 Licença

MIT — Feito com 💜 para estudos.
