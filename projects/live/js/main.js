$(function () {
    $('.equalizer').rhEqualizer();
    $('.equalizer').rhEqualizer('setContainerPadding', ($(window).height() / 2 - 70) + 'px 0 0 0');

    $('.btn-change-language').on('click', function () {
        Lang.changeLanguage();
    });

    $.SHOUTcast({
        host: '93.188.164.219',
        port: 8000,
        interval: 2000,
        stats: function () {
            var songTitle = this.get('songtitle'),
                artist = songTitle.split(' - ')[0].trim().replace(/\d{1,3}\sbmp/, ''),
                title = songTitle.split(' - ')[1].trim().replace(/\d{1,3}\sbpm/, '');
            $('.shoutcast-now-playing.current-artist').text(artist);
            $('.shoutcast-now-playing.current-track').text(title);
        }
    }).startStats();

    $.SHOUTcast({
        host: '93.188.164.219',
        port: 8000,
        playedInterval: 20000,
        played: function (tracks) {
            $('#played').html('');
            $.each(tracks, function (k, track) {
                if (k > 0 && k < 6) {
                    $('#played').append('<div class="cctrack"><div class="ccinfos"><div class="cctitle">' + track.title.replace(/\d{1,3}\sbpm/, '') + '</div></div></div>');
                }
            });
        }
    }).startPlayed();

    $(window).resize(function () {
        $('.equalizer').rhEqualizer('setContainerPadding', ($(window).height() / 2 - 70) + 'px 0 0 0');
    });

    var audio = document.getElementById('player');

    audio.addEventListener('play', function () {
        $('.equalizer').rhEqualizer('toggleActive', 'start');
    });

    audio.addEventListener('pause', function () {
        $('.equalizer').rhEqualizer('toggleActive', 'stop');
    });

    audio.addEventListener('ended', function () {
        $('.equalizer').rhEqualizer('toggleActive', 'stop');
    })
});