<style lang="scss" scoped=''>
  @import "../../assets/scss/mixins";

  .main-header {
    background: $bgColor;
    padding-left: 20px;
    &, a {
      color: #fff;
    }

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: $topMenuHeight;
    z-index: 800;
    /*box-shadow: 0 5px 5px rgba(221, 221, 221, 0.22);*/
    ul, li {
      padding: 0;
      margin: 0;
      list-style: none
    }

    a {
      text-decoration: none
    }

    .container {
      position: relative;
    }

    .top-logo {
      vertical-align: middle;
      line-height: $topMenuHeight;
      height: $topMenuHeight;

      img {
        vertical-align: middle;
      }
    }

    .top-menu {
      position: absolute;
      top: 0;
      left: 260px;
      z-index: 1;
      right: 0;

      > ul {
        display: flex;

        > li {
          padding: 0 20px;

          &:not(:first-child) {
            margin-left: 1px;
          }

          a {
            display: block;
            line-height: $topMenuHeight;
            font-size: 14px;
            color: #fff;

          }

          &.active, &:hover {
            background: #4d566c;
          }
        }
      }
    }

    .top-right {
      position: absolute;
      right: 0;
      width: auto;
      z-index: 3;
      top: 50%;
      transform: translateY(-50%);

      .top-right-item {
        border-radius: 18px;
        background: $bgColor;
        line-height: 26px;
        display: inline-block;
        padding: 3px 10px;
        cursor: pointer;
        color: #fff;

        img {
          vertical-align: middle;
          height: 23px;
          width: 23px;
          border: 1px solid #eee;
          border-radius: 50%;
        }
      }

    }
  }

  .top-right-user-dropdown {
    margin-top: 1px;
    padding: 10px;
    box-shadow: 1px 1px 1px #eee;
    border-color: #eee
  }

  .menu-user-part {
    display: flex;
    align-items: center;

    > div > img {
      margin-right: 10px;
      border-radius: 50%;
      height: 40px;
      width: 40px;
      border: 1px solid #eee
    }

    .menu-usr-part-phone {
      color: #666;
      font-size: 12px;
    }
  }

  .menu-user {
    padding: 8px 10px;

    .last-login {
      color: #999;
      font-size: 12px;
      margin: 10px 0;
    }

    a {
      color: #fff;
      font-size: 12px;
    }
  }

  .main-nav {
    position: absolute;
    top: $topMenuHeight;
    background: rgb(238, 243, 246);
    border-right: 1px solid #f1f1f1;
    bottom: 0;
    left: 0;
    z-index: 1;
    width: 200px;

    .menu-wrap {
      max-height: 100%;

      > .el-menu > li {

      }
    }

    .el-menu {
      li {
        min-width: 40px;
      }
    }

    .horizontal-collapse-transition {
      transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
    }

    .main-nav-scrollbar {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 30px;
      left: 0;
    }

    .main-nav-scrollbar /deep/ .el-scrollbar__wrap {
      overflow: hidden;
      overflow-y: auto;
    }

    .change-collapse {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      text-align: center;
      padding: 5px;
      cursor: pointer;
      background: rgba(238, 243, 246, 0.5);

      &:hover {
        background: #cbdce6;
      }
    }
  }

  .position-nav {
    margin: 0 0 8px;
    /*padding: 5px;*/
    /*border-bottom: 1px solid #eee;*/
    font-size: 16px;
    font-weight: normal;
    line-height: 30px;
    background: #eee;

    .position-nav-text {
      position: relative;
      left: -20px;
      padding-left: 13px;
      border-left: 4px solid #999;
    }
  }

  .logo_pic {
    height: 32px;
    width: 32px;
    margin-right: 10px;
    margin-top: -8px;
  }

  .logo-span {
    font-size: 22px;
    font-weight: bold;
  }
</style>

