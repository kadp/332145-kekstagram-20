'use strict';

(function () {

  var loadDataHandler = function (data) {
    window.render.picture(data);
    window.picturesArray = data;
  };

  window.load(loadDataHandler);

})();
