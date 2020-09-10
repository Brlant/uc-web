import Notification from 'element-ui/lib/notification';
import axios from 'axios';
import Vue from 'vue';
import qs from 'qs';

export const http = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 30000,
  withCredentials: true
});

function isNewReturnType(data) {
  let keys = Object.keys(data);
  if (keys.length !== 3) return false;
  return ['code', 'data', 'msg'].every(e => keys.includes(e));
}

// 添加请求拦截器
http.interceptors.request.use(function (config) {
  if (config.method === 'get') {
    config.paramsSerializer = params => {
      return qs.stringify(params, {indices: false});
    };
  }
  return config;
});

http.interceptors.response.use(response => {
  if (isNewReturnType(response.data)) {
    switch (response.data.code) {
      case 200 :
        return response.data;
      case 401:
        window.location.href = '#/login';
        return Promise.reject({response});
      case 403:
        Notification.error({
          message: '您没有权限请求信息，请联系管理员。',
          onClose: function () {
            window.localStorage.removeItem('noticeError');
          }
        });
        return Promise.reject({response});
      case 400:
        return Promise.reject({response});
      default:
        return Promise.reject({response});
    }
  } else {
    return response;
  }
}, error => {
  let noticeTipKey = 'noticeError';
  let notice = window.localStorage.getItem(noticeTipKey);
  let response = error.response;

  if (notice === '1' && response.status !== 401) {
    return Promise.reject(error);
  } else {
    window.localStorage.setItem(noticeTipKey, '1');
  }
  if (!response || response.status === 500) {
    Notification.warning({
      message: '服务器太久没有响应, 请重试',
      onClose: function () {
        window.localStorage.removeItem(noticeTipKey);
      }
    });
    return Promise.reject(error);
  }
  if (response.status === 401) { //  Unauthorized, redirect to login
    let lastUrl = window.localStorage.getItem('lastUrl');
    if (!lastUrl || lastUrl.indexOf('/base/dict') === -1) {
    }
    window.location.href = '#/login';
    return Promise.reject(error);
  }
  if (response.status === 403) {
    Notification.error({
      message: '您没有权限请求信息，请联系管理员。',
      onClose: function () {
        window.localStorage.removeItem(noticeTipKey);
      }
    });
  }

  if (response.status === 502) {
    Notification.error({
      message: '系统请求失败',
      onClose: function () {
        window.localStorage.removeItem(noticeTipKey);
      }
    });
  }
  return Promise.reject(error);
});

Vue.prototype.$http = http;


// 追溯权限分配
export const traceRight = {
  save(obj) {
    return http.post('/code-access', obj);
  },
  query(params) {
    return http.post('/code-access/pager', params);
  },
  delete(key) {
    return http.delete(`/code-access/${key}`);
  }
};

// 物流追溯监管
export const logisticsSearch = {
  query(params) {
    return http.get('/code-regulatory/code-logistics/pager', {params});
  },
  queryDetail(id) {
    return http.post('/code-logistics/detail', {codeLogisticsId: id});
  }
};

// 实物追溯
export const physicalGoodsSearch = {
  save(obj) {
    return http.post('/code-physical-trace/task/latest', obj);
  },
  query(params) {
    return http.get('/code-physical-trace/task/pager', {params});
  },
  queryBaseInfo(id) {
    return http.get(`/code-physical-trace/task/${id}`);
  },
  queryAreaTree(bizTypeId) {
    return http.get(`/code-physical-trace/task/${bizTypeId}/tree`);
  },
  queryAreaDetail(areaId, params) {
    return http.get(`/code-physical-trace/task/${areaId}/detail`, {params});
  }
};

// 租户白名单
export const lesseeWhiteList = {
  save(obj) {
    return http.post('/code-white-list/tenant', obj);
  },
  delete(obj) {
    return http.delete('/code-white-list/tenant', {
      data: obj
    });
  },
  query(obj) {
    return http.post('/code-white-list/tenant/pager', obj, {
      params: {
        pageNo: obj.pageNo,
        pageSize: obj.pageSize
      }
    });
  }
};

