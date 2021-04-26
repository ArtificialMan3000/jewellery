'use strict';

// Модуль медиа запросов
window.mediaQuery = (function () {
  var BREAKPOINTS_LIST = {
    'desktop': {
      'max': '1266px',
      'min': '1024px'
    },
    'tablet': {
      'max': '1023px',
      'min': '768px'
    },
    'mobile': {
      'max': '767px',
      'min': '320px'
    }
  };

  var mqls = {
    desktop: window.matchMedia(
        '(max-width: ' + BREAKPOINTS_LIST.desktop.max + ') ' +
        'and (min-width: ' + BREAKPOINTS_LIST.desktop.min + ')'
    ),
    tablet: window.matchMedia(
        '(max-width: ' + BREAKPOINTS_LIST.tablet.max + ') ' +
        'and (min-width: ' + BREAKPOINTS_LIST.tablet.min + ')'
    ),
    mobile: window.matchMedia(
        '(max-width: ' + BREAKPOINTS_LIST.mobile.max + ') ' +
        'and (min-width: ' + BREAKPOINTS_LIST.mobile.min + ')'
    )
  };

  // Создаёт отслеживание ресайза окна
  var watchMedia = function (types, callback) {
    for (var i = 0; i < types.length; i++) {
      if (types[i] === 'desktop') {
        mqls.desktop.addEventListener('change', function (evt) {
          callback('desktop', evt);
        });
      }
      if (types[i] === 'tablet') {
        mqls.tablet.addEventListener('change', function (evt) {
          callback('tablet', evt);
        });
      }
      if (types[i] === 'mobile') {
        mqls.mobile.addEventListener('change', function (evt) {
          callback('mobile', evt);
        });
      }
    }
  };

  return {
    mqls: mqls,
    watchMedia: watchMedia
  };
})();

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

  // Скрывает поля ввода диапазона цен
  var hidePriceInputs = function () {
    if (filterPriceFrom) {
      filterPriceFrom.parentNode.classList.add('visually-hidden');
    }
    if (filterPriceTo) {
      filterPriceTo.parentNode.classList.add('visually-hidden');
    }
  };

  // Добавляет к элементам фильтра классы аккордеона
  var makeFilterToAccordion = function () {
    if (filterSections && filterSections.length > 0) {
      for (var i = 0; i < filterSections.length; i++) {
        filterSections[i].classList.add('accordion');
      }
    }
    if (filterTitles && filterTitles.length > 0) {
      for (i = 0; i < filterTitles.length; i++) {
        filterTitles[i].classList.add('accordion__title');
      }
    }
    if (filterContents && filterContents.length > 0) {
      for (i = 0; i < filterContents.length; i++) {
        filterContents[i].classList.add('accordion__content');
      }
    }
  };

  // Создаёт слайдер диапазона значений
  var makeFilterSlider = function () {
    // Создаём слайдер
    if (filterSlider) {
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
      });
    }
  };

  // Прячет форму фильтра
  var closeFilterForm = function () {
    // Показываем кнопку открытия
    if (filterOpenButton) {
      filterOpenButton.classList.remove('filter__open-button--hide');
    }
    // Скрываем форму фильтра
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
    // Скрываем кнопку открытия
    if (filterOpenButton) {
      filterOpenButton.classList.add('filter__open-button--hide');
    }
    // Показываем форму фильтра
    if (filterForm) {
      filterForm.classList.add('filter__form--show');
    }
    // window.scroll(0, 0);

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
    // Скрываем поля ввода диапазона цен
    hidePriceInputs();
    // Вешаем на кнопку открытия фильтра обработчик для открытия фильтра
    if (filterOpenButton) {
      filterOpenButton.addEventListener('click', openButtonClickHandler);
    }
    // Закрываем фильтр
    closeFilterForm();
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
  };
})();

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

'use strict';

// Аккордеон
window.accordion = (function () {
  // Элементы аккордеона
  var accordionItems = document.querySelectorAll('.accordion');
  // Заголовки аккордеона
  var accordionTitles = document.querySelectorAll('.accordion__title');

  // Закрывает элемент аккордеона
  var closeAccordionItem = function (element) {
    if (element && element.classList.contains('accordion')) {
      element.classList.remove('accordion--opened');
    }
  };

  // Раскрывает элемент аккордеона
  var openAccordionItem = function (element) {
    if (element && element.classList.contains('accordion')) {
      element.classList.add('accordion--opened');
    }
  };

  // Закрывает все элементы аккордеона
  var closeAccordionItems = function () {
    if (accordionItems && accordionItems.length > 0) {
      for (var i = 0; i < accordionItems.length; i++) {
        closeAccordionItem(accordionItems[i]);
      }
    }
  };

  // Переключает элемент аккордеона в открытое или закрытое состояние
  var toggleAccordionItem = function (element) {
    if (element && element.classList.contains('accordion')) {
      if (!element.classList.contains('accordion--opened')) {
        // closeAccordionItems();
        openAccordionItem(element);
      } else {
        closeAccordionItem(element);
      }
    }
  };

  // Устанавливает обработчик клика на заголовке аккордеона
  // (открывает и закрывает элемент аккордеона)
  var addAccordionTitleClickHandler = function (element) {
    if (element) {
      element.addEventListener('click', function (evt) {
        toggleAccordionItem(evt.target.parentElement);
      });

      element.addEventListener('keydown', function (evt) {
        if (evt.key === 'Enter' || evt.key === 'Spacebar' || evt.key === ' ') {
          evt.preventDefault();
          toggleAccordionItem(evt.target.parentElement);
        }
      });
    }
  };

  // Инициализирует аккордеон
  var initAccordion = function () {
    // closeAccordionItems();
    if (accordionTitles && accordionTitles.length > 0) {
      for (var i = 0; i < accordionTitles.length; i++) {
        accordionTitles[i].setAttribute('tabindex', '0');
        addAccordionTitleClickHandler(accordionTitles[i]);
      }
    }
  };

  return {
    initAccordion: initAccordion
  };
})();

