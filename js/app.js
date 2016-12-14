// IF player is incorrect then have the computer repeat the previous sequence.
// Repeat until the user can no longer remember and runs out of time.

var bomb = bomb || {};
bomb.base = 2;
bomb.width = 200;
bomb.symbols = ['➀', '➁', '➂', '➃'];
bomb.computerSequence = [];
bomb.computerSequenceId = [];
bomb.playerSequence = [];
bomb.playerSequenceId = [];
bomb.sequenceComparison;
bomb.sequenceIterations = 1;
bomb.beeps = 'audio';
// Have a score box with a intial value of 0
bomb.score = 0;
bomb.scoreIncrements = 10;
bomb.timerSeconds = 60;
bomb.timeIncrements = 15;

bomb.start = function start(){
  bomb.makeKeyPad();
};
bomb.game = function game(){
  bomb.computerSequenceMaker();
  bomb.timer();
  $('#startButton').hide();
  $('li').show();
};

// Have a timer that counts down from a predetermined time (1min)
bomb.timer = function timer(){
  $('#Timer').html(bomb.timerSeconds);
  var count = setInterval(countdown, 1000);
  function countdown(){
    bomb.timerSeconds = bomb.timerSeconds -1;
    if(bomb.timerSeconds <= 4){
      $('#Timer').css('color', 'red');
    }
    if (bomb.timerSeconds <= 0){
      clearInterval(count);
      // When end screen is shown display the score and game over.
      bomb.gameOver();
    }
    $('#Timer').html(bomb.timerSeconds);
  }
};



// Have the computer make a 4*4 square of 4 buttons( li elements) in a div

bomb.makeKeyPad = function makeKeyPad(){
  var body        = $('body');
  var keyDiv      = '<div id="keyDiv"></div>';
  var keyGrid     = '<ul></ul>';
  var startButton = '<div id="startButton">"Defuse"</div>';

  var keyWidth    = bomb.width / bomb.base;
  body.append(keyDiv);
  $('#keyDiv').append(keyGrid);
  $('#keyDiv').append('<div id ="Timer">'+bomb.timerSeconds+'</div>');
  $('#keyDiv').append('<div id ="scoreBox">Score: 0pts</div>');
  $('#keyDiv').append(startButton);
  for (var i = 0; i < bomb.base*bomb.base; i++) {
    var newKey    = '<li id ="key'+ i +'"></li>';
    $('ul').append(newKey);
    $('#key' + i).html('<p>'+ bomb.symbols[i] +'</p>');
  }
  $('li').css('width',keyWidth);
  $('li').css('height',keyWidth);
  $('#startButton').on('click',bomb.game);
};

// Have the computer make a random sequence of buttons light up for the player to click. Make sure they can't click it while this happens.

bomb.computerSequenceMaker = function computerSequenceMaker(){
  $('li').off();
  var min = 0;
  var max = Math.floor(bomb.base*bomb.base);
  var randomNumber         = Math.floor(Math.random() * (max - min)) + min;
  for(var j = 0; j < bomb.sequenceIterations; j++){
    this.computerSequence.push($('li')[randomNumber]); randomNumber;
    this.computerSequenceId.push(randomNumber);
  }
  var sequence             = this.computerSequence;
  this.lightOn(sequence);
  this.inputSequence();
};

// Have the computer make a random sequence of buttons light up for the player to click. Make sure they can't click it while this happens.
bomb.lightOn   = function() {
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
      if( bomb.playerSequence.length === bomb.computerSequence.length){
        bomb.sequenceComparison();
      }
// When player clicks a button a sound will play.
      $('#beep'+ i).trigger('play');
    });
    if(bomb.playerSequence.length === bomb.computerSequence.length){
      bomb.sequenceComparison();
    }
  }
};

// Only accept the answer when the sequence length entered = the sequence length shown

bomb.sequenceComparison = function sequenceComparison(){
  var Computer = $.makeArray(bomb.computerSequence);
  var Player   = $.makeArray(bomb.playerSequence);
  var isSame   = Player.length === Computer.length && Player.every(function(element, index) {
    return element === Computer[index];
  });

  if(isSame === true){
    console.log('works');
  // call function to make it add another number to the sequence through bomb counter
// IF player is correct then add +10 seconds to the time and 10 points to the score.
    bomb.score        = bomb.score + bomb.scoreIncrements;
    bomb.setScore();
    bomb.timerSeconds = bomb.timerSeconds + bomb.timeIncrements;
    bomb.clear();
    bomb.computerSequenceMaker();
  } else if( Computer.length === Player.length) {
    console.log('incorrect');
    bomb.lightOn();
  // IF player is wrong then add -10 seconds to time and -10 points from the score.
    bomb.score        = bomb.score - bomb.scoreIncrements;
    bomb.setScore();
    bomb.timerSeconds = bomb.timerSeconds - (bomb.timeIncrements * 3);
    bomb.clear();
  } else{
    console.log('not working bud');
  }

};
//changes the screen to the Game over screen
bomb.gameOver = function gameOver(){
  $('#Timer').hide();
  $('h1').hide();
  $('#scoreBox').html('Your score was: '+ bomb.score + 'pts') .addClass('.gameOverScore');
  $('ul').hide();
  $('li').hide();
  $('body').toggleClass('end');
  $('#keyDiv').toggleClass('end');
  $('#scoreBox').toggleClass('end');
  //when end game is reach an explosion is played;
  $('#boom').trigger('play');
  $('#keyDiv').append('<div id = "resetButton">Retry</div>');
  $('#resetButton').on('click', bomb.reset);
};

//Displays the score
bomb.setScore = function setScore(){
  $('#scoreBox').html('Score: ' + bomb.score + 'pts');
};

//resets all revelvant values and goes to the start screen
bomb.reset = function reset(){
  bomb.setScore();
  $('#Timer').show();
  $('h1').show();
  $('ul').show();
  $('li').show();
  $('#startButton').show();
  $('#resetButton').remove();
  bomb.clear();
  bomb.computerSequence   = [];
  bomb.computerSequenceId = [];
  bomb.timerSeconds = 60;
  bomb.score = 0;
  //added this to remove a bug that would occur on restart
  $('li').removeClass('activated');
  $('#Timer').html(bomb.timerSeconds);
  $('#Timer').css('color', '#FAFAFA');
  $('#scoreBox').html('Score: ' + bomb.score + 'pts');
  $('body').toggleClass('end');
  $('#Timer').css('color','#28E558');
  $('#keyDiv').toggleClass('end');
  $('#scoreBox').toggleClass('end');
};
bomb.clear = function clear(){
  bomb.playerSequenceId  = [];
  bomb.playerSequence    = [];
};
document.addEventListener('DOMContentLoaded', bomb.start);
