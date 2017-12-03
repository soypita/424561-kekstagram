'use strict';

(function () {
  var NUMBER_OF_PICTURES = 25;

  var MIN_COUNT_OF_LIKES = 15;
  var MAX_COUNT_OF_LIKES = 200;

  var USER_COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var getRandomComments = function () {
    var outCommentsArr = [];
    var numberOfComments = window.getRandomInRange(1, 2);
    for (var i = 0; i < numberOfComments; i++) {
      outCommentsArr[i] = USER_COMMENTS[window.getRandomInRange(0, USER_COMMENTS.length - 1)];
    }
    return outCommentsArr;
  };


  window.generatePictures = function () {
    var pictures = [];

    for (var i = 0; i <= NUMBER_OF_PICTURES; i++) {
      var urlPath = 'photos/' + (i + 1) + '.jpg';
      var likesCounter = window.getRandomInRange(MIN_COUNT_OF_LIKES, MAX_COUNT_OF_LIKES);
      var userComments = getRandomComments();
      pictures[i] =
        {
          url: urlPath,
          likes: likesCounter,
          comments: userComments
        };
    }
    return pictures;
  };


})();
