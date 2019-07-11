'use strict';
module.exports = (sequelize, DataTypes) => {
  const Courses = sequelize.define('Courses', {
    name: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {});
  Courses.associate = function(models) {
    // associations can be defined here
  };
  return Courses;
};