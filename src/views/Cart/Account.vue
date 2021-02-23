<template>
  <div class="account">
    <mt-header class="myheader" title="填写订单">
      <router-link to="/cart" slot="left"><mt-button icon="back" ></mt-button></router-link>
    </mt-header>
    <div>
      <div class="common">
        <div @click="goaddr" v-if="!choseAddress"><mt-cell title="收货人" value="请选择收货人地址" isLink  class="bold" ></mt-cell></div>
        <div class="shouhuo" @click="goaddr" v-else>
          <p>
            <img src="/img/cart/shouhuo.png" style="margin-left:5px;"><br>
            收货人
          </p>
          <div>
            <p v-cloak>{{choseAddress.name}}</p>
            <p v-cloak>{{choseAddress.addressDetail}}</p>
          </div>
          <div class="arrow">
            <img src="/img/myinfo/arrow.png" alt="">
          </div>
        </div>
        <div @click="choseDate">
          <mt-cell title="送达日期" isLink :value="riqi===''?'请选择送达日期':riqi"></mt-cell>
        </div>
        <van-popup v-model="show" position="bottom">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          :formatter="formatter"
          @confirm="getTime"
          @cancel="cancel"
        />
      </van-popup>
      </div>
      <div class="common">
        <van-card v-for="(elem) of addProduct" :key="elem.pid"
          :num="elem.pcount"
          :price="(elem.pprice*elem.pcount).toFixed(2)"
          :desc="elem.pintro"
          :title="elem.ptitle"
          :thumb="elem.pimg"
          style="text-align:left"
        />
      </div>
      <div class="fapiao">
        <mt-cell title="发票" value="选填" isLink></mt-cell>
        <mt-cell title="备注"></mt-cell>
      </div>
    </div>
    <van-submit-bar :price="parseInt(total+'00')" button-text="去支付" @submit="Onsubmit"/>
    <van-popup v-model="pay" position="bottom" :style="{ height: '45%' }" closeable  close-icon="close">
      <div class="pay">
        <p>支付金额</p>
        <p>￥{{total.toFixed(2)}}</p>
        <van-radio-group v-model="radio">
          <van-cell-group>
            <van-cell title="微信支付" icon="/img/cart/wechat.png" clickable @click="radio = '1'">
              <template #right-icon>
                <van-radio name="1" />
              </template>
            </van-cell>
            <van-cell title="支付宝支付" clickable @click="radio = '2'" icon="/img/cart/ali.png">
              <template #right-icon>
                <van-radio name="2" />
              </template>
            </van-cell>
            <van-cell title="工商银行卡支付" clickable @click="radio = '3'" icon="/img/cart/gongshang.png">
              <template #right-icon>
                <van-radio name="3" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
        <mt-button size="large" class="surepay" @click="gopay()">确认支付</mt-button>
      </div>
    </van-popup>
    <van-popup v-model="showpay">
        <mt-header title="支付" class="myheader">
          <mt-button slot="left" icon="back" @click="nopay()"></mt-button>
        </mt-header>
        <van-password-input
          :value="payupwd"
          :focused="showKeyboard"
          @focus="showKeyboard = true"
          :info="'请输入您的支付密码'"
        />
        <!-- 数字键盘 -->
        <van-number-keyboard
          v-model="payupwd"
          :show="showKeyboard"
          @blur="showKeyboard = false"
        />
      </van-popup>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapState } from 'vuex';
