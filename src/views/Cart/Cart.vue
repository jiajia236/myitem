<template>
  <div class="cart">
    <p class="title">购物车</p>
    <no-login v-if="!isLogin"></no-login>
    <login-cart v-else></login-cart>
    <my-footer></my-footer>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import Area from '../../assets/js/area.js'
import NoLogin from '../../components/Cart/NoLogin'
import LoginCart from '../../components/Cart/LoginCart'
export default {
  components:{NoLogin,LoginCart},
  computed:{
    ...mapState(["isLogin","Addr"])
  },
  data(){
    return {areaList:Area ,show:false}
  },
  methods:{
    ...mapMutations(["setAddr","noAddr"]),
    showarea(){
      this.show=true;
    },
    quxiao(){
      this.show=false;
    },
    getcity(e){
      console.log(e);
      if(!e[0].name || !e[1]){
        // this.setAddr();
        this.noAddr();
        this.show=false;
      }else if(e[0].name && !e[1].name){
        // this.$messagebox.alert("请输入完整的地址");
        // localStorage.removeItem("addr");
        this.$notify("请选择完整的配送地址");
      }else{
        // this.province=e[0].name;
        // this.city=e[1].name;
        if(localStorage.getItem("addr")){
          localStorage.setItem("addr",JSON.stringify(e));
        }else{
          sessionStorage.setItem("addr",JSON.stringify(e));
        }
        this.setAddr(e);
        this.show=false;
      }
      
      
    }
  },
  mounted(){
    
  }
}

</script>
<style>
  .cart{
    width:90%;
    margin:0 5% 115px;
  }

  .cart .title{
    font-weight: bolder;
    margin-top:2rem;
    margin-bottom:1rem;
    font-size:20px;
    flex:0 0 20%;
  }
</style>