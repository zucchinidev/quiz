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
    title: 'Responde',
    header: 'Quiz el juego de preguntas'
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
 * Método para gestionar las peticiones GET /quizes?search=lalala, recoger todas las preguntas de la bbdd
 * @param {{}} req objeto request
 * @param {{}} res objeto request
 */
exports.quizes = function(req, res) {
  'use strict';
  var response = {
    title: 'Listado de preguntas',
    header: 'Quiz el juego de preguntas'
  };

  var search = req.query.search;
  var where = {};
  if (search) {
    search = search.replace(/\s+/g, '%');
    where = {
      where: {
        question: {
          like: '%' + search + '%'
        }
      }
    };
  }
  where['order'] = 'question ASC';

  models.Quiz.findAll(where)
      .then(function(quizes) {
        response.quizes = quizes;
        res.render('quizes/index', response);
      })
      .catch(function(error) {
        res.send(500, error);
      });
};


/**
 * Método para gestionar las peticiones GET /quizes/new, formulario de creación de quiz
 * Creación de objeto quiz a partir del model
 * @param {{}} req objeto request
 * @param {{}} res objeto request
 */
exports.new = function(req, res) {
  'use strict';
  var quiz = models.Quiz.build({
    question: '',
    answer: ''
  });
  var response = {
    title: 'Crear pregunta',
    header: 'Quiz el juego de preguntas',
    quiz: quiz
  };

  res.render('quizes/new', response);
};


/**
 * Método para gestionar las peticiones POST /quizes/create, formulario de creación de quiz
 * Setear el objeto quiz con los parámetros recibidos
 * @param {{}} req objeto request
 * @param {{}} res objeto request
 * @param {Function} next middelware que se ejecturá en caso de error
 */
exports.create = function(req, res, next) {
  'use strict';
  var quiz = models.Quiz.build(req.body.quiz);
  quiz.validate()
      .then(function(err) {
        if (err) {
          var response = {
            title: 'Crear pregunta',
            header: 'Quiz el juego de preguntas',
            quiz: quiz,
            errors: err.errors // matriz de errores de la validación del formulario
          };
          res.render('quizes/new', response);
        } else {
          // definimos que campos queremos guardar
          quiz.save({
            fields: [
              'question', 'answer'
            ]
          }).then(function() {
            res.redirect('/quizes');
          }).catch(function(err) {
            next(err);
          });
        }
      });
};


/**
 * Método para gestionar las peiticones GET /quizes/:quizId/edit, formulario de edición de quiz
 * Se carga el objeto quiz con el autoload inicial
 * @param {{}} req objeto request
 * @param {{}} res objeto request
 */
exports.edit = function(req, res) {
  'use strict';
  res.render('quizes/edit', { quiz: req.quiz });
};


/**
 * Método para gestionar las peiticones PUT /quizes/:quizId, formulario de edición de quiz
 * Validad
 * @param {{}} req objeto request
 * @param {{}} res objeto request
 * @param {Function} next
 */
exports.update = function(req, res, next) {
  'use strict';
  req.quiz.question = req.body.quiz.question;
  req.quiz.answer = req.body.quiz.answer;
  req.quiz.validate()
      .then(function(err) {
        if (err) {
          res.render('quizes/edit', { quiz: req.quiz, errors: err.errors });
        } else {
          req.quiz
              .save({fields: ['question', 'answer']})
                .then(
                  function() {
                    res.redirect('/quizes');
          });
        }
      }).catch(function(err) {
        next(err);
      });
};


/**
 * Método que gestiona las peticiones DELETE /quizes/:quizId, formulario de borrador de quiz
 * @param {{}} req objeto request
 * @param {{}} res objeto request
 * @param {Function} next
 */
exports.destroy = function(req, res, next) {
  'use strict';
  console.log(req.quiz);
  req.quiz
      .destroy()
        .then(function() {
          res.redirect('/quizes');
        }).catch(function(err) {
          next(err);
        });
};

