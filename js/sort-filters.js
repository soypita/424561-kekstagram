'use strict';

(function () {
  var sortingFilters = document.querySelector('.filters');

  var sortCallback;

  var sortingMethod = {
    'recommend': function (array) {
      return array;
    },
    'popular': function (array) {
      return array.slice(0).sort(function (it1, it2) {
        return it2.likes - it1.likes;
      });
    },
    'discussed': function (array) {
      return array.slice(0).sort(function (it1, it2) {
        return it2.comments.length - it1.comments.length;
      });
    },
    'random': function (array) {
      return window.shuffle(array.slice(0));
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
      debounceHandler(function () {
        sortCallback(sortingMethod[evt.target.value](originalPictures));
      });
    }
  });
})();
