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
      document.body.classList.add('body-modal-open');
      if (focusField) {
        focusField.focus();
      }
    };

    // Скрывает модальное окно
    modal.hideModal = function () {
      modal.modal.classList.remove('modal--show');
      document.body.classList.remove('body-modal-open');
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
  }



  return {
    createModal: createModal
  };
})();
