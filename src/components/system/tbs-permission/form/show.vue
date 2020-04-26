<style lang="scss" scoped="">
  .el-form .el-select {
    display: block;
  }
</style>
<template>
  <div>
    <h2>用户信息</h2>
    <oms-row label="姓名" :span="5">{{formItem.name}}</oms-row>
    <oms-row label="角色" :span="5" v-if="formItem.list">{{formItem.list.map(m => m.title).join('，')}}</oms-row>
    <oms-row label="手机号码" :span="5">{{formItem.phone}}</oms-row>
    <oms-row label="邮箱" :span="5">{{formItem.email}}</oms-row>
    <oms-row label="状态" :span="5">
      <dict :dict-group="'orgUserStatus'" :dict-key="formItem.status + ''"></dict>
    </oms-row>
    <h2>变更记录</h2>
    <el-table :data="pojoLogList" style="width: 100%" class="table-edit">
      <el-table-column label="修改人" prop="pojoModifyInfoCommitterId">
      </el-table-column>
      <el-table-column label="修改时间" prop="pojoModifyInfoCreateTime">
        <template slot-scope="props">
          {{props.row.pojoModifyInfoCreateTime | time}}
        </template>
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form inline class="demo-table-expand">
            <el-table :data="props.row.list" border style="width: 100%">
              <el-table-column prop="pojoModifyDetailChineseName" label="字段名">
              </el-table-column>
              <el-table-column prop="pojoModifyDetailNew" label="新值">
              </el-table-column>
              <el-table-column prop="pojoModifyDetailOld" label="旧值">
              </el-table-column>
            </el-table>
          </el-form>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {pojoLog} from '@/resources';

  export default {
    props: {
      formItem: {
        type: Object,
        default: {},
        required: true
      },
      show: Boolean
    },
    mounted() {

    },
    data: function () {
      return {
        doing: false,
        pojoLogList: []
      };
    },
    watch: {
      formItem(val) {
        if (!val || !val.id) return;
        this.getUpdateLogList();
      }
    },
    computed: {
      sys() {
        let sysList = this.$store.state.systemList;
        let sys = sysList.find(f => f.systemId === this.$route.meta.systemId);
        return sys || {};
      },
    },
    methods: {
      getUpdateLogList: function () {
        pojoLog.queryPojoLog(this.formItem.id, 'user', {domainObject: this.sys.objectId}).then(res => {
          this.pojoLogList = res.data.list;
        });
      }
    }
  };
</script>
