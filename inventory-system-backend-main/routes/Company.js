const express = require("express");
const router = express.Router();
const CompanyController = require("../controller/Company");
var {
    passport,
    authAdmin,
    authManager,
    authenticate,
  } = require("../auth/passport-auth");

  

  // add company 
router.post(
    "/addNew", passport.authenticate("jwt", { session: false }) , CompanyController.addCompany
  );

  // update company 
  router.patch("/update/:id",   passport.authenticate("jwt", { session: false }), CompanyController.UpdateCompany);
  //get all companies 
  router.get(
    "/all", passport.authenticate("jwt", { session: false }) , CompanyController.GetAllCompanies
  );

  //get company by id 
  router.get("/:id" ,passport.authenticate("jwt", { session: false }) , CompanyController.GetCompanyById);
  
  //delete company
  router.delete("/delete/:id",   passport.authenticate("jwt", { session: false }), CompanyController.deleteCompany);
  
  ///////
module.exports= router;  