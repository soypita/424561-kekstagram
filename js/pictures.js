'use strict';

var NUMBER_OF_PICTURES = 25;
var MIN_COUNT_OF_LIKES = 15;
var MAX_COUNT_OF_LIKES = 200;

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var DEFAULT_IMAGE_FILTER = 'image-preview';

var UPLOAD_RESIZE_STEP = 25;
var UPLOAD_RESIZE_MIN = 25;
var UPLOAD_RESIZE_MAX = 100;

var COUNT_OF_HASH_TAGS = 5;
var LENGTH_OF_HASH_TAG = 20;

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

var onGalleryOverlayKeyPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeGalleryOverlay();
    document.removeEventListener('keydown', onGalleryOverlayKeyPress);
  }
};

var openGalleryOverlay = function (picture) {
  fillOverlay(picture);
  galleryOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onGalleryOverlayKeyPress);
};

var closeGalleryOverlay = function () {
  galleryOverlay.classList.add('hidden');
};

var userPictures = document.querySelectorAll('.picture');

var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');

galleryOverlayClose.addEventListener('click', function () {
  closeGalleryOverlay();
});

galleryOverlayClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeGalleryOverlay();
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
var uploadEffect = uploadForm.querySelector('.upload-effect');
var uploadImagePreview = uploadForm.querySelector('.effect-image-preview');
var uploadResizeValue = uploadForm.querySelector('.upload-resize-controls-value');
var uploadResizeInc = uploadForm.querySelector('.upload-resize-controls-button-inc');
var uploadResizeDec = uploadForm.querySelector('.upload-resize-controls-button-dec');
var uploadPostHashTags = uploadForm.querySelector('.upload-form-hashtags');
var submitUpload = uploadForm.querySelector('.upload-form-submit');

var checkLengthOfHashTag = function (hashTags) {
  var isValid = true;
  for (var j = 0; j < hashTags.length; j++) {
    if (hashTags[j].length > LENGTH_OF_HASH_TAG) {
      isValid = false;
      break;
    }
  }
  return isValid;
};

var checkCountOfHashTags = function (hashTags) {
  return hashTags.length < COUNT_OF_HASH_TAGS;
};

var checkFirstSymbol = function (hashTags) {
  var isValid = true;
  for (var j = 0; j < hashTags.length; j++) {
    if (hashTags[j][0] !== '#') {
      isValid = false;
      break;
    }
  }
  return isValid;
};

var checkIdentity = function (hashTags) {
  var isValid = true;
  for (var j = 0; j < hashTags.length; j++) {
    if (hashTags.indexOf(hashTags[j], j + 1) !== -1) {
      isValid = false;
      break;
    }
  }
  return isValid;
};

var checkDivide = function (hashTags) {
  var isValid = true;
  for (var j = 0; j < hashTags.length; j++) {
    if (hashTags[j].indexOf(hashTags[j][0], 1) !== -1) {
      isValid = false;
      break;
    }
  }
  return isValid;
};

var checkHashTags = function () {
  var isValid = true;

  var rawHashTags = uploadPostHashTags.value.toLowerCase().split(' ');

  if (!checkCountOfHashTags(rawHashTags) || !checkFirstSymbol(rawHashTags)
    || !checkLengthOfHashTag(rawHashTags) || !checkIdentity(rawHashTags) || !checkDivide(rawHashTags)) {
    isValid = false;
  }

  return isValid;
};

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

var setFilterForUploadImage = function (filterName) {
  uploadImagePreview.className = 'effect-image-preview';
  uploadImagePreview.classList.add(filterName);
};

var setScaleForUploadImage = function (scaleCoeff) {
  uploadImagePreview.style.transform = 'scale(' + scaleCoeff + ')';
};

var setUploadImageToDefault = function () {
  setScaleForUploadImage(1);
  setFilterForUploadImage(DEFAULT_IMAGE_FILTER);
};

uploadFile.addEventListener('change', function () {
  openUploadOverlay();
  setUploadImageToDefault();
});

uploadCancel.addEventListener('click', function () {
  closeUploadOverlay();
});

uploadEffect.addEventListener('click', function (evt) {
  if (evt.target.type === 'radio') {
    var filterName = evt.target.id.replace('upload-', '');
    setFilterForUploadImage(filterName);
  }
});

uploadResizeInc.addEventListener('click', function () {
  var currentScaleValue = parseInt(uploadResizeValue.value.replace('%', ''), 10);
  if (currentScaleValue < UPLOAD_RESIZE_MAX) {
    var newScaleValue = (currentScaleValue + UPLOAD_RESIZE_STEP);
    uploadResizeValue.value = newScaleValue + '%';
    setScaleForUploadImage(newScaleValue / 100);
  }
});

uploadResizeDec.addEventListener('click', function () {
  var currentScaleValue = parseInt(uploadResizeValue.value.replace('%', ''), 10);
  if (currentScaleValue > UPLOAD_RESIZE_MIN) {
    var newScaleValue = (currentScaleValue - UPLOAD_RESIZE_STEP);
    uploadResizeValue.value = newScaleValue + '%';
    setScaleForUploadImage(newScaleValue / 100);
  }
});

uploadPostHashTags.addEventListener('input', function () {
  uploadPostHashTags.setCustomValidity('');
});

submitUpload.addEventListener('click', function () {
  if (uploadPostHashTags.value && !checkHashTags()) {
    uploadPostHashTags.setCustomValidity('Неверный формат хэштега');
  } else {
    uploadForm.submit();
    setUploadImageToDefault();
  }
});
