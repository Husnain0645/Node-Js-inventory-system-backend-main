
const Purchase_Order_details = require("../models/purchase_order_details");



// ////////////////////////////////////////////add product order details //////////////////////////////////////////////////

exports.addpurchase_order = async (req , res ) => {
    try {
        const { suggestedBoxes, quantity , serviceorderBoxQtyCharges , purchaseOrderId , productId , companyId } = req.body;

          const purchase_Order = await Purchase_Order_details.create({
            suggestedBoxes, quantity , serviceorderBoxQtyCharges, purchaseOrderId , productId , companyId  })
res.status(201).json({
    status: "success",
    data : purchase_Order
})

    } catch (error) {
        res.status(401).json(error.message);
        console.log(error.message);
    }



}