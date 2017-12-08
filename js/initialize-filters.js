'use strict';

(function () {
  window.initializeFilters = function (filterElement, cb) {
    filterElement.addEventListener('click', function (evt) {
      if (evt.target.type === 'radio') {
        var filterName = evt.target.value;
        cb(filterName);
      }
    });
  };
})();
