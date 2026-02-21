export const aulasDesafio3 = [
  {
    id: 1, titulo: 'O que é Node.js?',
    conteudo: [
      { tipo: 'h2', texto: 'JavaScript fora do Navegador' },
      { tipo: 'p', texto: 'Antes do Node.js, JavaScript só funcionava no navegador. O **Node.js** é um **runtime** que permite executar JavaScript no **servidor** e no **terminal** da sua máquina.' },
      { tipo: 'callout', variante: 'info', texto: '**Analogia:** O navegador é como uma TV que entende JavaScript. O Node.js é como um computador que também entende JavaScript — mas pode fazer muito mais coisas (ler arquivos, criar servidores, acessar bancos de dados).' },
      { tipo: 'h2', texto: 'Instalando e Usando' },
      { tipo: 'code', lang: 'bash', texto: '# Verificar se já tem Node.js\nnode -v    # v20.x.x\nnpm -v     # 10.x.x\n\n# Executar um arquivo\nnode app.js\n\n# Abrir o REPL (terminal interativo)\nnode' },
      { tipo: 'h2', texto: 'Primeiro Programa' },
      { tipo: 'code', lang: 'javascript', texto: '// app.js\nconsole.log("Olá do Node.js! 🚀");\nconsole.log(`Versão do Node: ${process.version}`);\nconsole.log(`Sistema: ${process.platform}`);\nconsole.log(`Pasta atual: ${process.cwd()}`);' },
      { tipo: 'h2', texto: 'Diferenças do Node vs Navegador' },
      { tipo: 'table', headers: ['Feature', 'Navegador', 'Node.js'], rows: [
        ['DOM', '✅ `document`, `window`', '❌ Não existe'],
        ['Arquivo', '❌ Não pode', '✅ `fs` module'],
        ['Servidor', '❌ Não pode', '✅ `http` module'],
        ['NPM', '❌', '✅ Gerenciador de pacotes'],
        ['Console', '✅', '✅'],
      ]},
      { tipo: 'h2', texto: '🏋️ Exercícios' },
      { tipo: 'p', texto: '1. Instale o Node.js e verifique a versão\n2. Crie um arquivo que imprime seu nome e a data atual\n3. Use `process.argv` para receber argumentos do terminal' },
    ]
  },
  {
    id: 2, titulo: 'NPM — Gerenciador de Pacotes',
    conteudo: [
      { tipo: 'h2', texto: 'O que é NPM?' },
      { tipo: 'p', texto: '**NPM** (Node Package Manager) é o gerenciador de pacotes do Node.js. Com ele você instala bibliotecas (pacotes) criadas por outros desenvolvedores.' },
      { tipo: 'h2', texto: 'Inicializando um Projeto' },
      { tipo: 'code', lang: 'bash', texto: '# Criar package.json (com perguntas)\nnpm init\n\n# Criar package.json padrão (sem perguntas)\nnpm init -y' },
      { tipo: 'h2', texto: 'Instalando Pacotes' },
      { tipo: 'code', lang: 'bash', texto: '# Instalar como dependência do projeto\nnpm install chalk          # npm i chalk (atalho)\n\n# Instalar como dependência de desenvolvimento\nnpm install nodemon --save-dev\n\n# Instalar globalmente (ferramenta CLI)\nnpm install -g nodemon\n\n# Desinstalar\nnpm uninstall chalk' },
      { tipo: 'h2', texto: 'package.json — O Coração do Projeto' },
      { tipo: 'code', lang: 'json', texto: '{\n  "name": "meu-projeto",\n  "version": "1.0.0",\n  "description": "Meu primeiro projeto Node",\n  "main": "index.js",\n  "scripts": {\n    "start": "node index.js",\n    "dev": "nodemon index.js"\n  },\n  "dependencies": {\n    "chalk": "^5.0.0"\n  },\n  "devDependencies": {\n    "nodemon": "^3.0.0"\n  }\n}' },
      { tipo: 'callout', variante: 'warning', texto: '**Nunca suba `node_modules` para o Git!** Adicione no `.gitignore`. A pasta pode ter milhares de arquivos. Outros devs usam `npm install` para baixar.' },
      { tipo: 'h2', texto: '🏋️ Exercícios' },
      { tipo: 'p', texto: '1. Inicialize um projeto com `npm init -y`\n2. Instale o pacote `chalk` e use para colorir o terminal\n3. Crie scripts personalizados no package.json' },
    ]
  },
  {
    id: 3, titulo: 'CommonJS (require/module.exports)',
    conteudo: [
      { tipo: 'h2', texto: 'Módulos com CommonJS' },
      { tipo: 'p', texto: 'CommonJS é o sistema de módulos **padrão do Node.js**. Cada arquivo é um módulo isolado:' },
      { tipo: 'code', lang: 'javascript', texto: '// --- math.js (exportando) ---\nfunction somar(a, b) {\n    return a + b;\n}\n\nfunction subtrair(a, b) {\n    return a - b;\n}\n\nmodule.exports = { somar, subtrair };\n\n// --- app.js (importando) ---\nconst { somar, subtrair } = require("./math");\n\nconsole.log(somar(5, 3));      // 8\nconsole.log(subtrair(10, 4));   // 6' },
      { tipo: 'h2', texto: 'Exportar uma Coisa Só' },
      { tipo: 'code', lang: 'javascript', texto: '// --- saudacao.js ---\nmodule.exports = function(nome) {\n    return `Olá, ${nome}!`;\n};\n\n// --- app.js ---\nconst saudacao = require("./saudacao");\nconsole.log(saudacao("Gabriel"));  // "Olá, Gabriel!"' },
      { tipo: 'h2', texto: '🏋️ Exercícios' },
      { tipo: 'p', texto: '1. Crie um módulo `calculadora.js` com 4 operações\n2. Importe e use no `app.js`\n3. Crie um módulo que exporta um array de dados' },
    ]
  },
  {
    id: 4, titulo: 'ES Modules (import/export)',
    conteudo: [
      { tipo: 'h2', texto: 'System de Módulos Moderno' },
      { tipo: 'p', texto: 'ES Modules é o padrão **moderno** de JavaScript. Para usar no Node.js, adicione `"type": "module"` no `package.json`:' },
      { tipo: 'code', lang: 'javascript', texto: '// --- math.js ---\nexport function somar(a, b) {\n    return a + b;\n}\n\nexport function multiplicar(a, b) {\n    return a * b;\n}\n\n// Export default (principal)\nexport default function dividir(a, b) {\n    return a / b;\n}\n\n// --- app.js ---\nimport dividir, { somar, multiplicar } from "./math.js";\n\nconsole.log(somar(5, 3));        // 8\nconsole.log(multiplicar(4, 5));  // 20\nconsole.log(dividir(10, 2));     // 5' },
      { tipo: 'h2', texto: 'CommonJS vs ES Modules' },
      { tipo: 'table', headers: ['Feature', 'CommonJS', 'ES Modules'], rows: [
        ['Sintaxe', '`require()` / `module.exports`', '`import` / `export`'],
        ['Carregamento', 'Síncrono', 'Assíncrono'],
        ['Configurar', 'Padrão no Node', '`"type": "module"` no package.json'],
        ['Usado em', 'Node.js legado', 'Navegadores + Node moderno'],
      ]},
      { tipo: 'h2', texto: '🏋️ Exercícios' },
      { tipo: 'p', texto: '1. Converta o módulo CommonJS para ES Modules\n2. Use export default e named exports\n3. Importe um pacote do NPM usando import' },
    ]
  },
  {
    id: 5, titulo: 'File System (fs) — Manipulando Arquivos',
    conteudo: [
      { tipo: 'h2', texto: 'Lendo Arquivos' },
      { tipo: 'code', lang: 'javascript', texto: 'const fs = require("fs");\n\n// Síncrono (bloqueia)\nconst conteudo = fs.readFileSync("dados.txt", "utf-8");\nconsole.log(conteudo);\n\n// Assíncrono (não bloqueia)\nfs.readFile("dados.txt", "utf-8", (err, data) => {\n    if (err) {\n        console.error("Erro:", err.message);\n        return;\n    }\n    console.log(data);\n});' },
      { tipo: 'h2', texto: 'Escrevendo Arquivos' },
      { tipo: 'code', lang: 'javascript', texto: '// Escrever (substitui o conteúdo todo)\nfs.writeFileSync("saida.txt", "Hello World!");\n\n// Adicionar ao final\nfs.appendFileSync("log.txt", `[${new Date().toISOString()}] Ação executada\\n`);\n\n// Verificar se arquivo existe\nif (fs.existsSync("config.json")) {\n    const config = JSON.parse(fs.readFileSync("config.json", "utf-8"));\n    console.log(config);\n}' },
      { tipo: 'h2', texto: 'Trabalhando com JSON' },
      { tipo: 'code', lang: 'javascript', texto: '// Ler JSON\nconst dados = JSON.parse(fs.readFileSync("users.json", "utf-8"));\n\n// Modificar e salvar\ndados.push({ nome: "Novo User", email: "novo@email.com" });\nfs.writeFileSync("users.json", JSON.stringify(dados, null, 2));' },
      { tipo: 'h2', texto: '🏋️ Exercícios' },
      { tipo: 'p', texto: '1. Crie um programa que lê e exibe um arquivo .txt\n2. Crie um logger que adiciona mensagens com data/hora a um arquivo\n3. Leia um JSON, adicione um item e salve' },
    ]
  },
  {
    id: 6, titulo: 'Programação Assíncrona (Promises, async/await)',
    conteudo: [
      { tipo: 'h2', texto: 'O Problema: Código que Demora' },
      { tipo: 'p', texto: 'Algumas operações demoram: ler arquivo, consultar API, acessar banco de dados. JavaScript usa **assincronismo** para não travar o programa enquanto espera.' },
      { tipo: 'h2', texto: 'Promises' },
      { tipo: 'code', lang: 'javascript', texto: '// Criando uma Promise\nfunction buscarUsuario(id) {\n    return new Promise((resolve, reject) => {\n        setTimeout(() => {\n            if (id <= 0) reject(new Error("ID inválido"));\n            resolve({ id, nome: "Gabriel" });\n        }, 1000);\n    });\n}\n\n// Usando com .then/.catch\nbuscarUsuario(1)\n    .then(user => console.log("Encontrou:", user))\n    .catch(err => console.error("Erro:", err.message));' },
      { tipo: 'h2', texto: 'async/await — Forma Moderna' },
      { tipo: 'p', texto: '`async/await` é uma forma **mais limpa** de trabalhar com Promises:' },
      { tipo: 'code', lang: 'javascript', texto: 'async function main() {\n    try {\n        const user = await buscarUsuario(1);\n        console.log("Encontrou:", user);\n\n        const posts = await buscarPosts(user.id);\n        console.log("Posts:", posts);\n    } catch (err) {\n        console.error("Erro:", err.message);\n    }\n}\n\nmain();' },
      { tipo: 'callout', variante: 'tip', texto: '**Regra de ouro:** sempre que ver `.then()`, pode converter para `await`. É mais legível e evita "callback hell".' },
      { tipo: 'h2', texto: '🏋️ Exercícios' },
      { tipo: 'p', texto: '1. Crie uma função que simula delay com Promise + setTimeout\n2. Converta um código com .then/.catch para async/await\n3. Use Promise.all para executar 3 Promises em paralelo' },
    ]
  },
  {
    id: 7, titulo: 'Readline — Entrada pelo Terminal',
    conteudo: [
      { tipo: 'h2', texto: 'Lendo Entrada do Usuário' },
      { tipo: 'code', lang: 'javascript', texto: 'const readline = require("readline");\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nrl.question("Qual seu nome? ", (nome) => {\n    rl.question("Qual sua idade? ", (idade) => {\n        console.log(`\\n${nome} tem ${idade} anos!`);\n        rl.close();\n    });\n});' },
      { tipo: 'h2', texto: 'Versão com Promises (Mais Limpa)' },
      { tipo: 'code', lang: 'javascript', texto: 'const readline = require("readline");\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nfunction perguntar(pergunta) {\n    return new Promise((resolve) => {\n        rl.question(pergunta, resolve);\n    });\n}\n\nasync function main() {\n    const nome = await perguntar("Nome: ");\n    const idade = await perguntar("Idade: ");\n    const cidade = await perguntar("Cidade: ");\n\n    console.log(`\\n${nome}, ${idade} anos, de ${cidade}`);\n    rl.close();\n}\n\nmain();' },
      { tipo: 'h2', texto: '🏋️ Exercícios' },
      { tipo: 'p', texto: '1. Crie um cadastro pelo terminal (nome, email, idade)\n2. Faça um quiz com 5 perguntas e mostrar a pontuação\n3. Crie um menu interativo com opções numéricas' },
    ]
  },
  {
    id: 8, titulo: 'Servidor HTTP Básico',
    conteudo: [
      { tipo: 'h2', texto: 'Criando um Servidor Web' },
      { tipo: 'code', lang: 'javascript', texto: 'const http = require("http");\n\nconst server = http.createServer((req, res) => {\n    console.log(`${req.method} ${req.url}`);\n\n    if (req.url === "/") {\n        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });\n        res.end("<h1>🚀 Olá do Node.js!</h1>");\n    } else if (req.url === "/api/data") {\n        res.writeHead(200, { "Content-Type": "application/json" });\n        res.end(JSON.stringify({ mensagem: "Dados da API" }));\n    } else {\n        res.writeHead(404);\n        res.end("Página não encontrada");\n    }\n});\n\nconst PORT = 3000;\nserver.listen(PORT, () => {\n    console.log(`Servidor rodando em http://localhost:${PORT}`);\n});' },
      { tipo: 'callout', variante: 'info', texto: 'Este servidor nativo é didático. Na prática, usamos o **Express.js** (próximo desafio) que simplifica tudo isso!' },
      { tipo: 'h2', texto: '🏋️ Exercícios' },
      { tipo: 'p', texto: '1. Crie um servidor que responde "Olá Mundo" na rota /\n2. Adicione rotas /sobre e /contato\n3. Retorne JSON em uma rota /api/usuarios' },
    ]
  },
  {
    id: 9, titulo: 'Variáveis de Ambiente (.env)',
    conteudo: [
      { tipo: 'h2', texto: 'Por que Usar?' },
      { tipo: 'p', texto: 'Variáveis de ambiente guardam configurações **sensíveis** (senhas, chaves de API, URLs de banco) fora do código:' },
      { tipo: 'h2', texto: 'Configurando com dotenv' },
      { tipo: 'code', lang: 'bash', texto: '# Instalar\nnpm install dotenv\n\n# Criar arquivo .env na raiz\necho "PORT=3000" > .env\necho "DB_HOST=localhost" >> .env\necho "API_KEY=minha-chave-secreta" >> .env' },
      { tipo: 'code', lang: 'javascript', texto: '// app.js\nrequire("dotenv").config();\n\nconst PORT = process.env.PORT || 3000;\nconst DB_HOST = process.env.DB_HOST;\nconst API_KEY = process.env.API_KEY;\n\nconsole.log(`Porta: ${PORT}`);\nconsole.log(`Banco: ${DB_HOST}`);\n// Nunca faça console.log da API_KEY em produção!' },
      { tipo: 'callout', variante: 'warning', texto: '**NUNCA suba o arquivo `.env` para o Git!** Adicione `.env` no `.gitignore`. Compartilhe apenas o `.env.example` sem os valores reais.' },
      { tipo: 'h2', texto: '🏋️ Exercícios' },
      { tipo: 'p', texto: '1. Crie um .env com PORT e DATABASE_URL\n2. Use dotenv para ler as variáveis no seu app\n3. Crie um .env.example sem valores sensíveis' },
    ]
  },
  {
    id: 10, titulo: 'Nodemon — Reinício Automático',
    conteudo: [
      { tipo: 'h2', texto: 'O Problema' },
      { tipo: 'p', texto: 'Toda vez que você altera um arquivo, precisa parar o servidor (Ctrl+C) e rodar `node app.js` novamente. O **Nodemon** faz isso automaticamente!' },
      { tipo: 'h2', texto: 'Instalando e Usando' },
      { tipo: 'code', lang: 'bash', texto: '# Instalar como dependência de desenvolvimento\nnpm install nodemon --save-dev\n\n# Usar direto\nnpx nodemon app.js' },
      { tipo: 'h2', texto: 'Configuração no package.json' },
      { tipo: 'code', lang: 'json', texto: '{\n  "scripts": {\n    "start": "node app.js",\n    "dev": "nodemon app.js"\n  }\n}' },
      { tipo: 'code', lang: 'bash', texto: '# Agora basta rodar:\nnpm run dev\n\n# O nodemon observa mudanças e reinicia automaticamente!' },
      { tipo: 'callout', variante: 'tip', texto: 'Use `npm run dev` para desenvolvimento e `npm start` para produção. Nodemon é só para desenvolvimento!' },
      { tipo: 'h2', texto: '🏋️ Exercícios' },
      { tipo: 'p', texto: '1. Instale o nodemon e configure os scripts\n2. Crie um servidor e veja o reinício automático ao salvar\n3. Configure quais pastas o nodemon deve observar' },
    ]
  },
];
