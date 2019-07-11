'use strict';
module.exports = (sequelize, DataTypes) => {
  const Documents = sequelize.define('Documents', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Documents.associate = function(models) {
    // associations can be defined here
  };
  return Documents;
};