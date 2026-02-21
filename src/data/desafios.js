export const desafios = [
  {
    slug: 'logica-js',
    emoji: '🧠',
    numero: 'Desafio 1',
    titulo: 'Lógica de Programação com JavaScript',
    descricao: 'Variáveis, tipos de dados, operadores, condicionais, loops, arrays, funções, strings e muito mais.',
    totalAulas: 9,
    cor: '#7c3aed',
  },
  {
    slug: 'js-avancado',
    emoji: '⚡',
    numero: 'Desafio 2',
    titulo: 'Funções Avançadas, Objetos e Dados',
    descricao: 'Arrow functions, map/filter/reduce, desestruturação, spread/rest, classes, JSON e closures.',
    totalAulas: 8,
    cor: '#6366f1',
  },
  {
    slug: 'nodejs',
    emoji: '🟢',
    numero: 'Desafio 3',
    titulo: 'Introdução ao Node.js e Módulos',
    descricao: 'NPM, CommonJS, ES Modules, File System, async/await, readline, servidor HTTP e variáveis de ambiente.',
    totalAulas: 10,
    cor: '#10b981',
  },
  {
    slug: 'express',
    emoji: '🚀',
    numero: 'Desafio 4',
    titulo: 'APIs REST com Express.js',
    descricao: 'Verbos HTTP, rotas, parâmetros, middlewares, CRUD completo, CORS e organização de projeto.',
    totalAulas: 9,
    cor: '#f59e0b',
  },
  {
    slug: 'backend-completo',
    emoji: '🏗️',
    numero: 'Desafio 5',
    titulo: 'Backend Completo',
    descricao: 'Prisma ORM, banco de dados SQL, autenticação JWT, bcrypt, uploads com Multer, Swagger e deploy.',
    totalAulas: 8,
    cor: '#ef4444',
  },
  {
    slug: 'extra-logica',
    emoji: '🧩',
    numero: 'Desafio Extra',
    titulo: 'Lógica de Programação — Curso Completo',
    descricao: 'Teoria aprofundada de lógica com algoritmos, pseudocódigo, sequência, decisão, repetição e mais.',
    totalAulas: 8,
    cor: '#3b82f6',
  },
];

export function getDesafio(slug) {
  return desafios.find(d => d.slug === slug);
}
