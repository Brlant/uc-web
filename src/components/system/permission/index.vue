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
    <div class="d-table-flex">
      <div class="d-table-left">
        <div class="d-table-col-wrap" :style="'height:'+bodyHeight">
          <h2 class="header">
          <span class="pull-right">
              <a href="#" class="btn-circle" @click.prevent="searchType"><i
                class="el-icon-t-search"></i> </a>
          </span>
            TSS单位账户管理
          </h2>
          <el-scrollbar tag="div" class="d-table-left_scroll" @scroll="scrollLoadingData">
            <div class="search-left-box mr-10" v-show="showTypeSearch">
              <oms-input v-model="typeTxt" placeholder="请输入关键字搜索" :showFocus="showTypeSearch"></oms-input>
            </div>
            <div v-if="showTypeList.length===0" class="empty-info">
              暂无信息
            </div>
            <div v-else>
              <ul class="show-list">
                <li v-for="item in showTypeList" class="list-item" @click="showType(item)"
                    :class="{'active':item.id===currentItem.id}">
                  <div class="id-part">
                    系统代码 {{item.manufacturerCode }}
                  </div>
                  <div>
                    {{item.name }}
                  </div>
                </li>
              </ul>
            </div>
          </el-scrollbar>
          <div class="btn-left-list-more">
            <bottom-loading></bottom-loading>
            <div @click.stop="getMore" v-show="!$store.state.bottomLoading">
              <el-button v-show="pager.currentPage<pager.totalPage">加载更多</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="d-table-right">
        <div class="d-table-col-wrap">
          <div>
            <div class="f-owh">
              <h2 class="org-name-h2">单位账户</h2>
              <des-btn class="pull-right" perm="code-org-user-add" icon="plus" @click="addOrgAccount">新增单位账户</des-btn>
            </div>
            <el-table style="width: 100%" header-row-class-name="table-header-color"
                      :data="dataRows" :max-height="tableHeight">
              <el-table-column prop="name" label="姓名" min-width="100">
                <template slot-scope="scope">
                  {{scope.row.name}}
                  <el-tag type="success" v-show="scope.row.adminFlag">主账号</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="角色" min-width="120">
                <template slot-scope="scope">{{ scope.row.list | formatRole }}</template>
              </el-table-column>
              <el-table-column prop="phone" label="手机号码" min-width="100"></el-table-column>
              <el-table-column prop="email" label="邮箱" min-width="150"></el-table-column>
              <el-table-column prop="status" label="状态" width="70">
                <template slot-scope="scope">
                  <dict :dict-group="'orgUserStatus'" :dict-key="formatStatus(scope.row.status)"></dict>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="操作" min-width="120">
                <template slot-scope="scope">
                  <des-btn perm="code-org-user-edit" icon="edit" @click="editOrgAccount(scope.row)">编辑</des-btn>
                  <des-btn perm="code-org-user-edit" icon="forbidden" custom @click="forbid(scope.row)"
                           v-show="scope.row.status!== '2'">
                    停用
                  </des-btn>
                  <des-btn perm="code-org-user-edit" icon="start" custom @click="useNormal(scope.row)"
                           v-show="scope.row.status=== '2'">
                    启用
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
          <!--<div>-->
          <!--<div class="f-owh mtp-5">-->
          <!--<h2 class="org-name-h2">单位角色</h2>-->
          <!--<perm label="code-org-role-add">-->
          <!--<span class="pull-right" @click.stop.prevent="add">-->
          <!--<a href="#" class="btn-circle" @click.prevent="">-->
          <!--<i class="el-icon-t-plus"></i>-->
          <!--</a>-->
          <!--授权单位角色-->
          <!--</span>-->
          <!--</perm>-->
          <!--</div>-->
          <!--<el-table style="width: 100%" header-row-class-name="table-header-color" :data="roleList">-->
          <!--<el-table-column prop="roleName" label="角色" min-width="120"></el-table-column>-->
          <!--<el-table-column prop="name" label="操作" min-width="120">-->
          <!--<template slot-scope="scope">-->
          <!--<des-btn perm="code-org-role-delete" icon="delete" @click="removeRole(scope.row)">删除</des-btn>-->
          <!--</template>-->
          <!--</el-table-column>-->
          <!--</el-table>-->
          <!--</div>-->
        </div>
      </div>
    </div>
    <page-right :show="showRight" @right-close="resetRightBox">
      <role-form :formItem="form" :title="formTitle" :action="action" :actionType="showRight" :orgId="currentItem.id"
                 @close="showRight=false" :roleList="roleList"
                 @change="roleChange"></role-form>
    </page-right>
    <page-right :show="showUserRight" @right-close="resetRightBox">
      <user-form :formItem="form" :title="userTitle" :action="action" :actionType="showUserRight"
                 @close="showUserRight=false" :orgId="currentItem.id"
                 @change="userChange"></user-form>
    </page-right>
  </div>

