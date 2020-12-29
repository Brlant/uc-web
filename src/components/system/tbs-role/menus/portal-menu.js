export default [
  {
    'id': 'base-data-manager',
    'parentId': null,
    'label': '基础资料',
    children: [
      {
        'id': 'code-batch-number-manager',
        'parentId': 'code-data-manager',
        'label': '批号管理',
        'sort': 4,
        'children': [{
          'id': 'mdm-batchNumber-add',
          'parentId': 'code-batch-number-manager',
          'label': '新增批号',
          'sort': 2,
          'children': null,
          'leaf': true
        }, {
          'id': 'mdm-batchNumber-delete',
          'parentId': 'code-batch-number-manager',
          'label': '删除批号',
          'sort': 4,
          'children': null,
          'leaf': true
        }, {
          'id': 'code-batch-number-query',
          'parentId': 'code-batch-number-manager',
          'label': '查询批号',
          'sort': 1,
          'children': null,
          'leaf': true
        }, {
          'id': 'code-batch-number-attachment-upload',
          'parentId': 'code-batch-number-manager',
          'label': '批号文件上传',
          'sort': 4,
          'children': null,
          'leaf': true
        }, {
          'id': 'mdm-batchNumber-update',
          'parentId': 'code-batch-number-manager',
          'label': '编辑批号',
          'sort': 3,
          'children': null,
          'leaf': true
        }],
        'leaf': false
      },
      {
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
          'id': 'mdm-goods-edit',
          'parentId': 'mdm-goods-manager',
          'label': '编辑货品',
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
      },
      {
        id: 'mdm-business-unit',
        label: '单位信息',
        children: [
          {
            id: 'mdm-business-unit-query',
            label: '查看单位',
          },
          {
            id: 'mdm-business-unit-add',
            label: '新增单位',
          }
        ]
      },
      {
        id: 'own-business-manager',
        label: '我的单位',
        children: [
          {
            id: 'own-business-query',
            label: '查看我的单位',
          },
          {
            id: 'mdm-biz-edit',
            label: '编辑我的单位',
          }
        ]
      },
      {
        'id': 'org-logistics-manager',
        'parentId': 'bsp-stock-manager',
        'label': '我的物流中心',
        'sort': 1,
        'children': [{
          'id': 'org-logistics-edit',
          'parentId': 'org-logistics-manager',
          'label': '编辑物流中心',
          'sort': 3,
          'children': null,
          'leaf': true
        }, {
          'id': 'org-logistics-query',
          'parentId': 'org-logistics-manager',
          'label': '查看物流中心',
          'sort': 1,
          'children': null,
          'leaf': true
        }, {
          'id': 'org-logistics-add',
          'parentId': 'org-logistics-manager',
          'label': '新增物流中心',
          'sort': 2,
          'children': null,
          'leaf': true
        }, {
          'id': 'org-logistics-delete',
          'parentId': 'org-logistics-manager',
          'label': '删除物流中心',
          'sort': 4,
          'children': null,
          'leaf': true
        }, {
          id: 'org-warehouse-add',
          label: '添加仓库'
        }, {
          id: 'org-warehouse-edit',
          label: '编辑仓库'
        }, {
          id: 'org-warehouse-delete',
          label: '删除仓库'
        },
          {
            id: 'org-warehouse-dev-query',
            label: '查看设备'
          }
        ],
        'leaf': false
      },
      {
        'id': 'mdm-org-licence-add',
        'parentId': 'mdm-goods-owner-baseInfo',
        'label': '新增单位证照',
        'sort': null,
        'children': null,
        'leaf': true
      },
      {
        'id': 'mdm-org-licence-delete',
        'parentId': 'mdm-goods-owner-baseInfo',
        'label': '删除单位证照',
        'sort': null,
        'children': null,
        'leaf': true
      },
      {
        'id': 'mdm-org-licence-edit',
        'parentId': 'mdm-goods-owner-baseInfo',
        'label': '编辑单位证照',
        'sort': null,
        'children': null,
        'leaf': true
      },
      {
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
          }, {
            id: 'mdm-operating-goods-update',
            label: '编辑货主编码'
          }],
        'leaf': false
      },
      {
        'id': 'mdm-operating-org-manager',
        'parentId': null,
        'label': '往来单位',
        'sort': 3,
        'children': [
          {
            'id': 'mdm-operating-org-watch',
            'parentId': 'mdm-operating-org-manager',
            'label': '查看往来单位',
            'sort': null,
            'children': null,
            'leaf': true
          },
          {
            'id': 'mdm-operating-org-delete',
            'parentId': 'mdm-operating-org-manager',
            'label': '删除往来单位',
            'sort': null,
            'children': null,
            'leaf': true
          },
          {
            'id': 'mdm-operating-org-update',
            'parentId': 'mdm-operating-org-manager',
            'label': '编辑往来单位编码',
            'sort': null,
            'children': null,
            'leaf': true
          },
          {
            'id': 'mdm-operating-org-add',
            'parentId': 'mdm-operating-org-manager',
            'label': '新增往来单位',
            'sort': null,
            'children': null,
            'leaf': true
          },
          {
            'id': 'mdm-operating-org-batch-add',
            'parentId': 'mdm-operating-org-manager',
            'label': '导入TXT批量新增往来单位',
            'sort': null,
            'children': null,
            'leaf': true
          },{
            'id': 'mdm-operating-org-excel-batch-add',
            'parentId': 'mdm-operating-org-manager',
            'label': '导入EXCEL批量新增往来单位',
            'sort': null,
            'children': null,
            'leaf': true
          }],
        'leaf': false
      }
    ]
  },
  {
    'id': 'code-data-manager',
    'parentId': null,
    'label': '追溯码数据',
    'sort': 1,
    'children': [
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
      },{
        'id': 'goods-codes-upload',
        'parentId': 'code-data-manager',
        'label': '源文件上传',
        'sort': 1,
        'children': [{
          'id': 'codes-file-upload',
          'parentId': 'goods-codes-upload',
          'label': '新增源文件上传',
          'sort': 1,
          'children': null,
          'leaf': true
        }, {
          'id': 'create-product-in-warehouse-order',
          'parentId': 'goods-codes-upload',
          'label': '生成成品入库订单',
          'sort': 1,
          'children': null,
          'leaf': true
        }, {
          'id': 'codes-file-bind-share-domain',
          'parentId': 'goods-codes-upload',
          'label': '数据共享域名',
          'sort': 3,
          'children': null,
          'leaf': true
        }, {
          'id': 'codes-file-query',
          'parentId': 'goods-codes-upload',
          'label': '查看源文件上传',
          'sort': 2,
          'children': null,
          'leaf': true
        }, {
          'id': 'codes-file-bind-delete',
          'parentId': 'goods-codes-upload',
          'label': '删除关联关系',
          'sort': 4,
          'children': null,
          'leaf': true
        }],
        'leaf': false
      },
      {
        'id': 'goods-manager-my',
        'parentId': 'code-data-manager',
        'label': '我的产品',
        'sort': 2,
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
        'id': 'traceCode-data-apply',
        'parentId': 'code-data-manager',
        'label': '追溯码申请',
        'sort': 3,
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
        'id': 'traceCode-data-replace',
        'parentId': 'code-data-manager',
        'label': '追溯码替换',
        'sort': 4,
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
        'id': 'traceCode-data-cancel',
        'parentId': 'code-data-manager',
        'label': '追溯码注销',
        'sort': 5,
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
        'id': 'traceCode-data-relation-delete',
        'parentId': 'code-data-manager',
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
        'id': 'biz-codes-upload',
        'parentId': 'code-data-manager',
        'label': '业务追溯上传',
        'sort': 6,
        'children': [{
          'id': 'biz-codes-file-query',
          'parentId': 'biz-codes-upload',
          'label': '查看业务追溯上传信息',
          'sort': 2,
          'children': null,
          'leaf': true
        }, {
          'id': 'biz-codes-file-upload',
          'parentId': 'biz-codes-upload',
          'label': '新增业务追溯上传',
          'sort': 1,
          'children': null,
          'leaf': true
        }, {
          id: 'biz-codes-file-upload-xml',
          label: '上传业务数据XML'
        }, {
          id: 'biz-codes-file-batch-out-add',
          label: '整批出库'
        }],
        'leaf': false
      },
      {
        'id': 'exception-codes-upload',
        'parentId': 'code-data-manager',
        'label': '异常追溯上传',
        'sort': 7,
        'children': [{
          'id': 'exception-codes-file-query',
          'parentId': 'exception-codes-upload',
          'label': '查看异常追溯上传信息',
          'sort': 3,
          'children': null,
          'leaf': true
        }, {
          'id': 'exception-codes-file-upload',
          'parentId': 'exception-codes-upload',
          'label': '新增异常追溯文件上传',
          'sort': 1,
          'children': null,
          'leaf': true
        }, {
          'id': 'exception-codes-goods-upload',
          'parentId': 'exception-codes-upload',
          'label': '通过货品、批号新增异常追溯',
          'sort': 2,
          'children': null,
          'leaf': true
        }],
        'leaf': false
      },
      {
        'id': 'gs1-rule-manager',
        'parentId': 'code-data-manager',
        'label': 'GS1编制结构管理',
        'sort': 8,
        'children': [
          {
            'id': 'gs1-rule-edit',
            'parentId': 'gs1-rule-manager',
            'label': '编辑GS1编制结构',
            'sort': 3,
            'children': null,
            'leaf': true
          }, {
            'id': 'gs1-rule-delete',
            'parentId': 'gs1-rule-manager',
            'label': '删除GS1编制结构',
            'sort': 4,
            'children': null,
            'leaf': true
          }, {
            'id': 'gs1-rule-add',
            'parentId': 'gs1-rule-manager',
            'label': '新增GS1编制结构',
            'sort': 2,
            'children': null,
            'leaf': true
          }, {
            'id': 'gs1-rule-query',
            'parentId': 'gs1-rule-manager',
            'label': '查询GS1编制结构',
            'sort': 1,
            'children': null,
            'leaf': true
          }],
        'leaf': false
      },
      {
        'id': 'electron-code-rule-manager',
        'parentId': 'code-data-manager',
        'label': '电子监管码编制结构管理',
        'sort': 9,
        'children': [
          {
            'id': 'electron-code-rule-edit',
            'parentId': 'electron-code-rule-manager',
            'label': '编辑电子监管码编制结构',
            'sort': 3,
            'children': null,
            'leaf': true
          }, {
            'id': 'electron-code-rule-delete',
            'parentId': 'electron-code-rule-manager',
            'label': '删除电子监管码编制结构',
            'sort': 4,
            'children': null,
            'leaf': true
          }, {
            'id': 'electron-code-rule-add',
            'parentId': 'electron-code-rule-manager',
            'label': '新增电子监管码编制结构',
            'sort': 2,
            'children': null,
            'leaf': true
          }, {
            'id': 'electron-code-rule-query',
            'parentId': 'electron-code-rule-manager',
            'label': '查询电子监管码编制结构',
            'sort': 1,
            'children': null,
            'leaf': true
          }],
        'leaf': false
      }
    ],
    'leaf': false
  },
  {
    'id': 'code-trace-manager',
    'parentId': null,
    'label': '追溯查询',
    'sort': 2,
    'children': [{
      'id': 'code-injection-trace',
      'parentId': 'code-trace-manager',
      'label': '终端使用/销售记录',
      'sort': 4,
      'children': null,
      'leaf': true
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
      {
        'id': 'code-trace-query',
        'parentId': 'code-trace-manager',
        'label': '追溯码追溯查询',
        'sort': 1,
        'children': [{
          'id': 'single-code-trace-query',
          'parentId': 'code-trace-query',
          'label': '查询单只追溯码',
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
        }, {
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
      }, {
        'id': 'code-biz-trace',
        'parentId': 'code-trace-manager',
        'label': '业务追溯查询',
        'sort': 3,
        'children': [{
          'id': 'code-biz-trace-view',
          'parentId': 'code-biz-trace',
          'label': '查看业务追溯',
          'sort': 3,
          'children': null,
          'leaf': true
        },{
          'id': 'code-biz-log-push',
          'parentId': 'code-biz-trace',
          'label': '推送数据',
          'sort': 3,
          'children': null,
          'leaf': true
        }, {
          'id': 'code-biz-trace-insert-code',
          'parentId': 'code-biz-trace',
          'label': '录入追溯码日志',
          'sort': 2,
          'children': null,
          'leaf': true
        }, {
          'id': 'code-biz-trace-delete-code',
          'parentId': 'code-biz-trace',
          'label': '删除追溯码日志',
          'sort': 1,
          'children': null,
          'leaf': true
        },{
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
        }],
        'leaf': false
      }, {
        'id': 'code-biz-in-trace',
        'parentId': 'code-trace-manager',
        'label': '入库单追溯',
        'sort': 3,
        'children': [{
          'id': 'code-biz-in-trace-view',
          'parentId': 'code-biz-in-trace',
          'label': '查看入库单追溯',
          'sort': 3,
          'children': null,
          'leaf': true
        },{
          'id': 'code-biz-in-log-push',
          'parentId': 'code-biz-in-trace',
          'label': '推送数据',
          'sort': 3,
          'children': null,
          'leaf': true
        }, {
          'id': 'code-biz-in-trace-insert-code',
          'parentId': 'code-biz-in-trace',
          'label': '添加追溯码日志',
          'sort': 2,
          'children': null,
          'leaf': true
        }, {
          'id': 'code-biz-in-trace-delete-code',
          'parentId': 'code-biz-in-trace',
          'label': '删除追溯码日志',
          'sort': 1,
          'children': null,
          'leaf': true
        },{
          'id': 'code-biz-in-trace-unknow-code-download',
          'parentId': 'code-biz-trace',
          'label': '下载未知追溯码',
          'sort': 3,
          'children': null,
          'leaf': true
        },{
          'id': 'code-biz-in-trace-know-code-download',
          'parentId': 'code-biz-trace',
          'label': '下载已知追溯码',
          'sort': 3,
          'children': null,
          'leaf': true
        },{
          'id': 'code-biz-in-trace-code-excel-export',
          'parentId': 'code-biz-trace',
          'label': '导出追溯码Excel',
          'sort': 3,
          'children': null,
          'leaf': true
        }],
        'leaf': false
      }, {
        'id': 'code-biz-out-trace',
        'parentId': 'code-trace-out-manager',
        'label': '出库单追溯',
        'sort': 3,
        'children': [{
          'id': 'code-biz-out-trace-view',
          'parentId': 'code-biz-out-trace',
          'label': '查看出库单追溯',
          'sort': 3,
          'children': null,
          'leaf': true
        },{
          'id': 'code-biz-out-log-push',
          'parentId': 'code-biz-out-trace',
          'label': '推送数据',
          'sort': 3,
          'children': null,
          'leaf': true
        }, {
          'id': 'code-biz-out-trace-insert-code',
          'parentId': 'code-biz-out-trace',
          'label': '录入追溯码日志',
          'sort': 2,
          'children': null,
          'leaf': true
        }, {
          'id': 'code-biz-out-trace-delete-code',
          'parentId': 'code-biz-out-trace',
          'label': '删除追溯码日志',
          'sort': 1,
          'children': null,
          'leaf': true
        },{
          'id': 'code-biz-out-trace-unknow-code-download',
          'parentId': 'code-biz-trace',
          'label': '下载未知追溯码',
          'sort': 3,
          'children': null,
          'leaf': true
        },{
          'id': 'code-biz-out-trace-know-code-download',
          'parentId': 'code-biz-trace',
          'label': '下载已知追溯码',
          'sort': 3,
          'children': null,
          'leaf': true
        },{
          'id': 'code-biz-out-trace-code-excel-export',
          'parentId': 'code-biz-trace',
          'label': '导出追溯码Excel',
          'sort': 3,
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
      }],
    'leaf': false
  },
  {
    'id': 'bsp-order-manager',
    'parentId': null,
    'label': '订单管理',
    'sort': 1,
    'children': [
      {
        'id': 'bsp-in-order-return',
        'parentId': 'bsp-order-manager',
        'label': '退货订单',
        'sort': 7,
        'leaf': false
      },
      {
        'id': 'bsp-in-order-org-need',
        'parentId': 'bsp-order-manager',
        'label': '需求订单',
        'sort': 7,
        'leaf': false
      },
      {
        'id': 'bsp-in-order-org-query-purchase-in',
        'parentId': 'bsp-order-manager',
        'label': '采购入库',
        'sort': 7,
        'leaf': false
      },
      {
        'id': 'bsp-in-order-org-query-sale-return',
        'parentId': 'bsp-order-manager',
        'label': '销售退货',
        'sort': 7,
        'leaf': false
      },
      {
        'id': 'bsp-in-order-org-query-full-in',
        'parentId': 'bsp-order-manager',
        'label': '盘盈入库',
        'sort': 7,
        'leaf': false
      },
      {
        'id': 'bsp-in-order-org-query-allot-in',
        'parentId': 'bsp-order-manager',
        'label': '调拨入库',
        'sort': 7,
        'leaf': false
      },
      {
        'id': 'bsp-in-order-org-query-product-in',
        'parentId': 'bsp-order-manager',
        'label': '成品入库',
        'sort': 7,
        'leaf': false
      },


      {
        'id': 'bsp-out-order-org-query-sale-out',
        'parentId': 'bsp-order-manager',
        'label': '销售出库',
        'sort': 8,
        'leaf': false
      },
      {
        'id': 'bsp-out-order-org-query-purchase-out',
        'parentId': 'bsp-order-manager',
        'label': '采购退货',
        'sort': 8,
        'leaf': false
      },

      {
        'id': 'bsp-out-order-org-query-loss-out',
        'parentId': 'bsp-order-manager',
        'label': '盘亏出库',
        'sort': 8,
        'leaf': false
      },

      {
        'id': 'bsp-out-order-org-query-allot-out',
        'parentId': 'bsp-order-manager',
        'label': '调拨出库',
        'sort': 8,
        'leaf': false
      },

      {
        'id': 'bsp-out-order-org-query-break-out',
        'parentId': 'bsp-order-manager',
        'label': '报损',
        'sort': 8,
        'leaf': false
      },

      {
        'id': 'bsp-in-receipt-org-manager',
        'parentId': 'bsp-order-manager',
        'label': '单位入库明细',
        'sort': 3,
        'children': null,
        'leaf': true
      }, {
        'id': 'bsp-out-receipt-org-manager',
        'parentId': 'bsp-order-manager',
        'label': '单位出库明细',
        'sort': 3,
        'children': null,
        'leaf': true
      }
    ],
    'leaf': false
  },
  {
    id: 'order-relation-manager',
    label: '订单相关权限',
    children: [
      {
        'id': 'bsp-in-order-org-add',
        'parentId': 'bsp-in-order-org-query',
        'label': '新增入库订单',
        'sort': 1,
        'children': null,
        'leaf': true
      },
      {
        'id': 'bsp-out-order-org-add',
        'parentId': 'bsp-out-order-org-query',
        'label': '新增出库订单',
        'sort': 1,
        'children': null,
        'leaf': true
      },
      {
        'id': 'bsp-in-order-org-edit',
        'parentId': 'bsp-in-order-org-query',
        'label': '编辑入库订单',
        'sort': 2,
        'children': null,
        'leaf': true
      },
      {
        'id': 'bsp-out-order-org-edit',
        'parentId': 'bsp-out-order-org-query',
        'label': '编辑出库订单',
        'sort': 2,
        'children': null,
        'leaf': true
      },
      {
        'id': 'bsp-order-org-confirm',
        'parentId': 'bsp-order-manager',
        'label': '确认订单',
        'sort': 8,
        'leaf': false
      },
      {
        'id': 'bsp-order-org-cancel',
        'parentId': 'bsp-order-manager',
        'label': '取消订单',
        'sort': 8,
        'leaf': false
      },
      {
        id: 'bsp-order-org-transport',
        label: '完成订单'
      },
      {
        id: 'bsp-order-org-refuse',
        label: '拒绝订单'
      },
      {
        'id': 'bsp-order-org-review',
        'parentId': 'bsp-order-manager',
        'label': '复核订单',
        'sort': 8,
        'leaf': false
      },
      {
        'id': 'portal-order-download-code-file',
        'parentId': 'bsp-order-manager',
        'label': '下载复核追溯码文件',
        'sort': 8,
        'leaf': false
      }
    ]
  },
  {
    'id': 'logistics-bsp-order-manager',
    'parentId': null,
    'label': '物流服务',
    'sort': 1,
    'children': [
      {
        'id': 'logistics-bsp-in-order-org-query',
        'parentId': 'bsp-order-manager',
        'label': '入库订单',
        'sort': 7,
        'leaf': false
      },
      {
        'id': 'logistics-bsp-out-order-org-query',
        'parentId': 'bsp-order-manager',
        'label': '出库订单',
        'sort': 8,
        'leaf': false
      },
      {
        'id': 'logistics-bsp-in-order-org-add',
        'parentId': 'bsp-in-order-org-query',
        'label': '新增入库订单',
        'sort': 1,
        'children': null,
        'leaf': true
      },
      {
        'id': 'logistics-bsp-out-order-org-add',
        'parentId': 'bsp-out-order-org-query',
        'label': '新增出库订单',
        'sort': 1,
        'children': null,
        'leaf': true
      }],
    'leaf': false
  },
  {
    'id': 'bsp-stock-manager',
    'parentId': null,
    'label': '库存管理',
    'sort': 2,
    'children': [{
      'id': 'bsp-stock-org-query',
      'parentId': 'bsp-stock-manager',
      'label': '批号库存管理',
      'sort': 1,
      'children': null,
      'leaf': true
    }, {
      'id': 'bsp-stock-batch-org-query',
      'parentId': 'bsp-stock-manager',
      'label': '批次库存管理',
      'sort': 2,
      'children': null,
      'leaf': true
    }, {
      id: 'bsp-stock-batch-org-flow',
      label: '即时库存流向'
    }, {
      id: 'bsp-stock-org-adjust',
      label: '库存调整',
      children: [
        {
          id: 'bsp-stock-org-adjust-query',
          label: '查看库存调整'
        },
        {
          id: 'bsp-stock-org-adjust-add',
          label: '新增库存调整记录'
        }
      ]
    },
      {
        id: 'report-inventory-manager',
        label: '上报库存',
        children: [
          {
            id: 'report-inventory-query',
            label: '查看上报库存'
          },
          {
            id: 'report-inventory-add',
            label: '新增上报库存'
          }
        ]
      },
      {
        id: 'report-confirm-manager',
        label: '待验库存',
        children: [
          {
            id: 'report-confirm-query',
            label: '查看待验库存'
          },
          {
            id: 'report-confirm-add',
            label: '新增待验库存'
          }
        ]
      }
    ],
    'leaf': false
  },
  {
    id: 'export-data-xml-manager',
    label: '数据集导出管理',
    children: [
      {
        label: '导出境内疫苗生产企业基本信息数据子集',
        id: 'export-data-type-xml-1011'
      },
      {
        label: '导出进口疫苗生产企业基本信息数据子集',
        id: 'export-data-type-xml-1012'
      },
      {
        label: '导出进口疫苗代理企业基本信息数据子集',
        id: 'export-data-type-xml-1013'
      },
      {
        label: '导出药品生产许可证基本信息数据子集',
        id: 'export-data-type-xml-1014'
      },
      {
        label: '导出药品经营许可证基本信息数据子集',
        id: 'export-data-type-xml-1015'
      },
      {
        label: '导出国产疫苗基本信息数据子集',
        id: 'export-data-type-xml-1019'
      },
      {
        label: '导出进口疫苗基本信息数据子集',
        id: 'export-data-type-xml-1020'
      },
      {
        label: '导出疾病预防控制机构基本信息数据子集',
        id: 'export-data-type-xml-1016'
      },
      {
        label: '导出接种单位基本信息数据子集',
        id: 'export-data-type-xml-1018'
      },
      {
        label: '导出疫苗配送单位基本信息数据子集',
        id: 'export-data-type-xml-1017'
      },
      {
        label: '导出生产信息',
        id: 'export-data-type-xml-2011'
      },
      {
        label: '导出进口信息',
        id: 'export-data-type-xml-2012'
      },
      {
        label: '导出批签发信息',
        id: 'export-data-type-xml-2014'
      },
      {
        label: '导出发货单信息',
        id: 'export-data-type-xml-2015'
      },
      {
        label: '导出收货单信息',
        id: 'export-data-type-xml-2016'
      },
      {
        label: '导出使用信息',
        id: 'export-data-type-xml-2017'
      },
      {
        label: '导出库存信息',
        id: 'export-data-type-xml-2019'
      }]
  },
  {
    'id': 'system-config',
    'parentId': null,
    'label': '系统管理',
    'sort': 3,
    'children': [
      {
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
      },
      {
        'id': 'mdm-org-user-manager',
        'label': '用户管理',
        'sort': 3,
        'children': [
          {
            'id': 'mdm-manufacture-oms-org-user-edit',
            'label': '编辑用户',
            'sort': null,
            'children': null,
            'leaf': true
          }, {
            'id': 'account-all-manager-start',
            'label': '启用用户',
            'sort': null,
            'children': null,
            'leaf': true
          }, {
            'id': 'account-all-manager-stop',
            'label': '停用用户',
            'sort': null,
            'children': null,
            'leaf': true
          },
          {
            'id': 'mdm-manufacture-oms-org-user-watch',
            'label': '查看用户',
            'sort': null,
            'children': null,
            'leaf': true
          }, {
            'id': 'mdm-manufacture-oms-org-user-add',
            'label': '新增用户',
            'sort': null,
            'children': null,
            'leaf': true
          }],
        'leaf': false
      },
      {
        'id': 'access-role-manager',
        'parentId': 'bsp-system-config',
        'label': '角色管理',
        'sort': 4,
        'children': [
          {
            'id': 'access-role-watch',
            'parentId': 'bsp-user-role-manager',
            'label': '查看角色',
            'sort': null,
            'children': null,
            'leaf': true
          }, {
            'id': 'access-role-add',
            'parentId': 'bsp-user-role-manager',
            'label': '新增角色',
            'sort': null,
            'children': null,
            'leaf': true
          }, {
            'id': 'bsp-access-role-start',
            'parentId': 'bsp-user-role-manager',
            'label': '启用角色',
            'sort': null,
            'children': null,
            'leaf': true
          }, {
            'id': 'bsp-access-role-delete',
            'parentId': 'bsp-user-role-manager',
            'label': '删除角色',
            'sort': null,
            'children': null,
            'leaf': true
          }, {
            'id': 'access-role-edit',
            'parentId': 'bsp-user-role-manager',
            'label': '编辑角色',
            'sort': null,
            'children': null,
            'leaf': true
          }, {
            'id': 'bsp-access-role-stop',
            'parentId': 'bsp-user-role-manager',
            'label': '停用角色',
            'sort': null,
            'children': null,
            'leaf': true
          }],
        'leaf': false
      },
      {
        id: 'system-setting-log',
        label: '系统日志'
      },
      {
        id: 'bsp-xtpt-log-query',
        label: '数据集推送日志'
      },
    ],
    'leaf': false
  },
  {
    'id': 'code-attachment-name-update',
    'parentId': 'code-system-manager',
    'label': '编辑附件名称',
    'sort': 9,
    'children': null,
    'leaf': true
  }
];
