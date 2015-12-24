var _ = {
    cities: {},
    clubs: {}
};

$('#load-data').on('click', function () {
    $.ajax({
        url: './data/classic.csv',
        success: function (data) {
            var clubs;
            data = data.split('\n');
            for (var i = 0; i < data.length; i++) {
                var currentD = data[i].split(';'),
                    club = currentD[2].replace(/^.*?\(/, '').replace(/\)$/i, '');
                clubs = club.split(',');
                for (var j = 0; j < clubs.length; j++) {
                    var city = clubs[j].match(/\(.*\)/i);
                    if (city === undefined || city === null) {
                        city = 'Moscow';
                    } else {
                        city = city[0].replace('(', '').replace(')', '');
                    }
                    _.clubs[clubs[j].toLowerCase()] = city.toLowerCase();
                }
            }
            clubs = Object.keys(_.clubs).sort();
            for (var i = 0; i < clubs.length; i++) {
                $('#cities').append('<div>' + clubs[i] + ' -> ' + _.clubs[clubs[i]] + '</div>');
            }
        }
    })
});