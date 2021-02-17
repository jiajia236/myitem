<template>
  <div>
    <div class="remindlog" v-if="!isLogin">
      <span>登录后将同步您的购物车商品</span>
      <mt-button size="small" class="loginbtn" @click="gologin">登录</mt-button>
    </div>
    <div class="common nocart">
      <img src="/img/cart/noproduct.png" alt="">
      <p>暂无相关商品</p>
    </div>
    <div class="floor">
      <p class="ftitle">为你推荐</p>
      <div class="d-flex smdad">
        <div class="common smfloor" v-for="(elem,i) of flower" :key="i" @click="godetails(elem.pid)">
          <div class="pimg2"><img v-lazy="elem.pimg"></div>
          <p v-text="elem.ptitle"></p>
          <p class="pprice" v-cloak>￥{{elem.pprice}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  data(){
    return{flower:[]}
  },
  computed:{
    ...mapState(["isLogin"])
  },
  methods:{
    gologin(){
      this.$router.push('/login');
    },
    godetails(pid){
      this.$router.push(`/details/${pid}`);
    }
  },
  mounted(){
    this.axios.get("/product",{
      params:{
        page:1,
        TypeId:1
      }
    }).then(result=>{
      this.flower=result.data.result;
      console.log(this.flower);
    });
  }
}
</script>
<style>
  .cart .remindlog{
    text-align: center;
    background-color: rgba(255,155,77,.4);
    vertical-align: middle;
    padding:0.5rem 0;
  }
  .cart .loginbtn{
    background-color: transparent;
    border-radius: 12px;
    border:1px solid rgb(255,155,77);
    color:rgb(255,155,77);
    margin-left:1rem;
  }
  .cart .mint-button--small{
    height:24px;
    /* width:40px; */
    font-size: 18px;
  }
  .cart .nocart{
    margin-top:0 !important;
    padding:2rem 0;
  }
  .cart .ftitle {
  font-size: 20px;
  text-align: center;
  line-height: 25px;
  margin: 70px 0 20px;
  font-weight: bolder;
}
.cart .smdad{
  justify-content: space-around;
  flex-wrap: wrap;
}
.cart .smdad .smfloor{
  flex:0 0 45%;
}
.cart .smdad .common{
  margin:10px 0 !important;
}

.cart .smdad .smfloor>p{
  text-align: left;
  line-height: 50px;
}
.cart .pimg2>img{
  max-width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.cart .smfloor{
  overflow: hidden;
}
.cart .smfloor>p{
text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 90%;
}
</style>