const mongoose=require('mongoose')

const parkingSchema= new mongoose.Schema({
    username:String,
    password:String
})

module.exports=mongoose.model('reg',parkingSchema)