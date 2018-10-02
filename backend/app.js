/* Chamada das Packages que iremos precisar para a nossa aplicação */
var express = require('express'); //chamando o pacote express
var cors = require('cors');
var app = express(); //definção da nossa aplicação através do express
var bodyParser = require('body-parser'); //chamando o pacote body-parser
var mysql = require('mysql');


/** Configuração da variável 'app' para usar o 'bodyParser()'.
 * Ao fazermos isso nos permitirá retornar os dados a partir de um POST
 */
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** Definição da porta onde será executada a nossa aplicação */
var port = process.env.PORT || 5000;

/* Aqui o 'aplicação' irá pegar as instâncias das Rotas do Express */
var dashboard = express.Router();


//banco de dados:
//==============================================================

//Definição do banco de dados
//Deve ser chamada em toda promisse que utiliza banco de dados pois apos o con.end() perde a referencia
function defineConnection(){
    return mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "webstop"
    });
}

//Rotas da nossa API:
//==============================================================

//responsavel por renderizar a pagina inicial
dashboard.get('/index', function(req, res) {
    res.json("Em breve a pagina inicial!")
});

//responsavel por bucar uma partida já criada em progresso
dashboard.get('/searchMatch', function(req, res) {
    
    var promise = getAvailableGame();
    promise.then(
        function(response){
            //seleciona um jogo aleatoriamente para usuario entrar
            var numGame = Math.floor((Math.random() * response.length));
            res.send(response[numGame].nome);
        },
        function(err){
            res.send(err);
        }
    );
});

//Responsavel pela criação da partida
dashboard.post('/createMatch', function(req, res) {
    var name = req.body['nome']
    console.log(name);

    var promise = createMatch(name);
    promise.then(
        function(response){
            res.send(response);
        },
        function(err){
            res.send(err);
        }
    );
});

//Insere a partida no banco de dados
function createMatch(name){
    return new Promise(function(resolve,reject){
        
        con = defineConnection()

        con.connect(function(err){
            if(err){
                console.log("Connection failed");
                reject("Connection failed");
            } 
            else{
                console.log("Connection succeded");
            } 
        });

        var query = "INSERT INTO `partida`(`nome`, `em_progresso`) VALUES (\""+name+"\",1)";
        con.query(query, function(err, result){
            if(err){
                con.end()
                reject("Query error!");
            }
            else{
                con.end()
                resolve("Jogo: \""+name+"\" foi criado com sucesso!!");
            } 
        });
        
    });
}

//Responsavel pelo login do usuário na plataforma
dashboard.post('/index', function(req, res) {
    var user = req.body['user']
    var password = req.body['password']
    console.log(user, password);

    var promise = getUserDatabase(user, password);
    promise.then(
        function(response){
            res.send(response);
        },
        function(err){
            res.send(err);
        }
    );
});

//verifica os jogos que estão em progresso
function getAvailableGame(){
    return new Promise(function(resolve, reject){

        con = defineConnection()

        con.connect(function(err){
            if(err){
                console.log("Connection failed");
                reject("Connection failed");
            } 
            else{
                console.log("Connection succeded");
            } 
        });

        var query = "SELECT *FROM partida WHERE em_progresso = 1";
        con.query(query, function(err, result){
            if(err){
                con.end()
                reject("Query error!");
            }
            else{
                con.end()
                resolve(result);
            } 
        });
    });
}

//função para buscar no banco de dados o usuario cadastrado
function getUserDatabase(user, password ){
    return new Promise(function(resolve, reject){
        
        con = defineConnection()

        con.connect(function(err){
            if(err){
                console.log("Connection failed");
                reject("Connection failed");
            } 
            else{
                console.log("Connection succeded");
            } 
        });

        var query = "SELECT *FROM user WHERE nome = \"" + user + "\"";
        con.query(query, function(err, result){
            if(err){
                con.end()
                reject("Query error!");
            }
            if(user == result[0].nome && password == result[0].senha){
                con.end()
                resolve("Valid user!"); 
            }
            else{
                con.end()
                reject("Invalid user!");
            } 
        });
    });
}


//==============================================================


/** Todas as nossas rotas serão prefixadas com '/app'.
Para chamar todas as funções que chamarem o objeto 
'app' deveremos acessar o endpoint /app/*
*/
app.use('/login', dashboard); 

//Iniciando o Servidor (Aplicação):
//==============================================================
app.listen(port);
console.log('Iniciando a aplicação na porta ' + port);