// 单位白名单
export const whiteList = {
  save(obj) {
    return http.post('/code-white-list/org', obj);
  },
  delete(obj) {
    return http.delete('/code-white-list/org', {
      data: obj
    });
  },
  query(obj) {

    return http.post('/code-white-list/org/pager', obj, {
      params: {
        pageNo: obj.pageNo,
        pageSize: obj.pageSize
      }
    });
  }
};


// 经营货品
export const OperatingGoods = resource('dhs-operation-goods', http, {
  queryUnboundListByOrgId: (orgId, params) => {
    return http.get('dhs-operation-goods/org/' + orgId + '/unbound', {params});
  },
  save(obj) {
    return http.post('/dhs-operation-goods/factory', obj);
  },
  auditGoods(obj) {
    return http.post('/dhs-operation-goods/audit', obj);
  }
});


// oms附件对象
export const OmsAttachment = resource('omsAttachment', http, {
  queryOneAttachmentList: (objectId, objectType) => {
    return http.get('/omsAttachment/' + objectType + '/' + objectId, {});
  }

});

// 推送地址管理
export const PushCode = resource('/code-push-address', http);

// 业务追溯
export const bizTraces = resource('/code-biz', http, {
  queryByPlateNumber(params) {
    return http.get('/code-biz/batch-number', {params});
  },
  queryPlateNumberTask(params) {
    return http.get('/code-biz/batch-task/pager', {params});
  },
  queryPlateNumberDetail(detailId, params) {
    return http.get(`/code-biz/batch-number/${detailId}/code`, {params});
  },
  queryTraceCodes(logId, params) {
    return http.get(`/code-biz/${logId}/trace-detail`, {params});
  }
});

// 单只追溯查询
export const SingleLog = resource('/code-access-log', http, {});

// 上传记录
export const UploadLog = resource('/code-upload', http, {});

// 系统日志
export const SystemLog = resource('/system-log', http, {});

// 证照对象
export const orgLicence = resource('order-licence', http, {});

// 合同对象
export const Contract = resource('contract', http, {
  forbid: (id) => {
    return http.put('contract/' + id + '/forbid', {});
  },
  start: (id) => {
    return http.put('contract/' + id + '/start', {});
  },
  check: (id, obj) => {
    return http.put('contract/' + id + '/check', obj);
  },
  queryStateNum: (params) => {
    return http.get('/contract/count', {params});
  }
});

// 疾控中心合同对象
export const CusContract = resource('cusContract', http, {
  queryPager: (orgId, params) => {
    return http.get('/cusContract/' + orgId, {params});
  },
  forbid: (id) => {
    return http.put('cusContract/' + id + '/forbid', {});
  },
  start: (id) => {
    return http.put('cusContract/' + id + '/start', {});
  },
  check: (id, obj) => {
    return http.put('cusContract/' + id + '/check', obj);
  },
  queryStateNum: (params) => {
    return http.get('/cusContract/count', {params});
  }
});

// 疾控中心银行对象
export const CusBankInfo = resource('cusBankInfo', http, {
  queryList: (orgId, params) => {
    return http.get('/cusBankInfo/' + orgId, {params});
  },
  check: (id, obj) => {
    return http.put('cusBankInfo/' + id + '/check', obj);
  },
  auditInfo: (id, obj) => {
    return http.put('cusBankInfo/orgs/' + id + '/check', obj);
  },
  forbid: (id) => {
    return http.put('cusBankInfo/' + id + '/forbid', {});
  },
  start: (id) => {
    return http.put('cusBankInfo/' + id + '/start', {});
  },
  queryStateNum: (params) => {
    return http.get('/cusBankInfo/count', {params});
  }
});

// 物流中心对象
export const LogisticsCenter = resource('logisticsCenter', http, {
  start: (id) => {
    return http.put('/logisticsCenter/' + id + '/start', {});
  },
  forbid: (id) => {
    return http.put('/logisticsCenter/' + id + '/forbid', {});
  },
  queryStateNum: (params) => {
    return http.get('/logisticsCenter/count', {params});
  }
});

// 计费项目对象
export const CostItem = resource('costItem', http, {});

