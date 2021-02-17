<template>
  <div>
    <no-login v-if="!hasProduct"></no-login>
    <login-has-cart v-else></login-has-cart>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import NoLogin from './NoLogin'
import LoginHasCart from './LoginHasCart'
export default {
  components:{NoLogin,LoginHasCart},
  computed:{
    ...mapState(["hasProduct"]),
  }
  
  
}
</script>
<style>

</style>