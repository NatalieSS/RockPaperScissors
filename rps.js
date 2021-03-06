$(document).ready(function() {

  document.getElementById("rock").disabled = true;
  document.getElementById("paper").disabled = true;
  document.getElementById("scissors").disabled = true;
  document.getElementById("btn-restart").disabled = true;

  // button hover visual cues
	$("#btn-start").hover(function(){
		event.preventDefault();
			$(this).css("background-color", "#6FB560");
		}, function(){
			$(this).css("background-color", "#9AD78D");
		});

  $("#btn-restart").hover(function(){
    event.preventDefault();
      $(this).css("background-color", "#F47811");
    }, function(){
      $(this).css("background-color", "#FF953D");
    });

  $(".btn-choose").hover(function(){
    event.preventDefault();
      $(this).css("background-color", "#7AB2DD");
    }, function(){
      $(this).css("background-color", "white");
    });

var timer = $("#time-left").html();
var userMinStr = document.getElementById("userMin").value;
var userSecStr = document.getElementById("userSec").value;

var interval = function() {
  setInterval(function() {
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
      $(".ten-sec").css("display", "block");
      function hideTenSec(){
        $(".ten-sec").css("display", "none");
      }
      setTimeout(hideTenSec, 1500);
    };

    // stop count down at 00:00 and display who won in a modal
    if (minutes == 0 && seconds == 0) {
      clearInterval(interval);
      $("#time-left").html("00:00");

      document.getElementById("rock").disabled = true;
      document.getElementById("paper").disabled = true;
      document.getElementById("scissors").disabled = true;

    // fill modal with result
      var w = document.getElementById("wins").textContent;
      var l = document.getElementById("losses").textContent;

      if (w > l) {
        $("#verdict").append("You won the game!");
      } else if (l > w) {
        $("#verdict").append("You lost the game. Better luck next time!");
      } else {
        $("#verdict").append("You and the computer tied. Everyone's a winner!");
      };

      $("#gameOverModal").css("display", "block");

      $(".close").click(function() {
        $("#verdict").html("");
        $("#gameOverModal").css("display", "none");
      });
    }
}, 1000);
}

// when user submits timer form, set the timer for that time and begin countdown
// choices only become possible once countdown starts
$("#start-timer").submit(function(e) {
  // check to be sure user input is valid
  userMinStr = document.getElementById("userMin").value;
  userSecStr = document.getElementById("userSec").value;

  if(userMinStr.length == 0 && userSecStr == 0){
    alert("Please enter a value");
  } else {
    // convert min and sec to just sec
    var numericExpression = /^[0-9]+$/;
    if (!userMinStr.match(numericExpression) || !userSecStr.match(numericExpression)){
      alert("Please enter a number for both minutes and seconds.")
    } else {
    var userMinNum = parseInt(userMinStr);
    var userSecNum = parseInt(userSecStr);

    // handle edge case of one-digit mins and/or secs by prepending a 0
    if (userMinNum < 10 && length.userMinNum != 2) {
      userMinNum = "0" + userMinNum;
    }

    if (userSecNum < 10 && length.userSecNum != 2) {
      userSecNum = "0" + userSecNum;
    }

    startTimeSec = (userMinNum * 60) + userSecNum;

    var timerArr = [startTimeSec, userMinNum, userSecNum];
    e.preventDefault();
    }
    }

  // start button becomes unclickable unless page is refreshed, other buttons become clickable
  document.getElementById("btn-start").disabled = true;
  document.getElementById("rock").disabled = false;
  document.getElementById("paper").disabled = false;
  document.getElementById("scissors").disabled = false;
  document.getElementById("btn-restart").disabled = false;

  // begin countdown display: set time equal to whatever minutes and seconds user has entered
  $("#time-left").append(userMinNum + ":" + userSecNum);
  $(".timer-area").css("display", "block");

// start counting down
interval();
});

$("#btn-restart").click(function() {
  clearInterval(interval);

  document.getElementById("rock").disabled = false;
  document.getElementById("paper").disabled = false;
  document.getElementById("scissors").disabled = false;

  $("#wins").html(0);
  $("#losses").html(0);
  $("#draws").html(0);
  var winCount = 0;
  var lossCount = 0;
  var drawCount = 0;

console.log(userMinStr, userSecStr);
  timer = "" + userMinStr + ":" + userSecStr + "";
  timer = timer.split(":");
  console.log(timer)
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
      $(".ten-sec").css("display", "block");
      function hideTenSec(){
        $(".ten-sec").css("display", "none");
      }
      setTimeout(hideTenSec, 1500);
}
});

// when user chooses r, p, or s, change btn background color and set userChoice
var userChoice;
var botChoice;
var roundWinner;

$(".btn-choose").on("click", function() {
  userChoice = this.id;
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

// after bot chooses, update scores
var winCount = $("#wins").html();
var lossCount = $("#losses").html();
var drawCount = $("#draws").html();

var updateScores = function() {

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
};

// display bot choice for a moment
$("<span />",{ style:"display:none; margin-top: 10px; font-weight: 500; font-size: 20px" })
    .html(botChoice)
    .appendTo($(".bot-d"))
    .fadeIn("fast", 
      function(){
        var el = $(this);
        if ($(this).text().length > 0) {
          $(this).text("");
        }
         setTimeout(function(){
          el.fadeOut("fast",
            function(){
              $(this).remove();
            });
        }, 1000);
    });

// add <span> under bot choice display saying who won round one second after bot choice appears saying who won this round,
// have this fade out simultaneously with bot choice
// $("<div />",{ style:"display:none; margin-top: 20px; font-weight: 600; font-size: 30px" })
//     .html(roundWinner)
//     .appendTo($(".bot-d"))
//     .fadeIn("fast", 
//       function(){
//         var el = $(this);
//         if ($(this).text().length > 0) {
//           $(this).text("");
//         }
//         setTimeout(function(){
//           el.fadeOut("fast",
//             function(){
//               $(this).remove();
//             });
//         }, 1000);
//     }); 
  updateScores();
};
});
