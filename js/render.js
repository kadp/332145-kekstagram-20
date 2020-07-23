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


  var renderPicturesList = function (inData) {
    for (var z = 0; z < inData.length; z++) {
      fragment.appendChild(getPictureClone(inData[z]));
    }
    pictureContainer.appendChild(fragment);
    window.gallery.setClicklistPictures();
  };


  window.render = {
    picture: renderPicturesList
  };


})();
