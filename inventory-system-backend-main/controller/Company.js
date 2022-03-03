const express = require("express");
const Company = require("../models/companies");



////////////////////////////////////////////get all company ///////////////////////////////////////////////////
exports.addCompany = async (req , res ) => {
    try {
        const {name , email , phone , website , contactNumber , contactPerson , address } = req.body;

          const company = await Company.create({
            name , email , phone , website , contactNumber , contactPerson , address}).then(()=>{
                res.status(201).json({
                    status: "success",
                    message: "New comapny Added ",
                })
            })


    } catch (error) {
        res.status(401).json(error.message);
        console.log(error.message);
    }



}

////////////////////////////////////////////get all company ///////////////////////////////////////////////////

exports.GetAllCompanies = async (req , res ) => {
    const category = await Company.findAll( {where :{ Active : true }, attributes : {exclude : ["Active"]}
} ,)
    .catch((err)=>{
      res.status(204).json({
        Error : err.message,
      });
    });
  
    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: category.length,
      data: {
        category
      }
    });
  };
////////////////////////////////////////////get company By id  ///////////////////////////////////////////////////
exports.GetCompanyById = async (req, res) => {
    await Company.findOne({where : {id : req.params.id}})
     .then (lists => {
         res.status(200).send(lists);
     })
     .catch(err => console.log(err));
     
   };
////////////////////////////////////////////update company///////////////////////////////////////////////////

exports.UpdateCompany= async (req , res)=> {

    const {name , Email , Phone , Website , contactNumber , contactPerson , address } = req.body;
    const findcompany = await Company.findOne({where : {id : req.params.id}})
    await findcompany.update({name , Email , Phone , Website , contactNumber , contactPerson , address}).then(()=>{
      res.status(201).json({
        message : "successfully updated  "
      })
    }).catch((err)=>{
      res.status(400).json({
        error : err.message
      })
    })
   
  
  }

  
///////////////////////////delete company 
exports.deleteCompany= async (req, res, next) => {
// const finduser = await User.update({where :{ id : req.user.id}})
await Company.update({Active : false },{ where: { id :  req.params.id } }).then(()=>{
res.status(201).json({
message : "deleted "
})
}).catch((err)=>{
res.status(400).json({
error : err.message
})
})
};