<template>
  <div>
    <p class="p_title">设备运行情况</p>
    <div class="deviceStatus-wrapper">
      <div class="main">
        <p>
          <span class="title">设备状态</span>
          <span class="text">{{device.enabled ? '运行中' : '关机'}}</span>
        </p>
        <p>
          <span class="title">订单编号</span>
          <span class="text">XXX</span>
        </p>
        <p>
          <span class="title">开始时间</span>
          <span class="text">XXX</span>
        </p>
        <p>
          <span class="title">能量</span>
          <span class="text">XXX</span>
        </p>
        <p>
          <span class="title">频率</span>
          <span class="text">XXX</span>
        </p>
        <p>
          <span class="title">制冷等级</span>
          <span class="text">XXX</span>
        </p>
        <p>
          <span class="title">发光次数</span>
          <span class="text">XXX</span>
        </p>
      </div>
      <div class="button-group">
        <el-button :disabled="device.enabled" style="background: rgb(0, 161, 108);border: none" type="primary" @click="openEquipment(device.id)">开机</el-button>
        <el-button :disabled="!device.enabled" style="background: rgb(0, 161, 108);border: none" type="primary" @click="colseEquipment(device.id)">关机</el-button>
        <el-button style="background: rgb(0, 161, 108);border: none" type="primary" @click="impower(device.id)">授权</el-button>
        <el-button style="background: rgb(0, 161, 108);border: none" type="primary" @click="takeBack(device.id)">收回</el-button>
      </div>
    </div>
    <p class="p_title">
      设备信息
      <el-button
        style="background: rgb(0, 161, 108);border: none;margin-left: 30px"
        type="primary"
        @click="editEquipmentInfo(device.id)">
        修改
      </el-button>
    </p>
    <div class="main">
      <p>
        <span class="title">设备编号</span>
        <span class="text">{{device.number}}</span>
      </p>
      <p>
        <span class="title">机型</span>
        <span class="text" v-if="device.deviceModel !== undefined">{{device.deviceModel.name}}</span>
      </p>
      <p>
        <span class="title">所属市场</span>
        <span class="text" v-if="device.department !== undefined">{{device.department.name}}</span>
      </p>
      <p>
        <span class="title">所属分公司</span>
        <span class="text">XXX</span>
      </p>
      <p>
        <span class="title">MAC地址</span>
        <span class="text">{{device.macAddress}}</span>
      </p>
      <p>
        <span class="title">IP地址</span>
        <span class="text">XXX</span>
      </p>
      <p>
        <span class="title">设备区号</span>
        <span class="text">{{device.zipCode}}</span>
      </p>
      <p>
        <span class="title">投放时间</span>
        <span class="text">{{device.marketAt}}</span>
      </p>
      <p>
        <span class="title">出厂时间</span>
        <span class="text">{{device.shipAt}}</span>
      </p>
    </div>
  </div>
</template>

<script>
  import {enable, disable} from '@/project/service/device'
  export default {
    props: {
      deviceData: {
        type: Object
      }
    },
    watch: {
      deviceData: {
        handler(val) {
          this.device = val
        },
        deep: true
      }
    },
    data() {
      return {
        device: {}
      }
    },
    methods:{
      // 修改
      editEquipmentInfo(id) {
        this.$router.push({path:'/equipment/addOrEditEquipment/' + id});
      },
      // 开机
      openEquipment(id) {
        this.$confirm(' 该操作会影响设备当前状态，您还要继续吗', '是否立即对设备进行开机', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          enable({id: id}, res => {
            // 刷新数据
            this.$emit('refreshData', id)
            this.$message({
              type: 'success',
              message: '开机成功!'
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消本次操作'
          });
        });
      },
      // 关机
      colseEquipment(id) {
        this.$confirm(' 该操作会影响设备当前状态，您还要继续吗', '是否立即对设备进行关机', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          disable({id: id}, res => {
            this.$emit('refreshData', id)
            this.$message({
              type: 'success',
              message: '关机成功!'
            });
          })
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
    .deviceStatus-wrapper {
      display: flex;
      .main{
        flex: 0 0 400px;
      }
      .button-group{
        flex: 1;
        display: flex;
        flex-direction: column;
        .el-button {
          width: 150px;
          height: 40px;
          margin: 10px 0;
        }
      }
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
