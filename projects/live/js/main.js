$(function () {
    $('.equalizer').rhEqualizer();
    $('.equalizer').rhEqualizer('setContainerPadding', ($(window).height() / 2 - 70) + 'px 0 0 0');

    $(window).resize(function () {
        $('.equalizer').rhEqualizer('setContainerPadding', ($(window).height() / 2 - 70) + 'px 0 0 0');
    })
});