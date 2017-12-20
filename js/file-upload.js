'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileController;
  var fileContainer;

  var setFileUploadHandler = function () {
    fileController.addEventListener('change', function () {
      var file = fileController.files[0];

      var reader = new FileReader();
      reader.addEventListener('load', function () {
        fileContainer.src = reader.result;
      });
      reader.readAsDataURL(file);
    });
  };

  window.initUploadFileControl = function (controller, container) {
    fileController = controller;
    fileContainer = container;
    setFileUploadHandler();
  };
})();