<template>
  <div>
    <header class="main-header">
      <div class="container">
        <div class="top-logo">
          <router-link to='/' class="a-link"><img class="logo_pic" :src="logoUrl" @click="activeId=''">
            <span class="logo-span">{{ domainInfo.name ? domainInfo.name : '宝莲灯' }}</span>
          </router-link>
        </div>
        <div class="top-right">
          <div class="top-user">
            <el-dropdown trigger="click">
              <div class="el-dropdown-link top-right-item">
                <compressed-img v-if="user.userIcon" :src="user.userIcon+'?image&action=resize:w_50,h_50,m_2'"/>
                <img v-else :src="logo"> {{user.userName}}
                <i class="el-icon-caret-bottom"></i>
              </div>
              <el-dropdown-menu class="top-right-user-dropdown" slot="dropdown">
                <div class="menu-user">
                  <div class="menu-user-part">
                    <div>
                      <oms-upload-picture :photoUrl="user.userIcon? user.userIcon : ''"
                                          class="user-img"></oms-upload-picture>
                    </div>
                    <div>
                      <div class="menu-usr-part-user">{{user.userName}}</div>
                      <div class="menu-usr-part-phone">{{user.userAccount}}</div>
                    </div>
                  </div>
                  <div class="last-login">上次登录时间:{{user.userLastLoginTime | time}}</div>
                  <div class="text-right btn">
                    <router-link style="float:left; margin-top: 2px;" to="/resetpsw">重置密码</router-link>
                    <a href="#" @click.stop.prevent="logout">退出</a>
                  </div>
                </div>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </header>
    <div class="main-nav" :style="'width:'+menuWidth">
      <el-scrollbar
        tag="div"
        ref="scrollbar"
        class="main-nav-scrollbar"
        v-show="menu.length > 0">
        <el-menu :default-active="$route.path" :collapse="isCollapse" :router="true" :unique-opened="false"
                 style="margin-bottom: 27px">
          <template v-for="item in menu">
            <el-submenu :index="item.path" v-if="item.children.length>0">
              <template slot="title">
                <i :class="'el-icon-t-'+item.meta.icon"></i>
                <span slot="title">{{item.meta.title}}</span>
              </template>
              <el-menu-item :index="child.path" v-for="child in item.children" :key="child.path">
                {{formatTitle(child)}}
              </el-menu-item>
            </el-submenu>
            <el-menu-item :index="item.path" v-else-if="item.path">
              <i :class="'el-icon-t-'+item.meta.icon"></i>
              <span slot="title">{{item.meta.title}}</span>
            </el-menu-item>
            <el-menu-item :index="item.path" v-else="!item.path" @click="$router.push('/')">
              <i :class="'el-icon-t-'+item.meta.icon"></i>
              <span slot="title">{{item.meta.title}}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-scrollbar>
      <div class="change-collapse" @click="changeMenuCollapse">
        <f-a :name="isCollapse?'spread':'collapse'"></f-a>
      </div>
    </div>
  </div>

</template>

<script>
  import {Auth} from '../../resources';
  import logo from '../../../static/img/codes-logo-mini.png';
  import omsUploadPicture from '../common/upload/upload.user.picture.vue';

  export default {
    components: {
      omsUploadPicture
    },
    props: ['toRoute'],
    data() {
      return {
        logo: logo,
        isCollapse: false
      };
    },
    computed: {
      menuWidth: function () {
        return this.$store.state.bodySize.left;
      },
      user: function () {
        return Object.assign({}, {userName: '', userAccount: '', userLastLoginTime: 0}, this.$store.state.user);
      },
      menu: function () {
        let menuArr = this.$parent.$parent.menuData.filter(item => item.meta && item.meta.moduleId);
        menuArr.forEach(item => {
            if (/:id$/.test(item.path)) item.path = item.path.replace(':id', 'id');
            item.children = item.children.filter(child => {
              if (/:id$/.test(child.path)) child.path = child.path.replace(':id', 'id');
              return true;
            });
          }
        );
        return menuArr;
      },
      domainInfo: function () {
        return this.$store.state.domainInfo;
      },
      logoUrl() {
        let logo = this.$store.state.domainInfo.logo;
        if (!logo) {
          logo = this.logo;
        }
        return logo;
      },
      activeId() {
        return this.$route.meta && this.$route.meta.moduleId || '';
      }
    },
    methods: {
      formatTitle(route) {
        if (route.meta.title) return route.meta.title;
        if (!route.meta.systemId) return '';
        let sysList = this.$store.state.systemList;
        let sys = sysList.find(f => f.systemId === route.meta.systemId);
        return sys.title;
      },
      goTo: function (item) {
        this.$router.push({path: item.path});
      },
      getGroupId: function () {
        return this.toRoute.meta.moduleId;
      },
      changeMenuCollapse: function () {
        this.isCollapse = !this.isCollapse;
        this.$store.commit('changeBodyLeft', this.isCollapse);
        window.localStorage.setItem('collapse', this.isCollapse ? 1 : 0);
      },
      logout: function () {
        window.localStorage.setItem('lastUrl', '');
        Auth.logout().then(() => {
          location.reload();
        });
      }
    },
    mounted: function () {
      let isCollapse = window.localStorage.getItem('collapse');
      if (isCollapse) {
        isCollapse = parseInt(isCollapse, 10);
      }
      this.isCollapse = !!isCollapse;
      this.$store.commit('changeBodyLeft', this.isCollapse);
    }
  };
</script>
