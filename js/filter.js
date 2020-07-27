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

  var setActiveButton = function (bth) {
    bth.classList.add('img-filters__button--active');
  };

  var renderRandom = function () {
    var nextPictures = window.picturesArray.slice();
    nextPictures.sort(function () {
      return Math.random() - 0.5;
    });
    nextPictures = nextPictures.slice(0, 10);
    clearAllStateButton();
    setActiveButton(filterRandom);
    window.render.picture(nextPictures);
  };

  var renderDefault = function () {
    clearAllStateButton();
    setActiveButton(filterDefault);
    window.render.picture(window.picturesArray);
  };

  var renderDiscussed = function () {
    var nextPictures = window.picturesArray.slice();
    nextPictures.sort(function (left, right) {
      return right.comments.length - left.comments.length;
    });
    clearAllStateButton();
    setActiveButton(filterDiscussed);
    window.render.picture(nextPictures);
  };

  filterDefault.addEventListener('click', window.debounce(renderDefault));
  filterRandom.addEventListener('click', window.debounce(renderRandom));
  filterDiscussed.addEventListener('click', window.debounce(renderDiscussed));

})();
