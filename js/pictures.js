'use strict';

(function () {

  var pictureTemplate = document.getElementById('picture-template').content.querySelector('.picture');

  var setupPictureElement = function (el, imgSelector, likeSelector, commentSelector, pic) {
    el.querySelector(imgSelector).src = pic.url;
    el.querySelector(likeSelector).textContent = pic.likes;
    el.querySelector(commentSelector).textContent = pic.comments.length;
  };

  var renderPicture = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);
    setupPictureElement(pictureElement, 'img', '.picture-likes', '.picture-comments', picture);
    return pictureElement;
  };

  var fragment = document.createDocumentFragment();

  var gallery;

  var galleryHandler;

  var fillPictureContainer = function (pictures) {
    for (var j = 0; j < pictures.length; j++) {
      fragment.appendChild(renderPicture(pictures[j]));
    }
    gallery.appendChild(fragment);
    galleryHandler();
  };

  var errorViewer = window.createErrorContainer();

  window.errorHandler = function (errorMessage) {
    errorViewer.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorViewer);
    setTimeout(function () {
      document.body.removeChild(errorViewer);
    }, 5000);
  };

  window.fillPictureGallery = function (pictureGallery, cb) {
    gallery = pictureGallery;
    galleryHandler = cb;
    window.backend.load(fillPictureContainer, window.errorHandler);
  };
})();
