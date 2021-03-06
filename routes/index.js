var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');
var statisticController = require('../controllers/statistic_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  'use strict';
  var params = {};
  params.title = 'Quiz';
  params.header = 'Bienvendio a Quiz';
  res.render('index', params);
});


/**
 * Rutas para las acciones de sessionController
 */
router
    .get('/login', sessionController.new)
    .post('/login', sessionController.create)
    .delete('/logout', sessionController.destroy);


/**
 * Rutas para acciones de quizController
 */
// Autoload de preguntas, siempre que exista una ruta con el parámetro quizId
router.param('quizId', quizController.load);
router.get('/quizes', quizController.quizes);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', sessionController.loginRequired, quizController.new);
router.post('/quizes/create', sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.destroy);
router.get('/author', quizController.author);


/**
 * Rutas para acciones de commentController
 */
router
  // Autoload de comentarios, siempre que exista el parámetro commentId
    .param('commentId', commentController.load)
    .get('/quizes/:quizId(\\d+)/comments/new', commentController.new)
    .post('/quizes/:quizId(\\d+)/comments', commentController.create)
    .put  ('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.loginRequired, commentController.publish);

/**
 * Rutas para acciones de las estadísticas
 */
router
    .get('/quizes/statistics', statisticController.index);


module.exports = router;
