<template>
  <div>
    <el-row class="page">
      <el-button style="background: rgb(0, 161, 108);border: none" type="primary"
                 class="create" @click="openCustomProcess">自定义审批流程
      </el-button>
      <!--    搜索-->
      <el-col :span="24">
        <search class="search"
          :search-items="customerSearchItems"
          @on-search="customerSearchBySearchItem"
        ></search>
      </el-col>
      <!--    表格-->
      <el-col :span="24">
        <el-table
          :data="customerData"
          @selection-change="handleSelectionChange"
          @row-dblclick="handleRowClick"
        >
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="username"
            label="店家编号"
          >
          </el-table-column>
          <el-table-column
            prop="realname"
            label="店铺名称"
          >
          </el-table-column>
          <el-table-column
            prop="realname"
            label="所属市场"
          >
          </el-table-column>
          <el-table-column
            prop="realname"
            label="发起人"
          >
          </el-table-column>
          <el-table-column
            prop="realname"
            label="发起人市场"
          >
          </el-table-column>
          <el-table-column
            prop="realname"
            label="发起人分公司"
          >
          </el-table-column>
          <el-table-column
            prop="phone"
            label="接收人"
          >
          </el-table-column>
          <el-table-column
            prop="phone"
            label="接收人市场"
          >
          </el-table-column>
          <el-table-column
            prop="phone"
            label="接收人分公司"
          >
          </el-table-column>
          <el-table-column
            prop="phone"
            label="状态"
          >
          </el-table-column>
          <el-table-column
            fixed="right"
            align="center"
            label="操作"
            width="260">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="seeOrderConnectDetail">
                查看
              </el-button>
              <el-button type="text" size="small" v-if="currentScene ==='0'">
                通过
              </el-button>
              <el-button type="text" size="small" v-if="currentScene ==='0'">
                拒绝
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

    <!-- 自定义流程对话框   -->
    <el-dialog
      :visible.sync="customProcessShow"
      width="50%"
    >
      <template slot="title">
        <span class="title">自定义流程</span>
        <el-button type="success" @click="addOrEditCustom('新增自定义流程')">添加</el-button>
      </template>
      <el-table :data="customProcessData">
        <el-table-column property="date" label="流程名称" width="150" align="center"></el-table-column>
        <el-table-column property="date" label="生效范围" width="150" align="center"></el-table-column>
        <el-table-column property="name" label="创建人" width="150" align="center"></el-table-column>
        <el-table-column property="date" label="创建时间" width="150" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="addOrEditCustom('编辑自定义流程')">
              编辑
            </el-button>
            <el-button type="text" size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
    <el-button @click="customProcessShow = false">取 消</el-button>
    <el-button type="primary" @click="customProcessShow = false">确 定</el-button>
  </span>
    </el-dialog>

    <!--  添加或者编辑自定义流程对话框  -->
    <el-dialog
      :title="addOrEditCustomTitle"
      :visible.sync="addOrEditCustomShow"
      width="50%"
    >
      <el-form :model="addOrEditForm" :rules="addOrEditRules" ref="addOrEditRef" label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="流程名称" prop="name">
          <el-input v-model="addOrEditForm.name"></el-input>
        </el-form-item>
        <el-form-item label="生效方式" prop="region">
          <el-select v-model="addOrEditForm.region" placeholder="请选择生效方式">
            <el-option label="指定部门生效" value="shanghai"></el-option>
            <el-option label="指定人员生效" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="抄送人">
        </el-form-item>
        <el-form-item label="流程顺序">
          <template>
            <el-table :data="processSequence">
              <el-table-column type="index" width="150" align="center">
              </el-table-column>
              <el-table-column property="checkPerson" label="审批人" width="500">
                <template slot-scope="scope">
                  <el-tag
                    v-if="endSelectedData.length !== 0 && scope.$index === item.index"
                    v-for="(item,index) in endSelectedData"
                    :key="index"
                    closable
                    style="margin-right: 5px;"
                    @close="deleteHaveSelected(index)"
                  >
                    {{item.person}}
                  </el-tag>
                  <el-button style="background: rgb(0, 161, 108);border: none" icon="el-icon-plus" type="primary"
                             @click="addCheckPerson(scope.$index,scope)">添加
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column property="options" label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="deleteProcessSequence(scope)">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button style="background: rgb(0, 161, 108);border: none" icon="el-icon-plus" type="primary"
                       class="addProcessSequence" @click="addProcessSequence">添加流程
            </el-button>
          </template>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
       <el-button @click="addOrEditCustomShow = false">取 消</el-button>
       <el-button type="primary" @click="addOrEditCustomShow = false">确 定</el-button>
      </span>
    </el-dialog>

    <!--  添加审批人对话框  -->
    <el-dialog
      title="选择员工"
      :visible.sync="addCheckPersonShow"
      width="50%"
    >
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple-dark">
            <el-row>部门列表</el-row>
            <el-row>
              <el-tree :data="departmentData" :props="defaultProps" node-key="id" :default-expanded-keys="[1]"
                       @node-click="handleClickTreeNode"></el-tree>
            </el-row>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple-dark">
            <el-row>员工列表</el-row>
            <el-row style="margin-top: 10px;height: 300px;overflow: auto">
              <el-input placeholder="请输入您要搜索的人员" v-model="searchValue" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
              <ul>
                <li v-for="(item,index) in departmentPersonData" :key="index" @dblclick="addHaveSelected(item)">
                  {{item}}
                </li>
              </ul>
            </el-row>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-dark">
            <el-row>已选择</el-row>
            <el-row style="height: 300px;overflow: auto">
              <el-tag
                v-for="(item,index) in haveSelectedData"
                :key="index"
                closable
                style="margin-right: 100px;margin-top: 10px"
                @close="removeHaveSelected(index)"
              >
                {{item.person}}
              </el-tag>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
       <el-button @click="addCheckPersonShow = false">取 消</el-button>
       <el-button type="primary" @click="confirmCheckPerson">确 定</el-button>
      </span>
    </el-dialog>

    <!--  查看审批详情对话框  -->
    <el-dialog
      title="审批详情"
      :visible.sync="seeConnectDetailShow"
      width="50%"
    >
      <el-row>
        <el-col :span="16">
          <div class="grid-content bg-purple-dark connectBaseInfo">
            <el-row>
              <div>
                <p>
                  <span class="connectTitle">状态</span>
                  <span class="connectText">
                  待<span style="color: orangered">紫大鲸</span>审核
                </span>
                  <span class="connectTitle">发起时间</span>
                  <span class="connectText">2019-12-30  12:30</span>
                </p>
                <p>
                  <span class="connectTitle">发起人</span>
                  <span class="connectText">李白</span>
                  <span class="connectTitle">接收人</span>
                  <span class="connectText">杜甫</span>
                </p>
                <p>
                  <span class="connectTitle">发起人市场</span>
                  <span class="connectText">天河</span>
                  <span class="connectTitle">接收人市场</span>
                  <span class="connectText">番禹</span>
                </p>
                <p>
                  <span class="connectTitle">发起人分公司</span>
                  <span class="connectText">广东</span>
                  <span class="connectTitle">接收人分公司</span>
                  <span class="connectText">广西</span>
                </p>
              </div>
            </el-row>
            <el-row>
              <p style="font-size: 17px;margin: 30px 0 10px">详情</p>
              <div>
                <p>
                  <span class="connectTitle">店铺编号</span>
                  <span class="connectText">1354687945</span>
                  <span class="connectTitle">店家分成比例</span>
                  <span class="connectText">10%</span>
                </p>
                <p>
                  <span class="connectTitle">所属老师</span>
                  <span class="connectText">张学友</span>
                  <span class="connectTitle">老板姓名</span>
                  <span class="connectText">马云</span>
                </p>
                <p>
                  <span class="connectTitle">合作状态</span>
                  <span class="connectText">已合作</span>
                  <span class="connectTitle">老板电话</span>
                  <span class="connectText">13988888888</span>
                </p>
                <p>
                  <span class="connectTitle">跑店人员</span>
                  <span class="connectText">小卡</span>
                  <span class="connectTitle">项目负责人</span>
                  <span class="connectText">郭富城</span>
                </p>
                <p>
                  <span class="connectTitle">结款方式</span>
                  <span class="connectText">月结</span>
                  <span class="connectTitle">负责人联系方式</span>
                  <span class="connectText">15666666666</span>
                </p>
                <p>
                  <span class="connectTitle">详细地址</span>
                  广东省广州市天河区棠安路1号
                </p>
              </div>
            </el-row>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-dark">
            <p style="font-size: 17px;margin-bottom: 10px">流程日志</p>
            <div class="processLog">
              <div>
                <p>2019-12-30 12:30</p>
                <p>
                  <span class="name">邱淑贞</span>审批通过
                </p>
              </div>
              <div>
                <p>2019-12-30 12:30</p>
                <p><span>张曼玉</span>转交</p>
                <p>
                  转交给<span style="color: orangered;margin: 0 5px">邱淑贞</span>审批
                </p>
              </div>
              <div>
                <p>2019-12-30 12:30</p>
                <p><span class="name">林青霞</span>创建审批</p>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="seeConnectDetailShow = false" v-if="currentScene ==='0'">同意</el-button>
       <el-button type="primary" @click="seeConnectDetailShow = false" v-if="currentScene ==='0'">拒绝</el-button>
       <el-button type="primary" @click="otherPersonCheck" v-if="currentScene ==='0'">转给其他人审批</el-button>
       <el-button type="primary" @click="seeConnectDetailShow = false">关闭</el-button>
      </span>
    </el-dialog>

    <!--  转交给其他人审批对话框  -->
    <el-dialog
      title="选择员工"
      :visible.sync="otherPersonCheckShow"
      width="50%"
    >
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple-dark">
            <el-row>部门列表</el-row>
            <el-row>
              <el-tree :data="departmentData" :props="defaultProps" node-key="id" :default-expanded-keys="[1]"
                       @node-click="handleClickTreeNode"></el-tree>
            </el-row>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-dark">
            <el-row>员工列表</el-row>
            <el-row style="margin-top: 10px;height: 300px;overflow: auto">
              <el-input placeholder="请输入您要搜索的人员" v-model="searchValue" class="input-with-select" style="width: 350px">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
              <el-radio-group v-model="radioData">
                <el-radio v-for="(item,index) in departmentPersonData" :key="index" :label="index" style="margin:6px 300px 6px 10px">{{item}}</el-radio>
              </el-radio-group>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
       <el-button @click="otherPersonCheckShow = false">取 消</el-button>
       <el-button type="primary" @click="confirmOther">确 定</el-button>
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
  .search {
    padding: 10px 0;
  }
  .search /deep/ .search-item {
    margin-right: 30px !important;
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
