var Lang = {
    defaultLang: 'en',
    langs: ['en', 'ru'],
    tokens: {
        '1': {
            'en': 'Just missed',
            'ru': 'Ранее'
        },
        '2': {
            'en': '<span class="flag-icon flag-icon-gb flag-icon-squared"></span>',
            'ru': '<span class="flag-icon flag-icon-ru flag-icon-squared"></span>'
        }
    },
    init: function (callBack) {
        if ('localStorage' in window && window['localStorage'] !== null) {
            localStorage.setItem('lang-default', Lang.defaultLang);
            var lang = localStorage.getItem('lang');
            if (lang === undefined || lang === null) {
                lang = Lang.defaultLang;
                localStorage.setItem('lang', lang);
            }
            for (var i in Lang.tokens) {
                var element = document.querySelector('[data-lang-id="' + i + '"]');
                //element.setAttribute('data-lang-current', lang);
                element.innerHTML = Lang.tokens[i][lang];
            }
            callBack = callBack || function () {};
            callBack();
        }
    },
    changeLanguage: function (lang) {
        if (lang === undefined || lang === null) {
            var langs = Lang.langs,
                currentLang = localStorage.getItem('lang'),
                currentLangIndex,
                nextLang,
                nextLangIndex;
            if (currentLang == undefined) {
                currentLang = Lang.defaultLang;
            }
            currentLangIndex = langs.indexOf(currentLang);
            if (currentLangIndex > langs.length - 2) {
                nextLangIndex = 0;
            } else {
                nextLangIndex = currentLangIndex + 1;
            }
            nextLang = langs[nextLangIndex];
            console.log(nextLang);
            lang = nextLang;
        }
        for (var i in Lang.tokens) {
            var element = document.querySelector('[data-lang-id="' + i + '"]');
            element.innerHTML = Lang.tokens[i][lang];
        }
        localStorage.setItem('lang', lang);
    }
};

Lang.init();