<template>
  <div>
    <el-row class="page">
      <el-button style="background: rgb(0, 161, 108);border: none" icon="el-icon-plus" type="primary"
                 class="create" @click="addPact">新增
      </el-button>
      <!--    表格-->
      <el-col :span="24">
        <el-table
          :data="contractData"
          style="width: 95%;margin:0 auto;"
          @row-dblclick="handleRowClick">
          <el-table-column prop="name" label="合同名称"></el-table-column>
          <el-table-column prop="content" label="合同说明"></el-table-column>
          <el-table-column prop="signAt" label="签订日期"></el-table-column>
          <el-table-column fixed="right" align="center" label="操作" width="240">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editPact(scope.row.id)">
                编辑
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <!--    按钮和分页-->
      <el-col :span="24">
        <div style="width: 95%;margin: 10px auto;">
          <div class="pager-group">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page"
              :page-sizes="[2, 20, 30, 40]"
              :page-size="pageSize"
              layout="total, sizes, jumper, pager,prev, next"
              :total="total"
              background>
            </el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>

    <!--  新增编辑合同对话框  -->
    <el-dialog
      :title="pactDialogTitle"
      :visible.sync="pactShow"
      width="40%"
      @close="handleClose"
      >
      <el-form :model="contractForm" :rules="pactRules" ref="pactRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="合同名称" prop="name" required>
          <el-input v-model="contractForm.name"></el-input>
        </el-form-item>
        <el-form-item label="合同说明" prop="content">
          <el-input v-model="contractForm.content"></el-input>
        </el-form-item>
        <el-form-item label="签订日期" >
          <el-col :span="11">
            <el-form-item prop="signAt">
              <el-date-picker type="datetime" placeholder="选择日期"
                              value-format="yyyy-MM-dd hh:mm:ss"
                              format="yyyy-MM-dd hh:mm:ss"
                              v-model="contractForm.signAt"
                              style="width: 100%;">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleConfirm(isEdit)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {findByEmployeeId, save, count, update} from '@/project/service/contract'

  export default {
    data() {
      return {
        // 合同表单数据对象
        contractForm: {
          name:'',
          content:'',
          signAt:''
        },
        // 合同验证规则
        pactRules:{
          name:[{required: true, message: '请输入合同名称', trigger: 'blur'}],
        },
        // 控制新增合同对话框的显示与隐藏
        pactShow:false,
        // 合同对话框的标题
        pactDialogTitle:'',
        // 顾客数据
        contractData: [],
        model: "contract",
        pageSize: 2,
        page: 1,
        total: 0,
        extraParam: {},
        // 是否是编辑弹框
        isEdit: false,
        // 合同id
        contractId: 0
      }
    },
    methods: {
      // 关闭新增合同对话框
      handleClose() {
        this.pactShow = false
        this.$refs.pactRef.resetFields();
      },
      handleConfirm(isEdit) {
        if (isEdit) {
          // 如果表单的必填项没有填写则终止请求发送
          this.$refs.pactRef.validate(valid => {
            if (!valid) return false
          })
          let param = Object.assign(this.contractForm, {id: this.contractId})
          // 发送更新合同请求
          update({contract: Object.assign(param, {employee: {id: this.id}})}, res => {
            this.handleClose()
            // 重新获取数据
            this.search(1, this.id)
            this.$message({
              type: 'success',
              message: '更新成功'
            })
          })
        } else {
          // 如果表单的必填项没有填写则终止请求发送
          this.$refs.pactRef.validate(valid => {
            if (!valid) return false
            // 处理参数，如果表单填写项为空则清除
            if (this.contractForm.content === '') delete this.contractForm.content
            if (this.contractForm.signAt === '') delete this.contractForm.signAt
            // 确定有填写再发送请求
            save({contract: Object.assign(this.contractForm, {employee: {id: this.id}})}, res => {
              this.handleClose()
              // 重新获取数据
              this.search(1, this.id)
              this.$message({
                type: 'success',
                message: '添加成功'
              })
            })
          })
        }
      },
      // 新增合同
      addPact() {
        this.pactDialogTitle = '新建合同';
        this.pactShow = true;
        this.isEdit = false
      },
      editPact(id) {
        findByEmployeeId({contract: {id: id}, employee: {id: this.id}}, res => {
          this.contractId = res[0].id
          this.contractForm = res[0]
        })
        this.pactDialogTitle = '编辑合同';
        this.pactShow = true;
        this.isEdit = true
      },
      search(page, id) {
        let _t = this;
        _t.page = page;
        let param = {
          pageable: {
            page: page,
            size: _t.pageSize
          },
          employee: {id: id}
        }
        findByEmployeeId(param, res => {
          _t.contractData = res;
          _t.getTotal(id)
        });
      },
      getTotal(id) {
        count({employee: {id: id}, [this.model]: {}}, res => {
          this.total = res
        })
      },
      handleRowClick(row) {
        this.$router.push({path: '/manager/show/' + row.id})
      },
      handleCurrentChange(val) {
        this.page = val;
        this.search(this.page, this.id);
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.search(this.page, this.id);
      }
    },
    mounted() {
      this.id = parseInt(this.$route.params.id)
      // 根据员工id获取合同信息
      this.search(1, this.id);
    }
  }
</script>

<style lang="less" scoped>
  .search /deep/ .search-item {
    margin-right: 30px !important;
  }

  .create {
    margin: 20px 42px;
  }
</style>
