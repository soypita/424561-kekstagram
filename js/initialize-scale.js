'use strict';

(function () {

  var RESIZE_STEP = 25;
  var RESIZE_MIN = 25;
  var RESIZE_MAX = 100;


  var changeScaleCoeff = function (currentValueControl, value, callBack) {
    var currentScaleValue = parseInt(currentValueControl.value.replace('%', ''), 10);
    if ((value > 0 && currentScaleValue < RESIZE_MAX) || (value < 0 && currentScaleValue > RESIZE_MIN)) {
      var newScaleValue = (currentScaleValue + value);
      callBack(newScaleValue);
    }
  };

  window.initializeScale = {
    init: function (scaleControl, cb) {
      var resizeInc = scaleControl.querySelector('.upload-resize-controls-button-inc');
      var resizeDec = scaleControl.querySelector('.upload-resize-controls-button-dec');
      var resizeState = scaleControl.querySelector('.upload-resize-controls-value');

      resizeInc.addEventListener('click', function () {
        changeScaleCoeff(resizeState, RESIZE_STEP, cb);
      });

      resizeDec.addEventListener('click', function () {
        changeScaleCoeff(resizeState, -RESIZE_STEP, cb);
      });
    }
  };
})();
