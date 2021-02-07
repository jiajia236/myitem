<template>
  <div class="login">
    <mt-header title="用户登录">
      <router-link to="/" slot="left"><mt-button icon="back"></mt-button></router-link>
      <router-link to="/reg" slot="right">去登录</router-link>
    </mt-header>
    <mt-field  type="text" placeholder="请输入用户名" label="用户名" v-model="uname" :attr="{maxlength:20}">
    </mt-field>
    <mt-field :state="error" :type="type" placeholder="请输入密码" label="密码" v-model="upwd" :attr="{maxlength:20,autocomplete:'off'}">
      <img :src="type==='password'?'/img/login/eyeclose.png':'/img/login/eyeopen.png'" class="eye" @click="look">
    </mt-field>
  </div>
</template>
<script>
export default {
  data(){
    return{
      uname:"",
      type:"password",
      type2:"password",
      upwd:"",
      upwdsure:""
    }
  },
  methods:{
    look(){
      if(this.type==="password"){
        this.type="text";
      }else{
        this.type="password";
      }
    }
  }
}
</script>
<style>
  .login .eye{
      width:24px;
      height:24px;
  }
  .login .mintui-field-success,.login .mintui-field-error{
    margin-right:20px;  
  }

</style>