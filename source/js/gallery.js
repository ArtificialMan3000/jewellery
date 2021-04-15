'use strict';

// Модуль галереи
window.gallery = (function () {
  // Создаёт экземпляр галереи
  var createGalleryInstance = function (elem) {
    var gallery = {};

    if (!elem) {
      return false;
    }
    gallery.element = elem;
    // Экземпляр галереи Masonry
    gallery.masonry = null;
    gallery.createMasonryGallery = function () {
      gallery.masonry = new Masonry(gallery.element, {
        itemSelector: '.gallery__item',
        columnWidth: 1,
        percentPosition: true,
        initLayout: false
      });
      imagesLoaded(gallery.element, function () {
        gallery.masonry.layout();
      });
    };

    gallery.initGallery = function () {
      gallery.createMasonryGallery();
    };

    return gallery;
  };

  return {
    createGalleryInstance: createGalleryInstance
  };
})();
