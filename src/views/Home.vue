<template>
  <div class="index">
    <mt-header title="Lover 花"></mt-header>
    <mt-swipe class="swipe">
      <!-- <mt-swipe-item>
        <img src="../assets/01.jpg">
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="../assets/02.jpg">
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="../assets/06.jpg">
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="../assets/07.jpg">
      </mt-swipe-item> -->
    </mt-swipe>
    <mt-navbar v-model="active">
      <mt-tab-item id="1">玫瑰</mt-tab-item>
      <mt-tab-item id="2">康乃馨</mt-tab-item>
      <mt-tab-item id="3">郁金香</mt-tab-item>
      <mt-tab-item id="4">百合</mt-tab-item>
    </mt-navbar>
  </div>
</template>

<script>
export default {
  data(){
    return{
      active:"1",
    }
  }
}
</script>

<style>
.index .mint-header{
  background-color: red;
}
.index .mint-header-title{
  font-size: 25px;
   font-family: "Times New Roman", Times, serif;
}
.index .swipe{
  height: 240px;
}
.index .swipe img{
  width: 100%;
}
</style>