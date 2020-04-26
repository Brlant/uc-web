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
<!--      <el-form-item label="授权单位" prop="subjectOrgId">-->
<!--        <org-select :list="allOrgList" :remoteMethod="queryUpAllFactory"-->
<!--                    placeholder="请输入名称搜索授权单位" v-model="form.subjectOrgId"></org-select>-->
<!--      </el-form-item>-->
      <el-form-item label="被授权单位" prop="objectOrgId">
        <org-select :list="downOrgList" :remoteMethod="queryDownAllFactoryNew"
                    placeholder="请输入名称搜索被授权单位" v-model="form.objectOrgId"></org-select>
      </el-form-item>
      <el-form-item label="货品" prop="goodsIdList">
        <el-select placeholder="请输入名称搜索货品" v-model="form.goodsIdList" filterable clearable multiple
                   popper-class="custom-select" remote :remote-method="queryManageGoodsNew">
          <el-option :label="item.name" :value="item.goodsId" :key="item.id" v-for="item in manageGoods">
            <div>
              <span class="pull-left">{{ item.name }}({{ item.factoryName }})</span>
              <span class="pull-right select-other-info" v-show="item.typeId">
                      <dict :dict-group="'typeId'" :dict-key="item.typeId"></dict>
                    </span>
            </div>
            <div class="clearfix">
              <span class="select-other-info" v-if="item.code">货品编号:{{ item.code }}</span>
              <span class="ml-10 select-other-info">规格:{{ item.specifications }}</span>
            </div>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label-width="100px">
        <el-button type="primary" @click="onSubmit('accountform')" native-type="submit" :disabled="doing">保存</el-button>
        <el-button @click="doClose">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {traceRight} from '@/resources';
  import methodsMixin from '@/mixins/methodsMixin';

  export default {
    name: 'editForm',
    mixins: [methodsMixin],
    props: {
      formItem: {
        type: Object,
        default: {},
        required: true
      },
      title: {
        type: String,
        default: '增加'
      }
    },
    data: function () {
      return {
        roleId: '',
        form: {
          subjectOrgId: '',
          objectOrgId: '',
          pushOrgId: '',
          goodsId: '',
          goodsIdList: [],
          appKey: ''
        },
        rules: {
          subjectOrgId: [
            {required: true, message: '请选择授权单位', trigger: 'change'}
          ],
          objectOrgId: [
            {required: true, message: '请选择被授权单位', trigger: 'change'}
          ],
          goodsIdList: [
            {required: true, type: 'array', message: '请选择货品', trigger: 'change'}
          ]
        },
        keyList: [],
        doing: false
      };
    },
    watch: {
      formItem: {
        handler(val) {
          this.form = {
            subjectOrgId: this.$store.state.user.userCompanyAddress,
            objectOrgId: '',
            goodsIdList: [],
          };
          this.$nextTick(() => {
            this.$refs['accountform'] && this.$refs['accountform'].clearValidate();
          });
        },
        immediate: true
      }
    },
    methods: {
      queryManageGoodsNew(query) { // 查询平台货品
        this.manageGoods = [];
        if (!this.form.subjectOrgId) {
          return this.$notify.info({message: '请选择授权单位'});
        }
        let params = {
          orgId: this.form.subjectOrgId,
          deleteFlag: false,
          keyWord: query,
          auditStatus: '1'
        };
        this.queryManageGoods(params);
      },
      queryDownAllFactoryNew(query) {
        let params = {
          deleteFlag: false,
          keyWord: query,
          orgAuditStatus: '1'
        };
        this.queryDownAllFactory(params);
      },
      onSubmit: function (formName) {
        let self = this;
        this.$refs[formName].validate((valid) => {
          if (!valid || this.doing) {
            return false;
          }
          this.doing = true;
          let formData = JSON.parse(JSON.stringify(this.form));
          const list = formData.goodsIdList.map(m => {
            const item = Object.assign({}, this.form, {goodsId: m});
            delete item.goodsIdList;
            return item;
          });
          traceRight.save(list).then(() => {
            this.doing = false;
            this.$notify.success({
              duration: 2000,
              message: '新增成功'
            });
            self.$emit('change', formData);
          }).catch((e) => {
            this.$notify.error({
              duration: 2000,
              message: e.response && e.response.data && e.response.data.msg || '新增失败'
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
