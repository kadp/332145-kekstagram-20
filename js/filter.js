'use strict';

(function () {
  var RANDOM_PICTURES = 10;

  var filterDefault = document.querySelector('#filter-default');
  var filterRandom = document.querySelector('#filter-random');
  var filterDiscussed = document.querySelector('#filter-discussed');


  var clearAllStateButton = function () {
    filterDefault.classList.remove('img-filters__button--active');
    filterRandom.classList.remove('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
  };

  var setActiveButton = function (button) {
    button.classList.add('img-filters__button--active');
  };

  var onRenderRandomClick = function () {
    clearAllStateButton();
    setActiveButton(filterRandom);
    window.render.picture(getRandomElementsFromArray(window.pictures, RANDOM_PICTURES));
  };

  var getRandomElementsFromArray = function (array, quantityElements) {
    var copiedArray = array.slice();
    var arrayWithRandomElements = [];

    for (var i = 0;
      (i < quantityElements) && (i < copiedArray.length); i++) {
      var r = Math.floor(Math.random() * (copiedArray.length - i)) + i;
      var temporary = copiedArray[r];
      copiedArray[r] = copiedArray[i];
      copiedArray[i] = temporary;
      arrayWithRandomElements.push(temporary);
    }
    return arrayWithRandomElements;
  };

  var onRenderDefaultClick = function () {
    clearAllStateButton();
    setActiveButton(filterDefault);
    window.render.picture(window.pictures);
  };

  var onRenderDiscussedClick = function () {
    var nextPictures = window.pictures.slice();
    nextPictures.sort(function (left, right) {
      return right.comments.length - left.comments.length;
    });
    clearAllStateButton();
    setActiveButton(filterDiscussed);
    window.render.picture(nextPictures);
  };

  filterDefault.addEventListener('click', window.debounce(onRenderDefaultClick));
  filterRandom.addEventListener('click', window.debounce(onRenderRandomClick));
  filterDiscussed.addEventListener('click', window.debounce(onRenderDiscussedClick));

})();
