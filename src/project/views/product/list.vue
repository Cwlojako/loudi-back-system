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
              <el-button type="text" size="small" @click="showTreatmentDialog(scope.row.id)">
                疗程管理
              </el-button>
              <el-button type="text" size="small" @click='changeStatus(scope.row.id, scope.row.enabled)'>
                {{scope.row.enabled ? '禁用' : '启用'}}
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
          <el-input v-model="productFormData.name" placeholder='请输入产品名称'></el-input>
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
            {{tag.value || tag.name}}
          </el-tag>
          <!-- 建议输入框 -->
          <el-autocomplete
            v-if="inputVisible && isShowAdd"
            class="inline-input"
            v-model="deviceModelName"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @select="handleSelect"
          ></el-autocomplete>
          <!-- 标签 -->
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
       <el-button type="primary" @click="addOrEditProduct(isEdit)">确 定</el-button>
      </span>
    </el-dialog>

    <!--  疗程管理对话框  -->
    <el-dialog
      title="疗程管理"
      :visible.sync="treatmentManageShow"
      width="85%"
      @close='handleCloseTreament'>
      <el-form :model="addTreatmentFormData" inline>
        <el-row v-for="(item, index) in addTreatmentFormData.items" :key="index" class="treatment-item">
          <span class="treatment-item-title">疗程{{index + 1}}</span>
          <el-form-item>
            <div class='title'>下次提醒时间(天)</div>
            <el-input v-model="item.intervalDay" placeholder="下次提醒时间(天)"></el-input>
          </el-form-item>
          <el-form-item>
            <div class='title'>能量(J)</div>
            <el-input v-model="item.energy" placeholder="能量(J)"></el-input>
          </el-form-item>
          <el-form-item>
            <div class='title'>频率(HZ)</div>
            <el-input v-model="item.frequency" placeholder="频率(HZ)"></el-input>
          </el-form-item>
          <el-form-item>
            <div class='title'>制冷等级(级)</div>
            <el-input v-model="item.refrigerationLevel" placeholder="制冷等级(级)"></el-input>
          </el-form-item>
          <el-form-item>
            <div class='title'>发光次数(次)</div>
            <el-input v-model="item.flashTimes" placeholder="发光次数(次)"></el-input>
          </el-form-item>
          <el-form-item>
            <div class='title'>操作时长(分钟)</div>
            <el-input v-model="item.duration" placeholder="操作时长(分钟)"></el-input>
          </el-form-item>
          <el-form-item>
            <div class='title'>正常范围(%)</div>
            <el-input v-model="item.mildThreshold" placeholder="正常范围(%)"></el-input>
          </el-form-item>
          <el-form-item>
            <div class='title'>一般异常(%)</div>
            <el-input v-model="item.moderateThreshold" placeholder="一般异常(%)"></el-input>
          </el-form-item>
          <el-form-item>
            <div class='title'>中度异常(%)</div>
            <el-input v-model="item.severeThreshold" placeholder="中度异常(%)"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="info" @click="deleteTreatment(index)" size="small">删除</el-button>
          </el-form-item>
        </el-row>
      </el-form>
      <div class="btn-wrapper">
        <el-button style="background: rgb(0, 161, 108);border: none" icon="el-icon-plus" type="primary"
                  class="addTreatment" @click="addTreatment" :disabled='addTreatmentFormData.items.length >= 6'>添加疗程
        </el-button>
      </div>
      <div class="tip">注：最多只能设置6个疗程，设备参数为选填项，若不设置异常范围则不提醒</div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="handleCloseTreament">取 消</el-button>
    <el-button type="primary" @click="handleAddTreatment">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
  import Search from "@/framework/components/search";
  import { findAll, findById, update, save, changeStatus } from '@/project/service/product'
  import { searchOneByProduct } from '@/project/service/treatment'
  import { find } from '@/project/service/deviceModel'

  export default {
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
        productFormData: {
          name: '',
          gender: '',
          coursePrice: 0,
          singlePrice: 0,
          deviceModel: {},
          limited: null
        },
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
        // 机型搜索参数对象
        deviceModelParam: {},
        // 搜索组件配置项
        searchItems: [
          {
            name: "产品名称",
            key: "name",
            type: "string"
          },
          {
            name: "性别",
            key: "gender",
            type: "select",
            displayValue: ["男", "女"],
            value: ["男", "女"]
          },
          {
            name: "机型",
            key: "deviceModel",
            type: "select",
            displayValue: [],
            value: []
          }
        ],
        // 机型数组数据
        deviceModelData: [],
        // 机型名称
        deviceModelName: ''
      }
    },
    components: {
      Search
    },
    computed: {
      // 是否显示添加机型按钮
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
      // 关闭疗程管理对话框
      handleCloseTreament() {
        this.addTreatmentFormData.items = []
        this.treatmentManageShow = false
        console.log('sdsd')
      },
      // 关闭产品对话框时触发
      closeProductDialog() {
        this.$refs.productFormRef.resetFields();
      },
      // 显示疗程管理对话框
      showTreatmentDialog(id) {
        this.treatmentManageShow = true;
        // 根据产品id获取疗程信息
        searchOneByProduct({product: {id: id}}, res => {
          for (let i = 0; i < res.length; i++) {
            this.addTreatment()
            this.addTreatmentFormData.items[i] = res[i]
          }
        })
      },
      // 确认添加疗程
      handleAddTreatment() {
        this.treatmentManageShow = false
        console.log(this.addTreatmentFormData)
      },
      // 显示建议输入框
      showSelect() {
        this.inputVisible = true;
      },
      // 显示产品新建--编辑框
      showProductDialog(title, id) {
        this.addOrEditDialogShow = true
        this.dialogTitle = title
        // 每次开启之前先清空标签数组
        this.dynamicTags = []
        if (title === '编辑产品') {
          this.isEdit = true
          this.deviceModelName = ''
          let param = {
            id: id
          }
          // 根据产品id获取产品信息
          findById(param, res => {
            console.log(res)
            this.productFormData = res
            // 处理limited参数
            this.productFormData.limited = res.limited ? '是' : '否'
            // 处理适用机型
            this.dynamicTags.push(res.deviceModel)
          })
        } else {
          console.log(this.productFormData)
        }
      },
      handleCloseTag(tag) {
        this.deviceModelName = ''
        this.dynamicTags.splice(0, 1)
      },
      // 提示输入框每一次输入值都会根据值去筛选符合的值
      querySearch(queryString, cb) {
        var deviceModelData = this.deviceModelData
        var results = queryString ? deviceModelData.filter(this.createFilter(queryString)) : deviceModelData
        // 调用 callback 返回建议列表的数据
        cb(results)
      },
      // 根据输入关键词返回过滤后符合条件的数据
      createFilter(queryString) {
        return (data) => {
          return (data.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      // 确认选择适用机型后执行的操作
      handleSelect(item) {
        this.inputVisible = false
        this.dynamicTags.push(item)
        // 修改表单对象绑定的机型数据
        this.productFormData.deviceModel = item
        this.deviceModelName = item.name
      },
      // 确认新建或更新产品信息
      addOrEditProduct(isEdit) {
        if (isEdit) {
          // 处理limited参数
          this.productFormData.limited = this.productFormData.limited === '是'
          // 确认更新，调用更新产品信息接口
          this.$refs.productFormRef.validate(valid => {
            if (!valid) return false
            console.log(this.productFormData)
            update({product: this.productFormData}, res => {
              this.addOrEditDialogShow = false
              // 重新获取数据
              this.search(1)
              this.$message({
                type: 'success',
                message: '更新产品信息成功'
              })
            })
          })
        } else {
          // 新增产品
          this.productFormData.deviceModel.name = this.productFormData.deviceModel.value
          delete this.productFormData.deviceModel.value
          save({product: this.productFormData}, res => {
            this.treatmentManageShow = true
          })
        }
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
            this.extraParam[keys[i]] = searchItems[keys[i]]
            if (keys[i] === 'deviceModel') delete this.extraParam[keys[i]]
          } else {
            delete this.extraParam[keys[i]];
          }
        }
        // 处理机型参数
        if (searchItems.deviceModel) {
          this.deviceModelParam = {
            'name': searchItems.deviceModel,
          }
        } else {
          delete this.deviceModelParam
        }
        this.search(1);
      },
      toCreate() {
        this.$router.push({path: '/staff/addStaff'});
      },
      // 获取产品列表
      search(page) {
        this.page = page  
        let param = {
          pageable: {
            page: page,
            size: this.pageSize
          },
          [this.model]: this.extraParam,
          deviceModel: this.deviceModelParam
        }
        // 如果参数不需要则清除
        if (JSON.stringify(param.deviceModel) === "{}") delete param.deviceModel
        findAll(param, res => {
          this.productData = res
          this.getTotal()
        })
      },
      getTotal() {
        let param = {
          [this.model]: this.extraParam,
          deviceModel: this.deviceModelParam
        }
        // 如果参数不需要则清除
        if (JSON.stringify(param.deviceModel) === "{}") delete param.deviceModel
        findAll(param, res => {
          this.total = res.length
        })
      },
      // 启禁用
      changeStatus(id, status) {
        let tip = status ? '禁用' : '启用'
        changeStatus({id: id, enable: !status}, res => {
          this.search(1)
          this.$message({
            type: 'success',
            message: `${tip}成功`
          })
        })
      },
      
      // 获取所有机型
      getDeviceModel() {
        let param = {name: ''}
        find(param, res => {
          res.forEach((item, index) => {
            this.searchItems[2].displayValue.push(item.name)
            this.searchItems[2].value.push(item.name)
          })
          // 将机型的name字段改为value字段，因为提醒表单显示默认是显示value值
          this.deviceModelData = res.map((item, index) => {
            let obj =  {
              value: item.name,
              id: item.id,
              description: item.description,
              enabled: item.enabled
            }
            return obj
          })
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
      this.search(1)
      // 获取所有机型列表
      this.getDeviceModel()
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
  }
  .treatment-item {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    .treatment-item-title {
      flex: 0 0 50px;
      line-height: 50px;
      margin-right: 10px;
    }
    .el-form-item {
      flex: 1;
      .title {
        text-align: center;
      }
    }
  }
</style>
