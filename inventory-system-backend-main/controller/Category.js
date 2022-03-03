const express = require("express");
const Category = require("../models/category");




exports.addCategory = async (req , res ) => {
    try {
        const {name , description , picture  } = req.body;

          const category = await Category.create({
            name , description , picture })
res.status(201).json({
    status: "success",
    message: "New category Added ",
})

    } catch (error) {
        res.status(401).json(error.message);
        console.log(error.message);
    }



}

////////////////////////////////////////////get all Categories ///////////////////////////////////////////////////

exports.GetAllCategories = async (req , res ) => {
    const category = await Category.findAll( {where :{ Active : true }, attributes : {exclude : ["Active"]}
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
exports.GetCategoryById = async (req, res) => {
    await Category.findOne({where : {id : req.params.id}})
     .then (lists => {
         res.status(200).send(lists);
     })
     .catch(err => console.log(err));
     
   };
////////////////////////////////////////////update Category///////////////////////////////////////////////////

exports.UpdateCategory = async (req , res)=> {

  const {name , description , picture  } = req.body;
    const FindCategory = await Category.findOne({where : {id : req.params.id}})
    await FindCategory.update({name , description , picture }).then(()=>{
      res.status(201).json({
        message : "successfully updated  "
      })
    }).catch((err)=>{
      res.status(400).json({
        error : err.message
      })
    })
   
  
  }

  
///////////////////////////delete Category 
exports.deleteCategory = async (req, res, next) => {
// const finduser = await User.update({where :{ id : req.user.id}})
await Category.update({Active : false },{ where: { id :  req.params.id } }).then(()=>{
res.status(201).json({
message : "deleted "
})
}).catch((err)=>{
res.status(400).json({
error : err.message
})
})
};