// 质量异常类型对象
export const QualityExceptionType = resource('qualityExceptionType', http, {
  start: (id) => {
    return http.put('/qualityExceptionType/' + id + '/start', {});
  },
  forbid: (id) => {
    return http.put('/qualityExceptionType/' + id + '/forbid', {});
  },
  queryStateNum: (params) => {
    return http.get('/qualityExceptionType/count', {params});
  },
  querylinkException: function (params) {
    return http.get('/qualityExceptionType/link', {params});
  }
});

// 入库质量检查方案
export const QualityProgramme = resource('qualityProgramme', http, {
  getList: (orgId => {
    return http.get('qualityProgramme/' + orgId, {
      params: {deleteFlag: false}
    });
  }),
  getRow: (id => {
    return http.get('qualityProgramme/detail', {
      params: {
        id: id
      }
    });
  })
});

// 质量检查项目对象
export const QualityItem = resource('qualityItem', http, {
  queryList: () => {
    return http.get('/qualityItem/list', {
      params: {deleteFlag: false, status: '1'}
    });
  },
  start: (id) => {
    return http.put('/qualityItem/' + id + '/start', {});
  },
  forbid: (id) => {
    return http.put('/qualityItem/' + id + '/forbid', {});
  },
  queryStateNum: (params) => {
    return http.get('/qualityItem/count', {params});
  }
});

// 受控法规对象
export const ControlledLegislation = resource('controlledLegislation', http, {
  start: (id) => {
    return http.put('/controlledLegislation/' + id + '/start', {});
  },
  forbid: (id) => {
    return http.put('/controlledLegislation/' + id + '/forbid', {});
  },
  queryStateNum: (params) => {
    return http.get('/controlledLegislation/count', {params});
  }
});

// 设备资料对象
export const Dev = resource('oms-dev', http, {});

// 数据字典组对象
export const DictGroup = resource('dictGroup', http, {
  checkGroupName: (groupName, groupId) => {
    return http.get('/dictGroup/name', {
      params: {groupName: groupName, groupId: groupId}
    });
  },
  checkItemKey: (key, itemId, groupId) => {
    return http.get('/dictItem/key', {
      params: {key: key, itemId: itemId, groupId: groupId}
    });
  },
  getAll: () => {
    return new Promise((resolve) => {
      http.get('/dictGroups').then(res => {
        let data = {};
        let groupItem;
        let item;
        for (let i = 0, len = res.data.length; i < len; i++) {
          groupItem = res.data[i];
          data[groupItem.group.name] = [];
          for (let j = 0, len1 = groupItem.items.length; j < len1; j++) {
            item = groupItem.items[j];
            data[groupItem.group.name].push({key: item.key, label: item.label});
          }
        }
        resolve(data);
      });
    });
  }
});

// 财务信息对象
export const Finance = resource('org-finance', http, {
  queryInfo: (orgId) => {
    return http.get('/org-finance/orgs/' + orgId, {});
  },
  check: (id, obj) => {
    return http.put('/org-finance/' + id + '/check', obj);
  }
});

// 数据字典项对象
export const DictItem = resource('dictItem', http, {});

// 受控法规对象
export const Material = resource('material', http, {});

// 部门对象
export const Department = resource('/department', http, {
  getPage: (params) => {
    return http.get('/department/page', {params});
  },
  getOnesMember: (id, params) => {
    return http.get('/department/' + id + '/member', {params});
  },
  getMembers: (params) => {
    return http.get('/department/members', {params});
  },
  queryStateNum: (params) => {
    return http.get('//department/member/count', {params});
  }
});

// 对象字段编号记录对象
export const pojoLog = resource('/pojo-log', http, {
  queryPojoLog: (objId, objType, params) => {
    return http.get('/uc-pojo-log/type/' + objType + '/id/' + objId, {params});
  }
});

