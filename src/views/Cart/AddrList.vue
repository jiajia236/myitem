<template>
  <div class="addrlist">
    <mt-header class="myheader" title="管理收货地址">
      <mt-button slot="left" icon="back" @click="goback()"></mt-button>
    </mt-header>
    <van-address-list
  v-model="chosenAddressId"
  :list="list"
  :disabled-list="disabledList"
  disabled-text="以下地址超出配送范围"
  default-tag-text="默认"
  @add="onAdd"
  @edit="onEdit"
/>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex';
export default {
  computed:{
    ...mapState(["orderInfo","choseAddress"]),
  },
  data(){
    return {
      list:[],
      chosenAddressId:'1',
      disabledList: [
        {
          id: '3',
          name: '王五',
          tel: '1320000000',
          address: '浙江省杭州市滨江区江南大道 15 号',
        },
      ],
    };
  },
  mounted(){
    if(this.orderInfo==null){
      
    }else{
      this.orderInfo.forEach((elem,i)=>{
        let obj={
          id:`${i+1}`,
          name:elem.name,
          tel:elem.tel,
          address:elem.addressDetail,
          isDefault:elem.isDefault
        }
        this.list.push(obj);
        if(elem.isDefault){
          this.chosenAddressId=`${i+1}`;
        }
      })
    }
  },
  methods:{
    ...mapMutations(["setchoseAddress"]),
    goback(){
      if(this.orderInfo==null){

      }else{
        this.setchoseAddress(this.chosenAddressId);
      }
      // window.history.back(-1);
      this.$router.push("/account");
    },
    onAdd() {
      // this.$toast('新增地址');
      this.$router.push("/addredit");
    },
    onEdit(item, index) {
      // console.log(item,index);
      this.$router.push(`/addrupdate/${index}`);
    },
    // select(e){
    //   console.log(e);
    //   // this.chosenAddressId=e.id;
      

    // },
  },  
}
</script>