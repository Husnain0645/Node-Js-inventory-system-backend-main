const express = require("express");
const Product = require("../models/Product");
// const Category = require("../models/category");


// ////////////////////////////////////////////add product //////////////////////////////////////////////////
exports.addProducts = async (req , res ) => {

    
    try {
        const {name , description , formula , registrationNumber , companyId , productTypeId , categoryId } = req.body;
        
          var newproduct = await Product.create({
            name , description , formula , registrationNumber , companyId , productTypeId , categoryId })
            .then(()=>{
              res.json({
                message : "Success"
              })
            })
          

    } catch (error) {
        res.status(401).json(error.message);
        console.log(error.message);
    }

}


exports.GetAllProducts = async (req , res ) => {
        const products = await Product.findAll( {where :{ Active : true }, attributes : {exclude : ["Active"]}
    } , { 
            include : [Category]
        })
        .catch((err)=>{
          res.status(204).json({
            Error : err.message,
          });
        });
      
        // SEND RESPONSE
        res.status(200).json({
          status: 'success',
          results: products.length,
          data: {
            products
          }
        });
      };

exports.GetProductById = async (req, res) => {
        await Product.findAll({where : {id : req.params.id}})
         .then (lists => {
             res.status(200).send(lists);
         })
         .catch(err => console.log(err));
         
       };
////////////////////////////////////////////update product///////////////////////////////////////////////////

exports.UpdateProduct = async (req , res)=> {



  const {name , description , formula , RegistrationNumber , CompanyId , productTypeId , CategoryId } = req.body;
    //find product 
   const FindProduct = await Product.findOne({where : {id : req.params.id}})
   //update product 
      const pr=  await FindProduct.update({name , description , formula , RegistrationNumber , CompanyId , productTypeId , CategoryId
                }).then(()=> {
                  res.send('success');
                }).catch((error)=> {
                  res.send(error.message);
                })
            
    
    
    

}

      
///////////////////////////delete Product 
exports.deleteProduct = async (req, res, next) => {
    // const finduser = await User.update({where :{ id : req.user.id}})
    await Product.update({Active : false },{ where: { id :  req.params.id } }).then(()=>{
  res.status(201).json({
  message : "deleted "
  })
  }).catch((err)=>{
  res.status(400).json({
  error : err.message
  })
  })
  };


    //  }
    //  //Delete User 
    //  exports.deleteMe = async (req, res, next) => {
    //    // const finduser = await User.update({where :{ id : req.user.id}})
    //    await User.update({Active : false },{ where: { id: req.user.id } }).then(()=>{
    //  res.status(201).json({
    //  message : "successfully updated  "
    //  })
    //  }).catch((err)=>{
    //  res.status(400).json({
    //  error : err.message
    //  })
    //  })
    //  };