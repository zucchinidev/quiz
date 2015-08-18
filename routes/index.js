var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  'use strict';
  var params = {};
  params.title = 'Quiz';
  params.header = 'Bienvendio a Quiz';
  res.render('index', params);
});


/**
 * Rutas para acciones de quizController
 */
// Autoload de preguntas, siempre que exista una ruta con el parámetro quizId
router.param('quizId', quizController.load);
router.get('/quizes', quizController.quizes);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', quizController.new);
router.post('/quizes/create', quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);
router.put('/quizes/:quizId(\\d+)', quizController.update);
router.delete('/quizes/:quizId(\\d+)', quizController.destroy);
router.get('/author', quizController.author);


/**
 * Rutas para acciones de commentController
 */
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);

module.exports = router;
