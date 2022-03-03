const {Sequelize , DataTypes} = require("sequelize");
const db = require("../config/database");

const Product = db.define(
  "product",
  {
    name: {
      type: Sequelize.STRING,
      default: true,
    },
    description: {
      type: Sequelize.STRING,
      default: true,
    },
  formula: {
      type: Sequelize.STRING,
      default: true,
    },
    registrationNumber: {
        type: Sequelize.TEXT,
        default: true,
      },
      active : {
        type: DataTypes.BOOLEAN,
        defaultValue : true,
      },
  },
  
  { timestamps: true }
);

module.exports = Product;