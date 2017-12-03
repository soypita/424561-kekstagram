'use strict';

(function () {
  var UPLOAD_RESIZE_STEP = 25;
  var UPLOAD_RESIZE_MIN = 25;
  var UPLOAD_RESIZE_MAX = 100;

  var COUNT_OF_HASH_TAGS = 5;

  var MAX_BLUR = 3;
  var MAX_HEAT = 3;

  var uploadOverlay = document.querySelector('.upload-overlay');
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

  var setFilterLevel = function (level) {
    var effect;
    switch (currentFilter) {
      case 'effect-chrome' :
        effect = 'grayscale(' + level / 100 + ')';
        break;
      case 'effect-sepia' :
        effect = 'sepia(' + level / 100 + ')';
        break;
      case 'effect-marvin' :
        effect = 'invert(' + level + '%)';
        break;
      case 'effect-phobos' :
        effect = 'blur(' + level / 100 * MAX_BLUR + 'px)';
        break;
      case 'effect-heat' :
        effect = 'brightness(' + level / 100 * MAX_HEAT + ')';
        break;
    }
    filterUploadLevelValue.value = level.toFixed();
    uploadImagePreview.style.filter = effect;
  };

  var currentFilter;
  var defaultFilterLevel;

  var setFilterForUploadImage = function (filterName) {
    if (currentFilter) {
      uploadImagePreview.style.filter = '';
    }
    if (filterName === '' || filterName === 'effect-none') {
      filterLevelArea.classList.add('hidden');
    } else {
      filterLevelArea.classList.remove('hidden');
    }
    currentFilter = filterName;
    if (!defaultFilterLevel) {
      defaultFilterLevel = filterLevelPin.offsetLeft * 100 / filterLevelBar.offsetWidth;
    }
    setFilterLevel(defaultFilterLevel);
    setFilterPinPosition(defaultFilterLevel);
  };

  var setScaleForUploadImage = function (scaleCoeff) {
    uploadImagePreview.style.transform = 'scale(' + scaleCoeff + ')';
  };

  var setUploadImageToDefault = function () {
    setScaleForUploadImage(1);
    setFilterForUploadImage('effect-none');
    setElementValid(uploadPostHashTags);
  };

  var setElementInvalid = function (elem) {
    elem.style.borderColor = 'red';
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

  uploadEffect.addEventListener('click', function (evt) {
    if (evt.target.type === 'radio') {
      var filterName = 'effect-' + evt.target.value;
      setFilterForUploadImage(filterName);
    }
  });

  var changeScaleCoeff = function (value) {
    var currentScaleValue = parseInt(uploadResizeValue.value.replace('%', ''), 10);
    if ((value > 0 && currentScaleValue < UPLOAD_RESIZE_MAX) || (value < 0 && currentScaleValue > UPLOAD_RESIZE_MIN)) {
      var newScaleValue = (currentScaleValue + value);
      uploadResizeValue.value = newScaleValue + '%';
      setScaleForUploadImage(newScaleValue / 100);
    }
  };

  uploadResizeInc.addEventListener('click', function () {
    changeScaleCoeff(UPLOAD_RESIZE_STEP);
  });

  uploadResizeDec.addEventListener('click', function () {
    changeScaleCoeff(-UPLOAD_RESIZE_STEP);
  });

  uploadPostHashTags.addEventListener('input', function () {
    setElementValid(uploadPostHashTags);
  });

  submitUpload.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (uploadPostHashTags.value && !checkHashTags()) {
      setElementInvalid(uploadPostHashTags);
    } else {
      uploadForm.submit();
      uploadForm.reset();
      setUploadImageToDefault();
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
