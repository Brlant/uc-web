<template>
  <div class="form-header-part" v-if="pageSetsItem">
    <div class="header">
      <div class="sign f-dib"></div>
      <h3 :class="{active: pageSetsItem && pageSetsItem.key === currentTab.key}" class="tit f-dib index-tit">
        {{pageSetsItem.name}}
      </h3>
      <slot name="title-right"></slot>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'formShowPart',
    props: {
      currentTab: {
        type: Object,
        required: true
      },
      pageSetsItem: {
        required: true
      }
    }
  };
</script>
