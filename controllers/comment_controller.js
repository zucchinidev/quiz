/* global exports */

var models = require('../models/models');


/**
 * Middelware que gestiona las peticiones GET /quizes/:quizId/comments/new
 * @param {{}} req objeto request
 * @param {{}} res objeto request
 */
exports.new = function(req, res) {
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
 * @param {{}} res objeto request
 * @param {Function} next pasa el control al siguiente middelware
 */
exports.create = function (req, res, next) {
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