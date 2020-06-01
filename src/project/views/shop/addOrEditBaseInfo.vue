<template>
  <div class="page">
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane name="0" label="基本信息">
        <el-form :model="baseInfoData" :rules="baseInfoRule" ref="baseInfoRef" label-width="100px" class="demo-ruleForm">
          <el-form-item label="所属部门" prop="name" required>
            <div class="showDialog"  @click="showBelongDepartment">
              请选择所属部门
              <i class="el-icon-arrow-right"></i>
            </div>
          </el-form-item>
          <el-form-item label="所属老师" prop="name" required>
            <div class="showDialog" @click="showBelongTeacher">
              请选择所属老师
              <i class="el-icon-arrow-right"></i>
            </div>
          </el-form-item>
          <el-form-item label="详细地址" prop="name" required>
            <div class="showDialog"  @click="showDetailAddress">
              请选择详细地址
              <i class="el-icon-arrow-right"></i>
            </div>
          </el-form-item>
          <el-form-item label="营业时间" required>
            <el-form-item prop="date1">
              <el-date-picker type="date" placeholder="选择日期" v-model="baseInfoData.date1" style="width:200px;"></el-date-picker>
            </el-form-item>
          </el-form-item>
          <el-form-item label="跑店人员" prop="name" required>
            <div class="showDialog" @click="showRunningPerson">
              请选择跑店人员
              <i class="el-icon-arrow-right"></i>
            </div>
          </el-form-item>
          <el-form-item label="结款方式" prop="region" required>
            <el-select v-model="baseInfoData.region" placeholder="请选择结款方式">
              <el-option label="现结" value="shanghai"></el-option>
              <el-option label="月结" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分成比例" prop="name" required>
            <el-input v-model="baseInfoData.name"></el-input>
          </el-form-item>
          <el-form-item label="老板名称" prop="name" required>
            <el-input v-model="baseInfoData.name"></el-input>
          </el-form-item>
          <el-form-item label="老板电话" prop="name" required>
            <el-input v-model="baseInfoData.name"></el-input>
          </el-form-item>
        </el-form>
        <div class="footer">
          <el-button style="background: rgb(0, 161, 108);border: none" type="primary">提交
          </el-button>
          <el-button style="background: rgb(0, 161, 108);border: none" type="primary" @click="goBack">返回上一页
          </el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane name="1" label="详细信息">
        <el-form :model="detailInfoData" :rules="detailInfoRule" ref="detailInfoRef" label-width="100px" class="demo-ruleForm" label-position="left">
          <el-form-item label="来源" prop="region" required>
            <el-select v-model="detailInfoData.region" placeholder="请选择来源">
              <el-option label="跑店" value="shanghai"></el-option>
              <el-option label="主动联系" value="beijing"></el-option>
              <el-option label="介绍" value="shanghai"></el-option>
              <el-option label="其他" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="合作状态" prop="region" required>
            <el-select v-model="detailInfoData.region" placeholder="请选择合作状态">
              <el-option label="已合作" value="shanghai"></el-option>
              <el-option label="已洽谈无意向" value="beijing"></el-option>
              <el-option label="微信沟通尚未洽谈" value="shanghai"></el-option>
              <el-option label="已洽谈有意向" value="beijing"></el-option>
              <el-option label="其他" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目负责人" prop="name" required>
            <el-input v-model="detailInfoData.name"></el-input>
          </el-form-item>
          <el-form-item label="负责人电话" prop="name" required>
            <el-input v-model="detailInfoData.name"></el-input>
          </el-form-item>
          <el-form-item label="店家分类" prop="region" required>
            <el-select v-model="detailInfoData.region" placeholder="请选择店家分类">
              <el-option label="美容美发" value="shanghai"></el-option>
              <el-option label="养生" value="beijing"></el-option>
              <el-option label="其他" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="店家质量" prop="region" required>
            <el-select v-model="detailInfoData.region" placeholder="请选择店家质量">
              <el-option label="高端质量" value="shanghai"></el-option>
              <el-option label="很好" value="beijing"></el-option>
              <el-option label="好" value="beijing"></el-option>
              <el-option label="一般" value="beijing"></el-option>
              <el-option label="差" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="店内面积" prop="name" required>
            <el-input v-model="detailInfoData.name"></el-input>
          </el-form-item>
          <el-form-item label="经营年限" prop="name" required>
            <el-input v-model="detailInfoData.name"></el-input>
          </el-form-item>
          <el-form-item label="美容师人数" prop="name" required>
            <el-input v-model="detailInfoData.name"></el-input>
          </el-form-item>
          <el-form-item label="店内会员数" prop="name" required>
            <el-input v-model="detailInfoData.name"></el-input>
          </el-form-item>
          <el-form-item label="店家配合度" prop="name" required>
            <el-input v-model="detailInfoData.name"></el-input>
          </el-form-item>
          <el-form-item label="店内基本项目" prop="name" required>
            <el-input
              type="textarea"
              :rows="6"
              placeholder="请输入内容"
              v-model="detailInfoData.textarea"
              resize="none"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="店内环境" prop="name" required>
            <el-input
              type="textarea"
              :rows="6"
              placeholder="请输入内容"
              v-model="detailInfoData.textarea"
              resize="none"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="店内介绍" prop="name" required>
            <el-input
              type="textarea"
              :rows="6"
              placeholder="请输入内容"
              v-model="detailInfoData.textarea"
              resize="none"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="备注" prop="name" required>
            <el-input
              type="textarea"
              :rows="6"
              placeholder="请输入内容"
              v-model="detailInfoData.textarea"
              resize="none"
            >
            </el-input>
          </el-form-item>
        </el-form>
        <div class="footer">
          <div class="footer">
            <el-button style="background: rgb(0, 161, 108);border: none" type="primary">提交
            </el-button>
            <el-button style="background: rgb(0, 161, 108);border: none" type="primary" @click="goBack">返回上一页
            </el-button>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!--  所属部门对话框  -->
    <el-dialog
      title="所属部门"
      :visible.sync="belongDepartmentShow"
      width="50%"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="belongDepartmentShow = false">取 消</el-button>
        <el-button type="primary" @click="belongDepartmentShow = false">确 定</el-button>
      </span>
    </el-dialog>

    <!--  所属老师对话框  -->
    <el-dialog
      title="所属老师"
      :visible.sync="belongTeacherShow"
      width="50%"
     >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="belongTeacherShow = false">取 消</el-button>
        <el-button type="primary" @click="belongTeacherShow = false">确 定</el-button>
      </span>
    </el-dialog>

    <!--  详细地址对话框  -->
    <el-dialog
      title="详细地址"
      :visible.sync="detailAddressShow"
      width="50%"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailAddressShow = false">取 消</el-button>
        <el-button type="primary" @click="detailAddressShow = false">确 定</el-button>
      </span>
    </el-dialog>

    <!--  跑店人员对话框  -->
    <el-dialog
      title="跑店人员"
      :visible.sync="runningPersonShow"
      width="50%"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="runningPersonShow = false">取 消</el-button>
        <el-button type="primary" @click="runningPersonShow = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeName:"0",
        // 控制跑店人员对话框的显示与隐藏
        runningPersonShow:false,
        // 控制详细地址对话框的显示与隐藏
        detailAddressShow:false,
        // 控制所属部门对话框的显示与隐藏
        belongDepartmentShow:false,
        // 控制所属老师对话框的显示与隐藏
        belongTeacherShow:false,
        // 基本信息表单数据对象
        baseInfoData:{},
        // 基本信息表单验证规则
        baseInfoRule:{},
        // 详细信息表单数据对象
        detailInfoData:{},
        // 详细信息表单验证规则
        detailInfoRule:{}
      }
    },
    methods:{
      // 返回上一页
      goBack() {
        this.$router.go(-1);
      },
      // 显示所属老师对话框
      showBelongTeacher() {
        this.belongTeacherShow = true;
      },
      // 显示所属部门对话框
      showBelongDepartment() {
        this.belongDepartmentShow = true;
      },
      // 显示详细地址对话框
      showDetailAddress() {
        this.detailAddressShow = true;
      },
      // 显示跑店人员对话框
      showRunningPerson() {
        this.runningPersonShow = true;
      }
    },
    mounted() {
      this.activeName = this.$route.query.activeName;
    }
  }
</script>

<style lang="less" scoped>
  .el-tabs {
    margin-left: 20px;
  }

  .showDialog {
    position: relative;
    width: 200px;
    height: 30px;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    line-height: 30px;
    color: #999999;
    text-indent: 8px;
    font-size: 12px;
    .el-icon-arrow-right {
      /*margin-left: 175px;*/
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .el-textarea /deep/ .el-textarea__inner {
    width:400px;
  }

  .footer {
    margin-top: 30px;
  }
</style>
