/* global exports */

var models = require('../models/models');


/**
 * Método que gestiona las peticiones GET /quizes/question
 * @param {{}} req objeto request
 * @param {{}} res objeto request
 */
exports.question = function(req, res) {
  'use strict';
  var params = {
      title: 'Sección de preguntas',
      header: 'Quiz el juego de preguntas'
  };

  models.Quiz.findAll()
      .then(function(quiz) {
        params.question = quiz[0].question;
        res.render('quizes/question', params);
      });
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

  models.Quiz.findAll()
      .then(function(quiz) {
        if (req.query.answer.toLowerCase() === quiz[0].answer.toLowerCase()) {
          response.answer = 'Correcta';
        }
        res.render('quizes/answer', response);
      });

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
