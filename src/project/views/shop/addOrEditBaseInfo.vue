<template>
  <div class="page">
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane name="0" label="基本信息">
        <el-form :model="baseInfoData" :rules="baseInfoRule" ref="baseInfoRef" label-width="100px" class="demo-ruleForm">
          <el-form-item label="所属部门" prop="department">
            <el-input placeholder="请选择部门"
                      suffix-icon="el-icon-arrow-right"
                      v-model="baseInfoData.department.name"
                      @focus="showBelongDepartment(defaultId)">
            </el-input>
          </el-form-item>
          <el-form-item label="所属老师" prop="teacher">
            <el-input placeholder="请选择所属老师"
                      suffix-icon="el-icon-arrow-right"
                      v-model="baseInfoData.teacher.realName"
                      @focus="showBelongTeacher()">
            </el-input>
          </el-form-item>
          <el-form-item label="详细地址" prop="address">
<!--            待完善-->
            <el-input v-model="baseInfoData.address" placeholder="请填写详细地址"></el-input>
          </el-form-item>
          <el-form-item label="营业时间" prop="businessHours">
            <el-select v-model="baseInfoData.businessHours" placeholder="请选择营业时间">
              <el-option label="早上八点到晚上九点" value="早上八点到晚上九点"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="跑店人员" prop="founder">
            <el-input placeholder="请选择跑店人员"
                      suffix-icon="el-icon-arrow-right"
                      v-model="baseInfoData.founder.realName"
                      @focus="showRunningPerson()">
            </el-input>
          </el-form-item>
          <el-form-item label="结款方式" prop="settlementPeriod">
            <el-select v-model="baseInfoData.settlementPeriod" placeholder="请选择结款方式">
              <el-option label="现结" value="现结"></el-option>
              <el-option label="月结" value="月结"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分成比例" prop="commissionRate">
            <el-input v-model="baseInfoData.commissionRate" placeholder="请选择店家分成比例，单位为%"></el-input>
          </el-form-item>
          <el-form-item label="老板名称" prop="bossName">
            <el-input v-model="baseInfoData.bossName"></el-input>
          </el-form-item>
          <el-form-item label="老板电话" prop="bossPhone">
            <el-input v-model="baseInfoData.bossPhone"></el-input>
          </el-form-item>
        </el-form>
        <div class="footer">
          <el-button style="background: rgb(0, 161, 108);border: none" type="primary" @click="handleSaveBase">提交
          </el-button>
          <el-button style="background: rgb(0, 161, 108);border: none" type="primary" @click="goBack">返回上一页
          </el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane name="1" label="详细信息">
        <el-form :model="detailInfoData" :rules="detailInfoRule" ref="detailInfoRef" label-width="100px" class="demo-ruleForm" label-position="left">
          <el-form-item label="来源" prop="region">
            <el-select v-model="detailInfoData.sourceChannel" placeholder="请选择来源">
              <el-option label="跑店" value="跑店"></el-option>
              <el-option label="主动联系" value="主动联系"></el-option>
              <el-option label="介绍" value="介绍"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="合作状态" prop="cooperationStatus">
            <el-select v-model="detailInfoData.cooperationStatus" placeholder="请选择合作状态">
              <el-option label="已合作" value="已合作"></el-option>
              <el-option label="已洽谈无意向" value="已洽谈无意向"></el-option>
              <el-option label="微信沟通尚未洽谈" value="微信沟通尚未洽谈"></el-option>
              <el-option label="已洽谈有意向" value="已洽谈有意向"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目负责人" prop="projectLeader">
            <el-input v-model="detailInfoData.projectLeader"></el-input>
          </el-form-item>
          <el-form-item label="负责人电话" prop="projectLeaderPhone">
            <el-input v-model="detailInfoData.projectLeaderPhone"></el-input>
          </el-form-item>
          <el-form-item label="店家分类" prop="category">
            <el-select v-model="detailInfoData.category" placeholder="请选择店家分类">
              <el-option label="美容美发" value="美容美发"></el-option>
              <el-option label="养生" value="养生"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="店家质量" prop="quality">
            <el-select v-model="detailInfoData.quality" placeholder="请选择店家质量">
              <el-option label="高端质量" value="高端质量"></el-option>
              <el-option label="很好" value="很好"></el-option>
              <el-option label="好" value="好"></el-option>
              <el-option label="一般" value="一般"></el-option>
              <el-option label="差" value="差"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="店内面积" prop="area">
            <el-input v-model="detailInfoData.area"></el-input>&nbsp;m²
          </el-form-item>
          <el-form-item label="经营年限" prop="licenseExpireAt">
            <el-input v-model="detailInfoData.licenseExpireAt"></el-input>&nbsp;年
          </el-form-item>
          <el-form-item label="美容师人数" prop="beauticianQuantity">
            <el-input v-model="detailInfoData.beauticianQuantity"></el-input>
          </el-form-item>
          <el-form-item label="店内会员数" prop="memberQuantity">
            <el-input v-model="detailInfoData.memberQuantity"></el-input>
          </el-form-item>
          <el-form-item label="店家配合度" prop="cooperationDegree">
            <el-input v-model="detailInfoData.cooperationDegree"></el-input>
          </el-form-item>
          <el-form-item label="店内基本项目" prop="serviceContent">
            <el-input
              type="textarea"
              :rows="6"
              placeholder="请输入内容"
              v-model="detailInfoData.serviceContent"
              resize="none"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="店内环境" prop="	serviceEnvironment">
            <el-input
              type="textarea"
              :rows="6"
              placeholder="请输入内容"
              v-model="detailInfoData.serviceEnvironment"
              resize="none"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="店内介绍" prop="description">
            <el-input
              type="textarea"
              :rows="6"
              placeholder="请输入内容"
              v-model="detailInfoData.description"
              resize="none"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="备注" prop="comment">
            <el-input
              type="textarea"
              :rows="6"
              placeholder="请输入内容"
              v-model="detailInfoData.comment"
              resize="none"
            >
            </el-input>
          </el-form-item>
        </el-form>
        <div class="footer">
          <div class="footer">
            <el-button style="background: rgb(0, 161, 108);border: none" type="primary" @click="handleSaveDetail">提交
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
        <el-button @click="belongDepartmentShow = false">取 消</el-button>
        <el-button type="primary" @click="handleSelectDepartment(checkedLabel)">确 定</el-button>
      </span>
    </el-dialog>

    <!--  所属老师和跑店人员对话框  -->
    <el-dialog
      :title="isTeacher ? '所属老师' : '跑店人员'"
      :visible.sync="TeacherFounderShow"
      width="50%"
     >
      <search
        style="width: 95%;margin: 10px auto"
        :search-items="searchItems"
        @on-search="searchBySearchItem"
      ></search>
      <el-table
        :data="employeeData"
        style="width: 95%;margin:0 auto;"
        highlight-current-row
        @current-change="handlerCurrentChange"
        ref="singleTable"
      >
        <el-table-column prop="number" label="员工编号"></el-table-column>
        <el-table-column prop="realName" label="姓名"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="department.name" label="部门"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSelect(currentRow)">确 定</el-button>
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
  </div>
