'use strict';

// Модуль медиа запросов
window.mediaQuery = (function () {
  var BREAKPOINTS_LIST = {
    'desktop': {
      'max': '1266px',
      'min': '1024px'
    },
    'tablet': {
      'max': '1023px',
      'min': '768px'
    },
    'mobile': {
      'max': '767px',
      'min': '320px'
    }
  };

  var mqls = {
    desktop: window.matchMedia(
        '(max-width: ' + BREAKPOINTS_LIST.desktop.max + ') ' +
        'and (min-width: ' + BREAKPOINTS_LIST.desktop.min + ')'
    ),
    tablet: window.matchMedia(
        '(max-width: ' + BREAKPOINTS_LIST.tablet.max + ') ' +
        'and (min-width: ' + BREAKPOINTS_LIST.tablet.min + ')'
    ),
    mobile: window.matchMedia(
        '(max-width: ' + BREAKPOINTS_LIST.mobile.max + ') ' +
        'and (min-width: ' + BREAKPOINTS_LIST.mobile.min + ')'
    )
  };

  // Создаёт отслеживание ресайза окна
  var watchMedia = function (types, callback) {
    for (var i = 0; i < types.length; i++) {
      if (types[i] === 'desktop') {
        mqls.desktop.addEventListener('change', function (evt) {
          callback('desktop', evt);
        });
      }
      if (types[i] === 'tablet') {
        mqls.tablet.addEventListener('change', function (evt) {
          callback('tablet', evt);
        });
      }
      if (types[i] === 'mobile') {
        mqls.mobile.addEventListener('change', function (evt) {
          callback('mobile', evt);
        });
      }
    }
  };

  return {
    mqls: mqls,
    watchMedia: watchMedia
  };
})();
