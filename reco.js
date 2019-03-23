'use strict'

var comandos = [
  ["eres","Soy un Asistente por voz creado para servir de guia a personas con discapacidades visuales, que entren a la plataforma Nauklistli"],
  ["funciona","Funciono gracias a un API introducida por la W3C en el 2012, que integró el reconocimiento de voz de manera nativa en la web"],
  ["detente","Cualquier cosa que necesites, no dudes en llamarme por mi nombre, y te ayudare en lo que me sea posible"],
  ["cambiar página","¿A que página te deseas mover?"],
  ["registro","Trasladandonos a Registro de Alumnos"],
  ["agenda","Trasladandonos a la Agenda Personal"],
  ["video","Trasladandonos al ultimo video Publicado"]
];

window.onload = function () {

  var textoComando = ["cli","please"];
  var banderaComando = true;

    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "es";

    document.querySelector("#header .limiter ul .nau-start").addEventListener('click', function(){
      recognition.start();
      document.querySelector("#header .limiter ul .nau-start").style.display = "none";
      document.querySelector("#header .limiter ul .nau-stop").style.display = "inline-block";
    });
    document.querySelector("#header .limiter ul .nau-stop").addEventListener('click', function(){
      recognition.stop();
      document.querySelector("#header .limiter ul .nau-start").style.display = "inline-block";
      document.querySelector("#header .limiter ul .nau-stop").style.display = "none";
    });
    //recognition.start();
    //events

    recognition.onresult = function (event) {
        //console.log("onresult");
        var interimResult = '',
            finalResult = '';
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                finalResult = event.results[i][0].transcript;
            } else {
                interimResult += event.results[i][0].transcript;

            }
        }

        //text2.value = finalResult;
        //text1.value = interimResult;

        if(banderaComando){
          for(let i = 0; i < textoComando.length; i++){
            if (interimResult.toLowerCase().indexOf(textoComando[i]) != -1){
                  hablaWeb("Estoy a tus órdenes");
                  banderaComando = false;
            }
          }
        }

        else{
          for(let i = 0; i < comandos.length; i++){
            if (interimResult.toLowerCase().indexOf(comandos[i][0]) != -1){
                  hablaWeb(comandos[i][1]);
                  if(comandos[i][0] != "cambiar página"){
                  banderaComando = true;
                  }
                  if(comandos[i][0] == "registro"){
                    setTimeout(function(){
                      location.href='AlumnosForm.html';
                    },4000);
                  }else if (comandos[i][0] == "agenda") {
                    setTimeout(function(){
                      location.href='agendaOrg.html';
                    },4000);
                  }else if (comandos[i][0] == "video") {
                    setTimeout(function(){
                      location.href='videoSingle.html';
                    },4000);
                  }
            }
          }
        }


            //gif();
    };
};

function hablaWeb(param1){
  if(true){
    setTimeout(function(){
      let text = param1;
      let utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-MX';
      speechSynthesis.speak(utterance);
      //console.log(interimResult);
    },500);
  }
}

/*
document.addEventListener('visibilitychange', function(e) {
    //console.log(document.hidden);
    if(document.hidden){
      recognition.stop();
    }
});
*/

//
