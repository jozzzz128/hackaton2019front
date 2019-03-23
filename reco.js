'use strict'
window.onload = function () {

  var textoComando = ["cli","please"];
  var banderaComando = true;

  var comandos = [["dame la fecha","23 de marzo de 2019"]];

    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "es";

    document.querySelector("#boton").addEventListener('click', function () {
        //text1.focus();
        recognition.start();
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

        text2.value = finalResult;
        text1.value = interimResult;

        if(banderaComando){
          if (interimResult.toLowerCase().indexOf(textoComando[0]) != -1 || interimResult.toLowerCase().indexOf(textoComando[1]) != -1){
                hablaWeb("Estoy a tus ordenes");
                banderaComando = false;
          }
        }

        else{
          if (interimResult.toLowerCase().indexOf("dame la fecha") != -1){
                hablaWeb("23 de marzo de 2019");
                banderaComando = true;
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


function gif(){
    let tiempo = 2500;
    for(var i = 0; i < text2.value.length; i++){
        console.log(i);
        setTimeout(function(){
            document.getElementById("vid").innerHTML = '<img src="videos/'+text2.value[i]+'/'+text2.value[i]+'.gif"></img>';
        },(tiempo * i));

        //setTimeout(hola(),2000);
    }

}
