const {Sequelize , DataTypes} = require("sequelize");
const db = require("../config/database");

const Category = db.define(
  "category",
  {
    name: {
      type: Sequelize.STRING,
      default: true,
    },
    description: {
      type: Sequelize.TEXT,
      default: true,
    },
    picture: {
      type: Sequelize.STRING,
      default: true,
    },
      active : {
        type: DataTypes.BOOLEAN,
        defaultValue : true,
      },
  },
  { timestamps: true }
);

module.exports = Category;