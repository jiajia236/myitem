#设置客户端服务器端的连接编码
set names utf8;

#丢弃数据库如果存在
drop database if exists flower;

#创建数据库，设置连接编码为utf8
create database flower charset=utf8;

#进入数据库
use flower;

#####################################
#lijiajun

#创建数据表Useradmin
create table Useradmin(
  uaid int primary key auto_increment,
  username varchar(11) not null unique,
  password varchar(16) not null,
  ur_id smallint unsigned,
  foreign key(ur_id) references Userrole(urid);
);

#插入数据
insert into Useradmin values(null,'admin','123456');
insert into Useradmin values(null,'editor','123456');
insert into Useradmin values(null,'admin3','123456');
insert into Useradmin values(null,'admin4','123456');

#创建角色表Userrole
create table Userrole(
  urid smallint unsigned primary key auto_increment,
  urname varchar(15) not null unique,
  urremark varchar(50),
  -- urrouter varchar(500)
);
#插入数据
insert into Userrole values(null,"超级管理员","可管理所有权限");
insert into Userrole values(null,"管理员","可管理部分权限");

#创建数据表Userquanxian
create table Userquanxian(
  uqid smallint unsigned primary key auto_increment,
);

#创建数据表UserInfo
create table UserInfo(
  uid int primary key auto_increment,
  uname varchar(11) not null unique,
  upwd varchar(32) not null,
  avatar varchar(50) default "/img/myinfo/default.png",
  nickname varchar(8) default "root", 
  sex char(1) default 1,
  birthday varchar(20),
  addproduct varchar(10000) default null,
  orderinfo varchar(10000) default null
);

#插入数据
insert into UserInfo values(null,"15802328510","DBB1C112A931EEB16299D9DE1F30161D",default,default,1,791827200000,null,null);

#创建数据表UserFn
create table UserFn(
  ufnid tinyint unsigned primary key auto_increment,
  img varchar(30) not null,
  msg varchar(12) not null,
  router varchar(30) not null
);

#插入数据
insert into UserFn values(null,"/img/myinfo/address.png","地址管理","/myaddress");
insert into UserFn values(null,"/img/myinfo/quanyi.png","权益卡","/mycard");
insert into UserFn values(null,"/img/myinfo/rest.png","余额","/myrest");
insert into UserFn values(null,"/img/myinfo/remoke.png","生日纪念","/mybirth");
insert into UserFn values(null,"/img/myinfo/help.png","客服与帮助","/myhelp");
insert into UserFn values(null,"/img/myinfo/about.png","关于我们","/myabout");
insert into UserFn values(null,"/img/myinfo/set.png","设置","/myset");

#创建数据表jjTypeName
create table jjTypeName(
  TypeId tinyint unsigned primary key auto_increment,
  TypeName varchar(8) not null,
  TypeImg varchar(30)
);

#插入数据
insert into jjTypeName values(null,"鲜花","/img/index/flower.png");
insert into jjTypeName values(null,"巧克力","/img/index/chocolate.png");
insert into jjTypeName values(null,"蛋糕","/img/index/cake.png");
insert into jjTypeName values(null,"礼品","/img/index/gift.png");
insert into jjTypeName values(null,"情人西施","/img/index/love.png");
insert into jjTypeName values(null,"生日祝福","/img/index/bircake.png");
insert into jjTypeName values(null,"表白求婚","/img/index/biaobai.png");
insert into jjTypeName values(null,"周年纪念","/img/index/remoke.png");

#创建数据表jjmaintype
create table jjmaintype(
  mid tinyint unsigned primary key auto_increment,
  mtitle varchar(8) not null
);
#插入数据
insert into jjmaintype values(null,"热门推荐");
insert into jjmaintype values(null,"送恋人");
insert into jjmaintype values(null,"送友人");
insert into jjmaintype values(null,"送长辈");


#创建商品数据表jjproduct
create table jjproduct(
 pid int primary key auto_increment,
 ptitle varchar(15) not null unique,
 pprice decimal(6,2) not null,
 pimg varchar(30) not null,
 pintro varchar(20), 
 pdetails varchar(3000) not null,
 pcount tinyint unsigned not null, 
 pstatus tinyint(1) not null default 0,
 pnumber smallint unsigned not null default 0,
 Type_Id tinyint unsigned,
 m_id tinyint unsigned,
 foreign key(Type_Id) references jjTypeName(TypeId),
 foreign key(m_id) references jjmaintype(mid)
);

