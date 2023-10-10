
const Reg=require('../model/regshema')
const bcrypt=require('bcrypt')









exports.loginpage=(req,res)=>{
    res.render('login.ejs',{message:''})
}
exports.registerpage=(req,res)=>{
    res.render('reg.ejs',{message:''})
}
exports.register=async(req,res)=>{
    const {name,password}=req.body
    const usercheck= await Reg.findOne({username:name})
    const passwordconvert=await bcrypt.hash(password,10)
    if(usercheck==null){
    const record=new Reg({username:name,password:passwordconvert})
    record.save()
    res.render('reg.ejs',{message:`${name} username successfully created`})
    }
    else{
       res.render('reg.ejs',{message:`${name} username is already registered `}) 
    }
}


exports.logincheck=async(req,res)=>{
const {username,pass}=req.body
const record=await Reg.findOne({username:username})
if(record!=null){
    const passwordcompair=await bcrypt.compare(pass,record.password)
    if(passwordcompair){
        req.session.isAuth=true
        req.session.loginname=username
       res.redirect('/parking')
    }
    else{
        res.render('login.ejs',{message:"worng credenatils"})
    }
}
else{
    res.render('login.ejs',{message:"worng credenatils"})
    
}
}






exports.logout=(req,res)=>{
 req.session.destroy()
 res.redirect('/')
}