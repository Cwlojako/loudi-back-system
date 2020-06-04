<template>
  <div class="staff page">
    <el-container style="height: 100%;">
      <el-aside width="250px">
        <el-tree
          :props="props"
          :load="loadNode"
          lazy
          :expand-on-click-node='false'
          ref='tree'
          node-key="id"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }" @click="findByDepartmentId(data.id)">
            <span class="title">{{ node.label }}</span>
            <span>
              <el-tooltip class="item" content="添加" placement="top" :enterable="false">
                <i class="treeIcon el-icon-circle-plus-outline" @click="showAddDepartment($event, data.id)"></i>
              </el-tooltip>
              <el-tooltip class="item" content="编辑" placement="bottom" :enterable="false">
                <i class="treeIcon el-icon-edit" @click="showEditDepartment($event, data.id)"></i>
              </el-tooltip>
              <el-tooltip class="item" content="删除" placement="top" :enterable="false">
                <i class="treeIcon el-icon-delete" @click="deleteDepartment($event, data.id, node)"></i>
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
            <el-tag type="success">全部 ({{total}})</el-tag>
            <el-tag type="success">启用 ({{enableTotal}})</el-tag>
            <el-tag type="success">禁用 ({{disableTotal}})</el-tag>
            <el-tag type="success">今日登陆过 ({{loginedTotal}})</el-tag>
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
      <el-form :model="addDepartmentForm" :rules="rules" ref="addDepartmentRef" label-width="90px">
        <el-form-item label="上级部门:" prop="parent">
          <el-input v-model="addDepartmentForm.parent" disabled readonly></el-input>
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
        <el-button type="primary" @click="addDepartment(departmentId)">确 定</el-button>
      </div>
    </el-dialog>

    <!--  修改部门信息对话框  -->
    <el-dialog title="修改部门信息" :visible.sync="editDepartmentShow" width="600px" @close="closeEditDepartment">
      <!--   修改部门信息表单验证规则和新增部门表单规则一致   -->
      <el-form :model="editDepartmentForm" :rules="rules" ref="editDepartmentRef" label-width="90px">
        <el-form-item label="上级部门:" prop="parent">
          <el-input v-model="editDepartmentForm.parent" disabled readonly></el-input>
        </el-form-item>
        <el-form-item label="部门名称:" prop="name">
          <el-input v-model="editDepartmentForm.name"></el-input>
        </el-form-item>
        <el-form-item label="排序号:" prop="position">
          <el-input v-model="editDepartmentForm.position"></el-input>
        </el-form-item>
        <el-form-item label="备注:" prop="comment">
          <el-input v-model="editDepartmentForm.comment"></el-input>
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
  import {find, findByDepartmentId, count, leave, enable, disable, batchEnable, batchDisable} from '@/project/service/employee'
  import {save, delDepartment, get, findFather, findByParentId, findNext} from '@/project/service/department'

  export default {
    mixins: [Emitter],
    data() {
      return {
        // 树结构配置项
        props: {
          label: 'name',
          children: 'children',
          isLeaf: 'leaf',
          id: 'id'
        },
        // 控制新增部门对话框的显示与隐藏
        addDepartmentShow: false,
        //新增部门表单信息对象
        addDepartmentForm: {
          parent: '', // 上级部门
          name: '', // 部门名称
          position: '',// 排序号
          comment: '' // 备注
        },
        // 新增编辑部门表单验证规则
        rules: {
          name: [
            {required: true, message: '请填写部门名称', trigger: 'blur'},
            {min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur'}
          ],
          position: [
            {required: true, message: '请填写排序号', trigger: 'blur'},
            {min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur'}
          ]
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
        // 时间范围搜索条件
        fillAtParam: {},
        employedAtParam: {},
        birthdayParam: {},
        // 部门根节点
        rootNode: [],
        // 部门id
        departmentId: 0,
        // 添加部门请求参数
        addDepartmentParam: {},
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
            type: "daterange",
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
            type: "daterange",
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
            type: "daterange",
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
      // 点击部门节点获取相应部门下的员工列表
      findByDepartmentId(departmentId) {
        findByDepartmentId({departmentId: departmentId}, res => {
          this.data = res
          this.total = res.length
        })
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
      // 刷新节点
      refreshNode(id) {
        let node = this.$refs.tree.getNode(id)
        node.loaded = false
        // 主动调用展开节点方法，重新查询该节点下的所有子节点
        node.expand()
      },
      // 前往查看员工相关信息页面
      goShowStaffPage(id){
        this.$router.push({path:'/staff/showStaff/' + id});
      },
      // 显示新增部门
      showAddDepartment(e, id) {
        this.addDepartmentShow = true;
        e.stopPropagation()
        // 根据id获取部门信息
        get({id}, res => {
          this.departmentId = res.id
          if (res.name) {
            this.addDepartmentForm.parent = res.name
          }
        })
      },
      // 发送新增部门请求
      addDepartment(parentId) {
        // 清除参数
        delete this.addDepartmentForm.parent
        // 合并组成添加部门请求参数
        this.addDepartmentParam = Object.assign(this.addDepartmentForm, {parent: {id: parentId}})
        this.$refs.addDepartmentRef.validate(valid => {
          if (!valid) return false
          save({department: this.addDepartmentParam}, res => {
            this.handleClose()
             // 重新渲染该部门节点下的数据
            this.refreshNode(parentId)
            this.$message({
              type: 'success',
              message: '添加成功!'
            });
          })
        })
      },
      // 编辑部门信息
      showEditDepartment(e, id) {
        this.editDepartmentShow = true;
        // 阻止事件冒泡
        e.stopPropagation()
        // 根据id获取部门信息
        get({id}, res => {
          this.editDepartmentForm = res
          if (res.parent && res.parent.name) {
            this.editDepartmentForm.parent = res.parent.name
          } else {
            this.editDepartmentForm.parent = '顶级部门'
          }
        })
      },
      // 删除部门
      deleteDepartment(e, id, node) {
        // 获取该节点的父节点id
        let parentId = node.parent.data.id
        this.$confirm(' 删除该部门请确认该部门下没有员工', '确定删除该部门吗?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 根据id删除部门
          delDepartment({departmentId: id}, res => {
            // 重新查询部门
            this.refreshNode(parentId)
            this.$message({
              type: 'success',
              message: '删除部门成功!'
            });
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
        e.stopPropagation()
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
            if (keys[i] === 'fillAt') delete this.extraParam[keys[i]]
            if (keys[i] === 'employedAt') delete this.extraParam[keys[i]]
            if (keys[i] === 'birthday') delete this.extraParam[keys[i]]
          } else {
            delete this.extraParam[keys[i]];
          }
        }
        // 处理填表时间参数
        if (searchItems.fillAt) {
          this.fillAtParam = {
            'start': searchItems.fillAt[0],
            'end': searchItems.fillAt[1]
          }
        } else {
          delete this.fillAtParam
        }
        // 处理入职时间参数
        if (searchItems.employedAt) {
          this.employedAtParam = {
            'start': searchItems.employedAt[0],
            'end': searchItems.employedAt[1]
          }
        } else {
          delete this.employedAtParam
        }
        // 处理出生日期参数
        if (searchItems.birthday){
          this.birthdayParam = {
            'start': searchItems.birthday[0],
            'end': searchItems.birthday[1]
          }
        } else {
          delete this.birthdayParam
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
            size: _t.pageSize
          },
          [this.model]: _t.extraParam,
          isLoginedToday: false,
          fillAt: this.fillAtParam,
          employedAt: this.employedAtParam,
          birthday: this.birthdayParam
        };
        // 如果参数不需要则清除
        if (JSON.stringify(param.fillAt) === "{}") delete param.fillAt
        if (JSON.stringify(param.employedAt) === "{}") delete param.employedAt
        if (JSON.stringify(param.birthday) === "{}") delete param.birthday
        // 发送请求获取员工列表
        find(param, res => {
          _t.data = res
          this.get_Enable_Disable_total()
          _t.getTotal()
        });
      },
      // get_Enable_Disable_total获取启用量禁用量
      get_Enable_Disable_total() {
        let _t = this;
        let param = {
          [this.model]: _t.extraParam,
          isLoginedToday: false,
          fillAt: this.fillAtParam,
          employedAt: this.employedAtParam,
          birthday: this.birthdayParam
        };
        // 如果参数不需要则清除
        if (JSON.stringify(param.fillAt) === "{}") delete param.fillAt
        if (JSON.stringify(param.employedAt) === "{}") delete param.employedAt
        if (JSON.stringify(param.birthday) === "{}") delete param.birthday
        // 发送请求获取员工列表
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
        });
      },
      // 获取员工信息条目总数
      getTotal() {
        let param = {
          [this.model]: this.extraParam,
          isLoginedToday: false,
          fillAt: this.fillAtParam,
          employedAt: this.employedAtParam,
          birthday: this.birthdayParam
        }
        // 如果参数不需要则清除
        if (JSON.stringify(param.fillAt) === "{}") delete param.fillAt
        if (JSON.stringify(param.employedAt) === "{}") delete param.employedAt
        if (JSON.stringify(param.birthday) === "{}") delete param.birthday
        count(param, res => {
          this.total = parseInt(res)
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
        this.$router.push({path: '/staff/addStaff/' + row.id})
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
      // 获取今日登录数
      this.getLoginedToday()
    }
  }
</script>

<style lang="less" scoped>
  .el-container {
    .el-aside {
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
  .el-tree /deep/ .el-tree-node__content:hover {
    background: #ccc!important;
  }
  .el-tree /deep/ .el-tree-node:focus>.el-tree-node__content {
    background: #ccc!important;
  }
  .el-tree /deep/ .el-tree-node__expand-icon {
    color: #505050;
  }
  .el-tree /deep/  .el-tree-node__expand-icon.is-leaf {
    color: transparent;
  }
</style>
