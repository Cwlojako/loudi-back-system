<template>
  <div>
    <el-row class="page">
      <el-button style="background: rgb(0, 161, 108);border: none" icon="el-icon-plus" type="primary"
                 class="create" @click="handleLimit('添加职务')">添加
      </el-button>
      <!--    表格-->
      <el-col :span="24">
        <el-table
          :data="customerData"
          style="width: 95%;margin:0 auto;"
          @selection-change="handleSelectionChange"
          @row-dblclick="handleRowClick"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="username" label="职务名称"></el-table-column>
          <el-table-column prop="position " label="职务描述"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
          <el-table-column fixed="right" align="center" label="操作" width="280">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="setLimit(scope.row.id)">
                设置权限
              </el-button>
              <el-button type="text" size="small" @click="handleLimit('编辑职务')">
                编辑
              </el-button>
              <el-button @click.stop="handleStatusChange(scope.row)" type="text" size="small">
                {{scope.row.status.indexOf('启用') >= 0 ? '禁用' : '启用'}}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <!--  添加/编辑职务对话框  -->
    <el-dialog
      :title="limitDialogTitle"
      :visible.sync="limitShow"
      width="40%"
      @close="closeAddPactDialog"
    >
      <el-form :model="limitData" :rules="limitRules" ref="limitRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="添加职务" prop="name" required>
          <el-input v-model="limitData.name"></el-input>
        </el-form-item>
        <el-form-item label="职务描述" prop="describe ">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入职务描述"
            v-model="limitData.describe"
            maxlength="300"
            show-word-limit
            resize="none">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
       <el-button @click="limitShow = false">取 消</el-button>
       <el-button type="primary" @click="limitShow = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {post} from "@/framework/http/request";
  import {search, count, del, enable, disable} from '@/project/service/manager'

  export default {
    data() {
      return {
        // 职务数据对象
        limitData:{
          name:'',
          describe :'',
        },
        // 职务验证规则
        limitRules:{
          name:'',
          describe :'',
        },
        // 控制对话框的显示与隐藏
        limitShow:false,
        // 对话框的标题
        limitDialogTitle:'添加职务',
        // 顾客数据
        customerData: [],
        model: "manager",
        selectList: [],
        sort: {asc: [], desc: []},
        pageSize: 10,
        page: 1,
        total: 0,
        extraParam: {},
      }
    },
    methods: {
      // 设置职务权限
      setLimit(id) {
        this.$router.push({path:`/limit/setLimit/${id}`})
      },
      // 新增/编辑职务
      handleLimit(title){
        this.limitShow = true;
        this.limitDialogTitle = title;
      },
      // 关闭对话框
      closeAddPactDialog() {
        this.$refs.limitRef.resetFields();
      },
      // 搜索顾客信息
      customerSearchBySearchItem(searchItems) {
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
          _t.customerData = data;
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
    computed: {
      route() {
        return this.$route;
      }
    },
    mounted() {
      // this.findAllRoles();
      this.search(1);
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
