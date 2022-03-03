const Sequelize = require("sequelize");
const db = require("../config/database");
const { DataTypes } = require("sequelize");
//models require 
const Role = require("./Role");
const Category = require("./category");
const Product = require("./Product");
const Companies = require("./companies");
// const Distributers = require("./distributors");
const Order = require("./orders");
const Order_details = require("./orderDetails");
const Product_type = require("./product_type");
const Purchase_Order_details = require("./purchase_order_details");
const Purchase_Order = require("./purchase_order");
const Purchase_return_Details = require("./purchase_return_detail");
const Purchase_return = require("./purchase_return");
const Purchaise_Supply_details = require("./Purchase_Supply_Details");
const Purchase_Supply = require("./Purchase_Supply");
const product_type = require("./product_type");
const Stock = require("./Stock");
const distributer = require("./distributors");
const Purchase_Supply_details = require("./Purchase_Supply_Details");
// const { purchaseReturnDetails } = require("../controller/purchaseReturnDetails");
// const ProductCategory = require("../models/ProductCategory");
// const Role = require("./Role");

const User = db.define(
  "user",
  {
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(64),
    },
    mobile: {
      type: Sequelize.BIGINT,
    },

    city: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    active : {
      type: DataTypes.BOOLEAN,
      defaultValue : true,
      select : false
    },
  },
  { timestamps: true }
);
///////////////////////one to many user and role////////////////
Role.hasMany(User);
User.belongsTo(Role);


///////one to one
product_type.hasOne(Product);
Product.belongsTo(product_type);

///////one to many 
Companies.hasMany(Product);
Product.belongsTo(Companies);

///////one to many 
Category.hasMany(Product);
Product.belongsTo(Category);

/////////////////purchase
///////one to many 

distributer.hasMany(Purchase_Order);
Purchase_Order.belongsTo(distributer);
///////one to many 

Companies.hasMany(Purchase_Order);
Purchase_Order.belongsTo(Companies);

/////////////////purchase_order_details
////////one to one 
Purchase_Order.hasOne(Purchase_Order_details);
Purchase_Order_details.belongsTo(Purchase_Order);

///////one to many 

Companies.hasMany(Purchase_Order_details);
Purchase_Order_details.belongsTo(Companies);

///////one to many 

Product.hasMany(Purchase_Order_details);
Purchase_Order_details.belongsTo(Product);

//////////purchase supply association 

///////one to many 
Purchase_Order.hasMany(Purchase_Supply);
Purchase_Supply.belongsTo(Purchase_Order);

///////one to many 
Companies.hasMany(Purchase_Supply);
Purchase_Supply.belongsTo(Companies);

///////one to many 
distributer.hasMany(Purchase_Supply);
Purchase_Supply.belongsTo(distributer);

//////////purchase supply-details  association 

///////one to one 
Purchase_Supply.hasOne(Purchase_Supply_details);
Purchase_Supply_details.belongsTo(Purchase_Supply);
///////one to many 
Companies.hasMany(Purchase_Supply_details);
Purchase_Supply_details.belongsTo(Companies);
///////one to many 
Product.hasMany(Purchase_Supply_details);
Purchase_Supply_details.belongsTo(Product);


//////////purchase retrn 
///////one to many 
Companies.hasMany(Purchase_return);
Purchase_return.belongsTo(Companies);

///////one to one  
Purchase_Order.hasOne(Purchase_return);
Purchase_return.belongsTo(Purchase_Order);

//one to many 
distributer.hasMany(Purchase_return);
Purchase_return.belongsTo(distributer);

//////////purchase retrn_details
///////one to many 
Companies.hasMany(Purchase_return_Details);
Purchase_return_Details.belongsTo(Companies);

///////one to one  
Purchase_return.hasOne(Purchase_return_Details);
Purchase_return_Details.belongsTo(Purchase_return);

//one to many 
Product.hasMany(Purchase_return_Details);
Purchase_return_Details.belongsTo(Product);

//////order 
///one to many 
User.hasMany(Order);
Order.belongsTo(User);

///order_details 

Order.hasOne(Order_details);
Order_details.belongsTo(Order);


Product.hasMany(Order_details);
Order_details.belongsTo(Product);


Companies.hasMany(Order_details);
Order_details.belongsTo(Companies);
 
////////stock 

//one to one 
Product.hasOne(Stock);
Stock.belongsTo(Product);

//one to many 
Companies.hasMany(Stock);
Stock.belongsTo(Companies);

///sync all tables 
db.sync({alter : true  }).then(() => {
  console.log("All models created");
});
module.exports = User;