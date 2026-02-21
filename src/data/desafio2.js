export const aulasDesafio2 = [
  {
    id: 1, titulo: 'Arrow Functions',
    conteudo: [
      { tipo: 'h2', texto: 'De Função Tradicional para Arrow Function' },
      { tipo: 'p', texto: 'Arrow functions são uma forma **mais curta** de escrever funções em JavaScript (ES6+):' },
      { tipo: 'code', lang: 'javascript', texto: '// Função tradicional\nfunction soma(a, b) {\n    return a + b;\n}\n\n// Arrow function\nconst soma = (a, b) => {\n    return a + b;\n};\n\n// Arrow function com retorno implícito (1 linha)\nconst soma = (a, b) => a + b;\n\n// Com 1 parâmetro: parênteses opcional\nconst dobro = n => n * 2;\n\nconsole.log(soma(5, 3));  // 8\nconsole.log(dobro(7));    // 14' },
      { tipo: 'h2', texto: 'Quando Usar Cada Uma?' },
      { tipo: 'table', headers: ['Cenário', 'Usar'], rows: [
        ['Callbacks curtos (map, filter)', 'Arrow function'],
        ['Métodos de objeto com `this`', 'Função tradicional'],
        ['Função com nome auto-documentado', 'Qualquer uma'],
      ]},
      { tipo: 'callout', variante: 'warning', texto: '**Diferença importante:** Arrow functions NÃO têm seu próprio `this`. Se precisar usar `this` dentro de um método de objeto, use função tradicional.' },
      { tipo: 'h2', texto: '🏋️ Exercícios' },
      { tipo: 'p', texto: '1. Converta 3 funções tradicionais para arrow functions\n2. Crie um array de números e use arrow function com `.map()` para dobrar todos\n3. Use arrow function com `.filter()` para filtrar números pares' },
    ]
  },
  {
    id: 2, titulo: 'Métodos de Array — map, filter, reduce',
    conteudo: [
      { tipo: 'h2', texto: 'map — Transformar Cada Item' },
      { tipo: 'p', texto: '`.map()` cria um **novo array** transformando cada item:' },
      { tipo: 'code', lang: 'javascript', texto: 'const numeros = [1, 2, 3, 4, 5];\n\nconst dobros = numeros.map(n => n * 2);\nconsole.log(dobros);  // [2, 4, 6, 8, 10]\n\n// Transformar objetos\nconst users = [{nome: "Ana", idade: 20}, {nome: "João", idade: 25}];\nconst nomes = users.map(user => user.nome);\nconsole.log(nomes);  // ["Ana", "João"]' },
      { tipo: 'h2', texto: 'filter — Filtrar Itens' },
      { tipo: 'p', texto: '`.filter()` cria um novo array com os itens que **passam no teste**:' },
      { tipo: 'code', lang: 'javascript', texto: 'const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\n\nconst pares = numeros.filter(n => n % 2 === 0);\nconsole.log(pares);  // [2, 4, 6, 8, 10]\n\nconst maioresQue5 = numeros.filter(n => n > 5);\nconsole.log(maioresQue5);  // [6, 7, 8, 9, 10]' },
      { tipo: 'h2', texto: 'reduce — Acumular em Um Valor' },
      { tipo: 'p', texto: '`.reduce()` **reduz** o array a um único valor (soma, média, objeto, etc.):' },
      { tipo: 'code', lang: 'javascript', texto: 'const numeros = [10, 20, 30, 40];\n\n// Somar tudo\nconst total = numeros.reduce((acumulador, atual) => {\n    return acumulador + atual;\n}, 0);  // 0 é o valor inicial\n\nconsole.log(total);  // 100\n\n// Forma curta\nconst total2 = numeros.reduce((acc, n) => acc + n, 0);' },
      { tipo: 'h2', texto: 'Encadeando Métodos' },
      { tipo: 'code', lang: 'javascript', texto: 'const alunos = [\n    { nome: "Ana", nota: 8 },\n    { nome: "João", nota: 5 },\n    { nome: "Maria", nota: 9 },\n    { nome: "Carlos", nota: 6 },\n];\n\n// Nomes dos aprovados (nota >= 7) em maiúsculo\nconst resultado = alunos\n    .filter(a => a.nota >= 7)\n    .map(a => a.nome.toUpperCase());\n\nconsole.log(resultado);  // ["ANA", "MARIA"]' },
      { tipo: 'h2', texto: '🏋️ Exercícios' },
      { tipo: 'p', texto: '1. Use `.map()` para converter preços de reais para dólares\n2. Use `.filter()` para encontrar produtos com preço > R$50\n3. Use `.reduce()` para calcular a soma total de um carrinho de compras\n4. Encadeie filter + map + reduce para calcular a média dos aprovados' },
    ]
  },
  {
    id: 3, titulo: 'Desestruturação (Destructuring)',
    conteudo: [
      { tipo: 'h2', texto: 'Desestruturação de Objetos' },
      { tipo: 'p', texto: 'Extraia valores de objetos diretamente em variáveis:' },
      { tipo: 'code', lang: 'javascript', texto: 'const pessoa = { nome: "Gabriel", idade: 22, cidade: "São Luís" };\n\n// ❌ Forma antiga\nconst nome = pessoa.nome;\nconst idade = pessoa.idade;\n\n// ✅ Desestruturação\nconst { nome, idade, cidade } = pessoa;\nconsole.log(nome);    // "Gabriel"\nconsole.log(cidade);  // "São Luís"\n\n// Renomeando\nconst { nome: nomeCompleto } = pessoa;\nconsole.log(nomeCompleto);  // "Gabriel"\n\n// Valor padrão\nconst { profissao = "Não informado" } = pessoa;\nconsole.log(profissao);  // "Não informado"' },
      { tipo: 'h2', texto: 'Desestruturação de Arrays' },
      { tipo: 'code', lang: 'javascript', texto: 'const cores = ["vermelho", "azul", "verde"];\n\nconst [primeira, segunda, terceira] = cores;\nconsole.log(primeira);  // "vermelho"\nconsole.log(segunda);   // "azul"\n\n// Pular itens\nconst [, , ultimaCor] = cores;\nconsole.log(ultimaCor);  // "verde"\n\n// Troca de variáveis!\nlet a = 1, b = 2;\n[a, b] = [b, a];\nconsole.log(a, b);  // 2, 1' },
      { tipo: 'h2', texto: 'Em Parâmetros de Função' },
      { tipo: 'code', lang: 'javascript', texto: '// ❌ Sem desestruturação\nfunction exibir(usuario) {\n    console.log(usuario.nome, usuario.idade);\n}\n\n// ✅ Com desestruturação\nfunction exibir({ nome, idade }) {\n    console.log(nome, idade);\n}\n\nexibir({ nome: "Ana", idade: 25 });' },
      { tipo: 'h2', texto: '🏋️ Exercícios' },
      { tipo: 'p', texto: '1. Desestruture um objeto de endereço (rua, numero, cidade, estado)\n2. Troque duas variáveis usando desestruturação de array\n3. Crie uma função que recebe um objeto de produto desestruturado' },
    ]
  },
  {
    id: 4, titulo: 'Spread e Rest Operators',
    conteudo: [
      { tipo: 'h2', texto: 'Spread (...) — Espalhar' },
      { tipo: 'p', texto: '**Spread** "espalha" os elementos de um array ou objeto:' },
      { tipo: 'code', lang: 'javascript', texto: '// Copiar array\nconst original = [1, 2, 3];\nconst copia = [...original];\nconsole.log(copia);  // [1, 2, 3] — é uma cópia independente!\n\n// Juntar arrays\nconst a = [1, 2];\nconst b = [3, 4];\nconst junto = [...a, ...b];\nconsole.log(junto);  // [1, 2, 3, 4]\n\n// Copiar e modificar objeto\nconst user = { nome: "Gabriel", idade: 22 };\nconst userAtualizado = { ...user, idade: 23 };\nconsole.log(userAtualizado);  // { nome: "Gabriel", idade: 23 }' },
      { tipo: 'h2', texto: 'Rest (...) — Agrupar' },
      { tipo: 'p', texto: '**Rest** agrupa o "resto" dos argumentos em um array:' },
      { tipo: 'code', lang: 'javascript', texto: '// Em parâmetros de função\nfunction soma(...numeros) {\n    return numeros.reduce((acc, n) => acc + n, 0);\n}\n\nconsole.log(soma(1, 2, 3));       // 6\nconsole.log(soma(10, 20, 30, 40)); // 100\n\n// Em desestruturação\nconst [primeiro, ...resto] = [1, 2, 3, 4, 5];\nconsole.log(primeiro);  // 1\nconsole.log(resto);     // [2, 3, 4, 5]' },
      { tipo: 'h2', texto: '🏋️ Exercícios' },
      { tipo: 'p', texto: '1. Crie uma função que aceita qualquer quantidade de números e retorna o maior\n2. Mescle dois objetos de configuração usando spread\n3. Crie uma cópia de array, adicione um item e compare com o original' },
    ]
  },
  {
    id: 5, titulo: 'Programação Orientada a Objetos (Classes)',
    conteudo: [
      { tipo: 'h2', texto: 'Classes em JavaScript' },
      { tipo: 'p', texto: 'Classes são **moldes** para criar objetos com propriedades e métodos:' },
      { tipo: 'code', lang: 'javascript', texto: 'class Animal {\n    constructor(nome, tipo) {\n        this.nome = nome;\n        this.tipo = tipo;\n    }\n\n    falar() {\n        console.log(`${this.nome} faz um som!`);\n    }\n}\n\nconst gato = new Animal("Mimi", "Gato");\ngato.falar();  // "Mimi faz um som!"' },
      { tipo: 'h2', texto: 'Herança (extends)' },
      { tipo: 'code', lang: 'javascript', texto: 'class Cachorro extends Animal {\n    constructor(nome, raca) {\n        super(nome, "Cachorro");  // Chama o constructor da classe pai\n        this.raca = raca;\n    }\n\n    falar() {\n        console.log(`${this.nome} late: Au au!`);\n    }\n\n    buscar(item) {\n        console.log(`${this.nome} buscou ${item}!`);\n    }\n}\n\nconst rex = new Cachorro("Rex", "Labrador");\nrex.falar();           // "Rex late: Au au!"\nrex.buscar("bola");    // "Rex buscou bola!"' },
      { tipo: 'h2', texto: '🏋️ Exercícios' },
      { tipo: 'p', texto: '1. Crie uma classe `ContaBancaria` com depositar, sacar e verSaldo\n2. Crie uma classe `Funcionario` que herda de `Pessoa`\n3. Crie uma classe `Produto` com desconto e toString' },
    ]
  },
  {
    id: 6, titulo: 'JSON — Dados Estruturados',
    conteudo: [
      { tipo: 'h2', texto: 'O que é JSON?' },
      { tipo: 'p', texto: 'JSON (JavaScript Object Notation) é um formato para **trocar dados** entre sistemas. APIs, bancos de dados, arquivos de configuração... tudo usa JSON!' },
      { tipo: 'code', lang: 'javascript', texto: '// Objeto JavaScript → JSON (string)\nconst user = { nome: "Gabriel", idade: 22 };\nconst json = JSON.stringify(user);\nconsole.log(json);        // \'{"nome":"Gabriel","idade":22}\'\nconsole.log(typeof json); // "string"\n\n// JSON (string) → Objeto JavaScript\nconst jsonStr = \'{"nome":"Maria","idade":25}\';\nconst obj = JSON.parse(jsonStr);\nconsole.log(obj.nome);    // "Maria"\nconsole.log(typeof obj);  // "object"' },
      { tipo: 'h2', texto: 'JSON com Formatação' },
      { tipo: 'code', lang: 'javascript', texto: 'const dados = {\n    alunos: [\n        { nome: "Ana", nota: 8 },\n        { nome: "João", nota: 9 }\n    ]\n};\n\n// null = sem filtro, 2 = indentação de 2 espaços\nconsole.log(JSON.stringify(dados, null, 2));\n// {\n//   "alunos": [\n//     { "nome": "Ana", "nota": 8 },\n//     { "nome": "João", "nota": 9 }\n//   ]\n// }' },
      { tipo: 'h2', texto: '🏋️ Exercícios' },
      { tipo: 'p', texto: '1. Converta um array de objetos para JSON e de volta\n2. Leia um arquivo JSON com `fs.readFileSync` e parse os dados\n3. Salve dados em um arquivo `.json`' },
    ]
  },
  {
    id: 7, titulo: 'Tratamento de Erros (try/catch)',
    conteudo: [
      { tipo: 'h2', texto: 'Por que Tratar Erros?' },
      { tipo: 'p', texto: 'Erros são inevitáveis: arquivo não existe, JSON mal formatado, API fora do ar. O `try/catch` permite **capturar erros** sem que o programa quebre:' },
      { tipo: 'code', lang: 'javascript', texto: 'try {\n    const json = \'{"invalido": \';  // JSON quebrado!\n    const obj = JSON.parse(json);\n} catch (erro) {\n    console.log("Erro capturado:", erro.message);\n    // "Erro capturado: Unexpected end of JSON input"\n} finally {\n    console.log("Sempre executa, com ou sem erro");\n}' },
      { tipo: 'h2', texto: 'Lançando Erros Personalizados' },
      { tipo: 'code', lang: 'javascript', texto: 'function dividir(a, b) {\n    if (b === 0) {\n        throw new Error("Divisão por zero não é permitida!");\n    }\n    return a / b;\n}\n\ntry {\n    console.log(dividir(10, 2));  // 5\n    console.log(dividir(10, 0));  // Lança erro!\n} catch (e) {\n    console.log(`❌ ${e.message}`);\n}' },
      { tipo: 'h2', texto: 'Validação Robusta' },
      { tipo: 'code', lang: 'javascript', texto: 'function cadastrar(nome, email) {\n    if (!nome || nome.trim() === "") {\n        throw new Error("Nome é obrigatório");\n    }\n    if (!email || !email.includes("@")) {\n        throw new Error("Email inválido");\n    }\n    return { nome, email, criadoEm: new Date() };\n}\n\ntry {\n    const user = cadastrar("Gabriel", "gab@email.com");\n    console.log("✅ Cadastrado:", user);\n} catch (e) {\n    console.log("❌ Erro:", e.message);\n}' },
      { tipo: 'h2', texto: '🏋️ Exercícios' },
      { tipo: 'p', texto: '1. Crie uma função que valida idade (0-150) com try/catch\n2. Trate erros de leitura de arquivo (fs.readFileSync)\n3. Crie validações para um formulário de cadastro' },
    ]
  },
  {
    id: 8, titulo: 'Callbacks e Escopo (Closures)',
    conteudo: [
      { tipo: 'h2', texto: 'Callbacks' },
      { tipo: 'p', texto: 'Um callback é uma **função passada como argumento** para outra função:' },
      { tipo: 'code', lang: 'javascript', texto: 'function processarPedido(id, callback) {\n    console.log(`Processando pedido ${id}...`);\n    // Simula delay\n    setTimeout(() => {\n        const pedido = { id, status: "pronto", total: 59.90 };\n        callback(pedido);  // Chama o callback com o resultado\n    }, 1000);\n}\n\nprocessarPedido(123, (pedido) => {\n    console.log("Pedido pronto:", pedido);\n});' },
      { tipo: 'h2', texto: 'Escopo' },
      { tipo: 'p', texto: 'Variáveis só existem dentro do **bloco** onde foram declaradas:' },
      { tipo: 'code', lang: 'javascript', texto: 'let global = "Sou global";\n\nfunction teste() {\n    let local = "Sou local";\n    console.log(global);  // ✅ Acessa variável de fora\n    console.log(local);   // ✅ Acessa variável local\n}\n\nteste();\n// console.log(local);  // ❌ ERRO! Não existe fora da função' },
      { tipo: 'h2', texto: 'Closures' },
      { tipo: 'p', texto: 'Uma closure é quando uma função **"lembra"** das variáveis do escopo onde foi criada:' },
      { tipo: 'code', lang: 'javascript', texto: 'function criarContador() {\n    let contagem = 0;  // Variável "presa" na closure\n\n    return {\n        incrementar: () => ++contagem,\n        decrementar: () => --contagem,\n        valor: () => contagem,\n    };\n}\n\nconst contador = criarContador();\nconsole.log(contador.incrementar());  // 1\nconsole.log(contador.incrementar());  // 2\nconsole.log(contador.decrementar());  // 1\nconsole.log(contador.valor());        // 1\n// A variável "contagem" está protegida! Não pode ser acessada diretamente.' },
      { tipo: 'callout', variante: 'tip', texto: 'Closures são fundamentais para entender coisas como módulos, React hooks, middlewares do Express e muito mais!' },
      { tipo: 'h2', texto: '🏋️ Exercícios' },
      { tipo: 'p', texto: '1. Crie uma função com callback que simula busca em banco de dados\n2. Crie um contador com closure (incrementar, decrementar, resetar)\n3. Crie uma "fábrica" de multiplicadores usando closure' },
    ]
  },
];
