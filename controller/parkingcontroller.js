const Parking=require('../model/parkingschema')

exports.parkingpage=async(req,res)=>{
    const loginname=req.session.loginname
    const record= await Parking.find()
    res.render('parking.ejs',{loginname,record})
}

exports.parkingform=(req,res)=>{
    const loginname=req.session.loginname
    res.render('parkingform.ejs',{loginname})
}

exports.parkingadd=(req,res)=>{
    const {vno,vtype}=req.body
    const vtime=new Date()
    const record=new Parking({ vno:vno,vtype:vtype,vin:vtime})
    record.save()
    res.redirect('/parking')
}

exports.parkingupdate=async(req,res)=>{
    const id=req.params.id
    let outtime=new Date()
    const record=await Parking.findById(id)
    let consumedtime=(outtime-record.vin)/(1000*60*60)
    let amount=null
    if(record.vtype=="2w"){
      amount=consumedtime*30
    }
    else if(record.vtype=="3w"){
     amount=consumedtime*40
    }
    else if(record.vtype=="4w"){
        amount=consumedtime*50
       }
       else if(record.vtype=="hw"){
        amount=consumedtime*100
       }
       else if(record.vtype=="lw"){
        amount=consumedtime*80
       }
       else{
        amount=consumedtime*60
       }
       await Parking.findByIdAndUpdate(id,{vout:outtime,amount:Math.round(amount),status:'OUT'})
       res.redirect('/parking')

}



exports.print=async(req,res)=>{
   const id=req.params.id
   const record=await Parking.findById(id)
   console.log(record)
   res.render('print.ejs',{record})
}