const cors=require('cors')
//import .env
require('dotenv').config();
const express=require('express');
const app=express();

//Connect Database
const connectDatabase=require('./Config/DataConnection.js')
connectDatabase();

//middleware
app.use(express.json());
app.use(cors())

//product routing
const products=require('./Controllers/ProductController.jsx')
app.use('/ecommerce',products)

//order routing
const order=require('./Controllers/OrderController.jsx')
app.use('/ecommerce',order)


app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
})