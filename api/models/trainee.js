'use strict';
module.exports = (sequelize, DataTypes) => {
  const Trainee = sequelize.define('Trainee', {
    userId: DataTypes.INTEGER,
    courseId: DataTypes.INTEGER
  }, {});
  Trainee.associate = function(models) {
    // associations can be defined here
  };
  return Trainee;
};