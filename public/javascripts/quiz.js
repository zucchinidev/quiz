/* global Quiz */
(function() {
  'use strict';


  /**
   * Clase que pretende englobar toda la funcionalidad extra y común a la aplicación que no
   * esté resuelta por otras partes de la app
   * @constructor
   */
  var Quiz = function() {
    var that = this;
    that.init();
  };


  /**
   * Definir prototipo de la clase Quiz
   * @type {{init: Function, setEvents: Function, removeQuiz: Function}}
   */
  Quiz.prototype = {


    /**
     * Método para inicializar la instancia
     */
    init: function() {
      var that = this;
      that.modal = document.querySelector('#modal-delete-quiz');
      that.form = document.querySelector('#form-delete-quiz');
      that.cancelButton = document.querySelector('#cancel-delete');
      that.buttons = document.querySelectorAll('.btn-delete');
      that.setEvents();
    },


    /**
     * Setear eventos
     */
    setEvents: function() {
      var that = this;
      if (that.buttons) {
        Array.prototype.forEach.call(that.buttons, function(element) {
          element.addEventListener('click', that.removeQuiz.bind(that, element));
        });
      }

      that.cancelButton.addEventListener('click', function(event) {
        event.preventDefault();
        that.modal.style.display = 'none';
      });
    },


    /**
     * Lógica necesaria para borrar un quiz
     * @param {Element} element
     * @param {Event} event
     */
    removeQuiz: function(element, event) {
      event.preventDefault();
      var that = this;
      var firstChild = element.parentNode.firstChild;
      while (firstChild.nodeType !== 1) {
        firstChild = firstChild.nextSibling;
      }
      var url = '/quizes/' + element.dataset.id + '?_method=delete';
      that.form.setAttribute('action', url);
      document.querySelector('#insert-text-question').textContent = firstChild.textContent;
      that.modal.style.display = 'block';
    }
  };

  window.Quiz = Quiz;
})();

window.addEventListener('load', function() {
  'use strict';
  var quiz = new Quiz();
  quiz.init();
});
