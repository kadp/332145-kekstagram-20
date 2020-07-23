'use strict';

(function () {

  var MIN_LIKES = 15;
  var MAX_LIKES = 200;
  var COMMENTS_RANGE = 99;
  var PICTURES_LIST_RANGE = 25;
  var AVATAR_RANGE = 6;
  var AVATAR_NAMES = ['Леонардо', 'Рафаэль', 'Донателло', 'Микеланджело', 'Сплинтер', 'Эйприл О’Нил'];
  var MESSAGES = ['Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var picturesList = [];

  var getRandomNumber = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getMessages = function () {
    var message = MESSAGES[getRandomNumber(0, MESSAGES.length - 1)];
    if (getRandomNumber(0, 1)) {
      message += ' ' + MESSAGES[getRandomNumber(0, MESSAGES.length - 1)];
    }
    return message;
  };

  var getComment = function () {
    return {
      avatar: 'img/avatar-' + getRandomNumber(1, AVATAR_RANGE) + '.svg',
      message: getMessages(),
      name: AVATAR_NAMES[getRandomNumber(0, AVATAR_NAMES.length - 1)],
    };
  };

  var getComments = function () {
    var comments = [];
    for (var i = 0; i < getRandomNumber(0, COMMENTS_RANGE); i++) {
      comments.push(getComment());
    }
    return comments;
  };

  var getPictureInfo = function (i) {
    return {
      url: 'photos/' + i + '.jpg',
      description: '',
      likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
      comments: getComments()
    };
  };

  var getPicturesList = function (loadData) {
    for (var i = 0; i < loadData.length; i++) {
      picturesList.push(loadData[i]);
    }
  };


  var onError = function (message) {
    console.error(message);
  };

  var URL = 'https://javascript.pages.academy/kekstagram/data';
  window.load(URL, window.render.picture, onError);

  window.data = {
    picturesList: picturesList
  };

  console.log('picturesList  after start', picturesList);



})();
