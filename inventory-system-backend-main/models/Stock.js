const {Sequelize , DataTypes} = require("sequelize");
const db = require("../config/database");

const Stock  = db.define(
  "stock",
  {
    type: {
      type: Sequelize.STRING,
      default: true,
    },
    qty: {
      type: DataTypes.INTEGER,
      default: true,
    },
  factor: {
      type: Sequelize.STRING,
      default: true,
    },
    result: {
        type: DataTypes.INTEGER,
        default: true,
      },
      active : {
        type: DataTypes.BOOLEAN,
        defaultValue : true,
      },
  },
  
  { timestamps: true }
);

module.exports = Stock;