<template>
  <div class="pay">
    <div id="myModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <div>支付方式</div>
                <!-- <span id="closeBtn" class="close">×</span> -->
            </div>
            <div class="modal-body">
                <div class="payway" style="border-bottom:1px solid #f5f5f5"><span>支付宝支付</span><input type="radio" value="" style="float:right"/></div>
                <div class="payway" style="margin-bottom:2vh;"><span>微信支付</span><input type="radio" value="" style="float:right"/></div>
            </div>
            <div class="bottom_pay_btn">支付</div>
        </div>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style scoped>
  .modal {
            display: none; /* 默认隐藏 */
            position: fixed; /* 根据浏览器定位 */
            z-index: 1; /* 放在底部 */
            left: 0;
            bottom:10px;
            width: 100%; /* 全宽 */
            height: 100%; /* 全高 */
            overflow: hidden; /* 允许滚动 */
            background-color: rgba(0,0,0,0.4); /* 背景色 */
        }
        /*模态框内容*/
        .modal-content {
            display: flex; /*采用flexbox布局*/
            flex-direction: column; /*垂直排列*/
            position: absolute;
            bottom:0;
            background-color: #fefefe;
            /* margin: 127% 0;  */
            padding: 20px;
            width: 90%;
            animation: topDown 0.4s; /*自定义动画，从模态框内容上到下出现*/
        }
        @keyframes topDown {
            from {bottom: -100px; opacity: 0}
            to {bottom:0px; opacity: 1}
        }
        .bottom_pay_btn{
            position:absolute;
            bottom:0.5vh;
            width:89%;
            /* margin-left:1%; */
            height:33px;
            line-height: 33px;
            color: #fff;
            text-align: center;
            background:#dc443b;
            border-radius:4px;
            
        }
        /*模态框头部*/
        .modal-header {
            display: flex; /*采用flexbox布局*/
            flex-direction: row; /*水平布局*/
            align-items: center; /*内容垂直居中*/
            justify-content: space-between; 
        }
        /*关闭X 样式*/
        .close {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
        }
        .close:hover {
            color: black;
            text-decoration: none;
            cursor: pointer;
        }

</style>