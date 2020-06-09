<template>
  <div class="staff">
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
          <el-button style="background: rgb(0, 161, 108);border: none" icon="el-icon-plus" type="primary"
                     @click="showProductDialog('新增产品', 0)">新增
          </el-button>
          <div class="pager-group">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSize"
              layout="total, sizes, pager, jumper, prev, next"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </el-col>
      <!--    表格-->
      <el-col :span="24">
        <el-table
          :data="productData"
          style="width: 95%;margin:0 auto;">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="name" label="产品名称"></el-table-column>
          <el-table-column prop="gender" label="性别"></el-table-column>
          <el-table-column prop="coursePrice" label="疗程价格"></el-table-column>
          <el-table-column prop="singlePrice" label="按次价格"></el-table-column>
          <el-table-column prop="observed" label="是否进入观察期">
            <template slot-scope="scope">
              {{scope.row.observed ? '是' : '否'}}
            </template>
          </el-table-column>
          <el-table-column prop="deviceModel.name" label="机型"></el-table-column>
          <el-table-column prop="employee.realName" label="录入人"></el-table-column>
          <el-table-column prop="enabled" label="状态">
            <template slot-scope="scope">
              {{scope.row.enabled ? '启用' : '禁用'}}
            </template>
          </el-table-column>
          <el-table-column fixed="right" align="center" label="操作" width="240">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="showProductDialog('编辑产品', scope.row.id)">
                编辑
              </el-button>
              <el-button type="text" size="small" @click="showTreatmentDialog">
                疗程管理
              </el-button>
              <el-button type="text" size="small">
                禁用
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <!--  新增或者编辑对话框  -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="addOrEditDialogShow"
      width="40%"
      @close="closeProductDialog">
      <el-form :model="productFormData"
              :rules="productFormRule"
              ref="productFormRef"
              label-width="150px"
              class="demo-ruleForm"
              label-position="left">
        <el-form-item label="产品名称" prop="name">
          <el-input v-model="productFormData.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="productFormData.gender" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="疗程价格" prop="coursePrice">
          <el-input v-model="productFormData.coursePrice"></el-input>&nbsp;元
        </el-form-item>
        <el-form-item label="按次价格" prop="singlePrice">
          <el-input v-model="productFormData.singlePrice"></el-input>&nbsp;元
        </el-form-item>
        <el-form-item label="适用机型" prop="deviceModel">
          <el-tag
            :key="index"
            v-for="(tag, index) in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleCloseTag(tag)">
            {{tag.name}}
          </el-tag>
