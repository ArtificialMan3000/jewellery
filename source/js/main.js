'use strict';

// Главный модуль
window.main = (function () {
  // Инициализируем главное меню
  window.menu.initMainMenu();

  // Инициализируем фильтр
  window.filter.initFilter();

  // Инициализируем аккордеон
  window.accordion.initAccordion();

  // Инициализируем модальные окна
  var loginModalElement = document.querySelector('#login_modal');
  var cartModalElement = document.querySelector('#cart_modal');
  if (loginModalElement) {
    var loginModal = window.modal.createModal(loginModalElement, 'login_email');
    loginModal.initModal();
  }
  if (cartModalElement) {
    var cartModal = window.modal.createModal(cartModalElement);
    cartModal.initModal();
  }

  // Инициализируем хранение данных формы
  var loginForm = document.querySelector('#login_form');
  window.formStorage.initFormStorage(loginForm, ['login-email']);

  // Инициализируем слайдер
  var productSlider = window.slider.createSliderInstance('.products-slider');
  productSlider.initSlider();

  // Инициализирует галерею
  var galleryElem = document.querySelector('.gallery__list');
  var galleryMasonry = window.gallery.createGalleryInstance(galleryElem);
  galleryMasonry.initGallery();

  return {
    productSlider: productSlider
  }
})();
