<template>
  <div>
    <el-row  class="page">
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
            label="转让日期"
          >
          </el-table-column>
          <el-table-column
            prop="realname"
            label="转让人"
          >
          </el-table-column>
          <el-table-column
            prop="realname"
            label="接收人"
          >
          </el-table-column>
          <el-table-column
            prop="realname"
            label="接收人市场部"
          >
          </el-table-column>
          <el-table-column
            fixed="right"
            align="center"
            label="操作"
            width="260">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="showHistoryDetail">
                查看
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <!--    按钮和分页-->
      <el-col :span="24">
        <div style="width: 95%;margin: 10px auto;">
          <el-button style="background: rgb(0, 161, 108);border: none" type="primary"
                     @click="goBack">返回上一页
          </el-button>
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

    <el-dialog
      title="转交详情"
      :visible.sync="historyDetailShow"
      width="30%">
      <div>
        <el-row>
          <el-col :span="4">
            转让人
          </el-col>
          <el-col :span="20">
            陆国富
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            工号
          </el-col>
          <el-col :span="20">
            4564641
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            部门
          </el-col>
          <el-col :span="20">
            总部>市场部>广东
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            转让原因
          </el-col>
          <el-col :span="20">
            备注原因备注原因备注原因备注原因备注原因备注原因备注原因备注原因备注原因备注原因备注原因
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            接收人
          </el-col>
          <el-col :span="20">
            陈小村
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            工号
          </el-col>
          <el-col :span="20">
            陆国富
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            部门
          </el-col>
          <el-col :span="20">
            总部>市场部>广东
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
       <el-button @click="historyDetailShow = false">关闭</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import Search from "@/framework/components/search";
  import {post} from "@/framework/http/request";
  import {search, count, del, enable, disable} from '@/project/service/manager'

  export default {
    props:['currentScene'],
    data() {
      return {
        historyDetailShow:false,
        // 控制转交给其他人审批对话框的显示与隐藏
        otherPersonCheckShow:false,
        // 转交给其他人审批人员单选数据对象
        radioData:0,
        // 控制查看交接详情对话框的显示与隐藏
        seeConnectDetailShow: false,
        // 全局索引
        globalIndex: 0,
        // 已选择人员数据
        haveSelectedData: [],
        // 最终确定选择人员数据
        endSelectedData: [],
        // 人员搜索值
        searchValue: '',
        // 部门人员数据
        departmentPersonData: [
          '李白1', '李白2', '李白3', '李白4', '李白5', '李白6', '李白7', '李白1', '李白2', '李白3', '李白4', '李白5', '李白6', '李白7'
        ],
        // 部门列表数据
        departmentData: [
          {
            id: 1,
            label: '总部',
            children: [{
              id: 4,
              label: '培训部'
            }, {
              id: 9,
              label: '营销部'
            }, {
              id: 6,
              label: '后勤部'
            }, {
              id: 3,
              label: '人事部'
            }, {
              id: 7,
              label: '市场部',
              children: [{
                id: 13,
                label: '湖南',
                children: [{
                  id: 35,
                  label: '长沙'
                }, {
                  id: 36,
                  label: '常德'
                }, {
                  id: 37,
                  label: '邵阳'
                }, {
                  id: 38,
                  label: '衡阳'
                }, {
                  id: 39,
                  label: '永州'
                }, {
                  id: 40,
                  label: '郴州'
                }]
              }, {
                id: 14,
                label: '广西'
              }, {
                id: 26,
                label: '福建'
              }]
            }]
          }],
        // 部门列表数据配置项
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        // 控制添加审批人对话框的显示与隐藏
        addCheckPersonShow: false,
        // 流程顺序表格数据
        processSequence: [],
        // 新增或者编辑自定义流程表单数据对象
        addOrEditForm: {
          name: '',
          region: ''
        },
        // 新增或者编辑自定义流程表单验证规则
        addOrEditRules: {},
        // 新增或者编辑自定义流程对话框标题
        addOrEditCustomTitle: '新增自定义流程',
        // 控制新增或者编辑自定义流程对话框的显示与隐藏
        addOrEditCustomShow: false,
        // 自定义流程表格数据
        customProcessData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }],
        // 控制自定义流程对话框的显示与隐藏
        customProcessShow: false,
        // 顾客信息搜索配置项
        customerSearchItems: [
          {
            name: "发起市场",
            key: "username",
            type: "string"
          },
          {
            name: "发起人",
            key: "username",
            type: "string"
          }, {
            name: "发起时间",
            key: "accessAt",
            type: "date",
          }],
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
    methods: {
      // 查看转交历史详情
      showHistoryDetail() {
        this.historyDetailShow = true;
      },
      goBack() {
        this.$router.go(-1);
      },
      // 转交给其他人审批
      otherPersonCheck() {
        this.otherPersonCheckShow = true;
      },
      // 确定转交给其他人审批
      confirmOther() {
        let name = '';
        this.departmentPersonData.some((item,index) => {
          if(index === this.radioData) {
            name = item;
          }
        });
        const h = this.$createElement;
        this.$msgbox({
          title: '转交审批',
          message: h('p', null, [
            h('span', null, '是否转交给 '),
            h('span', { style: 'color: orangered' }, name),
            h('span', null, '审批 '),
          ]),
          showCancelButton: true,
          confirmButtonText: '继续',
          cancelButtonText: '取消'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
          this.otherPersonCheckShow = false;
          this.seeConnectDetailShow = false;
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消本次操作'
          });
        });
      },
      // 查看订单交接详情
      seeOrderConnectDetail() {
        this.seeConnectDetailShow = true;
      },
      // 移除列表数据中已选择的人员
      deleteHaveSelected(index) {
        this.endSelectedData.splice(index, 1);
      },
      // 确认最终选择人员
      confirmCheckPerson() {
        this.addCheckPersonShow = false;
        this.endSelectedData = this.haveSelectedData;
        this.haveSelectedData = [];
        // console.log(this.endSelectedData);
        let obj = {
          checkPerson: this.endSelectedData
        };
        this.processSequence.push(obj);
        console.log(this.processSequence);
      },
      // 添加已选择人员
      addHaveSelected(person) {
        console.log(person);
        let obj = {
          index: this.globalIndex,
          person: person
        };
        this.haveSelectedData.push(obj);
        console.log(this.haveSelectedData);
      },
      // 移除已选择人员
      removeHaveSelected(index) {
        this.haveSelectedData.splice(index, 1);
      },
      // 点击部门列表树形节点时
      handleClickTreeNode(data, node, self) {
        console.log(node);
      },
      // 添加审批人
      addCheckPerson(index, scope) {
        this.addCheckPersonShow = true;
        console.log(index);
        this.globalIndex = index;
        console.log(scope);
      },
      // 添加流程
      addProcessSequence() {
        let obj = {
          checkPerson: '',
          // options:'删除'
        };
        this.processSequence.push(obj);
        console.log(this.processSequence)
      },
      // 删除流程
      deleteProcessSequence(scope) {
        console.log(scope.$index);
        this.processSequence.splice(scope.$index, 1);
      },
      // 新增或者编辑自定义流程框
      addOrEditCustom(title) {
        this.addOrEditCustomShow = true;
        this.addOrEditCustomTitle = title;
      },
      // 打开自定义流程对话框
      openCustomProcess() {
        this.customProcessShow = true;
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
    components: {
      Search
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
 .el-row {
   margin-bottom: 20px;
 }
</style>
