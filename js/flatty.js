jQuery.fn.random = function() {
    var randomIndex = Math.floor(Math.random() * this.length);
    return jQuery(this[randomIndex]);
};

function setCellWidth() {
    var width = $(window).width();
    if (width <= 768) {
        $('div.cell').width(width);
    }
    if (width > 768 && width <= 992) {
        $('div.cell').width(width / 2);
    }
    if (width > 992 && width <= 1200) {
        $('div.cell').width(width / 3);
    }
    if (width > 1200) {
        $('div.cell').width(width / 3);
    }
}

$(window).resize(function () {
    setCellWidth();
});

$(function () {
    setCellWidth();

    $('div.cell').each(function (i, v) {
        $(v).append('<div class="vertical flip-container" ontouchstart="this.classList.toggle(\'hover\');">' +
            '<div class="flipper">' +
            '<div class="front">' + $(v).attr('data-front') + '</div>' +
            '<div class="back background-color">' + $(v).attr('data-back') + '</div>' +
            '</div>' +
            '</div>');
    });

    //setInterval(function () {
    //    var randomCell = $('div.cell').random();
    //    randomCell.find('.flip-container').addClass('hover');
    //    setTimeout(function () {
    //        randomCell.removeClass('hover');
    //    }, 1000);
    //}, 2000);
});