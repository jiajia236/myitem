const express=require('express');
const bodyParser=require('body-parser');
const md5=require('md5');
const cors=require('cors');
// const svgCaptcha=require('svg-captcha');
// const cookieParser=require("cookie-parser");

const app=express();
app.listen(3000);

app.use(cors({
  origin: ['http://localhost:9528', 'http://127.0.0.1:9528']
}));


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

// app.use(cookieParser);
app.use(bodyParser.urlencoded({extended:false}));


////////////////////////////////////////////////////
//lijiajun

app.post("/adminlog",(req,res)=>{
  let username=req.body.username;
  let password=req.body.password;
  pool.query("select uaid from Useradmin where username=? and password=?",[username,password],(err,result)=>{
    if(err) throw err;
    res.send(result);
  });
});

app.get("/userlist",(req,res)=>{
  let page=req.query.page;
  let limit=Number(req.query.limit);
  let offset=(page-1)*limit;
  pool.query("select uid,nickname,sex,birthday,orderinfo from UserInfo limit ?,?",[offset,limit],(err,result)=>{
    if(err) throw err;
    res.send(result);
  });
});

app.post("/reg",(req,res)=>{
  let uname=req.body.uname;
  let upwd=req.body.upwd;
  let nickname=req.body.nickname
  pool.query("insert into UserInfo(uname,upwd,nickname) values(?,md5(?),?)",[uname,upwd,nickname],(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0){
      res.send({code:200,msg:"ok"});
    }else{
      res.send({code:201,msg:"no"});
    }
  });
})

app.get("/search",(req,res)=>{
  let uname=req.query.uname;
  pool.query("select uid from UserInfo where uname=?",[uname],(err,result)=>{
    if(err) throw err;
    if(result.length>0){
      res.send({code:201,msg:"uname exists"});
    }else{
      res.send({code:200,msg:"ok"});
    }
  });
});

app.post("/login",(req,res)=>{
  let uname=req.body.uname;
  let upwd=md5(req.body.upwd);
  pool.query("select uid,uname,avatar,nickname,sex,birthday,addproduct,orderinfo from UserInfo where uname=? and upwd=?",[uname,upwd],(err,result)=>{
    if(err) throw err;
    if(result.length>0){
      res.send({code:200,result});
    }else{
      res.send({code:201,msg:"no"});
    }
  });
});

app.get("/list",(req,res)=>{
	let page=req.query.page;
	let limit=Number(req.query.limit);
	let offset=(page-1)*limit;
	pool.query("select pstatus,pnumber,pid,ptitle,pprice,pimg,pintro,pnumber,pstatus from jjproduct limit ?,?",[offset,limit],(err,result)=>{
		if(err) throw err;
		res.send(result);
	});
});

app.post("/update",(req,res)=>{
  let uname=req.body.uname;
  console.log(req.body);
  pool.query("update UserInfo set ? where uname=?",[req.body,uname],(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0){
      res.send({code:200,msg:"ok"});
    }else{
      res.send({code:201,msg:"no"});
    }
  })
});

app.get("/userfn",(req,res)=>{
  pool.query("select img,msg,router from UserFn",(err,result)=>{
    if(err) throw err;
    if(result.length>0){
      res.send(result);
    }else{
      res.send({code:201,msg:"error"});
    }
  });
});

app.get("/type",(req,res)=>{
  pool.query("select TypeId,TypeName,TypeImg from jjTypeName",(err,result)=>{
    if(err) throw err;
    // console.log(result);
    if(result.length>0){
      res.send(result);
    }else{
      res.send({code:201,msg:"no"});
    }
  });
});

app.get("/recommend",(req,res)=>{
  pool.query("select rtitle,rdet,pid,pprice,pimg from jjrecommend inner join jjproduct on p_id=pid",(err,result)=>{
    if(err) throw err;
    res.send(result);
    
  });
  
});

app.get("/product",(req,res)=>{
  console.log(req.query);
  let page=req.query.page;
  let pagesize=8;
  let offset=(page-1)*pagesize;
  let TypeId=req.query.TypeId;
  pool.query("select TypeName from jjTypeName where TypeId=?",[TypeId],(err,result)=>{
    if(err) throw err;
    let result1=result;
    pool.query("select pid,ptitle,pprice,pimg,pintro from jjproduct where Type_Id=? limit ?,?",[TypeId,offset,pagesize],(err,result)=>{
      // console.log(result);
      if(err) throw err;
      res.send({result,result1});
    });
  })
  
});

app.get("/details",(req,res)=>{
  let pid=req.query.pid;
  pool.query("select pid,pnumber,pstatus,pcount,ptitle,pdetails,pprice,pimg,pintro from jjproduct where pid=?",[pid],(err,result)=>{
    console.log(result);
    if(err) throw err;
    res.send(result);
  });
});

app.get("/maintype",(req,res)=>{
  let mid=req.query.mid;
  pool.query("select mtitle from jjmaintype",(err,result)=>{
    if(err) throw err;
    let result1=result;
    pool.query("select pid,ptitle,pimg from jjproduct where m_id=?",[mid],(err,result)=>{
      if(err) throw err;
      res.send({result,result1});
    });
  });
 
});

app.post("/updatepro",(req,res)=>{
  let pid=req.body.pid;
  console.log(req.body);
  pool.query("update jjproduct set ? where pid=?",[req.body,pid],(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0){
      res.send({code:200,msg:"ok"});
    }else{
      res.send({code:201,msg:"no"});
    }
  })
});

app.post("/deletepro",(req,res)=>{
  let pid=req.body.pid;
  console.log(pid);
  pool.query("delete from jjproduct where pid=?",[pid],(err,result)=>{
	if(err) throw err;
	if(result.affectedRows>0){
		res.send({code:200,msg:"del ok"});
	}else{
		res.send({code:201,msg:"del fail"});
	}
  })
});

////////////////////////////////////////////////




