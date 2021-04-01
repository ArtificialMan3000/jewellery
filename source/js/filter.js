'use strict';

// Фильтр
window.filter = (function () {
  // Секции формы фильтра
  var filterSections = document.querySelectorAll('.filter__form .form-section');
  // Заголовки формы фильтра
  var filterTitles = document.querySelectorAll('.filter__form .form-title');
  // Содержимое секций фильтра
  var filterContents = document.querySelectorAll('.filter__form .form-content');
  // Поля фильтра со значениями цены от и до
  var filterPriceFrom = document.querySelector('#filter_price_from');
  var filterPriceTo = document.querySelector('#filter_price_to');
  // Слайдер в фильтре
  var filterSlider = document.getElementById('filter_slider');

  // Кнопка открытия фильтра
  var filterOpenButton = document.querySelector('.filter__open-button');
  // Форма фильтра
  var filterForm = document.querySelector('.filter__form');
  if (filterForm) {
    // Кнопка подтверждения фильтра
    var filterSubmitButton = filterForm.querySelector('.form-button button[type="submit"]');
    // Кнопка закрытия фильтра
    var filterCloseButton = filterForm.querySelector('.filter__close');
  }

  // Добавляет к элементам фильтра классы аккордеона
  var makeFilterToAccordion = function () {
    if (filterSections && filterSections.length > 0) {
      for (var i = 0; i < filterSections.length; i++) {
        filterSections[i].classList.add('accordion');
      }
    }
    if (filterTitles && filterTitles.length > 0) {
      for (var i = 0; i < filterTitles.length; i++) {
        filterTitles[i].classList.add('accordion__title');
      }
    }
    if (filterContents && filterContents.length > 0) {
      for (var i = 0; i < filterContents.length; i++) {
        filterContents[i].classList.add('accordion__content');
      }
    }
  }

  // Создаёт слайдер диапазона значений
  var makeFilterSlider = function () {
    // Создаём слайдер
    noUiSlider.create(filterSlider, {
      start: [55, 155],
      connect: true,
      range: {
          'min': 0,
          'max': 200
      },
      step: 5,
      tooltips: true,
      format: wNumb({
        decimals: 0,
        prefix: '$ '
      })
    });

    // Связываем слайдер с инпутами
    filterSlider.noUiSlider.on('update', function (values, handle, unencoded) {
      filterPriceFrom.value = unencoded[0];
      filterPriceTo.value = unencoded[1];
    });

    // Сбрасываем фильтр при нажатии на кнопку "reset"
    filterForm.addEventListener('reset', function () {
      filterSlider.noUiSlider.reset();
    })
  }

  // Прячет форму фильтра
  var closeFilterForm = function () {
    if (filterForm) {
      filterForm.classList.remove('filter__form--show');
    }

    // Удаляем с кнопки подтверждения фильтра обработчик для закрытия фильтра
    if (filterSubmitButton) {
      filterSubmitButton.removeEventListener('click', submitButtonClickHandler);
    }
    // Удаляем с кнопки закрытия фильтра обработчик для закрытия фильтра
    if (filterCloseButton) {
      filterCloseButton.removeEventListener('click', closeButtonClickHandler);
    }
  };

  // Открывает форму фильтра
  var openFilterForm = function () {
    if (filterForm) {
      filterForm.classList.add('filter__form--show');
    }
    window.scroll(0, 0);

    // Вешаем на кнопку подтверждения фильтра обработчик для закрытия фильтра
    if (filterSubmitButton) {
      filterSubmitButton.addEventListener('click', submitButtonClickHandler);
    }
    // Вешаем на кнопку закрытия фильтра обработчик для закрытия фильтра
    if (filterCloseButton) {
      filterCloseButton.addEventListener('click', closeButtonClickHandler);
    }
  };

  // Обработчик клика на кнопку открытия фильтра
  var openButtonClickHandler = function (evt) {
    evt.preventDefault();
    openFilterForm();
  };

  // Обработчик клика на кнопку подтверждения фильтра
  var submitButtonClickHandler = function (evt) {
    evt.preventDefault();
    closeFilterForm();
  };

  // Обработчик клика на кнопку закрытия фильтра
  var closeButtonClickHandler = function () {
    closeFilterForm();
  };

  // Инициализирует модуль
  var initFilter = function () {
    // Вешаем на кнопку открытия фильтра обработчик для открытия фильтра
    if (filterOpenButton) {
      filterOpenButton.addEventListener('click', openButtonClickHandler);
    }
    // Вешаем на Esc обработчик  для закрытия фильтра
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        closeFilterForm();
      }
    });
  };

  makeFilterToAccordion();
  makeFilterSlider();

  return {
    initFilter: initFilter
  }
})();
