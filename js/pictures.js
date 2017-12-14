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

  window.createPictures = function (pictures) {
    for (var j = 0; j < pictures.length; j++) {
      fragment.appendChild(renderPicture(pictures[j]));
    }
    return fragment;
  };

})();
