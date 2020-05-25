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
          <el-button style="background: rgb(0, 161, 108);border: none" icon="el-icon-plus" type="primary"
                     @click="showProductDialog('新增产品')">新增
          </el-button>
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
            label="产品名称"
          >
          </el-table-column>
          <el-table-column
            prop="realname"
            label="性别"
          >
          </el-table-column>
          <el-table-column
            prop="phone"
            label="疗程价格"
          >
          </el-table-column>
          <el-table-column
            prop="position "
            label="按次价格"
          >
          </el-table-column>
          <el-table-column
            prop="department"
            label="是否进入观察期"
          >
          </el-table-column>
          <el-table-column
            prop="status"
            label="机型"
          >
          </el-table-column>
          <el-table-column
            prop="responsible"
            label="录入人"
          >
          </el-table-column>
          <el-table-column
            prop="responsible"
            label="状态"
          >
          </el-table-column>
          <el-table-column
            fixed="right"
            align="center"
            label="操作"
            width="240">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="showProductDialog('编辑产品')">
                编辑
              </el-button>
              <el-button type="text" size="small" @click="showTreatmentDialog">
                疗程管理
              </el-button>
              <el-button type="text" size="small">
                禁用
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <!--  新增或者编辑对话框  -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="addOrEditDialogShow"
      width="30%"
      @close="closeProductDialog"
    >
      <el-form :model="productFormData" :rules="productFormRule" ref="productFormRef" label-width="150px" class="demo-ruleForm" label-position="left">
        <el-form-item label="产品名称" prop="name" required>
          <el-input v-model="productFormData.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="region" required>
          <el-select v-model="productFormData.region" placeholder="请选择性别">
            <el-option label="男" value="shanghai"></el-option>
            <el-option label="女" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="疗程价格" prop="name" required>
          <el-input v-model="productFormData.name"></el-input>
        </el-form-item>
        <el-form-item label="按次价格" prop="name" required>
          <el-input v-model="productFormData.name"></el-input>
        </el-form-item>
        <el-form-item label="适用机型" prop="name" required>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </el-form-item>
        <el-form-item label="是否受疗程次数限制" prop="resource" required>
          <el-radio-group v-model="productFormData.resource">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
       <el-button @click="addOrEditDialogShow = false">取 消</el-button>
       <el-button type="primary" @click="addOrEditDialogShow = false">确 定</el-button>
      </span>
    </el-dialog>

    <!--  疗程管理对话框  -->
    <el-dialog
      title="疗程管理"
      :visible.sync="treatmentManageShow"
      width="70%"
      >
      <el-table
        :data="addTreatmentFormData"
        style="width: 100%">
        <el-table-column
          type="index"
          >
        </el-table-column>
        <el-table-column
          prop="date"
          label="下次提醒时间(天)"
          width="140"
          align="center"
          >
          <template slot-scope="scope">
            <el-input></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="能量(J)"
          align="center"
          >
          <template slot-scope="scope"
          >
            <el-input></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="频率(HZ)"
          align="center"
        >
          <template slot-scope="scope">
            <el-input></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="制冷等级(级)"
          align="center"
        >
          <template slot-scope="scope">
            <el-input></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="发光次数(次)"
          align="center"
        >
          <template slot-scope="scope">
            <el-input></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作时长(分钟)"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <el-input></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="正常范围(%)"
          align="center"
        >
          <template slot-scope="scope">
            <el-input></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="一般范围(%)"
          align="center"
        >
          <template slot-scope="scope">
            <el-input></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="中度异常(%)"
          align="center"
        >
          <template slot-scope="scope">
            <el-input></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="是否需要拍照"
          align="center"
        >
          <el-checkbox></el-checkbox>
        </el-table-column>
        <el-table-column
          prop="address"
          label="编辑">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="deleteTreatment(scope.$index)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button style="background: rgb(0, 161, 108);border: none" icon="el-icon-plus" type="primary"
                 class="addTreatment" @click="addTreatment">添加流程
      </el-button>
      <div>注：设备参数为选填项，若不设置异常范围则不提醒</div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="treatmentManageShow = false">取 消</el-button>
    <el-button type="primary" @click="treatmentManageShow = false">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
  import Emitter from '@/framework/mixins/emitter'
  // import ICreate from "../manager/create";
  // import IEdit from "../manager/edit";
  import Search from "@/framework/components/search";
  import {post} from "@/framework/http/request";
  import {search, count, del, enable, disable} from '@/project/service/manager'


  export default {
    mixins: [Emitter],
    data() {
      return {
        // 添加疗程管理表格数据
        addTreatmentFormData:[],
        inputVisible: false,
        inputValue: '',
        // 产品表单数据
        productFormData:{},
        // 产品表单验证规则
        productFormRule:{},
        dialogTitle:'',
        // 控制新增或者编辑对话框的显示与隐藏
        addOrEditDialogShow:false,
        // 控制疗程管理对话框的显示与隐藏
        treatmentManageShow:false,
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
            name: "产品名称",
            key: "username",
            type: "string"
          },
          {
            name: "性别",
            key: "",
            type: "select",
            displayValue: [],
            value: []
          },
          {
            name: "机型",
            key: "",
            type: "select",
            displayValue: [],
            value: []
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
      // 添加疗程
      addTreatment() {
        this.addTreatmentFormData.push({});
      },
      // 删除疗程
      deleteTreatment(index) {
        this.addTreatmentFormData.pop();
      },
      // 关闭产品对话框时触发
      closeProductDialog() {
        this.$refs.productFormRef.resetFields();
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        this.inputVisible = false;
        this.inputValue = '';
      },
      // 显示产品对话框
      showProductDialog(title) {
        this.addOrEditDialogShow = true;
        this.dialogTitle = title;
      },
      // 显示疗程管理对话框
      showTreatmentDialog() {
        this.treatmentManageShow = true;
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
  .addTreatment {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    top: 8px;
  }

  .el-input {
    width: 90px !important;
  }

</style>
