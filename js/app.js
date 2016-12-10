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
bomb.computerSequence = [];
bomb.playerSequence = [];
bomb.timer;
bomb.scoreBox;
bomb.computerSequenceMaker;

bomb.start = function start(){
  bomb.makeKeyPad();
  bomb.computerSequenceMaker();
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
  for (var i = 0; i < bomb.base*bomb.base ; i++) {
    var newKey = '<li id ="'+ i +'"></li>';
    $('ul').append(newKey);
  }
  $('li').css('width',keyWidth);
  $('li').css('height',keyWidth);
};

// Have the computer make a random sequence of buttons light up for the player to click. Make sure they can't click it while this happens.

bomb.computerSequenceMaker = function computerSequenceMaker(){
  var min = 0;
  var max = Math.floor(bomb.base*bomb.base);
  var step = Math.floor(Math.random() * (max - min)) + min;
  bomb.computerSequence.push(step);
  for(var j = 0; j < bomb.computerSequence.length; j++){
  //make buttons light up in order
    var lightSubject = bomb.computerSequence[j];

    setTimeout(function(){
      bomb.lightUp(lightSubject);
    }, 500);
  }
};

bomb.lightUp = function lightUp(para){
  $('#'+ para).css('background-color', 'blue');
  //delay then remove the color
  setTimeout(function(){
    $('#'+ para).css('background-color', 'red');
  }, 1000);
};
document.addEventListener('DOMContentLoaded', bomb.start);
