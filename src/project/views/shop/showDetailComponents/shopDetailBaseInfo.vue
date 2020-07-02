<template>
  <div>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">启用状态</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">{{salon.enabled ? '启用' : '禁用'}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">店铺编号</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">{{salon.id}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">所属市场</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light" v-if="salon.department !== undefined">{{salon.department.name}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">所属老师</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light" v-if="salon.teacher !== undefined">{{salon.teacher.realName}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">详细地址</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">{{salon.address}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">营业时间</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">{{salon.businessHours}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">跑店人员</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light" v-if="salon.founder !== undefined">{{salon.founder.realName}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">有无设备</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">{{salon.deviceAssigned ? '有' : '无'}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">结款方式</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">{{salon.settlementPeriod}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">店家分成比例</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">{{salon.commissionRate}}%</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">老板名称</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">{{salon.bossName}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">老板电话</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">{{salon.bossPhone}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">合作子状态</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">{{salon.cooperationSubStatus}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">未出单天数</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">XXX</div>
      </el-col>
    </el-row>
    <el-row>
      <el-button style="background: rgb(0, 161, 108);border: none" type="primary" @click="goEditBaseInfo(salon.id)">编辑
      </el-button>
      <el-button style="background: rgb(0, 161, 108);border: none" type="primary" @click='triggerEnable(salon.id, salon.enabled)'>{{salon.enabled ? '禁用' : '启用'}}
      </el-button>
      <el-button style="background: rgb(0, 161, 108);border: none" type="primary" @click="goBack">返回上一页
      </el-button>
    </el-row>
  </div>
</template>

<script>
  import { enable } from '@/project/service/salon'
  export default {
    props: {
      salonData: {
        type: Object
      }
    },
    data() {
      return {
        // 店铺数据对象
        salon: {}
      }
    },
    methods:{
      // 前往编辑店铺基本信息页面
      goEditBaseInfo(id) {
        this.$router.push({path:'/shop/addOrEditBaseInfo/' + id ,query:{
          activeName:'0'
        }});
      },
      goBack() {
        this.$router.go(-1);
      },
      // 启禁用切换
      triggerEnable(id, flag) {
        let tip = flag ? '禁用' : '启用'
        enable({id, judge: !flag}, res => {
          this.$confirm(`${tip}`, `确定${tip}该店铺吗?`, {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: `${tip}店铺成功`
            })
            // 刷新数据
            this.$emit('refreshData', id)
          })
        })
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
