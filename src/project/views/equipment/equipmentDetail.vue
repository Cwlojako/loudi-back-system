<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="设备详情">
        <equipmentInfo></equipmentInfo>
      </el-tab-pane>
      <el-tab-pane label="设备运行轨迹">
        <equipmentTrack></equipmentTrack>
      </el-tab-pane>
      <el-tab-pane label="维修记录">
        <fixRecord></fixRecord>
      </el-tab-pane>
      <el-tab-pane label="交接记录">
        <connectRecord></connectRecord>
      </el-tab-pane>
      <el-tab-pane label="统计分析">
        <totalAnalyze></totalAnalyze>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import equipmentInfo from "./equipmentDetailComponents/equipmentInfo"; // 引入设备详情的设备信息组件
  import equipmentTrack from "./equipmentDetailComponents/equipmentTrack"; // 引入设备详情的设备运行轨迹组件
  import fixRecord from "./equipmentDetailComponents/fixRecord"; // 引入设备详情的维修记录组件
  import connectRecord from "./equipmentDetailComponents/connectRecords"; // 引入设备详情的交接记录组件
  import totalAnalyze from "./equipmentDetailComponents/totalAnalyze"; // 引入设备详情的统计分析组件
  export default {
    data() {
      return {
      }
    },
    components:{
      equipmentInfo,
      equipmentTrack,
      fixRecord,
      connectRecord,
      totalAnalyze
    }
  }
</script>

<style lang="less" scoped>
  .el-tabs {
    margin-left: 30px;
  }
</style>
