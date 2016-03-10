var result = '';
var calculated = false;
var error = false;


$(document).ready(function() {
  $('.btn').click(function(e) {
    var val = $(this).attr('value');
    if (error) {
      error = false;
      result = '';
    }
    try {
      switch (val) {
        case '=':
          result = eval(result);
          calculated = true;
          break;
        case 'c':
          result = '';
          break;
        case 'b':
          result = result.substr(0, result.length - 1);
          break;
        default:
          if (calculated && val.match(/\d|\./g)) {
            result = '';
          }
          calculated = false;
          result += val;
      }
    } catch(e) {
      result = 'Error';
      error = true;
      console.log(e);
    }
    $('.result').val(result);
  });
});