export default {
  computed:{
    ...mapState(["addProduct","choseAddress"]),
    ...mapGetters(["total"]),
  },
  watch:{
    payupwd(){
      if(this.payupwd.length===6){
        this.$indicator.open("加载中");
        let timer=setTimeout(()=>{
          if(this.payupwd==123456){
              // this.addProduct.forEach((elem)=>{
              //   elem.pnumber-=elem.pcount;
              //   if(elem.pnumber==0){
              //     elem.pstatus=0
              //   }
              //   let obj={
              //     pnumber:elem.pnumber,
              //     pstatus:elem.pstatus,
              //     pid:elem.pid
              //   }
              //   this.axios.post("/updatepro",this.qs.stringify(obj)).then(result=>{
              //     console.log(result.data);
              //   })
              // })
              this.minuspcount().then(()=>{
                this.$toast({
                  message:"支付成功",
                });
                sessionStorage.removeItem("addProduct");
                localStorage.removeItem("addProduct");
                this.clearaddProduct();
                this.$router.push("/cart");
                this.$indicator.close();
              })
            }else{
              this.$toast({
                message:"支付密码不正确",
              });
            }
            clearTimeout(timer);
          },2000)
            
      }
      
    }
  },

  methods:{
    ...mapMutations(["clearaddProduct"]),
    minuspcount(){
      return new Promise((resolve,reject)=>{
        this.addProduct.forEach((elem)=>{
        elem.pnumber-=elem.pcount;
        if(elem.pnumber==0){
          elem.pstatus=0
        }
        let obj={
          pnumber:elem.pnumber,
          pstatus:elem.pstatus,
          pid:elem.pid
        }
        this.axios.post("/updatepro",this.qs.stringify(obj)).then(result=>{
          // console.log(result.data);
        })
      })
      resolve();

    })
      
    },
    gopay(){
      // console.log(this.radio);
      this.pay=false;
      this.showpay=true;
    },
    nopay(){
      this.pay=false;
      this.showpay=false;
    },
    goaddr(){
      this.$router.push("/addrlist");
    },
    choseDate(){
      if(!this.choseAddress){
        this.$toast("请先选择收货地址");
      }else{
        this.show=true;
      }
    },
    getTime(val){
      // console.log(this.moment(val).format("YYYY-MM-DD"));
      this.riqi=this.moment(val).format("YYYY-MM-DD");
      this.show=false;
    },
    Onsubmit(){
      if(!this.choseAddress){
        this.$toast("请选择收货地址");
      }else if(!this.riqi){
        this.$toast("请选择送达日期");
      }else{
        // console.log(1);
        this.pay=true;
      }
    },
    cancel(){
      this.show=false;
    },
     formatter(type, val) {
      if (type === 'year') {
        return `${val}年`;
      } else if (type === 'month') {
        return `${val}月`;
      }else if(type === 'day'){
        return `${val}日`;
      }
      return val;
    },
  },
  data() {
    return {
      minDate: new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()+1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      show:false,
      riqi:'',
      pay:false,
      radio:'1',
      payupwd:"",
      showKeyboard:true,
      showpay:false,
    };
  }
}
</script>
<style>
  .account{
    width: 100%;
  }
  .account>div:nth-child(2){
    width:90%;
    margin:0 5%;
  }
  .account .common{
    margin:1rem 0 !important;
    text-align: left !important;
  }
  .account .van-card{
    border-radius: 10px;
    background-color: #fff;
    font-size: 14px;
  }
  .account .shouhuo{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:10px 0;
  }
  .account .shouhuo>p:first-child{
    margin-left:0.5rem;
  }
  .account .shouhuo>div:nth-child(2){
    flex:0 0 70%;
  }
  .account .shouhuo>div:nth-child(2)>p:first-child{
    font-size: 20px;
    font-weight: bolder;
  }
  .account .shouhuo>div:nth-child(2)>p:not(:first-child){
    font-size: 14px;
  }
  .account .arrow{
    flex:0 0 6%;
    margin-right:0.75rem
  }
  .account .arrow>img{
    max-width: 100%;
  }
  .account .mint-cell:first-child{
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .account .mint-cell:last-child{
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .account .van-card__content{
    margin-left: 1rem;
  }
  .account .bold .mint-cell-value>span{
    font-family: "粗体";
    font-weight: bolder;
    color:#000;
  }
  .account .pay p:first-child{
    font-size:14px;
    color:#666;
    text-align: center;
    margin:1.5rem 0;
  }
  .account .pay p:nth-child(2){
    font-size:22px;
    font-weight: bolder;
    text-align: center;
    padding-bottom:1rem;
    border-bottom:1px solid #ccc;
  }
  .account .van-icon__image{
    /* width:50%; */
    width:2rem;
    height:2rem;
    object-fit:cover;
    }
    .account .van-cell__left-icon{
      height:100% ;
    }
    .account .van-cell__title{
      font-size: 18px;
      margin-top:5px;
    }
    .account .surepay{
      color:#fff;
      background-color: rgb(255,155,77);
      margin-top:2rem;
    }
    .account .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .account .van-popup--center{
    width:90%;
    height:80%;
  }
  .account .van-hairline--left,
  .account .van-password-input__item,
  .account .van-password-input__item--focus{
    border:1px solid #c8c8c8;
  }
  .account .van-password-input{
    margin-top:10rem;
  }
</style>