const express = require("express");
const router = express.Router();
const ProductController = require("../controller/Product");
var {
    passport,
    authAdmin,
    authManager,
    authenticate,
  } = require("../auth/passport-auth");

  //add product 
router.post(
    "/addNew", passport.authenticate("jwt", { session: false }) , ProductController.addProducts
  );
//update product
  // router.patch("/Update/:id",   passport.authenticate("jwt", { session: false }), ProductController.UpdateProduct);
  router.get(
    "/all", passport.authenticate("jwt", { session: false }) , ProductController.GetAllProducts
  );
  //get product by id 
  router.get("/:id" ,passport.authenticate("jwt", { session: false }) , ProductController.GetProductById);
  
  //delete product by id 
  router.delete("/Delete/:id",   passport.authenticate("jwt", { session: false }), ProductController.deleteProduct);
module.exports= router;    