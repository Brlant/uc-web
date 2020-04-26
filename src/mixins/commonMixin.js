export default {
  data() {
    return {
      loadingData: false,
      activeStatus: 0,
      dataList: [],
      showIndex: -1,
      pager: {
        currentPage: 1,
        count: 0,
        pageSize: 20
      },
      currentItem: {},
      currentItemId: '',
      currentPart: null,
      form: {},
      nowTime: '',
      filters: {},
      dialogComponents: {},
      defaultPageRight: {'width': '700px', 'padding': 0}
    };
  },
  methods: {

    queryUtil(http, pageNo, beforeRequest, success) {
      this.pager.currentPage = pageNo;
      let params = Object.assign({}, {
        pageNo: pageNo,
        pageSize: this.pager.pageSize
      }, this.filters, {status: null});
      this.loadingData = true;
      beforeRequest && beforeRequest();
      let nowTime = new Date();
      this.nowTime = nowTime;
      http(params).then(res => {
        if (this.nowTime > nowTime) return;
        this.dataList = res.data.list || [];
        this.pager.count = res.data.count;
        this.loadingData = false;
        success && success();
      });
      return params;
    },
    handleSizeChange(val) {
      this.pager.pageSize = val;
      this.queryList(1);
    },
    handleCurrentChange(val) {
      this.queryList(val);
    },
    queryStatusNumUtil(http, params, statusType, response) {
      http(params).then(res => {
        Object.keys(statusType).forEach(key => {
          statusType[key].num = res.data[statusType[key].status] || 0;
        });
      });
    },
    formatRowClass(status, statusType) {
      let index = -1;
      Object.keys(statusType).forEach(k => {
        if (status === null) {
          if (statusType[k].status === status) {
            index = k;
          }
        } else {
          let s1 = Number(statusType[k].status);
          let s2 = Number(status);
          if (s1 === s2) {
            index = k;
          }
        }
      });
      index = index !== -1 ? 'status-' + index : '';
      return index;
    },
    formatStatus(status, statusType) {
      let title = '';
      Object.keys(statusType).forEach(k => {
        if (status === null) {
          if (statusType[k].status === status) {
            title = statusType[k].title;
          }
        } else {
          let s1 = Number(statusType[k].status);
          let s2 = Number(status);
          if (s1 === s2) {
            title = statusType[k].title;
          }
        }
      });
      return title;
    },
    formatTimeAry(times, index, str) {
      if (!times) return;
      return this.formatTime(times[index], str);
    },
    formatTime(time, str = 'YYYY-MM-DD HH:mm:ss') {
      return time ? this.$moment(time).format(str) : '';
    },
    searchResult: function (search) {
      this.filters = Object.assign({}, this.filters, search);
    },
    resetRightBox() {
      this.defaultPageRight.width = '700px';
      this.showIndex = -1;
    },
    showPart(index) {
      this.currentPart = this.dialogComponents[index];
      this.$nextTick(() => {
        this.showIndex = index;
      });
    }
  }
};
