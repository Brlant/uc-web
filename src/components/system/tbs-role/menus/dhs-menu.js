export default [{
  'id': 'all-data-query-manager',
  'parentId': null,
  'label': '货品、单位查询管理',
  'sort': null,
  'children': [{
    'id': 'all-goods-data-query-manager',
    'parentId': 'all-data-query-manager',
    'label': '查询全部货品资料',
    'sort': null,
    'children': null,
    'leaf': true
  }, {
    'id': 'all-org-data-query-manager',
    'parentId': 'all-data-query-manager',
    'label': '查询全部单位资料',
    'sort': null,
    'children': null,
    'leaf': true
  }],
  'leaf': false
}, {
  'id': 'mdm-business-unit', 'parentId': null, 'label': '业务单位', 'sort': 1, 'children': [{
    'id': 'mdm-manufacture-user-role-manager',
    'parentId': 'mdm-business-unit',
    'label': '业务单位角色管理',
    'sort': 13,
    'children': [{
      'id': 'mdm-manufacture-mdm-access-role-watch',
      'parentId': 'mdm-manufacture-user-role-manager',
      'label': '查看角色',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-manufacture-mdm-access-role-delete',
      'parentId': 'mdm-manufacture-user-role-manager',
      'label': '删除角色',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-manufacture-mdm-access-role-edit',
      'parentId': 'mdm-manufacture-user-role-manager',
      'label': '编辑角色',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-manufacture-mdm-access-role-start',
      'parentId': 'mdm-manufacture-user-role-manager',
      'label': '启用角色',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-manufacture-mdm-access-role-stop',
      'parentId': 'mdm-manufacture-user-role-manager',
      'label': '停用角色',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-manufacture-mdm-access-role-add',
      'parentId': 'mdm-manufacture-user-role-manager',
      'label': '新增角色',
      'sort': null,
      'children': null,
      'leaf': true
    }],
    'leaf': false
  }, {
    'id': 'mdm-business-unit-org-user-watch',
    'parentId': 'mdm-business-unit',
    'label': '用户管理',
    'sort': null,
    'children': null,
    'leaf': true
  }, {
    'id': 'mdm-manufacture-organization-user-manager',
    'parentId': 'mdm-business-unit',
    'label': '业务单位用户管理',
    'sort': 12,
    'children': [{
      'id': 'mdm-manufacture-mdm-org-user-watch',
      'parentId': 'mdm-manufacture-organization-user-manager',
      'label': '查看用户',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-manufacture-mdm-org-user-edit',
      'parentId': 'mdm-manufacture-organization-user-manager',
      'label': '编辑用户',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-manufacture-mdm-org-user-add',
      'parentId': 'mdm-manufacture-organization-user-manager',
      'label': '新增用户',
      'sort': null,
      'children': null,
      'leaf': true
    }],
    'leaf': false
  },
    {
    'id': 'mdm-goods-owner-baseInfo',
    'parentId': 'mdm-business-unit',
    'label': '基础信息',
    'sort': 1,
    'children': [{
      'id': 'mdm-org-scope-manager',
      'parentId': 'mdm-goods-owner-baseInfo',
      'label': '单位经营范围管理',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-biz-base-info-check',
      'parentId': 'mdm-goods-owner-baseInfo',
      'label': '模块审核单位基础信息',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-cusService-manager',
      'parentId': 'mdm-goods-owner-baseInfo',
      'label': '货主联系人员管理',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-org-licence-edit',
      'parentId': 'mdm-goods-owner-baseInfo',
      'label': '编辑货主证照信息',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-biz-quick-update',
      'parentId': 'mdm-goods-owner-baseInfo',
      'label': '转为货主',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-org-licence-add',
      'parentId': 'mdm-goods-owner-baseInfo',
      'label': '新增货主证照信息',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-biz-quick-audit',
      'parentId': 'mdm-goods-owner-baseInfo',
      'label': '基础信息审核',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-biz-edit',
      'parentId': 'mdm-goods-owner-baseInfo',
      'label': '编辑单位基础信息',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-biz-watch',
      'parentId': 'mdm-goods-owner-baseInfo',
      'label': '查看单位',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-org-licence-delete',
      'parentId': 'mdm-goods-owner-baseInfo',
      'label': '删除货主证照信息',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-oauth-client-details-reset',
      'parentId': 'mdm-goods-owner-baseInfo',
      'label': '重置API账号',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-oauth-client-details-add',
      'parentId': 'mdm-goods-owner-baseInfo',
      'label': '新增API账号',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-org-legislation-manager',
      'parentId': 'mdm-goods-owner-baseInfo',
      'label': '货主受控法规管理',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-org-licence-check',
      'parentId': 'mdm-goods-owner-baseInfo',
      'label': '审核货主证照信息',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-biz-delete',
      'parentId': 'mdm-goods-owner-baseInfo',
      'label': '删除单位',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-oauth-client-details-watch',
      'parentId': 'mdm-goods-owner-baseInfo',
      'label': '查看API账号',
      'sort': null,
      'children': null,
      'leaf': true
    }],
    'leaf': false
  }, {
    'id': 'mdm-business-unit-add',
    'parentId': 'mdm-business-unit',
    'label': '新增单位',
    'sort': null,
    'children': null,
    'leaf': true
  }, {
    'id': 'mdm-business-unit-query',
    'parentId': 'mdm-business-unit',
    'label': '查看业务单位',
    'sort': null,
    'children': null,
    'leaf': true
  }, {
    'id': 'mdm-business-unit-delete',
    'parentId': 'mdm-business-unit',
    'label': '删除单位',
    'sort': null,
    'children': null,
    'leaf': true
  }, {
    'id': 'mdm-business-unit-import',
    'parentId': 'mdm-business-unit',
    'label': '导入单位Excel',
    'sort': null,
    'children': null,
    'leaf': true
  }, {
    'id': 'mdm-goods-owner-bankInfo',
    'parentId': 'mdm-business-unit',
    'label': '财务信息',
    'sort': 2,
    'children': [{
      'id': 'mdm-org-bankInfo-add',
      'parentId': 'mdm-goods-owner-bankInfo',
      'label': '新增银行信息',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-org-bankInfo-update',
      'parentId': 'mdm-goods-owner-bankInfo',
      'label': '编辑银行信息',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-org-bankInfo-start',
      'parentId': 'mdm-goods-owner-bankInfo',
      'label': '启用银行信息',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-org-finance-add',
      'parentId': 'mdm-goods-owner-bankInfo',
      'label': '新增单位财务信息',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-org-bankInfo-query',
      'parentId': 'mdm-goods-owner-bankInfo',
      'label': '查询银行信息',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-org-finance-audit',
      'parentId': 'mdm-goods-owner-bankInfo',
      'label': '审核单位财务信息',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-org-bankInfo-audit',
      'parentId': 'mdm-goods-owner-bankInfo',
      'label': '审核银行信息',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-org-finance-update',
      'parentId': 'mdm-goods-owner-bankInfo',
      'label': '编辑单位财务信息',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-org-bankInfo-quick-audit',
      'parentId': 'mdm-goods-owner-bankInfo',
      'label': '一键审核银行信息',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-org-bankInfo-forbid',
      'parentId': 'mdm-goods-owner-bankInfo',
      'label': '停用银行信息',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-org-finance-watch',
      'parentId': 'mdm-goods-owner-bankInfo',
      'label': '查看单位财务信息',
      'sort': null,
      'children': null,
      'leaf': true
    }],
    'leaf': false
  }, {
    'id': 'mdm-business-unit-export',
    'parentId': 'mdm-business-unit',
    'label': '导出单位信息',
    'sort': null,
    'children': null,
    'leaf': true
  }, {
    'id': 'mdm-business-unit-org-access-watch',
    'parentId': 'mdm-business-unit',
    'label': '角色管理',
    'sort': null,
    'children': null,
    'leaf': true
  }], 'leaf': false
}, {
  'id': 'mdm-goods-manager',
  'parentId': null,
  'label': '货品主档',
  'sort': 2,
  'children': [{
    'id': 'mdm-goods-delete',
    'parentId': 'mdm-goods-manager',
    'label': '删除货品',
    'sort': null,
    'children': null,
    'leaf': true
  }, {
    'id': 'mdm-goods-check',
    'parentId': 'mdm-goods-manager',
    'label': '审核货品',
    'sort': null,
    'children': null,
    'leaf': true
  }, {
    'id': 'mdm-goods-export',
    'parentId': 'mdm-goods-manager',
    'label': '导出货品',
    'sort': null,
    'children': null,
    'leaf': true
  }, {
    'id': 'mdm-goods-edit',
    'parentId': 'mdm-goods-manager',
    'label': '编辑货品',
    'sort': null,
    'children': null,
    'leaf': true
  }, {
    'id': 'mdm-goods-import',
    'parentId': 'mdm-goods-manager',
    'label': '导入货品',
    'sort': null,
    'children': null,
    'leaf': true
  }, {
    'id': 'mdm-goods-add',
    'parentId': 'mdm-goods-manager',
    'label': '新增货品',
    'sort': null,
    'children': null,
    'leaf': true
  }],
  'leaf': false
}, {
  'id': 'mdm-operating-goods-manager',
  'parentId': null,
  'label': '经营货品',
  'sort': 3,
  'children': [
    {
      id: 'mdm-operating-goods-audit',
      label: '审核经营货品'
    },
    {
    'id': 'mdm-operating-goods-watch',
    'parentId': 'mdm-operating-goods-manager',
      'label': '查看经营货品',
    'sort': null,
    'children': null,
    'leaf': true
  }, {
    'id': 'mdm-operating-goods-delete',
    'parentId': 'mdm-operating-goods-manager',
    'label': '删除经营货品',
    'sort': null,
    'children': null,
    'leaf': true
  }, {
    'id': 'mdm-operating-goods-add',
    'parentId': 'mdm-operating-goods-manager',
    'label': '新增经营货品',
    'sort': null,
    'children': null,
    'leaf': true
  }],
  'leaf': false
}, {
  'id': 'mdm-batchNumber-manager',
  'parentId': null,
  'label': '疫苗批号文件管理',
  'sort': 4,
  'children': [{
    'id': 'mdm-batchNumber-add',
    'parentId': 'mdm-batchNumber-manager',
    'label': '新增批号',
    'sort': null,
    'children': null,
    'leaf': true
  }, {
    'id': 'mdm-batchNumber-file-upload',
    'parentId': 'mdm-batchNumber-manager',
    'label': '上传批号文件',
    'sort': null,
    'children': null,
    'leaf': true
  }, {
    'id': 'mdm-batchNumber-update',
    'parentId': 'mdm-batchNumber-manager',
    'label': '编辑批号',
    'sort': null,
    'children': null,
    'leaf': true
  }, {
    'id': 'mdm-batchNumber-confirm',
    'parentId': 'mdm-batchNumber-manager',
    'label': '确认批号文件',
    'sort': null,
    'children': null,
    'leaf': true
  }, {
    'id': 'mdm-batchNumber-audit',
    'parentId': 'mdm-batchNumber-manager',
    'label': '审核批号',
    'sort': null,
    'children': null,
    'leaf': true
  }, {
    'id': 'mdm-batchNumber-delete',
    'parentId': 'mdm-batchNumber-manager',
    'label': '删除批号',
    'sort': null,
    'children': null,
    'leaf': true
  }, {
    'id': 'batchNumber-zip-export',
    'parentId': 'vaccine-batch-process',
    'label': '下载疫苗批号文件附件',
    'sort': null,
    'children': null,
    'leaf': true
  }],
  'leaf': false
}, {
  'id': 'system-config',
  'parentId': null,
  'label': '系统设置',
  'sort': 5,
  'children': [{
    'id': 'dict-manager',
    'parentId': 'mdm-system-config',
    'label': '数据字典',
    'sort': 4,
    'children': [{
      'id': 'dict-group-softDelete',
      'parentId': 'dict-manager',
      'label': '删除数据字典组',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'dict-watch',
      'parentId': 'dict-manager',
      'label': '查看数据字典菜单',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'dict-item-update',
      'parentId': 'dict-manager',
      'label': '编辑数据字典项',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'dict-item-softDelete',
      'parentId': 'dict-manager',
      'label': '删除数据字典项',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'dict-group-update',
      'parentId': 'dict-manager',
      'label': '编辑数据字典组',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'dict-group-add',
      'parentId': 'dict-manager',
      'label': '新增数据字典组',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'dict-item-add',
      'parentId': 'dict-manager',
      'label': '新增数据字典项',
      'sort': null,
      'children': null,
      'leaf': true
    }],
    'leaf': false
  },
    {
    'id': 'mdm-org-user-manager',
    'parentId': 'mdm-system-config',
    'label': '单位用户管理',
    'sort': 1,
    'children': [{
      'id': 'mdm-manufacture-oms-org-user-watch',
      'parentId': 'mdm-org-user-manager',
      'label': '查看单位用户',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-manufacture-oms-org-user-edit',
      'parentId': 'mdm-org-user-manager',
      'label': '编辑单位用户',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-manufacture-oms-org-user-add',
      'parentId': 'mdm-org-user-manager',
      'label': '新增单位用户',
      'sort': null,
      'children': null,
      'leaf': true
    }],
    'leaf': false
  },
    {
    'id': 'access-role-manager',
    'parentId': 'mdm-system-config',
    'label': '角色管理',
    'sort': 2,
    'children': [{
      'id': 'mdm-access-role-delete',
      'parentId': 'mdm-user-role-manager',
      'label': '删除角色',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'access-role-add',
      'parentId': 'mdm-user-role-manager',
      'label': '新增角色',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'access-role-watch',
      'parentId': 'mdm-user-role-manager',
      'label': '查看角色',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'access-role-edit',
      'parentId': 'mdm-user-role-manager',
      'label': '编辑角色',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-access-role-stop',
      'parentId': 'mdm-user-role-manager',
      'label': '停用角色',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-access-platfrom-permission-export',
      'parentId': 'mdm-user-role-manager',
      'label': '平台角色权限导出',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-access-role-start',
      'parentId': 'mdm-user-role-manager',
      'label': '启用角色',
      'sort': null,
      'children': null,
      'leaf': true
    }],
    'leaf': false
  },
    {
    'id': 'mdm-platform-user-manager',
    'parentId': 'mdm-system-config',
    'label': '平台用户管理',
    'sort': 1,
    'children': [{
      'id': 'mdm-platform-user-add',
      'parentId': 'mdm-platform-user-manager',
      'label': '新增平台用户',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-platform-user-watch',
      'parentId': 'mdm-platform-user-manager',
      'label': '查看平台用户',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-access-platfrom-role-export',
      'parentId': 'mdm-platform-user-manager',
      'label': '平台用户角色分配导出',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-department-edit',
      'parentId': 'mdm-platform-user-manager',
      'label': '修改部门',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-platform-user-edit',
      'parentId': 'mdm-platform-user-manager',
      'label': '编辑平台用户',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-department-delete',
      'parentId': 'mdm-platform-user-manager',
      'label': '删除部门',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-department-add',
      'parentId': 'mdm-platform-user-manager',
      'label': '新增部门',
      'sort': null,
      'children': null,
      'leaf': true
    }],
    'leaf': false
  },
    {
    'id': 'mdm-system-log',
    'parentId': 'mdm-system-config',
    'label': '系统日志',
    'sort': 3,
    'children': null,
    'leaf': true
  },
    {
    'id': 'mdm-attachment-name-update',
    'parentId': 'mdm-system-config',
    'label': '编辑附件名称',
    'sort': 4,
    'children': null,
    'leaf': true
  }, {
    'id': 'mdm-goods-data-access-manager',
    'parentId': 'mdm-system-config',
    'label': '货品数据权限',
    'sort': 2,
    'children': [{
      'id': 'mdm-goods-data-access-role-delete',
      'parentId': 'mdm-goods-data-access-manager',
      'label': '删除货品数据权限角色',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-goods-data-access-role-watch',
      'parentId': 'mdm-goods-data-access-manager',
      'label': '查看货品数据权限角色',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-goods-data-access-role-add',
      'parentId': 'mdm-goods-data-access-manager',
      'label': '新增货品数据权限角色',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-goods-data-access-role-start',
      'parentId': 'mdm-goods-data-access-manager',
      'label': '启用货品数据权限角色',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-goods-data-access-role-edit',
      'parentId': 'mdm-goods-data-access-manager',
      'label': '编辑货品数据权限角色',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-goods-data-access-role-stop',
      'parentId': 'mdm-goods-data-access-manager',
      'label': '停用货品数据权限角色',
      'sort': null,
      'children': null,
      'leaf': true
    }],
    'leaf': false
  }, {
    'id': 'mdm-system-account-data-manager',
    'parentId': 'mdm-system-config',
    'label': '系统账号管理',
    'sort': 8,
    'children': [{
      'id': 'org-user-edit',
      'parentId': 'mdm-system-account-data-manager',
      'label': '停用账号',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'erp-system-account-export',
      'parentId': 'mdm-system-account-data-manager',
      'label': '导出账号',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-system-account-start',
      'parentId': 'mdm-system-account-data-manager',
      'label': '启用账号',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-system-account-add',
      'parentId': 'mdm-system-account-data-manager',
      'label': '添加账号',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-system-account-manager',
      'parentId': 'mdm-system-account-data-manager',
      'label': '查看系统账号管理',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-system-account-edit',
      'parentId': 'mdm-system-account-data-manager',
      'label': '编辑账号',
      'sort': null,
      'children': null,
      'leaf': true
    }],
    'leaf': false
  }, {
    'id': 'mdm-org-data-access-manager',
    'parentId': 'mdm-system-config',
    'label': '单位数据权限',
    'sort': 2,
    'children': [{
      'id': 'mdm-org-data-access-role-add',
      'parentId': 'mdm-org-data-access-manager',
      'label': '新增单位数据权限角色',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-org-data-access-role-start',
      'parentId': 'mdm-org-data-access-manager',
      'label': '启用单位数据权限角色',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-org-data-access-role-stop',
      'parentId': 'mdm-org-data-access-manager',
      'label': '停用单位数据权限角色',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-org-data-access-role-edit',
      'parentId': 'mdm-org-data-access-manager',
      'label': '编辑单位数据权限角色',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-org-data-access-role-watch',
      'parentId': 'mdm-org-data-access-manager',
      'label': '查看单位数据权限角色',
      'sort': null,
      'children': null,
      'leaf': true
    }, {
      'id': 'mdm-org-data-access-role-delete',
      'parentId': 'mdm-org-data-access-manager',
      'label': '删除单位数据权限角色',
      'sort': null,
      'children': null,
      'leaf': true
    }],
    'leaf': false
  }],
  'leaf': false
}];
