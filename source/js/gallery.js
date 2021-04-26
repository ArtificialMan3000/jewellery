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
        initLayout: false,
      });
      orderItems();
      imagesLoaded(gallery.element, function () {
        gallery.masonry.layout();
      });
    };

    // Упорядочивает элементы галереи для мобильной версии
    var orderForMobile = function () {
      var item3 = gallery.element.querySelector('.gallery__item--3');
      var item7 = gallery.element.querySelector('.gallery__item--7');
      gallery.element.insertBefore(item7, item3);
    };

    // Упорядочивает элементы галереи для десктопной версии
    var orderForDesktop = function () {
      var item7 = gallery.element.querySelector('.gallery__item--7');
      gallery.element.append(item7);
    };

    // Упорядочивает элементы галереи в зависимости от медиа условий
    var orderItems = function () {
      if (window.mediaQuery.mqls.mobile.matches) {
        orderForMobile();
      } else {
        orderForDesktop();
      }
      gallery.masonry.reloadItems();
    };

    gallery.initGallery = function () {
      gallery.createMasonryGallery();
      window.mediaQuery.watchMedia(['mobile'], orderItems);
    };

    return gallery;
  };

  return {
    createGalleryInstance: createGalleryInstance
  };
})();
