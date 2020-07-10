var press = false;

let degres = 0;

var max = false;

var speed = 20;

var gewicht = 1000; // cooldown

var timeout = false;

var adddegrees = 1; //speed bei neuen teilen

var upshoppos = 100;

var upshopopen = false;

var loadet = false;

var autohammervar = false;

var autohammerholder

var autohammerbuyed = false;

var timeload = false;


//preise
var speedpreis = 5;
var speedtext = 0;

var weightpreis = 8;
var weighttext = 20;
var minweight = 800;

var strengpreis = 11;
var strengtext = 1;
var minstreng = 5;

//punches
var punches = 20;
var addpunch = 1; // stärke

var saves = {
    "savepunches": 20,
    "savespeedtext": 0,
    "savespeed": 20,
    "savegewicht": 1000,
    "savegewichttext": 20,
    "savegewichtmin": 500,
    "savestreng": 1,
    "savestrengtext": 1,
    "savestrengmin": 5,
    "saveadddegrees": 1,
    "saveautohammer": false,
    "saveautohammerbuyed":false,
    "savedate":[0,0]
}

//startscreen

function play(){
    var startscreenback = document.getElementById("startscreenback");
    var startscreenbutton = document.getElementById("startbutton");
    var startscreenbuttonload = document.getElementById("startbuttonnew");
    var startscreenbyme = document.getElementById("byme");
    var startscreencopy = document.getElementById("copy");
    var startscreenuber = document.getElementById("uberschrifttt");

    var black = document.getElementById("blackimage")

    var blackimageopacity = 0;

    var blackout = false;

    var timouted = false;

    var inter

    if(black.style.top == "200%"){
        black.style.top = "0%"
    }

    inter = setInterval(()=>{
        blackimageopacity += 0.02
        if(blackimageopacity < 1 && blackout == false){
            black.style.opacity = blackimageopacity
        }else{
            blackout = true;
            blackimageopacity = 1
            black.style.opacity = blackimageopacity
            if(timouted == false){
                timouted = true;
                clearInterval(inter)
                    startscreenback.style.opacity = 0;
                    startscreencopy.style.opacity = 0;
                    startscreenbyme.style.opacity = 0;
                    startscreenuber.style.opacity = 0;
                    startscreenbutton.style.opacity = 0;
                    startscreenback.style.top = "200%";
                    startscreencopy.style.top = "200%";
                    startscreenbyme.style.top = "200%";
                    startscreenuber.style.top = "200%";
                    startscreenbutton.style.top = "200%";
                    startscreenbuttonload.style.top = "200%";
                    load()
                    saveTime()
                setTimeout(()=>{
                    inter = setInterval(()=>{
                        blackimageopacity -= 0.02
                        if(blackimageopacity > 0 && blackout == true){
                            black.style.opacity = blackimageopacity
                        }else{
                            blackout = false
                            black.style.top = "200%"

                            var audio = new Audio();
                            audio.src = "./sounds/backmusic.mp3";
                            audio.volume = 0.4;
                            audio.play();
                            audio.loop = true;

                            clearInterval(inter)
                        }
                    },10)
                    setInterval(()=>{
                        saveTime()
                    },1000)
                },1000)
            }
        }
    },10)
}

function newgame(){
    var areyousure = document.getElementById("areyousure");
    if(localStorage.getItem("hammersimulatorsaves")){
        areyousure.style.top = "calc(50% - 250px)";
    }else{
        play();
    }
}

function loadgame(){
    var noloadgame = document.getElementById("noloadgame");
    if(!localStorage.getItem("hammersimulatorsaves")){
        noloadgame.style.top = "calc(50% - 250px)";
    }else{
        play();
    }
}

function reset(){
    localStorage.removeItem("hammersimulatorsaves");

    saves.savepunches = 20
    saves.savespeedtext = 0
    saves.savespeed = 20
    saves.savegewicht = 1000
    saves.savegewichttext = 20
    saves.savegewichtmin = 500
    saves.savestreng = 1
    saves.savestrengtext = 1
    saves.savestrengmin = 5
    saves.saveadddegrees = 1
    saves.saveautohammer = false
    saves.saveautohammerbuyed = false
    saves.savedate = [0,0]

    localStorage.setItem('hammersimulatorsaves',JSON.stringify(saves));
}