#插入数据
insert into jjproduct values(null,"一往情深","248","/img/index/product/f2.jpg","经典爆款，年销售冠军",'<div class="xiangqing d-flex"><img src="/img/details/line.png" alt="">商品详情<img src="/img/details/line.png" alt=""></div><img src="/img/details/d2f1.jpg" alt=""><div class="common"><div class="d-flex"><p class="dtitle">花语</p><p>你的轻柔像阵微风，让我从容不迫，想让你知道，我对你始终一往情深。</p></div><div class="d-flex"><p class="dtitle">材料</p><p>高档礼盒装鲜花:19枝卡罗拉红玫瑰，勿忘我1枝</p></div></div><div><img src="/img/details/d2f2.jpg" alt=""><img src="/img/details/d2f3.jpg" alt=""><img src="/img/details/d2f4.jpg" alt=""><img src="/img/details/d2f5.jpg" alt=""><img src="/img/details/d2f6.jpg" alt=""><img src="/img/details/d2f7.jpg" alt=""><img src="/img/details/d1f8.jpg" alt=""></div>',1,0,1000,1,1);

insert into jjproduct values(null,"你是唯一","136","/img/index/product/f3.jpg","人间蹉跎，你是唯一值得",' <div class="xiangqing d-flex"><img src="/img/details/line.png" alt="">商品详情<img src="/img/details/line.png" alt=""></div><img src="/img/details/d3f1.jpg" alt=""><div class="common"><div class="d-flex"><p class="dtitle">花语</p><p>人间蹉跎，你是唯一值得</p></div><div class="d-flex"><p class="dtitle">材料</p><p>卡罗拉红玫瑰11枝、白色满天星3枝、尤加利10枝</p></div></div><div><img src="/img/details/d3f2.jpg" alt=""><img src="/img/details/d3f3.jpg" alt=""><img src="/img/details/d3f4.jpg" alt=""><img src="/img/details/d3f5.jpg" alt=""><img src="/img/details/d3f6.jpg" alt=""><img src="/img/details/d3f7.jpg" alt=""><img src="/img/details/d1f8.jpg" alt=""></div>',1,1,1000,1,3);

insert into jjproduct values(null,"韩式系列/你笑起来真好看","468","/img/index/product/f4.jpg","韩式鲜花新品",'<div class="xiangqing d-flex"> <img src="/img/details/line.png" alt=""> 商品详情 <img src="/img/details/line.png" alt=""> </div> <img src="/img/details/d4f1.jpg" alt=""> <div class="common"> <div class="d-flex"> <p class="dtitle">花语</p> <p> 平凡的日子，因为有你的笑容，世界都充满了色彩</p> </div> <div class="d-flex"> <p class="dtitle">材料</p> <p>艾莎玫瑰19枝、白色洋桔梗3枝、5头白色香水百合3枝、尤加利10枝</p> </div> </div> <div> <img src="/img/details/d4f2.jpg" alt=""> <img src="/img/details/d4f3.jpg" alt=""> <img src="/img/details/d4f4.jpg" alt=""> <img src="/img/details/d4f5.jpg" alt=""> <img src="/img/details/d4f6.jpg" alt=""> <img src="/img/details/d4f7.jpg" alt=""> <img src="/img/details/d1f8.jpg" alt=""> </div>',1,0,1000,1,4);

insert into jjproduct values(null,"不变的承诺","997","/img/index/product/f5.jpg","经典99枝，鼎力推荐",'<div class="xiangqing d-flex"> <img src="/img/details/line.png" alt=""> 商品详情 <img src="/img/details/line.png" alt=""> </div> <img src="/img/details/d5f1.jpg" alt=""> <div class="common"> <div class="d-flex"> <p class="dtitle">花语</p> <p> 下雨的时候，给她撑一把雨伞；寒冷的时候，给她一个温暖的臂弯；天黑了，永远有一盏灯为她点亮；晨起时，给她一缕温暖的阳光。爱她，就送她一束99枝的玫瑰花！</p> </div> <div class="d-flex"> <p class="dtitle">材料</p> <p> 99枝卡罗拉红玫瑰</p> </div> </div> <div> <img src="/img/details/d5f2.jpg" alt=""> <img src="/img/details/d5f3.jpg" alt=""> <img src="/img/details/d5f4.jpg" alt=""> <img src="/img/details/d5f5.jpg" alt=""> <img src="/img/details/d5f6.jpg" alt=""> <img src="/img/details/d5f7.jpg" alt=""> <img src="/img/details/d1f8.jpg" alt=""> </div>',1,1,1000,1,2);

