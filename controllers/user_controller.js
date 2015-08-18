/**
 * Array que simula usuarios del sistema
 * @type {*[]}
 */
var users = [
  {
    id: 1, username: 'admin', password: '1234', rol: 'admin'
  },
  {
    id: 2, username: 'pepe', password: '5678', rol: 'user'
  }
];

// TODO: Cambiar array por users en BBDD


/**
 * Comprobar si las credenciales pasadas coinciden con las de algún usuario
 * @param {string} login nombre de usuario que desea autenticarse
 * @param {string} password del usuario que desea autenticarse
 * @param {Function} callback que se va a ejecutar tras la comprobación.
 */
exports.autenticate = function(login, password, callback) {
  'use strict';
  var user = users.filter(function(u) {
    return u.username === login && u.password === password;
  })[0];
  if (user) {
    callback(null, user);
  } else {
    callback(new Error('Credenciales no válidas'));
  }
};
