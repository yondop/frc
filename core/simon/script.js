var sequence = [],
    player   = [],
    isStrict = false,
    speed    = 1000,
    isRunning = false;

var audio  = [
  new Audio('http://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
  new Audio('http://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
  new Audio('http://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
  new Audio('http://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
];

var wrong = new Audio('https://s3-us-west-2.amazonaws.com/guylemon/Buzzer.mp3');

function reset() {
  sequence = [];
  player = [];
  $('.game-over').addClass('hide');
  updateInfo('--');
}

function newGame() {
  isRunning = true;
  reset();
  newRound();
}

function newRound() {
  sequence.push(Math.floor(Math.random() * 4) + 1);
  player = [];
  animate();
  updateRound();
}

function updateRound() {
  $('span[data-info="round-count"]').text(sequence.length);
}

function updateInfo(s) {
  $('span[data-info="info"]').text(s);
}

function playerMove() {
  if (!isRunning) return;

  var position = $(this).data('tile');
  player.push(position);

  var playerCount = player.length - 1;
  if (player[playerCount] !== sequence[playerCount]) {
    updateInfo('!!');
    wrong.play();
    if (isStrict) {
      gameOver(false);
    } else {
      player = [];
      animate();
    }
  } else {
    if (sequence.length === player.length) {
      updateInfo('OK');
      if (sequence.length === 20)
        gameOver(true);
      else
        newRound();
    }
  }
}

function gameOver(isWin) {
  isRunning = false;
  if (!isWin) {
    $('.lose').removeClass('hide');
  } else {
    $('.win').removeClass('hide');
  }
}

function animate() {
  var i = 0;
  var interval = setInterval(function() {
    lightUp(sequence[i]);

    i++;
    if (i >= sequence.length) {
      clearInterval(interval);
    }
  }, speed);
}

function lightUp(num) {
  audio[num - 1].play();
  var tile = $('[data-tile=' + num + ']').addClass('lit');
  console.log(tile);
  window.setTimeout(function() {
    tile.removeClass('lit');
  }, speed / 2);
}

function toggleStrict() {
  if (isStrict) {
    $('button[data-info="strict"]').removeClass('on');
    isStrict = false;
  } else {
    $('button[data-info="strict"]').addClass('on');
    isStrict = true;
  }
}

$('button[data-info="start"]').click(newGame);
$('button[data-info="strict"]').click(toggleStrict);
$('.tile').click(playerMove);
