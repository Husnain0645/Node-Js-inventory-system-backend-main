const express = require("express");
const router = express.Router();
const purchaseSupply = require("../controller/purchaseSupply");
var {
    passport,
    authAdmin,
    authManager,
    authenticate,
  } = require("../auth/passport-auth");

  //add purchasesuply
router.post(
    "/addNew", passport.authenticate("jwt", { session: false }) , purchaseSupply.purchaseSupply
  );
//   // router.patch("/Update/:id",   passport.authenticate("jwt", { session: false }), ProductController.UpdateProduct);
//   router.get(
//     "/All", passport.authenticate("jwt", { session: false }) , ProductController.GetAllProducts
//   );
//   router.get("/:id" ,passport.authenticate("jwt", { session: false }) , ProductController.GetProductById);
  
//   router.delete("/Delete/:id",   passport.authenticate("jwt", { session: false }), ProductController.deleteProduct);
module.exports= router;    