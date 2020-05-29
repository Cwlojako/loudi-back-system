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
          @row-dblclick="handleRowClick"
        >
          <el-table-column prop="id" label="订单编号"></el-table-column>
          <el-table-column prop="type" label="订单类型"></el-table-column>
          <el-table-column label="顾客名称">XXX</el-table-column>
          <el-table-column prop="id" label="疗程部位">XXX</el-table-column>
          <el-table-column prop="phone" label="手机号码">XXX</el-table-column>
          <el-table-column prop="paymentAmount" label="成交金额"></el-table-column>
          <el-table-column prop="createAt" label="下单时间"></el-table-column>
          <el-table-column fixed="right" align="center" label="操作" width="240">
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
  import {post} from "@/framework/http/request";
  import {findByEmployeeId, count} from '@/project/service/order'

  export default {

    data() {
      return {
        // 订单信息搜索配置项
        orderSearchItems: [
          {
            name: "订单编号",
            key: "id",
            type: "string"
          },
          {
            name: "顾客名称",
            key: "customer",
            type: "string"
          },
          {
            name: "订单类型",
            key: "type",
            type: "select",
            displayValue: ['暂存订单', '已确认订单', '已取消订单'],
            value: ['暂存订单', '已确认订单', '已取消订单']
          },
          {
            name: "产品",
            key: "product",
            type: "string"
          }],
        // 订单表格数据
        orderData: [],
        model: "order",
        pageSize: 10,
        page: 1,
        total: 0,
        // 订单额外搜索参数
        extraParam: {},
        // 顾客搜索参数
        customerParam: {},
        // 产品搜索参数
        productParam: {}
      }
    },
    methods:{
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
          this.customerParam = {
            realName: searchItems.customer
          }
        } else {
          delete this.customerParam
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
      // 根据员工id查询所属订单信息
      search(page, id) {
        let _t = this;
        _t.page = page;
        let param = {
          pageable: {
            page: page,
            size: _t.pageSize,
          },
          [this.model]: _t.extraParam,
          teacher: {id: id},
          customer: _t.customerParam,
          product: _t.productParam
        }
        // 如果没有查询条件则清除携带参数对象
        if (JSON.stringify(param.customer) === "{}") delete param.customer
        if (JSON.stringify(param.product) === "{}") delete param.product
        findByEmployeeId(param, res => {
          _t.orderData = res;
          _t.getTotal(id);
        });
      },
      getTotal(id) {
        let _t = this;
        let param = {
          [this.model]: _t.extraParam,
          teacher: {id: id},
          customer: _t.customerParam,
          product: _t.productParam
        };
        count(param, res => {
          _t.total = parseInt(res);
        });
      },
      // 跳转到订单详情页
      toOrderDetail(id) {
        this.$router.push({path: '/order/orderDetail/' + id})
      },
      handleRowClick(row) {
        this.$router.push({path: '/manager/show/' + row.id})
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
    mounted() {
      this.id = this.$route.params.id
      this.search(1, this.id);
    }
  }
</script>

<style lang="less" scoped>
  .search /deep/ .search-item {
    margin-right: 30px !important;
  }
</style>
