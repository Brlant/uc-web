<style lang="scss" scoped="">
  .el-form .el-select {
    display: block;
  }
</style>
<template>
  <div>
    <h2 class="clearfix">授权单位角色</h2>
    <el-form ref="accountform" :model="form" label-width="100px" :rules="rules"
             @submit.prevent="onSubmit('accountform')" onsubmit="return false">
      <el-form-item label="用户角色" prop="roleIdList">
        <el-select placeholder="请选择" v-model="form.roleIdList" multiple filterable>
          <el-option :label="item.title" :value="item.id" :key="item.id" v-for="item in roleSelect"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label-width="100px">
        <el-button type="primary" @click="onSubmit('accountform')" native-type="submit">保存</el-button>
        <el-button @click="doClose">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {Access} from '@/resources';

  export default {
    name: 'editForm',
    props: {
      formItem: {
        type: Object,
        default: {},
        required: true
      },
      title: {
        type: String,
        default: '增加'
      },
      action: {
        type: String,
        default: ''
      },
      orgId: {
        type: String,
        default: ''
      },
      actionType: {
        type: Boolean,
        default: true
      },
      roleList: Array
    },
    mounted() {
      this.getRoleSelect();
    },
    data: function () {
      return {
        form: {
          roleIdList: []
        },
        rules: {
          roleIdList: [
            {required: true, type: 'array', message: '请选择角色', trigger: 'change'}
          ]
        },
        roleSelect: [],
        doing: false
      };
    },
    watch: {
      actionType: function (val) {
        this.$refs['accountform'].clearValidate();
        this.form = {
          roleIdList: []
        };
        if (val) {
          this.roleList.forEach(i => {
            this.form.roleIdList.push(i.roleId);
          });
        }
      }
    },
    methods: {
      getRoleSelect: function () {
        // 查询角色列表
        let param = Object.assign({}, {
          keyword: this.typeTxt,
          deleteFlag: false,
          objectId: 'lantern-system'
        });
        Access.query(param).then(res => {
          this.roleSelect = res.data.list;
        });
      },
      onSubmit: function (formName) {
        let self = this;
        this.$refs[formName].validate((valid) => {
          if (!valid || this.doing) {
            return false;
          }
          this.doing = true;
          let formData = JSON.parse(JSON.stringify(this.form));
          formData.orgId = this.orgId;
          formData.domainObjectId = 'lantern-system';
          Access.bandOrgRole(formData).then(res => {
            this.doing = false;
            this.$notify.success({
              duration: 2000,
              name: '成功',
              message: '授权角色成功'
            });
            self.$emit('change', res.data);
          }).catch(e => {
            this.$notify.error({
              duration: 2000,
              message: e.response && e.response.data && e.response.data.msg || '授权角色失败'
            });
            this.doing = false;
          });
        });
      },
      doClose: function () {
        this.$emit('close');
        this.$refs['accountform'].resetFields();
      }
    }
  };
</script>
