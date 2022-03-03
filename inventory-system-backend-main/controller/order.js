// const express = require("express");
const orders = require("../models/orders");



// ////////////////////////////////////////////add order //////////////////////////////////////////////////
exports.addorder = async (req , res ) => {
    try {
        const {amount , serviceCharges ,userRating , deliveryCharges , paymentDetails } = req.body;

          const purchase_Order = await orders.create({
            amount , serviceCharges ,userRating , deliveryCharges , paymentDetails , userId : req.user.id , orderDate : Date.now() })
res.status(201).json({
    status: "success",
    data : purchase_Order
})

    } catch (error) {
        res.status(401).json(error.message);
        console.log(error.message);
    }



}