const mongoose = require("mongoose");

function connectDB(){

    mongoose.connect('mongodb+srv://keshavgowda:keshav123@cluster0.bhjsp0y.mongodb.net/myflights' , {useUnifiedTopology: true , useNewUrlParser: true})
   // mongodb://localhost:27017/Flights

    const connection = mongoose.connection

    connection.on('connected' , ()=>{
        console.log('Mongo DB Connection Successfull')
    })

    connection.on('error' , ()=>{
        console.log('Mongo DB Connection Error')
    })


}

connectDB()

module.exports = mongoose