var models = require('../models/models');

/**
 * MW que gestiona las peticiones GET /quizes/statistics
 * @param {{}} req objeto Request
 * @param {{}} res objeto Response
 * @param {Function} next pasar control al siguiente middelware
 */
exports.index = function(req, res, next) {
  var totalComments = 0, totalQuizes = 0, totalQuizesWithComments = 0;
  models.Comment.count().then(function(comments) {
    totalComments = comments;
    models.Quiz.count().then(function(quizes) {
      totalQuizes = quizes;
      models.Quiz.findAll({
        include: [
          {
            model: models.Comment,
            as: 'Comments',
            where: [ 'Comments.id is not null']
          }
        ]
      }).then(function(quizes) {
        totalQuizesWithComments = quizes.length;
        res.render('statistic/index', {
          totalQuizes: totalQuizes,
          totalComments: totalComments,
          totalQuizesWithComments: totalQuizesWithComments,
          totalQuizesNotComments: totalQuizes - totalQuizesWithComments
        });
      });
    });
  }).catch(function(err) {
    next(err);
  });
};
