<template>
  <div class="details">
    <mt-header title="详情" class="myheader">
    <mt-button icon="back" slot="left" @click="goback()"></mt-button>
   </mt-header>
    <div class="content">
      <p class="ptitle">{{product.ptitle}}</p>
      <div v-html="product.pdetails"></div>
    </div> 
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
      <van-goods-action-icon icon="cart-o" text="购物车" @click="gocart()"/>
      <van-goods-action-icon icon="star" text="收藏"  @click="change()" v-if="!collect"/>
      <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" @click="change()" v-else/>
      <van-goods-action-button type="warning" text="加入购物车" @click="isLogin?addPro():goLogin()" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex';
export default {
  props:["pid"],
  data(){
    return{
      product:{},
      collect:false
    }
  },
  computed:{
    ...mapState(["addProduct","isLogin"]),
  },
  methods:{
    change(){
      this.collect=!this.collect;
    },
    ...mapMutations(["getCartPro","settotalPrice"]),
    gocart(){
      this.$router.push("/cart");
    },
    addPro(){
      this.$messagebox.alert("添加成功");
      let obj={
        ptitle:this.product.ptitle,
        pintro:this.product.pintro,
        pprice:this.product.pprice,
        pcount:this.product.pcount,
        pid:this.product.pid,
        pimg:this.product.pimg
      }
      this.getCartPro(obj);
    },
    goLogin(){
      this.$router.push("/login");
    },
    goback(){
      window.history.back(-1);
    }
  },
  mounted(){
    this.axios.get("/details",{
      params:{
        pid:this.pid
      }
    }).then(result=>{
      // console.log(result.data);
      this.product=result.data[0];
      // console.log(this.product[0]);
    });
  },
  watch:{
    $route(){
      console.log(this.$route);
    }
  }
}
</script>
<style>
.details{
  width: 100%;
}
.details .content{
  text-align: left;
  margin-bottom:60px;
}
.details>.content img{
  max-width: 100%;
  margin-top:10px;
}
.details .xiangqing{
  margin:10px 0 0;
  text-align: center;
  font-size: 18px;
  align-items: center;
  justify-content: center;
}
.details .xiangqing>img{
  margin:0 10px;
}
.details .xiangqing .d-flex{
  margin-top:30px;
  align-items: center;
}
.details .dtitle{
  flex:0 0 20%;
  font-weight: bolder;
}
.details .dtitle+p{
  text-align: left;
  font-size: 14px;
}
.details .ptitle{
  font-size: 20px;
  font-weight: bolder;
  text-align: center;
  margin-top:10px;
}
</style>