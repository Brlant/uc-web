<style lang="scss">
  @import "../assets/scss/mixins";

  .btn-left-list-more {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 5;
    background: rgba(255, 255, 255, 0.9);
    text-align: center;

    .el-button {
      border: none;
      color: #666;
      background: 0 0;
      padding-left: 0;
      padding-right: 0;

      &:hover {
        color: #333
      }
    }
  }

  .min-div {
    height: 0;
    width: 0;
    display: inline;
    overflow: hidden;
    line-height: 0;
  }
</style>
<template>
  <div class="app-body full-width" :style="'padding-left:'+bodyLeft">
    <app-header :to-route="toRoute" v-if="userType"></app-header>
    <el-scrollbar tag="div" class="body_scroll">
      <div class="main-body container">
        <transition name="scale" mode="out-in" appear>
          <router-view class="app-content-view"></router-view>
        </transition>
      </div>
    </el-scrollbar>

    <!--<app-footer></app-footer>-->
    <attachmentDialog></attachmentDialog>
    <print-dialog></print-dialog>

    <a href="#" target="_blank" class="min-div"><span id="fileDownLoadRap"></span></a>
  </div>
</template>

<script>
    import AppHeader from './layout/app.header.vue';
    import AppFooter from './layout/app.footer.vue';
    import {DictGroup} from '../resources';
    import utils from '../tools/utils';
    import attachmentDialog from './common/attachment.dialog.vue';
    import printDialog from './common/print.loading.vue';

    export default {
    data: () => ({
      transitionName: 'slide-left',
      toRoute: {}
    }),
    computed: {
      bodyLeft: function () {
        return this.$store.state.bodySize['left'];
      },
      userType: function () {
        return this.$store.state.user['userType'];
      }
    },
    beforeRouteEnter(to, form, next) {
      next(vm => {
        vm.toRoute = to;
      });
    },
    beforeRouteUpdate(to, from, next) {
      utils.removeClass(document.getElementsByTagName('body')[0], 'overflow-hidden');
      this.toRoute = to;
      next();
    },
    components: {AppHeader, AppFooter, attachmentDialog, printDialog},
    methods: {
      setBodyHeight: function () {
        this.$store.commit('setBodyHeight', {
          height: window.innerHeight - 200 + 'px',
          window: {width: window.innerWidth, height: window.innerHeight}
        });
      },
      queryDomainInfo() {
        this.$http.get('/code-domain/domain-name').then(res => {
          this.$store.commit('initDomainInfo', res.data);
        }).catch(() => {
          this.$store.commit('initDomainInfo', {});
        });
      }
    },
    mounted: function () {
      // this.queryDomainInfo();
      utils.removeClass(document.getElementsByTagName('body')[0], 'overflow-hidden');
      DictGroup.getAll().then(data => {
        this.$store.commit('initDict', data);
      });
      window.addEventListener('resize', (e) => {
        this.setBodyHeight();
      });
      this.setBodyHeight();
    }
  };
</script>
