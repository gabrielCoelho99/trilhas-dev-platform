export const aulasDesafio5 = [
  {
    id: 1, titulo: 'Banco de Dados Relacional (SQL)',
    conteudo: [
      { tipo: 'h2', texto: 'O que é um Banco de Dados?' },
      { tipo: 'p', texto: 'Um banco de dados relacional organiza dados em **tabelas** com linhas e colunas, como uma planilha. Os bancos mais populares são PostgreSQL, MySQL e SQLite.' },
      { tipo: 'h2', texto: 'SQL Básico' },
      { tipo: 'code', lang: 'sql', texto: '-- Criar tabela\nCREATE TABLE usuarios (\n    id SERIAL PRIMARY KEY,\n    nome VARCHAR(100) NOT NULL,\n    email VARCHAR(150) UNIQUE NOT NULL,\n    idade INT,\n    criado_em TIMESTAMP DEFAULT NOW()\n);\n\n-- Inserir dados (CREATE)\nINSERT INTO usuarios (nome, email, idade)\nVALUES (\'Gabriel\', \'gabriel@email.com\', 22);\n\n-- Buscar dados (READ)\nSELECT * FROM usuarios;\nSELECT nome, email FROM usuarios WHERE idade > 18;\nSELECT * FROM usuarios ORDER BY nome ASC LIMIT 10;\n\n-- Atualizar (UPDATE)\nUPDATE usuarios SET idade = 23 WHERE id = 1;\n\n-- Deletar (DELETE)\nDELETE FROM usuarios WHERE id = 1;' },
      { tipo: 'h2', texto: 'Filtros e Funções' },
      { tipo: 'code', lang: 'sql', texto: '-- WHERE com operadores\nSELECT * FROM usuarios WHERE idade >= 18 AND idade <= 30;\nSELECT * FROM usuarios WHERE nome LIKE \'%Gabriel%\';\nSELECT * FROM usuarios WHERE email IS NOT NULL;\n\n-- Funções de agregação\nSELECT COUNT(*) FROM usuarios;               -- Total de registros\nSELECT AVG(idade) FROM usuarios;              -- Média\nSELECT MAX(idade), MIN(idade) FROM usuarios;  -- Maior e menor' },
      { tipo: 'h2', texto: '🏋️ Exercícios' },
      { tipo: 'p', texto: '1. Crie uma tabela "produtos" com id, nome, preco, estoque\n2. Insira 5 produtos e faça consultas com WHERE\n3. Calcule o preço médio e o total em estoque' },
    ]
  },
  {
    id: 2, titulo: 'Prisma ORM — Setup e Modelos',
    conteudo: [
      { tipo: 'h2', texto: 'O que é Prisma?' },
      { tipo: 'p', texto: 'Prisma é um **ORM** (Object-Relational Mapper) moderno para Node.js. Em vez de escrever SQL puro, você define modelos e usa JavaScript para fazer queries:' },
      { tipo: 'h2', texto: 'Setup' },
      { tipo: 'code', lang: 'bash', texto: 'npm install prisma @prisma/client\nnpx prisma init' },
      { tipo: 'h2', texto: 'Definindo Modelos (schema.prisma)' },
      { tipo: 'code', lang: 'prisma', texto: 'datasource db {\n  provider = "postgresql"\n  url      = env("DATABASE_URL")\n}\n\ngenerator client {\n  provider = "prisma-client-js"\n}\n\nmodel User {\n  id        Int      @id @default(autoincrement())\n  nome      String\n  email     String   @unique\n  posts     Post[]\n  criadoEm  DateTime @default(now())\n}\n\nmodel Post {\n  id        Int      @id @default(autoincrement())\n  titulo    String\n  conteudo  String?\n  autor     User     @relation(fields: [autorId], references: [id])\n  autorId   Int\n}' },
      { tipo: 'h2', texto: 'Usando no Código' },
      { tipo: 'code', lang: 'javascript', texto: 'const { PrismaClient } = require("@prisma/client");\nconst prisma = new PrismaClient();\n\n// Criar usuário\nconst user = await prisma.user.create({\n    data: { nome: "Gabriel", email: "gab@email.com" }\n});\n\n// Buscar todos\nconst users = await prisma.user.findMany();\n\n// Buscar por ID\nconst user = await prisma.user.findUnique({ where: { id: 1 } });\n\n// Atualizar\nconst updated = await prisma.user.update({\n    where: { id: 1 },\n    data: { nome: "Gabriel Atualizado" }\n});\n\n// Deletar\nawait prisma.user.delete({ where: { id: 1 } });' },
      { tipo: 'h2', texto: '🏋️ Exercícios' },
      { tipo: 'p', texto: '1. Configure o Prisma com SQLite (mais fácil para começar)\n2. Crie modelos para um blog (User, Post, Comment)\n3. Faça operações CRUD com o Prisma Client' },
    ]
  },
  {
    id: 3, titulo: 'Migrations e Seeds',
    conteudo: [
      { tipo: 'h2', texto: 'O que são Migrations?' },
      { tipo: 'p', texto: 'Migrations são **versões do schema do banco**. Cada migration registra mudanças (criar tabela, adicionar coluna) de forma rastreável:' },
      { tipo: 'code', lang: 'bash', texto: '# Criar e aplicar migration\nnpx prisma migrate dev --name init\n\n# Adicionar coluna e criar nova migration\nnpx prisma migrate dev --name add_avatar_to_user\n\n# Aplicar em produção\nnpx prisma migrate deploy\n\n# Resetar banco (cuidado!)\nnpx prisma migrate reset' },
      { tipo: 'h2', texto: 'Seeds — Dados Iniciais' },
      { tipo: 'code', lang: 'javascript', texto: '// prisma/seed.js\nconst { PrismaClient } = require("@prisma/client");\nconst prisma = new PrismaClient();\n\nasync function seed() {\n    // Limpar dados existentes\n    await prisma.user.deleteMany();\n\n    // Criar dados de teste\n    await prisma.user.createMany({\n        data: [\n            { nome: "Admin", email: "admin@app.com" },\n            { nome: "Teste", email: "teste@app.com" },\n        ]\n    });\n\n    console.log("✅ Seed concluído!");\n}\n\nseed()\n    .catch(console.error)\n    .finally(() => prisma.$disconnect());' },
      { tipo: 'code', lang: 'bash', texto: '# Rodar seed\nnpx prisma db seed' },
      { tipo: 'h2', texto: '🏋️ Exercícios' },
      { tipo: 'p', texto: '1. Crie uma migration inicial com suas tabelas\n2. Adicione uma coluna "avatar" e crie uma nova migration\n3. Crie um seed com dados de teste' },
    ]
  },
  {
    id: 4, titulo: 'Autenticação JWT',
    conteudo: [
      { tipo: 'h2', texto: 'O que é JWT?' },
      { tipo: 'p', texto: 'JWT (JSON Web Token) é um **token de autenticação** que o servidor gera quando o usuário faz login. O cliente envia esse token em cada requisição para provar que está autenticado.' },
      { tipo: 'callout', variante: 'info', texto: '**Analogia:** JWT é como um crachá de evento. Você mostra no cadastro (login), recebe o crachá (token), e mostra em cada área restrita (rotas protegidas).' },
      { tipo: 'code', lang: 'bash', texto: 'npm install jsonwebtoken' },
      { tipo: 'code', lang: 'javascript', texto: 'const jwt = require("jsonwebtoken");\nconst SECRET = process.env.JWT_SECRET || "chave-secreta";\n\n// Gerar token (no login)\nfunction gerarToken(userId) {\n    return jwt.sign({ id: userId }, SECRET, { expiresIn: "7d" });\n}\n\n// Verificar token (middleware)\nfunction autenticar(req, res, next) {\n    const authHeader = req.headers.authorization;\n    if (!authHeader) {\n        return res.status(401).json({ erro: "Token não fornecido" });\n    }\n\n    const token = authHeader.split(" ")[1]; // "Bearer TOKEN"\n    try {\n        const payload = jwt.verify(token, SECRET);\n        req.userId = payload.id;\n        next();\n    } catch {\n        return res.status(401).json({ erro: "Token inválido" });\n    }\n}\n\n// Rota de login\napp.post("/api/login", async (req, res) => {\n    const { email, senha } = req.body;\n    const user = await prisma.user.findUnique({ where: { email } });\n\n    if (!user || !await bcrypt.compare(senha, user.senha)) {\n        return res.status(401).json({ erro: "Credenciais inválidas" });\n    }\n\n    const token = gerarToken(user.id);\n    res.json({ token, user: { id: user.id, nome: user.nome } });\n});\n\n// Rota protegida\napp.get("/api/perfil", autenticar, async (req, res) => {\n    const user = await prisma.user.findUnique({ where: { id: req.userId } });\n    res.json(user);\n});' },
      { tipo: 'h2', texto: '🏋️ Exercícios' },
      { tipo: 'p', texto: '1. Implemente login com JWT\n2. Crie um middleware de autenticação\n3. Proteja todas as rotas que exigem login' },
    ]
  },
  {
    id: 5, titulo: 'Hashing de Senhas (bcrypt)',
    conteudo: [
      { tipo: 'h2', texto: 'Por que Fazer Hash?' },
      { tipo: 'p', texto: '**NUNCA** armazene senhas em texto puro! Se o banco for invadido, todas as senhas ficam expostas. O **bcrypt** transforma a senha em um hash irreversível:' },
      { tipo: 'code', lang: 'bash', texto: 'npm install bcryptjs' },
      { tipo: 'code', lang: 'javascript', texto: 'const bcrypt = require("bcryptjs");\n\n// Criar hash (no cadastro)\nasync function hashSenha(senha) {\n    const salt = await bcrypt.genSalt(10);  // 10 rounds\n    return await bcrypt.hash(senha, salt);\n}\n\n// Verificar senha (no login)\nasync function verificarSenha(senhaDigitada, hashSalvo) {\n    return await bcrypt.compare(senhaDigitada, hashSalvo);\n}\n\n// Exemplo completo\napp.post("/api/cadastro", async (req, res) => {\n    const { nome, email, senha } = req.body;\n\n    // Hash da senha antes de salvar\n    const senhaHash = await hashSenha(senha);\n\n    const user = await prisma.user.create({\n        data: { nome, email, senha: senhaHash }\n    });\n\n    res.status(201).json({ id: user.id, nome: user.nome });\n});' },
      { tipo: 'callout', variante: 'warning', texto: 'O `bcrypt.compare()` compara a senha digitada com o hash salvo no banco. **Nunca** compare strings diretamente (`senha === hashSalvo` não funciona).' },
      { tipo: 'h2', texto: '🏋️ Exercícios' },
      { tipo: 'p', texto: '1. Implemente cadastro com hash de senha\n2. Implemente login verificando com bcrypt.compare\n3. Teste que a mesma senha gera hashes diferentes (por causa do salt)' },
    ]
  },
  {
    id: 6, titulo: 'Relacionamentos e Queries',
    conteudo: [
      { tipo: 'h2', texto: 'Tipos de Relacionamento' },
      { tipo: 'table', headers: ['Tipo', 'Exemplo', 'Prisma'], rows: [
        ['1:N (Um para Muitos)', 'User → Posts', '`Post[]` no User'],
        ['N:M (Muitos para Muitos)', 'Post ↔ Tags', 'Tabela intermediária'],
        ['1:1 (Um para Um)', 'User → Perfil', '`@unique` na FK'],
      ]},
      { tipo: 'h2', texto: 'Queries com Relacionamentos (Prisma)' },
      { tipo: 'code', lang: 'javascript', texto: '// Buscar user COM seus posts (include)\nconst userComPosts = await prisma.user.findUnique({\n    where: { id: 1 },\n    include: { posts: true }\n});\n// { id: 1, nome: "Gabriel", posts: [{...}, {...}] }\n\n// Criar post conectando ao user\nconst post = await prisma.post.create({\n    data: {\n        titulo: "Meu primeiro post",\n        conteudo: "Olá mundo!",\n        autor: { connect: { id: 1 } }  // Conecta ao user existente\n    }\n});\n\n// Filtrar por relacionamento\nconst usersComPosts = await prisma.user.findMany({\n    where: {\n        posts: { some: {} }  // Users que têm pelo menos 1 post\n    },\n    include: {\n        _count: { select: { posts: true } }  // Contagem de posts\n    }\n});' },
      { tipo: 'h2', texto: '🏋️ Exercícios' },
      { tipo: 'p', texto: '1. Crie um schema com User, Post e Comment (1:N:N)\n2. Faça queries com include para buscar relações\n3. Use _count para contar relacionamentos' },
    ]
  },
  {
    id: 7, titulo: 'Upload de Arquivos (Multer)',
    conteudo: [
      { tipo: 'h2', texto: 'Configurando o Multer' },
      { tipo: 'code', lang: 'bash', texto: 'npm install multer' },
      { tipo: 'code', lang: 'javascript', texto: 'const multer = require("multer");\nconst path = require("path");\n\n// Configuração de storage\nconst storage = multer.diskStorage({\n    destination: (req, file, cb) => {\n        cb(null, "uploads/");  // Pasta de destino\n    },\n    filename: (req, file, cb) => {\n        const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);\n        const ext = path.extname(file.originalname);\n        cb(null, unique + ext);\n    }\n});\n\n// Filtrar tipos de arquivo\nconst fileFilter = (req, file, cb) => {\n    const tipos = ["image/jpeg", "image/png", "image/webp"];\n    if (tipos.includes(file.mimetype)) {\n        cb(null, true);\n    } else {\n        cb(new Error("Tipo de arquivo não permitido"), false);\n    }\n};\n\nconst upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });\n\n// Rota de upload\napp.post("/api/avatar", upload.single("foto"), (req, res) => {\n    res.json({\n        mensagem: "Upload realizado!",\n        arquivo: req.file.filename,\n        tamanho: req.file.size\n    });\n});' },
      { tipo: 'h2', texto: '🏋️ Exercícios' },
      { tipo: 'p', texto: '1. Configure upload de imagens com Multer\n2. Adicione validação de tipo e tamanho máximo (5MB)\n3. Sirva os arquivos uploadados como estáticos' },
    ]
  },
  {
    id: 8, titulo: 'Documentação (Swagger) e Deploy',
    conteudo: [
      { tipo: 'h2', texto: 'Swagger — Documentação Interativa' },
      { tipo: 'code', lang: 'bash', texto: 'npm install swagger-jsdoc swagger-ui-express' },
      { tipo: 'code', lang: 'javascript', texto: 'const swaggerJsdoc = require("swagger-jsdoc");\nconst swaggerUi = require("swagger-ui-express");\n\nconst swaggerSpec = swaggerJsdoc({\n    definition: {\n        openapi: "3.0.0",\n        info: {\n            title: "Minha API",\n            version: "1.0.0",\n            description: "API do projeto Trilhas",\n        },\n    },\n    apis: ["./routes/*.js"],  // Arquivos com anotações\n});\n\napp.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));' },
      { tipo: 'h2', texto: 'Deploy na Vercel / Render' },
      { tipo: 'p', texto: 'Para fazer deploy, você precisa:' },
      { tipo: 'p', texto: '1. **Subir no GitHub** — `git push origin main`\n2. **Conectar no serviço** — Render, Railway, ou Vercel\n3. **Configurar variáveis** — DATABASE_URL, JWT_SECRET, PORT\n4. **Banco de dados** — Supabase, Neon, ou PlanetScale (PostgreSQL gratuito)' },
      { tipo: 'code', lang: 'json', texto: '// Procfile (para Render/Heroku)\n// web: node server.js\n\n// package.json — scripts\n{\n  "scripts": {\n    "start": "node server.js",\n    "build": "npx prisma generate",\n    "postinstall": "npx prisma generate"\n  }\n}' },
      { tipo: 'callout', variante: 'tip', texto: '**Parabéns!** 🎉 Se você chegou até aqui, completou toda a trilha de Backend com JavaScript — desde variáveis até deploy. Agora é praticar e construir projetos reais!' },
      { tipo: 'h2', texto: '🏋️ Exercícios Finais' },
      { tipo: 'p', texto: '1. Documente todas as rotas da sua API com Swagger\n2. Faça deploy do projeto em um serviço gratuito\n3. Crie um README completo do projeto com instruções de setup' },
    ]
  },
];
