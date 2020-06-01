<template>
  <div class='page'>
    <el-tabs class="box" type="border-card">
      <el-tab-pane label="基本信息">
        <shopDetailBaseInfo :salonData="salonData"></shopDetailBaseInfo>
      </el-tab-pane>
      <el-tab-pane label="详细信息">
        <shopDetailInfo :salonData="salonData"></shopDetailInfo>
      </el-tab-pane>
      <el-tab-pane label="结算记录">
        <settlementRecord></settlementRecord>
      </el-tab-pane>
      <el-tab-pane label="培训记录">
        <trainRecord></trainRecord>
      </el-tab-pane>
      <el-tab-pane label="交接记录">
        <connectRecord :salonHandoverData="salonHandoverData"></connectRecord>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import shopDetailBaseInfo from './showDetailComponents/shopDetailBaseInfo'; // 引入店铺详情基本信息页面组件
  import shopDetailInfo from "./showDetailComponents/shopDetailInfo"; // 引入店铺详情详细信息页面组件
  import settlementRecord from "./showDetailComponents/settlementRecord" // 引入店铺详情结算记录组件
  import trainRecord from "./showDetailComponents/trainRecord"; // 引入店铺详情培训记录组件
  import connectRecord from "./showDetailComponents/connectRecord"; // 引入店铺详情交接记录组件
  import {getById} from '@/project/service/salon'
  export default {
    data(){
      return {
        // 店铺数据
        salonData: {},
        salonHandoverData: []
      }
    },
    components:{
      shopDetailBaseInfo,
      shopDetailInfo,
      settlementRecord,
      trainRecord,
      connectRecord
    },
    methods: {
      // 获取店铺详细数据
      getSalonData(id) {
        getById({id: id}, res => {
          this.salonData = res
        })
      }
    },
    created() {
      this.id = this.$route.params.id
      this.getSalonData(this.id)
    }
  }
</script>

<style lang="less" scoped>
  .page {
    overflow-y: auto;
    overflow-x: hidden;
  }
  .box {
    margin-left: 20px;
  }
</style>
