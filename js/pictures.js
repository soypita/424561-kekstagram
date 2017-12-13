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

  var sortingFilters = document.querySelector('.filters');

  var originalPictures = [];

  var createPictures = function (pictures) {
    for (var j = 0; j < pictures.length; j++) {
      fragment.appendChild(renderPicture(pictures[j]));
    }
    gallery.innerHTML = '';
    gallery.appendChild(fragment);
    galleryHandler();
  };

  var fillPictureContainer = function (pictures) {
    originalPictures = pictures;
    createPictures(pictures);
    sortingFilters.classList.remove('filters-inactive');
  };

  var showRecommend = function () {
    createPictures(originalPictures);
  };

  var showPopular = function () {
    createPictures(originalPictures.slice(0).sort(function (it1, it2) {
      return it2.likes - it1.likes;
    }));
  };

  var showDiscussed = function () {
    createPictures(originalPictures.slice(0).sort(function (it1, it2) {
      return it2.comments.length - it1.comments.length;
    }));
  };

  var showRandom = function () {
    createPictures(originalPictures.slice(0).sort(function () {
      return window.getRandomInRange(-1, 1);
    }));
  };

  var setSortingFilter = function (filterName) {
    switch (filterName) {
      case 'recommend':
        window.debounce(showRecommend);
        break;
      case 'popular':
        window.debounce(showPopular);
        break;
      case 'discussed':
        window.debounce(showDiscussed);
        break;
      case 'random':
        window.debounce(showRandom);
        break;
    }
  };


  sortingFilters.addEventListener('click', function (evt) {
    if (evt.target.type === 'radio') {
      setSortingFilter(evt.target.value);
    }
  });

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
