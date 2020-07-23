'use strict';

(function () {

  var URL = 'https://javascript.pages.academy/kekstagram/data';

  var loadDataHandler = function (data) {
    window.render.picture(data);
    window.picturesArray = data;
  };

  window.load(URL, loadDataHandler);

})();
