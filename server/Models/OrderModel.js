const { default: mongoose } = require("mongoose");

const OrderSchema=new mongoose.Schema({
    cartItems:Array ,
    amount:String ,
    status:String ,
    createdAt: Date
})

const orderModel=mongoose.model('/order',OrderSchema)
module.exports=orderModel;