const {Sequelize , DataTypes} = require("sequelize");
const db = require("../config/database");

const Purchase_Order_Details = db.define(
  "purchaseOrderDetails",
  {
    suggestedBoxes : {
      type: DataTypes.INTEGER,
      default: true,
    },
    quantity : {
      type: DataTypes.INTEGER ,
      default: true,
    },
    serviceorderBoxQtyCharges : {
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

module.exports = Purchase_Order_Details;