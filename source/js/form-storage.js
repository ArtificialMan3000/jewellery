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
