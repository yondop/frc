var streamers =  ['freecodecamp', 'storbeck', 'terakilobyte', 'habathcx',
                'RobotCaleb','thomasballinger','noobs2ninjas','beohoff', 'comster404'];

function streamOnTemplate(name, s) {
  return  '<div class="well online">' +
            '<div class="avatar">' +
              '<img src="' + s.stream.channel.logo + '" alt="avatar" />' +
            '</div>' +
            '<div class="description">' +
              '<a href="' + s.stream.channel.url + '" target="_blank">' +
                '<h2>' +
                    s.stream.channel.display_name  +
                '</h2>' +
              '</a>' +
              '<h3>' + s.stream.channel.game + '</h3>' +
            '</div>' +
          '</div>';
}

function streamOffTemplate(name, s) {
  return  '<div class="well offline">' +
            '<div class="avatar">' +
              '<img src="' + (s.logo ? s.logo : 'http://www.brandsoftheworld.com/sites/default/files/styles/logo-thumbnail/public/022015/twitch.png?') + '" alt="avatar" />' +
            '</div>' +
            '<div class="description">' +
              '<a href="' + s.url + '" target="_blank">' +
                '<h2>' +
                    s.display_name  +
                '</h2>' +
              '</a>' +
              '<h3>Offline</h3>' +
            '</div>' +
          '</div>';
}

function streamErrorTemplate(name) {
  return  '<div class="well offline">' +
            '<div class="avatar">' +
              '<img src="http://www.brandsoftheworld.com/sites/default/files/styles/logo-thumbnail/public/022015/twitch.png?" alt="avatar" />' +
            '</div>' +
            '<div class="description">' +
                '<h2>' +
                    name  +
                '</h2>' +
              '<h3>Not available</h3>' +
            '</div>' +
          '</div>';
}

function init() {
  $('.wells').html('');

  streamers.forEach(function(el) {
    var name = el;
    console.log(name);
    $.getJSON('https://api.twitch.tv/kraken/streams/'+ el + '?callback=?', function(data) {
      if (data.stream) {
        $('.wells').prepend(streamOnTemplate(name, data));
      } else {
        if (data.error) {
          $('.wells').append(streamErrorTemplate(name));
        } else {
          $.getJSON('https://api.twitch.tv/kraken/channels/'+ el + '?callback=?', function(data) {
            console.log(data);
            $('.wells').append(streamOffTemplate(name, data));
          });
        }
      }
    });
  });
}


$(document).ready(function() {
  $('input[name=sort]:radio').change(function() {
    if ($('#sort-all').is(':checked')) {
      $('.offline').show();
      $('.online').show();
    } else if ($('#sort-on').is(':checked')) {
      $('.online').show();
      $('.offline').hide();
    } else if ($('#sort-off').is(':checked')) {
      $('.offline').show();
      $('.online').hide();
    }
  });

  init();
});
