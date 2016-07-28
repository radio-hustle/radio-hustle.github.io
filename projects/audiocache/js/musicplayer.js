(function ($) {
    $(function () {

        var tracksUpdate = [];

        $.ajax({
            url: 'http://93.188.164.219/data/new_tracks.json',
            success: function (data) {
                tracksUpdate = data.update;
            },
            error: function () {
                tracksUpdate = [];
            }
        });

        var tracks = [],
            playlist = [],
            currentIndex = 0;

        function shuffle(o) {
            for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        }

        $('a[rel="help"]').on('click', function () {
            var div = $('div[rel="help"]');
            if (div.css('display') == 'none') {
                div.css('display', '');
                $(this).html('Ð—Ð°ÐºÑ€Ñ‹Ñ‚ÑŒ ÑÐ¿Ñ€Ð°Ð²ÐºÑƒ');
            } else {
                div.css('display', 'none');
                $(this).html('Ð¡Ð¿Ñ€Ð°Ð²ÐºÐ°');
            }
        })

        function init() {
            $.ajax({
                url: 'http://93.188.164.219/data/tracks.json',
                beforeSend: function () {
                    $('#submit').css('visibility', 'hidden');
                    $('#submit').parent().append('<i id="loading-tracks" class="fa fa-spin fa-5x fa-cog"></i>');
                },
                success: function (data) {
                    tracks = data;
                    $('#submit').css('visibility', 'visible');
                    $('#loading-tracks').remove();
                },
                error: function (a) {
                    tracks = JSON.parse(a);
                    $('#submit').css('visibility', 'visible');
                    $('#loading-tracks').remove();
                }
            })
        }

        function getPlaylist(from, to) {
            var result = [];

            for (var i = 0; i < tracks.length; i++) {
                tracks[i].bpm = parseInt(tracks[i].bpm, 10);
                if (tracks[i].bpm >= from && tracks[i].bpm <= to) {
                    result.push(tracks[i]);
                }
            }

            return shuffle(result);
        }

        function isNewTrack(name) {
            for (var i = 0; i < tracksUpdate.length; i++) {
                if (name.indexOf(tracksUpdate[i]) > -1) {
                    return true;
                }
            }
            return false;
        }

        function showPlaylist() {
            var w = '';
            for (var i = 0; i < playlist.length; i++) {
                var isNew = (isNewTrack(playlist[i].name)) ? ' data-track="new"' : '';
                w += '<li' + isNew + '>' + playlist[i].bpm + ' bpm ' + playlist[i].name
                        .replace(/_/gim, ' ')
                        .replace('audio/', '')
                        .replace(/\d{2}y\d{2}w\dd\//g, '')
                        .replace(/\b./g, function (m) {
                            return m.toUpperCase();
                        });
            }
            $('#current-playlist').html(w);

            $('#current-playlist').find('li').on('click', function () {
                var index = $(this).index();
                currentIndex = index;
                setCurrentTrack();
                playTrack(index);
            })
        }

        function setCurrentTrack() {
            var cplaylist = $('#current-playlist');
            cplaylist.find('li').removeClass('active');
            cplaylist.find('li:eq(' + currentIndex + ')').addClass('active');
        }

        function setTrack(index, autoChange) {
            //$('#playing-track').find('source').attr('src', 'http://93.188.164.219/' + playlist[index].name.replace(/%/gim, '%25').replace(/_t_/gim, 't_').replace(/_s_/gim, 's_').replace(/_m_/gim, 'm_'));
            //$('#next-track').find('source').attr('src', 'http://93.188.164.219/' + playlist[index + 1].name.replace(/%/gim, '%25').replace(/_t_/gim, 't_').replace(/_s_/gim, 's_').replace(/_m_/gim, 'm_'));
            $('#playing-track').find('source').remove();
            if (!autoChange) {
                $('#next-track').find('source').clone().appendTo($('#playing-track'));
                $('#playing-track').find('source').attr('src', 'http://93.188.164.219/' + playlist[index].name.replace(/%/gim, '%25').replace(/_t_/gim, 't_').replace(/_s_/gim, 's_').replace(/_m_/gim, 'm_').replace(/_ll_/gim, 'll_'));
            } else {
                $('#next-track').find('source').clone().appendTo($('#playing-track'));
            }
            var nextIndex = (playlist[index + 1] !== undefined) ? index + 1 : 0;
            $('#next-track').find('source').attr('src', 'http://93.188.164.219/' + playlist[nextIndex].name.replace(/%/gim, '%25').replace(/_t_/gim, 't_').replace(/_s_/gim, 's_').replace(/_m_/gim, 'm_').replace(/_ll_/gim, 'll_'));
            console.log(playlist[index].name);
            try {
                document.getElementById('playing-track').load();
            } catch (e) {
                next(index + 1, autoChange);
            }
        }

        function playTrack(index) {
            setTrack(index);
            document.getElementById('playing-track').play();
        }

        function next(index) {
            console.log('Audio is ended. Starting next track...');
            try {
                setTrack(index, true);
            } catch (e) {
                console.log(e);
                next(index + 1);
            }
            document.getElementById('playing-track').play();
        }

        init();

        $("#slider-range").slider({
            range: true,
            min: 70,
            max: 135,
            values: [100, 110],
            slide: function (event, ui) {
                $("#range").val('Ð¢ÐµÐ¼Ð¿ Ð¼ÑƒÐ·Ñ‹ÐºÐ¸: Ð¾Ñ‚ ' + ui.values[0] + ' Ð´Ð¾ ' + ui.values[1] + ' bpm');
            }
        });

        $("#range").val('Ð¢ÐµÐ¼Ð¿ Ð¼ÑƒÐ·Ñ‹ÐºÐ¸: Ð¾Ñ‚ ' + $("#slider-range").slider("values", 0) +
            " Ð´Ð¾ " + $("#slider-range").slider("values", 1) + ' bpm');

        $('#submit').on('click', function () {
            playlist = getPlaylist($('#slider-range').slider('values', 0), $('#slider-range').slider('values', 1));
            if (playlist.length == 0) {
                $('#tracks-count').html('ÐÐµ Ð½Ð°Ð¹Ð´ÐµÐ½Ð¾ Ñ‚Ñ€ÐµÐºÐ¾Ð²');
                $('#playing-track').find('source').attr('src', '');
            } else {
                $('#tracks-count').html('ÐŸÐ¾Ð´Ð¾Ð±Ñ€Ð°Ð½Ð¾ Ñ‚Ñ€ÐµÐºÐ¾Ð²: ' + playlist.length);
            }
            showPlaylist();
            $('#playing-track').css('display', '');
            $('#current-playlist').css('display', '');
            $('#show-new-tracks').addClass('btn-default').removeClass('btn-success');
            $('#show-new-tracks').parent().css('display', '');
            setTrack(currentIndex);
        });

        $('#show-new-tracks').on('click', function () {
            $(this).toggleClass('btn-default').toggleClass('btn-success');
            $('#current-playlist li[data-track="new"]').toggleClass('show-new');
        })

        $('#playing-track').on('ended', function () {
            if (currentIndex == playlist.length - 1) {
                currentIndex = 0;
            } else {
                currentIndex++;
            }
            next(currentIndex);
        });

        $('#playing-track').on('play', function () {
            setCurrentTrack();
        });

    });
})(jQuery);