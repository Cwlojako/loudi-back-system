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
          <el-form-item label="头像" prop="avatar">
            <upload
              v-if="!this.editId"
              @on-transport-file-list="handleTransportFileList"
              :max-size="5120"
              :limit="1">
            </upload>
            <!--        编辑模式下如果有图片会默认显示第一张图-->
            <upload
              v-else
              @on-transport-file-list="handleTransportFileList"
              :file-list="baseInfoForm.avatar ? baseInfoForm.avatar.split(';') : []"
              :max-size="5120"
              :limit="1">
            </upload>
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
          <el-form-item label="所属部门" prop="department">
            <el-input placeholder="请选择部门"
                      suffix-icon="el-icon-arrow-right"
                      v-model="baseInfoForm.department.name"
                      @focus="selectDepartment(defaultId)">
            </el-input>
          </el-form-item>
<!--          待完善-->
          <el-form-item label="职务" prop="duty">
            <el-select v-model="baseInfoForm.duty" placeholder="请选择职务">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出生日期" prop="birthday">
            <el-date-picker type="date"
                            placeholder="请选择年月日"
                            v-model="baseInfoForm.birthday"
                            style="width: 100%;"
                            value-format="yyyy-MM-dd"
                            format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="培训批次" prop="trainingOrder">
            <el-input v-model="baseInfoForm.trainingOrder"></el-input>
          </el-form-item>
          <el-form-item label="正式入职日期" prop="employedAt">
            <el-date-picker type="date"
                            placeholder="请选择年月日"
                            v-model="baseInfoForm.employedAt"
                            style="width: 100%;"
                            value-format="yyyy-MM-dd"
                            format="yyyy-MM-dd">
            </el-date-picker>
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
          <el-form-item label="填表日期" prop="fillAt">
            <el-date-picker type="date"
                            placeholder="请选择年月日"
                            v-model="detailInfoForm.fillAt"
                            style="width: 100%;"
                            value-format="yyyy-MM-dd"
                            format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="学历" prop="education">
            <el-select v-model="detailInfoForm.education" placeholder="请选择学历">
              <el-option v-for="(item, index) in educationOptions"
                        :key='index'
                        :label="item.label"
                        :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="兴趣爱好" prop="interest">
            <el-input v-model="detailInfoForm.interest"></el-input>
          </el-form-item>
          <el-form-item label="婚姻状况" prop="maritalStatus">
            <el-select v-model="detailInfoForm.maritalStatus" placeholder="请选择">
              <el-option v-for="(item, index) in maritalOptions"
                        :key='index'
                        :label="item.label"
                        :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="子女情况" prop="childrenSituation">
            <el-input v-model="detailInfoForm.childrenSituation"></el-input>
          </el-form-item>
          <el-form-item label="培训开始日期" prop="trainingStartAt">
            <el-date-picker type="date"
                            placeholder="请选择年月日"
                            v-model="detailInfoForm.trainingStartAt"
                            style="width: 100%;"
                            value-format="yyyy-MM-dd"
                            format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="培训结束日期" prop="trainingFinishAt">
            <el-date-picker type="date"
                            placeholder="请选择年月日"
                            v-model="detailInfoForm.trainingFinishAt"
                            style="width: 100%;"
                            value-format="yyyy-MM-dd"
                            format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="实习开始日期" prop="practiceStartAt">
            <el-date-picker type="date"
                            placeholder="请选择年月日"
                            v-model="detailInfoForm.practiceStartAt"
                            style="width: 100%;"
                            value-format="yyyy-MM-dd"
                            format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="实习结束日期" prop="practiceFinishAt">
            <el-date-picker type="date"
                            placeholder="请选择年月日"
                            v-model="detailInfoForm.practiceFinishAt"
                            style="width: 100%;"
                            value-format="yyyy-MM-dd"
                            format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="合同签订日期" prop="signAt">
            <el-date-picker type="date"
                            placeholder="请选择年月日"
                            v-model="detailInfoForm.signAt"
                            style="width: 100%;"
                            value-format="yyyy-MM-dd"
                            format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="入伙日期" prop="joinAt">
            <el-date-picker type="date"
                            placeholder="请选择年月日"
                            v-model="detailInfoForm.joinAt"
                            style="width: 100%;"
                            value-format="yyyy-MM-dd"
                            format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="第一联系人" prop="firstContactName">
            <el-input v-model="detailInfoForm.firstContactName"></el-input>
          </el-form-item>
          <el-form-item label="第一联系人电话" prop="firstContactPhone">
            <el-input v-model="detailInfoForm.firstContactPhone"></el-input>
          </el-form-item>
          <el-form-item label="第二联系人" prop="secondContactName">
            <el-input v-model="detailInfoForm.secondContactName"></el-input>
          </el-form-item>
          <el-form-item label="第二联系人电话" prop="secondContactPhone">
            <el-input v-model="detailInfoForm.secondContactPhone"></el-input>
          </el-form-item>
          <el-form-item label="现住址" prop="presentAddress">
            <el-input v-model="detailInfoForm.presentAddress"></el-input>
          </el-form-item>
          <el-form-item label="家庭详细住址" prop="homeAddress">
            <el-input v-model="detailInfoForm.homeAddress"></el-input>
          </el-form-item>
        </el-form>
        <div class="submit">
          <el-button type="success" @click="handleSaveDetail">提交</el-button>
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
        :props="props"
        :load="loadNode"
        lazy
        :expand-on-click-node='false'
        default-expand-all
        node-key="id"
        @check="handleNodeCheck"
        ref="tree"
        show-checkbox
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
  import Upload from "@/framework/components/upload"
  import Emitter from '@/framework/mixins/emitter'
  import {getById, save, update} from '@/project/service/employee'
  import {findFather, findNext} from '@/project/service/department'

  export default {
    components: {
      Upload
    },
    mixins: [Emitter],
    data() {
      return {
        props: {
          label: 'name',
          children: 'children',
          isLeaf: 'leaf',
          id: 'id'
        },
        // 当前激活项
        activeName: 'first',
        // 员工编辑id
        editId: 0,
        // 基本信息表单数据
        baseInfoForm: {
          phone: '',
          password: '',
          realName: '',
          avatar: '',
          manageable: '',
          gender: '',
          department: '',
          duty: '',
          birthday: '',
          trainingOrder: '',
          employedAt: '',
          introducer: '',
          comment:'',
          serviceStatus: '在职',
          enable: true
        },
        // 基本信息表单验证规则
        baseInfoRules: {
          phone: [{required: true, message: "手机号不能为空", trigger: "blur"}],
          password: [{required: true, message: "密码不能为空", trigger: "blur"}],
          realName: [{required: true, message: "员工姓名不能为空", trigger: "blur"}],
          avatar: [{required: true, message: "请上传头像"}],
          manageable: [{required: true, message: "请选择", trigger: "blur"}],
          gender: [{required: true, message: "请选择", trigger: "blur"}],
          department: [{required: true, message: "请选择所属部门"}],
          duty: [{required: true, message: "请选择当前职务", trigger: "blur"}],
          birthday: [{required: true, message: "请选择出生日期", trigger: "blur"}],
          employedAt: [{required: true, message: "请选择入职日期", trigger: "blur"}]
        },
        // 控制选择部门对话框的显示与隐藏
        selectDepartShow: false,
        // 可选择学历
        educationOptions: [
          {label: '小学', value: '小学'},
          {label: '初中', value: '初中'},
          {label: '高中', value: '高中'},
          {label: '中专', value: '中专'},
          {label: '大专', value: '大专'},
          {label: '本科', value: '本科'},
          {label: '研究生', value: '研究生'},
          {label: '硕士', value: '硕士'},
          {label: '博士', value: '博士'},
          {label: '博士后', value: '博士后'},
          {label: '其他', value: '其他'}
        ],
        // 婚姻状况可选项
        maritalOptions: [
          {label: '未婚', value: '未婚'},
          {label: '已婚', value: '已婚'},
          {label: '恋爱中', value: '恋爱中'},
          {label: '单身', value: '单身'},
          {label: '离异', value: '离异'},
          {label: '二婚', value: '二婚'}
        ],
        // 可选择部门节点ID
        checkedId: '',
        // 可选择部门文本内容
        checkedLabel: '',
        // 详细信息表单数据
        detailInfoForm: {},
        // 详细信息表单验证规则
        detailInfoRules: {
          fillAt: [{required: true, message: '请选择', trigger: 'blur'}]
        },
        // 部门id
        defaultId: 0,
        // 基本信息提交参数
        baseInfoParam: {}
      }
    },
    methods: {
      // 返回上一页
      goBack() {
        this.$router.go('-1');
      },
      // 控制树结构的懒加载，点击父部门再加载子部门
      loadNode(node, resolve) {
        if (node.level === 0) {
          findFather(res => {
            return resolve(res)
          })
        }
        if (node.level >= 1) {
          findNext({id: node.data.id}, res => {
            return resolve(res)
          })
        }
      },
      // 选择部门
      selectDepartment(defaultId) {
        this.selectDepartShow = true;
        this.$nextTick(() => {
          // 打开弹框默认选中的部门
          this.$refs.tree.setCheckedKeys([defaultId])
        })
      },
      // 节点被选中时的回调
      handleNodeCheck(item, node, self) { //自己定义的editCheckId，防止单选出现混乱
        console.log(item)
        this.checkedLabel = item
        this.defaultId = item.id;
        this.$refs.tree.setCheckedKeys([this.defaultId])
      },
      // 确定选中部门
      handleSelectDepartment(checkedLabel) {
        console.log(checkedLabel)
        this.selectDepartShow = false
        this.baseInfoForm.department = checkedLabel
      },
      handleTransportFileList(fileList) {
        console.log(fileList)
        this.baseInfoForm.avatar = fileList[0].response.data;
      },
      // 新增编辑员工基本信息
      handleSaveBase() {
        // 通知上传子组件执行相应的操作
        this.broadcast('SiUpload', 'on-form-submit', () => {});
        this.$refs.baseInfoRef.validate(valid => {
          if (!valid) return false
          this.baseInfoParam = this.baseInfoForm
          // 处理是否负责人参数
          if (this.baseInfoForm.manageable === '是') {
            this.baseInfoParam.manageable = true
          } else {
            this.baseInfoParam.manageable = false
          }
          if (!this.editId) {
            // 添加员工基本信息
            console.log('新建')
            save({employee: this.baseInfoParam}, res => {
              this.$refs.baseInfoRef.resetFields()
              // 跳转到员工列表主页
              this.$router.push({path: `/staff/list`})
              this.$message({
                type: 'success',
                message: '添加员工基本信息成功'
              });
            })
          } else {
            // 更新员工基本信息
            console.log('更新')
            let param = Object.assign(this.baseInfoParam, {id: this.editId})
            update({employee: param}, res => {
              this.selectAddOrEdit()
              this.$message({
                type: 'success',
                message: '更新员工基本信息成功!'
              });
            })
          }
        })
      },
      // 提交员工详细信息
      handleSaveDetail() {
        this.$refs.detailInfoRef.validate(valid => {
          if (!valid) return false
          if (!this.editId) {
            // 添加员工详细信息
            console.log('新建')
            save({employee: this.baseInfoParam}, res => {
              this.$refs.detailInfoRef.resetFields()
              // 跳转到员工列表主页
              this.$router.push({path: `/staff/list`})
              this.$message({
                type: 'success',
                message: '添加员工详细信息成功'
              });
            })
          } else {
            // 更新员工详细信息
            console.log('更新')
            let param = Object.assign(this.detailInfoForm, {id: this.editId})
            update({employee: param}, res => {
              this.selectAddOrEdit()
              this.$message({
                type: 'success',
                message: '更新员工详细信息成功!'
              })
            })
          }
        })
      },
      // 进入的是编辑员工模式还是新建员工模式
      selectAddOrEdit() {
        if (!this.editId) {
          console.log('新建模式')
        } else {
          console.log('编辑模式')
          // 否则则是进入编辑员工页面,根据id获取员工信息
          getById({id: this.editId}, res => {
            console.log(res)
            this.baseInfoForm = res
            this.detailInfoForm = res
            this.defaultId = res.department.id
            // 处理是否负责人数据
            this.baseInfoForm.manageable = res.manageable ? '是' : '否'
          })
        }
      }
    },
    mounted() {
      if (this.$route.query.activeName) {
        this.activeName = this.$route.query.activeName
      }
      this.editId = parseInt(this.$route.params.id)
      this.selectAddOrEdit()
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
