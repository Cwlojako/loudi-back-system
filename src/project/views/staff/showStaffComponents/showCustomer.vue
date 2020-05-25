<template>
  <div>
    <el-row class="page">
      <!--    搜索-->
      <el-col :span="24">
        <search
          style="width: 95%;margin: 10px auto"
          :search-items="customerSearchItems"
          @on-search="customerSearchBySearchItem"
        ></search>
      </el-col>
      <!--    表格-->
      <el-col :span="24">
        <el-table
          :data="customerData"
          style="width: 95%;margin:0 auto;"
          @selection-change="handleSelectionChange"
          @row-dblclick="handleRowClick"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="username" label="顾客编号"></el-table-column>
          <el-table-column prop="realname" label="顾客名称"></el-table-column>
          <el-table-column prop="phone" label="手机号码"></el-table-column>
          <el-table-column prop="position " label="顾客类型"></el-table-column>
          <el-table-column prop="department" label="疗程顾客子类型"></el-table-column>
          <el-table-column fixed="right" align="center" label="操作" width="240">
            <template slot-scope="scope">
              <el-button type="text" size="small">
                查看
              </el-button>
              <el-button type="text" size="small">
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
  import {findByEmployeeId, count} from '@/project/service/customer'

  export default {

    data() {
      return {
        // 顾客信息搜索配置项
        customerSearchItems: [
          {
            name: "顾客编号",
            key: "username",
            type: "string"
          },
          {
            name: "顾客名称",
            key: "username",
            type: "string"
          },
          {
            name: "手机号码",
            key: "username",
            type: "string"
          },
          {
            name: "顾客类型",
            key: "username",
            type: "string"
          },
          {
            name: "顾客子类型",
            key: "username",
            type: "string"
          }],
        // 顾客数据
        customerData: [],
        model: "customer",
        sort: {asc: [], desc: []},
        pageSize: 10,
        page: 1,
        total: 0,
        extraParam: {},
        id: 0
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
      // 获取员工所属的顾客信息
      getCustomerData(id) {
        findByEmployeeId({id: id}, res => {
          this.customerData = res
          this.getTotal()
        })
      },
      // 获取数据条数
      getTotal() {
        let _t = this;
        let param = {[this.model]: _t.extraParam};
        count(param, res => {
          _t.total = parseInt(res);
        });
      },
      // 控制双击行事件
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
      }
    },
    components: {
      Search
    },
    created() {
      this.id = parseInt(this.$route.params.id)
      // 获取顾客列表数据
      this.getCustomerData(this.id);
    }
  }
</script>

<style lang="less" scoped>
  .search /deep/ .search-item {
    margin-right: 30px !important;
  }
</style>
