'use strict';

(function () {

  var ESCAPE = 'Escape';
  var DEFAULT_COMMENTS_RENDER = 5;
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

  var showComments = 5;
  var currentPicture = null;

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

  var setNewComments = function () {
    showComments += DEFAULT_COMMENTS_RENDER;
    renderComments(currentPicture);
    return;
  };
  commentsLoader.addEventListener('click', setNewComments);

  var renderComments = function (i) {
    removeOldComments();
    currentPicture = i;
    for (var j = 0; j < Math.min(showComments, window.picturesArray[i].comments.length); j++) {
      socialCommentsList.appendChild(renderComment(j, i));
    }
    if (showComments >= window.picturesArray[i].comments.length) {
      commentsLoader.classList.add('hidden');
    } else {
      commentsLoader.classList.remove('hidden');
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
    showComments = 5;
    toggleHiden(bigPicture);
    toggleModal(body);
    socialСommentСount.classList.add('hidden');

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
    setBigPictureData: setBigPictureData,
  };

})();
