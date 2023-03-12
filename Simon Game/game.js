
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;


//jQuery
$(document).keypress(function() {                                               //Lytter etter keypresses i hele dokumentet
  if (!started) {                                                               //Hvis det er true at spillet ikke har startet
    $("#level-title").text("Level " + level);                                   //Da starter spillet
    nextSequence();
    started = true;                                                             //Started er nå 'true'
  }
});

$(".btn").click(function() {                                                    //Lytter etter clicks på elementer med classen .btn

  var userChosenColour = $(this).attr("id");                                    //userChosenColour blir satt til å være attributten "id" til den klassen, som er en farge
  userClickedPattern.push(userChosenColour);                                    //Pusher fargen inn i userClickedPattern arrayen

  playSound(userChosenColour);                                                  //Spiller av lyden assossiert med fargen
  animatePress(userChosenColour);                                               //Kjører funksjonen som animerer knappen


  checkAnswer(userClickedPattern.length-1);                                     //Sjekker siste element i userClickedPattern arrayen med checkAnswer funksjonen
});


//Funksjoner
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {       //Hvis siste farge i gamePattern arrayen === siste farge i userClickedPattern arrayen
      console.log("success");                                                   //Da er det riktig.

      if (userClickedPattern.length === gamePattern.length){

        setTimeout(function () {
          nextSequence();                                                        //Kaller på nextSequence funksjonen for å få en ny sekvens
        }, 1000);

      }

    } else {                                                                    //Ellers...

      playSound("wrong");                                                       //Kaller playSoundWrong
      animateWrong();                                                           //Animerer flashing rødt på skjermen
      console.log("wrong");
      $("h1").text("Game Over, Press Any Key to Restart");                      //Setter h1 til å be om å restarte spillet
      startOver();                                                              //Kaller startOver funksjonen for å restarte spillet
    }

}


function nextSequence() {                                                       //Kalles på når spilleren får en ny sekvens

  userClickedPattern = [];                                                      //Resetter sekvensen spilleren har trykt
  level++;                                                                      //Øker nivået-displayet
  $("#level-title").text("Level " + level);                                     //Displayer nytt nivå

  var randomNumber = Math.floor(Math.random() * 4);                             //Genererer random tall
  var randomChosenColour = buttonColours[randomNumber];                         //Assossierer tallet til en farge i buttonColours arrayen
  gamePattern.push(randomChosenColour);                                         //Pusher den nye fargen inn i gamePattern arrayen

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);             //Viser hvilken farge som er ny ved å flashe den
  playSound(randomChosenColour);                                                //Spiller av lydfilen assossiert med fargen
}


function playSound(name) {                                                      //Spiller av en lydfil med navnet på lydfilen som parameter
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColor) {                                           //Adder og remover "pressed" classen, indikerer at en knapp har blitt trykt på
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


function animateWrong(){                                                        //Flasher skjermen rød for å indikere at spilleren tok feil
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
}


function startOver(){                                                           //Resetter parameterne som holder spillet i gang
  level = 0;
  gamePattern = [];
  started = false;
}
