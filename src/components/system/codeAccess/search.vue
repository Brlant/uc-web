<template>

  <div :class="{up:!showSearch}" class="opera-btn-group">
    <div class="opera-icon">
      <div class="pull-right">
        <des-btn class="pull-right" perm="code-access-add" icon="plus" @click="addOrgAccount">添加</des-btn>
      </div>
    </div>
      <el-form class="advanced-query-form" onsubmit="return false">
        <el-row>
<!--          <el-col :span="8">-->
<!--            <oms-form-row :span="5" label="授权单位">-->
<!--              <org-select :list="allOrgList" :remoteMethod="queryUpAllFactory" @change="orgChange"-->
<!--                          placeholder="请输入名称搜索授权单位" v-model="searchCondition.subjectOrgId"></org-select>-->
<!--            </oms-form-row>-->
<!--          </el-col>-->
          <el-col :span="8">
            <oms-form-row :span="5" label="被授权单位">
              <org-select :list="downOrgList" :remoteMethod="queryDownAllFactory"
                          placeholder="请输入名称搜索被授权单位" v-model="searchCondition.objectOrgId"></org-select>
            </oms-form-row>
          </el-col>
          <el-col :span="8">
            <oms-form-row :span="3" label="货品">
              <el-select placeholder="请输入名称搜索货品" v-model="searchCondition.goodsId" filterable clearable
                         popper-class="custom-select" remote :remote-method="queryManageGoodsNew">
                <el-option :label="item.name" :value="item.goodsId" :key="item.id" v-for="item in manageGoods">
                  <manage-goods-option :optionItem="item"/>
                </el-option>
              </el-select>
            </oms-form-row>
          </el-col>
          <el-col :span="8">
            <oms-form-row :span="4" label="">
              <el-button @click="search" plain type="primary">查询</el-button>
              <el-button @click="reset" native-type="reset">重置</el-button>
            </oms-form-row>
          </el-col>
        </el-row>
      </el-form>
  </div>
</template>
<script>
  import methodsMixin from '@/mixins/methodsMixin';

  export default {
    mixins: [methodsMixin],
    data: function () {
      return {
        searchCondition: {
          subjectOrgId: '',
          goodsId: '',
          objectOrgId: ''
        },
        showSearch: false,
        list: [],
        times1: []
      };
    },
    methods: {
      queryManageGoodsNew(query) { // 查询平台货品
        this.manageGoods = [];
        if (!this.searchCondition.objectOrgId) {
          return this.$notify.info({message: '请选择授权单位'});
        }
        let params = {
          orgId: this.searchCondition.objectOrgId,
          deleteFlag: false,
          keyWord: query,
          auditStatus: '1'
        };
        this.queryManageGoods(params);
      },
      search() {
        this.$emit('search', this.searchCondition);
      },
      reset() {
        this.searchCondition = {
          subjectOrgId: '',
          goodsId: '',
          objectOrgId: ''
        };
        this.times1 = [];
        this.orgUsers = [];
        this.$emit('search', this.searchCondition);
      },
      orgChange(val) {

      },
      addOrgAccount () {
        this.$emit('addOrgAccount');
      },
      isShow(val) {
        this.showSearch = val;
      }
    }
  };
</script>
