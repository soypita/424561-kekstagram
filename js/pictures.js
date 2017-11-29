'use strict';

var NUMBER_OF_PICTURES = 25;
var MIN_COUNT_OF_LIKES = 15;
var MAX_COUNT_OF_LIKES = 200;

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var USER_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var getRandomInRange = function (min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
};

var getRandomComments = function () {
  var outCommentsArr = [];
  var numberOfComments = getRandomInRange(1, 2);
  for (var i = 0; i < numberOfComments; i++) {
    outCommentsArr[i] = USER_COMMENTS[getRandomInRange(0, USER_COMMENTS.length - 1)];
  }
  return outCommentsArr;
};

var pictures = [];

for (var i = 0; i <= NUMBER_OF_PICTURES; i++) {
  var urlPath = 'photos/' + (i + 1) + '.jpg';
  var likesCounter = getRandomInRange(MIN_COUNT_OF_LIKES, MAX_COUNT_OF_LIKES);
  var userComments = getRandomComments();
  pictures[i] =
    {
      url: urlPath,
      likes: likesCounter,
      comments: userComments
    };
}

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

var fillPictureContainer = function (container) {
  for (var j = 0; j <= NUMBER_OF_PICTURES; j++) {
    container.appendChild(renderPicture(pictures[j]));
  }
};

var pictureContainer = document.querySelector('.pictures');

var fragment = document.createDocumentFragment();

fillPictureContainer(fragment);

pictureContainer.appendChild(fragment);

var uploadOverlay = document.querySelector('.upload-overlay');
uploadOverlay.classList.add('hidden');

var galleryOverlay = document.querySelector('.gallery-overlay');

var fillOverlay = function (picture) {
  galleryOverlay.querySelector('.gallery-overlay-image').src = picture.querySelector('img').src;
  galleryOverlay.querySelector('.likes-count').textContent = picture.querySelector('.picture-likes').textContent;
  galleryOverlay.querySelector('.comments-count').textContent = picture.querySelector('.picture-comments').textContent;
};

var onOverlayKeyPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeOpenOverlay();
    document.removeEventListener('keydown', onOverlayKeyPress);
  }
};

var openGalleryOverlay = function (picture) {
  fillOverlay(picture);
  galleryOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onOverlayKeyPress);
};

var closeOpenOverlay = function () {
  galleryOverlay.classList.add('hidden');
};

var userPictures = document.querySelectorAll('.picture');

var overlayClose = galleryOverlay.querySelector('.gallery-overlay-close');

overlayClose.addEventListener('click', function () {
  closeOpenOverlay();
});

overlayClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeOpenOverlay();
  }
});

userPictures.forEach(function (picture) {
  picture.addEventListener('click', function (evt) {
    evt.preventDefault();
    openGalleryOverlay(evt.currentTarget);
  });
});

var uploadForm = document.querySelector('#upload-select-image');
var uploadFile = uploadForm.querySelector('#upload-file');
var uploadCancel = uploadForm.querySelector('.upload-form-cancel');
var uploadComment = uploadForm.querySelector('.upload-form-description');

var onUploadOverlayKeyPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    if (document.activeElement !== uploadComment) {
      closeUploadOverlay();
      document.removeEventListener('keydown', onUploadOverlayKeyPress);
    }
  }
};

var openUploadOverlay = function () {
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onUploadOverlayKeyPress);
};

var closeUploadOverlay = function () {
  uploadOverlay.classList.add('hidden');
};

uploadFile.addEventListener('change', function () {
  openUploadOverlay();
});

uploadCancel.addEventListener('click', function () {
  closeUploadOverlay();
});
