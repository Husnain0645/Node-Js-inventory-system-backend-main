const Sequelize = require("sequelize");
const db = require("../config/database");

const Role = db.define(
  "role",
  {
    isAdmin: {
      type: Sequelize.BOOLEAN,
      default: true,
    },
    isUser: {
      type: Sequelize.BOOLEAN,
      default: true,
    },
    isHost: {
      type: Sequelize.BOOLEAN,
      default: true,
    },
  },
  { timestamps: false }
);

module.exports = Role;
