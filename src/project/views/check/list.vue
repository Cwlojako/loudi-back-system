<template>
  <div>
    <el-tabs class="bigBox" @tab-click="toggleTab">
      <el-tab-pane label="由我审批的">
        <el-tabs type="border-card">
          <el-tab-pane label="订单交接审批">
            <orderConnect :currentScene="currentScene"></orderConnect>
          </el-tab-pane>
          <el-tab-pane label="订单退款审批">
            <orderRefund :currentScene="currentScene"></orderRefund>
          </el-tab-pane>
          <el-tab-pane label="店铺交接审批">
            <storeConnect :currentScene="currentScene"></storeConnect>
          </el-tab-pane>
          <el-tab-pane label="顾客共享审批">
            <customerShare :currentScene="currentScene"></customerShare>
          </el-tab-pane>
          <el-tab-pane label="顾客交接审批">
            <customerConnect :currentScene="currentScene"></customerConnect>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="抄送给我的">
        <el-tabs type="border-card">
          <el-tab-pane label="订单交接审批">
            <orderConnect :currentScene="currentScene"></orderConnect>
          </el-tab-pane>
          <el-tab-pane label="订单退款审批">
            <orderRefund :currentScene="currentScene"></orderRefund>
          </el-tab-pane>
          <el-tab-pane label="店铺交接审批">
            <storeConnect :currentScene="currentScene"></storeConnect>
          </el-tab-pane>
          <el-tab-pane label="顾客共享审批">
            <customerShare :currentScene="currentScene"></customerShare>
          </el-tab-pane>
          <el-tab-pane label="顾客交接审批">
            <customerConnect :currentScene="currentScene"></customerConnect>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
    import orderConnect from "./checkComponents/orderConnect"; // 引入订单交接审批组件
    import orderRefund from "./checkComponents/orderRefund"; // 引入订单退款审批组件
    import storeConnect from "./checkComponents/storeConnect"; // 引入店铺交接审批组件
    import customerShare from "./checkComponents/customerShare"; // 引入顾客共享审批组件
    import customerConnect from "./checkComponents/customerConnect"; // 引入顾客交接审批组件

    export  default {
      data() {
        return {
          // 用于判断当前是由我审批还是发送至我
          currentScene:'0'
        }
      },
      methods:{
        // 切换标签页时触发
        toggleTab(tab, event) {
          console.log(tab, event);
          this.currentScene = tab.index;
          console.log(this.currentScene);
        }
      },
      components:{
        orderConnect,
        orderRefund,
        storeConnect,
        customerShare,
        customerConnect
      }
    }
</script>

<style lang="less" scoped>
  .bigBox {
    margin-left: 20px;
  }
</style>
