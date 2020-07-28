'use strict';

(function () {

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var pictureContainer = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();

  var getPictureClone = function (picture) {
    var clonedPicture = pictureTemplate.cloneNode(true);
    clonedPicture.querySelector('img').src = picture.url;
    clonedPicture.querySelector('.picture__likes').textContent = picture.likes;
    clonedPicture.querySelector('.picture__comments').textContent = picture.comments.length;
    return clonedPicture;
  };

  var removeOldPictures = function () {
    var allPictures = pictureContainer.querySelectorAll('.picture');
    allPictures.forEach(function (picture) {
      pictureContainer.removeChild(picture);
    });
  };

  var renderPicturesList = function (loadPictures) {
    removeOldPictures();
    for (var i = 0; i < loadPictures.length; i++) {
      fragment.appendChild(getPictureClone(loadPictures[i]));
    }
    pictureContainer.appendChild(fragment);
    window.gallery.setClicklistPictures(loadPictures);
  };

  window.render = {
    picture: renderPicturesList
  };

})();
