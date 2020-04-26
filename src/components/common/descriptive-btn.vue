<template>
  <perm :label="perm">
    <span @click.stop.prevent="$emit('click')" class="des-btn">
               <a @click.prevent="" class="btn-circle" href="#"><i
                 :class="(custom ? 'el-icon-t-' :'el-icon-') + icon"></i></a>
      <slot></slot>
    </span>
  </perm>
</template>
<script>
  export default {
    name: 'desBtn',
    props: {
      icon: String,
      perm: String,
      custom: {
        type: Boolean,
        default: false
      }
    }
  };
</script>
