import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:(sessionStorage.getItem("user") || localStorage.getItem("user"))?JSON.parse(sessionStorage.getItem("user")|| localStorage.getItem("user")):{},

    isLogin:sessionStorage.getItem("user") || localStorage.getItem("user") ? 1:0,

 
    hasProduct:JSON.parse(localStorage.getItem("addProduct") || sessionStorage.getItem("addProduct"))==null ? false:true,

    addProduct:localStorage.getItem("addProduct") ||sessionStorage.getItem("addProduct") ? JSON.parse(localStorage.getItem("addProduct") || sessionStorage.getItem("addProduct")) : null,

    orderInfo:localStorage.getItem("orderInfo") ||sessionStorage.getItem("orderInfo") ? JSON.parse(localStorage.getItem("orderInfo") || sessionStorage.getItem("orderInfo")) : null,

    choseAddress:false

  },
  mutations: {
    setchoseAddress(state,id){
      state.orderInfo.forEach((elem,i)=>{
        if(id==i+1){
          state.choseAddress=elem;
        }
      });
    },
    delAddr(state,index){
      state.orderInfo.forEach((elem,i)=>{
        if(i==index){
          // elem=orderinfo.e;
          state.orderInfo.splice(i,1);
        }
      });
      if(state.orderInfo.length===0){
        state.orderInfo=null;
        state.choseAddress=false;
      }
      if(localStorage.getItem("orderInfo")){
        localStorage.setItem("orderInfo",JSON.stringify(state.orderInfo));
      }else{
        sessionStorage.setItem("orderInfo",JSON.stringify(state.orderInfo));
      }
    },
    upOrderInfo(state,orderinfo){
      state.orderInfo.forEach((elem,i)=>{
        if(i==orderinfo.i){
          // elem=orderinfo.e;
          state.orderInfo.splice(i,1,orderinfo.e);
        }
      });
      if(localStorage.getItem("orderInfo")){
        localStorage.setItem("orderInfo",JSON.stringify(state.orderInfo));
      }else{
        sessionStorage.setItem("orderInfo",JSON.stringify(state.orderInfo));
      }
    },
    setOrderInfo(state,orderinfo){
      if(state.orderInfo==null){
        state.orderInfo=[];
      }
      state.orderInfo.push(orderinfo);
      if(localStorage.getItem("orderInfo")){
        localStorage.setItem("orderInfo",JSON.stringify(state.orderInfo));
      }else{
        sessionStorage.setItem("orderInfo",JSON.stringify(state.orderInfo));
      } 
    },
    deladdProduct(state,pid){
      state.addProduct.forEach((elem,i)=>{
        if(elem.pid===pid){
          state.addProduct.splice(i,1);
        }
      })
      if(state.addProduct.length===0){
        state.hasProduct=false;
        state.addProduct=null;
      }
      if(localStorage.getItem("addProduct")){
        localStorage.setItem("addProduct",JSON.stringify(state.addProduct));
      }else{
        sessionStorage.setItem("addProduct",JSON.stringify(state.addProduct));
      }
      
    },
    clearaddProduct(state){
      state.hasProduct=false;
      state.addProduct=null;
    },
    setCartPro(state,pro){
      state.addProduct.forEach(elem=>{
        if(elem.pid===pro.pid){
          elem.pcount=pro.pcount;
        }
      })
      if(localStorage.getItem("addProduct")){
        localStorage.setItem("addProduct",JSON.stringify(state.addProduct));
      }else{
        sessionStorage.setItem("addProduct",JSON.stringify(state.addProduct));
      }
    },
    getCartPro(state,pro){
      // console.log(state);
      if(state.addProduct==null){
        state.addProduct=[];
      }
      state.hasProduct=true;
      let a=1;
      state.addProduct.forEach(elem=>{
          if(elem.pid===pro.pid){
            elem.pcount++;
            a=0;
          }
        })
        if(a){
          state.addProduct.push(pro);
        } 
        if(localStorage.getItem("addProduct")){
          localStorage.setItem("addProduct",JSON.stringify(state.addProduct));
        }else{
          sessionStorage.setItem("addProduct",JSON.stringify(state.addProduct));
        }
      
    },
    loginok(state,user){
      state.user=user;
      state.isLogin=1;
      state.addProduct=JSON.parse(user.addproduct);
      state.orderInfo=JSON.parse(user.orderinfo);
      state.hasProduct=!user.addproduct?false:true
    },
    upok(state,user){
      state.user=user;
    },
    logout(state){
      state.user={};
      state.isLogin=0;
      state.addProduct=null;
      state.orderInfo=null;
      state.choseAddress=false;
    }
  },
  getters:{
    total(state){
      let price=0;
      state.addProduct.forEach((elem)=>{
        price+=elem.pcount*elem.pprice;
      })
      return price;
    }
  },
  actions: {
  },
  modules: {
  }
})
