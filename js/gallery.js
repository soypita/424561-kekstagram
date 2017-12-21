'use strict';

(function () {
  var pictureGallery = document.querySelector('.pictures');

  var fillGallery = function (container) {
    pictureGallery.innerHTML = '';
    pictureGallery.appendChild(container);
    window.preview.init();
  };

  var sortPicturesHandler = function (sortingPictures) {
    fillGallery(window.pictures.create(sortingPictures));
  };

  var initGallery = function (serverPictures) {
    fillGallery(window.pictures.create(serverPictures));
    window.sortFilters.init(sortPicturesHandler, serverPictures);
  };

  window.backend.load(initGallery, window.utility.errorHandler);
})();
