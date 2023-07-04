require("dotenv").config(); // procura um arquivo .env e sobe as cofig.

const db = require("./db"); // procura um aquivo que é meu e carrega o DB no index.

const express = require("express"); // carrega a biblioteca


const app = express(); // inicializa uma nova aplicação de backend

app.use(express.json());

// função que mandar deletar um cliente do banco de dados
app.delete("/clientes/:id",async (request,response) =>{
    // converte id de string para inteiro e atribui a id
    const id = parseInt(request.params.id);
    // chama a função que executa o delete dos dados no banco
    await db.deleteCustomer(id);
    // deletado com sucesso
    response.sendStatus(204);
})
// função que atualiza os dados no cadastro dos clientes
app.patch("/clientes/:id", async (request,response) =>{
    // converte id de string para inteiro e atribui a id
    const id = parseInt(request.params.id);
    // atribui a customer a alteração que será executada no cadastro indicado pelo id
    const customer = request.body;
    // chama a função que executa a alteração dos dados no banco
    await db.updateCustomer(id, customer);
    // responde ok
    response.sendStatus(200);
})

// função para cadastrar um novo cliente
app.post("/clientes",async (request,response) =>{
    // indica no protocolo http que a informação a ser cadastrada esta no corpo do protocolo
    const customer = request.body;
    // rotina assincrona para inserir o novo cliente no banco
    await db.insertCustomer(customer);
    // codigo de resposta global para cadastro com sucesso
    response.sendStatus(201);
})

// função que retorna do banco de dados todos os cadastros
app.get("/clientes",async (request,response) =>{
    const results = await db.selectCustomers();
    response.json(results);
})

// função que retorna do banco de dados somente um usuário listado pelo id
app.get("/clientes/:id",async (request,response) =>{
    const id = parseInt(request.params.id); 
    const results = await db.selectCustomer(id);
    response.json(results);
})




// pegar informações da requisição - REQUEST
// devolver informações para quem me chamou - RESPONSE
app.get("/",(request,response,next) => {
    response.json({
        message: "It's alive!"
    })
})

app.listen(process.env.PORT,() => {  // função de callaback que executa a escrita após o comando der certo..
    console.log("App is running!");
});