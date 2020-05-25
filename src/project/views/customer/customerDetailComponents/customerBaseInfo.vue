<template>
  <div>
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple">顾客编号</div></el-col>
      <el-col :span="22"><div class="grid-content bg-purple-light">
        123254687</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple">姓名</div></el-col>
      <el-col :span="22"><div class="grid-content bg-purple-light">李嘉诚</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple">性别</div></el-col>
      <el-col :span="22"><div class="grid-content bg-purple-light">男</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple">生日</div></el-col>
      <el-col :span="22"><div class="grid-content bg-purple-light">1956-12-23</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple">年龄</div></el-col>
      <el-col :span="22"><div class="grid-content bg-purple-light">65</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple">联系电话</div></el-col>
      <el-col :span="22"><div class="grid-content bg-purple-light">13578994545</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple">所在城市</div></el-col>
      <el-col :span="22"><div class="grid-content bg-purple-light">长沙</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple">顾客来源</div></el-col>
      <el-col :span="22"><div class="grid-content bg-purple-light">恋大自然官方体验店</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple">顾客类别</div></el-col>
      <el-col :span="22"><div class="grid-content bg-purple-light">疗程顾客</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple">疗程顾客子类型</div></el-col>
      <el-col :span="22"><div class="grid-content bg-purple-light">转交顾客</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple">顾客属性</div></el-col>
      <el-col :span="22"><div class="grid-content bg-purple-light">普通顾客</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple">意向部位</div></el-col>
      <el-col :span="22"><div class="grid-content bg-purple-light">手部</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple">成交部位</div></el-col>
      <el-col :span="22"><div class="grid-content bg-purple-light">手部</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple">预收定金</div></el-col>
      <el-col :span="22"><div class="grid-content bg-purple-light">2000</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple">档案录入人</div></el-col>
      <el-col :span="22"><div class="grid-content bg-purple-light">张曼玉</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple">顾客标签</div></el-col>
      <el-col :span="22"><div class="grid-content bg-purple-light">需重点跟进</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple">工作单位</div></el-col>
      <el-col :span="22"><div class="grid-content bg-purple-light">国家资源局</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple">备注</div></el-col>
      <el-col :span="22"><div class="grid-content bg-purple-light">无</div></el-col>
    </el-row>
    <el-col>
      <el-button style="background: rgb(0, 161, 108);border: none" type="primary" @click="goEditCustomerDetail">编辑
      </el-button>
      <el-button style="background: rgb(0, 161, 108);border: none" type="primary" @click="goBack">返回上一页
      </el-button>
    </el-col>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods:{
      goBack() {
        this.$router.go(-1);
      },
      goEditCustomerDetail() {
        this.$router.push({path: '/customer/editCustomerDetail'})
      }
    }
  }
</script>

<style lang="less" scoped>
  .el-row {
    margin-bottom: 20px;
  }
</style>