</template>
<script>
  import {Access, OrgUser, User} from '@/resources';
  import roleForm from './form/role.vue';
  import UserForm from './form/user';

  export default {
    components: {
      roleForm,
      UserForm
    },
    data: function () {
      return {
        showRight: false,
        showTypeSearch: false,
        showUserRight: false,
        showSearch: false,
        dataRows: [],
        showTypeList: [],
        typeTxt: '',
        keyTxt: '',
        form: {list: [{roleId: ''}]},
        formTitle: '新增',
        userTitle: '新增',
        oldItem: {},
        action: 'add',
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
        roleList: []
      };
    },
    computed: {
      bodyHeight: function () {
        let height = parseInt(this.$store.state.bodyHeight, 10);
        height = (height - 20) + 'px';
        return height;
      },
      tableHeight: function () {
        let height = parseInt(this.$store.state.bodyHeight, 10);
        return height - 140;
      }
    },
    mounted() {
      this.getOrgPage(1);
    },
    watch: {
      'typeTxt': function () {
        this.dataRows = [];
        this.roleList = [];
        this.currentItem = {};
        this.getOrgPage(1);
      },
      'currentItem.id': function (val) {
        if (val) {
          this.getOrgRoleList();
          this.getOrgAccountList(1);
        }
      }
    },
    filters: {
      formatRole: function (list) {
        return list.map(m => m.title).join('，');
      }
    },
    methods: {
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
      getOrgPage: function (pageNo, isContinue = false) {
        // 根据参数，获取单位信息
        this.pager.currentPage = pageNo;
        let param = Object.assign({}, {
          pageNo: pageNo,
          pageSize: this.pager.pageSize,
          keyWord: this.typeTxt
        });
        if (param.type === 1) {
          param.type = '';
        }
        this.loadingData = true;
        this.$http.get('/dhs-orgs', {params: param}).then(res => {
          if (param.keyWord !== this.typeTxt) return;
          this.$store.commit('initBottomLoading', false);
          if (isContinue) {
            this.showTypeList = this.showTypeList.concat(res.data.list);
          } else {
            this.showTypeList = res.data.list;
            this.currentItem = Object.assign({id: ''}, this.showTypeList[0]);
            if (res.data.list.length !== 0) {
              this.showType(this.currentItem);
              this.getOrgRoleList();
              this.getOrgAccountList(1);
            }
          }
          this.pager.totalPage = res.data.totalPage;
        });
      },
      getMore: function () {
        this.$store.commit('initBottomLoading', true);
        this.getOrgPage(this.pager.currentPage + 1, true);
      },
      // 查询账户
      getOrgAccountList: function (pageNo) {
        if (!this.currentItem.id) return;
        this.pager.currentPage = pageNo;
        let data = Object.assign({}, {
          pageNo: pageNo,
          pageSize: this.pager.pageSize,
          keyWord: this.keyTxt
        });
        OrgUser.queryOrgInfo(this.currentItem.id, data).then(res => {
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
      // 得到角色
      getOrgRoleList: function () {
        if (!this.currentItem.id) return;
        let data = Object.assign({}, {
          keyWord: this.keyTxt
        });
        Access.getOrgRoleList(this.currentItem.id, data).then(res => {
          this.roleList = res.data;
        });
      },
      // 添加角色
      add: function () {
        this.action = 'add';
        this.formTitle = '新增 ' + this.orgName + '角色';
        this.form = {};
        this.showRight = true;
      },
      // 删除角色
      removeRole: function (item) {
        this.$confirm('确认删除角色"' + item.roleName + '"?', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Access.deleteBandingRole(item.domainRoleId).then(() => {
            this.getOrgRoleList();
            this.$notify.success({
              title: '成功',
              message: '已成功删除角色"' + item.roleName + '"'
            });
          });
        });
      },
      roleChange: function () {
        this.getOrgRoleList();
        this.showRight = false;
      },
      showType: function (item) {
        this.orgName = item.name;
        this.currentItem = item;
      }
    }
  };
</script>
