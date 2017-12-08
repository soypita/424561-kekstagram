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

  var errorHandler = function (errorMessage) {
    var errorViewer = document.createElement('div');
    errorViewer.style = 'z-index: 100; margin: 0 auto; width: auto; height: 50px; text-align: center;' +
      ' background-color: rgba(255, 231, 82, 0.2; color: #ffe753';
    errorViewer.style.position = 'absolute';
    errorViewer.style.left = 0;
    errorViewer.style.right = 0;
    errorViewer.style.fontSize = '30px';
    errorViewer.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorViewer);
  };

  window.fillPictureGallery = function (pictureGallery, cb) {
    gallery = pictureGallery;
    galleryHandler = cb;
    window.backend.load(fillPictureContainer, errorHandler);
  };
})();
