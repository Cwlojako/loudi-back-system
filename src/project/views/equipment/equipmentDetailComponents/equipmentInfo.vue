<template>
  <div>
    <p class="p_title">设备运行情况</p>
    <div class="main">
      <p>
        <span class="title">设备状态</span>
        <span class="text">脸部操作中</span>
      </p>
      <p>
        <span class="title">订单编号</span>
        <span class="text">641315649123</span>
      </p>
      <p>
        <span class="title">开始时间</span>
        <span class="text">2019-12-12</span>
      </p>
      <p>
        <span class="title">能量</span>
        <span class="text">666J</span>
      </p>
      <p>
        <span class="title">频率</span>
        <span class="text">30HZ</span>
      </p>
      <p>
        <span class="title">制冷等级</span>
        <span class="text">6级</span>
      </p>
      <p>
        <span class="title">发光次数</span>
        <span class="text">20次</span>
      </p>
    </div>
    <p class="p_title">设备信息 <el-button style="background: rgb(0, 161, 108);border: none;margin-left: 30px"  type="primary" @click="editEquipmentInfo">修改</el-button></p>
    <div class="main">
      <p>
        <span class="title">设备编号</span>
        <span class="text">5641325646</span>
      </p>
      <p>
        <span class="title">机型</span>
        <span class="text">脱毛机</span>
      </p>
      <p>
        <span class="title">所属市场</span>
        <span class="text">天河</span>
      </p>
      <p>
        <span class="title">所属分公司</span>
        <span class="text">广州</span>
      </p>
      <p>
        <span class="title">MAC地址</span>
        <span class="text">2c:6d:2w:ee:33</span>
      </p>
      <p>
        <span class="title">IP地址</span>
        <span class="text">192.168.1.1</span>
      </p>
      <p>
        <span class="title">设备区号</span>
        <span class="text">21000</span>
      </p>
      <p>
        <span class="title">投放时间</span>
        <span class="text">2019-6-9</span>
      </p>
      <p>
        <span class="title">出厂时间</span>
        <span class="text">2018-11-15</span>
      </p>
    </div>
    <div>
      <el-button style="background: rgb(0, 161, 108);border: none"  type="primary" @click="openEquipment">开机</el-button>
      <el-button style="background: rgb(0, 161, 108);border: none"  type="primary" @click="colseEquipment">关机</el-button>
      <el-button style="background: rgb(0, 161, 108);border: none"  type="primary" @click="impower">授权</el-button>
      <el-button style="background: rgb(0, 161, 108);border: none"  type="primary" @click="takeBack">收回</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods:{
      // 修改
      editEquipmentInfo() {
        this.$router.push({path:'/equipment/addOrEditEquipment'});
      },
      // 开机
      openEquipment() {
        this.$confirm(' 该操作会影响设备当前状态，您还要继续吗', '是否立即对设备进行开机', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$message({
              type: 'success',
              message: '操作成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消本次操作'
          });
        });
      },
      // 关机
      colseEquipment() {
        this.$confirm(' 该操作会影响设备当前状态，您还要继续吗', '是否立即对设备进行关机', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消本次操作'
          });
        });
      },
      // 授权
      impower() {
        this.$confirm(' 该操作会影响设备当前状态，您还要继续吗', '是否立即对设备进行断电重连', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消本次操作'
          });
        });
      },
      // 收回
      takeBack() {
        this.$confirm(' 该操作会将归属权回收至总部，您还要继续吗', '是否立即对设备进行回收', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消本次操作'
          });
        });
      }
    }
  }
</script>

<style lang="less" scoped>
    .p_title {
      font-weight: bold;
      margin-bottom: 25px;
    }

  .main {
    margin-bottom: 30px;
    p {
      margin-bottom: 15px;
      span {
        display: inline-block;
      }
      .title {
        width: 130px;
        color: #999999;
      }
    }
  }
</style>
