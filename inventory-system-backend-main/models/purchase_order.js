
const {Sequelize , DataTypes} = require("sequelize");
const db = require("../config/database");

const Purchase_Order = db.define(
  "purchaseOrder",
  {
    remarks : {
      type: DataTypes.TEXT,
      default: true,
    },
    // quantity : {
    //   type: DataTypes.INTEGER ,
    //   default: true,
    // },
    // serviceorder_box_qty_charges : {
    //     type: DataTypes.INTEGER,
    //     default: true,
    //   },
    
      active : {
        type: DataTypes.BOOLEAN,
        defaultValue : true,
      },
  },
  { timestamps: true }
);

module.exports = Purchase_Order;