<template>
  <div class="index">
    <div class="indexheader">
      <router-link to=""><img src="/img/index/search.png"></router-link>
      <span>花店名称</span>
      <img src="/img/index/help.png" />
    </div>
    <div class="carousel">
      <mt-swipe style="height: 200px">
        <mt-swipe-item v-for="i of 4" :key="i"><img :src="`/img/index/banner${i}.png`" @click="gotype(i)"></mt-swipe-item>
      </mt-swipe>
    </div>
    <ul class="list common">
      <li v-for="elem of list" :key="elem.TypeId">
        <router-link :to="`/type/${elem.TypeId<4?elem.TypeId:elem.TypeId-4}`">
          <img v-lazy="elem.TypeImg">
          <p v-text="elem.TypeName"></p>
        </router-link>
      </li>
    </ul>
    <div class="deco">
      <div class="b5"><img src="/img/index/banner5.jpg"></div>
      <ul class="tuijian">
        <li v-for="(elem, i) of recommend" :key="i" class="common">
          <router-link :to="`/details/${elem.pid}`">
            <ul class="tuijianlist">
              <li>
                <p v-text="elem.rtitle" class="rtitle"></p>
                <p v-text="elem.rdet" class="rdet"></p>
                <p v-cloak>￥{{ elem.pprice }}</p>
              </li>
              <li class="rimg">
                <img v-lazy="elem.pimg">
              </li>
            </ul>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="floor">
      <p class="ftitle">送恋人/爱情鲜花</p>
      <div class="common d-flex" v-for="(elem,i) of flower" :key="i" @click="godetails(elem.pid)">
        <div class="pimg">
          <img v-lazy="elem.pimg">
        </div>
        <div class="pintro">
          <p v-text="elem.ptitle"></p>
          <p>精品玫瑰礼盒:19枝卡</p>
          <p class="pdet" v-text="elem.pintro"></p>
          <p class="pprice" v-cloak>￥{{elem.pprice}}</p>
        </div>
      </div>
      <mt-button size="large" style="border-radius:20.5px;" @click="gotype(1)">查看更多</mt-button>
    </div>
    
    <div class="floor">
      <p class="ftitle">蛋糕推荐</p>
      <div class="d-flex smdad">
        <div class="common smfloor" v-for="(elem,i) of cake" :key="i" @click="godetails(elem.pid)">
          <div class="pimg2"><img v-lazy="elem.pimg"></div>
          <p v-text="elem.ptitle"></p>
          <p class="pprice" v-cloak>￥{{elem.pprice}}</p>
        </div>
      </div>
    </div>
    <mt-button size="large" style="border-radius:20.5px;margin-top:20px;" @click="gotype(2)">查看更多</mt-button>
    <div class="floor">
      <p class="ftitle">巧克力推荐</p>
      <div class="d-flex smdad">
        <div class="common smfloor" v-for="(elem,i) of chocolate" :key="i" @click="godetails(elem.pid)">
          <div class="pimg2"><img v-lazy="elem.pimg"></div>
          <p v-text="elem.ptitle"></p>
          <p class="pprice" v-cloak>￥{{elem.pprice}}</p>
        </div>
      </div>
    </div>
    <mt-button size="large" style="border-radius:20.5px;margin-top:20px;" @click="gotype(3)">查看更多</mt-button>
     <div class="floor">
      <p class="ftitle">礼品推荐</p>
      <div class="d-flex smdad">
        <div class="common smfloor" v-for="(elem,i) of gift" :key="i" @click="godetails(elem.pid)">
          <div class="pimg2"><img v-lazy="elem.pimg"></div>
          <p v-text="elem.ptitle"></p>
          <p class="pprice" v-cloak>￥{{elem.pprice}}</p>
        </div>
      </div>
    </div>
    <mt-button size="large" style="border-radius:20.5px;margin-top:20px" @click="gotype(4)">查看更多</mt-button>
    <my-footer></my-footer>
  </div>
