<template>
   <div>
     <div class="upload" v-if="type === 'img'">
       <el-upload
         ref="upload"
         :action="action"
         list-type="picture-card"
         :file-list="defaultList"
         :limit="limit"
         :multiple="multiple"
         :on-preview="handlePictureCardPreview"
         :on-remove="handleRemove"
         :on-success="handleSuccess"
         :on-exceed="handleExceed"
         :beforeUpload="onBeforeUpload"
       >
         <i class="el-icon-plus"></i>
       </el-upload>
       <el-dialog title="查看图片" :visible.sync="dialogVisible"  :modal-append-to-body='false'>
         <img width="100%" :src="dialogImageUrl" alt="">
       </el-dialog>

     </div>
     <div class="upload-file" v-if="type === 'file'">
       <el-upload
         class="upload-demo"
         drag
         :limit="limit"
         action="api/attachment/upload"
         :multiple="multiple"
         :on-remove="handleRemove"
         :on-success="handleSuccess"
         :on-exceed="handleExceed"
         :beforeUpload="onBeforeUpload"
         >
         <i class="el-icon-upload"></i>
         <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>

       </el-upload>
     </div>
   </div>
</template>

<script>

export default {
  name: "SiUpload",
  props:{
    type: {
      type: String,
      default: 'img'
    },
    fileList: {
      type: Array,
      default(){
        return []
      }
    },
    limit: {
      type: Number,
      default: 1
    },
    //上传大小,单位为kb
    maxSize: {
      type: Number,
      default: 1024
    },
    accept: {
      type: String,
      default: 'jpg/png/git/jpeg'
    },
    prefix: {
      type: String,
      default: 'http://47.99.141.16:8001/attachment/'
    },
    action: {
      type: String,
      default: 'api/attachment/upload'
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data(){
     return{
       dialogImageUrl: '',
       dialogVisible: false,
       defaultList:[]
     }
  },
  created(){
    if (this.fileList.length > 0) {
      this.defaultList = this.fileList.map((s,i) => {
        let obj = {
          name: i,
          url:this.prefix + s,
          response:{
            data: s
          }
        };
        return obj;
      });
    }
    this.$on("on-form-submit", () => {
      this.$emit("on-transport-file-list", this.defaultList);
    });
  },
  methods: {
    handleRemove(file, fileList) {
      let index = fileList.findIndex(s=>{
        return s.uid === file.uid;
      });
      this.defaultList.splice(index,1);
    },
    handleSuccess(res,file,fileList) {
      console.log(file)
      this.defaultList.push(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleExceed(file,fileList) {
      this.$notify({
        title: '警告',
        message: `最多只能上传${this.limit}个文件`,
        type: 'warning'
      });
    },
    onBeforeUpload(file) {
      const suffix = file.name.substring(file.name.lastIndexOf('.')+1)
      const isLt2M = file.size / 1024  <  this.maxSize;
      const isLtType = this.accept.indexOf(suffix) >= 0
      if (!isLtType) {
        this.$message({
          message: `上传文件格式必须为${this.accept}`,
          type: 'warning'
        });
      }
      if(!isLt2M) {
        this.$message({
          message: `上传文件大小不能超过${this.maxSize}KB!`,
          type: 'warning'
        });
      }
      return isLt2M && isLtType;
    }
  }

}
</script>

<style scoped>
  .upload /deep/ .el-upload-list__item{
    width: 100px;
    height: 100px;
  }
  .upload /deep/ .el-upload--picture-card{
    width: 100px;
    height: 100px;
    line-height: 106px;
  }
</style>
