<template>

  <div :class="{up:!showSearch}" class="opera-btn-group">
    <div class="opera-icon">
      <div class="pull-right">
        <perm label="lantern-org-user-export">
          <el-tooltip content="导出用户角色信息" placement="bottom">
            <a href="#" class="btn-circle" @click.stop.prevent="exportUserRoles">
              <i class="el-icon-t-download"></i>
            </a>
          </el-tooltip>
        </perm>
        <des-btn class="pull-right" perm="mdm-manufacture-oms-org-user-add" icon="plus" @click="addOrgAccount">添加
        </des-btn>
      </div>
    </div>
    <el-form class="advanced-query-form" onsubmit="return false">
      <el-row>
        <el-col :span="8">
          <oms-form-row label="业务单位" :span="6">
            <el-select filterable remote placeholder="请输入名称搜索业务单位" :remote-method="queryDownAllFactory"
                       :clearable="true" @click.native="queryDownAllFactory('')"
                       v-model="searchCondition.orgId" popperClass="good-selects">
              <el-option :value="org.id" :key="org.id" :label="org.name" v-for="org in downOrgList">
                <div>
                  <span style="clear:right;float:left">{{ org.name }}</span>
                  <span class="select-other-info" style="margin-top: 8px;padding-left:20px;float:right">
                      <span>系统代码:</span>{{ org.manufacturerCode }}
                  </span>
                </div>
              </el-option>
            </el-select>
          </oms-form-row>
        </el-col>
        <el-col :span="8">
          <oms-form-row :span="7" label="关键词搜索">
            <el-input placeholder="关键词搜索" v-model="searchCondition.keyWord" @change="search"></el-input>
          </oms-form-row>
        </el-col>
        <el-col :span="8">
          <oms-form-row :span="7" label="手机号">
            <el-input placeholder="请输入手机号搜索" v-model="searchCondition.phone" @change="search"></el-input>
          </oms-form-row>
        </el-col>
      </el-row>
      <el-row class="mt-10">
        <el-col :span="8">
          <oms-form-row :span="6" label="用户状态">
            <el-radio-group v-model="searchCondition.status" size="small">
              <el-radio-button label="1">正常</el-radio-button>
              <el-radio-button label="2">停用</el-radio-button>
              <el-radio-button label="0">未激活</el-radio-button>
            </el-radio-group>
          </oms-form-row>
        </el-col>
        <el-col :span="8">
          <oms-form-row :span="7" label="">
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
import utils from '@/tools/utils';

export default {
  mixins: [methodsMixin],
  data: function () {
    return {
      searchCondition: {
        status: '',
        orgId: '',
        keyWord: '',
        phone: ''
      },
      showSearch: false,
      list: [],
      times1: []
    };
  },
  watch: {
    '$route'() {
      this.reset();
    },
    'searchCondition.status'() {
      this.search();
    },
    'searchCondition.orgId'() {
      this.search();
    },
    'searchCondition.phone'() {
      this.search();
    }
  },
  computed: {
    sys() {
      let sysList = this.$store.state.systemList;
      let sys = sysList.find(f => f.systemId === this.$route.meta.systemId);
      return sys || {};
    }
  },
  methods: {
    exportUserRoles() {
      this.$store.commit('initPrint', {
        isPrinting: true,
        moduleId: this.$route.path,
        text: '拼命导出中'
      });
      let params = {};
      params = Object.assign({}, params, this.searchCondition);
      this.$http.get('/dhs/user/org-role/export', {params}).then(res => {
        utils.download(res.data.path);
        this.$store.commit('initPrint', {
          isPrinting: false,
          moduleId: this.$route.path,
          text: '拼命导出中'
        });
      }).catch(error => {
        this.$store.commit('initPrint', {
          isPrinting: false,
          moduleId: this.$route.path,
          text: '拼命导出中'
        });
        this.$notify({
          duration: 2000,
          title: '无法打印',
          message: error.response.data.msg,
          type: 'error'
        });
      });
    },
    queryManageGoodsNew(query) { // 查询平台货品
      this.manageGoods = [];
      if (!this.searchCondition.orgId) {
        return this.$notify.info({message: '请选择授权单位'});
      }
      let params = {
        orgId: this.searchCondition.orgId,
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
        status: '',
        orgId: '',
        keyWord: '',
        phone: ''
      };
      this.times1 = [];
      this.orgUsers = [];
      this.$emit('search', this.searchCondition);
    },
    orgChange(val) {

    },
    addOrgAccount() {
      this.$emit('addOrgAccount');
    },
    isShow(val) {
      this.showSearch = val;
    }
  }
};
</script>
