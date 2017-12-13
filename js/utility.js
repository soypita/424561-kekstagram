'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var DEBOUNCE_INTERVAL = 500;

  window.getRandomInRange = function (min, max) {
    return Math.round(min - 0.5 + Math.random() * (max - min + 1));
  };

  window.isEscPress = function (keyCode) {
    return keyCode === ESC_KEYCODE;
  };

  window.isEnterPress = function (keyCode) {
    return keyCode === ENTER_KEYCODE;
  };

  window.createErrorContainer = function () {
    var errorContainer = document.createElement('div');
    errorContainer.style = 'z-index: 100; margin: 0 auto; width: auto; height: 50px; text-align: center;' +
      ' background-color: rgba(255, 231, 82, 0.3); color: #ffe753';
    errorContainer.style.position = 'absolute';
    errorContainer.style.top = 0;
    errorContainer.style.left = 0;
    errorContainer.style.right = 0;
    errorContainer.style.fontSize = '30px';
    return errorContainer;
  };

  var prevTimout;
  window.debounce = function (funcToDebounce) {
    if (prevTimout) {
      window.clearTimeout(prevTimout);
    }
    prevTimout = window.setTimeout(funcToDebounce, DEBOUNCE_INTERVAL);
  };
})();
