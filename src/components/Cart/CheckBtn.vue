<template>
  <van-checkbox @click="changecheckall" v-model="checked" checked-color="rgb(255,155,77)" class="checkone"></van-checkbox>
</template>
<script>
export default {
  data(){
    return {checked:true}
  },
  props:["checkall"],
  methods:{
    changecheckall(){
      if(!this.checked){
        this.$emit("zdy",this.checked);
      }
    }
  },
  watch:{
    checkall(){
      this.checked=this.checkall;
    },
  }
}
</script>