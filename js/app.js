console.log('linktest');

// Have a timer that counts down from a predetermined time (1min)
// When time runs out, clear the screen and make it go bang!
// When end screen is shown display the score and game over.
// IF player is incorrect then have the computer repeat the previous sequence.
// Repeat until the user can no longer remember and runs out of time.

var bomb = bomb || {};
bomb.base = 2;
bomb.width = 100;
bomb.computerSequence = [];
bomb.computerSequenceId = [];
bomb.playerSequence = [];
bomb.playerSequenceId = [];
bomb.sequenceComparison;
bomb.counter = 1;
bomb.beeps = 'audio';
// Have a score box with a intial value of 0
bomb.score = 0;
bomb.scoreIncrements = 10;
bomb.timerSeconds = 60;

bomb.start = function start(){
  bomb.makeKeyPad();
  bomb.computerSequenceMaker();
  bomb.inputSequence();
  bomb.timer();
};


bomb.timer = function timer(){
  setInterval(countdown, 1000);
  function countdown(){
    bomb.timerSeconds=bomb.timerSeconds-1;
    $('#Timer').html(bomb.timerSeconds + 'seconds');
    if (bomb.timerSeconds <= 0){
      clearInterval(bomb.timerSeconds);
      console.log('boom!');
      return;
    }
  }
};



// Have the computer make a 4*4 square of 4 buttons( li elements) in a div

bomb.makeKeyPad = function makeKeyPad(){
  var body = $('body');
  var keyDiv = '<div id="keyDiv"></div>';
  var keyGrid = '<ul></ul>';
  var keyWidth = bomb.width / bomb.base;
  body.append(keyDiv);
  $('#keyDiv').append(keyGrid);
  for (var i = 0; i < bomb.base*bomb.base; i++) {
    var newKey = '<li id ="key'+ i +'"></li>';
    $('ul').append(newKey);
  }
  $('li').css('width',keyWidth);
  $('li').css('height',keyWidth);
};

// Have the computer make a random sequence of buttons light up for the player to click. Make sure they can't click it while this happens.

bomb.computerSequenceMaker = function computerSequenceMaker(){
  var min = 0;
  var max = Math.floor(bomb.base*bomb.base);
  var randomNumber = Math.floor(Math.random() * (max - min)) + min;
  for(var j = 0; j < 1; j++){
    bomb.computerSequence.push($('li')[randomNumber]); randomNumber;
    bomb.computerSequenceId.push(randomNumber);
  }
  var sequence = bomb.computerSequence;
  bomb.lightOn(sequence);

};

// Have the computer make a random sequence of buttons light up for the player to click. Make sure they can't click it while this happens.
bomb.lightOn = function() {
  var i = 0;
  var interval = setInterval(function() {
    $(bomb.computerSequence[i]).addClass('activated');

    setTimeout(function() {
      $(bomb.computerSequence[i]).removeClass('activated');
      i++;
    }, 600);

    if (i >= bomb.computerSequence.length) {
      clearInterval(interval);
    }
  }, 800);
};

//When play clicks a button a specifc sound (for each button) will play
bomb.inputSequence = function inputSequence(){
  for(let i = 0; i < (bomb.base*bomb.base); i++){
    $(('#key'+[i])).on('click', function(){
      bomb.playerSequence.push($('li')[i]);
      bomb.playerSequenceId.push(i);
// When player clicks a button a specifc sound (for each button) will play.
      $(bomb.beeps).trigger('play');
    });
  }
};

// Only accept the answer when the sequence length entered = the sequence length shown

bomb.sequenceComparison = function sequenceComparison(){
  var Computer = $.makeArray(bomb.computerSequence);
  var Player = $.makeArray(bomb.playerSequence);
  var isSame = Player.length === Computer.length && Player.every(function(element, index) {
    return element === Computer[index];
  });
  var clear = function clear(){
    bomb.playerSequenceId = [];
    bomb.playerSequence =[];
  };

  if(isSame === true){
    console.log('works');
  // call function to make it add another number to the sequence through bomb counter
    clear();
    bomb.counter++;
// IF player is correct then add +10 seconds to the time and 10 points to the score.
    bomb.score = bomb.score + 10;
    bomb.setScore();
    bomb.timerSeconds = bomb.timerSeconds + 10;

  } else if( Computer.length === Player.length) {
    console.log('incorrect');
    clear();
    bomb.lightOn();
  // IF player is wrong then add -10 seconds to time and -10 points from the score.
    bomb.score = bomb.score - 10;
    bomb.setScore();
    bomb.timerMiliseconds = bomb.timerMiliseconds - 10;
  } else{
    console.log('not working bud');
  }

};

bomb.setScore = function setScore(){
  $('#scoreBox').html('Score: ' + bomb.score + 'pts');
};
document.addEventListener('DOMContentLoaded', bomb.start);
