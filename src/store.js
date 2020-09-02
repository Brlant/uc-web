import Vue from 'vue';
import Vuex from 'vuex';
import dhsMenu from '@/components/system/tbs-role/menus/dhs-menu';
import tssMenu from '@/components/system/tbs-role/menus/tss-menu';
import tbsMenu from '@/components/system/tbs-role/menus/tbs-menu';
import bspMenu from '@/components/system/tbs-role/menus/bsp-menu';
import portalMenu from '@/components/system/tbs-role/menus/portal-menu';
import ospMenu from '@/components/system/tbs-role/menus/osp-menu';
import lanMenu from '@/components/system/role/menu.js'
// 补全后缀
function addSuffix(menu, suf) {
  menu.forEach(i => {
    i.id += '.' + suf;
    i.objectType = suf;
    if (i.children) {
      addSuffix(i.children, suf);
    }
  });
}

// 添加父节点
function addParent(menu, id, label) {
  const newMenu = {
    id: 'root-' + id,
    label,
    children: JSON.parse(JSON.stringify(menu))
  };
  menu.splice(0, menu.length, newMenu);
}

function handleMenu(menu, id, label) {
  addParent(menu, id, label);
  addSuffix(menu, id);
}

handleMenu(dhsMenu, 'dhs-system', 'DHS权限菜单');
handleMenu(tssMenu, 'tss-system', 'TSS权限菜单');
handleMenu(tbsMenu, 'codes-system', 'TBS权限菜单');
handleMenu(bspMenu, 'bsp-system', 'BSP权限菜单');
handleMenu(portalMenu, 'portal-system', '全溯权限菜单');
handleMenu(ospMenu, 'openapi-system', 'OSP权限菜单');
handleMenu(lanMenu, 'uc-system', '用户中心权限菜单');


const allMenu = [].concat(lanMenu, dhsMenu, tssMenu, tbsMenu, bspMenu, portalMenu, ospMenu);


Vue.use(Vuex);

//  需要维护的状态
const state = {
  uploadUrl: 'https:// jsonplaceholder.typicode.com/posts/',
  user: {},
  dict: {},
  permissions: [],
  permList: {},
  roleList: {},
  allMenuArray: [],
  attachmentDialog: {attachmentId: 0, open: false, attachmentList: [], objectId: '', objectType: ''},
  windowSize: {width: 1000, height: 500},
  form: {},
  bodyHeight: 0,
  domainInfo: {},
  orgRelationLevel: [],
  requestingDictAry: [],
  bottomLoading: false,
  menuParentIds: [], // 所有非叶子节点菜单
  print: {
    isPrinting: false,
    text: '正在下载'
  },
  goodsTypeList: [
    {key: '1', label: '疫苗（国产）'},
    {key: '2', label: '疫苗（进口）'},
    {key: '3', label: '一般药品（国产）'},
    {key: '4', label: '一般药品（进口）'},
    {key: '5', label: '特殊药品（国产）'},
    {key: '6', label: '特殊药品（进口）'},
    {key: '7', label: '国产医疗器械'},
    {key: '8', label: '进口医疗器械'},
    {key: '9', label: '其他'}
  ],
  bodySize: {left: '200px'},
  systemList: [
    {
      systemId: 'lantern',
      title: '用户中心',
      objectId: 'uc-system',
      perm: 'osp-account-query',
      rolePerm: 'osp-role-query',
      logPerm: 'osp-log-query',
      role: allMenu
    },
    {
      systemId: 'dhs',
      title: 'DHS',
      objectId: 'dhs-system',
      perm: 'dhs-account-query',
      rolePerm: 'dhs-role-query',
      logPerm: 'dhs-log-query',
      role: allMenu,
    },
    {
      systemId: 'tss',
      title: 'TSS',
      objectId: 'tss-system',
      perm: 'tss-account-query',
      rolePerm: 'tss-role-query',
      logPerm: 'tss-log-query',
      role: allMenu
    },
    {
      systemId: 'tbs',
      title: 'TBS',
      objectId: 'codes-system',
      perm: 'tbs-account-query',
      rolePerm: 'tbs-role-query',
      logPerm: 'tbs-log-query',
      role: allMenu
    },
    {
      systemId: 'bsp',
      title: 'BSP',
      objectId: 'bsp-system',
      perm: 'bsp-account-query',
      rolePerm: 'bsp-role-query',
      logPerm: 'bsp-log-query',
      role: allMenu
    },
    {
      systemId: 'portal',
      title: '全溯',
      objectId: 'portal-system',
      perm: 'portal-account-query',
      rolePerm: 'portal-role-query',
      logPerm: 'portal-log-query',
      role: allMenu
    },
    {
      systemId: 'osp',
      title: 'OSP',
      objectId: 'openapi-system',
      perm: 'osp-account-query',
      rolePerm: 'osp-role-query',
      logPerm: 'osp-log-query',
      role: allMenu
    }
  ]
};
let bodyLeft = window.localStorage.getItem('bodyLeft');
if (bodyLeft) {
  state.bodySize.left = bodyLeft;
}
const mutations = {
  initUser(state, data) {
    try {
      if (data && data.userId) {
        window.localStorage.setItem('user', JSON.stringify(data));
        state.user = data;
      }
    } catch (e) {

    }
  },
  initDict(state, data) {
    state.dict = data;
  },
  initPermissions(state, data) {
    state.permissions = data;
  },
  initPermList(state, data) {
    state.permList = data;
  },
  initAllMenuArray(state, data) {
    state.allMenuArray = data;
  },
  changeAttachment(state, data) {
    let currentId;
    if (typeof data === 'object') {
      currentId = data.currentId;
      state.attachmentDialog.attachmentList = data.attachmentList;
    } else {
      currentId = data;
      state.attachmentDialog.attachmentList = [];
    }
    if (state.attachmentDialog.attachmentId === currentId) {
      state.attachmentDialog.open = true;
    } else {
      state.attachmentDialog.attachmentId = currentId;
    }
  },
  openAttachmentDialog(state) {
    state.attachmentDialog.open = true;
  },
  closeAttachmentDialog(state) {
    state.attachmentDialog.open = false;
  },
  setBodyHeight(state, data) {
    state.bodyHeight = data.height;
    state.windowSize = data.window;
  },
  initDomainInfo(state, data) {
    state.domainInfo = data;
    let title = document.getElementById('codesTitle');
    if (data.id) {
      title.innerHTML = data.name ? data.name : '用户中心';
    } else {
      title.innerHTML = '用户中心';
    }
  },
  initPrint(state, data) {
    data.text = data.text || '正在下载';
    state.print = data;
  },
  inItOrgRelationLevel(state, data) {
    state.orgRelationLevel = data;
  },
  initRequestingDictAry(state, data) {
    state.requestingDictAry = data;
  },
  initMenuParentIds(state, data) {
    state.menuParentIds = data;
  },
  initBottomLoading(state, data) {
    state.bottomLoading = data;
  },
  setBodySize(state, data) {
    Object.assign(state.bodySize, data);
  },
  changeBodyLeft(state, isSmall) {
    state.bodySize.left = isSmall ? '64px' : '200px';
    window.localStorage.setItem('bodyLeft', state.bodySize.left);
  }
};

export default new Vuex.Store({
  state,
  mutations
});
