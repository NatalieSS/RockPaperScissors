$(document).ready(function() {

//     //button hover visual cue
 
// 	$("col a").hover(function(){
// 		event.preventDefault();
// 			$(this).css("color", "green");
// 		 	$(this).addClass('active');
// 		},function(){
// 				$(this).css("color", "black");
// 		    $(this).removeClass('active');
// 			});


// when user submits time form, set the timer for that time and begin 
// countdown, which will stop at zero

// warn user with popup when 10 secs left

// choices only become possible once countdown starts



// when user chooses r, p, or s, change btn background color and set userChoice
var userChoice;
var botChoice;

var userChooses = function() {

  $('#rock').click(function() {
    userChoice == "rock";
  });
  $('#paper').click(function() {
    userChoice == "paper";
  });
  $('#scissors').click(function() {
    userChoice == "scissors";
  });
  console.log(userChoice);
  botChooses();
};

// also trigger computer random choice and display that choice
	// on userChoice definition...
var botChooses = function() {
  var x = Math.random();
  if (x < .33) {
  	botChoice = "rock";
  } else if (.33 <= x < .66) {
  	botChoice = "paper";
  } else {
  	botChoice = "scissors";
  }
  updateScores();
}

// possibly add little alert here saying who won this round

// after bot chooses, update scores
var updateScores = function() {
  if (userChoice == botChoice) {
    alert ("Tie!");
  } else if (userChoice == "rock") {
    if (botChoice == "scissors") {
      alert ("You win!");
    } else {
      alert ("You lose.");
    };
  } else if (userChoice == "paper") {
    if (botChoice == "rock") {
      alert ("You win!");
    } else {
      alert ("You lose.");
    };
  } else if (userChoice == "scissors") {
    if (botChoice == "paper") {
      alert ("You win!");
    } else {
      alert ("You lose");
    };
  };

}

// when timer reaches 0, stop countdown, disable play, and display who won

// clicking restart button restarts timer and zeroes out the scores


$('.btn-choose').on('click', userChooses());
});