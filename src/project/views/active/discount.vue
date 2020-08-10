<template>
  <div class="edit">
    <el-card class="box-card">
      <p class="title">基本信息</p>
      <el-form :model="editFormData" :rules="editFormRule" ref="editFormRef" label-width="120px" class="demo-ruleForm" label-position="left">
        <el-form-item label="活动名称" prop="name" required>
          <el-input v-model="editFormData.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" required>
          <el-col :span="11">
            <el-form-item prop="startAt">
              <el-date-picker type="datetime" placeholder="选择日期" v-model="editFormData.startAt" style="width: 200px;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="结束时间" required>
          <el-col :span="11">
            <el-form-item prop="endAt">
              <el-date-picker type="datetime" placeholder="选择日期" v-model="editFormData.endAt" style="width: 200px;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="生效部门" required>
          <el-tag
            :key="index"
            class='department-tag'
            v-for="(tag, index) in dynamicTags"
            @close='closeTag(tag.id)'
            closable
            :disable-transitions="false">
            {{tag.name}}
          </el-tag>
          <el-button type='default' size="small" @click="showAddDepartment">+ 添加部门</el-button>
        </el-form-item>
        <el-form-item label="活动说明" prop="explain" required>
          <el-input v-model="editFormData.explain" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <p class="title">赠品规则</p>
      <el-form :model="giftFormData" :rules="giftFormRule" ref="editFormRef" label-width="120px" class="demo-ruleForm" label-position="left">
        <el-form-item label="有无赠品">
          <el-radio-group v-model="giftFormData.gift" size="medium">
            <el-radio border label="无"></el-radio>
            <el-radio border label="有"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <p class="title">活动规则</p>
      <el-form :model="activeFormData" :rules="activeFormRule" ref="editFormRef" label-width="120px" class="demo-ruleForm" label-position="left">
        <el-form-item label="优惠形式">
          <el-radio-group v-model="activeFormData.preferential" size="medium">
            <el-radio border label="满减优惠"></el-radio>
            <el-radio border label="固定折扣"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="使用条件" prop="condition" required>
          <el-input v-model="activeFormData.condition"></el-input>
        </el-form-item>
        <el-form-item label="优惠面额" prop="note" required>
          <el-input v-model="activeFormData.note"></el-input>
        </el-form-item>
      </el-form>
      <p class="title">活动产品</p>
      <el-form :model="productFormData" :rules="productFormRule" ref="editFormRef" label-width="120px" class="demo-ruleForm" label-position="left">
        <el-form-item label="促销商品">
          <el-radio-group v-model="productFormData.resource" size="medium">
            <el-radio border label="全部商品"></el-radio>
            <el-radio border label="指定商品"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div style="margin-top: 30px">
        <el-button style="background: rgb(0, 161, 108);border: none"  type="primary" @click="activeSubmit">提交
        </el-button>
        <el-button style="background: rgb(0, 161, 108);border: none"  type="primary" @click="goBack">返回上一页
        </el-button>
      </div>
    </el-card>

    <!--  关联部门对话框  -->
    <el-dialog
      :visible.sync="addDepartmentVisible"
      width="50%"
      title="选择部门"
      @close="handleCloseDepartment"
      class='add-department-wrapper'>
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
       <el-button @click="handleCloseDepartment">取 消</el-button>
       <el-button type="primary" @click="handleAddDepartment">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { getById, removeDepartment,save } from '@/project/service/promotion'
  export default {
    data() {
      return {
        // 活动id
        promotionId: 0,
        editFormData:{
          name: '',
          startAt: '',
          endAt: '',
          explain: ''
        },
        editFormRule:{},
        activeFormData:{
          preferential: ''
        },
        activeFormRule:{},
        giftFormData: {
          gift: ''
        },
        giftFormRule:{},
        productFormData:{
          resource: ''
        },
        productFormRule: {},
        inputVisible: false,
        inputValue: '',
        // 部门标签数组
        dynamicTags: [],
        // 添加部门对话框
        addDepartmentVisible: false
      }
    },
    methods:{
      goBack() {
        this.$router.go(-1);
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        this.inputVisible = false;
        this.inputValue = '';
      },
      // 根据活动id获取活动详细信息
      getById(id) {
        getById({id}, res => {
          this.editFormData = res
          this.promotionId = res.id
          this.dynamicTags = res.departmentList
        })
      },
      // 关闭部门标签，解除活动与该部门关系
      closeTag(departmentId) {
        this.$confirm('确定移除该部门与本活动的关系吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          removeDepartment({promotionId: this.promotionId, departmentId}, res => {
            let index = this.dynamicTags.findIndex(item => item.id === departmentId)
            this.dynamicTags.splice(index, 1)
            this.$message({
              type: 'success',
              message: '移除成功'
            })
            console.log(this.dynamicTags)
          })
        })
      },
      // 显示添加部门弹框
      showAddDepartment() {
        this.addDepartmentVisible = true
      },
      // 关闭添加部门弹框
      handleCloseDepartment() {
        this.addDepartmentVisible = false
      },
      // 确认添加部门
      handleAddDepartment() {

      },
      activeSubmit() {
        let param = {
           activeData : this.activeFormData,
           giftData : this.giftFormData,
           editData : this.editFormData,
           productFormData: this.productFormData
        }
        save({promotion: param}, res => {
            console.log('save')
        })
      }
    },
    created() {
      this.id = this.$route.params.id
      this.getById(this.id)
    }
  }
</script>

<style lang="less" scoped>
  .edit {
    padding: 30px;
    box-sizing: border-box;
    overflow-y: auto;
    overflow-x: hidden;
    .title {
      font-weight: bold;
      margin-top: 10px;
      margin-bottom: 15px;
    }
  }
  .input-new-tag {
    width: 100px;
  }
  .department-tag {
    margin-right: 10px;
  }
  .add-department-wrapper {
    .transfer-wrapper {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
