<template>
  <div class="box">
    <el-card class="box-card">
      <p>基本信息</p>
      <el-form :model="equipmentForm" :rules="equipmentRules" ref="equipmentRef" label-width="100px" class="demo-ruleForm" label-position="left">
        <el-form-item label="MAC地址" prop="macAddress">
          <el-input v-model="equipmentForm.macAddress"></el-input>
        </el-form-item>
        <el-form-item label="IP地址" prop="iPAddress">
          <el-input v-model="equipmentForm.iPAddress"></el-input>
        </el-form-item>
        <el-form-item label="设备区号" prop="zipCode">
          <el-input v-model="equipmentForm.zipCode"></el-input>
        </el-form-item>
        <el-form-item label="所属部门" prop="department">
          <el-input placeholder="请选择部门"
                    suffix-icon="el-icon-arrow-right"
                    v-model="equipmentForm.department.name"
                    @focus="selectDepartment(defaultId)"
                    clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="出厂时间" prop="shipAt">
          <el-date-picker type="date"
                          placeholder="选择日期"
                          v-model="equipmentForm.shipAt"
                          style="width: 200px;"
                          value-format="yyyy-MM-dd"
                          format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="机型" prop="deviceModel">
          <el-select v-model="equipmentForm.deviceModel.name" placeholder="请选择机型">
            <el-option label="脱毛机" value="脱毛机"></el-option>
            <el-option label="减肥机" value="减肥机"></el-option>
            <el-option label="气泡机" value="气泡机"></el-option>
            <el-option label="护理仪" value="护理仪"></el-option>
            <el-option label="保养仪" value="保养仪"></el-option>
            <el-option label="美甲仪" value="美甲仪"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="footer">
        <el-button style="background: rgb(0, 161, 108);border: none" type="primary" @click="handleConfirm">提交
        </el-button>
        <el-button style="background: rgb(0, 161, 108);border: none" type="primary" @click="goBack">返回上一页
        </el-button>
      </div>
    </el-card>

    <!--  选择部门对话框  -->
    <el-dialog
      title="选择部门"
      :visible.sync="selectDepartmentShow"
      width="30%"
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
        <el-button @click="selectDepartmentShow = false">取 消</el-button>
        <el-button type="primary" @click="handleSelectDepartment(checkedLabel)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {findFather, findNext} from '@/project/service/department'
  import {getById, update} from '@/project/service/device'
  export default {
    data() {
      return {
        // 部门树结构配置项
        props: {
          label: 'name',
          children: 'children',
          isLeaf: 'leaf',
          id: 'id'
        },
        // 表单数据对象
        equipmentForm:{
          macAddress: '',
          iPAddress: '',
          zipCode: '',
          department: '',
          shipAt: '',
          deviceModel: ''
        },
        equipmentRules:{
          macAddress: [{required: true, message: '请填写MAC地址', trigger: 'blur'}],
          iPAddress: [{required: true, message: '请填写IP地址', trigger: 'blur'}],
          zipCode: [{required: true, message: '请填写设备区号', trigger: 'blur'}],
          department: [{required: true, message: '请选择所属部门', trigger: 'blur'}],
          shipAt: [{required: true, message: '请选择出厂日期', trigger: 'blur'}],
          deviceModel: [{required: true, message: '请选择机型', trigger: 'blur'}]
        },
        editId: 0,
        selectDepartmentShow:false,
        // 可选择部门文本内容
        checkedLabel: '',
        // 部门id
        defaultId: 0
      }
    },
    methods:{
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
        console.log(item)
        this.checkedLabel = item
        this.defaultId = item.id;
        this.$refs.tree.setCheckedKeys([this.defaultId])
      },
      // 选择部门
      selectDepartment(defaultId) {
        this.selectDepartmentShow = true;
        this.$nextTick(() => {
          // 打开弹框默认选中的部门
          this.$refs.tree.setCheckedKeys([defaultId])
        })
      },
      // 确定选中部门
      handleSelectDepartment(checkedLabel) {
        this.selectDepartmentShow = false
        this.equipmentForm.department = checkedLabel
      },
      // 确认提交
      handleConfirm() {
        this.$refs.equipmentRef.validate(valid => {
          if (!valid) return false
          this.equipmentParam = this.equipmentForm
          if (!this.editId) {
            // 添加设备
            console.log('新建')
            save({device: this.equipmentParam}, res => {
              this.$refs.baseInfoRef.resetFields()
              this.$message({
                type: 'success',
                message: '添加设备成功'
              });
            })
          } else {
            // 更新设备信息
            console.log('更新')
            update({device: this.equipmentParam}, res => {
              this.selectAddOrEdit()
              this.$message({
                type: 'success',
                message: '更新设备成功!'
              });
            })
          }
        })
      },
      goBack() {
        this.$router.go(-1);
      },
      // 进入的是编辑模式还是新建模式
      selectAddOrEdit() {
        if (!this.editId) {
          console.log('新建模式')
        } else {
          console.log('编辑模式')
          // 否则则是进入编辑页面,根据id获取设备信息
          getById({id: this.editId}, res => {
            this.equipmentForm = res
            this.defaultId = res.department.id
          })
        }
      }
    },
    mounted() {
      this.editId = parseInt(this.$route.params.id)
      this.selectAddOrEdit()
    }
  }
</script>

<style lang="less" scoped>
    .box {
      padding-left: 30px;
      padding-top: 30px;
      box-sizing: border-box;
      .box-card {
        p {
          font-weight: bold;
          margin-bottom: 20px;
        }
        .footer {
          margin-top: 30px;
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
      }
    }
</style>
