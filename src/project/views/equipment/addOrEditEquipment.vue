<template>
  <div class="box">
    <el-card class="box-card">
      <p>基本信息</p>
      <el-form :model="equipmentData" :rules="equipmentRules" ref="equipmentRef" label-width="100px" class="demo-ruleForm" label-position="left">
        <el-form-item label="MAC地址" prop="name" required>
          <el-input v-model="equipmentData.name"></el-input>
        </el-form-item>
        <el-form-item label="IP地汇" prop="name" required>
          <el-input v-model="equipmentData.name"></el-input>
        </el-form-item>
        <el-form-item label="设备区号" prop="name" required>
          <el-input v-model="equipmentData.name"></el-input>
        </el-form-item>
        <el-form-item label="所属部门" prop="name" required>
          <div class="showDialog" @click="showSelectDialog">
            请选择所属部门
            <i class="el-icon-arrow-right"></i>
          </div>
        </el-form-item>
        <el-form-item label="出厂时间" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker type="date" placeholder="选择日期" v-model="equipmentData.date1" style="width: 200px;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="机型" prop="region" required>
          <el-select v-model="equipmentData.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="footer">
        <el-button style="background: rgb(0, 161, 108);border: none"  type="primary">提交
        </el-button>
        <el-button style="background: rgb(0, 161, 108);border: none"  type="primary" @click="goBack">返回上一页
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
        :data="departmentData"
        node-key="id"
        show-checkbox
        default-expand-all
        ref="tree"
        @node-click="handleNodeClick"
        @check-change="checkChange"
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="selectDepartmentShow = false">取 消</el-button>
        <el-button type="primary" @click="selectDepartmentShow = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        equipmentData:{},
        equipmentRules:{},
        selectDepartmentShow:false,
        // 可选择部门数据
        departmentData: [{
          id: 1,
          label: '部门',
          disabled: true,
          children: [{
            id: 4,
            label: '总裁办'
          }, {
            id: 5,
            label: '技术部'
          }, {
            id: 6,
            label: '人事部'
          }, {
            id: 7,
            label: '销售部'
          }, {
            id: 8,
            label: '财务部'
          }, {
            id: 9,
            label: '市场部'
          }]
        }],
      }
    },
    methods:{
      goBack() {
        this.$router.go(-1);
      },
      // 显示选择部门对话框
      showSelectDialog() {
        this.selectDepartmentShow = true;
      },
      // 节点被点击时的回调
      handleNodeClick(item, node, self) { //自己定义的editCheckId，防止单选出现混乱
        this.checkedId = item.id;
        this.$refs.tree.setCheckedKeys([item.id])
      },
      // 节点选中状态发生变化时的回调
      checkChange(item, node, self) {
        if (node === true) {
          this.checkedId = item.id;
          this.$refs.tree.setCheckedKeys([item.id])
        } else {
          if (this.checkedId === item.id) {
            this.$refs.tree.setCheckedKeys([item.id])
          }
        }
      }
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
