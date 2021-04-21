export default [
  {
    id: 'supervise-setting-manager',
    label: '监管配置',
    children: [
      {
        id: 'supervise-setting-org-whitelist-manager',
        label: '监管单位白名单',
        children: [
          {
            id: 'supervise-setting-org-whitelist-query',
            label: '查看监管单位白名单',
          },
          {
            id: 'supervise-setting-org-whitelist-add',
            label: '新增监管单位白名单',
          },
          {
            id: 'supervise-setting-org-whitelist-delete',
            label: '删除监管单位白名单',
          }
        ]
      },
      {
        id: 'supervise-setting-lessee-whitelist-manager',
        label: '监管监管租户范围白名单',
        children: [
          {
            id: 'supervise-setting-lessee-whitelist-query',
            label: '查看监管租户范围白名单',
          },
          {
            id: 'supervise-setting-lessee-whitelist-add',
            label: '新增监管租户范围白名单',
          },
          {
            id: 'supervise-setting-lessee-whitelist-delete',
            label: '删除监管租户范围白名单',
          }
        ]
      },
      {
        id: 'supervise-setting-goods-whitelist-manager',
        label: '监管货品白名单',
        children: [
          {
            id: 'supervise-setting-goods-whitelist-query',
            label: '查看监管货品白名单',
          },
          {
            id: 'supervise-setting-goods-whitelist-add',
            label: '新增监管货品白名单',
          },
          {
            id: 'supervise-setting-goods-whitelist-delete',
            label: '删除监管货品白名单',
          }
        ]
      }
    ]
  },
  {
    id: 'goods-manager',
    parentId: null,
    label: '产品管理',
    leaf: false,
    children: [
      {
        'id': 'goods-manager-my',
        'parentId': 'goods-manager',
        'label': '我的产品',
        'sort': 1,
        'leaf': false,
        'children': [
          {
          'id': 'goods-manager-my-add',
          'parentId': 'goods-manager-my',
          'label': '新增产品子类',
          'sort': 1,
          'children': null,
          'leaf': true
        },{
          'id': 'goods-manager-my-view',
          'parentId': 'goods-manager-my',
          'label': '查看产品子类',
          'sort': 2,
          'children': null,
          'leaf': true
        },{
          'id': 'goods-manager-my-edit',
          'parentId': 'goods-manager-my',
          'label': '编辑产品子类',
          'sort': 3,
          'children': null,
          'leaf': true
        },{
            'id': 'goods-watch-my-sourceCode',
            'parentId': 'goods-manager-my',
            'label': '查看资源码',
            'sort': 3,
            'children': null,
            'leaf': true
          },{
            'id': 'goods-package-add',
            'parentId': 'goods-manager-my',
            'label': '新增包装层级',
            'sort': 3,
            'children': null,
            'leaf': true
          },{
          'id': 'goods-manager-my-delete',
          'parentId': 'goods-manager-my',
          'label': '删除产品子类',
          'sort': 4,
          'children': null,
          'leaf': true
        }/*,{
          'id': 'goods-manager-my-sourceCode',
          'parentId': 'goods-manager-my',
          'label': '编辑资源码',
          'sort': 5,
          'children': null,
          'leaf': true
        }*/]
      },
      {
        'id': 'goods-manager-platform',
        'parentId': 'goods-manager',
        'label': '平台产品管理',
        'sort': 1,
        'leaf': false,
        'children': [
          {
          'id': 'goods-manager-platform-add',
          'parentId': 'goods-manager-platform',
          'label': '新增产品子类',
          'sort': 1,
          'children': null,
          'leaf': true
        },{
          'id': 'goods-manager-platform-view',
          'parentId': 'goods-manager-platform',
          'label': '查看产品子类',
          'sort': 2,
          'children': null,
          'leaf': true
        },{
          'id': 'goods-manager-platform-edit',
          'parentId': 'goods-manager-platform',
          'label': '编辑产品子类',
          'sort': 3,
          'children': null,
          'leaf': true
        },{
          'id': 'goods-manager-platform-delete',
          'parentId': 'goods-manager-platform',
          'label': '删除产品子类',
          'sort': 4,
          'children': null,
          'leaf': true
        },{
            'id': 'goods-platform-watch-my-sourceCode',
            'parentId': 'goods-manager-my',
            'label': '查看资源码',
            'sort': 3,
            'children': null,
            'leaf': true
          },{
            'id': 'goods-platform-package-add',
            'parentId': 'goods-manager-my',
            'label': '新增包装层级',
            'sort': 3,
            'children': null,
            'leaf': true
          }/*,{
          'id': 'goods-manager-platform-sourceCode',
          'parentId': 'goods-manager-platform',
          'label': '编辑资源码',
          'sort': 5,
          'children': null,
          'leaf': true
        }*/]
      }
    ]
  },
  {
    id: 'traceCode-data',
    parentId: null,
    label: '追溯码数据',
    leaf: false,
    children: [
      {
        'id': 'codes-file-batch-upload-manager',
        'parentId': 'code-data-manager',
        'label': '源文件批量上传',
        'sort': 1,
        'children': [{
          'id': 'codes-file-batch-upload',
          'parentId': 'codes-file-batch-upload-manager',
          'label': '新增源文件批量上传',
          'sort': 2,
          'children': null,
          'leaf': true
        }],
        'leaf': false
      }, {
        'id': 'traceCode-data-apply',
        'parentId': 'traceCode-data',
        'label': '追溯码申请',
        'sort': 1,
        'leaf': false,
        children: [
          {
            'id': 'traceCode-data-apply-view',
            'parentId': 'traceCode-data-apply',
            'label': '查看追溯码详情',
            'sort': 1,
            'children': null,
            'leaf': true
          },
          {
            'id': 'traceCode-data-apply-apply',
            'parentId': 'traceCode-data-apply',
            'label': '申请追溯码',
            'sort': 2,
            'children': null,
            'leaf': true
          },
          {
            'id': 'traceCode-data-apply-download',
            'parentId': 'traceCode-data-apply',
            'label': '下载追溯码',
            'sort': 3,
            'children': null,
            'leaf': true
          },
          {
            'id': 'traceCode-data-apply-finishDownload',
            'parentId': 'traceCode-data-apply',
            'label': '完成追溯码下载',
            'sort': 4,
            'children': null,
            'leaf': true
          }
        ]
      },
      {
        'id': 'traceCode-data-platformApply',
        'parentId': 'traceCode-data',
        'label': '平台追溯码申请',
        'sort': 1,
        'leaf': false,
        children: [
          {
            'id': 'traceCode-data-platformApply-view',
            'parentId': 'traceCode-data-platformApply',
            'label': '平台查看追溯码详情',
            'sort': 1,
            'children': null,
            'leaf': true
          },
          {
            'id': 'traceCode-data-platformApply-download',
            'parentId': 'traceCode-data-platformApply',
            'label': '平台下载追溯码',
            'sort': 2,
            'children': null,
            'leaf': true
          }
        ]
      },
      {
        'id': 'traceCode-data-replace',
        'parentId': 'traceCode-data',
        'label': '追溯码替换',
        'sort': 2,
        'leaf': false,
        children: [
          {
            'id': 'traceCode-data-replace-view',
            'parentId': 'traceCode-data-replace',
            'label': '查看追溯码替换',
            'sort': 1,
            'children': null,
            'leaf': true
          },
          {
            'id': 'traceCode-data-replace-add',
            'parentId': 'traceCode-data-replace',
            'label': '新增追溯码替换',
            'sort': 2,
            'children': null,
            'leaf': true
          }
        ]
      },
      {
        'id': 'traceCode-data-platformReplace',
        'parentId': 'traceCode-data',
        'label': '平台追溯码替换',
        'sort': 3,
        'leaf': false,
        children: [
          {
            'id': 'traceCode-data-platformReplace-view',
            'parentId': 'traceCode-data-platformReplace',
            'label': '查看追溯码替换',
            'sort': 1,
            'children': null,
            'leaf': true
          },
          {
            'id': 'traceCode-data-platformReplace-add',
            'parentId': 'traceCode-data-platformReplace',
            'label': '新增追溯码替换',
            'sort': 2,
            'children': null,
            'leaf': true
          }
        ]
      },
      {
        'id': 'traceCode-data-cancel',
        'parentId': 'traceCode-data',
        'label': '追溯码注销',
        'sort': 4,
        'leaf': false,
        children: [
          {
            'id': 'traceCode-data-cancel-view',
            'parentId': 'traceCode-data-cancel',
            'label': '查看追溯码注销',
            'sort': 1,
            'children': null,
            'leaf': true
          },
          {
            'id': 'traceCode-data-cancel-add',
            'parentId': 'traceCode-data-cancel',
            'label': '新增追溯码注销',
            'sort': 2,
            'children': null,
            'leaf': true
          }
        ]
      },
      {
        'id': 'traceCode-data-platformCancel',
        'parentId': 'traceCode-data',
        'label': '平台追溯码注销',
        'sort': 5,
        'leaf': false,
        children: [
          {
            'id': 'traceCode-data-platformCancel-view',
            'parentId': 'traceCode-data-platformCancel',
            'label': '查看追溯码注销',
            'sort': 1,
            'children': null,
            'leaf': true
          },
          {
            'id': 'traceCode-data-platformCancel-add',
            'parentId': 'traceCode-data-platformCancel',
            'label': '新增追溯码注销',
            'sort': 2,
            'children': null,
            'leaf': true
          }
        ]
      },
      {
        id: 'code-source-upload-log-query',
        label: '查看追溯码源文件上传监控'
      },
      {
        'id': 'traceCode-data-relation-delete',
        'parentId': 'traceCode-data',
        'label': '关联关系删除',
        'sort': 6,
        'leaf': false,
        children: [
          {
            'id': 'traceCode-data-relation-delete-view',
            'parentId': 'traceCode-data-relation-delete',
            'label': '查看关联关系删除',
            'sort': 1,
            'children': null,
            'leaf': true
          }
        ]
      },
      {
        'id': 'traceCode-data-platform-relation-delete',
        'parentId': 'traceCode-data',
        'label': '平台关联关系删除',
        'sort': 7,
        'leaf': false,
        children: [
          {
            'id': 'traceCode-data-platform-relation-delete-view',
            'parentId': 'traceCode-data-platform-relation-delete',
            'label': '查看平台关联关系删除',
            'sort': 1,
            'children': null,
            'leaf': true
          }
        ]
      }
    ]
  },
  {
    id: 'data-monitoring-manager',
    label: '追溯源数据监控',
    children: [
      {
        id: 'code-source-upload-log-query',
        label: '查看追溯码源文件上传监控'
      },
      {
        id: 'exception-codes-file-query',
        label: '查看异常追溯码标记上传监控'
      }
    ]
  },
  {
    'id': 'code-trace-manager',
    'parentId': null,
    'label': '追溯查询',
    'sort': 2,
    'children': [
      {
        'id': 'code-trace-query',
        'parentId': 'code-trace-manager',
        'label': '最小销售单位追溯码查询',
        'sort': 1,
        'children': [{
          'id': 'single-code-trace-query',
          'parentId': 'code-trace-query',
          'label': '查询最小销售单位追溯码查询',
          'sort': 1,
          'children': null,
          'leaf': true
        }, {
          'id': 'code-trace-injection-query',
          'parentId': 'code-trace-query',
          'label': '查询接种日志信息',
          'sort': 2,
          'children': null,
          'leaf': true
        }, {
          'id': 'code-trace-log-delete',
          'parentId': 'code-trace-query',
          'label': '删除追溯码日志',
          'sort': 1,
          'children': null,
          'leaf': true
        },  {
          'id': 'code-trace-query-all',
          'parentId': 'code-trace-query',
          'label': '查询所有的追溯码日志信息',
          'sort': 2,
          'children': null,
          'leaf': true
        }, {
          'id': 'code-trace-query-goods-all',
          'parentId': 'code-trace-query',
          'label': '查询所有货品的追溯码日志信息',
          'sort': 2,
          'children': null,
          'leaf': true
        }, {
          'id': 'code-trace-exception-query',
          'parentId': 'code-trace-query',
          'label': '查询异常日志信息',
          'sort': 2,
          'children': null,
          'leaf': true
        }, {
          'id': 'wechat-single-code-trace-query',
          'parentId': 'code-trace-query',
          'label': '微信小程序查询单只追溯码',
          'sort': 1,
          'children': null,
          'leaf': true
        }, {
          'id': 'code-trace-json-download',
          'parentId': 'code-trace-query',
          'label': '下载json数据',
          'sort': 2,
          'children': null,
          'leaf': true
        }],
        'leaf': false
      },
      {
        'id': 'physical-goods-trace',
        'parentId': 'code-trace-manager',
        'label': '实物追溯查询',
        'sort': 2,
        'children': [{
          'id': 'physical-goods-trace-query',
          'parentId': 'physical-goods-trace',
          'label': '查看实物追溯查询',
          'sort': 1,
          'children': null,
          'leaf': true
        }, {
          'id': 'physical-goods-trace-add',
          'parentId': 'physical-goods-trace',
          'label': '新增实物追溯查询任务',
          'sort': 1,
          'children': null,
          'leaf': true
        }],
        'leaf': false
      },
      {
        'id': 'batch-number-trace',
        'parentId': 'code-trace-manager',
        'label': '流转分布追溯查询',
        'sort': 2,
        'children': [{
          'id': 'batch-number-trace-query',
          'parentId': 'batch-number-trace',
          'label': '查看流转分布追溯查询',
          'sort': 1,
          'children': null,
          'leaf': true
        }, {
          'id': 'batch-number-trace-add',
          'parentId': 'batch-number-trace',
          'label': '新增流转分布追溯查询任务',
          'sort': 1,
          'children': null,
          'leaf': true
        }],
        'leaf': false
      },
    ],
    'leaf': false
  },
  {
    id: 'data-line-monitoring-manager',
    label: '追溯源数据监控',
    children: [
      {
        id: 'code-biz-trace',
        label: '业务追溯数据监管',
        children:[
          {
            'id': 'code-biz-trace-watch',
            'parentId': 'code-biz-trace',
            'label': '查看业务追溯数据监管',
            'sort': 3,
            'children': null,
            'leaf': true
          },{
            'id': 'code-biz-trace-order-delete',
            'parentId': 'code-biz-trace',
            'label': '删除业务单据',
            'sort': 3,
            'children': null,
            'leaf': true
          }, {
            'id': 'code-biz-trace-unknow-code-download',
            'parentId': 'code-biz-trace',
            'label': '下载未知追溯码',
            'sort': 3,
            'children': null,
            'leaf': true
          },{
            'id': 'code-biz-trace-know-code-download',
            'parentId': 'code-biz-trace',
            'label': '下载已知追溯码',
            'sort': 3,
            'children': null,
            'leaf': true
          },{
            'id': 'code-biz-trace-code-excel-export',
            'parentId': 'code-biz-trace',
            'label': '导出追溯码Excel',
            'sort': 3,
            'children': null,
            'leaf': true
          }
        ]
      },
      {
        id: 'logistics-trace-query',
        label: '物流追溯数据监管'
      },
      {
        id: 'terminal-trace-query',
        label: '终端追溯监管'
      }
    ]
  },
  {
    id: 'query-all-supervise-unit',
    label: '查看所有单位'
  },
  {
    id: 'query-all-supervise-goods',
    label: '查看所有货品'
  },
  {
    'id': 'system-config',
    'parentId': null,
    'label': '系统管理',
    'sort': 3,
    'children': [
      {
        'id': 'code-access-log-watch',
        'parentId': 'code-system-manager',
        'label': '单支追溯查询日志',
        'sort': 5,
        'children': null,
        'leaf': true
      },
      {
      'id': 'code-system-log-query',
      'parentId': 'code-system-manager',
      'label': '系统日志',
      'sort': 5,
      'children': null,
      'leaf': true
    }, {
      'id': 'code-account-manager',
      'parentId': 'code-system-manager',
      'label': 'TSS账户管理',
      'sort': 4,
      'children': [{
        'id': 'code-account-query',
        'parentId': 'code-account-manager',
        'label': '查看账户',
        'sort': 3,
        'children': null,
        'leaf': true
      }, {
        'id': 'code-account-add',
        'parentId': 'code-account-manager',
        'label': '新增账户',
        'sort': 1,
        'children': null,
        'leaf': true
      }, {
        'id': 'code-account-edit',
        'parentId': 'code-account-manager',
        'label': '编辑账户',
        'sort': 2,
        'children': null,
        'leaf': true
      }],
      'leaf': false
    }, {
      'id': 'code-push-address-manager',
      'parentId': 'code-system-manager',
      'label': '推送地址管理',
      'sort': 2,
      'children': [{
        'id': 'code-push-address-add',
        'parentId': 'code-push-address-manager',
        'label': '推送地址新增',
        'sort': 2,
        'children': null,
        'leaf': true
      }, {
        'id': 'code-push-address-query',
        'parentId': 'code-push-address-manager',
        'label': '推送地址查询',
        'sort': 1,
        'children': null,
        'leaf': true
      }, {
        'id': 'code-oauth-client-details-watch',
        'parentId': 'code-push-address-manager',
        'label': '查看API账号',
        'sort': 5,
        'children': null,
        'leaf': true
      }, {
        'id': 'code-push-address-edit',
        'parentId': 'code-push-address-manager',
        'label': '推送地址编辑',
        'sort': 3,
        'children': null,
        'leaf': true
      }, {
        'id': 'code-push-address-delete',
        'parentId': 'code-push-address-manager',
        'label': '推送地址删除',
        'sort': 4,
        'children': null,
        'leaf': true
      }],
      'leaf': false
    }, {
      'id': 'access-role-manager',
      'parentId': 'code-system-manager',
      'label': 'TSS角色管理',
      'sort': 3,
      'children': [{
        'id': 'codes-access-role-start',
        'parentId': 'codes-user-role-manager',
        'label': '启用角色',
        'sort': 3,
        'children': null,
        'leaf': true
      }, {
        'id': 'access-role-edit',
        'parentId': 'codes-user-role-manager',
        'label': '编辑角色',
        'sort': 2,
        'children': null,
        'leaf': true
      }, {
        'id': 'codes-access-role-stop',
        'parentId': 'codes-user-role-manager',
        'label': '停用角色',
        'sort': 4,
        'children': null,
        'leaf': true
      }, {
        'id': 'access-role-add',
        'parentId': 'codes-user-role-manager',
        'label': '新增角色',
        'sort': 1,
        'children': null,
        'leaf': true
      }, {
        'id': 'codes-access-role-delete',
        'parentId': 'codes-user-role-manager',
        'label': '删除角色',
        'sort': 5,
        'children': null,
        'leaf': true
      }, {
        'id': 'access-role-watch',
        'parentId': 'codes-user-role-manager',
        'label': '查看角色',
        'sort': 6,
        'children': null,
        'leaf': true
      }],
      'leaf': false
    },
      {
      'id': 'code-permission-manager',
      'parentId': 'code-system-manager',
      'label': 'TSS单位账户管理',
      'sort': 1,
      'children': [{
        'id': 'code-org-user-edit',
        'parentId': 'code-permission-manager',
        'label': '编辑单位账户',
        'sort': 2,
        'children': null,
        'leaf': true
      }, {
        'id': 'code-org-role-watch',
        'parentId': 'code-permission-manager',
        'label': '查看权限配置',
        'sort': 5,
        'children': null,
        'leaf': true
      }, {
        'id': 'code-org-user-add',
        'parentId': 'code-permission-manager',
        'label': '新增单位账户',
        'sort': 1,
        'children': null,
        'leaf': true
      }],
      'leaf': false
    }, {
        id: 'code-access-manager',
        label: '货品追溯权限分配',
        children: [
          {
            id: 'code-access-add',
            label: '新增货品追溯权限'
          },
          {
            id: 'code-access-query',
            label: '查看货品追溯权限'
          },
          {
            id: 'code-access-delete',
            label: '删除货品追溯权限'
          },
        ]
      },{
        'id': 'mdm-operating-goods-manager',
        'parentId': null,
        'label': '经营货品',
        'sort': 3,
        'children': [
          {
            'id': 'mdm-operating-goods-watch',
            'parentId': 'mdm-operating-goods-manager',
            'label': '查看经营货品',
            'sort': null,
            'children': null,
            'leaf': true
          },{
            'id': 'mdm-operating-goods-audit',
            'parentId': 'mdm-operating-goods-manager',
            'label': '审核经营货品',
            'sort': null,
            'children': null,
            'leaf': true
          }],
        'leaf': false
      },
      {
        'id': 'tbs-access-role-manager',
        'parentId': 'code-system-manager',
        'label': 'TBS角色管理',
        'sort': 3,
        'leaf': false
      }, {
        'id': 'tbs-code-permission-manager',
        'parentId': 'code-system-manager',
        'label': 'TBS单位账户管理',
        'sort': 1,
        'leaf': false
      }],
    'leaf': false
  }];
