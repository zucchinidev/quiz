var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  'use strict';
  var params = {};
  params.title = 'Quiz';
  params.header = 'Bienvendio a Quiz';
  res.render('index', params);
});


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

module.exports = router;