insert into jjproduct values(null,"韩式系列/初心不负","375","/img/index/product/f6.jpg","热烈主题的红玫瑰及红色包装",'<div class="xiangqing d-flex"><img src="/img/details/line.png" alt="">商品详情<img src="/img/details/line.png" alt=""></div><img src="/img/details/d1f1.jpg" alt=""><div class="common"> <div class="d-flex"> <p class="dtitle">花语</p> <p> 以热烈主题的红玫瑰及红色包装，搭配象征白色无暇的桔梗为设计主题，打造全新韩式系列。将这一簇美景包裹在一片雪白中，一条满载希望的丝带扎紧了无限的惊喜，只为将全世界的风景奉献于你怀里</p> </div> <div class="d-flex"> <p class="dtitle">材料</p> <p> 韩式花束系列：卡罗拉玫瑰11枝、3头或以上白底粉边洋桔梗5枝（如白底粉边桔梗缺货，可用白色桔梗代替）、大叶尤加利10枝、4枝红豆（红豆属于季节性花材，如缺货用相思梅等类似花材代替</p> </div> </div> <div> <img src="/img/details/d1f2.jpg" alt=""> <img src="/img/details/d1f3.jpg" alt=""> <img src="/img/details/d1f4.jpg" alt=""> <img src="/img/details/d1f5.jpg" alt=""> <img src="/img/details/d1f6.jpg" alt=""> <img src="/img/details/d1f7.jpg" alt=""> <img src="/img/details/d1f8.jpg" alt=""> </div>',1,0,1000,1,2);


insert into jjproduct values(null,"用心爱你","646","/img/index/product/f7.jpg","与你相守，直到天荒地老",'<div class="xiangqing d-flex"> <img src="/img/details/line.png" alt=""> 商品详情 <img src="/img/details/line.png" alt=""> </div> <img src="/img/details/d6f1.jpg" alt=""> <div class="common"> <div class="d-flex"> <p class="dtitle">花语</p> <p> 不管时空怎么转变，世界怎么改变，你的爱总在我心间。</p> </div> <div class="d-flex"> <p class="dtitle">材料</p> <p> 33枝戴安娜玫瑰、66枝卡罗拉红玫瑰、10枝满天星</p> </div> </div> <div> <img src="/img/details/d6f2.jpg" alt=""> <img src="/img/details/d6f3.jpg" alt=""> <img src="/img/details/d6f4.jpg" alt=""> <img src="/img/details/d6f5.jpg" alt=""> <img src="/img/details/d6f6.jpg" alt=""> <img src="/img/details/d6f7.jpg" alt=""> <img src="/img/details/d1f8.jpg" alt=""> </div>',1,1,1000,1,2);

insert into jjproduct values(null,"恋恋情深","311","/img/index/product/f8.jpg","经典款式，简约设计",' <div class="xiangqing d-flex"> <img src="/img/details/line.png" alt=""> 商品详情 <img src="/img/details/line.png" alt=""> </div> <img src="/img/details/d7f1.jpg" alt=""> <div class="common"> <div class="d-flex"> <p class="dtitle">花语</p> <p> 喜欢像是一阵风，而爱你是细水长流</p> </div> <div class="d-flex"> <p class="dtitle">材料</p> <p>11枝香槟玫瑰，多头白百合2枝，栀子叶8枝</p> </div> </div> <div> <img src="/img/details/d7f2.jpg" alt=""> <img src="/img/details/d7f3.jpg" alt=""> <img src="/img/details/d7f4.jpg" alt=""> <img src="/img/details/d7f5.jpg" alt=""> <img src="/img/details/d7f6.jpg" alt=""> <img src="/img/details/d7f7.jpg" alt=""> <img src="/img/details/d1f8.jpg" alt=""> </div>',1,0,1000,1,3);

insert into jjproduct values(null,"甜美公主","589","/img/index/product/f9.jpg","甜美设计，清新典雅",'<div class="xiangqing d-flex"><img src="/img/details/line.png" alt="">商品详情<img src="/img/details/line.png" alt=""></div><img src="/img/details/d8f1.jpg" alt=""><div class="common"><div class="d-flex"><p class="dtitle">花语</p><p>再多一点点距离，我就能靠近你。清晰甜美的空气里，爱你到不能呼吸。</p></div><div class="d-flex"><p class="dtitle">材料</p><p> 各色玫瑰共36枝：坦尼克玫瑰22枝，粉佳人粉玫瑰14枝；粉色桔梗5枝，尤加利5枝</p></div></div><div><img src="/img/details/d8f2.jpg" alt=""><img src="/img/details/d8f3.jpg" alt=""><img src="/img/details/d8f4.jpg" alt=""><img src="/img/details/d8f5.jpg" alt=""><img src="/img/details/d8f6.jpg" alt=""><img src="/img/details/d8f7.jpg" alt=""><img src="/img/details/d8f8.jpg" alt=""><img src="/img/details/d1f8.jpg" alt=""></div>',1,1,1000,1,1);


