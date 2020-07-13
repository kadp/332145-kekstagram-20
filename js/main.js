'use strict';
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
    description: 'Test, later will be delete',
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
  var clonedPicture = pictureTemplate.cloneNode(true);
  clonedPicture.querySelector('img').src = picturesList[n].url;
  clonedPicture.querySelector('.picture__likes').textContent = picturesList[n].likes;
  clonedPicture.querySelector('.picture__comments').textContent = picturesList[n].comments.length;
  return clonedPicture;
};

var renderPicturesList = function () {
  for (var i = 0; i < picturesList.length; i++) {
    fragment.appendChild(getPictureClone(i));
  }
  pictureContainer.appendChild(fragment);
};

getPicturesList();
renderPicturesList();

/* Модуль 3 часть 3 */

var body = document.querySelector('body');
var bigPicture = document.querySelector('.big-picture');
var likesCount = document.querySelector('.likes-count');
var socialСommentСount = document.querySelector('.social__comment-count');
var commentsCount = document.querySelector('.comments-count');
var socialCaption = document.querySelector('.social__caption');
var commentsLoader = document.querySelector('.comments-loader');
var socialCommentsList = document.querySelector('.social__comments');
var socialComment = document.querySelector('.social__comment');
var listPictures = document.querySelectorAll('.picture');
var bigPictureClose = document.querySelector('#picture-cancel');

var toggleHiden = function (elem) {
  elem.classList.toggle('hidden');
};

var toggleModal = function (elem) {
  elem.classList.toggle('modal-open');
};

var renderComment = function (j, i) {
  var newComment = socialComment.cloneNode(true);
  newComment.querySelector('.social__picture').src = picturesList[i].comments[j].avatar;
  newComment.querySelector('.social__picture').alt = picturesList[i].comments[j].name;
  newComment.querySelector('.social__text').textContent = picturesList[i].comments[j].message;
  return newComment;
};

var removeOldComments = function () {
  while (socialCommentsList.firstChild) {
    socialCommentsList.removeChild(socialCommentsList.firstChild);
  }
};

var renderComments = function (i) {
  removeOldComments();
  for (var j = 0; j < picturesList[i].comments.length; j++) {
    socialCommentsList.appendChild(renderComment(j, i));
  }
};

var setBigPictureData = function (i) {
  bigPicture.querySelector('img').src = picturesList[i].url;
  likesCount.textContent = picturesList[i].likes;
  commentsCount.textContent = picturesList[i].comments.length;
  socialCaption.textContent = picturesList[i].description;
  showBigPicture(i);
};

var showBigPicture = function (i) {
  toggleHiden(bigPicture);
  toggleModal(body);
  socialСommentСount.classList.add('hidden'); /* если использовать toggle по аналогии с bigPicture, то в четных картинках он переключается сам и отрисовывает скрытые поля*/
  commentsLoader.classList.add('hidden');
  renderComments(i);
  document.addEventListener('keydown', onShowBigPictureEscPress);
};

var setClicklistPictures = function () {
  for (var i = 0; i < listPictures.length; i++) {
    (function (j) {
      listPictures[j].onclick = function () {
        setBigPictureData(j);
      };
    })(i);
  }
};

bigPictureClose.addEventListener('click', function () {
  closeBigPicture();
});

var closeBigPicture = function () {
  toggleHiden(bigPicture);
  toggleModal(body);
  document.removeEventListener('keydown', onShowBigPictureEscPress);
};

var onShowBigPictureEscPress = function (evt) {
  evt.preventDefault();
  if (evt.key === ESCAPE) {
    closeBigPicture();
  }
};

setClicklistPictures();

/* разделение кода 4-го модуля. */

var MAX_HASHTAGE_LENGTH = 20;
var MAX_HASHTAGE_AMOUNT = 5;
var MAX_SIZE_PICTURE = 100;
var MIN_SIZE_PICTURE = 25;
var STEP_SIZE_PICTURE = 25;
var DEFAULT_SLIDER_VALUE = 100;
var BLUR_VALUE = 3;
var BRIGHTNESS_VALUE = 3;
var ESCAPE = 'Escape';
var MAX_COMMENT_LENGTH = 140;

var uploadForm = document.querySelector('#upload-file');
var formEditPicture = document.querySelector('.img-upload__overlay');
var buttonUploadCancel = document.querySelector('#upload-cancel');
var sliderDeepEffect = document.querySelector('.effect-level__pin');
var effectLevel = document.querySelector('.effect-level__value');
var effectLevelLine = document.querySelector('.effect-level__depth');
var scaleControlSmaller = document.querySelector('.scale__control--smaller');
var scaleControlBigger = document.querySelector('.scale__control--bigger');
var scaleControl = document.querySelector('.scale__control--value');
var fieldsetDeepEffect = document.querySelector('.img-upload__effect-level');

var imgUploadPreview = document.querySelector('.img-upload__preview');
var effectsList = document.querySelector('.effects__list');
var effectsListType = document.querySelectorAll('input[type="radio"]');

var hashtagsInput = document.querySelector('.text__hashtags');
var hashtagRe = /^#[a-zа-я0-9]{1,20}$/;

