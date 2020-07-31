<style lang="scss" scoped="">

  .R {
    word-wrap: break-word;
    word-break: break-all;
  }

  .good-selects {
    .el-select-dropdown__item {
      height: auto;
      width: 300px;
    }
  }

  .align-word {
    letter-spacing: 1em;
    margin-right: -1em;
  }

  .order-list-item {
    cursor: pointer;
  }

  .good-selects {
    .el-select-dropdown__item {
      width: auto;
    }
  }

  .header-list {
    overflow: hidden;
  }
</style>
<template>
  <div class="order-page">
    <div class="container">
      <div class="opera-btn-group" :class="{up:!showSearch}">
        <div class="opera-icon">
          <!--<span class="">-->
          <!--<i class="el-icon-t-search"></i> 筛选查询-->
          <!--</span>-->
          <span class="pull-left switching-icon" @click="showSearch = !showSearch">
            <i class="el-icon-arrow-up"></i>
            <span v-show="showSearch">收起筛选</span>
            <span v-show="!showSearch">展开筛选</span>
          </span>
        </div>
        <el-form class="advanced-query-form" onsubmit="return false">
          <el-row>
            <el-col :span="8">
              <oms-form-row :span="6" label="日志操作人">
                <el-select filterable remote placeholder="请输入名称/拼音首字母缩写搜索" :remote-method="filterUser"
                           :clearable="true"
                           v-model="searchWord.operatorId" popperClass="good-selects">
                  <el-option :value="user.id" :key="user.id" :label="user.name" v-for="user in userList">
                    <div style="overflow: hidden">
                      <span class="pull-left" style="clear: right">{{user.name}}</span>
                      <span class="pull-right">
                        {{user.companyDepartmentName}}
                      </span>
                      <div class="font-gray clearfix">所属单位：{{user.orgName}}</div>
                    </div>
                  </el-option>
                </el-select>
              </oms-form-row>
            </el-col>
            <el-col :span="8">
              <oms-form-row label="日志操作时间" :span="7">
                <el-col :span="24">
                  <el-date-picker :default-time="['00:00:00', '23:59:59']" placeholder="请选择"
                                  type="datetimerange"
                                  v-model="expectedTime"></el-date-picker>
                </el-col>
              </oms-form-row>
            </el-col>
            <el-col :span="8">
              <oms-form-row label="操作类型" :span="6">
                <oms-input v-model="searchWord.actionType" placeholder="请输入操作类型"/>
              </oms-form-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <oms-form-row :span="6" label="URL">
                <oms-input placeholder="请输入URL" v-model="searchWord.url"/>
              </oms-form-row>
            </el-col>
            <el-col :span="8">
              <oms-form-row :span="6" label="请求body">
                <oms-input placeholder="请输入请求body" v-model="searchWord.body"/>
              </oms-form-row>
            </el-col>
            <el-col :span="8">
              <oms-form-row :span="6" label="响应">
                <oms-input placeholder="请输入response" v-model="searchWord.response"/>
              </oms-form-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <oms-form-row :span="6" label="sessionId">
                <oms-input placeholder="请输入sessionId" v-model="searchWord.sessionId"/>
              </oms-form-row>
            </el-col>
            <el-col :span="8">
              <oms-form-row :span="6" label="IP">
                <oms-input placeholder="请输入IP" v-model="searchWord.ip"/>
              </oms-form-row>
            </el-col>
            <el-col :span="8">
              <oms-form-row label="" :span="5">
                <el-button type="primary" native-type="submit" @click="searchInOrder">查询</el-button>
                <el-button native-type="reset" @click="resetSearchForm">重置</el-button>
              </oms-form-row>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <el-table :data="logList" border @row-click="showDetail" class="clearfix" :header-row-class-name="'headerClass'"
                ref="orderDetail" v-loading="loadingData">
        <el-table-column label="日志操作时间" prop="operationTime"
                         width="110">
          <template slot-scope="scope">
            {{ scope.row.operationTime | time}}
          </template>
        </el-table-column>
        <el-table-column label="日志操作人" prop="userName" width="120"></el-table-column>
        <el-table-column label="所属单位" prop="orgName" width="120"></el-table-column>
        <el-table-column label="日志操作类型" prop="actionType" width="180">
          <template slot-scope="scope">
            {{ showActionType(scope.row.actionType)}}
          </template>
        </el-table-column>
        <el-table-column label="URL" min-width="120" prop="logRemarks">

        </el-table-column>
        <el-table-column label="请求body" prop="body" width="300">

        </el-table-column>
        <el-table-column label="sessionId" prop="sessionId" width="250"></el-table-column>
        <el-table-column label="IP" prop="ip" width="150"></el-table-column>
      </el-table>
      <div class="text-center" v-show="(logList.length || pager.currentPage !== 1) && !loadingData">
        <el-pagination :current-page="pager.currentPage" :page-size="pager.pageSize"
                       :page-sizes="[10,20,50,100]"
                       :total="pager.count" @current-change="handleCurrentChange"
                       @size-change="handleSizeChange"
                       layout="sizes, prev, pager, next, jumper">
        </el-pagination>
      </div>
    </div>

    <!--<page-right :show="showDetailPart" @right-close="resetRightBox" :css="{'width':'1100px','padding':0}">-->
    <!--<detail :currentItem="currentItem" @close="resetRightBox"></detail>-->
    <!--</page-right>-->
  </div>
