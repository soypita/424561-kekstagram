'use strict';

(function () {
  var URL = 'https://1510.dump.academy/kekstagram';
  var STATUS_OK = 200;

  var REQUES_TIMEOUT = 10000;

  var initXHR = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = REQUES_TIMEOUT;

    return xhr;
  };

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = initXHR(onLoad, onError);
      xhr.open('GET', URL + '/data');
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = initXHR(onLoad, onError);
      xhr.open('POST', URL);
      xhr.send(data);
    }
  };
})();
