<template>
  <div class="page">
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane label="基本信息" name="0">
        <orderDetailBaseInfo></orderDetailBaseInfo>
      </el-tab-pane>
      <el-tab-pane label="收款记录" name="1">
        <collectionRecord></collectionRecord>
      </el-tab-pane>
      <el-tab-pane label="疗程信息" name="2">
        <treatmentMessage></treatmentMessage>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import orderDetailBaseInfo from "./orderDetailComponents/orderDetailBaseInfo"; // 引入订单详情基本信息组件
  import collectionRecord from "./orderDetailComponents/collectionRecord"; // 引入订单详情收款记录组件
  import treatmentMessage from "./orderDetailComponents/treatmentMessage"; // 引入订单详情疗程信息组件
  export default {
    data() {
      return {
        activeName:'0'
      }
    },
    components:{
      orderDetailBaseInfo,
      collectionRecord,
      treatmentMessage
    },
    mounted() {
       this.activeName = this.$route.params.activeName ? this.$route.params.activeName:this.activeName;
       console.log(this.$route.params);
    }
  }
</script>

<style lang="less" scoped>
  .el-tabs {
    margin-left: 30px;
  }
  .page {
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>