<!--          <el-select v-model="value" placeholder="请选择" v-if="inputVisible && isShowAdd" @change="handleChange">-->
            <div v-if="inputVisible && isShowAdd">
              <el-radio-group v-model="radio">
                <el-radio :label="3">备选项</el-radio>
                <el-radio :label="6">备选项</el-radio>
                <el-radio :label="9">备选项</el-radio>
              </el-radio-group>
            </div>
          <el-button v-if="!inputVisible && isShowAdd" class="button-new-tag" size="small" @click="showSelect">+ 添加机型</el-button>
        </el-form-item>
        <el-form-item label="是否受疗程次数限制" prop="limited" required>
          <el-radio-group v-model="productFormData.limited">
            <el-radio label="是" value="是"></el-radio>
            <el-radio label="否" value="否"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
       <el-button @click="addOrEditDialogShow = false">取 消</el-button>
       <el-button type="primary" @click="addOrEditDialogShow = false">确 定</el-button>
      </span>
    </el-dialog>

    <!--  疗程管理对话框  -->
    <el-dialog
      title="疗程管理"
      :visible.sync="treatmentManageShow"
      width="85%">
      <el-form :model="addTreatmentFormData" inline>
        <el-row v-for="(item, index) in addTreatmentFormData.items" :key="index" class="treatment-item">
          <span class="treatment-item-title">流程{{index + 1}}</span>
          <el-form-item>
            <el-input v-model="item.intervalDay" placeholder="下次提醒时间(天)"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="item.energy" placeholder="能量(J)"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="item.frequency" placeholder="频率(HZ)"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="item.refrigerationLevel" placeholder="制冷等级(级)"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="item.flashTimes" placeholder="发光次数(次)"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="item.duration" placeholder="操作时长(分钟)"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="item.mildThreshold" placeholder="正常范围(%)"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="item.moderateThreshold" placeholder="一般异常(%)"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="item.severeThreshold" placeholder="中度异常(%)"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="info" @click="deleteTreatment(index)" size="small">删除</el-button>
          </el-form-item>
        </el-row>
      </el-form>
      <div class="btn-wrapper">
        <el-button style="background: rgb(0, 161, 108);border: none" icon="el-icon-plus" type="primary"
                  class="addTreatment" @click="addTreatment">添加流程
        </el-button>
      </div>
      <div class="tip">注：设备参数为选填项，若不设置异常范围则不提醒</div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="treatmentManageShow = false">取 消</el-button>
    <el-button type="primary" @click="handleAddTreatment">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
  import Emitter from '@/framework/mixins/emitter'
  import Search from "@/framework/components/search";
  import {findAll, findById} from '@/project/service/product'

  export default {
    mixins: [Emitter],
    data() {
      return {
        // 添加疗程管理表格数据
        addTreatmentData:[],
        // 添加疗程表单对象
        addTreatmentFormData: {
          items: []
        },
        // 是否是编辑对话框
        isEdit: false,
        inputVisible: false,
        inputValue: '',
        // 产品表单数据
        productFormData:{},
        // 产品表单验证规则
        productFormRule:{
          name: [{required: true, message: '请输入产品名称', trigger: 'blur'}],
          gender: [{required: true, message: '请选择', trigger: 'blur'}],
          coursePrice: [{required: true, message: '请输入疗程价格', trigger: 'blur'}],
          singlePrice: [{required: true, message: '请输入按次名称', trigger: 'blur'}],
          deviceModel: [{required: true, message: '请选择适用机型', trigger: 'blur'}],
          limited: [{required: true, message: '请选择', trigger: 'blur'}]
        },
        dynamicTags: [],
        dialogTitle:'',
        // 控制新增或者编辑对话框的显示与隐藏
        addOrEditDialogShow:false,
        // 控制疗程管理对话框的显示与隐藏
        treatmentManageShow:false,
        model: "product",
        productData: [], // 产品表格数据
        pageSize: 10,
        page: 1,
        total: 0,
        radio: 3,
        extraParam: {},
        // 搜索组件配置项
        searchItems: [
          {
            name: "产品名称",
            key: "username",
            type: "string"
          },
          {
            name: "性别",
            key: "",
            type: "select",
            displayValue: [],
            value: []
          },
          {
            name: "机型",
            key: "",
            type: "select",
            displayValue: [],
            value: []
          }
        ]
      }
    },
    components: {
      Search
    },
    computed: {
      isShowAdd() {
        if (this.dynamicTags.length === 0) {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      // 添加流程
      addTreatment() {
        this.addTreatmentFormData.items.push({
          intervalDay: '',
          energy: '',
          frequency: '',
          refrigerationLevel: '',
          flashTimes: '',
          duration: '',
          mildThreshold: '',
          moderateThreshold: '',
          severeThreshold: ''
        });
      },
      // 删除流程
      deleteTreatment(index) {
        this.addTreatmentFormData.items.splice(index, 1)
      },
      // 关闭产品对话框时触发
      closeProductDialog() {
        this.$refs.productFormRef.resetFields();
      },
      showSelect() {
        this.inputVisible = true;
      },
      handleChange(val) {
        console.log(val)
        this.inputVisible = false
        this.dynamicTags.push({name: 'aa'})
      },
      // 显示产品新建编辑框
      showProductDialog(title, id) {
        this.addOrEditDialogShow = true
        this.dialogTitle = title
        // 每次开启之前先清空标签数组
        this.dynamicTags = []
        if (title === '编辑产品') {
          this.isEdit = true
          let param = {
            id: id
          }
          // 根据产品id获取产品信息
          findById(param, res => {
            this.productFormData = res
            // 处理limited参数
            this.productFormData.limited = res.limited ? '是' : '否'
            // 处理适用机型
            this.dynamicTags.push(res.deviceModel)
          })
        }
      },
      handleCloseTag(tag) {
        let tagId = tag.id
        let index = this.dynamicTags.findIndex(item => {
          return item.id = tagId
        })
        this.dynamicTags.splice(index, 1)
      },
      // 显示疗程管理对话框
      showTreatmentDialog() {
        this.treatmentManageShow = true;
      },
      // 确认添加疗程
      handleAddTreatment() {
        this.treatmentManageShow = false
        console.log(this.addTreatmentFormData)
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
      toCreate() {
        this.$router.push({path: '/staff/addStaff'});
      },
      search(page) {
        let _t = this
        _t.page = page
        let param = {
          pageable: {
            page: page,
            size: _t.pageSize
          },
          [this.model]: _t.extraParam
        }
        findAll(param, res => {
          _t.productData = res
          _t.getTotal()
        })
      },
      getTotal() {
        let _t = this
        let param = {
          [this.model]: _t.extraParam
        }
        findAll(param, res => {
          _t.total = res.length
        })
      },
      handleCurrentChange(val) {
        this.page = val;
        this.search(this.page);
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.search(this.page);
      },
    },
    mounted() {
      this.search(1);
    }
  }
</script>

<style lang="less" scoped>
  .btn-wrapper {
    height: 50px;
    position: relative;
    display: flex;
    align-items: center;
    justify-self: center;
    .addTreatment {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .el-input {
    width: 120px !important;
  }
  .tip {
    padding: 10px 0;
    border-top: 1px solid #ccc;
  }
  .treatment-item {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    height: 50px;
    .treatment-item-title {
      flex: 0 0 50px;
      line-height: 50px;
      margin-right: 10px;
    }
  }
</style>
