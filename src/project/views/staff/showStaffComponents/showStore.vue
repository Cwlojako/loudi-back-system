<template>
  <div>
    <el-row class="page">
      <!--    搜索-->
      <el-col :span="24">
        <search
          style="width: 95%;margin: 10px auto"
          :search-items="salonSearchItems"
          @on-search="salonSearchBySearchItems"
        ></search>
      </el-col>
      <!--    表格-->
      <el-col :span="24">
        <el-table
          :data="salonData"
          style="width: 95%;margin:0 auto;"
          @selection-change="handleSelectionChange"
          @row-dblclick="handleRowClick"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="店铺编号"></el-table-column>
          <el-table-column prop="name" label="店铺名称"></el-table-column>
          <el-table-column prop="category" label="分类"></el-table-column>
          <el-table-column prop="phone" label="状态"></el-table-column>
          <el-table-column fixed="right" align="center" label="操作" width="240">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="toSalonDetail(scope.row.id)">
                查看
              </el-button>
              <el-button type="text" size="small" @click="toSalonEdit(scope.row.id)">
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
  import Search from "@/framework/components/search";
  import {post} from "@/framework/http/request";
  import {findByEmployeeId, count} from '@/project/service/salon'


  export default {
    data() {
      return {
        // 员工id
        id: 0,
        // 店铺信息搜索配置项
        salonSearchItems: [
          {
            name: "店铺编号",
            key: "id",
            type: "string"
          },
          {
            name: "店铺名称",
            key: "name",
            type: "string"
          },
          {
            name: "分类",
            key: "category",
            type: "select",
            displayValue: ['美容美发', '养生', '其他'],
            value: ['美容美发', '养生', '其他']
          },
          {
            name: "状态",
            key: "enabled",
            type: "select",
            displayValue: ["启用", "禁用"],
            value: ["启用", "禁用"]
          }],
        // 店铺数据
        salonData: [],
        model: "salon",
        selectList: [],
        sort: {asc: [], desc: []},
        pageSize: 10,
        page: 1,
        total: 0,
        extraParam: {}
      }
    },
    methods:{
      // 搜索店铺信息
      salonSearchBySearchItems(searchItems) {
        let keys = [];
        for (
          let i = 0,
            searchItemList = this.salonSearchItems,
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
        this.search(1, this.id);
      },
      // 控制启禁用
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
      // 根据员工id查找所属店铺
      search(page, id) {
        let _t = this;
        _t.page = page;
        let param = {
          pageable: {
            page: page,
            size: _t.pageSize,
          },
          [this.model]: _t.extraParam,
          teacher: {id: id}
        };
        findByEmployeeId(param, res => {
          let data = res;
          _t.salonData = data;
          _t.getTotal(id);
        });
      },
      getTotal(id) {
        let _t = this;
        let param = {[this.model]: _t.extraParam, teacher: {id: id}};
        count(param, res => {
          _t.total = parseInt(res);
        });
      },
      handleSelectionChange(val) {
        this.selectList = val;
      },
      handleRowClick(row) {
        this.$router.push({path: '/manager/show/' + row.id})
      },
      toSalonDetail(id) {
        this.$router.push({path: '/shop/shopDetail/' + id})
      },
      toSalonEdit(id) {
        this.$router.push({path: '/shop/addOrEditBaseInfo/' + id, query: {activeName: '0'}})
      },
      handleCurrentChange(val) {
        this.page = val;
        this.search(this.page);
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.search(this.page);
      },
      handleClick(command) {
        switch (command) {
          case '编辑':
            this.editId = this.selectList[0].id;
            this.editProps.visible = true;
            break;
          case '启用':
            this.batchEnable();
            break;
          case '禁用':
            this.batchDisable();
            break;
        }
      }
    },
    components: {
      Search
    },
    created() {
      this.id = this.$route.params.id
      // 获取店铺列表
      this.search(1, this.id);
    }
  }
</script>

<style lang="less" scoped>
  .search /deep/ .search-item {
    margin-right: 30px !important;
  }
</style>
