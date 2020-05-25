<template>
  <div class="box">
    <el-col>
      <p style="font-weight: bold;margin-bottom: 15px;margin-top: 10px">基本信息</p>
      <p style="margin-bottom: 10px">
        <span class="title">结算时间</span>
        <span class="text">2019-12-30</span>
      </p>
      <p style="margin-bottom: 10px">
        <span class="title">结算状态</span>
        <span class="text">待确认</span>
      </p>
      <p style="margin-bottom: 10px">
        <span class="title">结算总额</span>
        <span class="text">2000.00</span>
      </p>
    </el-col>
    <el-col>
      <p style="font-weight: bold;margin-bottom: 10px">订单信息</p>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="订单编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="顾客名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="结算金额">
        </el-table-column>
        <el-table-column
          prop="address"
          label="订单总额">
        </el-table-column>
        <el-table-column
          prop="address"
          label="部位">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small">
              查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col>
      <el-button style="background: rgb(0, 161, 108);border: none" type="primary">确认
      </el-button>
      <el-button style="background: rgb(0, 161, 108);border: none" type="primary" @click="goBack">返回上一页
      </el-button>
    </el-col>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods:{
      goBack() {
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped lang="less">
  .box {
    padding-left: 30px;
    box-sizing: border-box;
    .title {
      display: inline-block;
      width: 120px;
      color: #999999;
    }

    .el-col {
      margin-bottom: 30px;
    }
  }
</style>
