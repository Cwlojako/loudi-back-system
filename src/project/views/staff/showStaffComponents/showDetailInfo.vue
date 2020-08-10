<template>
  <div>
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple">填表日期</div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-light">{{employee.fillAt}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple">学历</div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-light">{{employee.education}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple">兴趣爱好</div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-light">{{employee.interest}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple">婚姻情况</div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-light">{{employee.maritalStatus}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple">子女情况</div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-light">{{employee.childrenSituation}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple">培训开始时间</div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-light">{{employee.trainingStartAt}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple">培训结束时间</div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-light">{{employee.trainingFinishAt}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple">实习开始时间</div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-light">{{employee.practiceStartAt}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple">实习结束时间</div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-light">{{employee.practiceFinishAt}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple">入伙日期</div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-light">{{employee.joinAt}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple">现住址</div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-light">{{employee.presentAddress}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple">家庭详细住址</div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-light">{{employee.homeAddress}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple">第一联系人</div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-light">{{employee.firstContactName}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple">第一联系人电话</div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-light">{{employee.firstContactPhone}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple">第二联系人</div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-light">{{employee.secondContactName}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple">第二联系人电话</div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-light">{{employee.secondContactPhone}}</div>
      </el-col>
    </el-row>
    <div class="remark">
      <p>备注信息</p>
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">备注</div>
        </el-col>
        <el-col :span="20">
          <div class="grid-content bg-purple-light">{{employee.comment}}<i class="el-icon-edit" @click="editRemark"></i></div>
        </el-col>
      </el-row>
    </div>
    <el-row>
      <el-button type="success" @click="goEditStaffPage(id)">编辑</el-button>
      <el-button type="success" @click="handleDisable(id)" v-if='employeeData.enabled'>禁用</el-button>
      <el-button type="success" @click="handleEnable(id)" v-else>启用</el-button>
      <el-button type="success" @click="goBack">返回上一页</el-button>
    </el-row>

    <!--     编辑备注信息对话框 -->
    <el-dialog
      title="备注"
      :visible.sync="editRemarkShow"
      width="40%"
    >
      <el-input
        type="textarea"
        :rows="7"
        placeholder="请输入内容"
        v-model="remarkText"
        resize="none">
      </el-input>
      <span slot="footer" class="dialog-footer">
    <el-button @click="editRemarkShow = false">取 消</el-button>
    <el-button type="primary" @click="handle(id)">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
    import {disable, enable, update} from '@/project/service/employee'
    export default {
      props: {
        employeeData: {
          type: Object
        }
      },
      watch: {
        employeeData: {
          handler(val) {
            this.employee = val
          },
          deep: true
        }
      },
      data() {
        return {
          employee: {},
          // 控制编辑备注信息对话框的显示与隐藏
          editRemarkShow: false,
          // 备注文本
          remarkText: '',
          id: 0
        }
      },
      methods:{
        // 前往编辑员工详细信息页面
        goEditStaffPage(id) {
          this.$router.push({path: '/staff/addStaff/' + id, query: {activeName: 'second'}});
        },
        // 修改备注信息
        editRemark() {
          this.editRemarkShow = true;
          this.remarkText = this.employeeData.comment
        },
        // 返回上一页
        goBack() {
          this.$router.go('-1');
        },
        // 更新备注信息
        handle(id) {
          this.employeeData.comment = this.remarkText
          let param = {
            employee: Object.assign({id: id}, this.employeeData)
          }
          update(param, res => {
            // 刷新数据
            this.$emit('refreshData', id)
            this.editRemarkShow = false
            this.$message({
              type: 'success',
              message: '更新备注成功'
            })
          })
        },
        // 禁用员工
        handleDisable(id) {
          disable({id: id}, res => {
            // 刷新数据
            this.$emit('refreshData', id)
            this.$message({
              type: 'success',
              message: '禁用成功'
            })
          })
        },
        // 启用员工
        handleEnable(id) {
          enable({id: id}, res => {
            // 刷新数据
            this.$emit('refreshData', id)
            this.$message({
              type: 'success',
              message: '启用成功'
            })
          })
        }
      },
      created() {
        this.id = parseInt(this.$route.params.id)
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

  .remark {
    margin-top: 50px;

    p {
      font-size: 18px;
      font-weight: bold;
    }

    .el-row {
      margin-top: 10px !important;

      i {
        margin-left: 15px;
      }
    }
  }
</style>
