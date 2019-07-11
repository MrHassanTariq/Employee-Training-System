"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn("courses", "NoOfDocuments", {
        type: Sequelize.INTEGER
      })
      .then(() => {
        return queryInterface.addColumn("trainees", "completedDocuments", {
          type: Sequelize.INTEGER
        });
      })
      .then(() => {
        return queryInterface.addColumn("trainees", "completed", {
          type: Sequelize.BOOLEAN
        });
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface
      .removeColumn("courses", "NoOfDocuments")

      .then(() => {
        return queryInterface.removeColumn("trainees", "completedDocuments");
      })
      .then(() => {
        return queryInterface.removeColumn("trainees", "completed");
      });
  }
};
