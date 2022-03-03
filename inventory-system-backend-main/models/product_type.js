const {Sequelize , DataTypes} = require("sequelize");
const db = require("../config/database");

const product_type = db.define(
  "productType",
  {
    productType : {
      type: DataTypes.STRING,
      default: true,
    },
    
      active : {
        type: DataTypes.BOOLEAN,
        defaultValue : true,
      },
    },
  { timestamps: true }
);

module.exports = product_type;