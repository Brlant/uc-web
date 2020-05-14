<style lang="scss" scoped>

  .el-form .el-select {
    display: block;
  }

  .d-table-right {
    .org-name-h2 {
      font-size: 16px;
      font-weight: bold;
      display: inline-block;
    }
  }

  .d-table-col-wrap {
    overflow: auto;
  }

  .empty-info {
    margin-top: 40px;
  }

  .table {
    margin-bottom: 0;
  }

  .mtp-5 {
    margin: 5px 0;
  }
</style>
<template>
  <div>
    <div>
      <search-part @search="search" @addOrgAccount="addOrgAccount"/>
      <el-table style="width: 100%" header-row-class-name="table-header-color"
                :data="dataRows"  v-loading="loadingRightData">
        <el-table-column prop="name" label="姓名" min-width="70">
          <template slot-scope="scope">
            {{scope.row.name}}
            <el-tag type="success" v-show="scope.row.adminFlag">主账号</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="角色" min-width="120">
          <template slot-scope="scope">{{ scope.row.list | formatRole }}</template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号码" min-width="100"></el-table-column>
        <el-table-column prop="email" label="邮箱" min-width="120"></el-table-column>
        <el-table-column prop="orgName" label="所属单位" min-width="100"></el-table-column>
        <el-table-column prop="status" label="状态" width="70">
          <template slot-scope="scope">
            <dict :dict-group="'orgUserStatus'" :dict-key="formatStatus(scope.row.status)"></dict>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="操作" min-width="200">
          <template slot-scope="scope">
            <des-btn perm="mdm-manufacture-oms-org-user-edit" icon="edit" @click="editOrgAccount(scope.row)">编辑</des-btn>
            <des-btn perm="system-setting-account-manager-stop" icon="forbidden" custom @click="forbid(scope.row)"
                     v-show="scope.row.status!== '2'">
              停用
            </des-btn>
            <des-btn perm="system-setting-account-manager-start" icon="start" custom @click="useNormal(scope.row)"
                     v-show="scope.row.status=== '2'">
              启用
            </des-btn>
            <des-btn perm="show" icon="detail" custom @click="showUserItem(scope.row)">
              查看
            </des-btn>
          </template>
        </el-table-column>
      </el-table>
      <div class="text-center" v-show="dataRows.length">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="pager.currentPage"
                       :page-sizes="[20,50,100]" :page-size="20" layout="total, sizes, prev, pager, next, jumper"
                       :total="pager.count">
        </el-pagination>
      </div>
    </div>
    <page-right :show="showUserRight" @right-close="resetRightBox">
      <user-form :formItem="form" :title="userTitle" :action="action" :actionType="showUserRight"
                 @close="showUserRight=false" :orgId="currentItem.id"
                 @change="userChange"></user-form>
    </page-right>
    <page-right :show="showRight" @right-close="resetRightBox">
      <show-form :formItem="form" :show="showRight"></show-form>
    </page-right>
  </div>

</template>
<script>
  import {Access, OrgUser, User} from '@/resources';
  import UserForm from './form/user';
  import showForm from './form/show';
  import SearchPart from './search';
  export default {
    components: {
      UserForm,
      showForm,
      SearchPart
    },
    data: function () {
      return {
        showRight: false,
        showTypeSearch: false,
        showUserRight: false,
        showSearch: false,
        dataRows: [],
        showTypeList: [],
        keyTxt: '',
        form: {list: [{roleId: ''}]},
        formTitle: '新增',
        userTitle: '新增',
        oldItem: {},
        action: 'add',
        filter: {
          status: '',
          keyWord: ''
        },
        pager: {
          currentPage: 1,
          count: 0,
          pageSize: 20,
          totalPage: 1
        },
        orgName: '', // 单位名称
        currentItem: {}, //  左边列表点击时，添加样式class
        isInit: true,
        orgNo: '',
        roleList: [],
        loadingData: false,
        loadingRightData: false
      };
    },
    computed: {
      bodyHeight: function () {
        let height = parseInt(this.$store.state.bodyHeight, 10);
        height = (height + 100) + 'px';
        return height;
      },
      tableHeight: function () {
        let height = parseInt(this.$store.state.bodyHeight, 10);
        return height + 60;
      },
      sys() {
        let sysList = this.$store.state.systemList;
        let sys = sysList.find(f => f.systemId === this.$route.meta.systemId);
        return sys || {};
      },
    },
    mounted() {
      this.getOrgPage(1);
    },
    filters: {
      formatRole: function (list) {
        return list.map(m => m.title).join('，');
      }
    },
    methods: {
      search(val) {
        this.filter = Object.assign({}, this.filter, val);
        this.getOrgAccountList(1);
      },
      scrollLoadingData(event) {
        this.$scrollLoadingData(event);
      },
      resetRightBox: function () {
        this.showRight = false;
        this.showUserRight = false;
      },
      searchType: function () {
        this.showTypeSearch = !this.showTypeSearch;
      },
      getOrgPage: function (pageNo) {
        this.getOrgAccountList(pageNo)
      },
      getMore: function () {
        this.$store.commit('initBottomLoading', true);
        this.getOrgPage(this.pager.currentPage + 1, true);
      },
      // 查询账户
      getOrgAccountList: function (pageNo) {
        this.pager.currentPage = pageNo;
        let data = Object.assign({}, {
          pageNo: pageNo,
          pageSize: this.pager.pageSize,
          keyWord: this.keyTxt
        }, this.filter);
        this.loadingRightData = true;
        OrgUser.queryAllTag(data).then(res => {
          this.loadingRightData = false;
          this.dataRows = res.data.list;
          this.pager.count = res.data.count;
        });
      },
      handleSizeChange(val) {
        this.pager.pageSize = val;
        this.getOrgAccountList(1);
      },
      handleCurrentChange(val) {
        this.getOrgAccountList(val);
      },
      formatStatus: function (value) {
        if (!value) return '';
        return value.toString();
      },
      // 添加账户
      addOrgAccount: function () {
        this.form = {};
        this.showUserRight = true;
        this.userTitle = '新增';
      },
      editOrgAccount(item) {
        this.form = JSON.parse(JSON.stringify(item));
        this.showUserRight = true;
        this.userTitle = '编辑';
      },
      showUserItem(item) {
        this.form = JSON.parse(JSON.stringify(item));
        this.showRight = true;
      },
      // 停用用户
      forbid: function (item) {
        this.$confirmOpera(`是否停用账户${item.name}`, () => {
          let itemTemp = JSON.parse(JSON.stringify(item));
          itemTemp.status = '2';
          User.stopUser(itemTemp.id).then(() => {
            item.status = '2';
            this.$notify.success({
              title: '成功',
              message: '已成功停用单位用户"' + itemTemp.name + '"'
            });
          });
        });
      },
      // 启用用户
      useNormal: function (item) {
        this.$confirmOpera(`是否启用账户${item.name}`, () => {
          let itemTemp = JSON.parse(JSON.stringify(item));
          itemTemp.status = '0';
          User.enableUser(itemTemp.id).then(() => {
            item.status = '0';
            this.$notify.success({
              title: '成功',
              message: '已成功启用单位用户"' + item.name + '"'
            });
          });
        });
      },
      userChange() {
        this.getOrgAccountList(this.pager.currentPage);
        this.showUserRight = false;
      },
      showType: function (item) {
        this.orgName = item.name;
        this.currentItem = item;
      }
    }
  };
</script>
