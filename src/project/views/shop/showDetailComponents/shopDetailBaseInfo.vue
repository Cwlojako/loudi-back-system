<template>
  <div>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">启用状态</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">已启用</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">店铺编号</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">13546876</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">所属市场</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">总部-市场部-广东</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">所属老师</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">刘国富</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">详细地址</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">广东省广州市天河区乐天大厦101</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">营业时间</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">09:00-22:00</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">跑店人员</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">紫小鲸</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">有无设备</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">有</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">结款方式</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">月结</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">店家分成比例</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">10%</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">老板名称</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">刘德华</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">老板电话</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">13554254789</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">合作子状态</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">已出单</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">未出单天数</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">30</div>
      </el-col>
    </el-row>
    <el-row>
      <el-button style="background: rgb(0, 161, 108);border: none" type="primary" @click="goEditBaseInfo">编辑
      </el-button>
      <el-button style="background: rgb(0, 161, 108);border: none" type="primary">禁用
      </el-button>
      <el-button style="background: rgb(0, 161, 108);border: none" type="primary" @click="goBack">返回上一页
      </el-button>
    </el-row>
  </div>
</template>

<script>
    export default {
      data() {
        return {
        }
      },
      methods:{
        // 前往编辑店铺基本信息页面
        goEditBaseInfo() {
          this.$router.push({path:'/shop/addOrEditBaseInfo',query:{
            activeName:'0'
          }});
        },
        goBack() {
          this.$router.go(-1);
        }
      }
    }
</script>

<style lang="less" scoped>
  .bg-purple {
    color: #999999;
  }

  .el-row {
    margin-bottom: 15px;
  }

  .el-tab-pane .el-row:last-child {
    margin-top: 30px;
  }
</style>
