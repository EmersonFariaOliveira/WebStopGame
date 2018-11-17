
var url = "http://localhost:5000/app"


function SelectItem(x) {
    x.classList.add('active');
}

function DeselectItem(x){
    x.classList.remove('active');
}

function criarPartida(){

    //Nome da partida
    var name = document.getElementById("nomePartida").value;
    var obj = { nome: name}
    data = JSON.stringify(obj);

    var xhttp = new XMLHttpRequest();

    var urlC = url + "/createMatch";
    xhttp.open('POST', urlC, true);
    xhttp.setRequestHeader('Content-type', 'application/json');

    xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            window.location.replace("jogo.html")
        }
    }
    xhttp.send(data);
}

function verificaLogin(){

    const html = "<div  class=\"alert alert-danger text-center\">Usuário ou senha inválido.</div>"

    var email = document.getElementById("inputEmail").value;
    var pwd = document.getElementById("inputPassword").value;

    if(email!= "" && pwd != ""){
        var obj = { user: email, password: pwd}
        data = JSON.stringify(obj);


        var xhttp = new XMLHttpRequest();

        var urlC = url + "/index";
        xhttp.open('POST', urlC, true);
        xhttp.setRequestHeader('Content-type', 'application/json');

        xhttp.onreadystatechange = function() {
            if(xhttp.readyState == 4 && xhttp.status == 200) {
                window.location.replace("index.html")
                localStorage.setItem("userOn", "on");
                localStorage.setItem("email", email);
            }else document.getElementById("alertDanger").innerHTML = html
        }
        xhttp.send(data);
    }else document.getElementById("alertDanger").innerHTML = html

    

}

function removeUser(){
    
    var email = localStorage.getItem("email");
    console.log(email)
    if(email!= ""){

        var obj = {user: email}
        data = JSON.stringify(obj);

        console.log(data)

        var xhttp = new XMLHttpRequest();

            var urlC = url + "/removeUser";
            xhttp.open('POST', urlC, true);
            xhttp.setRequestHeader('Content-type', 'application/json');

            xhttp.onreadystatechange = function() {
                if(xhttp.readyState == 4 && xhttp.status == 200) {
                    window.location.replace("login.html")
                }else{
                    var json_data = xhttp.responseText; 
                    //console.log(json_data)
                    //alert("Algo deu errado");
                }
            }
            xhttp.send(data);
    }
}

function novoUsuario(){

    const html = "<div  class=\"alert alert-danger text-center\">Senhas não conferem.</div>"

    var name = document.getElementById("firstName").value;
    var email = document.getElementById("inputEmail").value;
    var pwd1 = document.getElementById("inputPassword").value;
    var pwd2 = document.getElementById("confirmPassword").value;

    console.log(pwd1);
    console.log(pwd2);
    if(pwd1 != pwd2){
        document.getElementById("alertDanger").innerHTML = html
    }else{
        var obj = { user: name, email: email,password: pwd2}
        data = JSON.stringify(obj);


        var xhttp = new XMLHttpRequest();

        var urlC = url + "/createUser";
        xhttp.open('POST', urlC, true);
        xhttp.setRequestHeader('Content-type', 'application/json');

        xhttp.onreadystatechange = function() {
            if(xhttp.readyState == 4 && xhttp.status == 200) {
                window.location.replace("login.html")
            }else document.getElementById("alertDanger").innerHTML = html
        }
        xhttp.send(data);
    }
}

function jogar(){
    
    var e = document.getElementById("selectP");
    var game = e.options[e.selectedIndex].value;

    localStorage.setItem("partida", game);
    //console.log("aqui: "+localStorage.getItem("partida"))
    window.location.replace("jogo.html");

}

function partidaEmJogo(){
    var e = document.getElementById("selectP");

    var xhttp = new XMLHttpRequest();


    var urlC = url + "/searchMatch";
    xhttp.open('GET', urlC, true);
    xhttp.setRequestHeader('Content-type', 'application/json');

    xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            var obj = JSON.parse(xhttp.response)["nomes"];
            var options = []
            options.push("<option selected=\"selected\"></option>")
            for(var i=0; i < obj.length; i++){
                options.push("<option >" + obj[i] + "</option>")
            }
            e.innerHTML = options
        }
    }
    xhttp.send();
}

function perfil(){
    
}

function endSession(){
    while(localStorage.getItem("userOn") == "on")
        localStorage.setItem("userOn", "off")
    window.location.replace("login.html")
}

