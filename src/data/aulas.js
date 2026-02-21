// Mapa com os títulos das aulas de cada desafio
// O conteúdo completo está nos READMEs; aqui são as aulas navegáveis

export const aulasMap = {
  'logica-js': [
    { id: 1, titulo: 'Variáveis e Tipos de Dados' },
    { id: 2, titulo: 'Operadores Aritméticos e Lógicos' },
    { id: 3, titulo: 'Estruturas Condicionais (if/else, switch)' },
    { id: 4, titulo: 'Estruturas de Repetição (for, while)' },
    { id: 5, titulo: 'Arrays — Listas de Dados' },
    { id: 6, titulo: 'Funções — Blocos Reutilizáveis' },
    { id: 7, titulo: 'Strings — Manipulação de Texto' },
    { id: 8, titulo: 'Objeto Date e Datas' },
    { id: 9, titulo: 'Entrada e Saída de Dados (I/O)' },
  ],
  'js-avancado': [
    { id: 1, titulo: 'Arrow Functions' },
    { id: 2, titulo: 'Métodos de Array — map, filter, reduce' },
    { id: 3, titulo: 'Desestruturação (Destructuring)' },
    { id: 4, titulo: 'Spread e Rest Operators' },
    { id: 5, titulo: 'Programação Orientada a Objetos (Classes)' },
    { id: 6, titulo: 'JSON — Dados Estruturados' },
    { id: 7, titulo: 'Tratamento de Erros (try/catch)' },
    { id: 8, titulo: 'Callbacks e Escopo (Closures)' },
  ],
  'nodejs': [
    { id: 1, titulo: 'O que é Node.js?' },
    { id: 2, titulo: 'NPM — Gerenciador de Pacotes' },
    { id: 3, titulo: 'CommonJS (require/module.exports)' },
    { id: 4, titulo: 'ES Modules (import/export)' },
    { id: 5, titulo: 'File System (fs) — Manipulando Arquivos' },
    { id: 6, titulo: 'Programação Assíncrona (Promises, async/await)' },
    { id: 7, titulo: 'Readline — Entrada pelo Terminal' },
    { id: 8, titulo: 'Servidor HTTP Básico' },
    { id: 9, titulo: 'Variáveis de Ambiente (.env)' },
    { id: 10, titulo: 'Nodemon — Reinício Automático' },
  ],
  'express': [
    { id: 1, titulo: 'O que é uma API REST?' },
    { id: 2, titulo: 'Verbos HTTP (GET, POST, PUT, DELETE)' },
    { id: 3, titulo: 'Configurando o Express.js' },
    { id: 4, titulo: 'Rotas e Parâmetros' },
    { id: 5, titulo: 'Middlewares' },
    { id: 6, titulo: 'HTTP Status Codes' },
    { id: 7, titulo: 'CRUD Completo com Express' },
    { id: 8, titulo: 'CORS e Segurança' },
    { id: 9, titulo: 'Organização de Projeto (MVC)' },
  ],
  'backend-completo': [
    { id: 1, titulo: 'Banco de Dados Relacional (SQL)' },
    { id: 2, titulo: 'Prisma ORM — Setup e Modelos' },
    { id: 3, titulo: 'Migrations e Seeds' },
    { id: 4, titulo: 'Autenticação JWT' },
    { id: 5, titulo: 'Hashing de Senhas (bcrypt)' },
    { id: 6, titulo: 'Relacionamentos e Queries' },
    { id: 7, titulo: 'Upload de Arquivos (Multer)' },
    { id: 8, titulo: 'Documentação (Swagger) e Deploy' },
  ],
};

export function getAulas(slug) {
  return aulasMap[slug] || [];
}
