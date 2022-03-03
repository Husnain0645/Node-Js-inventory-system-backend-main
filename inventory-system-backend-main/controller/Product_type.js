const express = require("express");
const Product_type = require("../models/product_type");




// ////////////////////////////////////////////add product type//////////////////////////////////////////////////

exports.addProduct_type = async (req , res ) => {
    try {
        const {productType } = req.body;

          const company = await Product_type.create({
            productType })
res.status(201).json({
    status: "success",
    message: " Added ",
})

    } catch (error) {
        res.status(401).json(error.message);
        console.log(error.message);
    }



}

////////////////////////////////////////////get all product type/ ///////////////////////////////////////////////////

exports.GetAllProduct_type = async (req , res ) => {
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
////////////////////////////////////////////get Category By id  ///////////////////////////////////////////////////
exports.GetProduct_typeById = async (req, res) => {
    await Product_type.findOne({where : {id : req.params.id}})
     .then (lists => {
         res.status(200).send(lists);
     })
     .catch(err => console.log(err));
     
   };
////////////////////////////////////////////update product type////////////////////////////////////////////////////

exports.UpdateProduct_type= async (req , res)=> {

    const {product_type } = req.body;
    const findcompany = await Product_type.findOne({where : {id : req.params.id}})
    await findcompany.update({product_type}).then(()=>{
      res.status(201).json({
        message : "successfully updated  "
      })
    }).catch((err)=>{
      res.status(400).json({
        error : err.message
      })
    })
   
  
  }

  
///////////////////////////delete product type/
exports.deleteProduct_type = async (req, res, next) => {
// const finduser = await User.update({where :{ id : req.user.id}})
await Product_type.update({Active : false },{ where: { id :  req.params.id } }).then(()=>{
res.status(201).json({
message : "deleted "
})
}).catch((err)=>{
res.status(400).json({
error : err.message
})
})
};