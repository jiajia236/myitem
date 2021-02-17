<template>
  <div class="addredit">
    <mt-header class="myheader" title="新增收货地址">
      <mt-button slot="left" icon="back" @click="goback()"></mt-button>
    </mt-header>
    <van-address-edit
  :area-list="areaList"
  show-postal
  show-set-default
  show-search-result
  :search-result="searchResult"
  :area-columns-placeholder="['请选择', '请选择', '请选择']"
  @save="onSave"
  @change-detail="onChangeDetail"
/>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex';
import Area from '../../assets/js/area.js'
export default {
  computed:{
    ...mapState(["orderInfo"])
  },
  methods:{
    ...mapMutations(["setOrderInfo"]),
    goback(){
      this.$router.push("/addrlist")
    },
    onSave(e) {
      // Toast('save');
      console.log(e);
      this.setOrderInfo(e);
      this.$toast("保存成功");
      this.$router.push("/addrlist");
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: '嘉州协信中心A栋18楼',
            address: '重庆市江北区',
          },
          {
            name: '中山一路6号附24号1-18',
            address: '重庆市渝中区',
          },
          {
            name: '观音桥北城旺角E栋门面',
            address: '重庆市江北区',
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
  },
  data() {
    return {
      areaList:Area,
      searchResult: [],
    };
  },
}
</script>