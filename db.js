// carrega biblioteca MySQL2 trabalha com callback, aqui uma versão mais profissional 
// utilizando promise.
const mysql = require("mysql2/promise");

// createPool gerencia abertura e fechamento da conexão automaticamente.
// caso utilize a opção create apenas, precisamos abrir e fechar a conexão
// toda vez que usar. 
const client = mysql.createPool(process.env.CONNECTION_STRING);

// função deve ser assincrona  bem como deve-se utilizar o await na solicitação ao banco
async function selectMps(){
    // armazena em results a consulta feita no banco de todos os clientes cadastrados.
    const results = await client.query("SELECT * FROM materiaprima;");
    // deve-se utlizar results[0], pois caso contrário a função retorna outros metadados.
    return results[0];
}

// função que retorna somente um cliente listado pelo id
async function selectMp(id){
    const results = await client.query("SELECT * FROM materiaprima WHERE idMp=?;",[id]);
    return results[0];
}

// função deve ser assincrona  bem como deve-se utilizar o await na solicitação ao banco
async function selectGrs(){
    // armazena em results a consulta feita no banco de todos os clientes cadastrados.
    const results = await client.query("SELECT * FROM grades;");
    // deve-se utlizar results[0], pois caso contrário a função retorna outros metadados.
    return results[0];
}

// função que retorna somente um cliente listado pelo id
async function selectGr(id){
    const results = await client.query("SELECT * FROM grades WHERE idGr=?;",[id]);
    return results[0];
}

// função deve ser assincrona  bem como deve-se utilizar o await na solicitação ao banco
async function selectEqs(){
    // armazena em results a consulta feita no banco de todos os clientes cadastrados.
    const results = await client.query("SELECT * FROM produtofinal;");
    // deve-se utlizar results[0], pois caso contrário a função retorna outros metadados.
    return results[0];
}

// função que retorna somente um cliente listado pelo id
async function selectEq(id){
    const results = await client.query("SELECT * FROM produtofinal WHERE idEq=?;",[id]);
    return results[0];
}

// retorna uma estrutura do GR selecionado
async function selectEstruturaGr(idGr){
    const results = await client.query("SELECT * FROM estruturagr WHERE idGr=?;",[idGr]);
    return results[0];
}

// retorna uma estrutura do equipamento selecionado
async function selectEstruturaEq(idEq){
    const results = await client.query("SELECT * FROM estruturaeq WHERE idEq=?;",[idEq]);
    return results[0];
}

// retorna uma estrutura do equipamento selecionado
async function selectTipoProdutos(){
    const results = await client.query("SELECT * FROM tipoproduto;");
    return results[0];
}

// retorna uma estrutura do equipamento selecionado
async function selectTipoProduto(id){
    const results = await client.query("SELECT * FROM tipoproduto WHERE id=?;",[id]);
    return results[0];
}

// retorna uma estrutura do equipamento selecionado
async function selectProdutoNiveis(){
    const results = await client.query("SELECT * FROM produtonivel;");
    return results[0];
}

// retorna uma estrutura do equipamento selecionado
async function selectProdutoNivel(idTipoProduto){
    const results = await client.query("SELECT * FROM produtonivel WHERE idTipoProduto=?;",[idTipoProduto]);
    return results[0];
}

// função para inserir um novo cadastro na tabela de mp
async function insertMp(mp){
    // cria uma variavel para armazenar os valores que serão passados por parametro para o banco de dados cadastrar.
    const values = [mp.codMp, mp.descMp, mp.custoMp];
    // armazena no banco de dados as informações do novo usuário cadastrado.
    await client.query("INSERT INTO materiaprima(codMp,descMp,custoMp) VALUES (?,?,?);", values); 
}

// função para inserir um novo cadastro na tabela de GR
async function insertGr(gr){
    // cria uma variavel para armazenar os valores que serão passados por parametro para o banco de dados cadastrar.
    const values = [gr.nome, gr.codGr, gr.custo];
    // armazena no banco de dados as informações do novo usuário cadastrado.
    await client.query("INSERT INTO grades(nome,codGr,custo) VALUES (?,?,?);", values); 
}

// função para inserir um novo cadastro na tabela de EQ
async function insertEq(eq){
    // cria uma variavel para armazenar os valores que serão passados por parametro para o banco de dados cadastrar.
    const values = [eq.nome, eq.codProd, eq.custo];
    // armazena no banco de dados as informações do novo usuário cadastrado.
    await client.query("INSERT INTO produtofinal(nome,codProd,custo) VALUES (?,?,?);", values); 
}

// função para inserir um novo item a uma estrutura
async function insertEstruturaGr(gr){
    // cria uma variavel para armazenar os valores que serão passados por parametro para o banco de dados cadastrar.
    const values = [gr.idGr, gr.idMp, gr.qtd];
    // armazena no banco de dados as informações do novo usuário cadastrado.
    await client.query("INSERT INTO estruturagr(idGr,idMp,qtd) VALUES (?,?,?);", values); 
}

// função para inserir um novo item a uma estrutura
async function insertEstruturaEq(eq){
    // cria uma variavel para armazenar os valores que serão passados por parametro para o banco de dados cadastrar.
    const values = [eq.idEq, eq.idGr];
    // armazena no banco de dados as informações do novo usuário cadastrado.
    await client.query("INSERT INTO estruturaproduto(idGr,idMp) VALUES (?,?);", values); 
}

// função para inserir um novo item a uma estrutura
async function insertTipoProduto(eq){
    // cria uma variavel para armazenar os valores que serão passados por parametro para o banco de dados cadastrar.
    const values = [eq.nome];
    // armazena no banco de dados as informações do novo usuário cadastrado.
    await client.query("INSERT INTO tipoproduto(nome) VALUES (?);", values); 
}

// função para inserir um novo item a uma estrutura
async function insertProdutoNivel(produto){
    // cria uma variavel para armazenar os valores que serão passados por parametro para o banco de dados cadastrar.
    const values = [produto.idTipoProduto, produto.nivel1,produto.nivel2,,produto.nivel3,produto.nivel4,produto.nivel5,
                    produto.nivel6,produto.nivel7,,produto.nivel8,,produto.nivel9,,produto.nive10,];
    // armazena no banco de dados as informações do novo usuário cadastrado.
    await client.query("INSERT INTO produtonivel(idtipoproduto, nivel1, nivel2, nivel3, nivel4, nivel5, nivel6, nivel7, nivel8, nivel9, nivel0) VALUES (?,?,?,?,?,?,?,?,?,?,?);", values); 
}

module.exports = {
    selectMps,
    selectMp,
    selectGrs,
    selectGr,
    selectEqs,
    selectEq,
    selectEstruturaGr,
    selectEstruturaEq,
    selectTipoProdutos,
    selectTipoProduto,
    selectProdutoNiveis,
    selectProdutoNivel,
    insertMp,
    insertGr,
    insertEq,
    insertEstruturaGr,
    insertEstruturaEq,
    insertTipoProduto,
    insertProdutoNivel    
}