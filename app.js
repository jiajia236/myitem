const express=require('express');
const bodyParser=require('body-parser');
const app=express();
app.listen(3000);


const mysql =require('mysql');
const pool=mysql.createPool({
  host:"127.0.0.1",
  port:3306,
  user:"root",
  password:"",
  database:"flower",
  connectionLimit:20,
  charset:"utf8"
});

app.use(bodyParser.urlencoded({extended:false}));

app.get("/ceshi",(req,res)=>{
  pool.query("select * from userInfo",(err,result)=>{
    if(err) throw err;
    res.send(result);
  });
}); 