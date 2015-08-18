/* global exports */

var models = require('../models/models');


/**
 * Middelware que cargará el comentario siempre y cuando se reciba un parámetro commentId
 * @param {{}} req objeto Request
 * @param {{}} res objeto Response
 * @param {Function} next callback que se ejecutará en caso de error
 * @param {number} commentId id de la pregunta
 */
exports.load = function(req, res, next, commentId) {
  'use strict';
  models.Comment.findById(parseInt(commentId, 10))
      .then(function(comment) {
        if (comment) {
          req.comment = comment;
          next();
        } else {
          next(new Error('No existe el comentario con id: ' + commentId));
        }
      }).catch(function(err) {
        next(err);
      });
};


/**
 * Middelware que gestiona las peticiones GET /quizes/:quizId/comments/new
 * @param {{}} req objeto request
 * @param {{}} res objeto Response
 */
exports.new = function(req, res) {
  'use strict';
  var comment = models.Comment.build({
    text: '',
    QuizId: req.quiz.id
  });
  console.log(comment);
  res.render('comments/new', { comment: comment, quiz: req.quiz, errors: []});
};


/**
 * Middelware que gestiona las peticiones POST /quizes/:quizId/comments
 * @param {{}} req objeto request
 * @param {{}} res objeto Response
 * @param {Function} next pasa el control al siguiente middelware
 */
exports.create = function(req, res, next) {
  'use strict';
  var comment = models.Comment.build({
    text: req.body.comment.text,
    QuizId: req.quiz.id
  });

  comment
      .validate()
      .then(function(err) {
        if (err) {
          res.render('comments/new', { comment: comment, quiz: req.quiz, errors: err.errors});
        } else {
          comment
              .save()
              .then(function() {
                res.redirect('/quizes/' + comment.QuizId);
              });
        }
      }).catch(function(err) {
        next(err);
      });
};


/**
 * Método para publicar comentarios
 * Maneja peticiones PUT /quizes/:quizId/comments/:commentId/publish
 * @param {{}} req objeto request
 * @param {{}} res objeto Response
 * @param {Function} next pasa el control al siguiente middelware
 */
exports.publish = function(req, res, next) {
  'use strict';
  req.comment.publish = true;
  req.comment
      .save({fields: ['publish']})
      .then(function() {
        res.redirect('/quizes/' + req.quiz.id);
      })
      .catch(function(err) {
        next(err);
      });
};
