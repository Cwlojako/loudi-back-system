<template>
  <div class="staff">
    <el-row class="page">
      <!--    搜索-->
      <el-col :span="24">
        <search
          style="width: 95%;margin: 10px auto"
          :search-items="searchItems"
          @on-search="searchBySearchItem"
        ></search>
      </el-col>
      <!--    按钮和分页-->
      <el-col :span="24">
        <div style="width: 95%;margin: 10px auto;">
          <el-button style="background: rgb(0, 161, 108);border: none" icon="el-icon-plus" type="primary" @click="showTypeDialog('新增机型')">新建</el-button>
          <div class="pager-group">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSize"
              layout="total, sizes, pager, jumper, prev, next"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </el-col>
      <!--    表格-->
      <el-col :span="24">
        <el-table
          :data="deviceModelData"
          style="width: 95%;margin:0 auto;"
          @selection-change="handleSelectionChange">
          <el-table-column prop="name" label="机型名称"></el-table-column>
          <el-table-column prop="description" label="机型描述"></el-table-column>
          <el-table-column prop="employee.realName" label="录入人"></el-table-column>
          <el-table-column prop="enabled" label="状态">
            <template slot-scope="scope">
              {{scope.row.enabled ? "启用" : "禁用"}}
            </template>
          </el-table-column>
          <el-table-column fixed="right" align="center" label="操作" width="240">
            <template slot-scope="scope">
              <el-button type="text" size="small"@click="showTypeDialog('编辑信息')">编辑</el-button>
              <el-button type="text" size="small">{{scope.row.enabled ? '禁用' : '启用'}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <!--  新增机型或者编辑对话框  -->
    <el-dialog
      :title="typeDialogTitle"
      :visible.sync="typeDialogShow"
      width="30%">
      <el-form :model="typeFormData" :rules="typeFormRule" ref="typeFormRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="机型名称" prop="name">
          <el-input v-model="typeFormData.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="机型描述" prop="description">
          <el-input v-model="typeFormData.description" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="typeDialogShow = false">取 消</el-button>
        <el-button type="primary" @click="handleSaveOrUpddate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Emitter from '@/framework/mixins/emitter'
  import Search from "@/framework/components/search";
  import {find} from '@/project/service/deviceModel'

  export default {
    mixins: [Emitter],
    data() {
      return {
        // 控制机型对话框的显示与隐藏
        typeDialogShow:false,
        typeDialogTitle:'',
        typeFormData:{},
        typeFormRule:{
          name: [{required: true, message: '请输入机型名称', trigger: 'blur'}]
        },
        model: "deviceModel",
        // 机型表格数据
        deviceModelData: [],
        selectList: [],
        pageSize: 10,
        page: 1,
        total: 0,
        extraParam: {},
        isEdit: false,
        // 搜索组件配置项
        searchItems: [
          {
            name: "机型名称",
            key: "name",
            type: "string"
          }
        ]
      }
    },
    components: {
      Search
    },
    methods: {
      // 新增或者编辑机型信息
      showTypeDialog(title) {
        this.typeDialogShow = true;
        this.typeDialogTitle = title;
        if (title === '编辑信息') {
          this.isEdit = true
        }
        this.isEdit = false
      },
      handleSaveOrUpddate() {
        if (this.isEdit) {

        }
      },
      handleStatusChange(row) {
        let status;
        let _t = this;
        if (row.status.indexOf('启用') >= 0) {
          status = '禁用'
        } else {
          status = '启用'
        }
        this.$confirm(`确定${status}选中内容？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (status === '禁用') {
            disable({id: row.id}, res => {
              _t.$message({
                type: 'success',
                message: '已禁用!'
              });
              _t.search(_t.page);
            })
          } else {
            enable({id: row.id}, res => {
              _t.$message({
                type: 'success',
                message: '已启用!'
              });
              _t.search(_t.page);
            })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      searchBySearchItem(searchItems) {
        this.deviceModelName = searchItems.name
        this.search(1, this.deviceModelName)
      },
      search(page, deviceModelName) {
        let _t = this
        _t.page = page
        let param = {
          pageable: {
            page: page,
            size: _t.pageSize
          },
          name: deviceModelName
        };
        find(param, res => {
          _t.deviceModelData = res
          _t.getTotal(deviceModelName)
        })
      },
      getTotal(deviceModelName) {
        let param = {
          name: deviceModelName
        }
        find(param, res => {
          this.total = res.length
        })
      },
      //批量启用
      batchEnable() {
        let _t = this;
        let selectList = this.selectList;
        this.$confirm('确定启用所选的记录吗?', '启用提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          selectList.map(s => {
            enable({id: s.id}, res => {
              _t.search(_t.page);
              // this.$message({
              //   type: 'success',
              //   message: '删除成功!'
              // });
            })
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      //批量禁用
      batchDisable() {
        let _t = this;
        let selectList = this.selectList;
        this.$confirm('确定启用所选的记录吗?', '启用提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          selectList.map(s => {
            disable({id: s.id}, res => {
              _t.search(_t.page);
              // this.$message({
              //   type: 'success',
              //   message: '删除成功!'
              // });
            })
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      handleSelectionChange(val) {
        this.selectList = val;
      },
      handleCurrentChange(val) {
        this.page = val
        this.search(this.page)
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize
        this.search(this.page)
      },
      handleClick(command) {
        switch (command) {
          case '编辑':
            console.log('编辑');
            this.editId = this.selectList[0].id;
            this.editProps.visible = true;
            break;
          case '启用':
            console.log('启用');
            this.batchEnable();
            break;
          case '禁用':
            console.log('禁用')
            this.batchDisable();
            break;
        }
      }
    },
    mounted() {
      this.search(1)
    }
  }
</script>

<style lang="less" scoped>
</style>
