const {Sequelize , DataTypes} = require("sequelize");
const db = require("../config/database");

const Order_Details = db.define(
  "orderDetails",
  {
    quantity: {
      type: DataTypes.INTEGER,
 
    },
    unitPrice: {
      type: DataTypes.INTEGER,
   },
    orderDetailStatus: {
      //enum
      type: DataTypes.STRING,
      // defaultValue : 'pending ',
    },
      active : {
        type: DataTypes.BOOLEAN,
        defaultValue : true,
      },
  },
  { timestamps: true }
);

module.exports = Order_Details;