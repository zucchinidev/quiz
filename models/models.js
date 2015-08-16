// Postgres DATABASE_URL = postgres://user:password@host:port/database
// Sqlite DATABASE_URL = sqlite://:@:/

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);

var DBName = (url[6] || null);
var user = (url[2] || null);
var pwd = (url[3] || null);
var protocol = (url[1] || null);
var dialect = (url[1] || null);
var port = (url[5] || null);
var host = (url[4] || null);
var storage = process.env.DATABASE_STORAGE;


/**
 * @type {{}}
 */
var path = require('path');


/**
 * Cargar ORM
 * @type {Function}
 */
var Sequelize = require('sequelize');


/**
 * @see http://sequelize.readthedocs.org/en/latest/docs/getting-started/
 * @type {Function} sequelize es un objeto que representa nuestra BBDD particularizada en sqlite
 * Posteriormente debemos de importar cada una de las tablas
 * Hay varios parámetros que depende de la bbdd utilizada se necesitarán o no, esto es porque
 * en el entorno de desarrollo utilizo sqlite y en Heroku utilizo postgres.
 * Heroku define una variable de entorno que es DATABASE_URL, de la cual extraigo el user, password, etc.
 * Para simular ésto en local lo que hago es crear el fichero .env que crea estas variables de entorno
 * pero con valores para sqlite.
 */
var sequelize = new Sequelize(DBName, user, pwd, {
  dialect: dialect,
  protocol: protocol,
  port: port,
  host: host,
  storage: storage, // definido en .env solo para sqlite
  omitNull: true // solo para Postgres
});


/**
 * Importamos la definición de la tabla quiz
 * @type {Model}
 */
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));


/**
 * Exportamos la definición de la tabla
 * @type {Model}
 */
exports.Quiz = Quiz;

sequelize.sync() // sincronizar las definiciones de los modelos
    .then(function() {
      'use strict';
      Quiz.count().then(function(count) {
        if (count === 0) {
          Quiz.create({
            question: '¿Capital de Italia?',
            answer: 'Roma',
            theme: 'otro'
          }).then(function() {
            console.log('Insertando Roma');
          });

          Quiz.create({
            question: '¿Qué es NodeJS?',
            answer: 'La bomba',
            theme: 'tecnologia'
          }).then(function() {
            console.log('Insertando pregunta NodeJS');
          });
        }
      });
    });
