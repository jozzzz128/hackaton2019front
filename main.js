'use strict'


var videosArray = [
  "23_03_2019_01_39_tema_autor.mp4",
  "24_03_2019_01_40_tema_autor.mp4"
];
/*
var texto = document.querySelector('#mitexto');
var texto = document.querySelector('#mitexto');
const oir = document.querySelector('#escuchar');

oir.addEventListener('click',function(){
  let text = texto.value;
  let utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'it-IT';
  speechSynthesis.speak(utterance);
});
*/


//http://translate.google.com/translate_tts?tl=es&q="

const allBody = document.querySelector("#bodyContainer .limiter");

//Validar String nombre
function validateName(param1){
  let r_username = param1.trim();
  let bandera = true;
  for(let i = 0; i < r_username.length; i++){
    if(r_username.charCodeAt(i) < 65 || r_username.charCodeAt(i) > 90 && r_username.charCodeAt(i) < 97 || r_username.charCodeAt(i) > 122 || r_username.charCodeAt(i) < 160 && r_username.charCodeAt(i) > 165){
      bandera = false;
      if(r_username.charCodeAt(i) == 241 || r_username.charCodeAt(i) == 209 || r_username.charCodeAt(i) == 233 || r_username.charCodeAt(i) == 237 || r_username.charCodeAt(i) == 243 || r_username.charCodeAt(i) == 250 || r_username.charCodeAt(i) == 32){
      bandera = true;
      }
    }

    /*if(bandera == false){
      alert("letra: " + r_username[i] + ", code: " + r_username.charCodeAt(i) + ", posicion: " + i);
      bandera = true;
    }*/

  }
  return bandera;
}

function validateNumber(evt){
  evt = evt || window.event;
  var charCode = evt.keyCode || evt.which;
  var charStr = String.fromCharCode(charCode);
  alert(charStr);
}

//ESTILIZAR FORMULARIO
const allforms = allBody.querySelector(".formAll");

function reducirLabel(){
  let label = this.parentNode.querySelector("label");
  if(label != null){
    label.style.fontSize = "14px";
    label.style.top = "0px";
    label.style.color = "#000";
  }
}

function aumentarLabel(){
  let texto = this.value.trim();
  let label = this.parentNode.querySelector("label");
  if(label != null){
    if(texto.length == 0){
      label.style.fontSize = "16px";
      label.style.top = "20px";
      label.style.color = "rgba(0,0,0,0.6)";
    }
  }
}

//Activar Radio
function selectRadio(){
  let valor = this.innerHTML;
  this.parentNode.parentNode.querySelector('input[value="'+valor+'"]').checked = true;
  this.parentNode.parentNode.querySelector(".select .conca").innerHTML = ": " + valor;
  let theOptioner = this.parentNode.parentNode.querySelector(".select");
  theOptioner.removeEventListener('click',hideOptionsSelect);
  theOptioner.addEventListener('click',displayOptionsSelect);
  theOptioner.querySelector(".icon-x").classList = "icon-keyboard_arrow_down";

  this.parentNode.innerHTML = "";
}

//Ocultar elementos del display
function hideOptionsSelect(){
  this.removeEventListener('click',hideOptionsSelect);
  this.addEventListener('click',displayOptionsSelect);
  this.querySelector(".icon-x").classList = "icon-keyboard_arrow_down";

  let container = this.parentNode.querySelector(".seleccion");
  container.innerHTML = "";
}

//Mostrar elementos del display
function displayOptionsSelect(){
  this.querySelector(".icon-keyboard_arrow_down").classList = "icon-x";

  let options = this.parentNode.querySelectorAll('input[type="radio"]');
  let container = this.parentNode.querySelector(".seleccion");
  for (var i = 0; i < options.length; i++) {
    let display = document.createElement("p");
    display.innerHTML = options[i].value;
    display.addEventListener('click',selectRadio);
    container.append(display);
  }
  this.removeEventListener('click',displayOptionsSelect);
  this.addEventListener('click',hideOptionsSelect);
}

//Submit form
function submitForm(){
  let formuName = this.parentNode.querySelector(".insert .nombre");
  let formuNumber = this.parentNode.querySelectorAll('.insert input[type="number"]');

  let banderaNombre = validateName(formuName.value);
  if(banderaNombre != true){
    alert("Hay un caracter invalido en tu nombre!!");
  }else if(formuName.value.trim().length == 0){
    alert("El campo de nombre esta vacio!!");
  }

  for(var i = 0; i < formuNumber.length; i++){
    if(formuNumber[i].value.length == 0) {
      alert("Hay un campo numerico vacio!!");
    }
  }

}

if(allforms != null){
  let submit = allforms.querySelector(".submit");
  submit.addEventListener('click',submitForm);

  let inputs = allforms.querySelectorAll(".insert input");
  let display = allforms.querySelector(".insert .select");
  if(display != null){
    let allDisplays = allforms.querySelectorAll(".insert .select");
    for(let i = 0; i < allDisplays.length; i++){
      allDisplays[i].addEventListener('click',displayOptionsSelect);
    }
  }
  for(let i = 0; i < inputs.length; i++){
    inputs[i].addEventListener('focus',reducirLabel);
    inputs[i].addEventListener('blur',aumentarLabel);
  }
}

if(document.querySelector("#agenda") != null){
  scrollMap();
}

