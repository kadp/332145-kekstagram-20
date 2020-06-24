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

//Временный комментарий - разделение кода 4-го модуля.

var uploadForm = document.querySelector('#upload-file');
var body = document.querySelector('body');
var formEditPicture = document.querySelector('.img-upload__overlay');
var buttonUploadCancel = document.querySelector('#upload-cancel');
var sliderDeepEffect = document.querySelector('.effect-level__pin');
var effectLevel = document.querySelector('.effect-level__value');
var effectLevelLine = document.querySelector('.effect-level__depth');
var scaleControlSmaller = document.querySelector('.scale__control--smaller');
var scaleControlBigger = document.querySelector('.scale__control--bigger');
var scaleControlValue = document.querySelector('.scale__control--value');
var fieldsetDeepEffect = document.querySelector('.img-upload__effect-level');

var imgUploadPreview = document.querySelector('.img-upload__preview');
var effectsList = document.querySelector('.effects__list');
var effectsListType = document.querySelectorAll('input[type="radio"]');

var MIN_HASHTAG_LENGTH = 2;
var MAX_HASHTAGE_LENGTH = 20;
var MAX_HASHTAGE_AMOUNT = 5;
var hashtagRe = /^#[a-zа-яA-ZА-Я0-9]*$/gm;

var hashtagsInput = document.querySelector('.text__hashtags');
var uploadSubmitButton = document.querySelector('#upload-submit');

hashtagsInput.addEventListener('invalid', function () {
  if (hashtagsInput.validity.tooShort) {
    hashtagsInput.setCustomValidity('ХэшТег должен состоять минимум из 2-х символов');
  } else if (hashtagsInput.validity.tooLong) {
    hashtagsInput.setCustomValidity('ХэшТег не должен превышать 20-ти символов, включая #');
  } else {
    hashtagsInput.setCustomValidity('');
  }
});

// код данной функции можно просто добавить как еще одна веттка else if на 'invalid'?
var validateHashtags = function () {
  var hashtagsArray = hashtagsInput.value.split(' ', 5);
  if (hashtagsArray.length > MAX_HASHTAGE_AMOUNT) {
    hashtagsInput.setCustomValidity('ХешТэгов не может быть больше ' + MAX_HASHTAGE_AMOUNT);
  } else {
    for (var i = 0; i < hashtagsArray.length; i++) {
      hashtagRe.exec(hashtagsArray[i]);
    }
  }
};

uploadSubmitButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  if (validateHashtags()) {
    console.log('ok');
  } else {
    console.log('bad');
  }

});

hashtagsInput.addEventListener('input', function () {
  var valueLength = hashtagsInput.value.length;

  if (valueLength < MIN_HASHTAG_LENGTH) {
    hashtagsInput.setCustomValidity('Ещё ' + (MIN_HASHTAG_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_HASHTAGE_LENGTH) {
    hashtagsInput.setCustomValidity('Удалите лишние ' + (valueLength - MIN_HASHTAG_LENGTH) + ' симв.');
  } else {
    hashtagsInput.setCustomValidity('');
  }

});

effectsList.addEventListener('click', function () {
  for (var i = 0; i < effectsListType.length; i++) {
    if (effectsListType[i].checked) {
      fieldsetDeepEffect.classList.remove('hidden');
      switch (effectsListType[i].value) {
        case 'none':
          fieldsetDeepEffect.classList.add('hidden');
          imgUploadPreview.style.filter = 'none';
          break;
        case 'chrome':
          imgUploadPreview.style.filter = 'grayscale(' + effectLevel.value + '%)';
          setSliderDefaultPosition();
          break;
        case 'sepia':
          imgUploadPreview.style.filter = 'sepia(100%)';
          setSliderDefaultPosition();
          break;
        case 'marvin':
          imgUploadPreview.style.filter = 'invert(' + effectLevel.value + '%)';
          setSliderDefaultPosition();
          break;
        case 'phobos':
          imgUploadPreview.style.filter = 'blur(10px)';
          setSliderDefaultPosition();
          break;
        case 'heat':
          imgUploadPreview.style.filter = 'brightness(' + effectLevel.value / 100 + ')';
          setSliderDefaultPosition();
          break;

        default:
          break;
      }
    }
  }
});

uploadForm.addEventListener('change', function () {
  if (uploadForm.value) {
    openUploadForm();
  }
});

scaleControlSmaller.addEventListener('click', function () {
  if (parseInt(scaleControlValue.value, 10) > 25) {
    scaleControlValue.value = parseInt(scaleControlValue.value, 10) - 25 + '%';
    imgUploadPreview.style.transform = 'scale(' + parseInt(scaleControlValue.value, 10) / 100 + ')';
  }
});

scaleControlBigger.addEventListener('click', function () {
  if (parseInt(scaleControlValue.value, 10) < 100) {
    scaleControlValue.value = parseInt(scaleControlValue.value, 10) + 25 + '%';
    imgUploadPreview.style.transform = 'scale(' + parseInt(scaleControlValue.value, 10) / 100 + ')';
  }
});

var setSliderDefaultPosition = function () {
  effectLevel.value = parseInt(effectLevel.value, 10);
  sliderDeepEffect.style.left = effectLevel.value + '%';
  effectLevelLine.style.width = effectLevel.value + '%';
};

sliderDeepEffect.addEventListener('mouseup', function () {
  effectLevel.value = parseInt(effectLevel.value, 10);
  if (effectLevel.value > 0) {
    effectLevel.value -= 20;
    sliderDeepEffect.style.left = effectLevel.value + '%';
    effectLevelLine.style.width = effectLevel.value + '%';
  }
});

buttonUploadCancel.addEventListener('click', function () {
  closeUploadForm();
});

var onUploadFormEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeUploadForm();
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
