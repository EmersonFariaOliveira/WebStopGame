/* Chamada das Packages que iremos precisar para a nossa aplicação */
var express = require('express'); //chamando o pacote express
var cors = require('cors');
var app = express(); //definção da nossa aplicação através do express
var bodyParser = require('body-parser'); //chamando o pacote body-parser


/** Configuração da variável 'app' para usar o 'bodyParser()'.
 * Ao fazermos isso nos permitirá retornar os dados a partir de um POST
 */
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** Definição da porta onde será executada a nossa aplicação */
var port = process.env.PORT || 5000;

/* Aqui o 'aplicação' irá pegar as instâncias das Rotas do Express */
var hello = express.Router();


//Rotas da nossa API:
//==============================================================


hello.get('/index', function(req, res) {
    res.json("Hello world!")
});




//==============================================================





/** Todas as nossas rotas serão prefixadas com '/app'.
Para chamar todas as funções que chamarem o objeto 
'app' deveremos acessar o endpoint /app/*
*/
app.use('/hello', hello); 

//Iniciando o Servidor (Aplicação):
//==============================================================
app.listen(port);
console.log('Iniciando a aplicação na porta ' + port);