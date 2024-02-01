const express= require('express');
const mongoose=require('mongoose');
const route=require('./Route/routes');
const dotenv =require('dotenv').config()
const {PORT,MONGOOSE_STRING}=process.env;
const cors=require('cors');
const app=express()

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

mongoose.connect(MONGOOSE_STRING,{usenewurlparser:true})
.then(()=>console.log('connected to mongoose'))
.catch((err)=>console.log(err.message));

app.use('/',route);

app.listen(PORT, ()=>{
    console.log('express running on port',PORT)
})