// 平台用户权限对象
export const User = resource('/dhs/user', http, {
  checkEmail: (email, userId, orgId) => {
    return http.get('/dhs/user/email', {
      params: {email: email, userId: userId, orgId: orgId}
    });
  },
  checkPhone: (phone, userId, orgId) => {
    return http.get('/dhs/user/phone', {
      params: {phone: phone, userId: userId, orgId: orgId}
    });
  },
  resetPsw: (Obj) => {
    return http.put('/dhs/user/password', Obj);
  },
  forget: (obj) => {
    return http.post('/dhs/user/password/verifyMail', obj);
  },
  stopUser: (userId) => {
    return http.put(`/dhs/user/${userId}/stop`);
  },
  enableUser: (userId) => {
    return http.put(`/dhs/user/${userId}/enablement`);
  }
});
// 疾控中心用户权限对象
export const OrgUser = resource('/dhs/user/org', http, {
  queryOrgInfo: (id, params) => {
    return http.get('/dhs/user/org/' + id, {params});
  },
  queryTbsOrgInfo: (id, params) => {
    return http.get('/dhs/user/org/' + id, {params});
  },
  queryAllTag(params) {
    return http.get('/dhs/user/org/page', {params});
  }
});
// 角色管理对象
export const Access = resource('/oms/access', http, {
  getRoleMenus: () => {
    return http.get('/oms/access/menus/tree', {params: {objectId: 'uc-system'}});
  },
  getOrgRoleList: (orgId, params) => {
    return http.get('/oms/access/org/' + orgId + '/role', {params});
  },
  getOrgRole: (orgId, params) => {
    return http.get('/dhs-account/access/orgs/' + orgId, {params});
  },
  getRoleDetail: (roleId) => {
    return http.get('/oms/access/' + roleId);
  },
  bandOrgRole: (obj) => {
    return http.post('/oms/access/bind/role', obj);
  },
  queryStateNum: (params) => {
    return http.get('dhs-account/access/platform/count', {params});
  },
  deleteBandingRole: (id) => {
    return http.delete('/oms/access/unbind/role/' + id, {});
  },
  addApiAccess: (params) => {
    return http.post('/oms/access/org', params);
  },
  queryApiAccess: (params) => {
    return http.get('/oms/access/org', {params});
  },
  queryTbsRoles(params) {
    return http.get('/dhs-account/access', {params});
  },
  queryTbsRoleList(params) {
    return http.get('/dhs-account/access/list', {params});
  },
  addTbsRoles(obj) {
    return http.post('/dhs-account/access ', obj);
  }
});

// 货品管理
export const Goods = resource('/dhs-goods', http, {
  filterOrg: (orgId, params) => {
    return http.get('/dhs-goods/orgs/' + orgId, {params});
  },
  check: (id, obj) => {
    return http.put('/dhs-goods/' + id + '/check', obj);
  },
  getGoodsDetail: (id) => {
    return http.get('/dhs-goods/' + id);
  },
  queryStateNum: (params) => {
    return http.get('dhs-goods/count', {params});
  }
});

// 审核对象
export const Audit = resource('/audit', http, {
  // 查询某一疾控中心的当前审核流程信息
  queryAuditStatus: (orgId) => {
    return http.get('/audit/orgs/' + orgId, {});
  }
});

// 货主-基本信息
export const DhsBaseInfo = resource('/dhs-orgs', http, {
  // 根据单位机构关系类型列表分页查询单位信息
  queryByOrgRelationTypeList: (params) => {
    return http({
      url: '/dhs-orgs/relationType',
      params,
      paramsSerializer(params) {
        return qs.stringify(params, {indices: false});
      }
    });
  },
  // 货主基本信息
  queryBaseInfo: (orgid) => {
    return http.get('/dhs-orgs/' + orgid);
  },
  queryPager(params) {
    return http.get('/dhs-orgs/pager', {params});
  }
});

