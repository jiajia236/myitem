<template>
  <van-checkbox checked-color="rgb(255,155,77)" class="checkone" @click="check()"></van-checkbox>
</template>
<script>
export default {
  data(){
    return {checked:true}
  },
  props:["checkall"],
  methods:{
    check(){
   
    },
    send(){
      this.$emit("getchecked",this.checked);
    },
    
  }
}
</script>