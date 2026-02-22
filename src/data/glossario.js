export const glossario = [
  // A
  { termo: 'API', definicao: 'Interface de Programação de Aplicações — um conjunto de regras que permite que programas se comuniquem entre si.', exemplo: 'fetch("https://api.exemplo.com/dados")' },
  { termo: 'Array', definicao: 'Uma lista ordenada que pode guardar múltiplos valores em uma única variável.', exemplo: 'let frutas = ["Maçã", "Banana", "Laranja"]' },
  { termo: 'Arrow Function', definicao: 'Forma curta de escrever funções usando a seta =>.', exemplo: 'const dobro = (n) => n * 2;' },
  { termo: 'Async/Await', definicao: 'Sintaxe para trabalhar com operações assíncronas de forma mais legível.', exemplo: 'const dados = await fetch(url);' },
  // B
  { termo: 'Backend', definicao: 'A parte "invisível" de uma aplicação — servidor, banco de dados e lógica de negócio.', exemplo: 'Express.js, Node.js, banco SQL' },
  { termo: 'Boolean', definicao: 'Tipo de dado que só pode ser true (verdadeiro) ou false (falso).', exemplo: 'let ativo = true;' },
  { termo: 'Bug', definicao: 'Um erro no código que faz o programa se comportar de forma inesperada.', exemplo: 'Escrever = ao invés de === numa condição' },
  // C
  { termo: 'Callback', definicao: 'Uma função passada como argumento para outra função, para ser executada depois.', exemplo: 'setTimeout(() => console.log("Oi"), 1000)' },
  { termo: 'Classe', definicao: 'Um modelo/molde para criar objetos com propriedades e métodos em comum.', exemplo: 'class Animal { constructor(nome) { this.nome = nome; } }' },
  { termo: 'CLI', definicao: 'Interface de Linha de Comando — programa que você usa digitando comandos no terminal.', exemplo: 'npm install, node app.js' },
  { termo: 'Condição', definicao: 'Uma expressão que é avaliada como verdadeira ou falsa, usada em if/else.', exemplo: 'if (idade >= 18) { ... }' },
  { termo: 'Console', definicao: 'Ferramenta de depuração que mostra mensagens e resultados no terminal ou navegador.', exemplo: 'console.log("Hello!")' },
  { termo: 'Const', definicao: 'Palavra-chave para declarar uma variável que NÃO pode ser reatribuída.', exemplo: 'const PI = 3.14159;' },
  { termo: 'CORS', definicao: 'Mecanismo de segurança que controla quais sites podem acessar sua API.', exemplo: 'app.use(cors())' },
  { termo: 'CRUD', definicao: 'As 4 operações básicas de dados: Create, Read, Update, Delete.', exemplo: 'POST, GET, PUT, DELETE em uma API' },
  // D
  { termo: 'Desestruturação', definicao: 'Sintaxe para extrair valores de arrays ou objetos em variáveis separadas.', exemplo: 'const { nome, idade } = pessoa;' },
  { termo: 'Deploy', definicao: 'Publicar sua aplicação em um servidor para que outros possam acessá-la.', exemplo: 'Fazer deploy na Vercel ou Heroku' },
  // E
  { termo: 'Escopo', definicao: 'A região do código onde uma variável existe e pode ser acessada.', exemplo: 'Variável declarada dentro de { } só existe ali' },
  { termo: 'Evento', definicao: 'Uma ação que acontece no programa, como clique, tecla pressionada ou carregamento.', exemplo: 'button.addEventListener("click", handler)' },
  { termo: 'Expressão', definicao: 'Um pedaço de código que produz um valor.', exemplo: '5 + 3, nome.length, x > 10' },
  // F
  { termo: 'Framework', definicao: 'Um conjunto de ferramentas e padrões prontos para construir aplicações.', exemplo: 'Express.js, Next.js, React' },
  { termo: 'Frontend', definicao: 'A parte visual de uma aplicação — o que o usuário vê e interage.', exemplo: 'HTML, CSS, JavaScript no navegador' },
  { termo: 'Função', definicao: 'Um bloco de código reutilizável que executa uma tarefa específica.', exemplo: 'function soma(a, b) { return a + b; }' },
  // H
  { termo: 'HTTP', definicao: 'Protocolo usado para comunicação na web — como navegador e servidor conversam.', exemplo: 'GET /api/users, POST /api/login' },
  // I
  { termo: 'If/Else', definicao: 'Estrutura condicional que executa código diferente baseado em uma condição.', exemplo: 'if (nota >= 7) { aprovado } else { reprovado }' },
  // J
  { termo: 'JSON', definicao: 'Formato de texto para trocar dados — parece um objeto JavaScript.', exemplo: '{"nome": "Gabriel", "idade": 22}' },
  { termo: 'JWT', definicao: 'Token de autenticação — prova que o usuário está logado, sem precisar consultar o banco.', exemplo: 'Authorization: Bearer eyJhbG...' },
  // L
  { termo: 'Let', definicao: 'Palavra-chave para declarar uma variável que PODE ser reatribuída.', exemplo: 'let contador = 0; contador++;' },
  { termo: 'Loop', definicao: 'Estrutura que repete um bloco de código várias vezes.', exemplo: 'for (let i = 0; i < 10; i++) { ... }' },
  // M
  { termo: 'Método', definicao: 'Uma função que pertence a um objeto.', exemplo: 'array.push(4), string.toUpperCase()' },
  { termo: 'Middleware', definicao: 'Função que intercepta requisições antes de chegarem à rota final.', exemplo: 'app.use(express.json())' },
  { termo: 'Módulo', definicao: 'Um arquivo JavaScript que exporta funcionalidades para serem usadas em outros arquivos.', exemplo: 'export function soma() { ... }' },
  // N
  { termo: 'Node.js', definicao: 'Ambiente que permite executar JavaScript fora do navegador, no servidor.', exemplo: 'node app.js' },
  { termo: 'NPM', definicao: 'Gerenciador de pacotes do Node.js — instala e gerencia bibliotecas.', exemplo: 'npm install express' },
  { termo: 'Null', definicao: 'Valor que representa "nada" ou "vazio" intencionalmente.', exemplo: 'let resultado = null;' },
  // O
  { termo: 'Objeto', definicao: 'Uma coleção de propriedades (chave: valor) que representa algo.', exemplo: 'let pessoa = { nome: "Ana", idade: 25 }' },
  { termo: 'Operador', definicao: 'Símbolo que realiza uma operação sobre valores.', exemplo: '+, -, *, /, ===, &&, ||' },
  // P
  { termo: 'Parâmetro', definicao: 'Variável listada na definição de uma função que recebe valores.', exemplo: 'function saudar(nome) { ... } // nome é parâmetro' },
  { termo: 'Promise', definicao: 'Objeto que representa o resultado futuro de uma operação assíncrona.', exemplo: 'fetch(url).then(res => res.json())' },
  // R
  { termo: 'REST', definicao: 'Estilo de arquitetura para APIs que usa os métodos HTTP (GET, POST, PUT, DELETE).', exemplo: 'GET /api/users → lista usuários' },
  { termo: 'Return', definicao: 'Palavra-chave que faz uma função devolver um valor e parar de executar.', exemplo: 'return a + b;' },
  { termo: 'Rota', definicao: 'Um caminho (URL) que o servidor reconhece e responde.', exemplo: 'app.get("/api/users", handler)' },
  // S
  { termo: 'Spread', definicao: 'Operador (...) que espalha os elementos de um array/objeto.', exemplo: 'let novo = [...antigo, 4, 5]' },
  { termo: 'String', definicao: 'Tipo de dado que representa texto — sempre entre aspas.', exemplo: '"Olá, mundo!", \'JavaScript\', `template`' },
  { termo: 'Switch', definicao: 'Estrutura condicional para múltiplas opções — alternativa ao if/else if.', exemplo: 'switch(dia) { case 1: ... break; }' },
  // T
  { termo: 'Template Literal', definicao: 'String especial com crases que permite interpolação de variáveis.', exemplo: '`Olá, ${nome}! Você tem ${idade} anos.`' },
  { termo: 'Tipo de Dado', definicao: 'A categoria de um valor — string, number, boolean, etc.', exemplo: 'typeof "hello" → "string"' },
  // U
  { termo: 'Undefined', definicao: 'Valor atribuído automaticamente a variáveis que foram declaradas mas não inicializadas.', exemplo: 'let x; console.log(x); // undefined' },
  // V
  { termo: 'Variável', definicao: 'Uma "caixinha nomeada" que guarda um valor na memória do computador.', exemplo: 'let nome = "Gabriel";' },
  { termo: 'Var', definicao: 'Forma antiga de declarar variáveis — evite usar! Prefira let ou const.', exemplo: 'var x = 10; // legado, não use' },
];
