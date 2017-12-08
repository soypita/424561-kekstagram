'use strict';

(function () {
  window.initializeFilters = function (effectControl, cb) {
    effectControl.addEventListener('click', function (evt) {
      if (evt.target.type === 'radio') {
        var effectName = evt.target.value;
        cb(effectName);
      }
    });
  };
})();
