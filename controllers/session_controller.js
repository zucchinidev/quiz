/**
 * Gestiona las peticiones GET /login
 * Si existen errores de sesión anteriores los pasa a la vista
 * @param {{}} req objeto Request
 * @param {{}} res objeto Response
 */
exports.new = function(req, res) {
  'use strict';
  var errors = req.session.errors || {};
  req.session.errors = {};
  res.render('sessions/new', { errors: errors });
};


/**
 * Gestiona las petiones POST /login
 * Creación de sesión si se pasa la autentificación, almacenar en sesión al usuario actual
 * Redirección a la acción anterior al login
 * @param {{}} req objeto Request
 * @param {{}} res objeto Response
 */
exports.create = function(req, res) {
  'use strict';

  var login = req.body.login;
  var password = req.body.password;

  var userController = require('./user_controller');
  userController.autenticate(login, password, function(err, user) {
    if (err) {
      req.session.errors = [{ message: 'Se ha producido un error ' + err }];
      res.redirect('/login');
      return;
    }

    // Almacenamos el usuario actual en la sesión
    req.session.user = { id: user.id, username: user.username };

    res.redirect(req.session.redir.toString());
  });
};


/**
 * Gestiona las peticiones DELETE /logout
 * Destruir sesión de usuario
 * Redirección a la acción anterior al logout
 * @param {{}} req objeto Request
 * @param {{}} res objeto Response
 */
exports.destroy = function(req, res) {
  'use strict';
  if (req.session.user) {
    delete req.session.user;
  }
  res.redirect(req.session.redir.toString());
};


/**
 * Permite interrumpir la ejecución de los middelware para la edición, creación y borrado de quizes
 * Si no existe user en sesión, redirect a login.
 * @param {{}} req objeto Request
 * @param {{}} res objeto Response
 * @param {Function} next pasar control al siguiente middelware
 */
exports.loginRequired = function(req, res, next) {
  'use strict';
  if (req.session) {
    next();
  } else {
    res.redirect('/login');
  }
};
