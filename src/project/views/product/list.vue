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
            placeholder="请选择机型"
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
      <el-table
          :data="addTreatmentFormData">
          <el-table-column type="index" width="100">
            <template slot-scope='scope'>
              疗程{{scope.$index + 1}}
            </template>
          </el-table-column>
          <el-table-column prop="intervalDay" label="下次提醒时间(天)">
            <template slot-scope='scope'>
              <el-input class='treatment-input' v-model='scope.row.intervalDay'></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="energy" label="能量(J)">
            <template slot-scope='scope'>
              <el-input class='treatment-input' v-model='scope.row.energy'></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="frequency" label="频率(HZ)">
            <template slot-scope='scope'>
              <el-input class='treatment-input' v-model='scope.row.frequency'></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="refrigerationLevel" label="制冷等级(级)">
            <template slot-scope='scope'>
              <el-input class='treatment-input' v-model='scope.row.refrigerationLevel'></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="flashTimes" label="发光次数(次)">
            <template slot-scope='scope'>
              <el-input class='treatment-input' v-model='scope.row.flashTimes'></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="duration" label="操作时长(分钟)">
            <template slot-scope='scope'>
              <el-input class='treatment-input' v-model='scope.row.duration'></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="mildThreshold" label="正常范围(%)">
            <template slot-scope='scope'>
              <el-input class='treatment-input' v-model='scope.row.mildThreshold'></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="moderateThreshold" label="一般异常(%)">
            <template slot-scope='scope'>
              <el-input class='treatment-input' v-model='scope.row.moderateThreshold'></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="severeThreshold" label="中度范围(%)">
            <template slot-scope='scope'>
              <el-input class='treatment-input' v-model='scope.row.severeThreshold'></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="needPhotograph" label="是否需要拍照" align="center">
            <template slot-scope='scope'>
              <el-checkbox v-model='scope.row.needPhotograph'></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope='scope'>
              <el-button type="info" @click="deleteTreatment(scope.$index)" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      <div class="btn-wrapper">
        <el-button style="background: rgb(0, 161, 108);border: none" icon="el-icon-plus" type="primary"
                  class="addTreatment" @click="addTreatment" :disabled='addTreatmentFormData.length >= 6'>添加疗程
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
  import { searchOneByProduct, saveTreatment, deleteById } from '@/project/service/treatment'
  import { find } from '@/project/service/deviceModel'

  export default {
    data() {
      return {
        // 添加疗程管理表格数据
        addTreatmentData:[],
        // 添加疗程表单对象
        addTreatmentFormData: [],
        // 是否是编辑对话框
        isEdit: false,
        inputVisible: false,
        inputValue: '',
        // 当前行的产品id
        productId: '',
        // 产品表单数据
        productFormData: {
          name: '',
          gender: '',
          coursePrice: 0,
          singlePrice: 0,
          deviceModel: {},
          limited: '是'
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
        this.addTreatmentFormData.push({
          intervalDay: '', // 下次提醒时间
          energy: '', // 能量
          frequency: '', // 频率
          refrigerationLevel: '', // 制冷等级
          flashTimes: '', // 发光次数
          duration: '', // 操作时长
          mildThreshold: '', // 正常范围阈值
          moderateThreshold: '', // 一般异常阈值
          severeThreshold: '', // 中度异常阈值
          needPhotograph: '' // 是否需要拍照
        })
      },
      // 删除流程
      deleteTreatment(index) {
        let deleteTreatment = this.addTreatmentFormData.splice(index, 1)
        if (deleteTreatment[0].id) {
          // 如果删除的元素存在id则是需要同步请求
          deleteById({id: deleteTreatment[0].id}, res => {
            this.$message.success('删除成功，请点击确定保存')
          })
        }
        console.log(this.addTreatmentFormData)
      },
      // 关闭疗程管理对话框
      handleCloseTreament() {
        this.addTreatmentFormData = []
        this.treatmentManageShow = false
      },
      // 关闭产品对话框时触发
      closeProductDialog() {
        this.$refs.productFormRef.resetFields();
        this.inputVisible = false
      },
      // 显示疗程管理对话框
      showTreatmentDialog(id) {
        console.log(id)
        this.productId = id
        this.treatmentManageShow = true;
        // 根据产品id获取疗程信息
        searchOneByProduct({product: {id: id}}, res => {
          this.defaultLength = res.length
          this.addTreatmentFormData = res
        })
      },
      // 确认编辑疗程
      handleAddTreatment() {
        for (let i = this.defaultLength, len = this.addTreatmentFormData.length; i < len; i++) {
          let param = Object.assign({product: {id: this.productId}}, this.addTreatmentFormData[i])
          saveTreatment({treatment: param}, res => {
              this.addOrEditDialogShow = false
              this.treatmentManageShow = false
              this.$message.success('添加成功')
              // 刷新产品数据表
              this.search(this.page)
          })
        }
        this.treatmentManageShow = false
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
          this.productFormData.deviceModel.name = this.productFormData.deviceModel.value
          delete this.productFormData.deviceModel.value
          this.$refs.productFormRef.validate(valid => {
            if (!valid) return false
            save({product: this.productFormData}, res => {
              this.showTreatmentDialog(res.id)
            })
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
            size: this.pageSize,
            desc: 'id'
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
  .tip {
    padding: 10px 0;
  }
  .treatment-input {
    width: 80px;
  }
</style>
