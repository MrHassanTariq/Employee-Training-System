"use strict";
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define(
    "Course",
    {
      name: DataTypes.STRING,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      noOfDocuments: DataTypes.INTEGER
    },
    {}
  );
  Course.associate = function(models) {
    Course.hasMany(models.document);
  };
  return Course;
};
