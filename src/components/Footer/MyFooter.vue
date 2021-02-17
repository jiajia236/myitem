<template>
  <mt-tabbar v-model="current" fixed class="footer">
    <mt-tab-item id="index">
      <img v-show="current==='index'" slot="icon" src="/img/footer/index.png" alt="">
      <img v-show="current!=='index'" slot="icon" src="/img/footer/noindex.png" alt="">
      首页
    </mt-tab-item>
    <mt-tab-item id="maintype">
      <img v-show="current==='maintype'" slot="icon" src="/img/footer/type.png" alt="">
      <img v-show="current!=='maintype'" slot="icon" src="/img/footer/notype.png" alt="">
      分类
    </mt-tab-item>
    <mt-tab-item id="cart">
      <img v-show="current==='cart'" slot="icon" src="/img/footer/cart.png" alt="">
      <img v-show="current!=='cart'" slot="icon" src="/img/footer/nocart.png" alt="">
      购物车
    </mt-tab-item>
    <mt-tab-item id="my">
      <img v-show="current==='my'" slot="icon" src="/img/footer/my.png" alt="">
      <img v-show="current!=='my'" slot="icon" src="/img/footer/nomy.png" alt="">
      我的
    </mt-tab-item>
  </mt-tabbar>
</template>
<script>
export default {
  data(){
    return{current:"index"}
  },
  mounted(){
    console.log(this.$route);
        switch(this.$route.path){
        case "/":
          this.current="index";
          break;
        case "/maintype":
          this.current="maintype";
          break;
        case "/cart":
          this.current="cart";
          break;
        case "/myinfo":
          this.current="my";
          break;
      }
  },
  watch:{
    current(){
      console.log(this.current);
      switch(this.current){
        case "index":
          this.$router.push("/");
          break;
        case "maintype":
          this.$router.push("/maintype");
          break;
        case "cart":
          this.$router.push("/cart");
          break;
        case "my":
          this.$router.push("/myinfo");
          break;
      }
    },
  }
}
</script>
<style>
  .mint-tabbar.is-fixed{
    transform:translateZ(0);
    -webkit-transform:translateZ(0);
  }
</style>