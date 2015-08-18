/* global module */


/**
 * Creación del modelo Comment
 * @param {Sequelize} squelize
 * @param {DataTypes} DataTypes
 * @return {*|{}|Model}
 */
module.exports = function(squelize, DataTypes) {
  'use strict';
  return squelize.define('Comment', {
    text: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'No es posible crear un comentario vacío'}
      }
    },
    publish: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
};
