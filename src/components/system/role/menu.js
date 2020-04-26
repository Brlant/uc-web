export default [
  {
    id: 'lantern-account-manager',
    label: '账号管理',
    children: [
      {
        id: 'dhs-account-query',
        label: 'DHS'
      },
      {
        id: 'tss-account-query',
        label: 'TSS'
      },
      {
        id: 'tbs-account-query',
        label: 'TBS'
      },
      {
        id: 'bsp-account-query',
        label: 'BSP'
      },
      {
        id: 'portal-account-query',
        label: '全溯'
      },
      {
        id: 'osp-account-query',
        label: 'OSP'
      },
      {
        'id': 'lantern-org-user-watch',
        'parentId': 'mdm-org-user-manager',
        'label': '查看单位用户',
        'sort': null,
        'children': null,
        'leaf': true
      },
      {
        'id': 'mdm-manufacture-oms-org-user-edit',
        'parentId': 'mdm-org-user-manager',
        'label': '编辑单位账户',
        'sort': null,
        'children': null,
        'leaf': true
      }, {
        'id': 'mdm-manufacture-oms-org-user-add',
        'parentId': 'mdm-org-user-manager',
        'label': '新增单位账户',
        'sort': null,
        'children': null,
        'leaf': true
      },
      {
        id: 'lantern-org-user-export',
        label: '导出角色用户信息'
      }
    ]
  },
  {
    id: 'lantern-role-manager',
    label: '角色管理',
    children: [
      {
        id: 'dhs-role-query',
        label: 'DHS'
      },
      {
        id: 'tss-role-query',
        label: 'TSS'
      },
      {
        id: 'tbs-role-query',
        label: 'TBS'
      },
      {
        id: 'bsp-role-query',
        label: 'BSP'
      },
      {
        id: 'portal-role-query',
        label: '全溯'
      },
      {
        id: 'osp-role-query',
        label: 'OSP'
      }
    ]
  },
  {
    id: 'lantern-log-manager',
    label: '日志管理',
    children: [
      {
        id: 'dhs-log-query',
        label: 'DHS系统日志'
      },
      {
        id: 'tss-log-query',
        label: 'TSS系统日志'
      },
      {
        id: 'tbs-log-query',
        label: 'TBS系统日志'
      },
      {
        id: 'bsp-log-query',
        label: 'BSP系统日志'
      },
      {
        id: 'portal-log-query',
        label: '全溯系统日志'
      },
      {
        id: 'osp-log-query',
        label: 'OSP系统日志'
      }
    ]
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
        'id': 'mdm-platform-user-manager',
        'parentId': 'mdm-system-config',
        'label': '账户管理',
        'sort': 1,
        'children': [{
          'id': 'mdm-platform-user-add',
          'parentId': 'mdm-platform-user-manager',
          'label': '新增账户',
          'sort': null,
          'children': null,
          'leaf': true
        }, {
          'id': 'mdm-platform-user-watch',
          'parentId': 'mdm-platform-user-manager',
          'label': '查看账户',
          'sort': null,
          'children': null,
          'leaf': true
        }, {
          'id': 'mdm-platform-user-edit',
          'parentId': 'mdm-platform-user-manager',
          'label': '编辑账户',
          'sort': null,
          'children': null,
          'leaf': true
        }, {
          'id': 'mdm-access-platfrom-role-export',
          'label': '导出角色用户信息'
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
        'id': 'system-setting-log',
        'parentId': 'mdm-system-config',
        'label': '系统日志',
        'sort': 3,
        'children': null,
        'leaf': true
      },
      {
        id: 'system-setting-account-manager-start',
        label: '启用账户'
      },
      {
        id: 'system-setting-account-manager-stop',
        label: '停用账户'
      }
    ],
    'leaf': false
  }];
