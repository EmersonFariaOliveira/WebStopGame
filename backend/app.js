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

//Acho que é gambiarra
//Estava dando erro sem esse código.
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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
        database: "webstop",
        insecureAuth : true,
        port : 3306
    });
}

//Rotas da nossa API:
//==============================================================

/**
 * @api {get} localhost:5000/app/index
 * @apiVersion 1.0.0
 * @apiName GetDashboard
 * @apiGroup Pagina Inicial
 * @apiDescription Pagina inicial para login
 * dentro da plataforma de webstop - online
 * @apiSuccess {String} -- - Home page.
 */
dashboard.get('/index', function(req, res) {
    res.json("Em breve a pagina inicial!")
});

//Responsavel pelo login do usuário na plataforma
/**
 * @api {post} localhost:5000/app/index
 * @apiVersion 1.0.0
 * @apiName GetDashboard
 * @apiGroup Login
 * @apiDescription Inserção de informações para login
 * na plataforma de webstop - online
 * @apiExample {json} Exemplo de uso:
 *     {
 *       "user": "name",
 *       "password": "pwd"
 *     }
 * @apiSuccess {String} texto - Usuário valido.
 * @apiError UserNotFound The <code>404</code> of the User was not found. 
 */
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
            res.status(406).send(err);
        }
    );
});

/**
 * @api {post} localhost:5000/app/createUser
 * @apiVersion 1.0.0
 * @apiName GetDashboard
 * @apiGroup Criar usuario
 * @apiDescription Inserção de novos usuarios
 * na plataforma de webstop - online
 * @apiExample {json} Exemplo de uso:
 *     {
 *       "user": "name",
 *       "email": "name@email.com"
 *       "password": "pwd"
 *     }
 * @apiSuccess {String} texto - Usuário criado com sucesso.
 * @apiError InternalError The <code>505</code> of the User was not create. 
 */
dashboard.post('/createUser', function(req, res) {
    
    var user = req.body['user']
    var password = req.body['password']
    var email = req.body['email']

    console.log(user, password);

    var promise = createUser(user, email, password);
    promise.then(
        function(response){
            res.status(200).send(response);
        },
        function(err){
            res.status(406).send(err);
        }
    );
});


//responsavel por bucar uma partida já criada em progresso
/**
 * @api {get} localhost:5000/app/searchMatch
 * @apiVersion 1.0.0
 * @apiName GetDashboard
 * @apiGroup Pesquisa
 * @apiDescription Pesquisa de partidas livre na plataforma
 * @apiSuccess {String} nome - Nome das partidas disponíveis.
 * @apiError InternalError The <code>505</code> of the problem in query.
 */
dashboard.get('/searchMatch', function(req, res) {
    
    var promise = getAvailableGame();
    promise.then(
        function(response){
            //seleciona um jogo aleatoriamente para usuario entrar
            // var numGame = Math.floor((Math.random() * response.length));
            var nomesResponse = []
            for(var i = 0; i < response.length; i++)
                nomesResponse.push(response[i].nome)

            obj = {nomes: nomesResponse}
            console.log(JSON.stringify(obj))
            res.send(JSON.stringify(obj));
        },
        function(err){
            res.send(err);
        }
    );
});

dashboard.post('/isGameFinished', function(req, res) {
    var name = req.body['nome']
    console.log(name);

    var promise = getGameIsFinished(name);
    promise.then(
        function(response){
            res.send(response);
        },
        function(err){
            res.send(err);
        }
    );
});

//Responsavel pela criação da partida
/**
 * @api {post} localhost:5000/app/createMatch
 * @apiVersion 1.0.0
 * @apiName GetDashboard
 * @apiGroup Criar Partida
 * @apiDescription Inserção de uma nova partida
 * na plataforma de webstop - online
 * @apiExample {json} Exemplo de uso:
 *     {
 *       "nome": "Minha partida"
 *     }
 * @apiSuccess {String} texto - Jogo: "Minha partida" foi criado com sucesso!!.
 * @apiError InternalError The <code>505</code> of the problem in query.
 */
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

dashboard.post('/setUserAndGame', function(req, res) {
    var idUser = req.body['idUser']
    var idGame = req.body['idGame']

    var promise = createUserAndGame(idUser, idGame);
    promise.then(
        function(response){
            res.send(response);
        },
        function(err){
            res.send(err);
        }
    );
});



