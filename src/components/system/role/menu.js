export default [
  {
    id: 'mdm-platform-user-watch',
    label: '账号管理',
    children: [
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
      },
      {
        id: 'system-setting-account-manager-start',
        label: '启用账户'
      },
      {
        id: 'system-setting-account-manager-stop',
        label: '停用账户'
      }
    ]
  },
  {
    id: 'access-role-manager',
    label: '角色管理',
    children: [
      {
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
      }]
  },
  {
    id: 'lantern-log-manager',
    label: '日志管理',
    children: [
      {
        id: 'lantern-log-query',
        label: '用户中心系统日志'
      },
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
      },
      {
        'id': 'system-setting-log',
        'parentId': 'mdm-system-config',
        'label': '查看系统日志',
        'sort': 3,
        'children': null,
        'leaf': true
      }
    ]
  },
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
      }
    ]
  }
  ];
