/* global module */


/**
 * Creación del modelo/tabla Quiz, definimos los tipos de las columnas.
 * Se creará un fichero quiz.sqlite
 * @param {Sequelize} squelize
 * @param {DataTypes} DataTypes
 * @param {string} DataTypes.STRING
 * @return {*|{}|Model}
 */
module.exports = function(squelize, DataTypes) {
  return squelize.define('Quiz', {
    question: DataTypes.STRING,
    answer: DataTypes.STRING
  });
};
