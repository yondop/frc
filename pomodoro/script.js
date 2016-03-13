/* time in minutes */
var breakLength = 5;
var sessionLength = 25;

/* time in seconds */
var currentTime = 25 * 60;
var isRun = false;
var timer;
var mod = 'Session';

function updateBreak(value) {
  if (value > 0 && !isRun) {
    breakLength = value;
    $('#break-length').text(breakLength);
  }
}

function updateSession(value) {
  if (value > 0 && !isRun) {
    sessionLength = value;
    $('#session-length').text(sessionLength);
    setTime(sessionLength * 60);
  }
}

function setTime(secs) {
  var minutes = Math.floor((secs / 60));
  var seconds = secs % 60;
  currentTime = secs;
  $('.clock-time').text(minutes + ':' + (seconds < 10? '0' : '') + seconds);
}

function toggleTimer() {
  if (mod == 'Session') {
    mod = 'Break';
    setTime(breakLength * 60);
  } else {
    mod = 'Session';
    setTime(sessionLength * 60);
  }

  $('.clock-header').text(mod);
}

function updateTime() {
  if (!isRun) return;
  setTime(currentTime - 1);
  if (currentTime <= 0) {
    toggleTimer();
  }

}

$('#toggle').click(function(e) {
  if (!isRun) {
    timer = setInterval(updateTime, 1000);
    $(this).html('<i class="fa fa-pause"></i>');
  } else {
    clearInterval(timer);
    $(this).html('<i class="fa fa-play"></i>');
  }

  isRun = !isRun;
});

$('#reset').click(function(e) {
  clearInterval(timer);
  $('#toggle').html('<i class="fa fa-play"></i>');
  mod = 'Session';
  $('.clock-header').text(mod);
  isRun = !isRun;
  updateBreak(5);
  updateSession(25);
});

$('#dec-break').click(function(e) { updateBreak(breakLength - 1); });
$('#inc-break').click(function(e) { updateBreak(breakLength + 1); });
$('#dec-session').click(function(e) { updateSession(sessionLength -1); });
$('#inc-session').click(function(e) { updateSession(sessionLength + 1); });
