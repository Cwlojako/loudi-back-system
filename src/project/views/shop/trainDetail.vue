<template>
  <div class="box">
    <p style="font-weight: bold;margin: 25px 0;">基本信息</p>
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple">店铺名称</div></el-col>
      <el-col :span="22"><div class="grid-content bg-purple-light">{{trainingData.salon.name}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple">培训人</div></el-col>
      <el-col :span="22"><div class="grid-content bg-purple-light">{{trainingData.employee.realName}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple">培训时间</div></el-col>
      <el-col :span="22"><div class="grid-content bg-purple-light">{{trainingData.trainAt}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple">参与人数</div></el-col>
      <el-col :span="22"><div class="grid-content bg-purple-light">{{trainingData.studentQuantity}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple">培训主题</div></el-col>
      <el-col :span="22"><div class="grid-content bg-purple-light">{{trainingData.subject}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple">培训对象</div></el-col>
      <el-col :span="22"><div class="grid-content bg-purple-light">{{trainingData.trainee}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple">培训内容</div></el-col>
      <el-col :span="22"><div class="grid-content bg-purple-light">{{trainingData.content}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple">培训成果</div></el-col>
      <el-col :span="22"><div class="grid-content bg-purple-light">{{trainingData.result}}</div></el-col>
    </el-row>
    <el-col>
      <el-button style="background: rgb(0, 161, 108);border: none" type="primary">确认
      </el-button>
      <el-button style="background: rgb(0, 161, 108);border: none" type="primary" @click="goBack">返回上一页
      </el-button>
    </el-col>
  </div>
</template>

<script>
  import { get } from '@/project/service/training'
  export default {
    data() {
      return {
        id: this.$route.params.id,
        trainingData: {
          salon: {},
          employee: {}
        }
      }
    },
    methods:{
      goBack() {
        this.$router.go(-1);
      }
    },
    created() {
      get({id: this.id}, res => {
        this.trainingData = res
      })
    }
  }
</script>

<style lang="less" scoped>
  .box {
    padding-left: 30px;
    box-sizing: border-box;

    .el-col {
      margin-bottom: 15px;
    }

    .bg-purple {
      color: #999999;
    }
  }
</style>
