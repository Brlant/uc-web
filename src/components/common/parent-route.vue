<template>
  <transition appear mode="out-in" name="scale">
    <router-view></router-view>
  </transition>
</template>
<script>
  import {route} from '@/route';

  export default {
    watch: {
      $route() {
        this.goPath();
      }
    },
    mounted() {
      this.goPath();
    },
    methods: {
      goPath() {
        let children = [];
        let path = this.$route.path.replace(/\/$/, '');
        let isHas = route[0].children.some(s => {
          let exist = s.path === path;
          if (exist) {
            children = s.children;
          }
          return exist;
        });
        if (!isHas) return;
        this.$router.push('/');
      }
    }
  };
</script>
