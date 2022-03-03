const {Sequelize , DataTypes} = require("sequelize");
const db = require("../config/database");

const Purchase_Supply_details = db.define(
  "purchaseSupplyDetails",
  {
    
    suggestedBoxes : {
        type: DataTypes.INTEGER,
        default: true,
      },
      quantity : {
        type: DataTypes.INTEGER ,
        default: true,
      },
      orderBoxQty : {
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

module.exports = Purchase_Supply_details;