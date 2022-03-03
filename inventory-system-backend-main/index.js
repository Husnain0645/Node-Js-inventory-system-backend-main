const express = require("express");
const passport = require(`passport`);
const jwt = require("jsonwebtoken");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");

var db = require("./config/database");
const dotenv = require("dotenv");
var bodyParser = require("body-parser");
var users = require("./routes/userRoute");
var product = require("./routes/productRoute");
var category = require("./routes/CategoryRoute");
var company = require("./routes/Company");
var Product_types = require("./routes/Product_type");
var purchase_order = require("./routes/purchase_order");
var Distributer = require("./routes/distributer");
var purchase_order_details = require("./routes/purchaseOrderDetails");
var purchaseSupply = require("./routes/puchaseSupply");
var purchaseSupplyDetails = require("./routes/purchaseSupplyDetails");
var purchaseReturn = require("./routes/purchaseReturn");
var purchaseReturnDetails = require("./routes/purchaseReturnDetails");
var order = require("./routes/order");
var orderDetails = require("./routes/orderDetails");
var stock = require("./routes/stock");


const layouts = require("express-ejs-layouts");

const http = require("http");

const port = process.env.PORT || 3000;
const server = require("http").createServer(app);
var io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:19000",
  },
});
// const expressLayouts = require("express-ejs-layouts");
//database connection

// dotenv.config({ path: "config/.env" });

let env = process.env.NODE_ENV;

console.log("2@@ dotnev", process.env.NODE_ENV);

db.authenticate()
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err.message));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(layouts);
app.set("view engine", "ejs");

//routes
app.use("/users", users);
app.use("/Products" , product);
app.use("/Category" , category);
app.use("/Company" , company);
app.use("/Product_Types" , Product_types);
app.use("/PurchaseOrder" ,purchase_order);
app.use("/distributer" , Distributer );
app.use("/PurchaseDetails" , purchase_order_details );
app.use("/purchaseSupply" , purchaseSupply );
app.use("/purchaseSupplyDetails" , purchaseSupplyDetails );
app.use("/purchaseReturn" , purchaseReturn );
app.use("/purchaseReturnDetails" , purchaseReturnDetails );
app.use("/order" , order );
app.use("/orderDetails" , orderDetails );
app.use("/stock" , stock);


if (env === "production") {
  server.listen(process.env.PORT || 4000, () => {
    console.log(`Example app listening at http://localhost`);
  });
} else {
  server.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
  });
}

///////////////////////////////-socket conection and logic//////////////////////////////////////////
// require("./socket")(io);
