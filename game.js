var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var count=0;
var level=0;
function nextSequence(){
    var randomNumber=Math.floor(Math.random()*4);
    randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor); 
    $("#level-title").text("Level "+level);
    level++;
    
}

$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});


function playSound(name){
    
    var colorAudio="sounds/"+name+".mp3";
    var audio = new Audio(colorAudio);
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColor).removeClass("pressed");
      }, 50);
}

$(document).keypress(function(){
    if (count==0){
        nextSequence();
    }
    count++;
});

function checkAnswer(currenLevel){
    if (gamePattern[currenLevel]==userClickedPattern[currenLevel]){
        if(gamePattern.length==userClickedPattern.length){
            setTimeout(function() {
                nextSequence();
                userClickedPattern=[];
              }, 1000);
        }
    }
    else{
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    userClickedPattern=[];
    count=0;

}
