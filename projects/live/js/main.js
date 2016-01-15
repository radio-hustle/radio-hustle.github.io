$(function () {
    $('.equalizer').rhEqualizer();
    $('.equalizer').rhEqualizer('setContainerPadding', ($(window).height() / 2 - 70) + 'px 0 0 0');

    $('.btn-change-language').on('click', function () {
        //Lang.changeLanguage();
        $('.change-language-popup').css('display', '');
    });

    $('.change-language-popup').find('li').on('click', function () {
        Lang.changeLanguage($(this).attr('data-lang'));
        $('.change-language-popup').css('display', 'none');
    });

    $('.change-language-popup .popup-close-btn').on('click', function () {
        $('.change-language-popup').addClass('animated');
        setTimeout(function () {
            $('.change-language-popup').css('display', 'none');
            $('.change-language-popup').removeClass('animated');
        }, 1000);
    });

    $('.btn-show-just-missed').on('click', function () {
        $('.shoutcast-just-missed').css('display', '');
    });

    $('.btn-show-just-missed-close').on('click', function () {
        $('.btn-show-just-missed').css('display', 'none');
    });

    $.SHOUTcast({
        host: '93.188.164.219',
        port: 8000,
        interval: 2000,
        stats: function () {
            var songTitle = this.get('songtitle'),
                artist = songTitle.split(' - ')[0].trim().replace(/^.+bmp/i, ''),
                title = songTitle.split(' - ')[1].trim().replace(/^.+bpm/i, '');
            $('.shoutcast-now-playing.current-artist').text(artist);
            $('.shoutcast-now-playing.current-track').text(title);
        }
    }).startStats();

    $.SHOUTcast({
        host: '93.188.164.219',
        port: 8000,
        playedInterval: 20000,
        played: function (tracks) {
            $('.shoutcast-just-missed').html('')
                .append('<div class="popup-close-btn" onclick="$(\'.shoutcast-just-missed\').css(\'display\', \'none\')"><i class="fa fa-times"></i></div>');
            $.each(tracks, function (k, track) {
                if (k > 0 && k < 6) {
                    $('.shoutcast-just-missed').append('<div class="cctrack"><div class="ccinfos"><div class="cctitle">' + track.title.replace(/\d{1,3}\sbpm/, '') + '</div></div></div>');
                }
            });
        }
    }).startPlayed();

    $(window).resize(function () {
        $('.equalizer').rhEqualizer('setContainerPadding', ($(window).height() / 2 - 70) + 'px 0 0 0');
        $('.equalizer').rhEqualizer('init');
    });

    var audio = document.getElementById('player'),
        volume = 1;

    audio.addEventListener('play', function () {
        $('.equalizer').rhEqualizer('toggleActive', 'start');
    });

    audio.addEventListener('volumechange', function () {
        if (audio.volume == 0) {
            $('.equalizer').rhEqualizer('toggleActive', 'stop');
        } else {
            $('.equalizer').rhEqualizer('toggleActive', 'start');
        }
    });

    audio.addEventListener('pause', function () {
        $('.equalizer').rhEqualizer('toggleActive', 'stop');
    });

    audio.addEventListener('stalled', function () {
        $('.equalizer').rhEqualizer('toggleActive', 'stop');
    });

    audio.addEventListener('ended', function () {
        $('.equalizer').rhEqualizer('toggleActive', 'stop');
    });

    $('.btn-play').on('click', function () {
        var icon = $(this).find('i.fa'),
            status = $(this).attr('data-status');
        if (status == 'pause') {
            audio.play();
            audio.volume = volume;
            $(this).attr('data-status', 'play');
        } else {
            audio.volume = 0;
            $(this).attr('data-status', 'pause');
        }
        icon.toggleClass('fa-play')
            .toggleClass('fa-pause');
    })
});