<style lang="scss" scoped="">
  @import "../../assets/scss/mixins";

  $partClassLeftMargin: 20px;
  .class-item-list {
    width: 180px;
    font-size: 12px;

    > .class-item {
      &:after {
        display: none;
      }

      > .class-item-label > .label {
        &:before {
          display: none;
        }
      }
    }

    .class-item {
      position: relative;
      margin-top: 10px;

      &:before {
        content: '';
        position: absolute;
        left: 7px;
        top: 6px;
        bottom: 11px;
        border-left: 1px dotted #999;
      }

      &.has-no-sub {
        &:before {
          display: none
        }

        /** .label {
           padding-left: $partClassLeftMargin/2-5px;
           &:before {
             width: $partClassLeftMargin;
           }
         }**/
      }

      &:last-child {
        &:after {
          content: '';
          position: absolute;
          width: 2px;
          top: 12px;
          bottom: 0;
          left: -$partClassLeftMargin/2-4px;
          background: #fff
        }
      }
    }

    .class-item-label {
      display: flex;
      justify-content: space-between;
      cursor: pointer;
      padding: 3px 10px 3px 0;

      &.active, &:hover {
        .label {
          color: $primary-color;
        }
      }

      &.active, &:hover {
        background: #f7f7f7;
      }

      .label {
        display: flex;
        align-items: center;
        position: relative;

        &:before {
          content: '';
          position: absolute;
          left: -$partClassLeftMargin/2-2px;
          width: $partClassLeftMargin/2;
          top: 8px;
          border-top: 1px dotted #999;
        }
      }

      .opera {
        width: 14px;
        height: 14px;
        margin-right: 5px;
        border: 1px solid #999;
        border-radius: 3px;
        text-align: center;
        background: #fff;

      }

    }

    .class-sub {
      padding-left: $partClassLeftMargin;
    }
  }
</style>
<template>
  <div class="class-item-list">
    <div class="class-item" :class="{'has-no-sub':!p1.children||p1.children.length===0}"
         v-for="(p1,index) in classData" :key="index">
      <div class="class-item-label" @click.stop="clickHandler(p1)" :class="{'active':activeItem===p1.value}">
        <div class="label">
          <div class="opera" v-if="!p1.isLeaf || (p1.children&&p1.children.length)"
               @click.stop.prevent="changeCollapse(p1)">
            <svg style="height:8px;width:8px;">
              <use :xlink:href="getIcons(p1)" width="8px" height="8px"></use>
            </svg>
          </div>
          <div><i class="el-icon-loading" v-if="p1.loading"></i>{{p1.label}}</div>
        </div>
        <div class="right">{{p1.count}}</div>
      </div>

      <div class="class-sub" v-if="p1.children&&p1.children.length" v-show="p1.open">
        <div class="class-item" :class="{'has-no-sub':!p2.children||p2.children.length===0}"
             v-for="(p2,index) in p1.children" :key="index">
          <div class="class-item-label" @click.stop="clickHandler(p2)" :class="{'active':activeItem===p2.value}">
            <div class="label">
              <div class="opera" v-if=" !p2.isLeaf || (p2.children&&p2.children.length)"
                   @click.stop.prevent="changeCollapse(p2)">
                <svg style="height:8px;width:8px;">
                  <use :xlink:href="getIcons(p2)" width="8px" height="8px"></use>
                </svg>
              </div>
              <div><i class="el-icon-loading" v-if="p2.loading"></i>{{p2.label}}</div>
            </div>
            <div class="right">{{p2.count}}</div>
          </div>
          <div class="class-sub" v-if="p2.children&&p2.children.length" v-show="p2.open">
            <div class="class-item has-no-sub" v-for="(p3,index) in  p2.children" :key="index">
              <div class="class-item-label" :class="{'active':activeItem===p3.value}"
                   @click.stop.prevent="clickHandler(p3)">
                <div class="label">{{p3.label}}</div>
                <div class="right">{{p3.count}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import utils from '@/tools/utils';
  import '@/assets/fonts/iconfont.js';

  export default {
    name: 'classTree',
    props: {
      treeData: {
        type: Array
      },
      active: {
        type: String,
        default: '0'
      },
      queryChildrenNode: Function
    },
    data() {
      return {
        classData: [],
        activeItem: '0'
      };
    },
    watch: {
      treeData: {
        handler() {
          this.setData();
        },
        deep: true
      }
    },
    computed: {},
    methods: {
      changeCollapse(item) {
        if (item.children.length) {
          item.open = !item.open;
          return;
        }
        this.queryChildrenNode(item);
      },
      getIcons(item) {
        return '#el-icon-t-' + (item.open ? 'minus' : 'plus');
      },
      setData() {
        let classData = [];
        this.treeData.forEach(item => {
          let currentItem = utils.deepClone(item);
          if (currentItem.children) {
            currentItem.children.forEach(child => {
              child.open = child.open || false;
            });
          }
          classData.push(Object.assign({open: false}, currentItem));
        });
        this.classData = classData;
      },
      clickHandler(item) {
        this.activeItem = item.value;
        this.$emit('treeClick', item);
      }
    },
    mounted() {
      this.setData();
    }
  };
</script>
