//引入express模块
const express=require('express');

//创建web服务器对象
const server=express();

//配置body-parser中间件
const bodyParser=require('body-parser');

//引入cors模块
const cors=require('cors');

//使用cors中间件
server.use(cors({
  origin:['http://127.0.0.1:8080','http://localhost:8080']
}))

//使用body-parser中间件
server.use(bodyParser.urlencoded({
  extended:false
}))

//引入mysql模块
const mysql=require('mysql');
const { error, count } = require('console');
const { query } = require('express');
const { urlencoded } = require('body-parser');
const md5 = require('md5');
const pool=mysql.createPool({
  host:'127.0.0.1',
  port:3306,
  user:'root',
  password:'',
  database:'xzqa',
  connectionLimit:20,
  charset:'utf8'
});

//获取所有文章分类接口
server.get("/category",(req,res)=>{
  let sql="select id,category_name from xzqa_category";
  pool.query(sql,(err,result)=>{
    if(err) throw error;
    res.send({message:'ok',code:200,result:result});
  })
});

//获取指定文章下包含文章数据的接口
// server.get("/articles",(req,res)=>{
//   let cid=req.query.cid;
//   let sql="select id,subject,description,image from xzqa_article where category_id=?";
//   pool.query(sql,[cid],(err,result)=>{
//     if(err) throw error;
//     res.send({message:'ok',code:200,result:result})
//   })
// })

//分页获取指定文章下包含的文章数据的接口
server.get("/articles",(req,res)=>{
  //获取文章分类的值
  let cid=req.query.cid;
  //获取文章分页的第几页的值
  let page=req.query.page;
  //如果没有传第几页,默认第一页
  if(!page){page=1}
  //储存每页显示多少条数据
  let pagesize=10;
  //从第几条数据开始返回
  let offset=(page-1)*pagesize;
  //声明一个用于获取到的总记录数
  let count;
  //获取指定分类下的文章总数
  pool.query("select count(id) AS count from xzqa_article where category_id=?",[cid],(err,result)=>{
    if(err) throw error;
    console.log(result)
    count=result[0].count
    console.log(count)
    /////////
    //获取总页数
    let pagecount=Math.ceil(count/pagesize);
    console.log(pagecount)
    let sql="select id,subject,image,description from xzqa_article where category_id=? limit ?,?";
    pool.query(sql,[cid,offset,pagesize],(err,result)=>{
      if(err) throw error;
      res.send({message:'ok',code:200,result:result,pagecount:pagecount})
    })
    ////////
  })
})

//获取指定详情页下包含的文章数据接口
server.get("/review",(req,res)=>{
  let id=req.query.id;
  console.log(id)
  let sql = 'select subject,content,created_at,nickname,avatar,article_number from xzqa_article inner join xzqa_author on xzqa_article.author_id = xzqa_author.id where xzqa_article.id=?';
  pool.query(sql,[id],(error,result)=>{
    if(error) throw error;
    console.log(result)
    res.send({code:200,message:"查询成功",result:result[0]});
  });
})

//用户注册的接口
server.post("/register",(req,res)=>{
  //获取用户名和密码的信息
  let username=req.body.username;
  let password=req.body.password;
  //以username为条件查找xzqa_author表单中是否存在该用户
  let sql="select count(id) as count from xzqa_author where username=?";
  //执行查询sql语句
  pool.query(sql,[username],(error,result)=>{
    //如果错误抛出错误
    if(error) throw error;
    //判断是否查找到该用户
    if(result[0].count){//如果查找到该用户 1==true,0==false
      //返回代码201,用户注册失败
      res.send({message:'用户注册失败',code:201})
    }else{//否则
      //以username和password添加进xzqa_author表单中
      sql="insert into xzqa_author(username,password) values(?,md5(?))"
      //执行添加sql语句
      pool.query(sql,[username,password],(error,result)=>{
        //如果错误抛出错误
        if(error) throw error;
        //返回代码200,用户注册成功
        res.send({message:'用户注册成功',code:200})
      })
    }
  })
})

//用户登录的接口
server.post("/login",(req,res)=>{
  let username=req.body.username;
  let password=md5(req.body.password);
  let sql="select id,username,nickname,avatar,article_number from xzqa_author where username=? and password=?";
  pool.query(sql,[username,password],(error,result)=>{
    if(error) throw error;
    if(result.length){
      res.send({message:"登录成功",code:200,result:result[0]})
    }else{
      res.send({message:"登录失败",code:201})
    }
  })
})

//指定服务器对象监听对象
server.listen(3000);

