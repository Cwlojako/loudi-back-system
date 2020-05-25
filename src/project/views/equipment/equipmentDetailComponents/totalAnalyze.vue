<template>
  <div>
    <search
      style="width: 95%;margin: 10px auto"
      :search-items="searchItems"
    ></search>
    <el-row>
      <el-col :span="3"><div class="grid-content bg-purple">操作总次数:</div></el-col>
      <el-col :span="21"><div class="grid-content bg-purple-light">1000次</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="3"><div class="grid-content bg-purple">单脉冲总次数:</div></el-col>
      <el-col :span="21"><div class="grid-content bg-purple-light">1000次</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="3"><div class="grid-content bg-purple">双脉冲总次数:</div></el-col>
      <el-col :span="21"><div class="grid-content bg-purple-light">1000次</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="3"><div class="grid-content bg-purple">总成交额:</div></el-col>
      <el-col :span="21"><div class="grid-content bg-purple-light">135456123元</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="3"><div class="grid-content bg-purple">部位一下单次数:</div></el-col>
      <el-col :span="21"><div class="grid-content bg-purple-light">5次</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="3"><div class="grid-content bg-purple">部位二下单次数:</div></el-col>
      <el-col :span="21"><div class="grid-content bg-purple-light">10次</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="3"><div class="grid-content bg-purple">部位三下单次数:</div></el-col>
      <el-col :span="21"><div class="grid-content bg-purple-light">100次</div></el-col>
    </el-row>
  </div>
</template>

<script>
  import Search from "@/framework/components/search";
  export default {
    data() {
      return {
        // 搜索组件配置项
        searchItems: [
          {
            name: "选择日期",
            key: "accessAt",
            type: "date",
          },
          {
            name: "选择部位",
            key: "",
            type: "select",
            displayValue: [],
            value: []
          },
        ]
      }
    },
    components:{
      Search
    }
  }
</script>

<style lang="less" scoped>
  .el-row {
    margin-bottom: 15px;
    margin-left: 50px;
    margin-top: 30px;
    color: #999999;
  }
</style>