</template>

<script>
  import {findFather, findNext} from '@/project/service/department'
  import {getById, update, save} from '@/project/service/salon'
  import {find} from '@/project/service/employee'
  import Search from "@/framework/components/search"

  export default {
    components: {
      Search
    },
    data() {
      return {
        props: {
          label: 'name',
          children: 'children',
          isLeaf: 'leaf',
          id: 'id'
        },
        searchItems: [
          {
            name: "员工编号",
            key: "number",
            type: "string"
          },
          {
            name: "姓名",
            key: "realName",
            type: "string"
          },
          {
            name: "手机号",
            key: "phone",
            type: "string"
          }
        ],
        activeName:"0",
        // 控制所属老师与跑店人员对话框的显示与隐藏
        TeacherFounderShow:false,
        // 控制详细地址对话框的显示与隐藏
        detailAddressShow:false,
        // 控制所属部门对话框的显示与隐藏
        belongDepartmentShow:false,
        // 基本信息表单数据对象
        baseInfoData:{
          department: {
            name: ''
          },
          teacher: {
            realName: ''
          },
          address: '',
          businessHours: '',
          founder: {
            realName: ''
          },
          settlementPeriod: '',
          commissionRate: '',
          bossName: '',
          bossPhone: ''
        },
        // 基本信息表单验证规则
        baseInfoRule:{
          department: [{required: true, message: '请选择部门'}],
          teacher: [{required: true, message: '请选择老师'}],
          address: [{required: true, message: '请选择详细地址'}],
          businessHours: [{required: true, message: '请选择营业时间'}],
          founder: [{required: true, message: '请选择跑店人员'}],
          settlementPeriod: [{required: true, message: '请选择结款方式'}],
          commissionRate: [{required: true, message: '请填写分成比例'}],
          bossName: [{required: true, message: '请填写老板名称'}],
          bossPhone: [{required: true, message: '请填写老板电话'}]
        },
        // 详细信息表单数据对象
        detailInfoData:{},
        // 详细信息表单验证规则
        detailInfoRule:{},
        extraParam: {},
        // 店铺id
        editId: 0,
        // 默认选中部门id
        defaultId: 0,
        // 可选择部门文本内容
        checkedLabel: {},
        isTeacher: false,
        // 所属老师或跑店人员表格数据
        employeeData: [],
        currentRow: null
      }
    },
    methods:{
      // 返回上一页
      goBack() {
        this.$router.go(-1);
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
      // 节点被选中时的回调
      handleNodeCheck(item, node, self) { //自己定义的editCheckId，防止单选出现混乱
        this.checkedLabel = item
        this.defaultId = item.id;
        this.$refs.tree.setCheckedKeys([this.defaultId])
      },
      // 显示所属部门对话框
      showBelongDepartment(defaultId) {
        this.belongDepartmentShow = true;
        this.$nextTick(() => {
          // 打开弹框默认选中的部门
          this.$refs.tree.setCheckedKeys([defaultId])
        })
      },
      // 确定选中部门
      handleSelectDepartment(checkedLabel) {
        this.belongDepartmentShow = false
        this.baseInfoData.department = checkedLabel
      },
      // 显示所属老师对话框
      showBelongTeacher() {
        this.isTeacher = true
        this.TeacherFounderShow = true
        // 默认选中
        this.defaultSelect()
      },
      // 显示跑店人员对话框
      showRunningPerson() {
        this.isTeacher = false
        this.TeacherFounderShow = true
        // 默认选中
        this.defaultSelect()
      },
      // 关闭所属老师跑店人员对话框
      handleClose() {
        this.TeacherFounderShow = false
      },
      // 显示详细地址对话框
      showDetailAddress() {
        this.detailAddressShow = true;
      },
      // 所属老师与跑店人员顶部额外搜索条件
      searchBySearchItem(searchItems) {
        let keys = [];
        for (
          let i = 0,
            searchItemList = this.searchItems,
            len = searchItemList.length;
          i < len;
          i++
        ) {
          keys.push(searchItemList[i].key);
        }
        for (let i in keys) {
          if (searchItems[keys[i]]) {
            this.extraParam[keys[i]] = searchItems[keys[i]];
          } else {
            delete this.extraParam[keys[i]];
          }
        }
        this.getEmployeeData();
      },
      // 获取所属老师数据
      getEmployeeData() {
        let param = {
          employee: this.extraParam,
          isLoginedToday: false
        }
        find(param, res => {
          this.employeeData = res
        })
      },
      // 控制所属老师表格行是否选中
      handlerCurrentChange(val) {
        this.currentRow = val
      },
      // 打开所属老师或跑店人员弹框默认选中行
      defaultSelect() {
        this.$nextTick(() => {
          // 获取所属老师id
          let teacherId = this.baseInfoData.teacher.id
          // 获取跑店人员id
          let founderId = this.baseInfoData.founder.id
          if (this.isTeacher) {
            let index = 0
            this.employeeData.forEach((item, i) => {
              if (item.id === teacherId) {
                index = i
              }
            })
            this.$refs.singleTable.setCurrentRow(this.employeeData[index])
          } else {
            let index = 0
            this.employeeData.forEach((item, i) => {
              if (item.id === founderId) {
                index = i
              }
            })
            this.$refs.singleTable.setCurrentRow(this.employeeData[index])
          }

        })
      },
      // 控制确认选中所属老师或跑店人员后
      handleSelect(currentRow) {
        this.TeacherFounderShow = false
        if (this.isTeacher) {
          this.baseInfoData.teacher = currentRow
        } else {
          this.baseInfoData.founder = currentRow
        }
      },
      // 新增编辑店铺基本信息
      handleSaveBase() {
        this.$refs.baseInfoRef.validate(valid => {
          if (!valid) return false
          if (!this.editId) {
            // 添加店铺基本信息
            console.log('新建')
            save({salon: this.baseInfoData}, res => {
              this.$refs.baseInfoRef.resetFields()
              // 跳转到店铺列表主页
              this.$router.push({path: `/shop/list`})
              this.$message({
                type: 'success',
                message: '添加店铺基本信息成功'
              });
            })
          } else {
            // 更新店铺基本信息
            console.log('更新')
            let param = this.baseInfoData
            update({salon: param}, res => {
              this.selectAddOrEdit()
              this.$message({
                type: 'success',
                message: '更新店铺基本信息成功!'
              });
            })
          }
        })
      },
      // 新增编辑店铺详细信息
      handleSaveDetail() {
        this.$refs.detailInfoRef.validate(valid => {
          if (!valid) return false
          if (!this.editId) {
            // 添加店铺详细信息
            console.log('新建')
            let param = this.baseInfoData
            save({salon: param}, res => {
              this.$refs.baseInfoRef.resetFields()
              // 跳转到店铺列表主页
              this.$router.push({path: `/shop/list`})
              this.$message({
                type: 'success',
                message: '添加店铺详细信息成功'
              });
            })
          } else {
            // 更新店铺详细信息
            console.log('更新')
            let param = this.baseInfoData
            update({salon: param}, res => {
              this.selectAddOrEdit()
              this.$message({
                type: 'success',
                message: '更新店铺详细信息成功!'
              });
            })
          }
        })
      },
      // 进入的是编辑店铺模式还是新建店铺模式
      selectAddOrEdit() {
        if (!this.editId) {
          console.log('新建模式')
        } else {
          console.log('编辑模式')
          // 否则则是进入编辑员工页面,根据id获取员工信息
          getById({id: this.editId}, res => {
            this.baseInfoData = Object.assign(this.baseInfoData, res)
            console.log(this.baseInfoData)
            this.detailInfoData = res
            this.defaultId = res.department.id
          })
        }
      }
    },
    mounted() {
      this.activeName = this.$route.query.activeName;
      // 获取店铺id
      this.editId = this.$route.params.id
      this.selectAddOrEdit()
      this.getEmployeeData()
    }
  }
</script>

<style lang="less" scoped>
  .page {
    overflow-y: auto;
    overflow-x: hidden;
  }
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
