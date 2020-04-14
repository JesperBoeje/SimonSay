//Variabler

//de fire farver
var buttonColours = ["red", "blue", "green", "yellow"];

//det nuværende mønster som brugeren skal følge
var gamePattern = [];

//det mønser som spilleren er ved at fremføre på et givent tidspunkt
var userClickedPattern = [];

//er spillet startet
var startet = false;

//spillets level og score
var level = 0;

//spillets level og score
var highScore = 0;

//Funktioner

//funktion der finder næste mønster
function nextSequence() {
  var randomNumber = (Math.floor(Math.random() * 4));
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

  level++;
  $("#level-title").text("Level " + level);
}

//Funktion til at afspille lyd, tager en variabl ind, som skal passe ind i sound bibliotek
function playSound(sound) {
  var audio = new Audio('sounds/' + sound + '.mp3');
  audio.play();
};

//Funktion til at vise trykket
function animatePress(currentColor) {
  $("#" + currentColor + "").addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor + "").removeClass("pressed");
  }, 100);
};

//Funktion der afventer klik på en af knapperne
$(".btn").click(function(event) {
  var userChosenColour = this.id;

  userClickedPattern.push(this.id);
  playSound(userChosenColour);
  animatePress(userChosenColour)

  checkAnswer(userClickedPattern.length);
});

//Funktion til at tjekke svarerne
function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel - 1] === userClickedPattern[currentLevel - 1]) {

  }
  else {
        playSound("wrong");
    $("h1").text("GAME OVER!!!");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 100);
if (level>highScore){
highScore=level;
$("h2").text("High score: "+highScore);

}

    startet = false;
    level = 0;
    setTimeout(function() {
      $("h1").text("Press A Key to Start");
      userClickedPattern=[];
      gamePattern=[];
    }, 1000);
  }

  if (userClickedPattern.length != level) {

  } else {

    setTimeout(function() {
      nextSequence();
      userClickedPattern = [];
    }, 1000);
  }

};


//Funktion til at starte spillet
$(document).keypress(function(event) {
  if (startet == false) {
    startet = true;
    nextSequence();
    $("h1").text("Level " + level);
  }

});
