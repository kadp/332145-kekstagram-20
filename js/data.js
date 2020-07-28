'use strict';

(function () {

  var showFilterButtons = function () {
    var imgFilters = document.querySelector('.img-filters');
    imgFilters.classList.remove('img-filters--inactive');
  };

  var onLoadData = function (data) {
    window.render.picture(data);
    window.pictures = data;
    showFilterButtons();
  };

  var onLoadDataError = function () {
    return 'Произошла ошибка';
  };

  window.backend.onRequestLoad(onLoadData, onLoadDataError);

})();