//Responsavel por formatar os dados da partida
/**
 * @api {post} localhost:5000/app/sendGame
 * @apiVersion 1.0.0
 * @apiName GetDashboard
 * @apiGroup Enviar jogo
 * @apiDescription Inserção de dados da partida
 * @apiExample {json} Exemplo de uso:
 *     {
 *       "idGame": 1,
 *       "idUser": 1,
 *       "name": "Aaaaa",
 *       "city": "Aaaaa",
 *       "animal": "Appod",
 *       "fruit": "Abbrr",
 *       "color": "Abbbcc",
 *       "career": "Acdc",
 *       "car": "Abbbcc",
 *       "movie": "Aaabb",
 *     }
 * @apiSuccess {String} texto - Dados gravados com sucesso!!.
 * @apiError InternalError The <code>505</code> of the problem in query.
 */
dashboard.post('/sendGame', function(req, res) {

    var idGame = req.body['idGame']
    var idUser = req.body['idUser']
    var name = req.body['name']
    var city = req.body['city']
    var animal = req.body['animal']
    var fruit = req.body['fruit']
    var color = req.body['color']
    var career = req.body['career']
    var car = req.body['car']
    var movie = req.body['movie']

    var promise = createDataGame(idGame, idUser, name, city, animal, fruit, color, career, car, movie);

    promise.then(
        function(response){
            res.send(response);
        },
        function(err){
            res.send(err);
        }
    );
});

dashboard.post('/finalizar', function(req, res) {

    var name = req.body['nome']
    
    var promise = setGameFinished(name);

    promise.then(
        function(response){
            res.send(response);
        },
        function(err){
            res.send(err);
        }
    );
});

//Responsavel por formatar os dados da partida
/**
 * @api {post} localhost:5000/app/removeUser
 * @apiVersion 1.0.0
 * @apiName GetDashboard
 * @apiGroup Remover usuario
 * @apiDescription Remover usuario da plataforma webstop - online
 * @apiHeader {String} BearerToken - Users require access-key.
 * @apiExample {json} Exemplo de uso:
 *     {
 *       "id": "1"
 *     }
 * @apiSuccess {String} texto - Usuário removido com sucesso!.
 * @apiError InternalError The <code>505</code> of the problem in query.
 */
dashboard.post('/removeUser', function(req, res) {

    //Verificação se o usuário é valido "BearerToken"
    // var header = req.headers["bearertoken"];

    var idUser = req.body['user']
    var promise = removeUser(idUser)

    promise.then(
        function(response){
            res.send(response);
        },
        function(err){
            res.send(err);
        }
    );
});

dashboard.post('/getUserID', function(req, res) {

    //Verificação se o usuário é valido "BearerToken"
    // var header = req.headers["bearertoken"];

    var emailUser = req.body['usuario']
    var promise = getUserID(emailUser)

    promise.then(
        function(response){
            res.send(response);
        },
        function(err){
            res.send(err);
        }
    );
});

dashboard.post('/getPartidaID', function(req, res) {

    //Verificação se o usuário é valido "BearerToken"
    // var header = req.headers["bearertoken"];

    console.log("Function getPartidaID: " + req.body['nome'])

    var emailUser = req.body['nome']
    var promise = getPartidaID(emailUser)

    promise.then(
        function(response){
            res.send(response);
        },
        function(err){
            res.send(err);
        }
    );
});

//Responsavel por formatar os dados da partida
/**
 * @api {post} localhost:5000/app/updatePerfil
 * @apiVersion 1.0.0
 * @apiName GetDashboard
 * @apiGroup Update perfil de usuario
 * @apiDescription Atualiza as vitoria, derrota e pontuacap da plataforma webstop - online
 * @apiHeader {String} BearerToken - Users require access-key.
 * @apiExample {json} Exemplo de uso:
 *   {
 *       "id": 2,
 *       "vitoria": 0,
 *       "derrota": 0,
 *       "pontuacao": 0
 *   }
 * @apiSuccess {String} texto - Perfil atualizado com sucesso!.
 * @apiError InternalError The <code>505</code> of the problem in query.
 */
dashboard.post('/updatePerfil', function(req, res) {

    //Verificação se o usuário é valido "BearerToken"
    var header = req.headers["bearertoken"];

    var idUser = req.body['id']
    var vitoria = req.body['vitoria']
    var derrota = req.body['derrota']
    var pontuacao = req.body['pontuacao']

    var promise = updatePerfil(idUser, vitoria, derrota, pontuacao)

    promise.then(
        function(response){
            res.send(response);
        },
        function(err){
            res.send(err);
        }
    );
});

