const express=require('express')
const app=express()
const router=require('./router/parking')
const session=require('express-session')
const mongoose=require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/parking').then(()=>{
    console.log('ok')
})







app.use(express.urlencoded({extended:false}))
app.use(session({
    secret:'ravi',
    resave:false,
    saveUninitialized:false,
    cookie:{maxAge:1000*60*60*24*365}
}))
app.use(router)
app.use(express.static('public'))
app.set('view engine','ejs')
app.listen(5000,()=>{console.log('server is running on port 5000')})