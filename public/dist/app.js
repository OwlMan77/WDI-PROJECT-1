'use strict';

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
bomb.beeps = 'beep';
// Have a score box with a intial value of 0
bomb.score = 0;
bomb.scoreIncrements = 10;
bomb.timerSeconds = 60;
bomb.timeIncrements = 10;
bomb.keyDownInputs = [];
bomb.start = function start() {
  bomb.makeKeyPad();
  bomb.audio();
};

// Have the computer make game screen

bomb.makeKeyPad = function makeKeyPad() {
  var body = $('body');
  var keyDivContainer = '<div id ="keyDivContainer"></div>';
  var keyDiv = '<div id="keyDiv"></div>';
  var keyGrid = '<ul></ul>';
  var startButton = '<div id="startButton">"Defuse"</div>';

  var keyWidth = bomb.width / bomb.base;
  var audioPlayButton = '<audio id ="bgMusic" src="media/audio/bgmusic.mp3"></audio> <div class="audioButtons" id="audioPlayButton"></div>';
  var audioPauseButton = '<div class="audioButtons" id="audioPauseButton"></div>';
  var audioMuteButton = '<div class="audioButtons" id="audioMuteButton"></div>';
  body.append(keyDivContainer);
  $('#keyDivContainer').append(keyDiv);
  $('#keyDiv').append(keyGrid);
  $('#keyDiv').append('<div id ="Timer">' + bomb.timerSeconds + '</div>');
  $('#keyDiv').append('<div id ="scoreBox">Score: 0pts</div>');
  $('#keyDiv').append(startButton);
  for (var i = 0; i < bomb.base * bomb.base; i++) {
    var newKey = '<li id ="key' + i + '"></li>';
    $('ul').append(newKey);
    $('#key' + i).html('<p>' + bomb.symbols[i] + '</p>');
  }
  $('#keyDivContainer').append(audioPlayButton);
  $('#keyDivContainer').append(audioPauseButton);
  $('#keyDivContainer').append(audioMuteButton);
  $('li').css('width', keyWidth);
  $('li').css('height', keyWidth);
  $('#startButton').on('click', bomb.game);
};

//sets up the game
bomb.game = function game() {
  bomb.computerSequenceMaker();
  bomb.timer();
  $('#startButton').hide();
  $('li').show();
};

// Have a timer that counts down from a predetermined time (1min)
bomb.timer = function timer() {
  $('#Timer').html(bomb.timerSeconds);
  var count = setInterval(countdown, 1000);
  function countdown() {
    bomb.timerSeconds = bomb.timerSeconds - 1;
    if (bomb.timerSeconds <= 10) {
      $('#Timer').css('color', 'red');
    }
    if (bomb.timerSeconds <= 0) {
      clearInterval(count);
      // When end screen is shown display the score and game over.
      bomb.gameOver();
    }
    $('#Timer').html(bomb.timerSeconds);
  }
};

// Have the computer make a random sequence of buttons light up for the player to click. Make sure they can't click it while this happens.

bomb.computerSequenceMaker = function computerSequenceMaker() {
  $('li').off();
  var min = 0;
  var max = Math.floor(bomb.base * bomb.base);
  var randomNumber = Math.floor(Math.random() * (max - min)) + min;
  for (var j = 0; j < bomb.sequenceIterations; j++) {
    this.computerSequence.push($('li')[randomNumber]);randomNumber;
    this.computerSequenceId.push(randomNumber);
  }
  var sequence = this.computerSequence;
  this.lightOn(sequence);
  this.inputSequence();
};

// Have the computer make a random sequence of buttons light up for the player to click. Make sure they can't click it while this happens.
bomb.lightOn = function () {
  var i = 0;
  var interval = setInterval(function () {
    $(bomb.computerSequence[i]).addClass('activated');

    setTimeout(function () {
      $(bomb.computerSequence[i]).removeClass('activated');
      i++;
    }, 600);

    if (i >= bomb.computerSequence.length) {
      clearInterval(interval);
    }
  }, 800);
};

//When play clicks a button a specifc sound (for each button) will play
bomb.inputSequence = function inputSequence() {
  var _loop = function _loop(i) {
    $('#key' + [i]).on('click', function () {
      bomb.playerSequence.push($('li')[i]);
      bomb.playerSequenceId.push(i);
      // When player clicks a button a sound will play.
      $('#beep' + i).trigger('play');
      if (bomb.playerSequence.length === bomb.computerSequence.length) {
        bomb.sequenceComparison();
      }
    });
  };

  for (var i = 0; i < bomb.base * bomb.base; i++) {
    _loop(i);
  }
};