function save(){
    saves.savepunches = punches
    saves.savespeed = speed
    saves.savespeedtext = speedtext
    saves.savegewicht = gewicht
    saves.savegewichttext = weighttext
    saves.savegewichtmin = minweight
    saves.savestreng = addpunch
    saves.savestrengtext = strengtext
    saves.savestrengmin = minstreng
    saves.saveadddegrees = adddegrees
    saves.saveautohammer = autohammervar
    saves.saveautohammerbuyed = autohammerbuyed
    saves.savedate = saves.savedate
    localStorage.setItem('hammersimulatorsaves',JSON.stringify(saves));
}

function saveTime(){
    saves.savedate = [new Date().getMinutes(), new Date().getSeconds()]
    save()
}

function loadtime(){
    var item = JSON.parse(localStorage.getItem('hammersimulatorsaves'));

    if(!item){
        
        var startscreenback = document.getElementById("startscreenback");
        var startscreenbutton = document.getElementById("startbutton");
        var startscreenbyme = document.getElementById("byme");
        var startscreencopy = document.getElementById("copy");
        var startscreenuber = document.getElementById("uberschrifttt");
        var startscreenbuttonload = document.getElementById("startbuttonnew");

        startscreenback.style.opacity = 1;
        startscreencopy.style.opacity = 1;
        startscreenbyme.style.opacity = 1;
        startscreenuber.style.opacity = 1;
        startscreenbutton.style.opacity = 1;
        startscreenbuttonload.style.opacity = 1;

        startscreenback.style.top = "0%";
        startscreencopy.style.top = "95%";
        startscreenbyme.style.top = "95%";
        startscreenuber.style.top = "0%";
        startscreenbutton.style.top = "calc(50% - -50px)";
        startscreenbuttonload.style.top = "calc(50% - 150px)";

        return;
    }

    if(timeload == false){
        timeload = true;

    if(item.savedate[0] < new Date().getMinutes()){
        item.savedate[1] = -100;
    }

    if(new Date().getSeconds() > item.savedate[1] + 30){
        var startscreenback = document.getElementById("startscreenback");
        var startscreenbutton = document.getElementById("startbutton");
        var startscreenbyme = document.getElementById("byme");
        var startscreencopy = document.getElementById("copy");
        var startscreenuber = document.getElementById("uberschrifttt");
        var startscreenbuttonload = document.getElementById("startbuttonnew");

        startscreenback.style.opacity = 1;
        startscreencopy.style.opacity = 1;
        startscreenbyme.style.opacity = 1;
        startscreenuber.style.opacity = 1;
        startscreenbutton.style.opacity = 1;
        startscreenbuttonload.style.opacity = 1;

        startscreenback.style.top = "0%";
        startscreencopy.style.top = "95%";
        startscreenbyme.style.top = "95%";
        startscreenuber.style.top = "0%";
        startscreenbutton.style.top = "calc(50% - -50px)";
        startscreenbuttonload.style.top = "calc(50% - 150px)";

    }else{
        load();
    }
}
}

