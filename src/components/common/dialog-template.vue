<style lang="scss" scoped>
  .dialog-template {
    $labelWidth: 180px;

    &.content-part {
      .content-left {
        width: $labelWidth;
      }

      .content-right {
        > h3 {
          left: $labelWidth;
          margin-bottom: 0;
        }

        left: $labelWidth;
        padding-top: 55px;
        padding-right: 0;
      }
    }

    .btn-save {
      padding-left: 80px;
    }
  }
</style>
<template>
  <div class="content-part dialog-template">
    <div class="content-left">
      <h2 class="clearfix right-title">
        <slot name="title"></slot>
      </h2>
      <ul v-if="pageSets">
        <li class="list-style" v-for="(item, key) in pageSets" @click="selectTab(item, key)"
            v-bind:class="{ 'active' : index == key}"><span>{{ item.name }}</span>
        </li>
      </ul>
      <div class="btn-group-lt-bm-part">
        <slot name="btn"></slot>
      </div>
    </div>
    <div class="content-right content-padding">
      <h3>{{title}}</h3>
      <el-scrollbar tag="div" class="dialog-template_scroll" @scroll="setIndex">
        <div class="dialog-template_scroll_content">
          <slot name="content"></slot>
          <div class="btn-save">
            <slot name="btnSave"></slot>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'dialogTemplate',
    props: {
      pageSets: [Array, Object],
      indexClass: {
        type: String,
        default: 'index-tit'
      }
    },
    data() {
      return {
        index: 0,
        title: '',
        title_ele: [],
        titleOffsetTop: []
      };
    },
    computed: {
      showIndex() {
        return this.$parent.$parent.show;
      }
    },
    watch: {
      showIndex(val) {
        !val && this.selectTab(this.pageSets[0], 0);
      }
    },
    mounted() {
      this.$nextTick(() => {
        // this.bindScrollEvent();
      });
    },
    methods: {
      selectTab(item, key) {
        this.index = key;
        this.title = item.name;
        this.setScrollTop(key);
        this.$emit('selectTab', item);
      },
      setIndex(e) {
        let event = e || window.event;
        let target = event.target || e.srcElement;

        !this.title_ele.length && (this.title_ele = target.getElementsByClassName(this.indexClass));
        if (!this.titleOffsetTop.length) {
          for (let i = 0; i < this.title_ele.length; i++) {
            this.titleOffsetTop.push(this.title_ele[i].offsetTop - 65);
          }
        }
        let scrollTop = target.scrollHeight - target.clientHeight;
        if (target.scrollTop === scrollTop) {
          return;
        }
        for (let i = 0; i < this.titleOffsetTop.length; i++) {
          if (target.scrollTop > this.titleOffsetTop[i] - 20) {
            this.index = i;
            if (!this.pageSets[i]) return;
            this.title = this.pageSets[i].name;
            this.$emit('selectTab', this.pageSets[i]);
          }
        }
      },
      bindScrollEvent() {
        let ele_warp = this.$el.getElementsByClassName('el-scrollbar__wrap')[0];
        if (!ele_warp) return;
        let {setIndex} = this;
        ele_warp.addEventListener('scroll', e => setIndex);
      },
      setScrollTop(index) {
        !this.title_ele.length && (this.title_ele = this.$el.getElementsByClassName(this.indexClass));
        if (!this.title_ele[index]) return;
        let ele_warp = this.$el.getElementsByClassName('el-scrollbar__wrap')[0];
        let scrollTop = ele_warp.scrollHeight - ele_warp.clientHeight;
        let otp = this.title_ele[index].offsetTop - 65;
        ele_warp && (ele_warp.scrollTop = scrollTop > otp ? otp : scrollTop);
      }
    }
  };
</script>
