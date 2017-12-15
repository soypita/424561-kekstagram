'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var DEBOUNCE_INTERVAL = 500;

  window.utility = {
    isEscPress: function (keyCode) {
      return keyCode === ESC_KEYCODE;
    },
    errorHandler: function (errorMessage) {
      var errorViewer = createErrorContainer();
      errorViewer.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', errorViewer);
      setTimeout(function () {
        document.body.removeChild(errorViewer);
      }, 5000);
    },
    debounce: function () {
      var prevTimout;
      return function (funcToDebounce) {
        if (prevTimout) {
          window.clearTimeout(prevTimout);
        }
        prevTimout = window.setTimeout(funcToDebounce, DEBOUNCE_INTERVAL);
      };
    },
    shuffle: function (array) {
      var currentIndex = array.length;
      var temporaryValue;
      var randomIndex;
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }
  };

  var createErrorContainer = function () {
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
})();
