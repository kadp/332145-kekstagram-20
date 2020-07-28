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
    newComment.querySelector('.social__picture').src = window.pictures[i].comments[j].avatar;
    newComment.querySelector('.social__picture').alt = window.pictures[i].comments[j].name;
    newComment.querySelector('.social__text').textContent = window.pictures[i].comments[j].message;
    return newComment;
  };

  var removeOldComments = function () {
    while (socialCommentsList.firstChild) {
      socialCommentsList.removeChild(socialCommentsList.firstChild);
    }
  };

  var onCommentsLoaderClick = function () {
    showComments += DEFAULT_COMMENTS_RENDER;
    renderComments(currentPicture);
    return;
  };
  commentsLoader.addEventListener('click', onCommentsLoaderClick);

  var renderComments = function (i) {
    removeOldComments();
    currentPicture = i;
    for (var j = 0; j < Math.min(showComments, window.pictures[i].comments.length); j++) {
      socialCommentsList.appendChild(renderComment(j, i));
    }
    if (showComments >= window.pictures[i].comments.length) {
      commentsLoader.classList.add('hidden');
    } else {
      commentsLoader.classList.remove('hidden');
    }
  };

  var setBigPictureData = function (i) {
    bigPicture.querySelector('img').src = window.pictures[i].url;
    likesCount.textContent = window.pictures[i].likes;
    commentsCount.textContent = window.pictures[i].comments.length;
    socialCaption.textContent = window.pictures[i].description;
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
