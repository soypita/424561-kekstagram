'use strict';

(function () {
  var DEFAULT_EFFECT_LEVEL = 20;

  window.initializeFilters = function (filterElement, cb) {
    filterElement.addEventListener('click', function (evt) {
      if (evt.target.type === 'radio') {
        var filterName = evt.target.value;
        cb(filterName, DEFAULT_EFFECT_LEVEL);
      }
    });
  };
})();
