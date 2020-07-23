'use strict';

(function () {

  var ESCAPE = 'Escape';
  var body = document.querySelector('body');
  var bigPicture = document.querySelector('.big-picture');
  var likesCount = document.querySelector('.likes-count');
  var socialСommentСount = document.querySelector('.social__comment-count');
  var commentsCount = document.querySelector('.comments-count');
  var socialCaption = document.querySelector('.social__caption');
  var commentsLoader = document.querySelector('.comments-loader');
  var socialCommentsList = document.querySelector('.social__comments');
  var socialComment = document.querySelector('.social__comment');
  var bigPictureClose = document.querySelector('#picture-cancel');

  var toggleHiden = function (elem) {
    elem.classList.toggle('hidden');
  };

  var toggleModal = function (elem) {
    elem.classList.toggle('modal-open');
  };

  var renderComment = function (j, i) {
    var newComment = socialComment.cloneNode(true);
    newComment.querySelector('.social__picture').src = window.picturesArray[i].comments[j].avatar;
    newComment.querySelector('.social__picture').alt = window.picturesArray[i].comments[j].name;
    newComment.querySelector('.social__text').textContent = window.picturesArray[i].comments[j].message;
    return newComment;
  };

  var removeOldComments = function () {
    while (socialCommentsList.firstChild) {
      socialCommentsList.removeChild(socialCommentsList.firstChild);
    }
  };

  var renderComments = function (i) {
    removeOldComments();
    for (var j = 0; j < window.picturesArray[i].comments.length; j++) {
      socialCommentsList.appendChild(renderComment(j, i));
    }
  };

  var setBigPictureData = function (i) {
    bigPicture.querySelector('img').src = window.picturesArray[i].url;
    likesCount.textContent = window.picturesArray[i].likes;
    commentsCount.textContent = window.picturesArray[i].comments.length;
    socialCaption.textContent = window.picturesArray[i].description;
    showBigPicture(i);
  };

  var showBigPicture = function (i) {
    toggleHiden(bigPicture);
    toggleModal(body);
    socialСommentСount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    renderComments(i);
    document.addEventListener('keydown', onShowBigPictureEscPress);
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
      evt.preventDefault();
      closeBigPicture();
    }
  };

  window.preview = {
    setBigPictureData: setBigPictureData
  };

})();
