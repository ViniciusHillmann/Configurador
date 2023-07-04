// carrega biblioteca MySQL2 trabalha com callback, aqui uma versão mais profissional 
// utilizando promise.
const mysql = require("mysql2/promise");

// createPool gerencia abertura e fechamento da conexão automaticamente.
// caso utilize a opção create apenas, precisamos abrir e fechar a conexão
// toda vez que usar. 
const client = mysql.createPool(process.env.CONNECTION_STRING);



// função deve ser assincrona  bem como deve-se utilizar o await na solicitação ao banco
async function selectCustomers(){
    // armazena em results a consulta feita no banco de todos os clientes cadastrados.
    const results = await client.query("SELECT * FROM clientes;");
    // deve-se utlizar results[0], pois caso contrário a função retorna outros metadados.
    return results[0];
}

// função que retorna somente um cliente listado pelo id
async function selectCustomer(id){
    const results = await client.query("SELECT * FROM clientes WHERE id=?;",[id]);
    return results[0];
}

// função para inserir um novo cadastro no banco de dados
async function insertCustomer(customer){
    // cria uma variavel para armazenar os valores que serão passados por parametro para o banco de dados cadastrar.
    const values = [customer.nome, customer.idade, customer.uf];
    // armazena no banco de dados as informações do novo usuário cadastrado.
    await client.query("INSERT INTO clientes(nome,idade,uf) VALUES (?,?,?);", values); 
}

// função para atualizar/ editar um cliente no banco de dados
async function updateCustomer(id, customer){
    const values = [customer.nome, customer.idade, customer.uf, id];
    await client.query("UPDATE clientes SET nome=?,idade=?,uf=? WHERE id=?;", values); 
}

// função para deletar um cliente no banco de dados
async function deleteCustomer(id){
    const value = [id];
    await client.query("DELETE FROM clientes WHERE id=?",value);
}


module.exports = {
    selectCustomers,
    selectCustomer,
    insertCustomer,
    updateCustomer,
    deleteCustomer
}