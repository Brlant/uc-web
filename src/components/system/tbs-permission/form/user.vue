<style lang="scss" scoped="">
  .el-form .el-select {
    display: block;
  }
</style>
<template>
  <div>
    <h2 class="clearfix">{{title}}</h2>
    <el-form ref="accountform" :model="form" label-width="100px" :rules="rules"
             @submit.prevent="onSubmit('accountform')" onsubmit="return false">
      <el-form-item label="业务单位" prop="orgId">
        <org-select :list="downOrgList" :remoteMethod="queryDownAllFactory"
                    placeholder="请输入名称搜索业务单位" v-model="form.orgId"></org-select>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <oms-input type="text" v-model="form.name" placeholder="请输入"></oms-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="phone" class="contact-check">
        <oms-input type="text" v-model="form.phone" placeholder="请输入"></oms-input>
      </el-form-item>
      <el-form-item label="Email">
        <oms-input type="text" v-model="form.email" placeholder="请输入"></oms-input>
      </el-form-item>
      <el-form-item label="用户角色">
        <el-select placeholder="请选择" v-model="form.list" multiple>
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
  import {Access, OrgUser, User} from '../../../../resources';
  import methodsMixin from '@/mixins/methodsMixin';

  export default {
    mixins: [methodsMixin],
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
      actionType: {
        type: Boolean,
        default: true
      }
    },
    mounted() {

    },
    data: function () {
      let checkEmail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入邮箱'));
        } else {
          let re = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/ig;
          if (!re.test(value)) {
            callback(new Error('请输入正确的邮箱'));
          }
          User.checkEmail(value, this.form.id, this.form.orgId).then(function (res) {
            if (res.data.valid) {
              callback();
            } else {
              callback(new Error('邮箱已经存在'));
            }
          });
        }
      };
      let checkPhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号码'));
        } else {
          let re = /^\d{11}$/;
          if (!re.test(value)) {
            callback(new Error('请输入正确的手机号码'));
            return;
          }
          User.checkPhone(value, this.form.id, this.form.orgId).then(function (res) {
            if (res.data.valid) {
              callback();
            } else {
              callback(new Error('手机号码已经存在'));
            }
          });
        }
      };
      return {
        roleId: '',
        form: {
          name: '',
          phone: '',
          email: '',
          orgId: '',
          list: []
        },
        rules: {
          name: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请输入手机号码', trigger: 'blur'},
            {validator: checkPhone, trigger: 'blur'}
          ],
          email: [
            {required: true, message: '请输入邮箱地址', trigger: 'blur'},
            {validator: checkEmail, trigger: 'blur'}
          ],
          roleId: [
            {required: true, message: '请输入用户角色', trigger: 'blur'}
          ],
          orgId: [
            {required: true, message: '请选择业务单位', trigger: 'change'}
          ]
        },
        roleSelect: [],
        doing: false
      };
    },
    computed: {
      sys() {
        let sysList = this.$store.state.systemList;
        let sys = sysList.find(f => f.systemId === this.$route.meta.systemId);
        return sys || {};
      },
    },
    watch: {
      formItem: function (val) {
        this.$refs['accountform'].clearValidate();
        if (val.id) {
          this.form = JSON.parse(JSON.stringify(this.formItem));
          this.form.list = this.formItem.list.map(m => m.roleId);
          this.downOrgList = [{
            id: this.form.orgId,
            name: this.form.orgName
          }];
        } else {
          this.form = {
            name: '',
            phone: '',
            email: '',
            list: []
          };
        }
        this.$refs['accountform'] && this.$refs['accountform'].resetFields();
      },
      showRight: function (val) {
        if (!val) {
          this.$refs['accountform'].resetFields();
        }
      },
      sys: {
        handler() {
          this.getRoleSelect();
        },
        immediate: true
      }
    },
    methods: {
      getRoleSelect: function () {
        if(!this.sys || !this.sys.objectId) return;
        let param = Object.assign({}, {
          deleteFlag: false,
          usableStatus: 1
        }, this.filters);
        Access.queryTbsRoles(param).then(res => {
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
          formData.list = self.form.list.map(m => {
            return {
              roleId: m
            };
          });
          if (!this.form.id) {
            OrgUser.save(formData).then(() => {
              this.doing = false;
              this.$notify.success({
                duration: 2000,
                name: '成功',
                message: '新增单位账户"' + self.form.name + '"成功'
              });
              formData.list = this.getSelectRoles(formData, this.roleSelect);
              self.$emit('change', formData);
            }).catch(() => {
              this.$notify.error({
                duration: 2000,
                message: '新增单位账户"' + self.form.name + '"失败'
              });
              this.doing = false;
            });
          } else {
            OrgUser.update(formData.id, formData).then(() => {
              this.doing = false;
              this.$notify.success({
                duration: 2000,
                name: '成功',
                message: '修改单位账户"' + self.form.name + '"成功'
              });
              formData.list = this.getSelectRoles(formData, this.roleSelect);
              self.$emit('change', formData);
            }).catch(() => {
              this.$notify.error({
                duration: 2000,
                message: '修改单位账户"' + self.form.name + '"失败'
              });
              this.doing = false;
            });
          }
        });
      },
      getSelectRoles(formData, roles) {
        return roles.filter(f => formData.list.some(s => s.roleId === f.id)).map(m => {
          return {
            roleId: m.id,
            title: m.title
          };
        });
      },
      doClose: function () {
        this.$emit('close');
        this.$refs['accountform'].resetFields();
      }
    }
  };
</script>
