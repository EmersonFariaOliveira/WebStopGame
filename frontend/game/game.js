
const url = "http://localhost:5000/app"


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