function load(){
    if(loadet == true) return;
    if(localStorage.getItem("hammersimulatorsaves")){
        var loadsaves = JSON.parse(localStorage.getItem('hammersimulatorsaves'));

        //punshes
        punches = loadsaves.savepunches
        saves.savepunches = loadsaves.savepunches
        console.log("Punches: "+loadsaves.savepunches)

        //speed
        speed = loadsaves.savespeed
        saves.savespeed = loadsaves.savespeed
        console.log("Speed: "+loadsaves.savespeed)

        //speedtext
        speedtext = loadsaves.savespeedtext
        saves.savespeedtext = loadsaves.savespeedtext
        console.log("Speedtext: "+loadsaves.savespeedtext)

        //gewicht
        gewicht = loadsaves.savegewicht
        saves.savegewicht = loadsaves.savegewicht
        console.log("Gewicht: "+loadsaves.savegewicht)

        //gewichttext
        weighttext = loadsaves.savegewichttext
        saves.savegewichttext = loadsaves.savegewichttext
        console.log("Gewichttext: "+loadsaves.savegewichttext)

        //gewichtmin
        minweight = loadsaves.savegewichtmin
        saves.savegewichtmin = loadsaves.savegewichtmin
        console.log("Gewichtmin: "+loadsaves.savegewichtmin)

        //stärke
        addpunch = loadsaves.savestreng
        saves.savestreng = loadsaves.savestreng
        console.log("Stärke: "+loadsaves.savestreng)

        //stärketext
        strengtext = loadsaves.savestrengtext
        saves.savestrengtext = loadsaves.savestrengtext
        console.log("Stärketext: "+loadsaves.savestrengtext)

        //stärkemin
        minstreng = loadsaves.savestrengmin
        saves.savestrengmin = loadsaves.savestrengmin
        console.log("Stärkemin: "+loadsaves.savestrengmin)

        //text
        //punches
        document.getElementById("punshtext").innerText = "Schläge: "+punches

        //speed
        document.getElementById("speedtext").innerText = "Geschwindigkeit: "+speedtext

        //gewicht
        document.getElementById("weighttext").innerText = "Gewicht: "+weighttext

        //streng
        document.getElementById("strengtext").innerText = "Stärke: "+addpunch

        //buttons
        //speed
        if(speed <= 0){
            speed = 0
            document.getElementById("speedupbutton").innerText = "Upgrade Griff (MAX)";
        }

        //gewicht
        if(gewicht <= minweight){
            gewicht = minweight
            document.getElementById("weightupbutton").innerText = "Upgrade Metall (MAX)";
        }

        //stärke
        if(addpunch >= minstreng){
            addpunch = minstreng
            document.getElementById("strengupbutton").innerText = "Upgrade Stärke (MAX)";
        }

        autohammervar = loadsaves.saveautohammer
        autohammerbuyed = loadsaves.saveautohammerbuyed
        saves.saveautohammer = loadsaves.saveautohammer
        console.log("Autohammer: "+loadsaves.saveautohammer)
        console.log("Gekauft Autohammer: ",loadsaves.saveautohammerbuyed)

        if(autohammerbuyed == true){
            document.getElementById("autohammerbutton").innerText = "Autohammer (SOLD)";
        }

        if(autohammervar == true && autohammerbuyed == true){
            autohammer(autohammerholder)
        }

        //time
        console.log(loadsaves.savedate)

        var audio = new Audio();
        audio.src = "./sounds/backmusic.mp3";
        audio.volume = 0.4;
        audio.play();
        audio.loop = true;

        setInterval(()=>{
            saveTime()
        },1000)

        loadet = true
    }
}

document.addEventListener("readystatechange",()=>{
    setInterval(() => {
        window.scrollTo({
            top: 0,
            left: 0,
        });
    },100);

    loadtime();
    
})

if((window.fullScreen) || (window.innerWidth == screen.width && window.innerHeight == screen.height)) {
    console.log("Is fullscreen")
} else {
    alert("Aktiviere Vollbild, damit die Objekte nicht verschoben sind. (F11)")
}

function hammerpress(){

    if(upshopopen == true && autohammervar == false) return;

    var inter

    var hammer = document.getElementById("hammerimage");
    var hammerhot = document.getElementById("hammerimageHOT");

    if(press == false){
        press = true

    inter = setInterval(()=>{

            if(degres < 56 && max == false){
                degres+=adddegrees;
            }else{
                max = true
                if(degres <= 0 && timeout == false){
                    timeout = true
                    punches += addpunch
                    save()

                    var punshtext = document.getElementById("punshtext")

                    punshtext.innerText = "Schläge: "+punches

                    new flyfunction(45,70)

                    var audio = new Audio()
                    audio.src = "./sounds/klopf.mp3"
                    audio.volume = 0.5
                    audio.play()
                    setTimeout(()=>{
                    clearInterval(inter)
                    degres = 0
                    press = false
                    max = false
                    timeout = false
                    },gewicht)
                }
                if(degres > 0){
                    degres-=adddegrees;
                }
            }

            hammer.style.transform = `rotate(${degres}deg)`;
            if(hammerhot.style.opacity > 0){
                hammerhot.style.transform = `rotate(${degres}deg)`;
            }
        },speed)
    }
}

