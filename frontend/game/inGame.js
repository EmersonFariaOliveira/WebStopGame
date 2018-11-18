var url = "http://localhost:5000/app"
var myVar;
var iduser;
var idpartida;

getUserID()

function myStopFunction() {
    clearTimeout(myVar);
}

function getUserID(){
    
    var email = localStorage.getItem("email")

    var obj = {usuario: email}
    data = JSON.stringify(obj);

    var xhttp = new XMLHttpRequest();

    var urlC = url + "/getUserID";
    xhttp.open('POST', urlC, true);
    xhttp.setRequestHeader('Content-type', 'application/json');

    xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            iduser = JSON.parse(this.responseText)[0].iduser;
            getPartidaID();
            //progresso = obj[0].em_progresso;
        }
    }
    xhttp.send(data);

} 

function getPartidaID(){
    
    var partida = localStorage.getItem("partida")

    
    var obj = {nome: partida}
    data = JSON.stringify(obj);

    console.log(partida)

    var xhttp = new XMLHttpRequest();

    var urlC = url + "/getPartidaID";
    xhttp.open('POST', urlC, true);
    xhttp.setRequestHeader('Content-type', 'application/json');

    xhttp.onreadystatechange = function() {
        
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            
            idpartida = JSON.parse(this.responseText)["idpartida"]

            //progresso = obj[0].em_progresso;
        }
    }
    xhttp.send(data);
} 

function enviarResp(idpartida, iduser, nome, cidade, anima, fruta, cor, profissao, carro, filme){

    var obj = {idGame: idpartida, idUser: iduser, name: nome, city: cidade, animal: anima, fruit: fruta, color: cor, career: profissao, car: carro, movie: filme}
    data = JSON.stringify(obj);

    console.log(data);

    var xhttp = new XMLHttpRequest();

    var urlC = url + "/sendGame";
    xhttp.open('POST', urlC, true);
    xhttp.setRequestHeader('Content-type', 'application/json');

    xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            setUserAndGame(iduser, idpartida)
        }
    }
    xhttp.send(data);

    
}

function setUserAndGame(idUser, idGame){

    var obj = {idGame: idpartida, idUser: iduser}
    data = JSON.stringify(obj);

    var xhttp = new XMLHttpRequest();

    var urlC = url + "/setUserAndGame";
    xhttp.open('POST', urlC, true);
    xhttp.setRequestHeader('Content-type', 'application/json');

    xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            console.log("Vinculado com sucesso")
        }
    }
    xhttp.send(data);
}

function isGameFinished(){

    var progresso
    //Nome da partida
    var name = localStorage.getItem("partida")
    var email = localStorage.getItem("email")
    var obj = { nome: name}
    data = JSON.stringify(obj);

    var xhttp = new XMLHttpRequest();

    var urlC = url + "/isGameFinished";
    xhttp.open('POST', urlC, true);
    xhttp.setRequestHeader('Content-type', 'application/json');

    xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            // console.log("isGAMEFINISHED: " + this.responseText[0])
            progresso = this.responseText;
            // progresso = obj[0].em_progresso;

            console.log("isGameFinished " + progresso)


            if (progresso == 0) {
                myStopFunction();
                var nome = document.getElementById("nome");
                var cidade = document.getElementById("cidade");
                var animal = document.getElementById("animal");
                var fruta = document.getElementById("fruta");
                var cor = document.getElementById("cor");
                var profissao = document.getElementById("profissao");
                var carro = document.getElementById("carro");
                var filme = document.getElementById("filme");
                var botao = document.getElementById("enviar");

                nome.disabled = true;
                cidade.disabled = true
                animal.disabled = true;
                fruta.disabled = true;
                cor.disabled = true;
                profissao.disabled = true;
                carro.disabled = true;
                filme.disabled = true;

                botao.disabled = true;
                botao.textContent = "Partida finalizada";

                console.log(nome.value)
                console.log("IDUSER: "+iduser);
                console.log("IDPARTIDA: "+idpartida);

                enviarResp(idpartida,iduser,nome.value,cidade.value,animal.value,
                           fruta.value,cor.value,profissao.value,carro.value,
                           filme.value)
                
                
                
            }else{
                document.getElementById("nome").disabled = false;
                document.getElementById("cidade").disabled = false;
                document.getElementById("animal").disabled = false;
                document.getElementById("fruta").disabled = false;
                document.getElementById("cor").disabled = false;
                document.getElementById("profissao").disabled = false;
                document.getElementById("carro").disabled = false;
                document.getElementById("filme").disabled = false;
            }        
        }
    }
    xhttp.send(data);
    myVar = setTimeout(isGameFinished, 3000);
}

function finalizar(){


    console.log("Finalizando partida...")
    var name = localStorage.getItem("partida")
    
    var obj = { nome: name}
    data = JSON.stringify(obj);

    var xhttp = new XMLHttpRequest();

    var urlC = url + "/finalizar";
    xhttp.open('POST', urlC, true);
    xhttp.setRequestHeader('Content-type', 'application/json');

    xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            var obj = JSON.parse(this.responseText);
            //progresso = obj[0].em_progresso;
        }
    }
    xhttp.send(data);
}