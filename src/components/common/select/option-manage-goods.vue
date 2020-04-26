<template>
  <div>
    <div>
      <span class="pull-left">{{ optionItem.name }}</span>
      <span class="pull-right select-other-info">
        <dict :dict-group="'typeId'" :dict-key="optionItem.typeId"></dict><span v-show="optionItem.typeId === '1' && optionItem.vaccineSign">-<dict :dict-group="'vaccineSign'" :dict-key="optionItem.vaccineSign"></dict></span>
      </span>
    </div>
    <div class="clearfix">
      <span class="pull-left select-other-info" v-if="optionItem.code ">货品编号: {{ optionItem.code }}</span>
      <span class="pull-left select-other-info ml-15" v-if="optionItem.wholePackageAmount">
        包装: {{ optionItem.wholePackageAmount }}
        <dict :dict-group="'measurementUnit'" :dict-key="optionItem.measurementUnit"></dict>/
        <dict :dict-group="'shipmentPackingUnit'" :dict-key="optionItem.wholePackageUnit"></dict>
      </span>
      <span class="pull-right select-other-info">规格: {{ optionItem.specifications }}</span>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'manageGoodsOption',
    props: {
      optionItem: {
        required: true,
        type: Object
      }
    }
  };
</script>
