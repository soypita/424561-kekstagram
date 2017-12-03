'use strict';

(function () {

  var galleryOverlay = document.querySelector('.gallery-overlay');

  var fillOverlay = function (picture) {
    galleryOverlay.querySelector('.gallery-overlay-image').src = picture.querySelector('img').src;
    galleryOverlay.querySelector('.likes-count').textContent = picture.querySelector('.picture-likes').textContent;
    galleryOverlay.querySelector('.comments-count').textContent = picture.querySelector('.picture-comments').textContent;
  };

  var onGalleryOverlayKeyPress = function (evt) {
    if (window.isEscPress(evt.keyCode)) {
      closeGalleryOverlay();
      document.removeEventListener('keydown', onGalleryOverlayKeyPress);
    }
  };

  window.openGalleryOverlay = function (picture) {
    fillOverlay(picture);
    galleryOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onGalleryOverlayKeyPress);
  };

  var closeGalleryOverlay = function () {
    galleryOverlay.classList.add('hidden');
  };

  var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');

  galleryOverlayClose.addEventListener('click', function () {
    closeGalleryOverlay();
  });

  galleryOverlayClose.addEventListener('keydown', function (evt) {
    if (window.isEnterPress(evt.keyCode)) {
      closeGalleryOverlay();
    }
  });
})();


