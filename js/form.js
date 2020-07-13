'use strict';

(function () {

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

  var body = document.querySelector('body');
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
})();
