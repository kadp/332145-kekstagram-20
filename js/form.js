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
  var DEFAULT_SIZE = 100;

  var body = document.querySelector('body');
  var uploadForm = document.querySelector('#upload-file');
  var formEditPicture = document.querySelector('.img-upload__overlay');
  var buttonUploadCancel = document.querySelector('#upload-cancel');
  var sliderDeepEffect = document.querySelector('.effect-level__pin');
  var effectLevel = document.querySelector('.effect-level__value');
  var effectLevelDepth = document.querySelector('.effect-level__line');
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

  var inputUpload = document.querySelector('#upload-file');
  var imgUpload = document.querySelector('.imgUpload');
  var form = document.querySelector('#upload-select-image');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  // var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');

  form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), function () {
      closeUploadForm();
      sendMessageHandler();
    });
    evt.preventDefault();
  });

  var sendMessageHandler = function () {
    main.appendChild(successTemplate);
    document.addEventListener('keydown', onSendMessageEscPress);
    onSendMessageClick();
  };

  var onSendMessageEscPress = function (evt) {
    if (evt.key === ESCAPE) {
      var success = document.querySelector('.success');
      main.removeChild(success);
      document.removeEventListener('keydown', onSendMessageEscPress);
    }
  };
  // обработчик ниже, не удаляется, копится.
  var onSendMessageClick = function () {
    var success = document.querySelector('.success');
    success.addEventListener('click', function () {
      main.removeChild(success);
      document.removeEventListener('keydown', onSendMessageEscPress);
    });
  };

  var setUploadPicture = function () {
    var uploadFile = inputUpload.files[0];
    if (uploadFile) {
      imgUpload.src = URL.createObjectURL(uploadFile);
      localStorage.setItem('uploadImg', imgUpload.src);
    }
    imgUpload.src = localStorage.getItem('uploadImg');
  };

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
    var valueEffect = effectLevel.value;
    for (var i = 0; i < effectsListType.length; i++) {
      if (effectsListType[i].checked) {
        setVisibleEffectLine(effectsListType[i].value);
        setSliderDefaultPosition();
        setFilterStyle(effectsListType[i].value, valueEffect);
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

  var setFilterStyle = function (filterType, valueEffect) {
    switch (filterType) {
      case 'none':
        imgUploadPreview.style.filter = 'none';
        break;
      case 'chrome':
        imgUploadPreview.style.filter = 'grayscale(' + valueEffect / 100 + ')';
        break;
      case 'sepia':
        imgUploadPreview.style.filter = 'sepia(' + valueEffect / 100 + ')';
        break;
      case 'marvin':
        imgUploadPreview.style.filter = 'invert(' + valueEffect + '%)';
        break;
      case 'phobos':
        imgUploadPreview.style.filter = 'blur(' + (valueEffect / 100) * BLUR_VALUE + 'px)';
        break;
      case 'heat':
        imgUploadPreview.style.filter = 'brightness(' + (valueEffect / 100) * BRIGHTNESS_VALUE + ')';
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
    form.reset();
    document.removeEventListener('keydown', onUploadFormEscPress);
  };

  var openUploadForm = function () {
    formEditPicture.classList.remove('hidden');
    fieldsetDeepEffect.classList.add('hidden');
    body.classList.add('modal-open');
    setSizeValue(DEFAULT_SIZE);
    setUploadPicture();
    document.addEventListener('keydown', onUploadFormEscPress);
  };

  sliderDeepEffect.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startX = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = startX - moveEvt.clientX;
      startX = moveEvt.clientX;
      var newX = sliderDeepEffect.offsetLeft - shift;
      if (newX >= 0 && newX <= effectLevelDepth.offsetWidth) {
        sliderDeepEffect.style.left = newX + 'px';
        effectLevelLine.style.width = newX + 'px';
        effectLevel.value = Math.round(newX / (effectLevelDepth.offsetWidth / 100));
        for (var i = 0; i < effectsListType.length; i++) {
          if (effectsListType[i].checked) {
            setFilterStyle(effectsListType[i].value, effectLevel.value);
          }
        }
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