</template>
<script>
import MyFooter from '../../components/Footer/MyFooter'
export default {
  components:{MyFooter},
  data() {
    return {
      list: [],
      recommend: [],
      flower:[],
      chocolate:[],
      gift:[],
      cake:[]

    };
  },
  methods: {
    gotype(TypeId){
      this.$router.push(`/type/${TypeId}`);
    },  
    godetails(pid){
      this.$router.push(`/details/${pid}`);
    },
    getproduct(type) {
      this.$indicator.open("加载中");
      this.axios.get("/product", {
        params: {
          page: 1,
          TypeId:type
        },
      }).then(result=>{
        switch(type){
          case 1:
            this.flower=result.data.result;
            break;
          case 2:
            this.chocolate=result.data.result.slice(0,4);
            break;
          case 3:
            this.cake=result.data.result.slice(0,4);
            break;
          case 4:
            this.gift=result.data.result.slice(0,4);
            break;
        }
        this.$indicator.close();
      });
    },
  },
  mounted() {
    this.getproduct(1);
    this.getproduct(2);
    this.getproduct(3);
    this.getproduct(4);

    this.axios.get("/type").then((result) => {
      console.log(result.data);
      this.list=result.data;

    }),
      this.axios.get("/recommend").then((result) => {
        // console.log(result.data);
        this.recommend = result.data;
      });
  },
};
</script>
<style>
.index {
  width: 90%;
  margin: 0 5% 70px;
  box-sizing: border-box;
}
.index .indexheader {
  font-family: "title";
  font-size: 26px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  color:rgb(255, 155, 77);
}
.index .mint-swipe {
  border: 2px solid transparent;
  border-radius: 18px;
}
.index .carousel img,
.index .deco .b5 img {
  max-width: 100%;
  overflow: hidden;
}
.index .list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.index .list li {
  flex: 0 0 25%;
  font-size: 13px;
}
.index .list li img {
  width: 30%;
}
.index .deco .b5 img {
  border-top-left-radius: 20%;
  border-top-right-radius: 20%;
  /* position: absolute; */
}
.index .deco .tuijian {
  display: flex;
  flex-wrap: wrap;
  background-color: rgba(255, 189, 190, 0.8);
  padding: 20px 0;
  justify-content: space-around;
  align-items: center;
}

.index .deco .tuijian li {
  text-align: left;
  margin: 5px 0 7px !important;
  padding:2px;
  flex: 0 0 45%;
}
.index .deco .tuijianlist {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.index .deco .tuijianlist>li{
  flex:0 0 45%;
}
.index .deco .rdet {
  font-size: 12px;
  color: #666;
  line-height: 25px;
}
.index .rtitle {
  font-size: 14px;
  line-height: 20px;
}
.index .rimg>img{
  max-width: 100%;
}

.index .pimg {
  width: 45%;
}
.index .pimg img {
  max-width: 100%;
  height: 170px;
}
.index .ftitle {
  font-size: 20px;
  text-align: center;
  line-height: 25px;
  margin: 70px 0 20px;
  font-weight: bolder;
}
.index .pintro {
  padding: 10px;
  text-align: left;
  flex:0 0 40%;
  overflow: hidden;
}

 .index .pintro p {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 90%;
}
.index .pintro > p:first-child {
  font-size: 18px;
  font-weight: bolder;
}
.index .pintro .pdet {
  border-top: 1px solid #e8e8e8;
  border-bottom: 1px solid #e8e8e8;
  color: #666;
  font-size: 14px;
  padding: 0px 2px;
  margin: 10px 0;
}
.index .pprice {
  color: rgb(255, 155, 77);
}
.index .pimg2>img{
  max-width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.index .smdad{
  justify-content: space-around;
  flex-wrap: wrap;
}

.index .smdad .smfloor{
  flex:0 0 45%;
}
.index .smdad .common{
  margin:10px 0 !important;
}

.index .smdad .smfloor>p{
  text-align: left;
  line-height: 50px;
}

</style>