<template>
  <div class="page">
    <el-row>
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
          style="width: 95%;margin:0 auto;">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="username" label="异常程度"></el-table-column>
          <el-table-column prop="realname" label="关联订单编号"></el-table-column>
          <el-table-column prop="phone" label="顾客姓名"></el-table-column>
          <el-table-column prop="position " label="机器编号">
          </el-table-column>
          <el-table-column prop="department" label="机器所属市场"></el-table-column>
          <el-table-column prop="status" label="操作人"></el-table-column>
          <el-table-column prop="responsible" label="产品"></el-table-column>
          <el-table-column prop="responsible" label="疗程阶段"></el-table-column>
          <el-table-column fixed="right" align="center" label="操作" width="240">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="checkDetail">
                查看
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
              layout="total, sizes, jumper, prev, next"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>

    <!--  查看异常疗程详细信息对话框  -->
    <el-dialog
      title="详细信息"
      :visible.sync="checkDetailShow"
      width="40%"
      >
      <el-table
        :data="checkDetailData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="类型"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="设定值"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="当前值"
          align="center"
        >
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
       <el-button type="primary" @click="checkDetailShow = false">确 认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Emitter from '@/framework/mixins/emitter'
  import Search from "@/framework/components/search";
  import {search} from '@/project/service/treatmentException'

  export default {
    mixins: [Emitter],
    data() {
      return {
        model: "treatmentException",
        checkDetailShow: false,
        data: [], // 表格数据
        checkDetailData: [],
        pageSize: 10,
        page: 1,
        total: 0,
        extraParam: {},
        // 搜索组件配置项
        searchItems: [
          {
            name: "异常程度",
            key: "username",
            type: "select"
          },
          {
            name: "顾客姓名",
            key: "customer",
            type: "string"
          },
          {
            name: "机器所属市场",
            key: "department",
            type: "select",
            displayValue: [],
            value: []
          },
          {
            name: "操作人",
            key: "employee",
            type: "string"
          }
        ]
      }
    },
    components: {
      Search
    },
    methods: {
      // 查看异常疗程列表订单详情
      checkDetail() {
        this.checkDetailShow = true;
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
      search(page) {
        let _t = this;
        _t.page = page;
        let param = {
          pageable: {
            page: page,
            size: _t.pageSize
          },
          [this.model]: _t.extraParam
        }
        search(param, res => {
          _t.data = res
          _t.getTotal()
        });
      },
      getTotal() {
        let _t = this;
        let param = {
          [this.model]: _t.extraParam
        }
        search(param, res => {
          _t.total = res.length
        })
      },
      handleCurrentChange(val) {
        this.page = val;
        this.search(this.page)
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize
        this.search(this.page)
      },
    },
    mounted() {
      // 获取异常疗程列表
      this.search(1)
    }
  }
</script>

<style lang="less" scoped>
  .page{
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>
