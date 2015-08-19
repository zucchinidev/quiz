var models = require('../models/models');

/**
 * MW que gestiona las peticiones GET /quizes/statistics
 * @param {{}} req objeto Request
 * @param {{}} res objeto Response
 * @param {Function} next pasar control al siguiente middelware
 */
exports.index = function(req, res, next) {
  var totalComments = 0, totalQuizes = 0, totalQuizesWithComments = 0, totalQuizesNotComments = 0;
  models.Comment.count().then(function(comments) {
    totalComments = comments;
    models.Quiz.count().then(function(quizes) {
      totalQuizes = quizes;
      models.Quiz.findAll({
        include: [
          {
            model: models.Comment
          }
        ]
      }).then(function(quizes) {
        quizes.forEach(function(quiz) {
          console.log(quiz);
          if (quiz.Comments.length > 0) {
            totalQuizesWithComments++;
          } else {
            totalQuizesNotComments++;
          }
        });
        res.render('statistic/index', {
          totalQuizes: totalQuizes,
          totalComments: totalComments,
          totalQuizesWithComments: totalQuizesWithComments,
          totalQuizesNotComments: totalQuizesNotComments
        });
      });
    });
  }).catch(function(err) {
    next(err);
  });
};