'use strict';

// Модуль модального окна
window.modal = (function () {
  // Создаёт экземпляр модального окна
  var createModal = function (elem, focusId) {
    var modal = {};
    // Проверка, является ли элемент модальным окном
    if (!elem.classList.contains('modal')) {
      return false;
    }
    // Модальное окно
    modal.modal = elem;
    // Кнопка закрытия модального окна
    modal.modalClose = modal.modal.querySelector('.modal__close');
    // Оверлэй модального окна
    modal.modalOverlay = modal.modal.querySelector('.modal__overlay');
    // Кнопки вызова модального окна
    modal.modalOpenButtons = document.querySelectorAll('[data-modal=' + modal.modal.id);
    if (focusId) {
      modal.focusField = document.querySelector('#' + focusId);
    }

    // Показывает модальное окно
    modal.showModal = function () {
      modal.modal.classList.add('modal--show');
      document.body.classList.add('body-no-scroll');
      if (modal.focusField) {
        modal.focusField.focus();
      }
    };

    // Скрывает модальное окно
    modal.hideModal = function () {
      modal.modal.classList.remove('modal--show');
      document.body.classList.remove('body-no-scroll');
    };

    // Инициализирует модальное окно
    modal.initModal = function () {
      // Добавляем обработчик клика на кнопку вызова модала
      if (modal.modalOpenButtons) {
        for (var i = 0; i < modal.modalOpenButtons.length; i++) {
          modal.modalOpenButtons[i].addEventListener('click', function (evt) {
            evt.preventDefault();
            modal.showModal();
          });
        }
      }

      // Добавляем обработчик клика на крестик
      if (modal.modalClose) {
        modal.modalClose.addEventListener('click', function () {
          modal.hideModal();
        });
      }

      // Добавляем обработчик клика на оверлэй
      if (modal.modalOverlay) {
        modal.modalOverlay.addEventListener('click', function () {
          modal.hideModal();
        });
      }

      // Добавляем обработчик нажатия Esc
      document.addEventListener('keydown', function (evt) {
        if (evt.key === 'Escape') {
          evt.preventDefault();
          modal.hideModal();
        }
      });
    };

    return modal;
  };

  return {
    createModal: createModal
  };
})();

'use strict';

// Модуль хранения данных формы
window.formStorage = (function () {
  // Сохраняет поля формы в localStorage
  var saveFields = function (form, fieldsNames) {
    if (form && fieldsNames) {
      for (var i = 0; i < fieldsNames.length; i++) {
        var currFieldSelector = '[name="' + fieldsNames[i] + '"]';
        var currField = form.querySelector(currFieldSelector);
        localStorage.setItem(fieldsNames[i], currField.value);
      }
    }
  };

  // Получает данные формы из localStorage
  var getFields = function (fieldsNames) {
    var formData = [];
    if (fieldsNames) {
      for (var i = 0; i < fieldsNames.length; i++) {
        var currFieldName = fieldsNames[i];
        var currFieldData = {
          'name': currFieldName,
          'value': localStorage.getItem(currFieldName)
        };
        formData.push(currFieldData);
      }
    }
    return formData;
  };

  // Записывает данные в форму
  var setFields = function (form, formData) {
    if (form && formData) {
      for (var i = 0; i < formData.length; i++) {
        var currFieldSelector = '[name="' + formData[i].name + '"]';
        var currField = form.querySelector(currFieldSelector);
        currField.value = formData[i].value;
      }
    }
  };

  // Инициализирует хранилище данных формы
  // form - элемент формы
  // fieldsNames - массив с names полей, данные которых надо сохранять
  var initFormStorage = function (form, fieldsNames) {
    if (form && fieldsNames) {
      var formData = getFields(fieldsNames);
      setFields(form, formData);

      form.addEventListener('submit', function () {
        saveFields(form, fieldsNames);
      });
    }
  };

  return {
    initFormStorage: initFormStorage
  };
})();

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
