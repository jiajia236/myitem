import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/My/Login'
import Reg from '../views/My/Reg'
import MyInfo from '../views/My/MyInfo'
import MyBasic from '../views/My/MyBasic'
import MyOrder from '../views/My/MyOrder'
import MyCoupon from '../views/My/MyCoupon'
import MySet from '../views/My/MySet'
import Index from '../views/Index/Index'
import Details from '../views/Details/Details'
import MyType from '../views/Type/MyType'
import MainType from '../views/MainType/MainType'
import Cart from '../views/Cart/Cart'
import Account from '../views/Cart/Account'
import AddrList from '../views/Cart/AddrList'
import AddrEdit from '../views/Cart/AddrEdit'
import AddrUpdate from '../views/Cart/AddrUpdate'



const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

 Vue.use(VueRouter)


const routes = [
  {
    path:"/addrupdate/:i",
    component:AddrUpdate,
    props:true,
    meta:{index:6}
  },
  {
    path:"/addredit",
    component:AddrEdit,
    meta:{index:6}
  },
  {
    path:"/addrlist",
    component:AddrList,
    meta:{index:5}
  },
  {
    path:"/account",
    component:Account,
    meta:{index:4}
  },
  {
    path:"/cart",
    component:Cart,
    meta:{index:3}
  },
  {
    path:'/maintype',
    component:MainType,
    meta:{index:1}
  },
  {
    path:"/type/:TypeId",
    props:true,
    component:MyType,
    meta:{index:1}
  },
  {
    path:"/details/:pid",
    props:true,
    component:Details,
    meta:{index:2}
  },
  {
    path:"/",
    component:Index,
    meta:{index:0}
  },
  {
    path:"/myset",
    component:MySet,
    meta:{index:4},
  },
  {
    path:"/mycoupon",
    component:MyCoupon,
    meta:{index:4},
  },
  {
    path:"/myorder/:oid",
    component:MyOrder,
    meta:{index:4},
    props:true
  },
  {
    path:"/mybasic",
    component:MyBasic,
    meta:{index:5}
  },
  {
    path:"/myinfo",
    component:MyInfo,
    meta:{index:3},
  },
  {
    path:'/reg',
    component:Reg,
    meta:{index:6}
  },
  {
    path: '/login',
    component: Login,
    meta:{index:5}
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})


export default router
