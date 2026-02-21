export const aulasDesafio4 = [
  {
    id: 1, titulo: 'O que é uma API REST?',
    conteudo: [
      { tipo: 'h2', texto: 'API = Interface de Comunicação' },
      { tipo: 'p', texto: 'Uma **API** (Application Programming Interface) é uma forma de programas conversarem entre si. Uma **API REST** usa os protocolos da web (HTTP) para essa comunicação.' },
      { tipo: 'callout', variante: 'info', texto: '**Analogia:** Imagine um restaurante. Você (cliente/frontend) faz o pedido ao garçom (API). O garçom leva para a cozinha (backend/banco), e traz de volta a resposta (dados).' },
      { tipo: 'h2', texto: 'Princípios REST' },
      { tipo: 'p', texto: '1. **Cliente-Servidor** — Frontend e backend são separados\n2. **Stateless** — Cada request é independente (sem memória)\n3. **Recursos** — Tudo é um recurso identificado por URL\n4. **Verbos HTTP** — GET, POST, PUT, DELETE' },
      { tipo: 'h2', texto: 'Exemplo de Endpoints' },
      { tipo: 'table', headers: ['Verbo', 'Rota', 'O que faz'], rows: [
        ['GET', '`/api/users`', 'Listar todos os usuários'],
        ['GET', '`/api/users/1`', 'Buscar usuário com id 1'],
        ['POST', '`/api/users`', 'Criar novo usuário'],
        ['PUT', '`/api/users/1`', 'Atualizar usuário 1'],
        ['DELETE', '`/api/users/1`', 'Deletar usuário 1'],
      ]},
      { tipo: 'h2', texto: '🏋️ Exercícios' },
      { tipo: 'p', texto: '1. Liste 5 exemplos de APIs que você usa no dia a dia\n2. Desenhe os endpoints de uma API de Tarefas (TODO)\n3. Identifique verbo e rota para cada operação CRUD' },
    ]
  },
  {
    id: 2, titulo: 'Verbos HTTP (GET, POST, PUT, DELETE)',
    conteudo: [
      { tipo: 'h2', texto: 'Os 4 Verbos Principais' },
      { tipo: 'table', headers: ['Verbo', 'CRUD', 'Corpo?', 'Idempotente?'], rows: [
        ['**GET**', 'Read (Ler)', 'Não', 'Sim'],
        ['**POST**', 'Create (Criar)', 'Sim', 'Não'],
        ['**PUT**', 'Update (Atualizar)', 'Sim', 'Sim'],
        ['**DELETE**', 'Delete (Deletar)', 'Não', 'Sim'],
      ]},
      { tipo: 'h2', texto: 'Na Prática' },
      { tipo: 'code', lang: 'javascript', texto: '// GET — Buscar dados (sem corpo)\n// Equivale a: acessar uma URL no navegador\nfetch("/api/produtos")\n    .then(res => res.json())\n    .then(data => console.log(data));\n\n// POST — Enviar dados (com corpo JSON)\nfetch("/api/produtos", {\n    method: "POST",\n    headers: { "Content-Type": "application/json" },\n    body: JSON.stringify({ nome: "Notebook", preco: 3500 })\n});\n\n// PUT — Atualizar (com corpo JSON)\nfetch("/api/produtos/1", {\n    method: "PUT",\n    headers: { "Content-Type": "application/json" },\n    body: JSON.stringify({ nome: "Notebook Pro", preco: 4500 })\n});\n\n// DELETE — Deletar (sem corpo)\nfetch("/api/produtos/1", { method: "DELETE" });' },
      { tipo: 'callout', variante: 'tip', texto: '**Idempotente** = mesma requisição feita múltiplas vezes dá o mesmo resultado. GET, PUT e DELETE são idempotentes. POST não (cada chamada cria um novo recurso).' },
      { tipo: 'h2', texto: '🏋️ Exercícios' },
      { tipo: 'p', texto: '1. Para cada operação abaixo, diga o verbo HTTP correto: buscar perfil, criar conta, atualizar email, deletar post\n2. Use `fetch` para fazer uma requisição GET para uma API pública' },
    ]
  },
  {
    id: 3, titulo: 'Configurando o Express.js',
    conteudo: [
      { tipo: 'h2', texto: 'O que é Express?' },
      { tipo: 'p', texto: 'Express é o **framework web mais popular** do Node.js. Ele simplifica a criação de servidores e APIs.' },
      { tipo: 'h2', texto: 'Setup Inicial' },
      { tipo: 'code', lang: 'bash', texto: '# Criar projeto\nmkdir minha-api && cd minha-api\nnpm init -y\nnpm install express\nnpm install nodemon --save-dev' },
      { tipo: 'code', lang: 'javascript', texto: '// server.js\nconst express = require("express");\nconst app = express();\n\n// Middleware para ler JSON no body\napp.use(express.json());\n\n// Rota GET\napp.get("/", (req, res) => {\n    res.json({ mensagem: "API funcionando! 🚀" });\n});\n\n// Iniciar servidor\nconst PORT = process.env.PORT || 3000;\napp.listen(PORT, () => {\n    console.log(`Servidor rodando em http://localhost:${PORT}`);\n});' },
      { tipo: 'h2', texto: 'package.json Scripts' },
      { tipo: 'code', lang: 'json', texto: '{\n  "scripts": {\n    "start": "node server.js",\n    "dev": "nodemon server.js"\n  }\n}' },
      { tipo: 'h2', texto: '🏋️ Exercícios' },
      { tipo: 'p', texto: '1. Crie um projeto Express do zero\n2. Adicione 3 rotas GET diferentes que retornam JSON\n3. Teste com o navegador ou curl' },
    ]
  },
  {
    id: 4, titulo: 'Rotas e Parâmetros',
    conteudo: [
      { tipo: 'h2', texto: 'Tipos de Parâmetros' },
      { tipo: 'code', lang: 'javascript', texto: '// 1. ROUTE PARAMS — na URL (/:id)\napp.get("/users/:id", (req, res) => {\n    const { id } = req.params;\n    res.json({ userId: id });\n});\n// GET /users/42 → { userId: "42" }\n\n// 2. QUERY PARAMS — após ? (?key=value)\napp.get("/search", (req, res) => {\n    const { q, page = 1 } = req.query;\n    res.json({ busca: q, pagina: page });\n});\n// GET /search?q=node&page=2 → { busca: "node", pagina: "2" }\n\n// 3. BODY — enviado no corpo (POST/PUT)\napp.post("/users", (req, res) => {\n    const { nome, email } = req.body;\n    res.json({ nome, email });\n});' },
      { tipo: 'h2', texto: 'Router — Organizando Rotas' },
      { tipo: 'code', lang: 'javascript', texto: '// routes/users.js\nconst express = require("express");\nconst router = express.Router();\n\nrouter.get("/", (req, res) => {\n    res.json([{ id: 1, nome: "Ana" }]);\n});\n\nrouter.get("/:id", (req, res) => {\n    res.json({ id: req.params.id });\n});\n\nmodule.exports = router;\n\n// server.js\nconst usersRouter = require("./routes/users");\napp.use("/api/users", usersRouter);' },
      { tipo: 'h2', texto: '🏋️ Exercícios' },
      { tipo: 'p', texto: '1. Crie rotas com params para /produtos/:id e /categorias/:slug\n2. Crie uma rota de busca com query params (q, limit, offset)\n3. Separe rotas em arquivos com Router' },
    ]
  },
  {
    id: 5, titulo: 'Middlewares',
    conteudo: [
      { tipo: 'h2', texto: 'O que são Middlewares?' },
      { tipo: 'p', texto: 'Middlewares são **funções que interceptam** a requisição antes de chegar na rota. São como "camadas" que a request passa:' },
      { tipo: 'code', lang: 'javascript', texto: '// Middleware global de log\napp.use((req, res, next) => {\n    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);\n    next();  // IMPORTANTE: chama o próximo middleware/rota!\n});\n\n// Middleware de autenticação\nfunction autenticar(req, res, next) {\n    const token = req.headers.authorization;\n    if (!token) {\n        return res.status(401).json({ erro: "Token não fornecido" });\n    }\n    // Validar token...\n    next();\n}\n\n// Usar em rotas específicas\napp.get("/api/perfil", autenticar, (req, res) => {\n    res.json({ nome: "Gabriel" });\n});' },
      { tipo: 'h2', texto: 'Middlewares Built-in do Express' },
      { tipo: 'code', lang: 'javascript', texto: 'app.use(express.json());             // Parse do body JSON\napp.use(express.urlencoded({ extended: true }));  // Parse de form data\napp.use(express.static("public"));   // Servir arquivos estáticos' },
      { tipo: 'callout', variante: 'tip', texto: '**Ordem importa!** Middlewares são executados na ordem em que são declarados. Coloque middlewares globais (log, JSON parser) ANTES das rotas.' },
      { tipo: 'h2', texto: '🏋️ Exercícios' },
      { tipo: 'p', texto: '1. Crie um middleware de log que registra method + url + timestamp\n2. Crie um middleware que valida se existe um header "x-api-key"\n3. Crie um middleware de tratamento de erros' },
    ]
  },
  {
    id: 6, titulo: 'HTTP Status Codes',
    conteudo: [
      { tipo: 'h2', texto: 'Códigos de Status' },
      { tipo: 'p', texto: 'Cada resposta HTTP carrega um **código numérico** que indica o resultado:' },
      { tipo: 'table', headers: ['Faixa', 'Categoria', 'Exemplos'], rows: [
        ['**2xx**', '✅ Sucesso', '200 OK, 201 Created, 204 No Content'],
        ['**3xx**', '↪️ Redirecionamento', '301 Moved, 304 Not Modified'],
        ['**4xx**', '❌ Erro do Cliente', '400 Bad Request, 401 Unauthorized, 404 Not Found'],
        ['**5xx**', '💥 Erro do Servidor', '500 Internal Server Error, 503 Service Unavailable'],
      ]},
      { tipo: 'h2', texto: 'Na Prática com Express' },
      { tipo: 'code', lang: 'javascript', texto: 'app.post("/api/users", (req, res) => {\n    const { nome, email } = req.body;\n\n    // 400 — Dados inválidos\n    if (!nome || !email) {\n        return res.status(400).json({ erro: "Nome e email são obrigatórios" });\n    }\n\n    // 201 — Criado com sucesso\n    const novoUser = { id: Date.now(), nome, email };\n    res.status(201).json(novoUser);\n});\n\napp.delete("/api/users/:id", (req, res) => {\n    // 404 — Não encontrado\n    const user = users.find(u => u.id === parseInt(req.params.id));\n    if (!user) {\n        return res.status(404).json({ erro: "Usuário não encontrado" });\n    }\n\n    // 204 — Deletado (sem conteúdo de retorno)\n    res.status(204).send();\n});' },
      { tipo: 'h2', texto: '🏋️ Exercícios' },
      { tipo: 'p', texto: '1. Crie rotas que retornam os status corretos para cada operação CRUD\n2. Implemente tratamento de erro 404 para recursos não encontrados\n3. Crie um middleware global de erro que retorna 500' },
    ]
  },
  {
    id: 7, titulo: 'CRUD Completo com Express',
    conteudo: [
      { tipo: 'h2', texto: 'Exemplo Real: API de Tarefas' },
      { tipo: 'code', lang: 'javascript', texto: 'const express = require("express");\nconst app = express();\napp.use(express.json());\n\nlet tarefas = [\n    { id: 1, titulo: "Estudar Node.js", concluida: false },\n    { id: 2, titulo: "Fazer exercícios", concluida: true },\n];\nlet nextId = 3;\n\n// READ ALL — GET /api/tarefas\napp.get("/api/tarefas", (req, res) => {\n    res.json(tarefas);\n});\n\n// READ ONE — GET /api/tarefas/:id\napp.get("/api/tarefas/:id", (req, res) => {\n    const tarefa = tarefas.find(t => t.id === parseInt(req.params.id));\n    if (!tarefa) return res.status(404).json({ erro: "Tarefa não encontrada" });\n    res.json(tarefa);\n});\n\n// CREATE — POST /api/tarefas\napp.post("/api/tarefas", (req, res) => {\n    const { titulo } = req.body;\n    if (!titulo) return res.status(400).json({ erro: "Título é obrigatório" });\n\n    const nova = { id: nextId++, titulo, concluida: false };\n    tarefas.push(nova);\n    res.status(201).json(nova);\n});\n\n// UPDATE — PUT /api/tarefas/:id\napp.put("/api/tarefas/:id", (req, res) => {\n    const tarefa = tarefas.find(t => t.id === parseInt(req.params.id));\n    if (!tarefa) return res.status(404).json({ erro: "Tarefa não encontrada" });\n\n    const { titulo, concluida } = req.body;\n    if (titulo !== undefined) tarefa.titulo = titulo;\n    if (concluida !== undefined) tarefa.concluida = concluida;\n    res.json(tarefa);\n});\n\n// DELETE — DELETE /api/tarefas/:id\napp.delete("/api/tarefas/:id", (req, res) => {\n    const index = tarefas.findIndex(t => t.id === parseInt(req.params.id));\n    if (index === -1) return res.status(404).json({ erro: "Tarefa não encontrada" });\n\n    tarefas.splice(index, 1);\n    res.status(204).send();\n});\n\napp.listen(3000, () => console.log("API rodando na porta 3000"));' },
      { tipo: 'callout', variante: 'info', texto: 'Este CRUD usa array na memória. Quando o servidor reinicia, os dados são perdidos. No Desafio 5, aprenderemos a usar banco de dados!' },
      { tipo: 'h2', texto: '🏋️ Exercícios' },
      { tipo: 'p', texto: '1. Teste todas as rotas com Postman ou Insomnia\n2. Adicione validações (título não vazio, id numérico)\n3. Adicione uma rota PATCH para atualizar só a flag concluida' },
    ]
  },
  {
    id: 8, titulo: 'CORS e Segurança',
    conteudo: [
      { tipo: 'h2', texto: 'O que é CORS?' },
      { tipo: 'p', texto: 'CORS (Cross-Origin Resource Sharing) é uma proteção do navegador que impede um site de acessar dados de outro domínio. Para sua API funcionar com um frontend separado, você precisa habilitar CORS:' },
      { tipo: 'code', lang: 'bash', texto: 'npm install cors' },
      { tipo: 'code', lang: 'javascript', texto: 'const cors = require("cors");\n\n// Permitir qualquer origem (desenvolvimento)\napp.use(cors());\n\n// Permitir origens específicas (produção)\napp.use(cors({\n    origin: ["http://localhost:3000", "https://meusite.com"],\n    methods: ["GET", "POST", "PUT", "DELETE"],\n}));' },
      { tipo: 'h2', texto: 'Boas Práticas de Segurança' },
      { tipo: 'p', texto: '1. **Helmet** — Adiciona headers de segurança\n2. **Rate Limiting** — Limita requisições por IP\n3. **Validação** — Nunca confie nos dados do cliente\n4. **HTTPS** — Sempre em produção\n5. **Variáveis de ambiente** — Nunca exponha senhas no código' },
      { tipo: 'code', lang: 'javascript', texto: 'const helmet = require("helmet");\nconst rateLimit = require("express-rate-limit");\n\napp.use(helmet());\n\nconst limiter = rateLimit({\n    windowMs: 15 * 60 * 1000,  // 15 minutos\n    max: 100,                   // 100 requests por janela\n});\napp.use(limiter);' },
      { tipo: 'h2', texto: '🏋️ Exercícios' },
      { tipo: 'p', texto: '1. Instale e configure o CORS na sua API\n2. Adicione rate limiting\n3. Instale o helmet' },
    ]
  },
  {
    id: 9, titulo: 'Organização de Projeto (MVC)',
    conteudo: [
      { tipo: 'h2', texto: 'Padrão MVC' },
      { tipo: 'p', texto: 'MVC divide o código em 3 camadas: **Model** (dados), **View** (interface) e **Controller** (lógica). Em APIs REST, focamos em Model e Controller:' },
      { tipo: 'code', lang: 'bash', texto: 'projeto/\n├── src/\n│   ├── controllers/    ← Lógica das rotas\n│   │   └── userController.js\n│   ├── routes/         ← Definição das rotas\n│   │   └── userRoutes.js\n│   ├── models/         ← Dados/Banco\n│   │   └── userModel.js\n│   ├── middlewares/    ← Middlewares customizados\n│   │   └── auth.js\n│   └── app.js          ← Configuração do Express\n├── .env\n├── .gitignore\n├── package.json\n└── server.js           ← Ponto de entrada' },
      { tipo: 'h2', texto: 'Exemplo de Separação' },
      { tipo: 'code', lang: 'javascript', texto: '// --- controllers/userController.js ---\nconst users = [];\n\nexports.listar = (req, res) => {\n    res.json(users);\n};\n\nexports.criar = (req, res) => {\n    const { nome, email } = req.body;\n    const user = { id: Date.now(), nome, email };\n    users.push(user);\n    res.status(201).json(user);\n};\n\n// --- routes/userRoutes.js ---\nconst express = require("express");\nconst router = express.Router();\nconst controller = require("../controllers/userController");\n\nrouter.get("/", controller.listar);\nrouter.post("/", controller.criar);\n\nmodule.exports = router;\n\n// --- app.js ---\nconst express = require("express");\nconst userRoutes = require("./routes/userRoutes");\nconst app = express();\napp.use(express.json());\napp.use("/api/users", userRoutes);\nmodule.exports = app;' },
      { tipo: 'h2', texto: '🏋️ Exercícios' },
      { tipo: 'p', texto: '1. Reorganize seu CRUD de tarefas seguindo o padrão MVC\n2. Separe rotas em arquivos (users, products, etc)\n3. Crie um middleware de validação reutilizável' },
    ]
  },
];
