<template>
  <div class="page">
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane label="基本信息" name="0">
        <orderDetailBaseInfo :orderData="orderData"></orderDetailBaseInfo>
      </el-tab-pane>
      <el-tab-pane label="收款记录" name="1">
        <collectionRecord></collectionRecord>
      </el-tab-pane>
      <el-tab-pane label="疗程信息" name="2">
        <treatmentMessage :productId="productId"></treatmentMessage>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import {findByOrderId} from "@/project/service/order"
  import orderDetailBaseInfo from "./orderDetailComponents/orderDetailBaseInfo"; // 引入订单详情基本信息组件
  import collectionRecord from "./orderDetailComponents/collectionRecord"; // 引入订单详情收款记录组件
  import treatmentMessage from "./orderDetailComponents/treatmentMessage"; // 引入订单详情疗程信息组件
  import {find, search, count, get} from '@/project/service/treatmentException'

  export default {
    data() {
      return {
        activeName: '0',
        // 订单数据信息
        orderData: {},
        // 产品id
        productId: 0,
        model: 'order'
      }
    },
    components:{
      orderDetailBaseInfo,
      collectionRecord,
      treatmentMessage
    },
    methods: {
      getOrderData(id) {
        find(param, res => {
          console.log(res)
          this.orderData = res[0]
          // 获取产品id
          this.productId = res[0].product.id
        })
      }
    },
    mounted() {
      this.activeName = this.$route.params.activeName ? this.$route.params.activeName:this.activeName;
    },
    created() {
      this.id = parseInt(this.$route.params.id)
      // 获取订单基本信息数据
      this.getOrderData(this.id)
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
