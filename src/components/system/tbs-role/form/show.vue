<style lang="scss" scoped="">
  .el-form .el-select {
    display: block;
  }

  $leftWidth: 0;
  .content-part {
    .content-left {
      width: $leftWidth;
    }

    .content-right {
      > h3 {
        left: $leftWidth;
        margin-bottom: 0;
      }

      left: $leftWidth;
      padding-top: 65px;
    }
  }
</style>
<template>
  <div class="content-part">
    <div class="content-right min-gutter">
      <h3>变更记录</h3>
      <el-table :data="pojoLogList" style="width: 100%" class="table-edit el-table__expanded" @expand-change="queryLogDetail">
        <el-table-column label="修改人" prop="createdName">
        </el-table-column>
        <el-table-column label="修改时间" prop="createTime">
          <template slot-scope="props">
            {{props.row.createTime | time}}
          </template>
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <div>
              <div style="height: 50px" v-if="props.row.loading" v-loading="props.row.loading"></div>
              <div v-if="props.row.detail">
                <el-table v-if="props.row.detail.list" :data="props.row.detail.list" border style="width: 100%">
                  <el-table-column prop="pojoModifyDetailChineseName" label="字段名">
                  </el-table-column>
                  <el-table-column prop="pojoModifyDetailNew" label="新值">
                  </el-table-column>
                  <el-table-column prop="pojoModifyDetailOld" label="旧值">
                  </el-table-column>
                </el-table>
                <el-row class="mt-10">
                  <el-col :span="4" align="right">
                    角色权限:
                  </el-col>
                  <el-col :span="20">
                    <el-scrollbar v-if="props.row.detail.detailDtoList"
                                  :style="'height:150px'" class="d-table-left_scroll" tag="div">
                      <el-tree :data="props.row.detail.checkedMenuList" :props="defaultProps" default-expand-all></el-tree>
                    </el-scrollbar>
                  </el-col>

                </el-row>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

  export default {
    props: {
      formItem: {
        type: Object,
        default: {},
        required: true
      },
      show: Boolean,
      getMenus: Function,
      menuList: Array,
      defaultProps: Object
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
      show(val) {
        if (!val) return;
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
        this.$http.get(`/oms/access/${this.formItem.id}/pojo-log/pager`).then(res => {
          res.data.list.forEach(i => {
            i.detail = null;
            i.loading = false;
          });
          this.pojoLogList = res.data.list;
        });
      },
      queryLogDetail(item, expand) {
        if (!expand) return;
        if (item.detail) return;
        item.loading = true;
        this.$http.get(`/oms/access/${item.id}/pojo-log/detail`).then(res => {
          res.data.detailDtoList.forEach(i => {
            i.name = i.permissionType;
          });
          res.data.checkedMenuList = this.checkedMenuList(res.data);
          item.detail = res.data;
          item.loading = false;
        }).catch(i => {
          item.loading = false;
        });
      },
      checkedMenuList(item) {
        let checkedMenuList = JSON.parse(JSON.stringify(this.menuList));
        let perms = item.detailDtoList;
        if (!checkedMenuList || !perms) return [];
        this.getMenus(checkedMenuList, perms);
        return checkedMenuList;
      },
    }
  };
</script>
