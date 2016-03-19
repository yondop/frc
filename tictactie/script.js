var side = 'X';

var score = {
  player: 0,
  computer: 0
}
var field;

function restart(s) {
  side = s;
  field = [
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ]
  ];

  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      setCell([i, j], 0);
    }
  }
}


function play(p) {
  console.log(p + ' ' + side);
  if (!setCell(p, side)) return;

  var result = checkWin(side);
  if (result > -1) {
    return gameOver(result, 0);
  }

  compPlay();
  var result = checkWin(getOtherSide());
  if (result > -1) {
    return gameOver(0, result);
  }
}

function compPlay() {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (field[i][j] == 0) {
        setCell([i, j], getOtherSide());
        return;
      }
    }
  }
}

function gameOver(ps, cs) {
  score.player += ps;
  score.computer += cs;
  $('#playerScore').text(score.player);
  $('#compScore').text(score.computer);
  restart('X');
}

function getOtherSide() {
  if (side == 'X') return 'O';
  return 'X';
}

function checkWin(s) {
  for (var i = 0; i < 3; i++) {
    if (field[i][0] == s && field[i][1] == s && field[i][2] == s) {
      return 1;
    }

    if (field[0][i] == s && field[1][i] == s && field[2][i] == s) {
      return 1;
    }
  }

  if (field[0][0] == s && field[1][1] == s && field[2][2] == s) {
    return 1;
  }

  if (field[2][0] == s && field[1][1] == s && field[0][2] == s) {
    return 1;
  }

  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (field[i][j] == 0) {
        return -1;
      }
    }
  }
  return 0;
}

function setCell(p, s) {
  if (field[p[0]][p[1]] != 0 && s != 0) return false;
  field[p[0]][p[1]] = s;
  $('div[num=' + p[0] + '' + p[1] + '] span').text(s == 0? '' : s);
  return true;
}

$('.square').click(function(e) {
  var p = $(this).attr('num').split('');
  play(p);
});

$('input[name=sideRadio]').on('change', function() {
  restart( $('input[name=sideRadio]:checked').val());
});

$(document).ready(function() {
  restart('X');
});
