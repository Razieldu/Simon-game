var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var started = false;
var level=0




//從四個顏色隨機選取一個顏色,並添加到 gamePattern
function nextSequence(){
userClickedPattern=[];
level++;
$("#level-title").text("Level " + level);
var randomNumber =Math.floor(Math.random()*4);
var randomChosenColor = buttonColors[randomNumber];
gamePattern.push(randomChosenColor);
$("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColor);
}

$("#level-title").click(function(){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started=true;
  }
});


$(".btn").click(function(){

  var userChosenColor=$(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
$("#"+currentColor).addClass("pressed");
 setTimeout(function(){
$("#"+currentColor).removeClass("pressed");
 },100)
}



function checkAnswer(currentLevel){
  if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
      console.log("success");
      if(userClickedPattern.length===gamePattern.length){
         setTimeout(function(){
           nextSequence();
         },1000)
      }
  }
  else{
      console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
       $("body").removeClass("game-over");
     },200);
     $("#level-title").text("遊戲結束 點擊此處 重新開始");
     startOver();
}
}

function startOver(){
  gamePattern=[];
  level=0;
  started=false;
}