// 疾控中心-基本信息
export const BaseInfo = resource('/orgs', http, {
  // 根据单位机构关系类型列表分页查询单位信息
  queryByOrgRelationTypeList: (params) => {
    return http({
      url: '/orgs/relationType',
      params,
      paramsSerializer(params) {
        return qs.stringify(params, {indices: false});
      }
    });
  },
  // 查询数量
  queryStateNum: (params) => {
    return http.get('/orgs/count', {params});
  },
  // 转成疾控中心
  turnToOwner: (orgId) => {
    return http.put('/orgs/transform/consignor/' + orgId, {});
  },
  // 一键审核疾控中心基础信息(同时审核单位基本信息、经营范围、执照信息,并审核基础信息模块)
  auditBaseInfo: (orgId, obj) => {
    return http.put('/orgs/' + orgId + '/check', obj);
  },
  // 根据业务关系查询相关的单位
  queryOrgByReation: (orgId, obj) => {
    return http.get('/orgs/' + orgId + '/relation/', {params: obj});
  },
  // 根据业务关系查询相关的单位
  queryOrgByValidReation: (orgId, obj) => {
    return http.get('/orgs/' + orgId + '/valid-relation/', {params: obj});
  },
  // 校验邮箱
  checkEmail: (email, userId) => {
    return http.get('/dhs/user/email', {
      params: {email: email, userId: userId}
    });
  },
  // 校验名字
  checkName: (name, orgId) => {
    return http.get('/orgs/name', {
      params: {name, orgId}
    });
  },
  // 校验身份证
  checkCreditCode: (creditCode, orgId) => {
    return http.get('/orgs/creditCode', {
      params: {creditCode, orgId}
    });
  },
  // 校验oms代码唯一性
  checkManufacturerCode: (code, orgId) => {
    return http.get('orgs/manufacturerCode', {
      params: {code, orgId}
    });
  },
  // 校验管理员账户唯一性
  checkAdminAccount: (account, orgId) => {
    return http.get('/orgs/account', {
      params: {account, orgId}
    });
  },

  // 疾控中心基本信息
  queryBaseInfo: (orgid) => {
    return http.get('/orgs/' + orgid);
  },
  // 删除客服人员
  deleteCus: (id) => {
    return http.delete('/cusService/' + id, {});
  },
  // 添加客服人员
  addCus: (obj) => {
    return http.post('/cusService', obj);
  },
  // 添加疾控中心经营范围
  addOrgScope: (obj) => {
    return http.post('/orgScope', obj);
  },
  // 删除疾控中心经营范围
  deleteOrgScope: (id) => {
    return http.delete('/orgScope/' + id);
  },
  // 查询其他客服人员
  queryOtherCus: (obj) => {
    return http.get('/cusService/orgs/' + obj.orgId + '/users', {obj});
  },
  // 新增受控法规
  addFg: (obj) => {
    return http.post('/bizLegislation', obj);
  },
  // 删除受控法规
  deleteFg: (id) => {
    return http.delete('/bizLegislation/' + id);
  }
});
// 业务关系
export const bizRelation = resource('/bizRelation', http, {
  queryRelationorg: (id) => {
    return http.get('/bizRelation/' + id, {});
  },
  check: (id, obj) => {
    return http.put('bizRelation/' + id + '/check', obj);
  },
  queryStateNum: (params) => {
    return http.get('/bizRelation/count', {params});
  }
});
// 疾控中心货品
export const OrgGoods = resource('/org/goods', http, {
  queryOneGoods: (id) => {
    return http.get('/orgs/goods/' + id, {});
  },
  check: (id, obj) => {
    return http.put('/org/goods/' + id + '/check', obj);
  },
  queryStateNum: (params) => {
    return http.get('/org/goods/count', {params});
  }
});
// 仓库地址
export const Address = resource('/orgAddressInfo', http, {
  queryAddress: (id, params) => {
    return http.get('/orgAddressInfo/' + id, {params});
  },
  updateAddress: function (obj) {
    return http.put('/orgAddressInfo', obj);
  },
  check: (id, obj) => {
    return http.put('/orgAddressInfo/' + id + '/check', obj);
  },
  forbid: function (id) {
    return http.put('/orgAddressInfo/' + id + '/forbid', {});
  },
  bizForbid: function (id) {
    return http.put('/orgAddressInfo/' + id + '/bizForbid', {});
  },
  start: function (id) {
    return http.put('/orgAddressInfo/' + id + '/start', {});
  },
  auditInfo: (id, obj) => {
    return http.put('/orgAddressInfo/orgs/' + id + '/check', obj);
  },
  queryStateNum: (params) => {
    return http.get('/orgAddressInfo/count', {params});
  }
});
// 计费方案
export const Case = resource('/org/costItem', http, {
  check: (id, obj) => {
    return http.put('/org/costItem/' + id + '/check', obj);
  },
  queryStateNum: (params) => {
    return http.get('/org/costItem/count', {params});
  }
});
// 订单
export const Order = resource('/order', http, {
  check: (orderId, obj) => {
    return http.put('order/' + orderId + '/check', obj);
  },

  confirmOrder: (orderId) => {// 确认订单
    return http.put('/order-status/' + orderId + '/confirm');
  },
  cancelOrder: (orderId, obj) => {// 取消订单
    return http.put('/order-status/' + orderId + '/cancel', obj);
  },

  // 订单
  examineOrder: (orderId, obj) => {// 审单
    return http.put('/order-status/' + orderId + '/examine', obj);
  },
  receiptOrder: (orderId) => {// 确认收货
    return http.put('/order-status/' + orderId + '/receipt');
  },
  acceptanceOrder: (orderId) => {// 验收通过
    return http.put('/order-status/' + orderId + '/acceptance');
  },
  rejectionOrder: (orderId, obj) => {// 拒收
    return http.put('/order-status/' + orderId + '/rejection', obj);
  },

  rejectionReviewOrder: (orderId, obj) => {// 确认复核
    return http.put('/order-status/' + orderId + '/rejection-review/reject', obj);
  },
  terminationRejection: (orderId, obj) => {// 中止拒收
    return http.put('/order-status/' + orderId + '/rejection-review/stop', obj);
  },
  agreementReceiptOrder: (orderId, obj) => {// 取消拒收
    return http.put('/order-status/' + orderId + '/check-receipt', obj);
  },
  affirmRejectionOrder: (orderId, obj) => {// 确认拒收
    return http.put('/order-status/' + orderId + '/check-rejection', obj);
  },
  stockOrder: (orderId) => {// 货品上架
    return http.put('/order-status/' + orderId + '/stock');
  },
  // 出库单
  pickingOutOrder: (orderId) => {// 货品下架
    return http.put('/order-status/' + orderId + '/picking-out');
  },
  generationOrder: (orderId) => {// 生成出库单
    return http.put('/order-status/' + orderId + '/generation');
  },
  packageOrder: (orderId) => {// 出库单打包
    return http.put('/order-status/' + orderId + '/package');
  },
  outgoingCompletedOrder: (orderId) => {// 确认出库
    return http.put('/order-status/' + orderId + '/outgoing-completed');
  },
  distributionOrder: (orderId) => {// 确认配送
    return http.put('/order-status/' + orderId + '/distribution');
  },
  signOrder: (orderId) => {// 客户签收
    return http.put('/order-status/' + orderId + '/sign');
  },
  // 查询异常
  queryOrderExcepiton: (params) => {
    return http.get('/order/quality-exception', {params});
  },
  queryStateNum: function (params) {
    return http.get('/order/count/', {params});
  }
});

