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
    // Элемент паджинации
    slider.pagination = null;
    // Элемент списка номеров страниц
    slider.paginationList = null;
    // Массив элементов пунктов списка с номерами страниц
    slider.paginationItems = [];
    // Массив элементов кнопок с номерами страниц
    slider.paginationButtons = [];
    // Количество страниц
    slider.paginationCount = null;

    // Создаёт сладер с помощью библиотеки Splide
    slider.createSplideSlider = function () {
      slider.splide = new Splide (slider.element, {
        perPage: 4,
        keyboard: 'focused',
        width: '100%',
        // fixedWidth: '22.5%',
        // gap: '2.56%',
        gap: 30,
        breakpoints: {
          1023: {
            perPage: 2,
            // gap: '4.42%'
          },
          767: {
            perPage: 2,
            // gap: '10.34%'
          }
        },
        // autoWidth: true,
        pagination: false
      });
      slider.splide.mount();
    };

    // Добавляет обработчики событий в паджинацию
    slider.addPaginationEventHandlers = function () {
      // var buttons = paginationElem.querySelectorAll('.products-slider__pages-button');

      for (var i = 0; i < slider.paginationButtons.length; i++) {
        var paginationButton = slider.paginationButtons[i];
        var addButtonClickHandler = function (i) {
          paginationButton.addEventListener('click', function () {
            slider.splide.go('>' + i);
          });
        };

        addButtonClickHandler(i);
      }

      var paginationButtons = slider.paginationButtons;
      var splide = slider.splide;
      slider.splide.on('moved', function (newIndex, oldIndex) {
        var newPage = Math.floor(newIndex / splide.options.perPage);
        var oldPage = Math.floor(oldIndex / splide.options.perPage);
        paginationButtons[oldPage].classList.remove('products-slider__pages-button--current');
        paginationButtons[newPage].classList.add('products-slider__pages-button--current');
      });
    };

    // Генерирует элементы паджинации для слайдера
    slider.generatePagination = function () {
      slider.pagination = document.createDocumentFragment();
      // Список номеров страниц
      slider.paginationList = document.createElement('ul');
      slider.paginationList.classList.add('products-slider__pages-list');
      slider.pagination.appendChild(slider.paginationList);

      // Количество страниц
      slider.paginationCount = Math.ceil(slider.splide.length / slider.splide.options.perPage);

      // Добавляем пункты в список страниц
      for (var i = 0; i < slider.paginationCount; i++) {
        // Пункт номера страницы
        var paginationItem = document.createElement('li');
        paginationItem.classList.add('products-slider__pages-item');
        slider.paginationItems.push(paginationItem);

        // Кнопка с номером
        var paginationButton = document.createElement('button');
        paginationButton.classList.add('products-slider__pages-button');
        if (slider.splide.index === i) {
          paginationButton.classList.add('products-slider__pages-button--current');
        }
        paginationButton.innerText = i + 1;
        slider.paginationButtons.push(paginationButton);


        // Вкладываем кнопку в пункт
        paginationItem.appendChild(paginationButton);
        // Добавляем пункт в список
        slider.paginationList.appendChild(paginationItem);
      }
    };

    // Инициализирует слайдер
    slider.initSlider = function () {
      slider.createSplideSlider();
      slider.generatePagination();
      slider.addPaginationEventHandlers();
      slider.element.appendChild(slider.pagination);
    };

    return slider;
  };

  // Заменяет активную кнопку
  // var changeActiveButton = function (oldIndex, newIndex) {
  //   slider.paginationButtons[oldIndex].classList.remove('products-slider__pages-button--current');
  //   slider.paginationButtons[newIndex].classList.add('products-slider__pages-button--current');
  // }

  return {
    createSliderInstance: createSliderInstance
  };
})();
