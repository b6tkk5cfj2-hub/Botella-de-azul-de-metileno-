const botella = document.getElementById("botella");
const liquido = document.getElementById("liquido");
const estado = document.getElementById("estado");


let agarrando = false;

let inicioX = 0;
let movimiento = 0;

let sacudidas = 0;
let ultimaDireccion = 0;

let azulActivo = false;

let posicion = 0;



// TOMAR BOTELLA

botella.addEventListener(
"pointerdown",
(e)=>{

agarrando=true;

inicioX=e.clientX;

botella.setPointerCapture(e.pointerId);


});




// MOVER BOTELLA

botella.addEventListener(
"pointermove",
(e)=>{


if(!agarrando)return;


let distancia=e.clientX-inicioX;



posicion=distancia;



// mover e inclinar botella

botella.style.transform=
`
translate(-50%,-50%)
rotate(${distancia/4}deg)
`;



// detectar sacudida

let direccion = distancia>0 ? 1:-1;


if(direccion!==ultimaDireccion){

sacudidas++;

ultimaDireccion=direccion;

}



// si se agita suficiente

if(sacudidas>12){

activarAzul();

sacudidas=0;

}



});





// SOLTAR BOTELLA


botella.addEventListener(
"pointerup",
()=>{


agarrando=false;


botella.style.transform=
`
translate(-50%,-50%)
rotate(0deg)
`;



});





// REACCIÓN AZUL


function activarAzul(){


if(azulActivo)return;


azulActivo=true;



// cambia color

liquido.classList.remove("incoloro");



estado.textContent=
"Azul (oxidado)";




// vibración química


botella.animate(

[

{
transform:
"translate(-50%,-50%) rotate(-8deg)"
},

{
transform:
"translate(-50%,-50%) rotate(8deg)"
},

{
transform:
"translate(-50%,-50%) rotate(-5deg)"
},

{
transform:
"translate(-50%,-50%) rotate(0deg)"
}

],

{

duration:600

}


);




// vuelve lentamente al estado reducido


setTimeout(()=>{


volverIncoloro();


},7000);



}




function volverIncoloro(){


liquido.classList.add("incoloro");


estado.textContent=
"Incoloro (reducido)";


azulActivo=false;


}







// AGITACIÓN AUTOMÁTICA CON DOBLE CLICK

botella.addEventListener(
"dblclick",
()=>{


activarAzul();


		});