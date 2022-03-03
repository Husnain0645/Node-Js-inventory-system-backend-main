const express = require("express");
const router = express.Router();
const CategoryController = require("../controller/Category");
var {
    passport,
    authAdmin,
    authManager,
    authenticate,
  } = require("../auth/passport-auth");

  //add category 
router.post(
    "/addNew", passport.authenticate("jwt", { session: false }) , CategoryController.addCategory
  );

  // update category 
  router.patch("/update/:id",   passport.authenticate("jwt", { session: false }), CategoryController.UpdateCategory);
  
  //get all categories 
  router.get(
    "/all", passport.authenticate("jwt", { session: false }) , CategoryController.GetAllCategories
  );

  //get category by id 
  router.get("/:id" ,passport.authenticate("jwt", { session: false }) , CategoryController.GetCategoryById);
  
  //delete category 
  router.delete("/delete/:id",   passport.authenticate("jwt", { session: false }), CategoryController.deleteCategory);
module.exports= router;  