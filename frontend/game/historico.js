var url = "http://localhost:5000/app"


function findHistory(idUser){

    var e = document.getElementById("dataTableInfos");

    console.log(e)

    return new Promise(function(resolve, reject){
        var xhttp = new XMLHttpRequest();

        var obj = { id: idUser}
        data = JSON.stringify(obj);
    
        console.log(data)
    
        var urlC = url + "/history";
        xhttp.open('POST', urlC, true);
        xhttp.setRequestHeader('Content-type', 'application/json');    
        
        var html;
        var pontuacaoTotal = 0
        var respondidos = 0
        var nRespondidos = 0

        xhttp.onreadystatechange = function() {
            if(xhttp.readyState == 4 && xhttp.status == 200) {
                var obj = JSON.parse(xhttp.response);
                // console.log(obj)
                var options = []
                for(var i=0; i < obj.length; i++){
                    pontuacaoTotal += (8-obj[i].nColVazias)*12.50
                    respondidos += (8 - obj[i].nColVazias)
                    nRespondidos += (obj[i].nColVazias)
                    html = "<tr><td>"+obj[i].nomePartida+"</td><td>"+(8 - obj[i].nColVazias)+"</td><td>"+(obj[i].nColVazias)+"</td><td>"+(8-obj[i].nColVazias)*12.50+"</td></tr>"
                    e.insertAdjacentHTML('beforeend', html);
                }
                resolve("Success add")
                console.log(pontuacaoTotal)
                console.log(respondidos)
                console.log(nRespondidos)
                localStorage.setItem("respondidos", respondidos)
                localStorage.setItem("nRespondidos", nRespondidos)
                localStorage.setItem("pontuacaoTotal", pontuacaoTotal)
            }
        }
        xhttp.send(data);
    });    
}

function historico(){
    
    var promise = getUserIDPerfil();
    promise.then(
        function(response){
            
            console.log(response)
            
            var promiseHistorico = findHistory(response);
            
            promiseHistorico.then(
                function(responseHist){
                    console.log(responseHist)
                },
                function(errHist){
                    console.log(errHist)
                }
            );
        },
        function(err){
            console.log(err)
        }
    );
}

function getUserIDPerfil(){
    
    var email = localStorage.getItem("email")

    var obj = {usuario: email}
    data = JSON.stringify(obj);

    return new Promise(function(resolve,reject){

        var xhttp = new XMLHttpRequest();

        var urlC = url + "/getUserID";
        xhttp.open('POST', urlC, true);
        xhttp.setRequestHeader('Content-type', 'application/json');

        xhttp.onreadystatechange = function() {
            if(xhttp.readyState == 4 && xhttp.status == 200) {
                iduser = JSON.parse(this.responseText)[0].iduser;
                resolve(iduser)
            }
        }
        xhttp.send(data);
    });

}

historico();