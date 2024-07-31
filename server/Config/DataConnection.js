const mongoose = require("mongoose")

const ConnectDatabase = ()=>{
    mongoose.connect(process.env.DATA_URL).then(()=>{
        console.log("Database connected")
    })
}

module.exports = ConnectDatabase;