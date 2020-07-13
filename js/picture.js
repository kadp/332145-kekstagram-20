'use strict';

(function () {

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var pictureContainer = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();

  var getPictureClone = function (n) {
    var clonedPicture = pictureTemplate.cloneNode(true);
    clonedPicture.querySelector('img').src = window.data.picturesList[n].url;
    clonedPicture.querySelector('.picture__likes').textContent = window.data.picturesList[n].likes;
    clonedPicture.querySelector('.picture__comments').textContent = window.data.picturesList[n].comments.length;
    return clonedPicture;
  };

  var renderPicturesList = function () {
    for (var i = 0; i < window.data.picturesList.length; i++) {
      fragment.appendChild(getPictureClone(i));
    }
    pictureContainer.appendChild(fragment);
  };

  renderPicturesList();
})();
