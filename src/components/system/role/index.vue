<template>
  <div>
    <div>
      <status-list :activeStatus="filters.usableStatus" :checkStatus="changeType"
                   :formatClass="formatClass" :isShowIcon="isShowIcon" :isShowNum="true"
                   :statusList="orgType"></status-list>
      <div class="d-table">
        <div class="d-table-left">
          <div :style="'height:'+bodyHeight" class="d-table-col-wrap">
            <h2 class="header">
                <span class="pull-right">
                   <perm label="mdm-access-platfrom-permission-export">
                     <el-tooltip content="导出角色权限信息" placement="bottom">
                       <a href="#" class="btn-circle" @click.stop.prevent="exportRoleInfo">
                            <i class="el-icon-t-download"></i>
                        </a>
                     </el-tooltip>
                  </perm>
                  <perm label="access-role-add">
                    <a @click.stop.prevent="addType" class="btn-circle" href="#"><i class="el-icon-t-plus"></i> </a>
                  </perm>
                    <a @click.prevent="searchType" class="btn-circle" href="#"><i
                      class="el-icon-t-search"></i> </a>
                </span>
              角色管理
            </h2>
            <el-scrollbar class="d-table-left_scroll" tag="div">
              <div>
                <div class="search-left-box mr-10" v-show="showTypeSearch">
                  <oms-input :showFocus="showTypeSearch" placeholder="请输入名称搜索" v-model="filters.keyWord"></oms-input>
                </div>
                <div class="empty-info" v-if="!currentItem.title">
                  暂无信息
                </div>
                <div v-else>
                  <ul class="show-list">
                    <li :class="{'active':item.id===currentItem.id}" @click="showType(item)" class="list-item"
                        v-for="item in showTypeList">
                      <div class="id-part">
                        {{item.name }}
                      </div>
                      <div>
                        {{item.title }}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </el-scrollbar>
          </div>
        </div>
        <div class="d-table-right">
          <div class="d-table-col-wrap">
            <div class="empty-info" v-if="!currentItem.title">
              暂无信息
            </div>
            <div v-else>
              <h2 class="clearfix">
              <span class="pull-right">
               <el-button-group>
                 <perm label="access-role-edit">
                   <el-button @click="edit()">
                     <i class="el-icon-t-edit"></i>
                     编辑
                   </el-button>
                 </perm>
                 <perm label="mdm-access-role-stop">
                  <el-button @click="forbid()" v-show="resData.usableStatus == 1">
                    <i class="el-icon-t-forbidden"></i>
                    停用
                  </el-button>
                 </perm>
                 <perm label="mdm-access-role-start">
                   <el-button @click="useNormal()" v-show="resData.usableStatus == 0">
                     <i class="el-icon-t-start"></i>启用
                   </el-button>
                 </perm>
                 <perm label="mdm-access-role-delete">
                   <el-button @click="remove()"><i class="el-icon-t-delete"></i>删除</el-button>
                 </perm>
                 <span>
                      <el-button @click="records()"><i class="el-icon-t-review"></i>变更记录</el-button>
                 </span>
                </el-button-group>
              </span>
              </h2>
              <div class="page-main-body">
                <el-row>
                  <el-col :span="4" class="text-right">
                    角色名称：
                  </el-col>
                  <el-col :span="20">
                    {{ resData.title }}
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="4" class="text-right">
                    角色英文名称：
                  </el-col>
                  <el-col :span="20">
                    {{ resData.name }}
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="4" class="text-right">
                    角色状态：
                  </el-col>
                  <el-col :span="20">
                    {{ resData.usableStatus == 1 ? '可用' : '停用' }}
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="4" class="text-right">
                    角色描述：
                  </el-col>
                  <el-col :span="20">
                    {{resData.remark}}
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="4" class="text-right">
                    角色权限：
                  </el-col>
                  <el-col :span="20">
                    <el-scrollbar :style="'height:'+treeHeight" class="d-table-left_scroll" tag="div">
                      <el-tree :data="checkedMenuList" :props="defaultProps" default-expand-all></el-tree>
                    </el-scrollbar>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <page-right :css="{'width':'900px'}" :show="showRight" @right-close="resetRightBox">
      <role-form :action="action" :actionType="showRight" :formItem="form" @changed="change"
                 @close="showRight=false"></role-form>
    </page-right>
    <page-right :css="{'width':'800px'}" :show="showTypeRight" @right-close="resetRightBox">
      <show-form :formItem="form" :show="showTypeRight"
                 :getMenus="getMenus" :menuList="menuList" :defaultProps="defaultProps"></show-form>
    </page-right>
  </div>
