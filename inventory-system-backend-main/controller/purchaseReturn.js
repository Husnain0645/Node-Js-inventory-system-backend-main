const express = require("express");
const purchase_return = require("../models/purchase_return");



// ////////////////////////////////////////////add purchase return  //////////////////////////////////////////////////
exports.purchaseReturn  = async (req , res ) => {

    
    try {
        const {  remarks ,returnType , posted, stockAffect , purchaseOrderId , companyId , distributerId } = req.body;
        // 
        //  const category = await Category.findOne({where :{id : CategoryId}})
          var newproduct = await purchase_return.create({
            remarks ,returnType , return_Date : Date.now(), posted, stockAffect , purchaseOrderId ,   companyId , distributerId , returnDate : Date.now() })
            .then(()=>{
              res.json({
                message : "Success" ,
                data : newproduct
              })
            })
          

    } catch (error) {
        res.status(401).json(error.message);
        console.log(error.message);
    }

}


// exports.GetAllProducts = async (req , res ) => {
//         const products = await Product.findAll( {where :{ Active : true }, attributes : {exclude : ["Active"]}
//     } , { 
//             include : [Category]
//         })
//         .catch((err)=>{
//           res.status(204).json({
//             Error : err.message,
//           });
//         });
      
//         // SEND RESPONSE
//         res.status(200).json({
//           status: 'success',
//           results: products.length,
//           data: {
//             products
//           }
//         });
//       };

// exports.GetProductById = async (req, res) => {
//         await Product.findAll({where : {id : req.params.id}})
//          .then (lists => {
//              res.status(200).send(lists);
//          })
//          .catch(err => console.log(err));
         
//        };
// ////////////////////////////////////////////update product///////////////////////////////////////////////////

// exports.UpdateProduct = async (req , res)=> {



//   const {name , description , formula , RegistrationNumber , CompanyId , productTypeId , CategoryId } = req.body;
//     //find product 
//    const FindProduct = await Product.findOne({where : {id : req.params.id}})
//    //update product 
//       const pr=  await FindProduct.update({name , description , formula , RegistrationNumber , CompanyId , productTypeId , CategoryId
//                 }).then(()=> {
//                   res.send('success');
//                 }).catch((error)=> {
//                   res.send(error.message);
//                 })
            
    
    
    

// }

      
// ///////////////////////////delete Product 
// exports.deleteProduct = async (req, res, next) => {
//     // const finduser = await User.update({where :{ id : req.user.id}})
//     await Product.update({Active : false },{ where: { id :  req.params.id } }).then(()=>{
//   res.status(201).json({
//   message : "deleted "
//   })
//   }).catch((err)=>{
//   res.status(400).json({
//   error : err.message
//   })
//   })
//   };


