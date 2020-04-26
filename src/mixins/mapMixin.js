export default {
  methods: {
    addMapTools() {
      if (!this.amapManager) {
        return setTimeout(this.addMapTools, 200);
      }
      const map = this.amapManager._map;
      if (!map) {
        return setTimeout(this.addMapTools, 200);
      }
      window.AMapUI.loadUI(['control/BasicControl'], function (BasicControl) {
        //缩放控件
        map.addControl(new BasicControl.Zoom({
          position: 'rb', //left top，左上角
          showZoomNum: false //显示zoom值
        }));
      });
    }
  }
};
