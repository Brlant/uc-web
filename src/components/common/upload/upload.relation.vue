<template>
  <div>
    <oms-el-upload
      :action="uploadUrl"
      :before-upload="beforeAvatarUpload"
      :data="uploadData"
      :file-list="fileLists"
      :formData="formData"
      :list-type="type"
      :multiple="multiple"
      :on-change="changeFile"
      :on-error="error"
      :on-preview="handlePreview"
      :on-progress="showProgress"
      :on-remove="handleRemove"
      :on-success="success"
      :show-file-list="showFileList"
      class="upload-demo"
      name="file"
      ref="upload">
      <el-button size="small" slot="trigger" type="primary">{{ uploadName }}</el-button>
      <div class="el-upload__tip" slot="tip" v-show="uploadTip">{{uploadTip}}</div>
    </oms-el-upload>
    <upload-list :files=uploadingFiles :list-type="type" @remove="cancelUpload"
                 style="padding-bottom:10px;" v-if="!showFileList"></upload-list>
  </div>
</template>

<script>
  import {OmsAttachment} from '@/resources';
  import UploadList from './upload.file.list.vue';
  import OmsElUpload from './upload/src/index.vue';

  export default {
    name: 'omsUploadRelation',
    components: {UploadList, OmsElUpload},
    props: {
      fileList: {
        type: Array,
        default: function () {
          return [];
        }
      },
      objectId: {
        type: String
      },
      objectType: {
        type: String
      },
      type: {
        type: String,
        default: 'text'
      },
      showFileList: {
        type: Boolean,
        default: true
      },
      multiple: {
        type: Boolean,
        default: true
      },
      uploadName: {
        type: String,
        default: '选取文件'
      },
      uploadTip: {
        type: String,
        default: ''
      },
      accept: String,
      formData: {
        type: Object
      },
      uploadUrl: {
        type: String,
        default: ''
      },
      deleteUrl: {
        type: String,
        default: ''
      },
      clearUploadFiles: Function
    },

    data() {
      return {
        fileLists: this.fileList,
        object: {
          objectId: this.objectId,
          objectType: this.objectType
        },
        dialogImageUrl: '',
        dialogVisible: false,
        uploadData: {},
        uploadingFiles: []
      };
    },
    watch: {
      fileList: function (val) {
        val.forEach(file => {
          file.url = file.attachmentStoragePath;
          file.name = file.attachmentFileName;
        });
        this.fileLists = val;
      },
      objectId: function (val) {
        this.object.objectId = val;
      },
      objectType: function (val) {
        this.object.objectType = val;
      }
    },

    methods: {
      changeFile: function (file, fileList) {
        if (file.response) {
          file.attachmentId = file.response.attachmentId;
          file.attachmentFileName = file.response.fileName;
        }
        this.$emit('change', fileList);
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        this.$emit('change', fileList);
        if (!file || file && !file.attachmentId) return;
        let http = this.deleteUrl ? this.$http.delete(this.deleteUrl + '\\' + file.attachmentId)
          : OmsAttachment.delete(file.attachmentId);
        http.then(() => {
          this.$notify.success({
            duration: 2000,
            title: '成功',
            message: '已成功删除附件'
          });
        }).catch(() => {
          this.$notify.error({
            duration: 2000,
            message: '删除失败'
          });
        });
      },
      handlePreview(file) {
        this.$store.commit('changeAttachment', file.attachmentId);
      },
      beforeAvatarUpload(file) {
        if (this.accept) {
          if (this.accept !== file.name.substring(file.name.lastIndexOf('.') + 1)) {
            this.$notify.info({
              message: '请选择xml类型文件'
            });
            return false;
          }
        }
        this.uploadingFiles.push(file);
      },
      success(response, file, fileList) {
        this.uploadingFiles = this.uploadingFiles.filter(item => item.uid !== file.uid);
        if (response) {
          if (response.state === 'FAIL') {
            this.$notify.error({
              duration: 2000,
              message: response.message
            });
            this.fileLists = fileList.filter(item => item.uid !== file.uid);
            this.clearUploadFiles && this.clearUploadFiles();
          } else {
            if (fileList.filter(f => f.name === file.name).length > 1) {
              this.$notify.info({message: `${file.name}已经存在，正在删除重复的文件`});
              this.fileLists = fileList.filter(item => item.uid !== file.uid);
            } else {
              this.$notify.success({
                duration: 2000,
                message: '上传附件成功'
              });
            }
            this.$emit('refreshCodes');
          }
        } else {
          this.$notify.error({
            duration: 2000,
            message: '上传附件失败'
          });
          this.clearUploadFiles && this.clearUploadFiles();
        }
      },
      error(err) {
        this.$notify.error({
          duration: 2000,
          message: '上传附件失败' + err
        });
      },
      showProgress(event, file, fileList) {
        if (!file) return;
        this.$emit('isProgress', file);
        let index = -1;
        for (let i = 0, len = this.uploadingFiles.length; i < len; i++) {
          if (file.uid === this.uploadingFiles[i].uid) {
            index = i;
          }
        }
        if (index !== -1) {
          this.uploadingFiles.splice(index, 1, file);
        }
      },
      cancelUpload: function (file) {
        this.$refs['upload'].abort(file);
        this.uploadingFiles = this.uploadingFiles.filter(item => item.uid !== file.uid);
      }
    }

  };
</script>
