<template>
  <div class="box">
    <el-card class="box-card">
      <p>基本信息</p>
      <el-row>
        <el-col :span="3"><div class="grid-content bg-purple">记录名称</div></el-col>
        <el-col :span="21"><div class="grid-content bg-purple-light">{{fixData.name}}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="3"><div class="grid-content bg-purple">维修员姓名</div></el-col>
        <el-col :span="21"><div class="grid-content bg-purple-light">{{fixData.employee.realName}}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="3"><div class="grid-content bg-purple">故障原因</div></el-col>
        <el-col :span="21"><div class="grid-content bg-purple-light">{{fixData.cause}}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="3"><div class="grid-content bg-purple">维修方式</div></el-col>
        <el-col :span="21"><div class="grid-content bg-purple-light">{{fixData.repairMode}}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="3"><div class="grid-content bg-purple">维修时间</div></el-col>
        <el-col :span="21"><div class="grid-content bg-purple-light">{{fixData.createAt}}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="3"><div class="grid-content bg-purple">费用承担</div></el-col>
        <el-col :span="21"><div class="grid-content bg-purple-light">{{fixData.payer}}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="3"><div class="grid-content bg-purple">处理结果及说明</div></el-col>
        <el-col :span="21"><div class="grid-content bg-purple-light">{{fixData.result}}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="3"><div class="grid-content bg-purple">图片</div></el-col>
        <el-col :span="21">
          <div class="grid-content bg-purple-light">
            <img src="../../assets/logo.png">
          </div>
        </el-col>
      </el-row>
      <el-button style="background: rgb(0, 161, 108);border: none;margin-top: 30px"  type="primary" @click="goBack">返回上一页
      </el-button>
    </el-card>
  </div>
</template>

<script>
  import {getFixById} from '@/project/service/maintenance'
  export default {
    data() {
      return {
        // 维修记录id
        id: 0,
        fixData: {
          employee: {}
        }
      }
    },
    methods:{
      // 返回上一页
      goBack() {
        this.$router.go(-1);
      },
      getFixData(id) {
        getFixById({id: id}, res => {
          this.fixData = res
        })
      }
    },
    created() {
      this.id = this.$route.params.id
      this.getFixData(this.id)
    }
  }
</script>

<style lang="less" scoped>
  .box {
    padding: 20px;
    box-sizing: border-box;
    .box-card {
      p {
        font-weight: bold;
        margin-bottom: 30px;
      }
      .el-row {
        margin-bottom: 20px;
        .bg-purple {
          color: #999999;
        }
      }
      img {
        width: 100px;
        height: 100px;
      }
    }
  }
</style>
