const express = require("express");
const router = express.Router();
const Product_typeController = require("../controller/Product_type");
var {
    passport,
    authAdmin,
    authManager,
    authenticate,
  } = require("../auth/passport-auth");

  //add product type
router.post(
    "/addNew", passport.authenticate("jwt", { session: false }) , Product_typeController.addProduct_type
  );

  //update product type 
  router.patch("/update/:id",   passport.authenticate("jwt", { session: false }), Product_typeController.UpdateProduct_type);

  //get all products 
  router.get(
    "/all", passport.authenticate("jwt", { session: false }) , Product_typeController.GetAllProduct_type
  );

  //get producttype by id 
  router.get("/:id" ,passport.authenticate("jwt", { session: false }) ,  Product_typeController.GetProduct_typeById);
  

  ///delete product type 
  router.delete("/delete/:id",   passport.authenticate("jwt", { session: false }), Product_typeController.deleteProduct_type);
  
  ///////
module.exports= router;  