<template>
  <div class="maintype">
    <van-search v-model="search" placeholder="请输入搜索关键词" ></van-search>
    
    <van-sidebar v-model="activeKey" style="position:fixed;top:74px;left:0">
      <van-sidebar-item v-for="(elem,i) of maintype" :key="i" :title="elem.mtitle"></van-sidebar-item>
    </van-sidebar>
    <div class="content">
      <div class="banner"><img src="/img/maintype/b1.jpg" alt=""></div>
      <div class="type d-flex">
        <div v-for="(elem) of product" :key="elem.pid">
          <router-link :to="`/details/${elem.pid}`"><van-image round width="4rem" height="4rem" :src="elem.pimg"/></router-link>
          <p v-text="elem.ptitle"></p>
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
  
</template>
<script>
export default {
  data(){
    return{
    activeKey:0,
    search:"",
    maintype:[],
    product:[],
    }
  },
  methods:{
    getMainType(){
      this.axios.get("/maintype",{
        params:{
          mid:this.activeKey+1
        }
      }).then(result=>{
        // console.log(result.data);
        this.maintype=result.data.result1;
        this.product=result.data.result;
      })
    }
  },
  mounted(){
    this.getMainType();
  },
  watch:{
    activeKey(){
      this.getMainType();
    }
  }
}
</script>
<style>
.maintype{
  background-color: #fff;
  width: 100%;
  padding-bottom:10rem; 
}
.maintype .van-sidebar-item--select::before{
  background-color: rgb(255,155,77);
}
.maintype .banner{
  width:90%;
}
.maintype .content{
  margin:20px 0 0 100px;
  margin-left:100px;
  border-top:1px solid #e8e8e8;
}
.maintype .banner img{
  max-width: 100%;
  margin-top:0.75rem;
}
.maintype .type{
  background-color: #fff;
  box-shadow:0px 0px 4px #888888;
  margin-top:20px;
  border-radius: 5px;
  width: 90%;
  justify-content: space-around;
  padding:10px 0;
  flex-wrap: wrap;
}

.maintype .type>div{
  flex:0 0 30%;
  text-align: center;
  margin:0.5rem 0; 
  overflow: hidden;
}

.maintype .type p{
  font-size: 0.8rem;
  margin-top:0.75rem;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 90%;
  line-height: 2rem;
}
</style>