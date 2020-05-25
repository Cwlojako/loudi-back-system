<template>
  <div class="addStaff page">
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="基本信息" name="first">
        <el-form :model="baseInfoForm" :rules="baseInfoRules" ref="baseInfoRef" label-width="110px"
                 label-position="left">
          <el-form-item label="手机号码" prop="phone">
            <el-input v-model="baseInfoForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="登陆密码" prop="password">
            <el-input v-model="baseInfoForm.password"></el-input>
          </el-form-item>
          <el-form-item label="员工姓名" prop="realName">
            <el-input v-model="baseInfoForm.realName"></el-input>
          </el-form-item>
          <el-form-item label="是否负责人" prop="manageable">
            <el-radio-group v-model="baseInfoForm.manageable">
              <el-radio label="是" value="是"></el-radio>
              <el-radio label="否" value="否"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="员工性别" prop="gender">
            <el-radio-group v-model="baseInfoForm.gender">
              <el-radio label="男" value="男"></el-radio>
              <el-radio label="女" value="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="所属部门" prop="dapartment">
            <el-input placeholder="请选择部门"
                      suffix-icon="el-icon-arrow-right"
                      v-model="baseInfoForm.department"
                      @focus="selectDepartment"
                      clearable>
            </el-input>
          </el-form-item>
