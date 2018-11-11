function contextUser(){
    if(localStorage.getItem("userOn") == "off"){
        window.location.replace("login.html")
    }
}
contextUser();