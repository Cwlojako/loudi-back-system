<template>
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
        <el-button type="primary" @click="batchDeal"
                   :disabled="selectList.findIndex(s=>{return s.status === '已处理'}) >=0 || selectList.length === 0">
          标记已处理
        </el-button>
        <el-button icon="el-icon-delete" @click="batchDelete">删除</el-button>
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
      <el-table :data="data" style="width: 95%;margin:0 auto;"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="messageId" label="消息ID"></el-table-column>
        <el-table-column prop="content" label="内容"></el-table-column>
        <el-table-column prop="type" label="消息类型"></el-table-column>
        <el-table-column prop="createAt" label="提醒时间"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column fixed="right" align="center"   label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click.stop="handleStatusChange(scope.row)" type="text" size="small" v-if="scope.row.status === '待处理'">标记已处理</el-button>
            <el-button type="text" size="small" v-else disabled>已处理</el-button>
            <el-button @click.stop="deleteMessage(scope.row.id)" type="text" size="small" v-if="scope.row.status === '已处理'" style="color: #e80000;">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>
<script>
  import Search from "@/framework/components/search";
  import Emitter from '@/framework/mixins/emitter'
  // import {search, count, del, batchDelete ,enable, close, batchClose} from '@/project/service/advice'

  export default {
    name: 'messageCenterList',
    mixins: [Emitter],
    data() {
      return {
        model: "advice",
        editId: 0,//编辑id
        data: [],
        selectList: [],
        sort: {asc: [], desc: []},
        pageSize: 10,
        page: 1,
        total: 0,
        extraParam: {},
        searchItems: [
          {
            name: "消息类型",
            key: "type",
            type: "select",
            displayValue: [],
            value: []
          },
          {
            name: "提醒时间",
            key: "createAt",
            type: "datetimerange"
          },
          {
            name: "状态",
            key: "status",
            type: "select",
            displayValue: [],
            value: []
          }
        ]
      };
    },
    components: {
      Search,
    },
    methods: {
      searchBySearchItem(searchItems) {
        let keys = [];
        for (
          let i = 0,searchItemList = this.searchItems,len = searchItemList.length;
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
        //有时间段搜索进行转化字段
        if (this.extraParam.createAt) {
          this.extraParam.startCreateAt = this.extraParam.createAt[0];
          this.extraParam.endCreateAt = this.extraParam.createAt[1];
          delete this.extraParam.createAt;
        } else {
          delete this.extraParam.startCreateAt;
          delete this.extraParam.endCreateAt;
        }
        this.search(1);
      },
      search(page) {
        let _t = this;
        _t.page = page;
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
            let idList = selectList.map(s => {
              return s.id;
            });
            batchDelete({idList:idList},res => {
              this.$message.success('删除成功');
              this.search(this.page);
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        });
      },
      //批量处理
      batchDeal() {
        let _t = this;
        let selectList = this.selectList;
        this.$confirm('确定处理所选的记录吗?', '启用提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let idList = selectList.map(s => {
            return s.id
          });
          batchClose({idList:idList},res => {
            _t.$message.success('已处理');
            _t.search(this.page);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      deleteMessage(id) {
        let _t = this;
        this.$confirm('确定删除所选记录吗?', '删除提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          del({id: id}, res => {
            _t.$message.success('删除成功');
            _t.search(_t.page)
          });
        })
      },
      handleSelectionChange(val) {
        this.selectList = val;
      },
      toDetail(row) {
        this.$router.push({path: '/advice/show/' + row.id})
      },
      handleCurrentChange(val) {
        this.page = val;
        this.search(this.page);
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.search(this.page);
      },
      handleStatusChange(row) {
        close({id:row.id},res => {
          this.$message.success('已处理');
          this.search(this.page);
        })
      }
    },
    mounted() {
      this.search(1);
    }
  };
</script>
<style lang="less" scoped>
</style>