</template>
<script>
  import {BaseInfo, User} from '@/resources';
  //  import detail from './detail.vue';

  export default {
//    components: {detail},
    data() {
      return {
        loadingData: true,
        showSearch: true,
        logList: [],
        filters: {
          operatorId: '',
          startTime: '',
          endTime: '',
          actionType: ''
        },
        searchWord: {
          operatorId: '',
          startTime: '',
          endTime: '',
          actionType: ''
        },
        pager: {
          currentPage: 1,
          count: 0,
          pageSize: parseInt(window.localStorage.getItem('currentPageSize'), 10) || 10
        },
        expectedTime: '',
        userList: []
      };
    },
    mounted() {
      this.getLogPager(1);
    },
    computed: {},
    watch: {
      // filters: {
      //   handler: function () {
      //     this.getLogPager(1);
      //   },
      //   deep: true
      // },
      $route() {
        this.resetSearchForm();
        this.getLogPager(1);
      }
    },
    methods: {
      showActionType: function (item) {
        if (item === 'login') {
          item = '登录';
        }
        return item;
      },
      filterUser: function (query) {
        let data = Object.assign({}, {
          pageNo: 1,
          pageSize: 20,
          objectId: 'dhs-system',
          keyWord: query,
          status: 1
        });
        User.query(data).then(res => {
          this.userList = res.data.list;
        });
      },
      handleSizeChange(val) {
        this.pager.pageSize = val;
        window.localStorage.setItem('currentPageSize', val);
        this.getLogPager(1);
      },
      handleCurrentChange(val) {
        this.getLogPager(val);
      },
      filterCustomer: function (query) {// 过滤客户
        BaseInfo.query({keyWord: query, type: 0}).then(res => {
          this.customerList = res.data.list;
        });
      },
      getLogPager: function (pageNo) { // 得到日志列表
        this.pager.currentPage = pageNo;
        let param = Object.assign({}, {
          pageNo: pageNo,
          pageSize: this.pager.pageSize,
        }, this.filters);
        if (this.$route.meta.objectId) {
          param.systemName = this.$route.meta.objectId;
        }
        this.loadingData = true;
        this.$http.get('/dhs-system-log', {params: param}).then(res => {
          this.logList = res.data.list;
          this.pager.count = res.data.count;
          this.loadingData = false;
        });
      },
      showDetail(item) {
        this.currentItemId = item.id;
        this.currentItem = item;
        this.showDetailPart = true;
      },
      resetRightBox() {
        this.showDetailPart = false;
      },
      searchInOrder: function () {// 搜索
        this.searchWord.startTime = this.$formatAryTime(this.expectedTime, 0, 'YYYY-MM-DD HH:mm:ss');
        this.searchWord.endTime = this.$formatAryTime(this.expectedTime, 1, 'YYYY-MM-DD HH:mm:ss');
        Object.assign(this.filters, this.searchWord);
        this.getLogPager(1);
      },
      resetSearchForm: function () {// 重置表单
        this.searchWord = {
          operatorId: '',
          startTime: '',
          endTime: '',
          actionType: ''
        };
        this.expectedTime = '';
        this.filters = Object.assign({}, this.searchWord);
        this.getLogPager(1);
      },
      formatTime(date) {
        return date ? this.$moment(date).format('YYYY-MM-DD') : '';
      }
    }
  };
</script>
