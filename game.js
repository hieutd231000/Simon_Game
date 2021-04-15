
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start = false;

$(document).on("keypress",function(){
  if(!start){
    nextSequence();
    start = true;
  }
});

$(".btn").click(function(event){
  userClickedPattern.push(event.target.id);
  makeSound(event.target.id);
  animatePress(event.target.id);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    console.log("Success");
    if(userClickedPattern.length === gamePattern.length){
      console.log("Next sequence");
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else{
    console.log("Wrong");
    makeSound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Play Again");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 300);
    gameOver();
  }
}
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("LEVEL "+level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  setTimeout(function(){
    makeSound(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(50).fadeIn(50);
  },200); 
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  }, 100); 
}
function makeSound(newSound){
  var audio = new Audio("sounds/"+newSound+".mp3");
  audio.play();
}
function gameOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  start = false;
}







