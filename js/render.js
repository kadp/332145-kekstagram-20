'use strict';

(function () {

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var pictureContainer = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();

  var getPictureClone = function (inD) {
    var clonedPicture = pictureTemplate.cloneNode(true);
    clonedPicture.querySelector('img').src = inD.url;
    clonedPicture.querySelector('.picture__likes').textContent = inD.likes;
    clonedPicture.querySelector('.picture__comments').textContent = inD.comments.length;
    return clonedPicture;
  };

  var removeOldPictures = function () {
    var allPictures = pictureContainer.querySelectorAll('.picture');
    allPictures.forEach(function (picture) {
      pictureContainer.removeChild(picture);
    });
  };

  var renderPicturesList = function (loadData) {
    removeOldPictures();
    for (var z = 0; z < loadData.length; z++) {
      fragment.appendChild(getPictureClone(loadData[z]));
    }
    pictureContainer.appendChild(fragment);
    window.gallery.setClicklistPictures(loadData);
  };


  window.render = {
    picture: renderPicturesList
  };


})();
