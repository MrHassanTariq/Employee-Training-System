"use strict";
module.exports = (sequelize, DataTypes) => {
  const Trainee = sequelize.define(
    "Trainee",
    {
      createdAt: DataTypes.DATE
    },
    {}
  );
  Trainee.associate = function(models) {
    Trainee.belongsToMany(models.document);
  };
  return Trainee;
};
