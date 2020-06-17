'use strict';
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var COMMENTS_RANGE = 33;
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
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var pictureContainer = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();

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

var getComments = function () {
  var comments = [];
  for (var i = 0; i < getRandomNumber(0, COMMENTS_RANGE); i++) {
    var commentsInfo = {};
    commentsInfo.avatar = 'img/avatar-' + getRandomNumber(1, AVATAR_RANGE) + '.svg';
    commentsInfo.message = getMessages();
    commentsInfo.name = AVATAR_NAMES[getRandomNumber(0, AVATAR_NAMES.length - 1)];
    comments.push(commentsInfo);
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

var getPicturesList = function () {
  for (var i = 1; i <= PICTURES_LIST_RANGE; i++) {
    picturesList.push(getPictureInfo(i));
  }
};

var getPictureClone = function (n) {
  var clonedElement = pictureTemplate.cloneNode(true);
  clonedElement.querySelector('img').src = picturesList[n].url;
  clonedElement.querySelector('.picture__likes').textContent = picturesList[n].likes;
  clonedElement.querySelector('.picture__comments').textContent = picturesList[n].comments.length;
  return clonedElement;
};

var getFullDomOfPicture = function () {
  for (var i = 0; i < picturesList.length; i++) {
    fragment.appendChild(getPictureClone(i));
  }
  pictureContainer.appendChild(fragment);
};

getPicturesList();
getFullDomOfPicture();
