"use strict";
module.exports = (sequelize, DataTypes) => {
  const manager = sequelize.define(
    "manager",
    {
      createdAt: DataTypes.DATE
    },
    {}
  );
  manager.associate = function(models) {
    manager.hasMany(models.course);
  };
  return manager;
};
