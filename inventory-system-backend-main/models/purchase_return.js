
const {Sequelize , DataTypes} = require("sequelize");
const db = require("../config/database");

const Purchase_Return = db.define(
  "purchaseReturn",
  {
    remarks : {
      type: DataTypes.TEXT,
     
    },
    returnType : {
        ///enum 
      type: DataTypes.INTEGER ,
     
    },
   returnDate: {
        type: DataTypes.DATE,
       
      },
      posted : {
        ///enum 
      type: DataTypes.INTEGER ,
     
    },
   stockAffect : {
        
      type: DataTypes.INTEGER ,
     
    },
      active : {
        type: DataTypes.BOOLEAN,
        defaultValue : true,
      },
  },
  { timestamps: true }
);

module.exports = Purchase_Return;