$(document).ready(function() {

 //button hover visual cue
 
	$(".btn-start").hover(function(){
		event.preventDefault();
			$(this).css("background-color", "yellow");
		 	$(this).addClass("active");
		},function(){
				$(this).css("background-color", "#7DDA6A");
		    $(this).removeClass("active");
			});


// when user submits time form, set the timer for that time and begin countdown
// choices only become possible once countdown starts
var userMin;
var userSec;
var startTimeSec;

$(".start-timer").submit(function(e) {
  // ************************************************* start button should now become unclickable unless page is refreshed

  // check to be sure user input is valid
  userMinStr = document.getElementById("userMin").value;
  console.log(userMinStr);
  userSecStr = document.getElementById("userSec").value;

  if(userMinStr.length == 0 && userSecStr == 0){
    alert("Please enter a value");
  } else {
    // convert min and sec to just sec
    var numericExpression = /^[0-9]+$/;
    if (!userMinStr.match(numericExpression) || !userSecStr.match(numericExpression)){
      alert("Please enter a number")
    } else {
      var userMinNum = parseInt(userMinStr);
      var userSecNum = parseInt(userSecStr);
 
      // ************************* handle edge case of secs being 60 or more - amend userMinNum and userSecNum accordingly

      startTimeSec = (userMinNum * 60) + userSecNum;

      var timerArr = [startTimeSec, userMinNum, userSecNum];
      console.log(timerArr);
      e.preventDefault();
      // return timerArr;
    }
  }

  // begin countdown display: set time equal to whatever minutes and seconds user has entered
  $("#time-left").append(userMinNum + ":" + userSecNum);
  // ******************************** handle edge case of one-digit secs by prepending a 0 - at start and during countdown

  // start counting down
  var interval = setInterval(function() {
    var timer = $("#time-left").html();
    timer = timer.split(":");
    var minutes = parseInt(timer[0], 10);
    var seconds = parseInt(timer[1], 10);
    seconds -= 1;

    if (minutes < 0) {
      return clearInterval(interval);
    };
    if (minutes < 10 && minutes.length != 2) {
      minutes = "0" + minutes;
    };
    if (seconds < 0 && minutes != 0) {
        minutes -= 1;
        seconds = 59;
    } else if (seconds < 10 && length.seconds != 2) {
      seconds = "0" + seconds;
    }

    $("#time-left").html(minutes + ":" + seconds);

    // warn user with popup when 10 secs left
    if (minutes == 0 && seconds == 10) {
      // *********************************************************************************** add modal warning for 10 sec
    };

    // stop count down at 00:00 and display who won in a modal
    if (minutes == 0 && seconds == 0) {
      clearInterval(interval);

    // fill modal with result
      var w = document.getElementById("wins").textContent;
      var l = document.getElementById("losses").textContent;
      console.log(w, l);

      if (w > l) {
        $("#verdict").append("You won the game!");
        console.log("win");
        } else if (l > w) {
        $("#verdict").append("You lost the game. Better luck next time!");
        console.log("loss");
        } else {
        $("#verdict").append("You and the computer tied. Everyone's a winner!");
        console.log("tie");
        };

      $("#gameOverModal").css("display", "block");;
    };
      // *********************************************************************************** disable all play buttons
    
}, 1000);
});

// when user chooses r, p, or s, change btn background color and set userChoice
var userChoice;
var botChoice;
var roundWinner;

$(".btn-choose").on("click", function() {
  userChoice = this.id;
  console.log("user: " + userChoice);
  botChooses();
});

// also trigger computer random choice
var botChooses = function() {
  var x = Math.random();
  if (x < .33) {
  	botChoice = "rock";
  } else if (.33 <= x < .66) {
  	botChoice = "paper";
  } else {
  	botChoice = "scissors";
  }
  console.log("bot: " + botChoice);

// display bot choice for a moment
$("<span />",{ style:"display:none; margin-top: 10px; font-weight: 500; font-size: 30px" })
    .html(botChoice)
    .appendTo($(".bot-display"))
    .fadeIn("fast", 
      function(){
        var el = $(this);
        setTimeout(function(){
          el.fadeOut("fast",
            function(){
              $(this).remove();
            });
        }, 500);
    })

// add <span> under bot choice display saying who won round one second after bot choice appears saying who won this round,
// have this fade out simultaneously with bot choice
$("<div />",{ style:"display:none; margin-top: 20px; font-weight: 600; font-size: 40px" })
    .html(roundWinner)
    .appendTo($(".bot-display"))
    .fadeIn("fast", 
      function(){
        var el = $(this);
        setTimeout(function(){
          el.fadeOut("fast",
            function(){
              $(this).remove();
            });
        }, 250);
    }); 
  updateScores();
};

// after bot chooses, update scores
var updateScores = function() {
  var winCount = $("#wins").html();;
  var lossCount = $("#losses").html();;
  var drawCount = $("#draws").html();;

  if (userChoice == botChoice) {
    roundWinner = "Tie!"
    drawCount ++;
  } else if (userChoice == "rock") {
    if (botChoice == "scissors") {
      roundWinner = "You win!";
      winCount ++;
    } else {
      roundWinner = "You lose :(";
      lossCount ++;
    };
  } else if (userChoice == "paper") {
    if (botChoice == "rock") {
      roundWinner = "You win!"
      winCount ++;
    } else {
      roundWinner = "You lose :("
      lossCount ++;
    };
  } else if (userChoice == "scissors") {
    if (botChoice == "paper") {
      roundWinner = "You win!"
      winCount ++;
    } else {
      roundWinner = "You lose :("
      lossCount ++;
    };
  }

  $("#wins").html(winCount);
  $("#losses").html(lossCount);
  $("#draws").html(drawCount);

// clicking restart button restarts timer and zeroes out the scores


}
});
