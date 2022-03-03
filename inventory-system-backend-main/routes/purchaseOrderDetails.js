const express = require("express");
const router = express.Router();
const Purchase_Order_details = require("../controller/purchase_order_details");
var {
    passport,
    authAdmin,
    authManager,
    authenticate,
  } = require("../auth/passport-auth");

   //add ourchase order  details  
router.post(
    "/addNew", passport.authenticate("jwt", { session: false }) , Purchase_Order_details.addpurchase_order
  );
//   // router.patch("/Update/:id",   passport.authenticate("jwt", { session: false }), ProductController.UpdateProduct);
//   router.get(
//     "/All", passport.authenticate("jwt", { session: false }) , ProductController.GetAllProducts
//   );
//   router.get("/:id" ,passport.authenticate("jwt", { session: false }) , ProductController.GetProductById);
  
//   router.delete("/Delete/:id",   passport.authenticate("jwt", { session: false }), ProductController.deleteProduct);
module.exports= router;    