// ===============================
// CONFIGURAÇÕES DO JOGO
// EDITE AQUI PARA MUDAR VALORES
// ===============================

// TEMPO DA CAIXA
let caixaBloqueada = false;
let tempoCaixa = 60;

// ===============================
// SISTEMA DE SALVAMENTO
// ===============================

let points = Number(localStorage.getItem("points")) || 0;

let clickPower = Number(localStorage.getItem("clickPower")) || 1;

let autoClick = Number(localStorage.getItem("autoClick")) || 0;

function saveGame(){

localStorage.setItem("points", points);

localStorage.setItem("clickPower", clickPower);

localStorage.setItem("autoClick", autoClick);

}


// PREÇOS DA LOJA

let precoClique = 1000;

let precoAuto = 5000;




// CAIXAS

// Recompensas

let caixaComum = 50;

let caixaRara = 500;

let caixaEpica = 5000;



// Chances das caixas (%)

let chanceComum = 84;

let chanceRara = 5;

let chanceEpica = 1;




const pointsText =
document.getElementById("points");



const button =
document.getElementById("tapButton");




// Atualizar tela

function update(){
    

pointsText.innerHTML = points;

}




// Clique principal


button.onclick=function(){


points += clickPower;


// muda cor quando clica

button.style.background =
"red";


setTimeout(()=>{

button.style.background="gold";

},200);



update();
saveGame();


}





// Melhorar clique


function upgradeClick(){


if(points >= precoClique){


points -= precoClique;

clickPower++;


alert("Clique melhorado!");

update();
saveGame();


}

else{

alert("Pontos insuficientes!");

}


}





// Comprar auto clique


function buyAuto(){


if(points >= precoAuto){


points -= precoAuto;

autoClick++;


alert("Auto clique comprado!");

update();
saveGame();


}

else{

alert("Pontos insuficientes!");

}


}




// Auto clique funcionando


setInterval(()=>{


points += autoClick;


update();


},1000);






// Caixa aleatória


function openBox(){


if(caixaBloqueada){

return;

}


caixaBloqueada = true;


let sorte = Math.floor(Math.random()*100)+1;



if(sorte <= chanceEpica){

points += caixaEpica;

message.innerHTML =
"👑 Caixa Épica! +5000 pontos";

}


else if(sorte <= chanceEpica + chanceRara){


points += caixaRara;

message.innerHTML =
"💎 Caixa Rara! +500 pontos";


}


else{


points += caixaComum;

message.innerHTML =
"📦 Caixa Comum! +50 pontos";


}



update();

saveGame();



começarTimer();


}

// ===============================
// RESETAR PROGRESSO
// APAGA O SAVE E COMEÇA DO ZERO
// ===============================


function resetGame(){


let confirmar = confirm(
"Tem certeza que quer apagar todo o progresso?"
);



if(confirmar){


localStorage.clear();


points = 0;

clickPower = 1;

autoClick = 0;



update();



alert("Progresso reiniciado!");

}


}


function começarTimer(){


let tempo = tempoCaixa;


document.getElementById("boxButton").disabled = true;



let contador = setInterval(()=>{


tempo--;


document.getElementById("timer").innerHTML =
"⏳ Espere: " + tempo + " segundos";



if(tempo <= 0){


clearInterval(contador);


caixaBloqueada = false;


document.getElementById("boxButton").disabled = false;


document.getElementById("timer").innerHTML =
"✅ Caixa liberada!";


}



},1000);



}