// 异常管理
export const QualityException = resource('/quality-exception', http, {});

export const Dict = resource('dict', http, {
  byCode: (code) => http.get(`dict/bycode?code=${code}`)
});

export const Auth = {
  checkLogin: () => {
    return http.get('/dhs/userinfo');
  },
  login: (data) => {
    return http.post('/dhs/login', data);
  },
  logout: () => {
    return http.get('/dhs/logout');
  },
  isLogin() {
    try {
      return User.current();
    } catch (e) {
      Notification.error('用户信息出错，请重新登录!');
    }
  },
  permission: () => {
    return http.get('dhs-account/permissions', {params: {objectId: 'uc-system'}});
  }
};

/**
 * create vue-resource's resource like object
 *
 * Default Actions
 *   get: {method: 'GET'}
 *   save: {method: 'POST'}
 *   query: {method: 'GET'}
 *   update: {method: 'PUT'}
 *   delete: {method: 'DELETE'}
 *
 * @param path the resource path
 * @param http axios instance
 * @param actions custom actions
 * @returns the resource object
 */
function resource(path, http, actions) {
  let obj = {
    get: id => http.get(path + '/' + id),
    save: obj => http.post(path, obj),
    query: params => http.get(path, {params}),
    update: (id, obj) => {
      let url = path + '/' + id;
      if (typeof (id) === 'object') {
        url = path;
        obj = id;
      }
      return http.put(url, obj);
    },
    delete: id => http.delete(path + '/' + id)
  };
  return Object.assign(obj, actions);
}

