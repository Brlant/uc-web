<template>
  <div class="order-page">
    <search-part  @search="searchResult" @addOrgAccount="addOrgAccount"></search-part>

    <div class="order-list" style="margin-top: 20px">
      <el-row class="order-list-header">
        <el-col :span="6">被授权单位</el-col>
        <el-col :span="7">货品</el-col>
        <el-col :span="3">货品编号</el-col>
        <el-col :span="6">生产厂商</el-col>
        <el-col :span="2">操作</el-col>
      </el-row>
      <el-row v-if="loadingData">
        <el-col :span="24">
          <oms-loading :loading="loadingData"></oms-loading>
        </el-col>
      </el-row>
      <el-row v-else-if="dataList.length === 0">
        <el-col :span="24">
          <div class="empty-info">
            暂无信息
          </div>
        </el-col>
      </el-row>
      <div class="order-list-body flex-list-dom" v-else="">
        <div :class="[{'active':currentItemId===item.id}]" class="order-list-item no-pointer order-list-item-bg"
             v-for="item in dataList">
          <el-row>
            <el-col :span="6">
              {{item.objectOrgName}}
            </el-col>
            <el-col :span="7">
              <div>{{item.goodsName}}</div>
              <div class="f-grey">规格：{{item.specification}}</div>
            </el-col>
            <el-col :span="3">
              <div>{{item.goodsCode}}</div>
            </el-col>
            <el-col :span="6">
              {{item.factoryName}}
            </el-col>
            <el-col :span="2">
              <des-btn perm="code-access-delete" icon="delete" @click="deleteItem(item)">删除</des-btn>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>

    <div class="text-center" v-show="(dataList.length || pager.currentPage !== 1) && !loadingData">
      <el-pagination :current-page="pager.currentPage" :page-size="20"
                     :page-sizes="[20,50,100]"
                     :total="pager.count" @current-change="handleCurrentChange" @size-change="handleSizeChange"
                     layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>
    <page-right :show="showUserRight" @right-close="resetRightBox">
      <user-form :formItem="form" :title="userTitle" :action="action" :actionType="showUserRight"
                 @close="showUserRight=false" :orgId="currentItem.id"
                 @change="userChange"></user-form>
    </page-right>
  </div>
</template>
<script>
  import SearchPart from './search';
  import CommonMixin from '@/mixins/commonMixin';
  import {traceRight} from '@/resources';
  import UserForm from './form/form';
  export default {
    components: {
      SearchPart, UserForm
    },
    mixins: [CommonMixin],
    data() {
      return {
        filters: {},
        form: {},
        userTitle: '新增',
        action: 'add',
        showUserRight: false
      };
    },
    watch: {
      filters: {
        handler: function () {
          this.queryList(1);
        },
        deep: true
      }
    },
    mounted() {
      this.queryList(1);
    },
    methods: {
      searchResult: function (search) {
        this.filters = Object.assign({}, this.filters, search);
      },
      queryList(pageNo) {
        this.pager.currentPage = pageNo;
        let params = Object.assign({}, {
          pageNo: pageNo,
          pageSize: this.pager.pageSize
        }, this.filters, {
          subjectOrgId: this.$store.state.user.userCompanyAddress
        });
        this.loadingData = true;
        let nowTime = new Date();
        this.nowTime = nowTime;
        traceRight.query(params).then(res => {
          if (this.nowTime > nowTime) return;
          this.dataList = res.data.list || [];
          this.pager.count = res.data.count;
          this.loadingData = false;
        });
        return params;
      },
      resetRightBox: function () {
        this.showUserRight = false;
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
      deleteItem(item) {
        this.$confirm(`是否删除"${item.goodsName}"`, '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          traceRight.delete(item.id).then(() => {
            this.queryList(this.pager.currentPage);
            this.$notify.success({
              message: '删除成功'
            });
          });
        });
      },
      userChange() {
        this.queryList(this.pager.currentPage);
        this.showUserRight = false;
      }
    }
  };
</script>
