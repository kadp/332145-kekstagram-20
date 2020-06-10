'use strict';
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var messages = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var photoDescription = '';
var avatarNames = ['Леонардо', 'Рафаэль', 'Донателло', 'Микеланджело', 'Сплинтер', 'Эйприл О’Нил'];
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var pictureContainer = document.querySelector('.pictures.container');
var fragment = document.createDocumentFragment();

var getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomName = function () {
  var i = getRandomNumber(0, avatarNames.length - 1);
  return avatarNames[i];
};

var getLikes = function () {
  return getRandomNumber(MIN_LIKES, MAX_LIKES);
};

var getRandomComments = function () {
  var i = getRandomNumber(0, messages.length - 1);
  return messages[i];
};

var getComments = function () {
  var comment = '';
  if (getRandomNumber(1, 2) === 1) {
    comment += getRandomComments(messages);
  } else {
    comment = getRandomComments(messages) + ' ' + getRandomComments(messages);
  }
  return comment;
};

var getUrl = function (n) {
  var url = 'photos/' + n + '.jpg';
  return url;
};

var getAvatar = function () {
  var userAvatar = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
  return userAvatar;
};

var makeComments = function (avatar, comment, name) {
  var element = {};
  var comments = [];
  element.avatar = avatar;
  element.message = comment;
  element.name = name;
  comments.push(element);
  return comments;
};

var generateElement = function (url, description, likes, comments) {
  var element = {};
  element.url = url;
  element.description = description;
  element.likes = likes;
  element.comments = comments;
  return element;
};

var generateArray = function () {
  var generatedArray = [];
  for (var i = 1; i <= 25; i++) {
    var newElement = generateElement(getUrl(i), photoDescription, getLikes(), makeComments(getAvatar(), getComments(), getRandomName()));
    generatedArray.push(newElement);
  }
  return generatedArray;
};

var pictureList = generateArray();

var getPictureClone = function (n) {
  var clonedElement = pictureTemplate.cloneNode(true);
  clonedElement.querySelector('img').src = pictureList[n].url;
  clonedElement.querySelector('.picture__likes').textContent = pictureList[n].likes;
  clonedElement.querySelector('.picture__comments').textContent = pictureList[n].comments[0].message;
  return clonedElement;
};

var getFullDomOfPicture = function () {
  for (var i = 0; i < pictureList.length; i++) {
    fragment.appendChild(getPictureClone(i));
  }
  pictureContainer.appendChild(fragment);
};

getFullDomOfPicture();
