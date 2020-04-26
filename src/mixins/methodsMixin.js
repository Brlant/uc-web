import {DhsBaseInfo, Goods, OrgUser} from '../resources';

// 得到嵌套参数
const getProps = (vm, prop) => {
  let isLot = prop.includes('.');
  if (!isLot) return vm[prop];
  return prop.split('.').reduce((pre, next) => {
    return pre[next];
  }, vm);
};

export default {
  data() {
    return {
      goodsList: [],
      totalList: [],
      manageGoods: [],
      factories: [],
      allOrgList: [], // 上游单位
      downOrgList: [], // 下游单位
      callOrgList: [], // 回调单位
      goodsBatchNumberList: [],
      orgUsers: [],
      platformGoods: []
    };
  },
  methods: {
    goodsFilter(query) {
      this.goodsList = this.totalList.filter(f => f.name.includes(query) || f.nameAcronymy.includes(query) ||
        f.namePhonetic.includes(query));
    },
    queryOmsGoods(query) {
      this.$http.get('/goods/factory').then(res => {
        this.totalList = res.data;
        this.goodsList = JSON.parse(JSON.stringify(res.data));
      });
    },
    queryManageGoods(query) {
      let params = {};
      if (typeof query === 'object') {
        params = query;
      } else {
        let user = this.$store.state.user;
        if (!user.userCompanyAddress) return;
        params = {
          orgId: user.userCompanyAddress,
          deleteFlag: false,
          keyWord: query,
          auditStatus: '1'
        };
      }
      this.$http.get('/dhs-operation-goods', {params}).then(res => {
        this.manageGoods = res.data.list;
      });
    },
    queryGoodsNumber(props) {
      return query => {
        this.goodsBatchNumberList = [];
        let goodsId = getProps(this, props);
        let params = {
          keyWord: query,
        };
        if (!goodsId) {
          this.goodsBatchNumberList = [];
          this.$notify.info({message: '请选择货品'});
          return;
        }
        this.$http.post('/dhs-batch-number/pager', {goodsId}, {
          params
        }).then(res => {
          this.goodsBatchNumberList = res.data.list;
        });
      };
    },
    queryAllFactory(query) { // 查询所有单位
      let params = {
        keyWord: query
      };
      DhsBaseInfo.query(params).then(res => {
        this.allOrgList = res.data.list;
      });
    },
    queryUpAllFactory(query) { // 查询DHS上游单位
      let params = {
        keyWord: query
      };
      return DhsBaseInfo.query(params).then(res => {
        this.allOrgList = res.data.list;
      });
    },
    queryDownAllFactory(query) { // 查询DHS下游单位
      let params = {
        keyWord: query
      };
      return DhsBaseInfo.query(params).then(res => {
        this.downOrgList = res.data.list;
      });
    },
    queryCallAllFactory(query) { // 查询DHS回调单位
      let params = {
        keyWord: query
      };
      DhsBaseInfo.query(params).then(res => {
        this.callOrgList = res.data.list;
      });
    },
    queryDhsFactory(query) { // 查询DHS厂商
      let params = {
        keyWord: query,
        orgRelationTypeList: ['Manufacture']
      };
      DhsBaseInfo.queryByOrgRelationTypeList(params).then(res => {
        this.factories = res.data.list;
      });
    },
    queryFactory(query) { // 查询厂商
      let params = {
        keyWord: query,
        orgRelationTypeList: ['Manufacture']
      };
      DhsBaseInfo.queryByOrgRelationTypeList(params).then(res => {
        this.factories = res.data.list;
      });
    },
    queryOrgAccountList: function (props) {// 查询单位账户
      return query => {
        let id = getProps(this, props);
        if (!id) {
          return this.$notify.info('请选择单位');
        }
        let params = {
          keyWord: query,
          pageNo: 1,
          pageSize: 200
        };
        OrgUser.queryOrgInfo(id, params).then(res => {
          this.orgUsers = res.data.list;
        });
      };
    },
    filterPlatFormGoods(query) { // 查询平台货品
      this.platformGoods = [];
      let params = Object.assign({}, {
        keyWord: query
      });
      Goods.query(params).then(res => {
        this.platformGoods = res.data.list;
      });
    }
  }
};
