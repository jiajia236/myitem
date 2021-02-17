<template>
  <div>
    <div class="common cartPro">
      <div v-for="(elem) of addProduct" :key="elem.pid">
        <!-- <check-btn :checkall="checkall"></check-btn> -->
        <van-checkbox checked-color="rgb(255,155,77)" class="checkone" @click="check()" v-model="checked"></van-checkbox>
        <div class="cimg"><img :src="elem.pimg" alt=""></div>
        <div class="proinfo">
          <p>[{{elem.ptitle}}] {{elem.pintro}}</p>
          <img src="/img/cart/delete.png" class="del" @click="del(elem.pid)">
          <div class="pprice">
            <p>￥{{(elem.pprice*elem.pcount).toFixed(2)}}</p>
            <van-stepper v-model="elem.pcount" theme="round" button-size="22" @change="change(elem.pcount,elem.pid)" disable-input/>
          </div>
          <van-submit-bar :price="parseInt(total+'00')" button-text="提交订单" @submit="onSubmit">
            <van-checkbox v-model="checkall" @click="checkboth">全选</van-checkbox>
        <!-- <template #tip>
          你的收货地址不支持同城送, <span @click="onClickEditAddress">修改地址</span>
        </template> -->
        </van-submit-bar>

      </div>
    </div>
  </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import CheckBtn from "./CheckBtn"
export default {
  components:{CheckBtn},
  data(){
    return{checkall:true,checked:true}
  },
  computed:{
    ...mapState(["addProduct","totalPrice"]),
    ...mapGetters(["total"])
  },
  methods:{
    ...mapMutations(["getCartPro","setCartPro","deladdProduct"]),
    onSubmit(){
      this.$router.push("/account");
    },
    // get(checked){
    //   console.log(checked);
    // },
    check(){
      console.log(1);
    },
    checkboth(){
      this.checked=this.checkall;
    },
    change(pcount,pid){
      // console.log(pcount,pid);
      this.setCartPro({pcount,pid});
    },
    del(pid){
      this.$messagebox.confirm("确定要删除该商品吗？").then(result=>{
        this.deladdProduct(pid);
      }).catch(err=>{

      })
      
    }
  },
  mounted(){
  }
 
}
</script>
<style>
  .cart .cartPro>div{
    display: flex;
    justify-content:space-around;
    align-items:center;
    padding:0.5rem 0;
  }
  .cart .van-submit-bar{
    bottom:50px;
  }
  .cart .cartPro .checkone{
    flex:0 0 10%;
    /* text-align: center; */
    margin-left:1rem;
    
  }
  .cart .cartPro .cimg{
    flex:0 0 30%;
  }
  .cart .del{
    width:1.5rem;
    margin-top:1rem;
    position: absolute;
    right:1rem;
  }
  .cart .cartPro .cimg>img{
    max-width: 100%;
    border-radius: 20%;
  }
  .cart .cartPro .proinfo{
    text-align: left;
    padding:0 1rem;
    flex: 0 0 50%;
    overflow: hidden;
    position: relative;

  }
  .cart .cartPro .proinfo p{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .cart .proinfo .pprice{
    display: flex;
    align-items: center;
    justify-content: space-between;
    color:rgb(255,155,77);
    font-size:1.2rem;
    margin-top:60px;

  }
</style>