function flyfunction(left, top){
    var text = document.createElement("p")
    document.body.append(text)
    text.id = "flytext"
    text.style.color = "lightgreen"
    text.style.fontFamily = "arialblack"
    text.style.fontSize = "20px"
    text.style.userSelect = "none"
    text.style.webkitUserSelect = "none"
    text.style.position = "absolute"
    if(addpunch > 1){
        text.innerText = `+${addpunch} Schläge`
    }else{
        text.innerText = `+${addpunch} Schlag`
    }
    var inter
    var topvar = top
    let rleft = (Math.floor(Math.random() * 26)) + 35
    text.style.left = `${rleft}%`
    text.style.top = `${top}%`
    inter = setInterval(()=>{
        topvar -=0.25;
        text.style.top = `${topvar}%`
        if(topvar < -20){
            clearInterval(inter)
            var element = document.getElementById("flytext");
            element.parentNode.removeChild(element);
        }
    },15)
}

function upspeed(){
    var audio = new Audio()
    audio.src = "./sounds/click.mp3"
    audio.play()

    if(speed <= 0){
        document.getElementById("speedupbutton").innerText = "Upgrade Griff (MAX)";
        return;
    }

    if(punches < speedpreis){
        return;
    }

    punches -= speedpreis
    speed -= 1

    var punshtext = document.getElementById("punshtext")

    punshtext.innerText = "Schläge: "+punches
    speedtext ++;
    var spedtext = document.getElementById("speedtext")
    spedtext.innerText = "Geschwindigkeit: "+speedtext
    save()
}

function upweight(){
    var audio = new Audio()
    audio.src = "./sounds/click.mp3"
    audio.play()

    if(gewicht <= minweight){
        document.getElementById("weightupbutton").innerText = "Upgrade Metall (MAX)";
        gewicht = minweight
        return;
    }

    if(punches < weightpreis){
        return;
    }

    punches -= weightpreis
    gewicht -= 50
    var punshtext = document.getElementById("punshtext")

    punshtext.innerText = "Schläge: "+punches
    weighttext --;
    var spedtext = document.getElementById("weighttext")
    spedtext.innerText = "Gewicht: "+weighttext
    save()
}

function upstreng(){
    var audio = new Audio()
    audio.src = "./sounds/click.mp3"
    audio.play()

    if(addpunch >= minstreng){
        document.getElementById("strengupbutton").innerText = "Upgrade Stärke (MAX)";
        addpunch = minstreng;
        return;
    }else{
        document.getElementById("strengupbutton").innerText = "Upgrade Stärke (11)";
    }

    if(punches < strengpreis){
        return;
    }

    punches -= strengpreis
    addpunch ++;
    var punshtext = document.getElementById("punshtext")

    punshtext.innerText = "Schläge: "+punches
    strengtext ++;
    var spedtext = document.getElementById("strengtext")
    spedtext.innerText = "Stärke: "+strengtext
    save()
}

function openupgradeshop(){

    var audio = new Audio()
    audio.src = "./sounds/click.mp3"
    audio.play()

    var shop = document.getElementById("upgradeshop")

    var inter

    if(upshopopen == false){
        upshopopen = true
        if(upshoppos == 100){
        inter = setInterval(()=>{
            if(upshoppos >= 60){
                upshoppos -= 0.5
                shop.style.left = `${upshoppos}%`
            }else{
                console.log("offen")
                shop.style.left = `60%`
                upshoppos = 60
                clearInterval(inter)
            }
        },10)
    }
    }else{
        upshopopen = false
        if(upshoppos == 60){
        inter = setInterval(()=>{
            if(upshoppos <= 100){
                upshoppos += 0.5
                shop.style.left = `${upshoppos}%`
            }else{
                shop.style.left = `100%`
                upshoppos = 100
                clearInterval(inter)
            }
        },10)
    }
    }
}

function autohammer(){
    autohammerholder = setInterval(()=>{
        hammerpress()
    },750)
}

function buyautohammer(){
    var price = 500;
    if(punches < price || autohammervar == true) return;
    punches -= price;
    autohammervar = true
    autohammerbuyed = true
    save()
    var text = document.getElementById("autohammerbutton").innerText = "Autohammer (SOLD)"
    autohammer(autohammerholder)
}

function stopautohammer(){
    if(autohammervar == true && autohammerbuyed == true){
        clearInterval(autohammerholder)
        autohammervar = false
        save()
    }
}

function activateautohammer(){
    if(autohammervar == false && autohammerbuyed == true){
        autohammer()
        autohammervar = true
        save()
    }
}