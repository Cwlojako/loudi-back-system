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
          <el-dropdown :trigger="'click'" @command="handleClick" size="medium" @visible-change="onMenuChange">
            <el-button icon="el-icon-menu" style="background:#3e5265;color: white ">
              更多操作<i class="el-icon-caret-bottom" ref="rotate" style="transition: all .3s;"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                icon="el-icon-circle-check"
                command="启用"
                :disabled="selectList.findIndex(s=>{return s.enabled}) >=0 || selectList.length === 0"
                :style="(selectList.findIndex(s=>{return s.enabled}) >=0 || selectList.length === 0)?{'color':'rgba(255,255,255,0.4)','cursor': 'not-allowed'}:{'color':'#fff'}"
                @click="batchEnable"
              >
                启用
              </el-dropdown-item>
              <el-dropdown-item
                icon="el-icon-circle-close"
                command="禁用"
                :disabled="selectList.findIndex(s=>{return !s.enabled}) >=0 || selectList.length === 0"
                :style="(selectList.findIndex(s=>{return !s.enabled}) >=0 || selectList.length === 0)?{'color':'rgba(255,255,255,0.4)'}:{'color':'#fff'}"
                @click.stop="batchDisable"
              >
                禁用
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
          <el-table-column type="selection" width="55"></el-table-column>
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
              <el-button type="text" size="small" @click="showTypeDialog('编辑信息', scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click='handleStatusChange(scope.row)'>{{scope.row.enabled ? '禁用' : '启用'}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <!--  新增机型或者编辑对话框  -->
    <el-dialog
      :title="typeDialogTitle"
      :visible.sync="typeDialogShow"
      width="40%">
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
        <el-button type="primary" @click="handleSaveOrUpdate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Emitter from '@/framework/mixins/emitter'
  import Search from "@/framework/components/search";
  import {find, update, save, enable, disable} from '@/project/service/deviceModel'

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
        // 弹框是否为编辑模式
        isEdit: false,
        // 搜索组件配置项
        searchItems: [
          {
            name: "机型名称",
            key: "name",
            type: "string"
          }
        ],
        // 机型名称
        deviceModelName: ''
      }
    },
    components: {
      Search
    },
    methods: {
      // 新增或者编辑机型信息
      showTypeDialog(title, row) {
        this.typeDialogShow = true
        this.typeDialogTitle = title
        if (title === '编辑信息') {
          this.isEdit = true
          // 根据机型名称获取机型信息  ???根据id
          find({name: row.name}, res => {
            this.typeFormData = res[0]
          })
        } else {
          this.isEdit = false
        } 
      },
      handleSaveOrUpdate() {
        if (this.isEdit) {
          // 编辑模式 发送更新请求
          this.$refs.typeFormRef.validate(valid => {
            if (!valid) return false
            update({[this.model]: this.typeFormData}, res => {
              this.typeDialogShow = false
              this.search(1, this.deviceModelName)
              this.$message({
                type: 'success',
                message: '更新机型信息成功'
              })
            })
          })
        } else {
          this.$refs.typeFormRef.validate(valid => {
            if (!valid) return false
            // 新建模式，发送新增请求
            save({[this.model]: this.typeFormData}, res => {
              this.typeDialogShow = false
              this.search(1, this.deviceModelName)
              this.$message({
                type: 'success',
                message: '添加机型成功'
              })
            })
          })
        }
      },
      handleStatusChange(row) {
        let status;
        let _t = this;
        if (row.enabled) {
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
              _t.search(_t.page, this.deviceModelName);
              this.$message({
                type: 'success',
                message: '启用成功!'
              });
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
        this.$confirm('确定禁用所选的记录吗?', '启用提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          selectList.map(s => {
            disable({id: s.id}, res => {
              _t.search(_t.page, this.deviceModelName)
              this.$message({
                type: 'success',
                message: '禁用成功!'
              })
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
      this.search(1, this.deviceModelName)
    }
  }
</script>

<style lang="less" scoped>
</style>
