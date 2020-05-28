<template>
  <div>
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple">填表日期</div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-light">2018-10-12</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple">学历</div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-light">本科</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple">兴趣爱好</div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-light">篮球</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple">婚姻情况</div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-light">已婚</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple">子女情况</div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-light">一儿一女</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple">培训开始时间</div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-light">2019-4-12</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple">培训结束时间</div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-light">2019-6-16</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple">实习开始时间</div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-light">2019-7-18</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple">实习结束时间</div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-light">2019-8-23</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple">入伙日期</div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-light">2019-9-5</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple">现住址</div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-light">广东省广州市</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple">家庭详细住址</div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-light">广东省广州市天河区乐天大厦101</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple">第一联系人</div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-light">紫大鲸</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple">第一联系人电话</div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-light">13973945758</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple">第二联系人</div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-light">紫天鲸</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple">第二联系人电话</div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-light">13564575986</div>
      </el-col>
    </el-row>
    <div class="remark">
      <p>备注信息</p>
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">备注</div>
        </el-col>
        <el-col :span="20">
          <div class="grid-content bg-purple-light">无<i class="el-icon-edit" @click="editRemark"></i></div>
        </el-col>
      </el-row>
    </div>
    <el-row>
      <el-button type="success" @click="goEditStaffPage">编辑</el-button>
      <el-button type="success">禁用</el-button>
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
    <el-button type="primary" @click="editRemarkShow = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
      data() {
        return {
          // 控制编辑备注信息对话框的显示与隐藏
          editRemarkShow: false,
          // 备注文本
          remarkText: ''
        }
      },
      methods:{
        // 前往编辑员工详细信息页面
        goEditStaffPage() {
          this.$router.push({path: '/staff/addStaff', query: {activeName: 'second'}});
        },
        // 修改备注信息
        editRemark() {
          this.editRemarkShow = true;
        },
        // 返回上一页
        goBack() {
          this.$router.go('-1');
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
