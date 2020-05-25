<template>
  <div class="staff page">
    <el-container style="height: 100%;">
      <el-aside width="250px">
        <el-tree
          :data="departmentData"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span class="title">{{ node.label }}</span>
            <span>
              <el-tooltip class="item" effect="light" content="添加" placement="top" :enterable="false">
                <i class="treeIcon el-icon-circle-plus-outline" @click="showAddDepartment"></i>
              </el-tooltip>
              <el-tooltip class="item" effect="light" content="编辑" placement="bottom" :enterable="false">
                <i class="treeIcon el-icon-edit" @click="showEditDepartment(data.id)"></i>
              </el-tooltip>
              <el-tooltip class="item" effect="light" content="删除" placement="top" :enterable="false">
                <i class="treeIcon el-icon-delete" @click="deleteDepartment(data.id)"></i>
              </el-tooltip>
            </span>
          </span>
        </el-tree>
      </el-aside>
      <el-main>
        <el-row class="page">
          <!--    搜索-->
          <el-col :span="24">
            <search
              style="width: 95%;margin: 10px auto"
              :search-items="searchItems"
              @on-search="searchBySearchItem"
            ></search>
          </el-col>
          <el-col :span="24" style="margin-left: 35px">
            <el-tag type="success">全部{{total}}</el-tag>
            <el-tag type="success">启用{{enableTotal}}</el-tag>
            <el-tag type="success">禁用{{disableTotal}}</el-tag>
            <el-tag type="success">今日登陆过{{loginedTotal}}</el-tag>
          </el-col>
          <!--    按钮和分页-->
          <el-col :span="24">
            <div style="width: 95%;margin: 10px auto;">
              <el-button style="background: rgb(0, 161, 108);border: none" icon="el-icon-plus" type="primary"
                        @click="toCreate">新建
              </el-button>
              <el-button style="background: rgb(0, 161, 108);border: none" icon="el-icon-plus" type="primary"
                        @click="toCreate">导入
              </el-button>
              <el-button style="background: rgb(0, 161, 108);border: none" icon="el-icon-plus" type="primary"
                        @click="toCreate">导出
              </el-button>
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
                  layout="total, sizes,pager, jumper, prev, next"
                  :total="total">
                </el-pagination>
              </div>
            </div>
          </el-col>
          <!--    表格-->
          <el-col :span="24">
            <el-table
              :data="data"
              style="width: 95%;margin:0 auto;"
              @selection-change="handleSelectionChange"
              @row-dblclick="handleRowClick"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="number" label="工号"></el-table-column>
              <el-table-column prop="realName" label="姓名"></el-table-column>
              <el-table-column prop="phone" label="手机号"></el-table-column>
              <el-table-column prop="position " label="职位"></el-table-column>
              <el-table-column prop="department" label="部门">
                <template slot-scope="scope">
                  {{scope.row.department.name}}
                </template>
              </el-table-column>
              <el-table-column prop="enabled" label="状态">
                <template slot-scope="scope">
                  {{scope.row.enabled ? '启用' : '禁用'}}
                </template>
              </el-table-column>
              <el-table-column prop="manageable" label="是否负责人">
                <template slot-scope="scope">
                  {{scope.row.manageable ? '是' : '否'}}
                </template>
              </el-table-column>
              <el-table-column prop="loginAt" label="最后登录时间" sortable width="190px"></el-table-column>
              <el-table-column fixed="right" align="center" label="操作" width="240">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="goShowStaffPage(scope.row.id)">
                    查看
                  </el-button>
                  <el-button  type="text" size="small">
                    隔离配置
                  </el-button>
                  <el-button @click.stop="handleStatusChange(scope.row)" type="text" size="small">
                    {{scope.row.enabled ? '禁用' : '启用'}}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-main>
    </el-container>

    <!--    新增部门的对话框-->
    <el-dialog title="添加部门" :visible.sync="addDepartmentShow" width="600px" @close="closeAddDepartment">
      <el-form :model="addDepartmentForm" :rules="addDepartmentRules" ref="addDepartmentRef" label-width="90px">
        <el-form-item label="上级部门:" prop="parent">
          <el-select v-model="addDepartmentForm.parent" placeholder="请选择上级部门">
            <el-option v-for='(item, index) in parentOptions'
              :key='index'
              :value='item.value'
              :label='item.label'>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门名称:" prop="name">
          <el-input v-model="addDepartmentForm.name"></el-input>
        </el-form-item>
        <el-form-item label="排序号:" prop="position">
          <el-input v-model="addDepartmentForm.position"></el-input>
        </el-form-item>
        <el-form-item label="备注:" prop="comment">
          <el-input v-model="addDepartmentForm.comment"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="addDepartment">确 定</el-button>
      </div>
    </el-dialog>

    <!--  修改部门信息对话框  -->
    <el-dialog title="修改部门信息" :visible.sync="editDepartmentShow" width="600px" @close="closeEditDepartment">
      <!--   修改部门信息表单验证规则和新增部门表单规则一致   -->
      <el-form :model="editDepartmentForm" :rules="addDepartmentRules" ref="editDepartmentRef" label-width="90px"
               class="demo-ruleForm" label-position="left">
        <el-form-item label="上级部门:" prop="heightDepartment">
          <el-select v-model="editDepartmentForm.heightDepartment" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门名称:" prop="departmentName">
          <el-input v-model="editDepartmentForm.departmentName"></el-input>
        </el-form-item>
        <el-form-item label="排序号:" prop="sortNum">
          <el-input v-model="editDepartmentForm.sortNum"></el-input>
        </el-form-item>
        <el-form-item label="备注:" prop="remark">
          <el-input v-model="editDepartmentForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDepartmentShow = false">取 消</el-button>
        <el-button type="primary" @click="editDepartmentShow = false">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import Emitter from '@/framework/mixins/emitter'
  import Search from "@/framework/components/search";
  import {find, count, leave, enable, disable, batchEnable, batchDisable} from '@/project/service/employee'
  import {save, searchDepartment, delDepartment, get} from '@/project/service/department'

  export default {
    mixins: [Emitter],
    data() {
      return {
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
        // 控制新增部门对话框的显示与隐藏
        addDepartmentShow: false,
        //新增部门表单信息对象
        addDepartmentForm: {
          parent: '', // 上级部门
          name: '', // 部门名称
          position: '',// 排序号
          comment: '' // 备注
        },
        // 新增部门表单验证规则
        addDepartmentRules: {
          heightDepartment: [
            {required: true, message: '请选择上级部门', trigger: 'change'}
          ],
          departmentName: [
            {required: true, message: '请填写部门名称', trigger: 'blur'},
            {min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur'}
          ],
          sortNum: [
            {required: true, message: '请填写排序号', trigger: 'blur'},
            {min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur'}
          ],
          remark: [
            {required: true, message: '请填写备注', trigger: 'blur'},
            {min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur'}
          ],
        },
        // 控制修改部门信息对话框的显示与隐藏
        editDepartmentShow: false,
        // 修改部门表单信息对象
        editDepartmentForm: {
          parent: '', // 上级部门
          name: '', // 部门名称
          position: '',// 排序号
          comment: '' // 备注
        },
        // 上级部门可选项
        parentOptions: [],
        model: "employee",
        editId: 0,//编辑id
        data: [], // 员工表格数据
        selectList: [],
        sort: {asc: [], desc: []},
        pageSize: 10,
        page: 1,
        total: 0,
        // 启用数量
        enableTotal: 0,
        // 禁用数量
        disableTotal: 0,
        // 今日登录过数量
        loginedTotal: 0,
        extraParam: {},
        // 搜索组件配置项
        searchItems: [
          {
            name: "工号",
            key: "number",
            type: "string"
          },
          {
            name: "姓名",
            key: "realName",
            type: "string"
          },
          {
            name: "学历",
            key: "education",
            type: "select",
            displayValue: ['小学','初中','高中','中专','大专','本科','研究生','硕士','博士','博士后','其他'],
            value: ['小学','初中','高中','中专','大专','本科','研究生','硕士','博士','博士后','其他']
          },
          {
            name: "职位",
            key: "position",
            type: "select",
            displayValue: [],
            value: []
          },
          {
            name: "培训批次",
            key: "trainingOrder",
            type: "string"
          },
          {
            name: "填表时间",
            key: "fillAt",
            type: "date",
          },
          {
            name: "职位变更",
            key: "",
            type: "select",
            displayValue: ['部门','职位','在职状态'],
            value: ['部门','职位','在职状态']
          },
          {
            name: "入职日期",
            key: "employedAt",
            type: "date",
          },
          {
            name: "婚姻状况",
            key: "maritalStatus",
            type: "select",
            displayValue: ["未婚", "已婚", "恋爱中", "单身", "离异", "二婚"],
            value: ["未婚", "已婚", "恋爱中", "单身", "离异", "二婚"]
          },
          {
            name: "在职状态",
            key: "serviceStatus",
            type: "select",
            displayValue: ["在职", "离职"],
            value: ["在职", "离职"]
          },
          {
            name: "部门变更",
            key: "departmentChanged",
            type: "select",
            displayValue: ["是", "否"],
            value: ["是", "否"]
          },
          {
            name: "手机号码",
            key: "phone",
            type: "string"
          }
          ,{
            name: "出生日期",
            key: "birthday",
            type: "date",
          }, {
            name: "经介绍人",
            key: "introducer",
            type: "string"
          }
        ]
      }
    },
    components: {
      Search
    },
    methods: {
      // 前往查看员工相关信息页面
      goShowStaffPage(id){
        this.$router.push({path:'/staff/showStaff/' + id});
      },
      // 显示新增部门
      showAddDepartment() {
        this.addDepartmentShow = true;
      },
      // 发送新增部门请求
      addDepartment() {
        save(param, res => {
          this.handleClose()
          // 重新查询所有部门
          searchDepartment()
          this.$message({
            type: 'success',
            message: '添加成功!'
          });
        })
      },
      // 编辑部门信息
      showEditDepartment(id) {
        this.editDepartmentShow = true;
        // 根据id获取部门信息
        get(id, res => {
          this.editDepartmentForm = res
        })
      },
      // 删除部门
      deleteDepartment(id) {
        this.$confirm(' 删除该部门请确认该部门下没有员工', '确定删除该部门吗?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 根据id删除部门
          delDepartment({departmentId: id}, res => {
            // 重新查询所有部门
            searchDepartment()
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      // 关闭新增部门对话框
      closeAddDepartment() {
        this.$refs.addDepartmentRef.resetFields();
      },
      // 关闭修改部门信息对话框
      closeEditDepartment() {
        this.$refs.editDepartmentRef.resetFields();
      },
      // 控制员工启禁用
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
      // 顶部额外搜索条件
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
        this.search(1);
      },
      // 新建员工
      toCreate() {
        this.$router.push({path:'/staff/addStaff'});
      },
      // 获取员工信息列表
      search(page) {
        let _t = this;
        _t.page = page;
        let param = {
          pageable: {
            page: page,
            size: _t.pageSize,
            sort: _t.sort
          },
          [this.model]: _t.extraParam,
          isLoginedToday: false
        };
        if (
          param.pageable.sort.asc.length === 0 &&
          param.pageable.sort.desc.length === 0
        ) {
          delete param.pageable.sort;
        }
        find(param, res => {
          // 把启用数，禁用数置为0
          this.disableTotal = 0
          this.enableTotal = 0
          res.forEach(item => {
            if (item.enabled) {
              this.enableTotal++
            } else {
              this.disableTotal++
            }
          })
          _t.data = res
          _t.getTotal()
        });
      },
      // 获取上级部门可选项数据
      getParentOptions() {},
      // 获取员工信息条目总数
      getTotal() {
        let param = {[this.model]: this.extraParam, isLoginedToday: false};
        count(param, res => {
          this.total = parseInt(res);
        });
      },
      // 获取今日登录过的数量
      getLoginedToday() {
        let param = {[this.model]: this.extraParam, isLoginedToday: true};
        count(param, res => {
          this.loginedTotal = parseInt(res)
        })
      },
      // 批量启用
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
      // 批量禁用
      batchDisable() {
        let _t = this;
        let selectList = this.selectList;
        this.$confirm('确定禁用所选的记录吗?', '禁用提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          selectList.map(s => {
            disable({id: s.id}, res => {
              _t.search(_t.page);
              this.$message({
                type: 'success',
                message: '禁用成功!'
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
      // 删除员工，员工离职
      delete(id) {
        let _t = this;
        leave({id: id}, res => {
          _t.search(_t.page);
        });
      },
      // 关闭对话框
      handleClose() {
        this.addDepartmentShow = false;
        this.editDepartmentShow = false;
      },
      // 控制行是否选中
      handleSelectionChange(val) {
        this.selectList = val;
      },
      // 控制双击行事件
      handleRowClick(row) {
        this.$router.push({path: '/manager/show/' + row.id})
      },
      // 控制页码跳转
      handleCurrentChange(val) {
        this.page = val;
        this.search(this.page);
      },
      // 控制当前页数据显示条数
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.search(this.page);
      },
      // 控制“更多操作”
      handleClick(command) {
        switch (command) {
          case '启用':
            this.batchEnable();
            break;
          case '禁用':
            this.batchDisable();
            break;
        }
      },
    },
    created() {
      this.search(1)
      this.getParentOptions()
      this.getLoginedToday()
    }
  }
</script>

<style lang="less" scoped>
  .el-container {
    .el-aside {
      background-color: #f5f7fa;
      padding-top: 20px;
    }
    .el-main {
      /*background-color: #999999;*/
    }
  }
  .el-tree {
    font-size: 14px;
    font-weight: bolder;
    background-color: transparent;
    .treeIcon {
      margin: 0 3px;
    }
    .title {
      margin-right: 10px;
    }
  }
  .el-input, .el-input__inner {
    width: 350px;
  }
  .el-select /deep/ .el-input {
    width: 350px !important;
  }
  .el-dialog .el-dialog__body {
    overflow: hidden;
  }
  .page {
    overflow-y: auto;
    overflow-x: hidden;
  }
  .el-button + .el-button {
    margin-left: 2px;
  }
  .el-button--default:hover {
    color: #00a16c;
    border: 1px solid #00a16c;
    background: white;
  }
  .content /deep/ .el-date-editor /deep/ .el-input__inner /deep/  .el-input__prefix /deep/ .el-input__icon {
    line-height: 32px !important;
  }
</style>