// Only accept the answer when the sequence length entered = the sequence length shown

bomb.sequenceComparison = function sequenceComparison() {
  var Computer = $.makeArray(bomb.computerSequence);
  var Player = $.makeArray(bomb.playerSequence);
  var isSame = Player.length === Computer.length && Player.every(function (element, index) {
    return element === Computer[index];
  });

  if (isSame === true) {
    // call function to make it add another number to the sequence through bomb counter
    // IF player is correct then add +10 seconds to the time and 10 points to the score.
    bomb.score = bomb.score + bomb.scoreIncrements;
    bomb.setScore();
    bomb.timerSeconds = bomb.timerSeconds + bomb.timeIncrements;
    bomb.clear();
    bomb.computerSequenceMaker();
  } else if (Computer.length === Player.length) {
    // IF player is incorrect then have the computer repeat the previous sequence.
    bomb.lightOn();
    // IF player is wrong then add -10 seconds to time and -10 points from the score.
    bomb.score = bomb.score - bomb.scoreIncrements;
    bomb.setScore();
    bomb.timerSeconds = bomb.timerSeconds - bomb.timeIncrements;
    bomb.clear();
  } else {
    bomb.lightOn();
    bomb.clear();
  }
};
//changes the screen to the Game over screen
bomb.gameOver = function gameOver() {
  $('#Timer').hide();
  $('h1').hide();
  $('#scoreBox').html('Your score was: ' + bomb.score + 'pts').addClass('.gameOverScore');
  $('ul').hide();
  $('li').hide();
  $('body').toggleClass('end');
  $('#keyDivContainer').toggleClass('end');
  $('#keyDiv').toggleClass('end');
  $('#scoreBox').toggleClass('end');
  $('.audioButtons').hide();
  //when end game is reach an explosion is played;
  bomb.stopAudio();
  $('#boom').trigger('play');
  $('#keyDiv').append('<div id = "resetButton">Retry</div>');
  $('#resetButton').on('click', bomb.reset);
};

//Displays the score
bomb.setScore = function setScore() {
  $('#scoreBox').html('Score: ' + bomb.score + 'pts');
};

//resets all revelvant values and goes to the start screen
bomb.reset = function reset() {
  bomb.setScore();
  $('#Timer').show();
  $('h1').show();
  $('ul').show();
  $('li').show();
  $('#startButton').show();
  $('#resetButton').remove();
  bomb.clear();
  bomb.computerSequence = [];
  bomb.computerSequenceId = [];
  bomb.timerSeconds = 60;
  bomb.score = 0;
  //added this to remove a bug that would occur on restart
  $('li').removeClass('activated');
  $('#Timer').html(bomb.timerSeconds);
  $('#Timer').css('color', '#FAFAFA');
  $('#scoreBox').html('Score: ' + bomb.score + 'pts');
  $('#keyDivContainer').toggleClass('end');
  $('#Timer').css('color', '#28E558');
  $('body').toggleClass('end');
  $('#keyDiv').toggleClass('end');
  $('#scoreBox').toggleClass('end');
  $('.audioButtons').show();
};

bomb.clear = function clear() {
  bomb.playerSequenceId = [];
  bomb.playerSequence = [];
};

//sets up the background music audio

bomb.audio = function audio() {
  bomb.play();
  bomb.pause();
  bomb.mute();
};

//plays background music
bomb.play = function play() {
  $('#audioPlayButton').on('click', function () {
    $('#bgMusic').trigger('play');
  });
};

//pauses background music
bomb.pause = function pause() {
  $('#audioPauseButton').on('click', function () {
    $('#bgMusic').trigger('pause');
  });
};

//mutes the audio for all sfx and music
bomb.mute = function mute() {
  $('#audioMuteButton').on('click', function () {
    $('audio').prop('muted', !$('audio').prop('muted'));
    $('#audioMuteButton').toggleClass('muted');
  });
};

bomb.stopAudio = function stopAudio() {
  $('#bgMusic').trigger('pause');
  $('#bgMusic').prop('currentTime', 0);
};

document.addEventListener('DOMContentLoaded', bomb.start);