"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn("Users", "roleId", {
        type: Sequelize.INTEGER,
        references: {
          model: "roles",
          key: "id"
        }
      })
      .then(() => {
        return queryInterface.addColumn("managers", "userId", {
          type: Sequelize.INTEGER,
          references: {
            model: "users",
            key: "id"
          }
        });
      })
      .then(() => {
        return queryInterface.addColumn("managers", "courseId", {
          type: Sequelize.INTEGER,
          references: {
            model: "users",
            key: "id"
          }
        });
      })
      .then(() => {
        return queryInterface.addColumn("trainees", "userId", {
          type: Sequelize.INTEGER,
          references: {
            model: "users",
            key: "id"
          }
        });
      })
      .then(() => {
        return queryInterface.addColumn("trainees", "courseId", {
          type: Sequelize.INTEGER,
          references: {
            model: "users",
            key: "id"
          }
        });
      })
      .then(() => {
        return queryInterface.addColumn("courses", "managerId", {
          type: Sequelize.INTEGER,
          references: {
            model: "managers",
            key: "id"
          }
        });
      })
      .then(() => {
        return queryInterface.addColumn("documents", "courseId", {
          type: Sequelize.INTEGER,
          references: {
            model: "courses",
            key: "id"
          }
        });
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface
      .removeColumn("Users", "roleId")
      .then(() => {
        return queryInterface.removeColumn("managers", "userId");
      })
      .then(() => {
        return queryInterface.removeColumn("managers", "courseId");
      })
      .then(() => {
        return queryInterface.removeColumn("trainees", "userId");
      })
      .then(() => {
        return queryInterface.removeColumn("trainees", "courseId");
      })
      .then(() => {
        return queryInterface.removeColumn("courses", "managerId");
      })
      .then(() => {
        return queryInterface.removeColumn("documents", "courseId");
      });
  }
};
