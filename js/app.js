console.log('linktest');

// Have a timer that counts down from a predetermined time (1min)
// Have a score box with a intial value of 0
// When time runs out, clear the screen and make it go bang!
// When end screen is shown display the score and game over.
// Have the computer make a 4*4 square of 4 buttons( li elements) in a div
// Have the computer make a random sequence of buttons light up for the player to click. Make sure they can't click it while this happens.
// When play clicks a button a specifc sound (for each button) will play.
// Only accept the answer when the sequence length entered = the sequence length shown
// IF player is correct then add +10 seconds to the time and 10 points to the score.
// IF player is wrong then add -10 seconds to time and -10 points from the score.
// IF player is correct then have the computer repeat do the same sequence but with a new random button press.
// IF player is incorrect then have the computer repeat the previous sequence.
// Repeat until the user can no longer remember and runs out of time.



var bomb = bomb || {};
bomb.start;
bomb.makeKeyPad;
bomb.base = 2;
bomb.width = 100;
bomb.computerSequenceMaker;
bomb.computerSequence = [];
bomb.inputSequence;
bomb.playerSequence = [];
bomb.sequenceComparison;
bomb.timer;
bomb.scoreBox;
bomb.counter = 1;

bomb.start = function start(){
  bomb.makeKeyPad();
  bomb.computerSequenceMaker();
  bomb.inputSequence();
};


// Have the computer make a 4*4 square of 4 buttons( li elements) in a div

bomb.makeKeyPad = function makeKeyPad(){
  console.log('I\'m working');
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
  for(var j = 0; j < bomb.counter; j++){
    bomb.computerSequence.push($('li')[randomNumber]);
    bomb.computerSequence.value = randomNumber;
    console.log(randomNumber);
  }
  var sequence = bomb.computerSequence;
  bomb.lightUp(sequence);

};

bomb.lightUp = function lightUp(parm){
  for(var i = 0; i < bomb.counter; i++ ){
    $((parm)[i]).addClass('activated');
    $('audio').trigger('play');
    setTimeout(function() {
      $((parm)[i]).removeClass('activated').delay(1000);
    }, 1000);
  }
};

//When play clicks a button a specifc sound (for each button) will play
bomb.inputSequence = function inputSequence(){
  for(let i = 0; i < (bomb.base*bomb.base); i++){
    $(('#key'+[i])).on('click', function(){
      bomb.playerSequence.push($('li')[i]);
      $('audio').trigger('play');
    });
  }
};

// Only accept the answer when the sequence length entered = the sequence length shown

bomb.sequenceComparison = function sequenceComparison(){
  if(bomb.computerSequence ===  bomb.playerSequence){
    console.log('works');
    bomb.counter =+ 1;
  } else {
    console.log('not working');
  }
};


document.addEventListener('DOMContentLoaded', bomb.start);
