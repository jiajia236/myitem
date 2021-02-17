import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MintUi from 'mint-ui'
import qs from 'qs'
import moment from 'moment'
Vue.prototype.qs=qs;
Vue.prototype.moment=moment

import 'mint-ui/lib/style.min.css'
Vue.use(MintUi);

import axios from 'axios'
axios.defaults.baseURL="/api"
Vue.prototype.axios=axios;

import MyFooter from './components/Footer/MyFooter'
Vue.component("my-footer",MyFooter);


import { Sidebar, SidebarItem,Search,DropdownMenu, DropdownItem,Image as VanImage,GoodsAction, GoodsActionIcon, GoodsActionButton,Area,Popup,Notify,Stepper,Checkbox, CheckboxGroup,SubmitBar,Card,AddressList,AddressEdit,DatetimePicker,RadioGroup, Radio,Cell, CellGroup,PasswordInput, NumberKeyboard,Dialog,Overlay} from 'vant';

Vue.use(AddressEdit);
Vue.use(Overlay);
Vue.use(Dialog);
Vue.use(PasswordInput);
Vue.use(NumberKeyboard);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(Search);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(VanImage);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Area);
Vue.use(Popup);
Vue.use(Notify);
Vue.use(Stepper);
Vue.use(Checkbox);
Vue.use(DatetimePicker);
Vue.use(CheckboxGroup);
Vue.use(SubmitBar);
Vue.use(Card);
Vue.use(AddressList);



Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
