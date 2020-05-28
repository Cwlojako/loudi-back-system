<template>
  <div class="page">
    <el-tabs type="border-card">
      <el-tab-pane label="基本信息">
        <customerBaseInfo></customerBaseInfo>
      </el-tab-pane>
      <el-tab-pane label="转交历史">
        <customerHistory></customerHistory>
      </el-tab-pane>
      <el-tab-pane label="订单信息">
        <orderMessage></orderMessage>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import customerBaseInfo from "./customerDetailComponents/customerBaseInfo" // 引入顾客详情的基本信息组件
  import customerHistory from "./customerDetailComponents/customerHistory" // 引入顾客详情的转交历史组件
  import orderMessage from "./customerDetailComponents/orderMessage" // 引入顾客详情的订单信息组件
  export default {
    data() {
      return {}
    },
    components:{
      customerBaseInfo,
      customerHistory,
      orderMessage
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