<!--          待完善-->
          <el-form-item label="职务" prop="duty">
            <el-select v-model="baseInfoForm.duty" placeholder="请选择职务">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-form-item prop="birthday">
              <el-date-picker type="date" placeholder="请选择年月日" v-model="baseInfoForm.birthday"
                              style="width: 100%;">
              </el-date-picker>
            </el-form-item>
          </el-form-item>
          <el-form-item label="培训批次" prop="trainingOrder">
            <el-input v-model="baseInfoForm.trainingOrder"></el-input>
          </el-form-item>
          <el-form-item label="正式入职日期">
            <el-form-item prop="employedAt">
              <el-date-picker type="date" placeholder="请选择年月日" v-model="baseInfoForm.employedAt"
                              style="width: 100%;">
              </el-date-picker>
            </el-form-item>
          </el-form-item>
          <el-form-item label="介绍人" prop="introducer">
            <el-input v-model="baseInfoForm.introducer"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="comment">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入内容"
              v-model="baseInfoForm.comment"
              resize="none">
            </el-input>
          </el-form-item>
        </el-form>
        <div class="submit">
          <el-button type="success" @click="handleSaveBase">提交</el-button>
          <el-button type="success" @click="goBack">返回上一页</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="详细信息" name="second">
        <el-form :model="detailInfoForm" :rules="detailInfoRules" ref="detailInfoRef" label-width="120px"
                 label-position="left">
          <el-form-item label="填表日期">
            <el-form-item prop="writeFormDate">
              <el-date-picker type="date" placeholder="请选择年月日" v-model="detailInfoForm.writeFormDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-form-item>
          <el-form-item label="学历" prop="education">
            <el-select v-model="detailInfoForm.education" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="兴趣爱好" prop="interest">
            <el-input v-model="detailInfoForm.name"></el-input>
          </el-form-item>
          <el-form-item label="婚姻状况" prop="marryStatus">
            <el-select v-model="detailInfoForm.marryStatus" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="子女情况" prop="childrenStatus">
            <el-input v-model="detailInfoForm.childrenStatus"></el-input>
          </el-form-item>
          <el-form-item label="培训开始日期">
            <el-form-item prop="trainBeginDate">
              <el-date-picker type="date" placeholder="请选择年月日" v-model="detailInfoForm.trainBeginDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-form-item>
          <el-form-item label="培训结束日期">
            <el-form-item prop="trainEndDate">
              <el-date-picker type="date" placeholder="请选择年月日" v-model="detailInfoForm.trainEndDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-form-item>
          <el-form-item label="实习开始日期">
            <el-form-item prop="internBeginDate">
              <el-date-picker type="date" placeholder="请选择年月日" v-model="detailInfoForm.internBeginDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-form-item>
          <el-form-item label="实习结束日期">
            <el-form-item prop="internEndDate">
              <el-date-picker type="date" placeholder="请选择年月日" v-model="detailInfoForm.internEndDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-form-item>
          <el-form-item label="合同签订日期">
            <el-form-item prop="contractDate">
              <el-date-picker type="date" placeholder="请选择年月日" v-model="detailInfoForm.contractDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-form-item>
          <el-form-item label="入伙日期">
            <el-form-item prop="joinDate">
              <el-date-picker type="date" placeholder="请选择年月日" v-model="detailInfoForm.joinDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-form-item>
          <el-form-item label="第一联系人" prop="firstLinkman">
            <el-input v-model="detailInfoForm.firstLinkman"></el-input>
          </el-form-item>
          <el-form-item label="第一联系人电话" prop="firstLinkmanPhone">
            <el-input v-model="detailInfoForm.firstLinkmanPhone"></el-input>
          </el-form-item>
          <el-form-item label="第二联系人" prop="secondLinkman">
            <el-input v-model="detailInfoForm.secondLinkman"></el-input>
          </el-form-item>
          <el-form-item label="第二联系人电话" prop="secondLinkmanPhone">
            <el-input v-model="detailInfoForm.secondLinkmanPhone"></el-input>
          </el-form-item>
          <el-form-item label="现住址" prop="nowAddress">
            <el-input v-model="detailInfoForm.nowAddress"></el-input>
          </el-form-item>
          <el-form-item label="家庭详细住址" prop="familyDetailAddress">
            <el-input v-model="detailInfoForm.familyDetailAddress" class="detailAddress"></el-input>
          </el-form-item>
        </el-form>
        <div class="submit">
          <el-button type="success">提交</el-button>
          <el-button type="success" @click="goBack">返回上一页</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!--    选择部门对话框-->
    <el-dialog
      title="选择部门"
      :visible.sync="selectDepartShow"
      width="40%"
    >
      <!--      选择部门树形组件-->
      <el-tree
        :data="departmentData"
        node-key="id"
        show-checkbox
        default-expand-all
        ref="tree"
        @node-click="handleNodeClick"
        :expand-on-click-node="false"
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
       <el-button @click="selectDepartShow = false">取 消</el-button>
       <el-button type="primary" @click="handleSelectDepartment(checkedLabel)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Emitter from '@/framework/mixins/emitter'

  export default {
    mixins: [Emitter],
    data() {
      return {
        // 当前激活项
        activeName: 'first',
        // 基本信息表单数据
        baseInfoForm: {
          phone: '',
          password: '',
          realName: '',
          manageable: '',
          gender: '',
          department: '',
          duty: '',
          birthday: '',
          trainingOrder: '',
          employedAt: '',
          introducer: '',
          comment:''
        },
        // 基本信息表单验证规则
        baseInfoRules: {
          phone: [{required: true, message: "手机号不能为空", trigger: "blur"}],
          password: [{required: true, message: "密码不能为空", trigger: "blur"}],
          realName: [{required: true, message: "员工姓名不能为空", trigger: "blur"}],
          manageable: [{required: true, message: "请选择", trigger: "blur"}],
          gender: [{required: true, message: "请选择", trigger: "blur"}],
          department: [{required: true, message: "请选择所属部门", trigger: "blur"}],
          duty: [{required: true, message: "请选择当前职务", trigger: "blur"}],
          birthday: [{required: true, message: "请选择出生日期", trigger: "blur"}],
          employedAt: [{required: true, message: "请选择入职日期", trigger: "blur"}]
        },
        // 控制选择部门对话框的显示与隐藏
        selectDepartShow: false,
        // 可选择部门数据
        departmentData: [{
          id: 1,
          label: '总部',
          children: [{
            id: 4,
            label: '培训部'
          }, {
            id: 9,
            label: '营销部'
          }, {
            id: 6,
            label: '后勤部'
          }, {
            id: 3,
            label: '人事部'
          }, {
            id: 7,
            label: '市场部',
            children: [{
              id: 13,
              label: '湖南/湖北'
            }, {
              id: 14,
              label: '广西/海南'
            }, {
              id: 26,
              label: '福建/广东'
            }]
          }]
        }],
        // 可选择部门节点ID
        checkedId: '',
        // 可选择部门文本内容
        checkedLabel: '',
        // 详细信息表单数据
        detailInfoForm: {
          writeFormDate:'',
          education:'',
          interest:'',
          marryStatus:'',
          childrenStatus:'',
          trainBeginDate:'',
          trainEndDate:'',
          internBeginDate:'',
          internEndDate:'',
          contractDate:'',
          joinDate:'',
          nowAddress:'',
          familyDetailAddress:'',
          firstLinkman:'',
          firstLinkmanPhone:'',
          secondLinkman:'',
          secondLinkmanPhone:''
        },
        // 详细信息表单验证规则
        detailInfoRules: {
          writeFormDate:'',
          education:'',
          interest:'',
          marryStatus:'',
          childrenStatus:'',
          trainBeginDate:'',
          trainEndDate:'',
          internBeginDate:'',
          internEndDate:'',
          contractDate:'',
          joinDate:'',
          nowAddress:'',
          familyDetailAddress:'',
          firstLinkman:'',
          firstLinkmanPhone:'',
          secondLinkman:'',
          secondLinkmanPhone:''
        }
      }
    },
    methods: {
      // 返回上一页
      goBack() {
        this.$router.go('-1');
      },
      // 选择部门
      selectDepartment() {
        this.selectDepartShow = true;
      },
      // 节点被点击时的回调
      handleNodeClick(item, node, self) { //自己定义的editCheckId，防止单选出现混乱
        this.checkedLabel = item.label
        this.checkedId = item.id;
        this.$refs.tree.setCheckedKeys([item.id])
      },
      // 确定选中部门
      handleSelectDepartment(checkedLabel) {
        this.selectDepartShow = false
        this.baseInfoForm.department = checkedLabel
      },
      // 提交员工基本信息
      handleSaveBase() {
        
      }
    }
  }
</script>

<style lang="less" scoped>
  .page {
    overflow-y: auto;
    overflow-x: hidden;
  }
  .addStaff {
    .el-input--prefix /deep/ .el-input__inner {
      width: 200px;
    }

    .selectDepart {
      line-height: 30px;
      height: 30px;
      width: 200px;
      border-radius: 4px;
      border: 1px solid #DCDFE6;

      .el-icon-arrow-right {
        margin-left: 175px;
      }
    }

    .submit {
      margin-top: 30px;
    }


    .detailAddress {
      width: 300px;
    }

    .el-textarea {
      width: 200px;
    }
  }
</style>
