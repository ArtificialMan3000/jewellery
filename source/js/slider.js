'use strict';

// Модуль слайдера
window.slider = (function () {

  // Создаёт экземпляр слайдера
  var createSliderInstance = function (sliderSel) {
    var slider = {};
    // Находим элемент слайдера и проверяем его на существование
    slider.element = document.querySelector(sliderSel);
    if (!slider.element) {
      return false;
    }
    // Экземпляр слайдера Splide
    slider.splide = null;
    // Текущее количество пунктов на странице
    slider.perPage = null;
    // Мобильная ли версия
    slider.isMobile = false;


    // ----- Паджинация -----
    // Элемент паджинации
    slider.pagination = null;

    // ----- Для полной версии -----
    // Элемент списка номеров страниц
    slider.paginationList = null;
    // Массив элементов пунктов списка с номерами страниц
    slider.paginationItems = [];
    // Массив элементов кнопок с номерами страниц
    slider.paginationButtons = [];

    // ----- Для мобильной версии -----
    // Элемент мобильной версии
    slider.paginationMobile = null;
    // Элемент с номером текущей страницы
    slider.paginationPageNum = null;
    // Элемент с общим количеством страниц
    slider.paginationPagesTotal = null;


    // Создаёт сладер с помощью библиотеки Splide
    var createSplideSlider = function () {
      slider.splide = new Splide (slider.element, {
        perPage: 4,
        keyboard: 'focused',
        width: '100%',
        gap: 30,
        breakpoints: {
          1023: {
            perPage: 2,
          },
          767: {
            perPage: 2,
          }
        },
        pagination: false
      });
      slider.splide.mount();

      slider.perPage = slider.splide.options.perPage;

      slider.splide.on('updated', function (options) {
        if (options.perPage !== slider.perPage) {
          slider.perPage = options.perPage;
          createPagination();
        }
      });
    };

    // Возвращает количество страниц в слайдере
    var getPagesNum = function () {
      return Math.ceil(slider.splide.length / slider.splide.options.perPage);
    };

    // Возвращает индекс страницы по индексу слайда
    var getPageIndexBySlide = function (slideIndex) {
      return Math.floor(slideIndex / slider.splide.options.perPage);
    };

    // Переключает текущую страницу паджинации
    var toggleCurrentPaginationPage = function (newPage, oldPage) {
      slider.paginationButtons[newPage].classList.add('products-slider__pagination-button--current');
      slider.paginationButtons[oldPage].classList.remove('products-slider__pagination-button--current');
    };

    // Устанавливает номер текущей страницы в мобильной паджинации
    var setMobilePaginationPage = function (newPage) {
      slider.paginationPageNum.innerText = newPage + 1;
    };

    // Добавляет обработчик клика на кнопку паджинации
    var addPaginationButtonClickHandler = function (paginationButton, targetSlideNum) {
      paginationButton.addEventListener('click', function () {
        slider.splide.go('>' + targetSlideNum);
      });
    };

    // Добавляет обработчик движения слайдера
    var addSliderMovedHandler = function () {
      var splide = slider.splide;
      splide.on('moved', function (newIndex, oldIndex) {
        var newPage = getPageIndexBySlide(newIndex);
        var oldPage = getPageIndexBySlide(oldIndex);
        // Переключаем текущую страницу
        if (slider.isMobile) {
          setMobilePaginationPage(newPage);
        } else {
          toggleCurrentPaginationPage(newPage, oldPage);
        }
      });
    };

    // Добавляет обработчики событий в паджинацию
    var addPaginationEventHandlers = function () {
      // Добавляем обработчики клика на каждую кнопку
      for (var i = 0; i < slider.paginationButtons.length; i++) {
        var paginationButton = slider.paginationButtons[i];
        addPaginationButtonClickHandler(paginationButton, i);
      }
    };


    // Создаёт пункт паджинации
    var createPaginationItem = function (pageIndex) {
      // Пункт списка паджинации
      var paginationItem = document.createElement('li');
      paginationItem.classList.add('products-slider__pagination-item');
      slider.paginationItems.push(paginationItem);

      // Кнопка
      var paginationButton = document.createElement('button');
      paginationButton.classList.add('products-slider__pagination-button');
      if (getPageIndexBySlide(slider.splide.index) === pageIndex) {
        paginationButton.classList.add('products-slider__pagination-button--current');
      }
      paginationButton.innerText = pageIndex + 1;
      slider.paginationButtons.push(paginationButton);

      // Вкладываем кнопку в пункт
      paginationItem.appendChild(paginationButton);

      return paginationItem;
    };

    // Создаёт список паджинации
    var createPaginationList = function () {
      // Список номеров страниц
      var paginationList = document.createElement('ul');
      paginationList.classList.add('products-slider__pagination-list');
      return paginationList;
    };

    // Генерирует полную версию элемента паджинации
    var generateFullPagination = function () {
      // Фрагмент паджинации
      var paginationFragment = document.createDocumentFragment();
      // Список паджинации
      slider.paginationList = createPaginationList();

      // Создаём и добавляем пункты в список
      var pagesNum = getPagesNum();
      for (var i = 0; i < pagesNum; i++) {
        // Пункт
        var paginationItem = createPaginationItem(i);
        // Добавляем пункт в список
        slider.paginationList.appendChild(paginationItem);
      }

      slider.pagination = paginationFragment.appendChild(slider.paginationList);
    };

    var createPaginationPageNum = function () {
      var paginationPageNum = document.createElement('span');
      paginationPageNum.classList.add('products-slider__pagination-page-number');
      paginationPageNum.innerText = getPageIndexBySlide(slider.splide.index) + 1;

      return paginationPageNum;
    };

    var createPaginationPagesTotal = function () {
      var paginationPagesTotal = document.createElement('span');
      paginationPagesTotal.classList.add('products-slider__pagination-pages-total');
      paginationPagesTotal.innerText = getPagesNum();

      return paginationPagesTotal;
    };

    var createPaginationMobile = function () {
      var paginationMobile = document.createElement('div');
      paginationMobile.classList.add('products-slider__pagination-indicator');
      return paginationMobile;
    };


    // Генерирует мобильную версию элемента паджинации
    var generateMobilePagination = function () {
      // Фрагмент паджинации
      var paginationFragment = document.createDocumentFragment();
      // Мобильный элемент паджинации
      slider.paginationMobile = createPaginationMobile();
      // Элемент с номером текущей страницы
      slider.paginationPageNum = createPaginationPageNum();
      // Элемент с общим количеством страниц
      slider.paginationPagesTotal = createPaginationPagesTotal();

      slider.paginationMobile.append(slider.paginationPageNum, ' of ', slider.paginationPagesTotal);

      slider.pagination = paginationFragment.appendChild(slider.paginationMobile);
    };

    // Удаляет паджинацию
    var deletePagination = function () {
      if (slider.pagination) {
        slider.pagination.remove();
      }
      slider.paginationList = null;
      slider.paginationItems = [];
      slider.paginationButtons = [];
    };

    // Создаёт паджинацию
    var createPagination = function () {
      // Удаляем существующую паджинацию
      deletePagination();
      // Генерируем элемент паджинации
      if (window.mediaQuery.mqls.mobile.matches) {
        slider.isMobile = true;
        generateMobilePagination();
      } else {
        slider.isMobile = false;
        generateFullPagination();
        // Устанавливаем обработчики событий
        addPaginationEventHandlers();
      }
      // Добавляем обработчик на движение слайдера
      addSliderMovedHandler();
      // Добавляем элемент паджинации в слайдер
      slider.pagination = slider.element.appendChild(slider.pagination);
    };

    // Инициализирует слайдер
    slider.initSlider = function () {
      createSplideSlider();
      createPagination();
      window.mediaQuery.watchMedia(['mobile'], createPagination);
    };

    return slider;
  };

  return {
    createSliderInstance: createSliderInstance,
  };
})();
