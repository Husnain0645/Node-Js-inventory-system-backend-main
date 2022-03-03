const {Sequelize , DataTypes} = require("sequelize");
const db = require("../config/database");

const Purchase_Supply = db.define(
  "purchaseSupply",
  {
    supplierName: {
      type: DataTypes.STRING,
      default: true,
    },
    supplierContact: {
        type: DataTypes.STRING,
        default: true,
      },
      invoiceNo: {
        type: DataTypes.INTEGER,
        default: true,
      },
      invoiceDate: {
        type: DataTypes.DATE,
        default: true,
      },
      remarks : {
        type: DataTypes.TEXT,
       
      },
      paymentType : {
          //enum , cash , credit 
        type: DataTypes.TEXT,
       
      },
      posted : {
        ///enum 
      type: DataTypes.INTEGER ,
     
    },
   discount : {
       
      type: DataTypes.FLOAT,
     
    },
    gst : {
      
      type: DataTypes.FLOAT,
     
    },
    totalAmount: {
     
      type: DataTypes.FLOAT,
     
    },
    amountPaid: {
      
      type: DataTypes.FLOAT,
     
    },
    remainingAmount: {
       
      type: DataTypes.FLOAT,
     
    },
   stockAffect: {
       
        type: DataTypes.INTEGER,
       
      },
    
      active : {
        type: DataTypes.BOOLEAN,
        defaultValue : true,
      },
  },
  { timestamps: true }
);

module.exports = Purchase_Supply;