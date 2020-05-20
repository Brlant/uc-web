export default [{
  'id': 'data-model-manager',
  'parentId': null,
  'label': '主档模型管理',
  'sort': 3,
  'children': [
    {
      'id': 'check-data-model-manager',
      'parentId': 'data-model-manager',
      'label': '查看主档模型管理',
      'sort': null,
      'children': null,
      'leaf': true
    },
    {
      'id': 'standard-fields',
      'parentId': 'data-model-manager',
      'label': '标准字段',
      'sort': null,
      'children': null,
      'leaf': true
    },
    {
      'id': 'data-dictionary',
      'parentId': 'data-model-manager',
      'label': '数据字典',
      'sort': null,
      'children': null,
      'leaf': true
    },
    {
      'id': ' data-model',
      'parentId': 'data-model-manager',
      'label': '数据模型',
      'sort': null,
      'children': null,
      'leaf': true
    },
    {
      'id': ' menu-management',
      'parentId': 'data-model-manager',
      'label': '菜单管理',
      'sort': null,
      'children': null,
      'leaf': true
    },
    {
      'id': 'authority-management',
      'parentId': 'data-model-manager',
      'label': '权限管理',
      'sort': null,
      'children': null,
      'leaf': true
    },
    {
      'id': 'model-publishing',
      'parentId': 'data-model-manager',
      'label': '模型发布',
      'sort': null,
      'children': null,
      'leaf': true
    },
  ],
  'leaf': false
}, {
  'id': 'base-data-manager',
  'parentId': null,
  'label': '基础数据集',
  'sort': 3,
  'children': [
    {
      'id': 'check-base-data-manager',
      'parentId': 'base-data-manager',
      'label': '查看基础数据集',
      'sort': null,
      'children': null,
      'leaf': true
    },
    {
      'id': 'authorization-base-data-manager',
      'parentId': 'base-data-manager',
      'label': '基础数据集授权权限',
      'sort': null,
      'children': null,
      'leaf': true
    }
  ],
  'leaf': false
}, {
  'id': 'flow-model-app',
  'parentId': null,
  'label': '流程应用',
  'sort': 3,
  'children': [
    {
      'id': 'check-flow-model-app',
      'parentId': 'flow-model-app',
      'label': '查看流程应用',
      'sort': null,
      'children': null,
      'leaf': true
    }
  ],
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
  'label': '批号管理',
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
    'label': '审核通过',
    'sort': null,
    'children': null,
    'leaf': true
  },
    {
      'id': 'mdm-batchNumber-reject-audit',
      'parentId': 'mdm-batchNumber-reject-audit',
      'label': '审核不通过',
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
      'id': 'dict-group-export',
      'label': '导出数据字典组',
    }, {
      'id': 'dict-item-add',
      'parentId': 'dict-manager',
      'label': '新增数据字典项',
      'sort': null,
      'children': null,
      'leaf': true
    }],
    'leaf': false
  }, {
    'id': 'mdm-system-log',
    'parentId': 'mdm-system-config',
    'label': '系统日志',
    'sort': 3,
    'children': [
      {
        'id': 'platform-user-watch',
        'parentId': 'mdm-system-log',
        'label': '查询日志操作人',
        'sort': null,
        'children': null,
        'leaf': true
      }
    ],
    'leaf': false
  }, {
    'id': 'dhs-work-flow-audit',
    'parentId': 'mdm-system-config',
    'label': '工作流审核',
    'sort': 4,
    'children': null,
    'leaf': true
  }, {
    'id': 'mdm-attachment-name-update',
    'parentId': 'mdm-system-config',
    'label': '编辑附件名称',
    'sort': 4,
    'children': null,
    'leaf': true
  }],
  'leaf': false
}];