</template>
<script>
  import {Access} from '@/resources';
  import roleForm from './form/form.vue';
  import roleMixin from '@/mixins/roleMixin';
  import utils from '@/tools/utils';
  import showForm from '../tbs-role/form/show';

  export default {
    components: {roleForm, showForm},
    mixins: [roleMixin],
    data: function () {
      return {
        defaultProps: {
          children: 'children',
          label: 'label',
          isLeaf: 'leaf'
        },
        showRight: false,
        showTypeRight: false,
        showTypeSearch: false,
        showSearch: false,
        resData: {'permissionList': []},
        typeList: [],
        showTypeList: [],
        form: {},
        action: '',
        roleText: '',
        currentItem: {},
        orgType: {
          0: {'title': '所有', 'num': 0, 'usableStatus': null},
          1: {'title': '正常', 'num': 0, 'usableStatus': 1},
          2: {'title': '停用', 'num': 0, 'usableStatus': 0}
        },
        filters: {
          usableStatus: 1,
          keyWord: ''
        },
        activeStatus: 1,
        menuList: []
      };
    },
    computed: {
      bodyHeight: function () {
        let height = parseInt(this.$store.state.bodyHeight, 10);
        height = (height - 25) + 'px';
        return height;
      },
      treeHeight: function () {
        let height = parseInt(this.$store.state.bodyHeight, 10);
        height = (height - 300) + 'px';
        return height;
      },
      user() {
        return this.$store.state.user;
      },
      checkedMenuList() {
        let checkedMenuList = JSON.parse(JSON.stringify(this.menuList));
        let perms = this.resData.permissionList;
        if (!checkedMenuList || !perms) return [];
        this.getMenus(checkedMenuList, perms);
        return checkedMenuList;
      }
    },
    mounted() {
      this.getPageList();
      this.getMenuList();
    },
    watch: {
      filters: {
        handler: function () {
          this.getPageList();
        },
        deep: true
      },
      user() {
        this.getMenuList(false);
      }
    },
    methods: {
      records() {
        this.showTypeRight = true;
        this.form = this.resData;
      },
      exportRoleInfo() {
        this.$store.commit('initPrint', {
          isPrinting: true,
          moduleId: this.$route.path,
          text: '拼命导出中'
        });
        let params = {
          objectId: 'lantern-system', type: 0
        };
        this.$http.get('/access/statement/permission/export', {params}).then(res => {
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
            title: '导出失败',
            message: error.response.data.msg,
            type: 'error'
          });
        });
      },
      changeType(item, key) {
        this.filters.usableStatus = item.usableStatus;
      },
      isShowIcon(item, key, activeStatus) {
        return item.usableStatus === activeStatus;
      },
      formatClass(item, key, activeStatus) {
        return {
          'active': item.usableStatus === activeStatus
        };
      },
      getMenuList: function () {
        this.getRoleMenus(true).then(res => {
          this.menuList = res.data;
        });
      },
      getCheckedMenu: function (data, permissionList) {
        for (let i = 0; i < data.length; i++) {
          if (permissionList.indexOf(data[i].id) === -1) {
            data.splice(i, 1);
            i--;
          } else if (data[i].children) {
            this.getCheckedMenu(data[i].children, permissionList);
          }
        }
      },
      getMenus: function (checkedMenuList, permissionList) {
        let permissionIdList = [];
        permissionList.forEach(val => {
          permissionIdList.push(val.name);
        });
        this.getCheckedMenu(checkedMenuList, permissionIdList);
      },
      getPageList: function () {// 查询角色列表
        let param = Object.assign({}, {
          keyword: this.typeTxt,
          deleteFlag: false,
          objectId: 'lantern-system'
        }, this.filters);
        Access.query(param).then(res => {
          if (param.keyWord !== this.filters.keyWord) return;
          this.showTypeList = res.data.list;
          this.typeList = res.data.list;
          this.currentItem = Object.assign({id: ''}, this.showTypeList[0]);
          this.queryRoleDetail(this.currentItem.id);
        });
        this.queryStatusNum(param);
      },
      queryStatusNum: function (params) {
        Access.queryStateNum(params).then(res => {
          let data = res.data;
          this.orgType[0].num = data['all'];
          this.orgType[1].num = data['valid'];
          this.orgType[2].num = data['stop'];
        });
      },
      queryRoleDetail: function (id) {
        if (!id) return;
        Access.getRoleDetail(id).then(res => {
          this.resData = res.data;
          // this.getMenus(this.resData.permissionList);
        });
      },
      resetRightBox: function () {
        this.showRight = false;
        this.showTypeRight = false;
      },
      addType: function () {
        this.action = 'add';
        this.form = {};
        this.showRight = true;
      },
      searchType: function () {
        this.showTypeSearch = !this.showTypeSearch;
      },
      edit: function () {
        this.action = 'edit';
        this.form = JSON.parse(JSON.stringify(this.resData));
        let checkedIdList = [];
        // 勾选已经有的权限
        this.form.permissionList.forEach(val => {
          checkedIdList.push(val.name);
        });
        this.form.checkedIdList = checkedIdList;
        this.showRight = true;
      },
      forbid: function () {
        this.$confirm('确认停用角色"' + this.resData.title + '"?', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let itemTemp = JSON.parse(JSON.stringify(this.resData));
          itemTemp.usableStatus = 0;
          Access.update(itemTemp.id, itemTemp).then(() => {
            this.resData.usableStatus = 0;
            this.getPageList();
            this.$notify.success({
              title: '成功',
              message: '已成功停用角色"' + this.resData.title + '"'
            });
          });
        });
      },
      useNormal: function () {
        this.$confirm('确认启用角色"' + this.resData.title + '"?', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let itemTemp = JSON.parse(JSON.stringify(this.resData));
          itemTemp.usableStatus = 1;
          Access.update(itemTemp.id, itemTemp).then(() => {
            this.resData.usableStatus = 1;
            this.getPageList();
            this.$notify.success({
              title: '成功',
              message: '已成功启用角色"' + this.resData.title + '"'
            });
          });
        });
      },
      remove: function () {
        this.$confirm('确认删除角色"' + this.resData.title + '"?', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Access.delete(this.resData.id).then(() => {
            this.getPageList();
            this.$notify.success({
              title: '成功',
              message: '已成功删除角色"' + this.resData.title + '"'
            });
          });
        });
      },
      removeType: function (item) {
        Access.delete(item.id).then(() => {
          this.getPageList();
          this.$notify.success({
            title: '成功',
            message: '已成功删除角色"' + item.title + '"'
          });
        });
      },
      showType: function (type) {
        this.currentItem = type;
        this.queryRoleDetail(this.currentItem.id);
      },
      change: function (item) {
        if (this.action === 'add') {
          this.getPageList();
          this.showRight = false;
        } else {
          this.resData = item;
          this.showTypeList.forEach(roleItem => {
            if (roleItem.id === item.id) {
              roleItem.name = item.name;
              roleItem.title = item.title;
            }
          });
          // 重新过滤树
          // this.getMenus(this.resData.permissionList);
          this.showRight = false;
        }
      }
    }
  };
</script>
