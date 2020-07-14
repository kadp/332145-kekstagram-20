'use strict';

(function () {
  var listPictures = document.querySelectorAll('.picture');
  var setClicklistPictures = function () {
    for (var i = 0; i < listPictures.length; i++) {
      (function (j) {
        listPictures[j].onclick = function () {
          window.preview.setBigPictureData(j);
        };
      })(i);
    }
  };
  setClicklistPictures();
})();
