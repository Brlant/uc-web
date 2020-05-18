import axios from 'axios';
import store from './store';
//  专门用来展示静态HTML文件的组件
const Html = {
  template: '<div v-html="html"></div>',
  data: () => ({
    html: ''
  }),
  beforeRouteEnter(to, from, next) {
    axios.get('/static/html/' + to.params.file).then(response => {
      next(vm => {
        vm.html = response.data;
        vm.$nextTick(() => vm.$emit('loaded'));
      });
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.$emit('loaded', 1);
    axios.get('/static/html/' + to.params.file).then(response => {
      this.html = response.data;
      this.$nextTick(() => {
        this.$emit('loaded', 0);
        next();
      });
    });
  }
};

export const route = [
  {
    path: '/',
    component: () => import('./components/index.vue'),
    children: [
      {
        path: '/resetpsw', component: () => import('./components/login/resetpsw.vue'),
        meta: {perm: 'show'},
        children: []
      },
      {
        path: '/account/all', component: () => import('./components/system/tbs-permission/index.vue'),
        meta: {moduleId: 'account', title: '账户管理', icon: 'setting', perm: 'mdm-platform-user-watch', systemId: 'dhs'},
        children: []
      },
      {
        path: '/role/all', component: () => import('./components/system/tbs-role/index.vue'),
        meta: {moduleId: 'role', title: '角色管理', icon: 'permission', perm: 'access-role-watch', systemId: 'dhs'},
        children: []
      }
    ]
  }
];

store.state.systemList.forEach(i => {
  // route[0].children[1].children.push({
  //   path: `/account/${i.systemId}`,
  //   component: () => import('./components/system/tbs-permission/index.vue'),
  //   meta: {moduleId: 'account', systemId: i.systemId, perm: i.perm}
  // });
  // route[0].children[2].children.push({
  //   path: `/role/${i.systemId}`,
  //   component: () => import('./components/system/tbs-role/index.vue'),
  //   meta: {moduleId: 'role', systemId: i.systemId, perm: i.rolePerm}
  // });
  route[0].children[3].children.push({
    path: `/log/${i.systemId}`,
    component: () => import('./components/system/log/index.vue'),
    meta: {moduleId: 'log', title: `${i.title}系统日志`, objectId: i.objectId, systemId: i.systemId, perm: i.logPerm}
  })
});


export const basicRoutes = [
  {path: '/404', component: () => import('./components/error/error_404.vue')},
  {path: '/500', component: () => import('./components/error/error_500.vue')},
  {path: '/login', component: () => import('./components/login/login.vue')},
  {path: '/forget', component: () => import('./components/login/forget.vue')},
  {path: '/code/:id', component: () => import('./components/login/resetpwd.vue')}
];

export const ErrorPage = [
  {path: '*', component: () => import('./components/error/error_404.vue')}
];
