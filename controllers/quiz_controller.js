/* global exports */

var models = require('../models/models');


/**
 * Middelware que cargará la pregunta siempre y cuando se reciba un parámetro quizId
 * @param {{}} req objeto request
 * @param {{}} res objeto request
 * @param {Function} next callback que se ejecutará en caso de error
 * @param {number} quizId id de la pregunta
 */
exports.load = function(req, res, next, quizId) {
  'use strict';
  models.Quiz.findById(parseInt(quizId, 10))
      .then(function(quiz) {
        if (quiz) {
          req.quiz = quiz;
          next();
        } else {
          next(new Error('No existe la pregunta con id: ' + quizId));
        }
      })
      .catch(function(err) {
        next(err);
      });
};


/**
 * Método que gestiona las peticiones GET /quizes/:quizId
 * @param {{}} req objeto request
 * @param {{}} res objeto request
 */
exports.show = function(req, res) {
  'use strict';
  var response = {
    title: 'Sección de preguntas',
    header: 'Quiz el juego de preguntas',
    quiz: 'dale'
  };
  response.quiz = req.quiz;
  res.render('quizes/show', response);
};


/**
 * Método que gestiona las peticiones GET /quizes/:quizId/answer?answer=value
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
  if (req.query.answer.toLowerCase() === req.quiz.answer.toLowerCase()) {
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


/**
 * Método para gestionar las peticiones GET /quizes, recoger todas las preguntas de la bbdd
 * @param {{}} req objeto request
 * @param {{}} res objeto request
 */
exports.quizes = function(req, res) {
  'use strict';
  var response = {
    title: 'Listado de preguntas',
    header: 'Quiz el juego de preguntas'
  };

  models.Quiz.findAll()
      .then(function(quizes) {
        response.quizes = quizes;
        res.render('quizes/index', response);
      })
      .catch(function(err) {
        next(err);
      });
};
