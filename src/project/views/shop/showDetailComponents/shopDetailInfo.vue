<template>
  <div>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">来源</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">{{salon.sourceChannel}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">合作状态</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">{{salon.cooperationStatus}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">项目负责人</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">{{salon.projectLeader}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">负责人联系方式</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">{{salon.projectLeaderPhone}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">店家分类</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">{{salon.category}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">店家质量</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">{{salon.quality}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">店内面积</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">{{salon.area}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">经营年限</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">{{salon.licenseExpireAt}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">美容师人数</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">{{salon.beauticianQuantity}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">店内会员数</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">{{salon.memberQuantity}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">成交人数</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">{{salon.customerQuantity}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">广告费</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">XXX</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">店家配合程度</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">{{salon.cooperationDegree}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">店内基本项目</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">{{salon.serviceContent}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">店外环境</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">{{salon.serviceEnvironment}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">店内介绍</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">{{salon.description}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">备注</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">{{salon.comment}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-button style="background: rgb(0, 161, 108);border: none" type="primary" @click="goEditBaseInfo(salon.id)">编辑
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
    props: {
      salonData: {
        type: Object
      }
    },
    data() {
      return {
        salon: {}
      }
    },
    methods:{
      // 前往编辑店铺基本信息页面
      goEditBaseInfo(id) {
        this.$router.push({path:'/shop/addOrEditBaseInfo/' + id ,query:{
            activeName:'1'
        }});
      },
      goBack() {
        this.$router.go(-1);
      }
    },
    watch: {
      salonData: {
        handler(val) {
          this.salon = val
        },
        deep: true
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
