<style lang="scss" scoped="">
  @import '../../../assets/scss/mixins';

  .t-head {
    background: #eef1f6;
    color: #1f2d3d;
    font-weight: bold;
  }

  .empty-info {
    &.mini-empty-info {
      height: 60px;
    }
  }

  .order-list-item {
    .el-row {
      cursor: auto;
      display: flex;
      align-items: center;
    }
  }

  .order-list {
    .order-list-header {
      line-height: 32px;
      height: 32px;
    }
  }

</style>
<template>
  <div>
    <div>
      <el-row style="margin-bottom: 10px;overflow: hidden">
        <div v-if="showFormSearch">
          <el-col :span="7">
            <oms-form-row :span="5" label="货品">
              <el-select clearable filterable placeholder="请选择货品" size="mini" v-model="searchCondition.goodsId">
                <el-option :key="item.goodsId" :label="item.goodsName" :value="item.goodsId"
                           v-for="item in currentOrder.detailList"></el-option>
              </el-select>
            </oms-form-row>
          </el-col>
          <el-col :span="7">
            <oms-form-row :span="5" label="批号">
              <el-select clearable filterable placeholder="请选择批号" size="mini" v-model="searchCondition.batchNumberId">
                <el-option :key="item.batchNumberId" :label="item.batchNumber" :value="item.batchNumberId"
                           v-for="item in currentOrder.detailList"></el-option>
              </el-select>
            </oms-form-row>
          </el-col>
          <el-col :span="7">
            <oms-form-row :span="6" label="追溯码">
              <el-input clearable size="mini" v-model="searchCondition.code"></el-input>
            </oms-form-row>
          </el-col>
          <el-col :span="3" style="padding-left: 10px">
            <el-button @click="search" type="primary">查询</el-button>
          </el-col>
        </div>
        <div v-else>
          <span class="pull-right">
           <span class="btn-search-toggle open" v-show="showSearch">
              <single-input v-model="filters.code" placeholder="请输入追溯码搜索" :showFocus="showSearch"
                            style="width: 180px"></single-input>
              <i class=" el-icon-t-search" @click.stop="showSearch=(!showSearch)"></i>
           </span>
           <a href="#" class="btn-circle" @click.stop.prevent="showSearch=(!showSearch)" v-show="!showSearch">
              <i class=" el-icon-t-search"></i>
           </a>
      </span>
        </div>
      </el-row>
      <div class="order-list clearfix" v-loading="loadingData">
        <el-row class="order-list-header t-head" style="margin:0">
          <el-col :span="6">追溯码</el-col>
          <el-col :span="10">货品名称</el-col>
          <el-col :span="5">批号</el-col>
          <el-col :span="3">包装类型</el-col>
        </el-row>
        <el-row v-if="!traceCodes.length">
          <el-col :span="24">
            <div class="empty-info mini-empty-info">
              暂无信息
            </div>
          </el-col>
        </el-row>
        <div v-else="" class="order-list-body">
          <div class="order-list-item no-pointer order-list-item-bg" v-for="item in traceCodes"
               style="margin-left: 0;margin-right: 0">
            <el-row>
              <el-col :span="6" class="R pt10">
                <span>
                  {{ item.code }}
<!--                  <perm label="code-biz-trace-delete-code">-->
<!--                       <i class="el-icon-delete" style="color: red;cursor: pointer" @click="deleteItem(item)"></i>-->
<!--                  </perm>-->
                </span>
              </el-col>
              <el-col :span="10" class="pt">
                <span>{{ item.goodsName }}</span>
              </el-col>
              <el-col :span="5" class="pt">
                <span>{{ item.batchNumber }}</span>
              </el-col>
              <el-col :span="3" class="pt">
                <span>{{ packageType[item.packageScheme-1] }}</span>
              </el-col>
            </el-row>
          </div>
        </div>

      </div>
      <div class="text-center" v-show="traceCodes.length && !loadingData">
        <el-cu-pagination
          layout="sizes, prev, pager, next"
          :page-sizes="[10, 20, 50, 100]"
          :total="pager.count" :pageSize="pager.pageSize"
          @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="pager.currentPage">
        </el-cu-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import {bizTraces} from '@/resources';
  import utils from '@/tools/utils';

  export default {
    props: {
      currentOrder: {
        required: true,
        type: Object,
        default: function () {
          return {};
        }
      },
      index: {
        type: Number,
        default: -1
      },
      type: String,
      httpRequest: {
        type: Function,
        default: bizTraces.queryPlateNumberDetail
      },
      operate: {
        type: Boolean,
        default: false
      },
      showFormSearch: Boolean
    },
    data() {
      return {
        loadingData: false,
        showSearch: false,
        traceCodes: [],
        filters: {
          code: ''
        },
        searchCondition: {
          goodsId: '',
          batchNumberId: '',
          code: ''
        },
        pager: {
          currentPage: 1,
          count: 0,
          pageSize: 10
        },
        packageType: utils.packageType,
        doing: false
      };
    },
    watch: {
      index(val) {
        this.filters.code = '';
        this.searchCondition = {
          goodsId: '',
          batchNumberId: '',
          code: ''
        };
        if (val !== 2) return;
        this.getTraceCodes(1);
      },
      filters: {
        handler: function () {
          this.getTraceCodes(1);
        },
        deep: true
      }
    },
    methods: {
      search() {
        this.getTraceCodes(1);
      },
      handleSizeChange(val) {
        this.pager.pageSize = val;
        this.getTraceCodes(1);
      },
      handleCurrentChange(val) {
        this.getTraceCodes(val);
      },
      getTraceCodes(pageNo) {
        if (pageNo === 1) {
          this.pager.count = 0;
        }
        this.pager.currentPage = pageNo;
        let params = Object.assign({
          pageNo: pageNo,
          pageSize: this.pager.pageSize,
          type: this.currentOrder.type
        }, this.filters, this.searchCondition);
        this.traceCodes = [];
        this.loadingData = true;
        this.httpRequest(this.currentOrder.id, params).then(res => {
          this.traceCodes = res.data.list;
          if (res.data.list.length) {
            this.pager.count = this.pager.currentPage * this.pager.pageSize + (res.data.list.length < this.pager.pageSize ? 0: 1);
          }
          this.loadingData = false;
        });
      },
      deleteItem(item) {
        this.$confirm('是否删除追溯码"' + item.code + '"', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = {
            bizLogId: this.currentOrder.id,
            traceCodeId: item.id,
            traceCode: item.code
          };
          this.$http.delete('/code-biz/detail/log', {data}).then(res => {
            this.$notify.success({message: '删除成功'});
            this.getTraceCodes(1);
          }).catch(e => {
            this.$notify.error({
              title: '删除失败',
              message: e.response && e.response.data && e.response.data.msg
            });
          });
        });
      }
    }
  };
</script>
