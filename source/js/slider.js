'use strict';

// Модуль слайдера
window.slider = (function () {

  // Создаёт экземпляр слайдера
  var createSliderInstance = function (sliderSel) {
    // Находим элемент слайдера и проверяем его на существование
    this.element = document.querySelector(sliderSel);
    if (!this.element) {
      return false;
    }
    // Экземпляр слайдера Splide
    this.splide = null;
    // Элемент паджинации
    this.pagination = null;
    // Элемент списка номеров страниц
    this.paginationList = null;
    // Массив элементов пунктов списка с номерами страниц
    this.paginationItems = [];
    // Массив элементов кнопок с номерами страниц
    this.paginationButtons = [];
    // Количество страниц
    this.paginationCount = null;

    // Создаёт сладер с помощью библиотеки Splide
    this.createSplideSlider = function () {
      this.splide = new Splide (this.element, {
        perPage: 4,
        keyboard: 'focused',
        breakpoints: {
          1023: {
            perPage: 2
          },
          767: {
            perPage: 1
          }
        },
        pagination: false
      });
      this.splide.mount();
    }

    // Добавляет обработчики событий в паджинацию
    this.addPaginationEventHandlers = function () {
      // var buttons = paginationElem.querySelectorAll('.products-slider__pages-button');

      for (var i = 0; i < this.paginationButtons.length; i++) {
        var paginationButton = this.paginationButtons[i];
        var splide = this.splide;
        var addButtonClickHandler = function (i) {
          paginationButton.addEventListener('click', function () {
            splide.go('>' + i);
          });
        }

        addButtonClickHandler(i);
      }

      var paginationButtons = this.paginationButtons;
      var splide = this.splide;
      this.splide.on('moved', function(newIndex, oldIndex) {
        var newPage = Math.floor(newIndex / splide.options.perPage);
        var oldPage = Math.floor(oldIndex / splide.options.perPage);
        paginationButtons[oldPage].classList.remove('products-slider__pages-button--current');
        paginationButtons[newPage].classList.add('products-slider__pages-button--current');
      });
    }

    // Генерирует элементы паджинации для слайдера
    this.generatePagination = function () {
      this.pagination = document.createDocumentFragment();
      // Список номеров страниц
      this.paginationList = document.createElement('ul');
      this.paginationList.classList.add('products-slider__pages-list');
      this.pagination.appendChild(this.paginationList);

      // Количество страниц
      this.paginationCount = Math.ceil(this.splide.length / this.splide.options.perPage);

      // Добавляем пункты в список страниц
      for (var i = 0; i < this.paginationCount; i++) {
        // Пункт номера страницы
        var paginationItem = document.createElement('li');
        paginationItem.classList.add('products-slider__pages-item');
        this.paginationItems.push(paginationItem);

        // Кнопка с номером
        var paginationButton = document.createElement('button');
        paginationButton.classList.add('products-slider__pages-button');
        if (this.splide.index === i) {
          paginationButton.classList.add('products-slider__pages-button--current');
        }
        paginationButton.innerText = i + 1;
        this.paginationButtons.push(paginationButton);


        // Вкладываем кнопку в пункт
        paginationItem.appendChild(paginationButton);
        // Добавляем пункт в список
        this.paginationList.appendChild(paginationItem);
      }
    }

    // Инициализирует слайдер
    this.initSlider = function () {
      this.createSplideSlider();
      this.generatePagination();
      this.addPaginationEventHandlers();
      this.element.appendChild(this.pagination);
    }

    return this;
  }

  // Заменяет активную кнопку
  // var changeActiveButton = function (oldIndex, newIndex) {
  //   this.paginationButtons[oldIndex].classList.remove('products-slider__pages-button--current');
  //   this.paginationButtons[newIndex].classList.add('products-slider__pages-button--current');
  // }

  return {
    createSliderInstance: createSliderInstance
  }
})();
