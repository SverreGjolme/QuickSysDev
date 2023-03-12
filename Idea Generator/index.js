    //To arrays og en tom variabel som brukes til å generere idèer og setter dem til variabelen
let firstPart = ["Adventurous", "Scared", "Tenacious", "Mouldy", "Pristine", "Treacherous"];
let secondPart = ["Nobleman", "Scarecrow", "Car", "Friend", "Newspaper", "Phone"];
let newIdea = "";

var greenList = document.getElementById("green-list");
var redList = document.getElementById("red-list");

    //Lytter til clicks på btn-primary
$(".btn-primary").click(function(){

     $("h3").html(generateIdea());                                                              //Bytter ut teksten i h3 med den genererte idèen
});


  $(".btn-success").click(function(){

    let greenIdea = newIdea;                                                                    //Funksjonen kjører nå brukeren trykker på den grønne knappen, oppretter en
    let entry = document.createElement("li");                                                   //ny list item med createElement, teksten blir satt med createTextNode,
    entry.appendChild(document.createTextNode(greenIdea));                                      //og til slutt blir den nye idèen skjøtet på med appendChild
    greenList.appendChild(entry);

  });

  $(".btn-danger").click(function(){

    let redIdea = newIdea;                                                                      //Samme som funksjonen ovenfor, bare for den røde knappen
    let entry = document.createElement("li");
    entry.appendChild(document.createTextNode(redIdea));
    redList.appendChild(entry);
  
  });

function generateIdea(){                                                                        //Genererer idè ved å generere vilkårlig generere 2 tall innenfor lengden til de to
    let firstPartSelected = firstPart[Math.floor(Math.random() * firstPart.length)];            //arrayene som inneholder første og andre del av en idè.
    let secondPartSelected = secondPart[Math.floor(Math.random() * secondPart.length)];         //Skjøter ordene sammen
    newIdea = firstPartSelected + " " + secondPartSelected;
    return newIdea;
}