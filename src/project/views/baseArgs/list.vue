<template>
  <el-row class="page">
    <el-card>
      <h5>基本信息</h5>
      <div class="base-message">
        <span class="base-message-tel">平台联系电话&nbsp;&nbsp;{{phone}}</span>
        <el-tooltip class="item" effect="dark" content="编辑" placement="right">
          <i class="el-icon-edit" @click="showEditDialog"></i>
        </el-tooltip>
      </div>
    </el-card>
    <el-dialog
      title="设置"
      :visible.sync="editProps.visible"
      :modal-append-to-body='false'
      width="50%"
      :before-close="handleClose">
      <el-form ref="formValidate" :model="formValidate" label-width="150px">
        <el-form-item label="平台联系电话" prop="phone">
          <el-input v-model="formValidate.phone" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="info" @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleConfirm('formValidate')">确 定</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>
<script>

  export default {
    data() {
      return {
        editProps: {
          visible: false
        },
        phone: '888888888',
        formValidate: {
          phone: '888888888'
        }
      }
    },
    methods: {
      showEditDialog() {
        this.editProps.visible = true
      },
      handleClose() {
        this.editProps.visible = false
      },
      // 发送修改平台联系电话请求
      handleConfirm() {
        // 先关闭对话框
        this.handleClose()
        // 发送请求
      }
    }
  }
</script>
<style lang="less" scoped>
  .page {
    padding: 20px;
    .base-message {
      color: #aaa;
      .base-message-tel {
        font-size: 14px;
        padding: 15px;
      }
      .el-icon-edit {
        cursor: pointer;
      }
      .el-icon-edit:hover {
        color: #020508;
      }
    }
  }
</style>
