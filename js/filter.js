'use strict';

(function () {

  var imgFilters = document.querySelector('.img-filters');

  var filterDefault = document.querySelector('#filter-default');
  var filterRandom = document.querySelector('#filter-random');
  var filterDiscussed = document.querySelector('#filter-discussed');

  imgFilters.classList.remove('img-filters--inactive');

  var clearAllStateButton = function () {
    filterDefault.classList.remove('img-filters__button--active');
    filterRandom.classList.remove('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
  };

  var renderRandom = function () {
    var nextPictures = window.picturesArray.slice();
    nextPictures.sort(function () {
      return Math.random() - 0.5;
    });
    nextPictures = nextPictures.slice(0, 10);
    clearAllStateButton();
    filterRandom.classList.add('img-filters__button--active');
    window.render.picture(nextPictures);
  };

  var renderDefault = function () {
    clearAllStateButton();
    filterDefault.classList.add('img-filters__button--active');
    window.render.picture(window.picturesArray);
  };

  var renderDiscussed = function () {
    var nextPictures = window.picturesArray.slice();
    nextPictures.sort(function (left, right) {
      return right.comments.length - left.comments.length;
    });
    clearAllStateButton();
    filterDiscussed.classList.add('img-filters__button--active');
    window.render.picture(nextPictures);
  };
  filterDefault.addEventListener('click', renderDefault);
  filterRandom.addEventListener('click', renderRandom);
  filterDiscussed.addEventListener('click', renderDiscussed);

})();
