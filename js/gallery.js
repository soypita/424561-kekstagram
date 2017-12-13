'use strict';

(function () {
  var pictureGallery = document.querySelector('.pictures');
  var fillPictureHandler = function () {
    var userPictures = document.querySelectorAll('.picture');
    userPictures.forEach(function (picture) {
      picture.addEventListener('click', function (evt) {
        evt.preventDefault();
        window.openGalleryOverlay(evt.currentTarget);
      });
    });
  };

  window.fillPictureGallery(pictureGallery, fillPictureHandler);

})();
