<template>
  <div class="showStaff page">
    <el-tabs type="border-card">
      <el-tab-pane label="基本信息">
        <showBaseInfo></showBaseInfo>
      </el-tab-pane>
      <el-tab-pane label="详细信息">
        <showDetailInfo></showDetailInfo>
      </el-tab-pane>
      <el-tab-pane label="顾客信息">
        <showCustomer></showCustomer>
      </el-tab-pane>
      <el-tab-pane label="订单信息">
        <showOrder></showOrder>
      </el-tab-pane>
      <el-tab-pane label="店铺信息">
        <showStore></showStore>
      </el-tab-pane>
      <el-tab-pane label="设备信息">
        <showEquipment></showEquipment>
      </el-tab-pane>
      <el-tab-pane label="部门/职位变动">
        <showDepartment></showDepartment>
      </el-tab-pane>
      <el-tab-pane label="合同信息">
        <showPact></showPact>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import Emitter from '@/framework/mixins/emitter';
  import showCustomer from "./showStaffComponents/showCustomer";
  import showBaseInfo from "./showStaffComponents/showBaseInfo";
  import showDetailInfo from "./showStaffComponents/showDetailInfo";
  import showOrder from "./showStaffComponents/showOrder";
  import showStore from "./showStaffComponents/showStore";
  import showEquipment from "./showStaffComponents/showEquipment";
  import showDepartment from "./showStaffComponents/showDepartment";
  import showPact from "./showStaffComponents/showPact";

  export default {
    mixins: [Emitter],
    data() {
      return {}
    },
    components: {
      showCustomer,
      showBaseInfo,
      showDetailInfo,
      showOrder,
      showStore,
      showEquipment,
      showDepartment,
      showPact
    }
  }
</script>

<style lang="less" scoped>
  .page {
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>
