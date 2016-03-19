var buttons = [
  null, null,
  null, null
]; //TODO buttons

var series = [];

function Button(element, bg) {
  this.element = $(element);
  this.bg = bg;
  this.element.css('background-color', this.bg);
}

Button.prototype.activate = function(count) {
  var self = this;
  self.element.animate({ opacity:  0.5 }, 1000, function() {
    self.element.animate({ opacity: 0.5 }, 1000, function() {
      if (count < series.length) {
        series[count + 1].activate(count + 1);
      }
    });
  });
}
