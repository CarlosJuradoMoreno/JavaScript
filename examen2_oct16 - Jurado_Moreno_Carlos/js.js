var nivel;
var jugado=false;
function empezar(){

	if (jugado){			//SI ya ha acabado el juego
		//Borramos explosion
	document.getElementById("explosion").parentNode.removeChild(document.getElementById("explosion"));
	//Borramos batmans y jokers
	document.getElementById("batman").parentNode.removeChild(document.getElementById("batman"));
	document.getElementById("joker").parentNode.removeChild(document.getElementById("joker"));
	}

	document.getElementById("empezar").disabled=true;
	document.getElementById("subir").disabled=false;
	document.getElementById("bajar").disabled=false;
	document.getElementById("parar").disabled=false;
	//Creamos las capas
	var batman=document.createElement("img");
	var joker=document.createElement("img");
	var coche=document.createElement("img");
	//asignamos ids
	batman.id="batman";
	joker.id="joker";
	coche.id="coche";
	//asignamos imagenes y atributos
	batman.setAttribute("src","images/batman.png");
	joker.setAttribute("src","images/joker.png");
	coche.setAttribute("src","images/batmobile.png");
	joker.setAttribute("onclick", "dispara()");

	batman.style.top=Math.floor((Math.random()*(600-150))+1);
	joker.style.top=Math.floor((Math.random()*(600-150))+1);

	batman.style.left=(1000-150-169);				//total-batman-coche  (Segun paint)
	coche.style.left=(1000-169);					//total-coche

	//Imprimimos
	document.getElementById("escenario").appendChild(batman);
	document.getElementById("escenario").appendChild(joker);
	document.getElementById("escenario").appendChild(coche);

	nivel=0;					//variables de control
	document.getElementById("nivel").innerHTML=nivel;
}

var inter;

function subir(){
	clearInterval(inter);
	var batman=document.getElementById("batman");
	var batTop=batman.offsetTop;
	inter= setInterval(function(){
		if(batTop>0){				//Total-altura de batman
			batTop--;
			batman.style.top=batTop +"px";
		}else{
			clearInterval(inter);
		}

	},1);
}

function bajar(){
	clearInterval(inter);
	var batman=document.getElementById("batman");
	var batTop=batman.offsetTop;
	inter= setInterval(function(){
		if(batTop<(600-108)){				//Total-altura de batman
			batTop++;
			batman.style.top=batTop+"px";
		}else{
			clearInterval(inter);
		}
	},1);
}

function parar(){
	clearInterval(inter);
}

function dispara(){
	nivel++;
	document.getElementById("nivel").innerHTML=nivel;
	var joker = document.getElementById("joker");
	joker.setAttribute("onclick", "");
	for (var i=0;i<nivel;i++){			//Por cada nivel creamos una carta
	creaCarta();
	}

	joker.style.top=Math.floor((Math.random()*(600-144))+1);	//aleatorio entre 1 y la posicion maxima -altura joker

}

function creaCarta(){
	var carta = document.createElement("img");
	var altura= Math.floor((Math.random()*(600-40))+1); //Altura aleatoria a la que se va a mover
	carta.setAttribute("src","images/card.png");
	carta.style.left=150 +"px";				//ancho joker
	carta.style.top=joker.offsetTop;
	carta.className="carta";
	//movimiento de la carta
	var interCarta = setInterval(function(){				
	var batman=document.getElementById("batman");
	//Si la parte de arriba  o abajo de la carta choca con batman	
	if((((carta.offsetLeft+40)>batman.offsetLeft)&&((carta.offsetLeft+40)<(batman.offsetLeft+150)))&&((carta.offsetTop>=batman.offsetTop)&&(carta.offsetTop<=(batman.offsetTop+109))||((carta.offsetTop+56)>=batman.offsetTop)&&((carta.offsetTop+56)<=(batman.offsetTop+109)))){
		//comprobacion anchura
		//((carta.offsetLeft+40)>batman.offsetLeft)&&((carta.offsetLeft+40)<(batman.offsetLeft+150)))
		//comprobacion altura
		//((carta.offsetTop>=batman.offsetTop)&&(carta.offsetTop<=(batman.offsetTop+109))||((carta.offsetTop+56)>=batman.offsetTop)&&((carta.offsetTop+56)<=(batman.offsetTop+109)))
			carta.parentNode.removeChild(carta);
			document.getElementById("joker").setAttribute("onclick", "dispara()");
			
			

	}else if(carta.offsetLeft==(1000-169)){
		joker.setAttribute("onclick", "");
		boom(carta);
	}else{
		carta.style.left=(carta.offsetLeft+1)+"px";
	}
	//movimiento vertical de la carta
	if(carta.offsetTop<altura){
		carta.style.top=(carta.offsetTop+1)+"px";
	}
	if(carta.offsetTop>altura){
		carta.style.top=(carta.offsetTop-1)+"px";
	}

	},5)
	document.getElementById("escenario").appendChild(carta);
}

function boom(carta){
	var exp= document.createElement("img");
	exp.setAttribute("src", "images/explosion.png");
	exp.style.left=carta.offsetLeft;
	exp.style.top=carta.offsetTop;
	exp.className="explosion";
	exp.id="explosion";
	carta.parentNode.removeChild(carta);					//Borra carta
	document.getElementById("coche").parentNode.removeChild(document.getElementById("coche"));			//Boorra coche
	document.getElementById("escenario").appendChild(exp);
	fin();
}	
function fin(){
	//hablilitamos botones
	document.getElementById("empezar").disabled=false;
	document.getElementById("subir").disabled=true;
	document.getElementById("bajar").disabled=true;
	document.getElementById("parar").disabled=true;
	
	//Borramos cartas
	var cartas =document.querySelectorAll(".carta");
	for (var i=0;i<cartas.length;i++){
		cartas[i].parentNode.removeChild(cartas[i]);
	}
	jugado =true;
}