'use strict';

// Модуль главного меню
window.menu = (function () {
  // Хедер
  var pageHeader = document.querySelector('.page-header');
  // Главное меню
  if (pageHeader) {
    var mainMenu = pageHeader.querySelector('.main-menu');
  }
  // Кнопка "бургер"
  if (pageHeader) {
    var burger = pageHeader.querySelector('.burger');
  }
  // Пункты меню
  if (mainMenu) {
    var menuLinks = mainMenu.querySelectorAll('.main-menu__link');
  }

  // Прячет меню
  var closeMainMenu = function () {
    document.body.classList.remove('body-no-scroll');
    if (burger) {
      burger.classList.remove('burger--white');
    }
    if (mainMenu) {
      mainMenu.classList.remove('main-menu--show');
    }
    if (pageHeader) {
      pageHeader.classList.remove('page-header--menu-open');
      pageHeader.classList.remove('page-header--absolute');
    }

    // Удаляем с пунктов меню обработчик для закрытия меню
    if (menuLinks) {
      for (var i = 0; menuLinks.length > i; i++) {
        menuLinks[i].removeEventListener('click', menuLinksClickHandler);
      }
    }
  };

  // Открывает меню
  var openMainMenu = function () {
    document.body.classList.add('body-no-scroll');
    if (burger) {
      burger.classList.add('burger--white');
    }
    if (mainMenu) {
      mainMenu.classList.add('main-menu--show');
    }
    if (pageHeader) {
      pageHeader.classList.add('page-header--menu-open');
      pageHeader.classList.add('page-header--absolute');
    }
    window.scroll(0, 0);

    // Вешаем на пункты меню обработчик для закрытия меню
    if (menuLinks) {
      for (var i = 0; menuLinks.length > i; i++) {
        menuLinks[i].addEventListener('click', menuLinksClickHandler);
      }
    }
  };

  // Обработчик клика на бургер
  var burgerClickHandler = function (evt) {
    evt.preventDefault();
    if (burger) {
      if (burger.classList.contains('burger--white')) {
        closeMainMenu();
      } else {
        openMainMenu();
      }
    }
  };

  // Обработчик клика на пункты меню
  var menuLinksClickHandler = function () {
    closeMainMenu();
  };

  // Инициализирует модуль
  var initMainMenu = function () {
    // Прячем меню
    closeMainMenu();
    // Вешаем на бургер обработчик для открытия и закрытия меню
    if (burger) {
      burger.addEventListener('click', burgerClickHandler);
    }
  };

  return {
    initMainMenu: initMainMenu
  };
})();
