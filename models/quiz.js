/* global module */


/**
 * Creación del modelo/tabla Quiz, definimos los tipos de las columnas.
 * Se creará un fichero quiz.sqlite
 * @param {Sequelize} squelize
 * @param {DataTypes} DataTypes
 * @return {*|{}|Model}
 */
module.exports = function(squelize, DataTypes) {
  'use strict';
  return squelize.define('Quiz', {
    question: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'Debe insertar el contenido de la pregunta'}
      }
    },
    answer: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'Debe insertar el contenido de la respuesta'}
      }
    }
  });
};
