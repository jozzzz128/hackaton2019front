'use strict'

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