//==============================================================


//Funções da nossa API:
//==============================================================
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

//Relaciona usuário e partida
function createUserAndGame(idUser, idGame){
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

        var query = "INSERT INTO `user_has_partida`(`user_iduser`, `partida_idpartida`) VALUES ("+idUser+","+idGame+")";
        con.query(query, function(err, result){
            if(err){
                con.end()
                reject("Query error!");
            }
            else{
                con.end()
                resolve("Usuario vinculado com sucesso!!");
            } 
        });
        
    });
}

function setGameFinished(name){
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

        var query = "UPDATE partida set em_progresso = 0 WHERE nome = \"" + name + "\"";
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

function getGameIsFinished(name){
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

        var query = "SELECT *FROM partida WHERE nome = \"" + name + "\"";
        con.query(query, function(err, result){
            if(err){
                reject("Query error!");
            }
            else{
                console.log("Resultado: " + result[0].em_progresso)
                resolve(result[0].em_progresso);
                con.end();
            } 
        });
    });
}

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

        var query = "SELECT *FROM user WHERE email = \"" + user + "\"";
        con.query(query, function(err, result){
            if(err){
                con.end()
                reject("Query error!");
            }

            if( (result[0] != undefined) && (user == result[0].email && password == result[0].senha)){
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

//Insere os dados da partida no banco de dados
function createDataGame(idGame, idUser,name, city, animal, fruit, color, career, car, movie){
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

        var query = "INSERT INTO `resposta`(`nome`, `cidade`,`animal`,`fruta`,`cor`,`profissao`,`carro`,\
        `filme`,`user_iduser`,`partida_idpartida`) VALUES (\""+name+"\",\""+city+"\",\""+animal+"\",\""+fruit+"\",\"\
        "+color+"\",\""+career+"\",\""+car+"\",\""+movie+"\",\""+idUser+"\",\""+idGame+"\")";
        
        con.query(query, function(err, result){
            if(err){
                con.end()
                reject("Query error!");
            }
            else{
                con.end()
                resolve("Dados gravados com sucesso!!");
            } 
        });
        
    });
}

//Insere novos usuarios na plataforma
function createUser(user, email, password){
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

        var query = "CALL createUser(\""+user+"\",\""+email+"\",\""+password+"\");"
        
        con.query(query, function(err, result){
            if(err){
                con.end()
                reject("Query error!");
            }
            else{
                resolve("Usuário criado com sucesso!")
                con.end()
            }
        });
        
    });
}

function getUserID(email){
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

        var query = "SELECT (iduser) FROM user WHERE email = \"" + email + "\"";
        
        con.query(query, function(err, result){
            if(err){
                console.log(err)
                con.end()
                reject("Query error!");
            }
            else{
                resolve(result)
                con.end()
            }
        });
        
    });
}

function getPartidaID(nome){
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

        var query = "SELECT (idpartida) FROM partida WHERE nome = \"" + nome + "\"";
        
        con.query(query, function(err, result){
            if(err){
                console.log(err)
                con.end()
                reject("Query error!");
            }
            else{

                var obj = { idpartida: result[0].idpartida}
                data = JSON.stringify(obj);

                console.log("Entrou no getPartidaID: " + data)
                
                resolve(data)
                con.end()
            }
        });
        
    });
}

//Remove os dados do usuario no banco de dados
function removeUser(idUser){
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

        var query = "CALL removeUser(\""+idUser+"\")"
        
        con.query(query, function(err, result){
            if(err){
                console.log(err)
                con.end()
                reject("Query error!");
            }
            else{
                resolve("Usuário removido com sucesso!")
                con.end()
            }
        });
        
    });
}

//Remove os dados do usuario no banco de dados
function updatePerfil(idUser, vitoria, derrota, pontuacao){
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

        var query = "CALL perfilUserUpdate("+idUser+","+vitoria+","+derrota+","+pontuacao+")"
        
        con.query(query, function(err, result){
            if(err){
                con.end()
                
                reject("Query error!");
            }
            else{
                resolve("Perfil atualizado com sucesso!")
                con.end()
            }
        });
        
    });
}
//==============================================================


/** Todas as nossas rotas serão prefixadas com '/app'.
Para chamar todas as funções que chamarem o objeto 
'app' deveremos acessar o endpoint /app/*
*/
app.use('/app', dashboard); 

//Iniciando o Servidor (Aplicação):
//==============================================================
app.listen(port);
console.log('Iniciando a aplicação na porta ' + port);