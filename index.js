require("dotenv").config(); // procura um arquivo .env e sobe as cofig.

const db = require("./db"); // procura um aquivo que é meu e carrega o DB no index.

const express = require("express"); // carrega a biblioteca


const app = express(); // inicializa uma nova aplicação de backend

app.use(express.json());

// função que mandar deletar um cliente do banco de dados
/*app.delete("/clientes/:id",async (request,response) =>{
    // converte id de string para inteiro e atribui a id
    const id = parseInt(request.params.id);
    // chama a função que executa o delete dos dados no banco
    await db.deleteCustomer(id);
    // deletado com sucesso
    response.sendStatus(204);
})*/

// função que atualiza os dados no cadastro dos clientes
/*app.patch("/clientes/:id", async (request,response) =>{
    // converte id de string para inteiro e atribui a id
    const id = parseInt(request.params.id);
    // atribui a customer a alteração que será executada no cadastro indicado pelo id
    const customer = request.body;
    // chama a função que executa a alteração dos dados no banco
    await db.updateCustomer(id, customer);
    // responde ok
    response.sendStatus(200);
})*/

// função para cadastrar uma nova materia prima
app.post("/materiaprima",async (request,response) =>{
    // indica no protocolo http que a informação a ser cadastrada esta no corpo do protocolo
    const mp = request.body;
    // rotina assincrona para inserir o novo cliente no banco
    await db.insertMp(mp);
    // codigo de resposta global para cadastro com sucesso
    response.sendStatus(201);
})

// função para cadastrar uma nova materia prima
app.post("/grades",async (request,response) =>{
    // indica no protocolo http que a informação a ser cadastrada esta no corpo do protocolo
    const gr = request.body;
    // rotina assincrona para inserir o novo cliente no banco
    await db.insertGr(gr);
    // codigo de resposta global para cadastro com sucesso
    response.sendStatus(201);
})

// função para cadastrar uma nova materia prima
app.post("/produtofinal",async (request,response) =>{
    // indica no protocolo http que a informação a ser cadastrada esta no corpo do protocolo
    const eq = request.body;
    // rotina assincrona para inserir o novo cliente no banco
    await db.insertEq(eq);
    // codigo de resposta global para cadastro com sucesso
    response.sendStatus(201);
})

// função para cadastrar uma nova materia prima
app.post("/estruturagr",async (request,response) =>{
    // indica no protocolo http que a informação a ser cadastrada esta no corpo do protocolo
    const estruturaGrade = request.body;
    // rotina assincrona para inserir o novo cliente no banco
    await db.insertEstruturaGr(estruturaGrade);
    // codigo de resposta global para cadastro com sucesso
    response.sendStatus(201);
})

// função para cadastrar uma nova materia prima
app.post("/estruturaeq",async (request,response) =>{
    // indica no protocolo http que a informação a ser cadastrada esta no corpo do protocolo
    const estruturaEq = request.body;
    // rotina assincrona para inserir o novo cliente no banco
    await db.insertEstruturaEq(estruturaEq);
    // codigo de resposta global para cadastro com sucesso
    response.sendStatus(201);
})

// função para cadastrar uma nova materia prima
app.post("/tipoproduto",async (request,response) =>{
    // indica no protocolo http que a informação a ser cadastrada esta no corpo do protocolo
    const novoProduto = request.body;
    // rotina assincrona para inserir o novo cliente no banco
    await db.insertTipoProduto(novoProduto);
    // codigo de resposta global para cadastro com sucesso
    response.sendStatus(201);
})

// função para cadastrar uma nova materia prima
app.post("/produtonivel",async (request,response) =>{
    // indica no protocolo http que a informação a ser cadastrada esta no corpo do protocolo
    const novaCaracteristica = request.body;
    // rotina assincrona para inserir o novo cliente no banco
    await db.insertTipoProduto(novaCaracteristica);
    // codigo de resposta global para cadastro com sucesso
    response.sendStatus(201);
})

// função que retorna do banco de dados todos os cadastros
app.get("/materiaprima",async (request,response) =>{
    const results = await db.selectMps();
    response.json(results);
})

// função que retorna do banco de dados somente um cadastro listado pelo id
app.get("/materiaprima/:id",async (request,response) =>{
    const id = parseInt(request.params.id); 
    const results = await db.selectMp(id);
    response.json(results);
})

// função que retorna do banco de dados todos os cadastros
app.get("/grades",async (request,response) =>{
    const results = await db.selectGrs();
    response.json(results);
})

// função que retorna do banco de dados somente um cadastro listado pelo id
app.get("/grades/:id",async (request,response) =>{
    const id = parseInt(request.params.id); 
    const results = await db.selectGr(id);
    response.json(results);
})

// função que retorna do banco de dados todos os cadastros
app.get("/produtofinal",async (request,response) =>{
    const results = await db.selectEqs();
    response.json(results);
})

// função que retorna do banco de dados somente um cadastro listado pelo id
app.get("/produtofinal/:id",async (request,response) =>{
    const id = parseInt(request.params.id); 
    const results = await db.selectEq(id);
    response.json(results);
})

// função que retorna do banco de dados todos os cadastros
app.get("/estruturagr/:idGr",async (request,response) =>{
    const idGr = parseInt(request.params.idGr);
    const results = await db.selectEstruturaGr(idGr);
    response.json(results);
})

// função que retorna do banco de dados somente um cadastro listado pelo id
app.get("/estruturaeq/:idEq",async (request,response) =>{
    const idEq = parseInt(request.params.idEq); 
    const results = await db.selectEstruturaEq(idEq);
    response.json(results);
})

// função que retorna do banco de dados somente um cadastro listado pelo id
app.get("/tipoproduto",async (request,response) =>{
    const results = await db.selectTipoProdutos();
    response.json(results);
})

// função que retorna do banco de dados somente um cadastro listado pelo id
app.get("/tipoproduto/:id",async (request,response) =>{
    const id = parseInt(request.params.idEq);
    const results = await db.selectTipoProduto(id);
    response.json(results);
})

// função que retorna do banco de dados somente um cadastro listado pelo id
app.get("/produtonivel",async (request,response) =>{
    const results = await db.selectProdutoNiveis();
    response.json(results);
})

// função que retorna do banco de dados somente um cadastro listado pelo id
app.get("/produtonivel/:idtipoproduto",async (request,response) =>{
    const id = parseInt(request.params.idtipoproduto);
    const results = await db.selectProdutoNiveis(id);
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