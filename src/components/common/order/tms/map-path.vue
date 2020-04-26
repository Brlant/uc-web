<style scoped>
  .map-path {
    margin-bottom: 10px;
  }
</style>
<template>
  <div>
    <div v-show="!points.length" class="empty-type-info mini">暂无轨迹信息</div>
    <el-amap v-show="points.length" ref="pathMap" :vid="vid" :amap-manager="amapManager"
             :zoom="10" class="map-path" :style="mapStyle">
    </el-amap>
  </div>
</template>
<script>
  import {AMapManager} from 'vue-amap';
  import MapMixin from '@/mixins/mapMixin';
  export default {
    props: {
      points: Array,
      mapStyle: {
        type: Object,
        default() {
          return {
            height: '300px'
          };
        }
      },
      vid: {
        type: String,
        default: 'pathMap'
      }
    },
    mixins: [MapMixin],
    data() {
      return {
        amapManager: new AMapManager(),
        pathSimplifierIns: null
      };
    },
    watch: {
      points(val) {
        if (!val || val && !val.length) return;
        this.drawPath(val);
      }
    },
    mounted() {
      this.addMapTools();
    },
    methods: {
      // 创建轨迹线对象
      createPathSimplifier(PathSimplifier) {
        const pathSimplifierIns = new PathSimplifier({
          zIndex: 100,
          map: this.amapManager._map, //所属的地图实例
          getPath: function (pathData, pathIndex) {
            let points = pathData.points;
            let lnglatList = [];
            for (let i = 0, len = points.length; i < len; i++) {
              lnglatList.push(points[i].lnglat);
            }
            return lnglatList;
          },
          getHoverTitle: function (pathData, pathIndex, pointIndex) {
            if (typeof pointIndex !== 'number') return false;
            if (pointIndex === 0) return pathData.points[pointIndex].time + '出发';
            if (pointIndex === pathData.points.length - 1) {
              return pathData.points[pointIndex].time + '到达目的地（' + pathData.points[0].name + '）';
            }
            return pathData.points[pointIndex].time + '路过此地';
          },
          renderOptions: {
            startPointStyle: {
              radius: 8
            },
            endPointStyle: {
              radius: 8
            }
          }
        });
        this.pathSimplifierIns = pathSimplifierIns;
        return pathSimplifierIns;
      },
      // 画线
      drawPath(points) {
        window.AMapUI.loadUI(['misc/PathSimplifier'], PathSimplifier => {
          const pathSimplifierIns = this.pathSimplifierIns ? this.pathSimplifierIns : this.createPathSimplifier(PathSimplifier);
          pathSimplifierIns.setData([{points}]);
          pathSimplifierIns.setSelectedPathIndex(0);
        });
      }
    }
  };
</script>