var uploadTextDescription = document.querySelector('.text__description');


var validatedComment = function () {
  if (uploadTextDescription.value.length > MAX_COMMENT_LENGTH) {
    return uploadTextDescription.setCustomValidity('Комментарий может содержать не больше ' + MAX_COMMENT_LENGTH + ' симв.');
  }
  return '';
};

uploadTextDescription.addEventListener('input', function () {
  validatedComment();
});

var validatedHashTags = function (value) {
  var hashtagsList = value.trim().toLowerCase().split(/\s+/);
  if (hashtagsList.length <= MAX_HASHTAGE_AMOUNT) {
    for (var i = 0; i < hashtagsList.length; i++) {
      if (hashtagsList[i][0] !== '#') {
        return 'ХешТег должен начинаться с решётки - "#"';
      }
      if (!hashtagsList[i].length === 1) {
        return 'ХешТег не должен содержать всебе только решётку - "#"';
      }
      if (hashtagsList[i].length > MAX_HASHTAGE_LENGTH) {
        return 'Длина ХешТега не может быть больше ' + MAX_HASHTAGE_LENGTH + ' символов! Удалите лишние ' + (hashtagsList[i].length - MAX_HASHTAGE_LENGTH) + ' симв.';
      }
      if (!hashtagRe.test(hashtagsList[i])) {
        return 'Используются недопустимые символы, строка после решётки "#" должна состоять из букв и чисел';
      }
    }
  } else {
    return 'Можно использовать не больше ' + MAX_HASHTAGE_AMOUNT + ' #!';
  }
  return '';
};

hashtagsInput.addEventListener('input', function (evt) {
  hashtagsInput.setCustomValidity(validatedHashTags(evt.target.value));
});

effectsList.addEventListener('click', function () {
  for (var i = 0; i < effectsListType.length; i++) {
    if (effectsListType[i].checked) {
      setVisibleEffectLine(effectsListType[i].value);
      setSliderDefaultPosition();
      setFilterStyle(effectsListType[i].value);
    }
  }
});

var setVisibleEffectLine = function (filterType) {
  if (filterType === 'none') {
    fieldsetDeepEffect.classList.add('hidden');
  } else {
    fieldsetDeepEffect.classList.remove('hidden');
    setSliderDefaultPosition();
  }
};

var setFilterStyle = function (filterType) {
  switch (filterType) {
    case 'none':
      imgUploadPreview.style.filter = 'none';
      break;
    case 'chrome':
      imgUploadPreview.style.filter = 'grayscale(' + effectLevel.value / 100 + ')';
      break;
    case 'sepia':
      imgUploadPreview.style.filter = 'sepia(' + effectLevel.value / 100 + ')';
      break;
    case 'marvin':
      imgUploadPreview.style.filter = 'invert(' + effectLevel.value + '%)';
      break;
    case 'phobos':
      imgUploadPreview.style.filter = 'blur(' + (effectLevel.value / 100) * BLUR_VALUE + 'px)';
      break;
    case 'heat':
      imgUploadPreview.style.filter = 'brightness(' + (effectLevel.value / 100) * BRIGHTNESS_VALUE + ')';
      break;

    default:
      break;
  }
};

uploadForm.addEventListener('change', function () {
  if (uploadForm.value) {
    openUploadForm();
  }
});

scaleControlSmaller.addEventListener('click', function () {
  if (parseInt(scaleControl.value, 10) > MIN_SIZE_PICTURE) {
    getResizePicture();
  }
});

scaleControlBigger.addEventListener('click', function (sign) {
  if (parseInt(scaleControl.value, 10) < MAX_SIZE_PICTURE) {
    getResizePicture(sign);
  }
});

var getResizePicture = function (sign) {
  if (sign) {
    scaleControl.value = parseInt(scaleControl.value, 10) + STEP_SIZE_PICTURE + '%';
  } else {
    scaleControl.value = parseInt(scaleControl.value, 10) - STEP_SIZE_PICTURE + '%';
  }
  setSizeValue(scaleControl.value);
};

var setSizeValue = function (sizeValue) {
  imgUploadPreview.style.transform = 'scale(' + parseInt(sizeValue, 10) / 100 + ')';
};

var setSliderDefaultPosition = function () {
  effectLevel.value = DEFAULT_SLIDER_VALUE;
  sliderDeepEffect.style.left = effectLevel.value + '%';
  effectLevelLine.style.width = effectLevel.value + '%';
};

sliderDeepEffect.addEventListener('mouseup', function () {});

buttonUploadCancel.addEventListener('click', function () {
  closeUploadForm();
});

var onUploadFormEscPress = function (evt) {
  if (evt.key === ESCAPE) {
    if (hashtagsInput !== document.activeElement || uploadTextDescription !== document.activeElement) {
      evt.preventDefault();
      closeUploadForm();
    }
  }
};

var closeUploadForm = function () {
  formEditPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadForm.value = '';
  document.removeEventListener('keydown', onUploadFormEscPress);
};

var openUploadForm = function () {
  formEditPicture.classList.remove('hidden');
  fieldsetDeepEffect.classList.add('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onUploadFormEscPress);
};
