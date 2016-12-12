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
bomb.base = 2;
bomb.width = 100;
bomb.computerSequence = [];
bomb.playerSequence = [];
bomb.sequenceComparison;
bomb.counter = 1;
bomb.beeps = 'audio';

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
  bomb.lightOn(sequence);

};

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

//turn light on
// bomb.lightOn = function lightOn(parm){
//   for(var i = 0; i < bomb.counter; i++ ){
//     $((parm)[i]).addClass('activated');
//     $(bomb.beeps[0]).trigger('play');
//     setTimeout(bomb.lightOff(parm, i), 1000);
//   }
// };
// //turn light off
// bomb.lightOff = function lightOff(parm, index){
//   $((parm)[index]).removeClass('activated');
// };



//When play clicks a button a specifc sound (for each button) will play
bomb.inputSequence = function inputSequence(){
  for(let i = 0; i < (bomb.base*bomb.base); i++){
    $(('#key'+[i])).on('click', function(){
      bomb.playerSequence.push($('li')[i]);
      $(bomb.beeps).trigger('play');
    });
  }
  if(bomb.playerSequence.length === bomb.computerSequence.length){
    bomb.sequenceComparison();
  }
};

// Only accept the answer when the sequence length entered = the sequence length shown

bomb.sequenceComparison = function sequenceComparison(){
  var sequence = [];
  var user = [];
function 
  var computerSequence = $.makeArray(bomb.computerSequence);
  var playerSequence = $.makeArray(bomb.playerSequence);
  if(computerSequence === playerSequence){
    console.log('works');
  // call function to make it add another number to the sequence through bomb counter\

  } else {
    console.log('not working');
  //   make it light up the same sequence
  }

};


document.addEventListener('DOMContentLoaded', bomb.start);
