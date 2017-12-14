'use strict';

(function () {
  var pictureGallery = document.querySelector('.pictures');

  var fillGallery = function (container) {
    pictureGallery.innerHTML = '';
    pictureGallery.appendChild(container);
    window.initPicturePreview();
  };

  var sortPicturesHandler = function (sortingPictures) {
    fillGallery(window.createPictures(sortingPictures));
  };

  var initGallery = function (serverPictures) {
    fillGallery(window.createPictures(serverPictures));
    window.initSortingFilters(sortPicturesHandler, serverPictures);
  };

  window.backend.load(initGallery, window.errorHandler);
})();
