<template>
  <div>
    <el-row class="page">
      <!--    搜索-->
      <el-col :span="24">
        <search
          style="width: 95%;margin: 10px auto"
          :search-items="orderSearchItems"
          @on-search="orderSearchBySearchItem"
        ></search>
      </el-col>
      <!--    表格-->
      <el-col :span="24">
        <el-table
          :data="orderData"
          style="width: 95%;margin:0 auto;"
          @row-dblclick="handleRowClick">
          <el-table-column prop="id" label="订单编号"></el-table-column>
          <el-table-column prop="type" label="订单类型"></el-table-column>
          <el-table-column prop="product.name" label="疗程部位"></el-table-column>
          <el-table-column prop="paymentAmount" label="成交金额"></el-table-column>
          <el-table-column prop="createAt" label="下单时间"></el-table-column>
          <el-table-column fixed="right" align="center" label="操作" width="260">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="toOrderDetail(scope.row.id)">
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
  import {findByCustomerId, count} from '@/project/service/order'

  export default {
    data() {
      return {
        // 顾客id
        id: 0,
        // 订单信息搜索配置项
        orderSearchItems: [
          {
            name: "订单编号",
            key: "id",
            type: "string"
          },
          {
            name: "订单类型",
            key: "type",
            type: "select",
            displayValue: [],
            value: []
          },
          {
            name: "产品",
            key: "product",
            type: "string"
          }
        ],
        // 顾客数据
        orderData: [],
        model: "order",
        pageSize: 10,
        page: 1,
        total: 0,
        extraParam: {},
        // 顾客搜索参数
        customerParam: {},
        // 产品搜索参数
        productParam: {}
      }
    },
    methods: {
      // 搜索订单信息
      orderSearchBySearchItem(searchItems) {
        let keys = [];
        for (
          let i = 0,
            searchItemList = this.orderSearchItems,
            len = searchItemList.length;
          i < len;
          i++
        ) {
          keys.push(searchItemList[i].key);
        }
        for (let i in keys) {
          if (searchItems[keys[i]]) {
            this.extraParam[keys[i]] = searchItems[keys[i]];
            if (keys[i] === 'customer') delete this.extraParam[keys[i]]
            if (keys[i] === 'product') delete this.extraParam[keys[i]]
          } else {
            delete this.extraParam[keys[i]];
          }
        }
        // 处理顾客名称参数
        if (searchItems.customer) {
          this.customerParam.realName = searchItems.customer
        } else {
          delete this.customerParam.realName
        }
        // 处理产品参数
        if (searchItems.product) {
          this.productParam = {
            name: searchItems.product
          }
        } else {
          delete this.productParam
        }
        this.search(1, this.id);
      },
      search(page, id) {
        let _t = this;
        _t.page = page;
        let param = {
          pageable: {
            page: page,
            size: _t.pageSize
          },
          [this.model]: _t.extraParam,
          customer: Object.assign({id: id}, _t.customerParam),
          product: _t.productParam
        };
        // 如果没有查询条件则清除携带参数对象
        if (!param.customer.realName) delete param.customer.realName
        if (JSON.stringify(param.product) === "{}") delete param.product
        findByCustomerId(param, res => {
          _t.orderData = res;
          _t.getTotal(id);
        });
      },
      getTotal(id) {
        let _t = this;
        let param = {
          [this.model]: _t.extraParam,
          customer: {id: id},
          product: _t.productParam
        };
        count(param, res => {
          _t.total = parseInt(res);
        });
      },
      handleRowClick(row) {
        this.$router.push({path: '/order/orderDetail/' + row.id})
      },
      toOrderDetail(id) {
        this.$router.push({path: '/order/orderDetail/' + id})
      },
      handleCurrentChange(val) {
        this.page = val;
        this.search(this.page, this.id);
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.search(this.page, this.id);
      }
    },
    components: {
      Search
    },
    created() {
      this.id = this.$route.params.id
      this.search(1, this.id);
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

  .title {
    color: white;
    margin-right: 20px;
  }

  .addProcessSequence {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }

  .el-tree {
    height: 300px;
    overflow: auto;
  }

  ul li {
    box-sizing: border-box;
    list-style: none;
    padding-left: 10px;
    margin: 5px 0;
    cursor: pointer;
  }

  span {
    display: inline-block;
  }

  .connectTitle {
    width: 100px;
    color: #999999;
  }

  .connectText {
    width: 170px;
  }

  .connectBaseInfo p {
    margin-bottom: 8px;
  }

  .processLog {
    margin-left: 30px;

    div {
      margin-bottom: 20px;

      p {
        margin-bottom: 8px;
      }

      .name {
        color: orangered;
        margin-right: 8px;
      }
    }
  }


</style>
