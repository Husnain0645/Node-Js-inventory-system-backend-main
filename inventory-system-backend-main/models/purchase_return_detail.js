
const {Sequelize , DataTypes} = require("sequelize");
const db = require("../config/database");

const Purchase_return_details = db.define(
  "purchaseReturnDetails",
  {
    
    quantity : {
      type: DataTypes.INTEGER ,
      default: true,
    },
    price : {
        type: DataTypes.FLOAT ,
        default: true,
      },
    
      active : {
        type: DataTypes.BOOLEAN,
        defaultValue : true,
      },
  },
  { timestamps: true }
);

module.exports = Purchase_return_details;