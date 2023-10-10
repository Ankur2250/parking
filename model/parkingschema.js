const mongoose=require('mongoose')

const parkingschema=new mongoose.Schema({
    vno:String,
    vtype:String,
    vin:Date,
    vout:Date,
    amount:Number,
    status:{type:String,default:'IN'}
})









module.exports=mongoose.model('parking',parkingschema)