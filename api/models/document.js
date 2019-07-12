"use strict";
module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define(
    "Document",
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING
    },
    {}
  );
  Document.associate = function(models) {
    Document.belongsToMany(models.trainee);
  };
  return Document;
};
