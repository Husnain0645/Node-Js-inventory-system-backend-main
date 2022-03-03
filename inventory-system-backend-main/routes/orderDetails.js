const express = require("express");
const router = express.Router();
const orderDetailsController = require("../controller/orderDetails");
var {
    passport,
    authAdmin,
    authManager,
    authenticate,
  } = require("../auth/passport-auth");

  //add order details 
router.post(
    "/", passport.authenticate("jwt", { session: false }) , orderDetailsController.addorderDetails
  );
//   router.patch("/Update/:id",   passport.authenticate("jwt", { session: false }), Product_typeController.UpdateProduct_type);
//   router.get(
//     "/All", passport.authenticate("jwt", { session: false }) , Product_typeController.GetAllProduct_type
//   );
//   router.get("/:id" ,passport.authenticate("jwt", { session: false }) ,  Product_typeController.GetProduct_typeById);
  
//   router.delete("/Delete/:id",   passport.authenticate("jwt", { session: false }), Product_typeController.deleteProduct_type);
  
//   ///////
module.exports= router;  