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
      <!--    表格-->
      <el-col :span="24">
        <el-table
          :data="data"
          style="width: 95%;margin:0 auto;"
          @selection-change="handleSelectionChange"
          @row-dblclick="handleRowClick"
        >
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="username"
            label="类型"
          >
          </el-table-column>
          <el-table-column
            prop="realname"
            label="顾客编号"
          >
          </el-table-column>
          <el-table-column
            prop="phone"
            label="顾客类型"
          >
          </el-table-column>
          <el-table-column
            prop="position "
            label="店铺名称"
          >
          </el-table-column>
          <el-table-column
            prop="department"
            label="所属老师"
          >
          </el-table-column>
          <el-table-column
            prop="status"
            label="手机号码"
          >
          </el-table-column>
          <el-table-column
            prop="responsible"
            label="下次疗程时间"
          >
          </el-table-column>
          <el-table-column
            fixed="right"
            align="center"
            label="操作"
            width="240">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="goTreatmentPage(scope.row.id)">
                查看
              </el-button>
              <el-button type="text" size="small" @click="remind">
                站内提醒(2)
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
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSize"
              layout="total, sizes, pager, jumper, prev, next"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </el-col>

    </el-row>

    <!--    新增部门的对话框-->
    <el-dialog title="添加部门" :visible.sync="addDepartmentShow" width="600px" @close="closeAddDepartment">
      <el-form :model="addDepartmentForm" :rules="addDepartmentRules" ref="addDepartmentRef" label-width="90px"
               class="demo-ruleForm" label-position="left">
        <el-form-item label="上级部门:" prop="heightDepartment">
          <el-select v-model="addDepartmentForm.heightDepartment" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门名称:" prop="departmentName">
          <el-input v-model="addDepartmentForm.departmentName"></el-input>
        </el-form-item>
        <el-form-item label="排序号:" prop="sortNum">
          <el-input v-model="addDepartmentForm.sortNum"></el-input>
        </el-form-item>
        <el-form-item label="备注:" prop="remark">
          <el-input v-model="addDepartmentForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDepartmentShow = false">取 消</el-button>
        <el-button type="primary" @click="addDepartmentShow = false">确 定</el-button>
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
  import {post} from "@/framework/http/request";
  import {search, count, del, enable, disable} from '@/project/service/manager'

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
          heightDepartment: '', // 上级部门
          departmentName: '', // 部门名称
          sortNum: '',// 排序号
          remark: '' // 备注
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
          heightDepartment: '', // 上级部门
          departmentName: '', // 部门名称
          sortNum: '',// 排序号
          remark: '' // 备注
        },
        model: "manager",
        // createProps: {
        //   visible: false
        // },
        // editProps: {
        //   visible: false
        // },
        menu: {
          visible: false
        },
        editId: 0,//编辑id
        data: [], // 员工表格数据
        selectList: [],
        sort: {asc: [], desc: []},
        pageSize: 10,
        page: 1,
        total: 0,
        extraParam: {},
        // 搜索组件配置项
        searchItems: [
          {
            name: "顾客编号",
            key: "username",
            type: "string"
          },
          {
            name: "顾客名称",
            key: "username",
            type: "string"
          },{
            name: "类型",
            key: "username",
            type: "string"
          }
        ]
      }
    },
    computed: {
      route() {
        return this.$route;
      }
    },
    components: {
      Search
      // ICreate,
      // IEdit
    },
    methods: {
      // 前往疗程信息页面
      goTreatmentPage() {
        this.$router.push({name:'orderDetail',params:{
          activeName:"2"
          }})
      },
      // 站内提醒
      remind() {
        this.$confirm(' 确定提醒该老师监督客户疗程吗?', '提醒', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          del({ids: ids}, res => {
            _t.search(_t.page);
            this.$message({
              type: 'success',
              message: '提醒成功!'
            });
          });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '本次操作取消'
          });
        });
      },
      // 前往店铺详情页面
      goShopDetail() {
        this.$router.push({path:'/shop/shopDetail'})
      },
      // 前往结算记录总汇界面
      goSettlementRecord() {
        this.$router.push({path:'/shop/SettlementRecord'})
      },
      // 前往培训记录总汇界面
      gotrainRecord() {
        this.$router.push({path:'/shop/trainRecord'});
      },
      // 前往查看员工相关信息页面
      goShowStaffPage() {
        this.$router.push({path: '/staff/showStaff'});
      },
      // 新增部门
      addDepartment() {
        this.addDepartmentShow = true;
      },
      // 编辑部门信息
      editDepartment() {
        this.editDepartmentShow = true;
      },
      // 删除部门
      deleteDepartment() {
        this.$confirm(' 删除该部门请确认该部门下没有员工', '确定删除该部门吗?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          del({ids: ids}, res => {
            _t.search(_t.page);
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
      handleEdit() {
        this.editId = this.selectList[0].id
        this.editProps.visible = true;
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
      handlePageSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.search(1);
      },
      handlePageChange(page) {
        this.search(page);
      },
      handleSortChange(sort) {
        let key = sort.key;
        let order = sort.order;
        let asc = this.sort.asc;
        let desc = this.sort.desc;
        if (asc.indexOf(key) > -1) {
          let idx = asc.indexOf(key);
          asc.splice(idx, 1);
        }
        if (desc.indexOf(key) > -1) {
          let idx = desc.indexOf(key);
          desc.splice(idx, 1);
        }
        if (order !== "normal") {
          this.sort[order].push(key);
        }
        this.search(1);
      },
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
      toCreate() {
        // this.createProps.visible = true;
        this.$router.push({path: '/staff/addStaff'});
      },
      search(page) {
        let _t = this;
        _t.page = page;
        console.log(this.sort);
        let param = {
          pageable: {
            page: page,
            size: _t.pageSize,
            sort: _t.sort
          },
          [this.model]: _t.extraParam
        };
        if (
          param.pageable.sort.asc.length === 0 &&
          param.pageable.sort.desc.length === 0
        ) {
          delete param.pageable.sort;
        }
        search(param, res => {
          let data = res;
          _t.data = data;
          _t.getTotal();
        });
      },
      getTotal() {
        let _t = this;
        let param = {[this.model]: _t.extraParam};
        count(param, res => {
          _t.total = parseInt(res);
        });
      },
      handleTransportSelectList(list) {
        this.selectList = list;
      },
      //批量删除
      batchDelete() {
        this.broadcast("SiTable", "on-get-selectList");
        this.$nextTick(() => {
          let selectList = this.selectList;
          if (selectList.length === 0) {
            this.$notify.warning({
              title: "至少选择一条数据"
            });
            return;
          }
          this.$confirm('确定删除所选记录吗?', '删除提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            del({ids: ids}, res => {
              _t.search(_t.page);
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
        });
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

      delete(id) {
        let _t = this;
        del({id: id}, res => {
          _t.search(_t.page);
        });
      },
      enable(id, url) {
        let _t = this;
        post(url, {id: id}, res => {
          _t.search(_t.page);
        });
      },
      handleClose() {
        this.createProps.visible = false;
        this.editProps.visible = false;
      },
      handleSelectionChange(val) {
        this.selectList = val;
      },
      handleRowClick(row) {
        this.$router.push({path: '/manager/show/' + row.id})
      },
      handleCurrentChange(val) {
        this.page = val;
        this.search(this.page);
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;

        this.search(this.page);
      },
      onMenuChange(val) {
        console.log(val);
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
      this.search(1);
      // this.findAllRoles();
    }
  }
</script>

<style lang="less" scoped>
  .el-container {
    margin-top: 20px;

    .el-aside {
      /*height: 500px;*/
      margin-left: 20px;
      /*background-color: #f5f7fa;*/
    }

    .el-main {
      /*background-color: #999999;*/
    }
  }

  .el-tree {
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

  .content /deep/ .el-date-editor /deep/ .el-input__inner /deep/ .el-input__prefix /deep/ .el-input__icon {
    line-height: 32px !important;
  }

</style>
