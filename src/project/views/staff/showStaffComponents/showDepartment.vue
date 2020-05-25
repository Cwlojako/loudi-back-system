<template>
  <div>
    <el-row class="page">
      <!--    表格-->
      <el-col :span="24">
        <el-table
          :data="customerData"
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
            label="变动类型"
          >
          </el-table-column>
          <el-table-column
            prop="realname"
            label="原先"
          >
          </el-table-column>
          <el-table-column
            label="修改后"
          >
          </el-table-column>
          <el-table-column
            prop="phone"
            label="日期"
          >
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
              layout="total, sizes, jumper, pager,prev, next"
              :total="total"
              background>
            </el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {post} from "@/framework/http/request";
  import {search, count, del, enable, disable} from '@/project/service/manager'


  export default {

    data() {
      return {
        // 顾客数据
        customerData: [],
        model: "manager",
        selectList: [],
        sort: {asc: [], desc: []},
        pageSize: 10,
        page: 1,
        total: 0,
        extraParam: {}
      }
    },
    methods:{
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
</style>