function scrollMap(){

  const agenda = document.querySelector("#agenda");
  //var dias = [];
  //var meses = [];
  //var years = [];
  //var fecha = [];

  var dic = [];
  //var hours = [];
  //var minutes = [];
  //var hora = [];
  //var temas = [];
  //var autores = [];

  let video1 = videosArray[0].split("_");

  dic.push(
    {
      autor: video1[6],
      fecha: [
        [(video1[0]+"/"+video1[1]+"/"+video1[2]),[ [(video1[3]+":"+video1[4]),video1[5]]]],
        //[(video1[0]+"/"+video1[1]+"/"+video1[2]),[ [(video1[3]+":"+video1[4]),video1[5]] , ["43:54","tema"] ]]
        //["33/65/2019",[ ["33:54","tema"] , ["43:54","tema"] ]]
      ]
    }
  );
  //dias.push(video1[0]);
  //meses.push(video1[1]);
  //years.push(video1[2]);
  //hours.push(video1[3]);
  //minutes.push(video1[4]);

  for (var i = 0; i < dic.length; i++) {
    let video = videosArray[i].split("_");

    /*
    //Dias
    let banderaDias = true;
    for (var j = 0; j < dias.length; j++) {
      if(video[0] == dias[j]){
        banderaDias = false;
      }
    }
    if(banderaDias){
      dias.push(video[0]);
    }

    //Meses
    let banderaMeses = true;
    for (var j = 0; j < meses.length; j++) {
      if(video[1] == meses[j]){
        banderaMeses = false;
      }
    }
    if(banderaMeses){
      meses.push(video[1]);
    }


    //Años
    let banderaYears = true;
    for (var j = 0; j < years.length; j++) {
      if(video[2] == years[j]){
        banderaYears = false;
      }
    }
    if(banderaYears){
      years.push(video[2]);
    }
    */

    let banderaDic = true;

    for (var j = 0; j < dic.length; j++) {
      if(video[6] == dic[j].autor){
        banderaDic = false;
      }
    }

    if(banderaDic){

      dic.push(
        {
          autor: video[6],
          fecha: []
          /*fecha: [
            [   "",  [ [ "", "" , ["",""] ]  ]   ]  //,
            //["33/65/2019",[ ["33:54","tema"] , ["43:54","tema"] ]]
          ]*/
        }
      );

      let banderaFecha = true;
      for (var k = 0; k < dic.fecha.length; k++) {
        if((video[0]+"/"+video[1]+"/"+video[2]) == dic.fecha[k][0]){
          banderaFecha = false;
        }
      }
      if(banderaFecha){
          dic[dic.length - 1].fecha[fecha.length - 1].push([(video[0]+"/"+video[1]+"/"+video[2]),[]]);

          let banderaHora = true;
          for (var l = 0; l < dic[dic.length - 1][fecha.length - 1][1].length; l++) {
            if((video[3]+":"+video[4]) == dic[dic.length - 1][fecha.length - 1][1][l]){
              banderaHora = false;
            }
          }

          if(banderaHora){
            dic[dic.length - 1][fecha.length - 1][1].push([ (video[3]+":"+video[4]) , video[5] ]);
          }

      }

    }

    /*
    //Hora
    let banderaHours = true;
    for (var j = 0; j < hours.length; j++) {
      if(video[3] == hours[j]){
        banderaHours = false;
      }
    }
    if(banderaHours){
      hours.push(video[3]);
    }

    //Minutos
    let banderaMinutes = true;
    for (var j = 0; j < minutes.length; j++) {
      if(video[4] == minutes[j]){
        banderaMinutes = false;
      }
    }
    if(banderaMinutes){
      minutes.push(video[4]);
    }

    //Temas
    let banderaTemas = true;
    for (var j = 0; j < temas.length; j++) {
      if(video[5] == temas[j]){
        banderaTemas = false;
      }
    }
    if(banderaTemas){
      temas.push(video[5]);
    }

    //Autores
    let banderaAutores = true;
    for (var j = 0; j < autores.length; j++) {
      if(video[6] == autores[j]){
        banderaAutores = false;
      }
    }
    if(banderaAutores){
      autores.push(video[6]);
    }

    */

  }

  //Construir

  for (var i = 0; i < dic.length; i++) {
    let maestro = document.createElement("div");
    maestro.classList = "clase";
    let divs = '<div class="maestro"><div class="thumb"></div><div class="content"><h2>'+(dic[i].autor.split(".")[0])+'</h2><p>Materia que imparte</p></div></div> <div class="sesion-container"> <div class="sesiones">';
    /*for (let j = 0; j < dic[i].fecha.length; j++){
      console.log(dic[i].fecha[j][0]);

      for(let k = 0; k < dic[i].fecha[j][1].length; k++){
        //console.log(dic[i].fecha[j][1][k]);
        divs += '<div class="sesion"><h3 class="fecha"> ' + dic[i].fecha[j][0] + '</h3><div class="cont"><ul>' +  '<a href="#">'+dic[i].fecha[j][1][k]+'<span class="desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span></a>';

      }
    }*/
     for(let j = 0; j < dic[i].fecha.length; j++){
       divs += '<div class="sesion"><h3 class="fecha">' + dic[i].fecha[j][0] + '</h3><div class="cont"><ul>';
       for(let k = 0; k < dic[i].fecha[j][1].length; k++){
         divs += '<a href="#">'+dic[i].fecha[j][1][k]+'<span class="desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span></a>';
       }
       divs += '</ul></div></div>';
     }
    divs += '</div></div>';
    maestro.innerHTML = divs;
    agenda.append(maestro);
    console.log(dic);
  }

}
