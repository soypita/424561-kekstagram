'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.getRandomInRange = function (min, max) {
    return Math.round(min - 0.5 + Math.random() * (max - min + 1));
  };

  window.isEscPress = function (keyCode) {
    return keyCode === ESC_KEYCODE;
  };

  window.isEnterPress = function (keyCode) {
    return keyCode === ENTER_KEYCODE;
  };
})();
