<template>
  <div class="box">
    <el-card class="box-card">
      <el-row>
        <search
          style="width: 95%;margin: 10px auto"
          :search-items="searchItems"
        ></search>
      </el-row>
      <el-row class="show">
        <p>
          <span class="title">操作总次数:</span>
          <span class="text">99次</span>
        </p>
        <p>
          <span class="title">发光次数:</span>
          <span class="text">999次</span>
        </p>
        <p>
          <span class="title">操作时长:</span>
          <span class="text">141分钟</span>
        </p>
        <p>
          <span class="title">总成交额:</span>
          <span class="text">456544元</span>
        </p>
        <p>
          <span class="title">部位一下单次数:</span>
          <span class="text">5次</span>
        </p>
        <p>
          <span class="title">部位二下单次数:</span>
          <span class="text">5次</span>
        </p>
        <p>
          <span class="title">部位三下单次数:</span>
          <span class="text">5次</span>
        </p>
      </el-row>
    </el-card>
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
          {
            name: "归属市场",
            key: "",
            type: "select",
            displayValue: [],
            value: []
          }
        ]
      }
    },
    components:{
      Search
    }
  }
</script>

<style lang="less" scoped>
  .box {
    padding-top: 20px;
    padding-left: 30px;
    box-sizing: border-box;

    .show {
      padding-left: 80px;
      margin-top: 50px;
      color: #999999;
      p {
        margin-bottom: 15px;
        span {
          display: inline-block;
          width: 140px;
        }
      }
    }
  }
</style>
