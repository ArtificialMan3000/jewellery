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
      // gallery.masonry = new Shuffle( gallery.element, {
      //   // options
      //   itemSelector: '.gallery__item',
      //   columnWidth: 1,
      //   // gutterWidth: 30
      // });
      gallery.masonry = new Masonry(gallery.element, {
        // options
        itemSelector: '.gallery__item',
        columnWidth: 1,
        percentPosition: true,
        initLayout: false
      });
      imagesLoaded(gallery.element, function () {
        gallery.masonry.layout();
      });
      // gallery.masonry.imagesLoaded().progress(function () {
      //   gallery.masonry.masonry();
      // })
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
