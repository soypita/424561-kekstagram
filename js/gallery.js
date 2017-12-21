'use strict';

(function () {
  var pictureGallery = document.querySelector('.pictures');

  var fillGallery = function (container) {
    pictureGallery.innerHTML = '';
    pictureGallery.appendChild(container);
    window.preview.initPicturePreview();
  };

  var sortPicturesHandler = function (sortingPictures) {
    fillGallery(window.pictures.createPictures(sortingPictures));
  };

  var initGallery = function (serverPictures) {
    fillGallery(window.pictures.createPictures(serverPictures));
    window.sortFilters.initSortingFilters(sortPicturesHandler, serverPictures);
  };

  window.backend.load(initGallery, window.utility.errorHandler);
})();
