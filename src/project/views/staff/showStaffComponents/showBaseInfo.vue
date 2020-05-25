<template>
  <div>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">启用状态</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">{{employee.enabled ? '已启用' : '已禁用'}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">在职状态</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">{{employee.serviceStatus}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">工号</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">{{employee.number}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">是否负责人</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">{{employee.manageble ? '是' : '否'}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">手机号</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">{{employee.phone}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">姓名</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">{{employee.realName}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">头像</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light"><img src="../../..//assets/logo.png" alt=""></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">性别</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">{{employee.gender}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">出生日期</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">{{employee.birthday}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">部门</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">{{employee.department.name}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">职位</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">市场老师</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">培训批次</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">{{employee.trainingOrder}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">正式入职时间</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">{{employee.employedAt}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">介绍人</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">紫大鲸</div>
      </el-col>
    </el-row>
    <el-row>
      <el-button type="success" @click="goEditStaffPage(id)">编辑</el-button>
      <el-button type="success" @click="leave(id)" v-if="employee.serviceStatus === '在职'">离职</el-button>
      <el-button type="success" @click="restore(id)" v-else>恢复职位</el-button>
      <el-button type="success" @click="handleDisable(id)" v-if="employee.enabled && employee.serviceStatus === '在职'">禁用</el-button>
      <el-button type="success" @click="handleEnable(id)"
                 :disabled="employee.serviceStatus === '离职'"
                 v-if="!employee.enabled || employee.serviceStatus === '离职'">
        启用
      </el-button>
      <el-button type="success" @click="goBack">返回上一页</el-button>
    </el-row>
  </div>
</template>

<script>
  import {get, disable, enable, leave, restore} from '@/project/service/employee'
  export default {
    data() {
      return {
        employee: {
          department: {name: ''}
        },
        id: 0
      }
    },
    methods:{
      // 前往编辑员工基本信息页面
      goEditStaffPage(id) {
        this.$router.push({path: '/staff/addStaff/' + id});
      },
      // 离职
      leave(id) {
        this.$confirm('进行该操作后员工则不可再登录该系统，请确保员工完成交接工作后再进行离职操作。', '确定该员工已经离职吗?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          leave({id: id}, res => {
            this.getEmployeeData(id)
            this.$message({
              type: 'success',
              message: '离职成功!'
            });
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },
      // 恢复职位
      restore(id) {
        this.$confirm('进行该操作后员工将可以登录该系统，请确保是否要恢复该员工职位。', '确定该员工要恢复职位吗?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          restore({id: id}, res => {
            this.getEmployeeData(id)
            this.$message({
              type: 'success',
              message: '恢复职位成功!'
            });
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },
      // 返回上一页
      goBack() {
        this.$router.go('-1');
      },
      // 根据传递过来的员工id获取员工数据
      getEmployeeData(id) {
        get({id: id}, res => {
          console.log(res)
          this.employee = res
        })
      },
      // 禁用员工
      handleDisable(id) {
        disable({id: id}, res => {
          this.getEmployeeData(id)
          this.$message({
            type: 'success',
            message: '禁用成功'
          })
        })
      },
      // 启用员工
      handleEnable(id) {
        enable({id: id}, res => {
          this.getEmployeeData(id)
          this.$message({
            type: 'success',
            message: '启用成功'
          })
        })
      }
    },
    created() {
      this.id = parseInt(this.$route.params.id)
      this.getEmployeeData(this.id)
    }
  }
</script>

<style lang="less" scoped>
  .bg-purple {
    color: #999999;
  }

  .el-row {
    margin-bottom: 15px;

    img {
      width: 100px;
      height: 100px;
    }
  }

  .el-tab-pane .el-row:last-child {
    margin-top: 30px;
  }
</style>
