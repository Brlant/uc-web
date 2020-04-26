export default {
  data() {
    const bizTypes = [
      {label: '采购入库', key: '0', value: '1-0', type: '0', icon: 'purchase-in'},
      {label: '销售退货', key: '1', value: '1-1', type: '0', icon: 'sale-return'},
      {label: '盘盈入库', key: '2', value: '1-2', type: '0', icon: 'full-in'},
      {label: '调拨入库', key: '3', value: '1-3', type: '0', icon: 'allot-in'},
      {label: '销售出库', key: '4', value: '2-0', type: '1', icon: 'sale-out'},
      {label: '采购退货', key: '5', value: '2-1', type: '1', icon: 'purchase-out'},
      {label: '盘亏出库', key: '6', value: '2-2', type: '1', icon: 'loss-out'},
      {label: '调拨出库', key: '7', value: '2-3', type: '1', icon: 'allot-out'},
      {label: '报损', key: '10', value: '2-4', type: '1', icon: 'loss-out'}
    ];
    const codesBizType = bizTypes.concat([
      {label: '零售/使用', key: '8', value: '3-0', type: '2', icon: 'medical-device'},
      {label: '异常', key: '9', value: '4-0', type: '3', icon: 'error'}
    ]);
    return {
      bizTypes,
      codesBizType
    };
  },
  methods: {
    filterBizType(bizType) {
      let ary = this.bizTypes.filter(f => f.value === bizType);
      return ary.length ? ary[0].label : '';
    },
    filterCodesBizType(bizType) {
      let ary = this.codesBizType.filter(f => f.value === bizType);
      return ary.length ? ary[0].label : '';
    },
    filterCodesIcon(bizType) {
      let ary = this.codesBizType.filter(f => f.value === bizType);
      return ary.length ? ary[0].icon : '';
    }
  }
};
