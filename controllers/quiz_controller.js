/* global exports */


/**
 * Método que gestiona las peticiones GET /quizes/question
 * @param {{}} req objeto request
 * @param {{}} res objeto request
 */
exports.question = function(req, res) {
  'use strict';
  var params = {
      question: '¿Capital de Italia?',
      title: 'Sección de preguntas',
      header: 'Quiz el juego de preguntas'
  };
  res.render('quizes/question', params);
};


/**
 * Método que gestiona las peticiones GET /quizes/answer?answer=value
 * @param {{}} req objeto request
 * @param {{}} res objeto request
 */
exports.answer = function(req, res) {
  'use strict';
  var response = {
    title: 'Sección de respuestas',
    header: 'Quiz el juego de preguntas',
    answer: 'Incorrecta'
  };
  if (req.query.answer.toLowerCase() === 'roma') {
    response.answer = 'Correcta';
  }
  res.render('quizes/answer', response);
};


/**
 * Método que gestiona las peticiones GET /author
 * @param {{}} req objeto request
 * @param {{}} res objeto request
 */
exports.author = function(req, res) {
  'use strict';
  var response = {
    title: 'Andrea Zucchini'
  };
  res.render('author', response);
};
