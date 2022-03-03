const express = require("express");
const router = express.Router();
const Purchase_Order = require("../controller/Purchase_Order");
var {
    passport,
    authAdmin,
    authManager,
    authenticate,
  } = require("../auth/passport-auth");

  //purchase order
router.post(
    "/addNew", passport.authenticate("jwt", { session: false }) , Purchase_Order.addpurchase_order
  );
//   router.patch("/Update/:id",   passport.authenticate("jwt", { session: false }), Product_typeController.UpdateProduct_type);
//   router.get(
//     "/All", passport.authenticate("jwt", { session: false }) , Product_typeController.GetAllProduct_type
//   );
//   router.get("/:id" ,passport.authenticate("jwt", { session: false }) ,  Product_typeController.GetProduct_typeById);
  
//   router.delete("/Delete/:id",   passport.authenticate("jwt", { session: false }), Product_typeController.deleteProduct_type);
  
  ///////
module.exports= router;  