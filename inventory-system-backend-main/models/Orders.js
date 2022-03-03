const {Sequelize , DataTypes} = require("sequelize");
const db = require("../config/database");

const Order = db.define(
  "order",
  {
    orderDate : {
      type: DataTypes.DATE,
      default: true,
    },
    amount : {
      type: DataTypes.DECIMAL,
      default: true,
    },
    deliveryCharges : {
      type: DataTypes.DECIMAL ,
      default: true,
    },
    serviceCharges : {
        type: DataTypes.DECIMAL ,
        default: true,
      },
      userRating : {
        type: DataTypes.INTEGER ,
        default: true,
      },
      paymentDetails : {
        type: DataTypes.STRING ,
        default: true,
      },
      paymentDetails : {
        type: DataTypes.TEXT,
        default: true,
      },
    
      active : {
        type: DataTypes.BOOLEAN,
        defaultValue : true,
      },
  },
  { timestamps: true }
);

module.exports = Order;