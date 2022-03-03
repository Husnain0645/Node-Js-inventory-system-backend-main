const express = require("express");
const router = express.Router();
const disributerController = require("../controller/Distributer");
var {
    passport,
    authAdmin,
    authManager,
    authenticate,
  } = require("../auth/passport-auth");

  
  //add distributer 
router.post(
    "/addNew", passport.authenticate("jwt", { session: false }) ,disributerController.adddistributer
  );
//   router.patch("/Update/:id",   passport.authenticate("jwt", { session: false }), CompanyController.UpdateCompany);
//   router.get(
//     "/All", passport.authenticate("jwt", { session: false }) , CompanyController.GetAllCompanies
//   );
//   router.get("/:id" ,passport.authenticate("jwt", { session: false }) , CompanyController.GetCompanyById);
  
//   router.delete("/Delete/:id",   passport.authenticate("jwt", { session: false }), CompanyController.deleteCompany);
  
  ///////
module.exports= router;  