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
      <!--    表格-->
      <el-col :span="24">
        <el-table
          :data="treatmentData"
          style="width: 95%;margin:0 auto;">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="username" label="异常程度"></el-table-column>
          <el-table-column prop="realname" label="关联订单编号"></el-table-column>
          <el-table-column prop="customer.realName" label="顾客姓名"></el-table-column>
          <el-table-column prop="device.number" label="机器编号">
          </el-table-column>
          <el-table-column prop="department" label="机器所属市场"></el-table-column>
          <el-table-column prop="employee.realName" label="操作人"></el-table-column>
          <el-table-column prop="product.name" label="产品"></el-table-column>
          <el-table-column prop="responsible" label="疗程阶段"></el-table-column>
          <el-table-column fixed="right" align="center" label="操作" width="240">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="checkDetail(scope.row.id)">
                查看
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <!--  查看异常疗程详细信息对话框  -->
    <el-dialog
      title="详细信息"
      :visible.sync="checkDetailShow"
      width="40%"
      height="50%"
      >
      <div class="checkTable">
        <div class="tableTitle">
            <div>类型</div>
            <div>设定值</div>
            <div>固定值</div>
        </div>
        <div class="tableContent">
          <div>能量</div>
          <div>J</div>
          <div>{{checkDetailData.energy}}J</div>
        </div>
        <div class="tableContent">
          <div>频率</div>
          <div>Hz</div>
          <div>{{checkDetailData.frequency}}Hz</div>
        </div>
        <div class="tableContent">
          <div>制冷等级</div>
          <div>级</div>
          <div>{{checkDetailData.refrigerationLevel}}级</div>
        </div>
        <div class="tableContent">
          <div>发光次数</div>
          <div>次</div>
          <div>{{checkDetailData.flashTimes}}次</div>
        </div>
        <div class="tableContent">
          <div>操作时间</div>
          <div>分钟</div>
          <div>{{checkDetailData.duration}}分钟</div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
       <el-button type="primary" @click="checkDetailShow = false">确 认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Emitter from '@/framework/mixins/emitter'
  import Search from "@/framework/components/search";
  import {find, search, count, get} from '@/project/service/treatmentException'

  export default {
    mixins: [Emitter],
    data() {
      return {

        model: "treatmentException",
        checkDetailShow: false,
        treatmentData: [], // 表格数据
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
            type: "select",
            displayValue: ['一般异常', '中度异常', '严重异常']
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
      checkDetail(id) {
        this.checkDetailShow = true;
        get({id: id},res => {
          //console.log(res)
          let data = res.treatment
          // //this.checkDetailData = res.data.treatment;
          this.checkDetailData = data
          //console.log(this.checkDetailData)
          //把数据对象转换为数组
          // this.checkDetailData = []
          // for (let i in DetailData) {
          //   let obj = {}
          //   obj.type = i
          //   obj.value = DetailData[i]
          //   this.checkDetailData.push(obj)
          // }
          //console.log(this.checkDetailData)
          // for(let key in  data) {
          //   this.checkDetailData
          //   this.checkDetailData.type = key
          //   //this.checkDetailData.data[key] = data[key]
          //
          // }
          // console.log(this.checkDetailData)
        })
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
        console.log(this.extraParam)
        this.search(1);
      },
      search(page) {
        this.page = page;
        let param = {
          pageable: {
            page: page,
            size: this.pageSize
          },
          treatment: {

          },
          //[this.model]: this.extraParam
          customer:{
            realName: this.extraParam.customer
          },
          employee: {
            realName: this.extraParam.employee
          }
        }
        console.log(param)
        find(param, res => {
          let data = res
          this.treatmentData = data
          console.log(this.treatmentData)
          this.getTotal()
        });

      },
      getTotal() {
        let param = {
          [this.model]: this.extraParam
        }
        count(param, res => {
          this.total = parseInt(res)
        })
        console.log(this.total)
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
  .checkTable {
    margin: 0 auto;
    width:100%;
    height: 100%;
    //border: 1px black solid;
    line-height: 30px;
    text-align: center;
    .tableTitle>div{
      //border: 2px  solid;
      width:33%;
      background-color: rgba(198,209,220,0.3);
      float: left;
      line-height: 40px;
      font-weight: bold;
      font-size: 15px;
    }
    .tableTitle:after{
      clear: both;
    }
    .tableContent>div{
      //border: 2px  solid;
      width:33%;
      //background-color: #c6d1dc;
      float: left;
      line-height: 30px;
    }
    .tableContent:after{
      clear: both;
    }
  }
</style>
