'use strict';

(function () {

  var MAX_BLUR = 3;
  var MAX_HEAT = 3;
  var COUNT_OF_HASH_TAGS = 5;

  var DEFAULT_IMAGE_SCALE = 100;

  var INITIAL_IMAGE_FILTER = 'none';

  var INVALID_ELEMENT_COLOR = 'red';

  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadForm = document.querySelector('#upload-select-image');
  var uploadFile = uploadForm.querySelector('#upload-file');
  var uploadCancel = uploadForm.querySelector('.upload-form-cancel');
  var uploadComment = uploadForm.querySelector('.upload-form-description');
  var uploadEffect = uploadForm.querySelector('.upload-effect');
  var uploadImagePreview = uploadForm.querySelector('.effect-image-preview');
  var uploadScaleControl = document.querySelector('.upload-resize-controls');
  var uploadResizeValue = uploadForm.querySelector('.upload-resize-controls-value');
  var uploadPostHashTags = uploadForm.querySelector('.upload-form-hashtags');
  var submitUpload = uploadForm.querySelector('.upload-form-submit');
  var filterLevelArea = uploadForm.querySelector('.upload-effect-level');
  var filterLevelPin = uploadForm.querySelector('.upload-effect-level-pin');
  var filterLevelBar = uploadForm.querySelector('.upload-effect-level-line');
  var filterLevelValue = uploadForm.querySelector('.upload-effect-level-val');
  var filterUploadLevelValue = uploadForm.querySelector('.upload-effect-level-value');

  filterLevelArea.classList.add('hidden');

  var checkCountOfHashTags = function (hashTags) {
    return hashTags.length <= COUNT_OF_HASH_TAGS;
  };

  var checkEvery = function (array, cb) {
    var isValid = true;
    for (var j = 0; j < array.length; j++) {
      if (!cb(j)) {
        isValid = false;
      }
    }
    return isValid;
  };

  var checkHashTags = function () {

    var hashRegex = '(^#[a-zA-Zа-яА-Я\\d]{1,18}$)';

    var pattern = new RegExp(hashRegex);

    var rawHashTags = uploadPostHashTags.value.toLowerCase().split(' ').sort();

    var isCountOfTagsValid = checkCountOfHashTags(rawHashTags);

    var isTagValid = checkEvery(rawHashTags, function (index) {
      return (pattern.test(rawHashTags[index]));
    });

    var isTagUnique = checkEvery(rawHashTags, function (index) {
      return rawHashTags[index + 1] !== rawHashTags[index];
    });

    return isTagValid && isCountOfTagsValid && isTagUnique;
  };

  var onUploadOverlayKeyPress = function (evt) {
    if (window.isEscPress(evt.keyCode)) {
      if (document.activeElement !== uploadComment) {
        closeUploadOverlay();
        uploadForm.reset();
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
    setUploadImageToDefault();
  };

  var filterType = {
    'chrome': function (filterLevel) {
      return 'grayscale(' + filterLevel / 100 + ')';
    },
    'sepia': function (filterLevel) {
      return 'sepia(' + filterLevel / 100 + ')';
    },
    'marvin': function (filterLevel) {
      return 'invert(' + filterLevel + '%)';
    },
    'phobos': function (filterLevel) {
      return 'blur(' + filterLevel / 100 * MAX_BLUR + 'px)';
    },
    'heat': function (filterLevel) {
      return 'brightness(' + filterLevel / 100 * MAX_HEAT + ')';
    },
    'none': function () {
      filterLevelArea.classList.add('hidden');
    }
  };

  var setFilterLevel = function (level) {
    var effect = filterType[currentFilter];
    filterUploadLevelValue.value = level.toFixed();
    uploadImagePreview.style.filter = effect(level);
  };

  var currentFilter;
  var defaultFilterLevel = parseInt(filterUploadLevelValue.value, 10);
  var setFilterForUploadImage = function (filterName) {
    if (currentFilter) {
      uploadImagePreview.style.filter = '';
    }
    filterLevelArea.classList.remove('hidden');
    currentFilter = filterName;
    setFilterLevel(defaultFilterLevel);
    setFilterPinPosition(defaultFilterLevel);
  };

  var setScaleForUploadImage = function (scaleCoeff) {
    uploadResizeValue.value = scaleCoeff + '%';
    uploadImagePreview.style.transform = 'scale(' + scaleCoeff / 100 + ')';
  };

  var setUploadImageToDefault = function () {
    setScaleForUploadImage(DEFAULT_IMAGE_SCALE);
    setFilterForUploadImage(INITIAL_IMAGE_FILTER);
    setElementValid(uploadPostHashTags);
  };

  var setElementInvalid = function (elem) {
    elem.style.borderColor = INVALID_ELEMENT_COLOR;
  };

  var setElementValid = function (elem) {
    elem.style.borderColor = '';
  };

  uploadFile.addEventListener('change', function () {
    openUploadOverlay();
  });

  uploadCancel.addEventListener('click', function () {
    closeUploadOverlay();
  });

  window.initializeFilters(uploadEffect, setFilterForUploadImage);

  window.initializeScale(uploadScaleControl, setScaleForUploadImage);

  uploadPostHashTags.addEventListener('input', function () {
    setElementValid(uploadPostHashTags);
  });

  submitUpload.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (uploadPostHashTags.value && !checkHashTags()) {
      setElementInvalid(uploadPostHashTags);
    } else {
      window.backend.save(new FormData(uploadForm), function () {
        uploadForm.reset();
        closeUploadOverlay();
      }, window.errorHandler);
    }
  });

  var getPinOffsetOfInPercent = function (value) {
    return value * 100 / filterLevelBar.offsetWidth;
  };

  var setFilterPinPosition = function (position) {
    filterLevelPin.style.left = position + '%';
    filterLevelValue.style.width = position + '%';
  };

  filterLevelPin.addEventListener('mousedown', function (evt) {
    var startPosition = evt.clientX;


    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startPosition - moveEvt.clientX;
      var newPosition = filterLevelPin.offsetLeft - shift;

      if (newPosition >= 0 && newPosition <= filterLevelBar.offsetWidth) {
        startPosition = moveEvt.clientX;
        var newOffset = getPinOffsetOfInPercent(newPosition);
        setFilterPinPosition(newOffset);
        setFilterLevel(newOffset);
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
