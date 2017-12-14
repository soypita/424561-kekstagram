'use strict';

(function () {
  var sortingFilters = document.querySelector('.filters');

  var sortCallback;

  var sortingTypes = {
    'recommend': function () {
      sortCallback(originalPictures);
    },
    'popular': function () {
      sortCallback(originalPictures.slice(0).sort(function (it1, it2) {
        return it2.likes - it1.likes;
      }));
    },
    'discussed': function () {
      sortCallback(originalPictures.slice(0).sort(function (it1, it2) {
        return it2.comments.length - it1.comments.length;
      }));
    },
    'random': function () {
      sortCallback(originalPictures.slice(0).sort(function () {
        return window.getRandomInRange(-1, 1);
      }));
    }
  };
  var debounceHandler = window.debounce();

  var originalPictures = [];

  window.initSortingFilters = function (cb, pictures) {
    sortCallback = cb;
    sortingFilters.classList.remove('filters-inactive');
    originalPictures = pictures;
  };

  sortingFilters.addEventListener('click', function (evt) {
    if (evt.target.type === 'radio') {
      debounceHandler(sortingTypes[evt.target.value]);
    }
  });
})();
