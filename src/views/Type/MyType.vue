<template>
  <div class="mytype">
   <mt-header title="分类" class="myheader">
   <mt-button icon="back" slot="left" @click="goindex"></mt-button>
   </mt-header>
   <mt-navbar v-model="type">
     <mt-tab-item v-for="(elem,i) of Type" :key="i" :id="`${elem.TypeId}`">{{elem.TypeName}}
     </mt-tab-item>
  </mt-navbar>
  <!-- <van-dropdown-menu>
  <van-dropdown-item v-model="v1" :options="option1" />
  <van-dropdown-item v-model="v2" :options="option2" />
  <van-dropdown-item v-model="v3" :options="option3" />
  <van-dropdown-item v-model="v4" :options="option4" />
</van-dropdown-menu> -->
     <mt-tab-container>
       <mt-tab-container-item>
        <div class="floor">
          <div class="d-flex smdad">
            <div class="common smfloor" v-for="(elem,i) of product" :key="i">
              <div class="pimg2"><img :src="elem.pimg"></div>
              <p v-cloak class="ptitle">{{elem.ptitle}}·{{elem.pintro}}</p>
              <p class="pprice" v-cloak>￥{{elem.pprice}}</p>
            </div>
          </div>
        </div>
       </mt-tab-container-item>
     </mt-tab-container>
   






  </div>
</template>
<script>
import MyFooter from '../../components/Footer/MyFooter'
export default {
  component:MyFooter,
  props:["TypeId"],
  data(){
    return{
      page:1,
      product:[],
      Type:[],
      type:this.TypeId,
    }
  },
  methods:{
    goindex(){
     this.$router.push("/");
    },
    getProduct(){
      this.axios.get("/product",{
      params:{
        page:this.page,
        TypeId:this.type
      }
    }).then(result=>{
      console.log(result.data);
      this.product=result.data.result;
      // this.TypeName=result.data.result1[0].TypeName;      
    });
    }
  },
  mounted(){
    this.axios.get("/type").then(result=>{
      console.log(result.data);
      this.Type=result.data.slice(0,4);
    });
    this.getProduct();
  },
  watch:{
    type(){
     this.$router.push(`/type/${this.type}`);
     this.getProduct();

    }
  }
}
</script>
<style>
  .mytype{
    width:100%;
  }

  .mytype .mint-navbar .mint-tab-item.is-selected{
    color:rgb(255, 155, 77);
    border-bottom:1px solid rgb(255, 155, 77);
  }
  .mytype .smdad{
  justify-content: space-around;
  flex-wrap: wrap;
}
.mytype .smdad .smfloor{
  flex:0 0 45%;
}
.mytype .smdad .common{
  margin:10px 0 !important;
}
.mytype .pimg2>img{
  max-width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.mytype .smfloor {
  /* padding: 10px; */
  overflow: hidden;
}

 .mytype .ptitle {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 90%;
  text-align: left;
  margin-top:10px;
} 
.mytype .pprice{
  color:rgb(255, 155, 77);
  text-align: left;
}
/* .mytype */
</style>