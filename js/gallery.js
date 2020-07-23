'use strict';

(function () {

  var setClicklistPictures = function () {
    var listPictures = document.querySelectorAll('.picture');
    for (var i = 0; i < listPictures.length; i++) {
      (function (j) {
        listPictures[j].addEventListener('click', function () {
          window.preview.setBigPictureData(j);
        });
      })(i);
    }
  };

  window.gallery = {
    setClicklistPictures: setClicklistPictures
  };

})();
