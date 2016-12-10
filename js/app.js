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
bomb.counter;

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
  for (var i = 1; i < bomb.base*bomb.base + 1 ; i++) {
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
  var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  for(var j = 0; j < bomb.computerSequence.length; j++){
    bomb.computerSequence.push($('li')[randomNumber]);
  }
};

bomb.lightUp = function lightUp(para){
  //the add the color
  $(para).addClass('activated');
  //delay then remove the color
  setTimeout(function(){
    $(para).removeClass('activated');
  }, 1000);
};
document.addEventListener('DOMContentLoaded', bomb.start);

// var count = 1;
//
// for (var i = 0; i < 1; i++) {
//   $('li').random().push(sequence)
// }
//
// var sequence = ['li', 'li', 'li'];
//
// for (var i = 0; i < sequence.length; i++) {
//   sequence[i].addClass('light');
//
//   setTimeout(function() {
//     sequence[i].removeClass('light');
//   }, 1000);
// }
//
// clicks = []
//
// ['li', 'li', 'li']
//
// if sequence === clicks
// + 1 to counter
//
