<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
    <!-- <my-footer></my-footer> -->
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex';

export default {
  data(){
    return{transitionName:""}
  },
  computed:{
    ...mapState(["addProduct","orderInfo","user"])
  },
  methods:{
    ...mapMutations(["logout"])
  },
  //在路由发生变化时监听是前进还是后退状态，应用不同动画
 watch: {
   $route(to, from) {
    //  console.log(to);
    //  console.log(from);
    if(
        (to.path==="/" || to.path==="/myinfo" || to.path==="/maintype" || to.path==="/cart")  && 
        (from.path==="/myinfo" || from.path==="/" || from.path==="/maintype" || from.path==="/cart")
      ){
      this.transitionName="";
    }else{
       if(to.meta.index > from.meta.index){
         console.log(to.meta.index);
        this.transitionName = 'slide-left';
       }else{
        this.transitionName = 'slide-right';
       }
      }
      
    }
  }
}
</script>
  

<style>
[v-cloak]{display: none;}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#app .common{
  /* width:100%; */
  margin:30px 0;
  background-color: #fff;
  /* border: 2px solid transparent; */
  border-radius:10px;
  align-items: center;
  text-align: center;
  line-height:30px;
  flex-wrap: wrap;
  color:#000;
}

#app .myheader{
  background-color: #fff;
  color:#000;
  font-size: 18px;
  line-height: 30px;
  font-family: "黑体";
}

#app .d-flex{
  display: flex;
}

a{
  color:#000;
  text-decoration: none;
}
body{
  background-color: #f2f2f2;
}
.mint-indicator-wrapper {
		z-index: 3000 !important;
	}
 
.mint-indicator-mask {
		z-index: 3000 !important;
	}
  .mint-toast {
		z-index: 3000 !important;
	}
 
.mint-toast {
		z-index: 3000 !important;
	}
@font-face{
    font-family:"title";
    src:url("/font/xiaxing.ttf");
 }
  @font-face{
    font-family:"quxiao";
    src:url("/font/roman.fon");
  }

/* .child-view {
   position:absolute; 
   transition: all 500ms ease;
}  */


.slide-left-enter-active,
.slide-right-leave-active,
.slide-left-leave-active,
.slide-right-enter-active{
  transition: all 500ms ease;
  position:absolute;
  width:100%;
}


.slide-left-enter,
.slide-right-leave-active {
  /* opacity: 0; */
  -webkit-transform: translate(120%, 0);
  transform: translate(120%, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  /* opacity: 0; */
  -webkit-transform: translate(-120%, 0);
  transform: translate(-120%, 0);
}


</style>
