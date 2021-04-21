<template>
  <div class="login-part">
    <el-card class="box-card main-card-box">
      <div class="logo-part clearfix"><img :src="logoUrl">{{ domainInfo.name ? domainInfo.name : '用户中心' }}</div>
      <div class="form-part">
        <el-form :model="user" :rules="rules" @submit.prevent="done" label-position="top" label-width="80px"
                 onsubmit="return false" ref="loginForm">
          <el-form-item label="业务单位编号" prop="orgCode" v-if="needCode">
            <!--<oms-input v-model="user.orgCode"></oms-input>-->
            <tn-input-auto-complete :list="orgCodeList" placeholder="请输入业务单位编号" v-model="user.orgCode"/>
          </el-form-item>
          <el-form-item label="用户名" prop="username">
            <oms-input @blur="check()" placeholder="手机号/邮箱/用户名" v-model="user.username"></oms-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" style="position:relative">
            <oms-input placeholder="请输入密码" type="password" v-model="user.password"></oms-input>
            <router-link style="position: absolute;top:-35px;right:0;" to="/forget">激活账号/忘记密码?</router-link>
          </el-form-item>
          <el-form-item label="验证码" v-show="showCode">
            <div style="display:flex">
              <div style="width:300px;margin-right:50px">
                <oms-input v-model="user.validateCode"></oms-input>
              </div>
              <div><img :src="codeUrl" @click="getCode" style="cursor:pointer;height: 36px"></div>
            </div>

          </el-form-item>

          <el-form-item label-width="80px">
            <el-button @click="done" native-type="submit" style="display:block;width:100%;height: 50px" type="primary">
              {{btnString}} <i class="el-icon-loading" v-show="loading"></i></el-button>

          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <canvas id="backgroundCanvas"></canvas>
    <app-footer></app-footer>
  </div>

</template>

<script>
  import {Auth, DhsBaseInfo} from '../../resources';
  import AppFooter from '../layout/app.footer.vue';
  import {base64} from '@dtop/dtop-web-common';

  export default {
    name: 'login',
    components: {
      AppFooter
    },
    data: () => {
      let orgCodeList = JSON.parse(window.localStorage.getItem('orgCodeList')) || [];
      let needCode = !!orgCodeList.length;
      let orgCode = window.localStorage.getItem('orgCode');
      orgCode = orgCode && orgCode !== 'null' ? orgCode : '';
      return ({
        user: {
          username: window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')).userAccount : '',
          password: '',
          validateCode: '',
          type: 1,
          orgCode
        },
        loading: false,
        codeUrl: '',
        showCode: false,
        btnString: '登录',
        rules: {
          orgCode: [
            {required: true, message: '请输入业务单位编号', trigger: ['blur', 'change']}
          ],
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        },
        needCode,
        orgCodeList
      });
    },
    computed: {
      domainInfo: function () {
        return this.$store.state.domainInfo;
      },
      logoUrl() {
        let logo = this.$store.state.domainInfo.logo;
        if (!logo) {
          logo = '/static/img/codes-logo.png';
        }
        return logo;
      }
    },
    methods: {
      done() {
        this.$refs['loginForm'].validate((valid) => {
          if (valid) {
            this.btnString = '登陆中..';
            this.loading = true;
            let user = Object.assign({}, this.user);
            user.orgCode = this.needCode ? this.trim(this.user.orgCode) : '';
            user.encryptionPsw = base64(user.password);
            delete user.password;
            Auth.login(user).then(response => {
              let userId = window.localStorage.getItem('userId');
              this.$store.commit('initUser', response.data);
              window.localStorage.setItem('orgCode', this.user.orgCode);
              this.$emit('login');
            }, error => {
              let data = error.response.data;
              this.$notify.error({
                message: data.msg || '登录失败'
              });
              if (data.code === 101 || data.code === 100) {
                this.getCode();
              }
              if (data.code === 405) {
                this.needCode = true;
              }
              this.btnString = '登陆';
              this.loading = false;
            });
          }
        });

      },
      check() {
        // 为空时, 不用做判断
        if (!this.user.username) return;
        this.$http.post('/dhs/login/check', {username: this.trim(this.user.username)}).catch(error => {
          if (error.response.status === 405) {
            this.needCode = true;
            let list = error.response.data && error.response.data.map(m => ({value: m}));
            window.localStorage.setItem('orgCodeList', JSON.stringify(list || ''));
          }
        });
      },
      trim: function (str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
      },
      getCode: function () {
        this.showCode = true;
        this.codeUrl = process.env.VUE_APP_API + '/foundation/CAPTCHA?' + Math.random();
      },
      queryBaseInfo(data) {
        DhsBaseInfo.queryBaseInfo(data.userCompanyAddress).then(res => {
          data.dhsOrgId = res.data.orgDto.dhsOrgId;
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
      this.$store.commit('initPermissions', []);
    }
  };
</script>