insert into jjproduct values(null,"元祖慕斯蛋糕","298","/img/index/product/c1.jpg",null,'蛋糕1详情',1,0,1000,3,4);
insert into jjproduct values(null,"元祖鲜奶蛋糕","258","/img/index/product/c2.jpg",null,'蛋糕2详情',1,0,1000,3,1);
insert into jjproduct values(null,"诺心蛋糕","258","/img/index/product/c3.jpg",null,'蛋糕3详情',1,1,1000,3,2);
insert into jjproduct values(null,"雪域蓝莓芝士蛋糕","218","/img/index/product/c4.jpg",null,'蛋糕4详情',1,1,1000,3,3);
insert into jjproduct values(null,"奶油芝士蛋糕","298","/img/index/product/c5.jpg",null,'蛋糕5详情',1,1,1000,3,1);
insert into jjproduct values(null,"Mcake蛋糕","298","/img/index/product/c6.jpg",null,'蛋糕6详情',1,1,1000,3,4);
insert into jjproduct values(null,"窝夫小子蛋糕","159","/img/index/product/c7.jpg",null,'蛋糕7详情',1,1,1000,3,4);
insert into jjproduct values(null,"米卡米卡蛋糕","257","/img/index/product/c8.jpg",null,'蛋糕8详情',1,1,1000,3,1);


insert into jjproduct values(null,"心形永生花巧克力","328","/img/index/product/cho1.jpg",null,'巧克力1详情',1,0,1000,2,4);
insert into jjproduct values(null,"城堡巧克力","209","/img/index/product/cho2.jpg",null,'巧克力2详情',1,1,1000,2,2);
insert into jjproduct values(null,"松露巧克力","288","/img/index/product/cho3.jpg",null,'巧克力3详情',1,1,1000,2,1);
insert into jjproduct values(null,"豪华松露巧克力","308","/img/index/product/cho4.jpg",null,'巧克力4详情',1,1,1000,2,2);
insert into jjproduct values(null,"德国进口手工巧克力","198","/img/index/product/cho5.jpg",null,'巧克力5详情',1,1,1000,2,3);
insert into jjproduct values(null,"夹心巧克力","162","/img/index/product/cho6.jpg",null,'巧克力6详情',1,1,1000,2,2);
insert into jjproduct values(null,"手工巧寇","328","/img/index/product/cho7.jpg",null,'巧克力7详情',1,1,1000,2,1);
insert into jjproduct values(null,"德国酒心巧克力","328","/img/index/product/cho8.jpg",null,'巧克力8详情',1,0,1000,2,4);

insert into jjproduct values(null,"旋转蓝牙音箱","296","/img/index/product/g1.jpg",null,'礼品1详情',1,0,1000,4,3);
insert into jjproduct values(null,"跳动的心项链","1269","/img/index/product/g2.jpg",null,'礼品2详情',1,1,1000,4,2);
insert into jjproduct values(null,"兔子熊热水袋","198","/img/index/product/g3.jpg",null,'礼品3详情',1,1,1000,4,1);
insert into jjproduct values(null,"守护初心口红","999","/img/index/product/g4.jpg",null,'礼品4详情',1,1,1000,4,4);
insert into jjproduct values(null,"Divoom点音像素","499","/img/index/product/g5.jpg",null,'礼品5详情',1,0,1000,4,1);
insert into jjproduct values(null,"旋转木马音乐盒","168","/img/index/product/g6.jpg",null,'礼品6详情',1,1,1000,4,2);
insert into jjproduct values(null,"磁吸悬浮灯","239","/img/index/product/g7.jpg",null,'礼品7详情',1,1,1000,4,3);
insert into jjproduct values(null,"木制3D风车","168","/img/index/product/g8.jpg",null,'礼品8详情',1,0,1000,4,1);






#创建数据表jjrecommend
create table jjrecommend(
  rid tinyint unsigned primary key auto_increment,
  rtitle varchar(8) not null,
  rdet varchar(8),
  p_id int,
  foreign key(p_id) references jjproduct(pid)
);

#插入数据
insert into jjrecommend values(null,"情人节畅销款","初心不负",5);
insert into jjrecommend values(null,"33枝红玫瑰",'寓意"三生三世"',4);
insert into jjrecommend values(null,"人气断货商品","兰蔻196礼盒",28);
insert into jjrecommend values(null,"网红爆款夜灯","永生花小夜灯",31);





#####################################

              