// const express = require("express");
const orderDetails = require("../models/orderDetails");


// ////////////////////////////////////////////add order details//////////////////////////////////////////////////


exports.addorderDetails = async (req , res ) => {
    try {
        const { quantity , unitPrice , orderId , productId , orderDetailStatus ,companyId } = req.body;

          const purchase_Order = await orderDetails.create({
            quantity , unitPrice , orderId , productId , orderDetailStatus , companyId  })
res.status(201).json({
    status: "success",
    data : purchase_Order
})

    } catch (error) {
        res.status(401).json(error.message);
        console.log(error.message);
    }



}