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
  }
  ];
