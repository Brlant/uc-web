<style lang="scss" scoped>
  .qp-box {
    &.border {
      margin-bottom: 20px;
      border: 1px solid #eee;
      border-radius: 5px;
      padding: 0 20px 10px;
    }
    .title {
      padding: 4px;
      background: #eef2f3;
      text-align: center;
    }
    .oms-col, .oms-row {
      font-size: 14px;
    }
    .order-list-header {
      background: #eef1f6;
      min-height: 30px;
    }
  }
  .h2-title {
    font-size: 16px;
  }
</style>
<template>
  <div>
    <div v-if="loadingData">
      <oms-loading :loading="loadingData"></oms-loading>
    </div>
    <div v-else-if="!waybillInfos.length" class="empty-info">暂无信息</div>
    <div v-else>
      <div class="qp-box" :class="{'border': waybillInfos.length > 1}" v-for="item in waybillInfos">
        <h2 class="title" v-show="waybillInfos.length > 1">运单号:{{ item.waybillNumber }}</h2>
        <h2 class="h2-title">运单信息</h2>
        <el-row>
          <oms-col label="运单号" :rowSpan="6" :isShow="true" v-show="waybillInfos.length===1">{{item.waybillNumber}}
          </oms-col>
          <oms-col label="车牌号" :rowSpan="6" :isShow="true">{{item.licensePlate}}</oms-col>
          <oms-col label="启运时间" :rowSpan="6" :isShow="true">{{item.shipmentTime | time}}</oms-col>
          <oms-col label="送达时间" :rowSpan="6" :isShow="true">{{item.completeTime | time}}</oms-col>
        </el-row>
        <hr class="hr"/>
        <template v-if="item.completeTime">
          <h2 class="h2-title">交接数据</h2>
          <div v-show="item.handOverList.length">
            <chart-line-hand ref="vhDevTempLineHand" class="mt-10" :dataList="item.handOverList"
                             :devInfo="item"></chart-line-hand>
          </div>
          <div v-show="!item.handOverList.length">暂无数据</div>
        </template>
        <hr class="hr"/>
        <h2 class="h2-title">
          <span>配送轨迹</span>
        </h2>
        <div>
          <map-path :points="item.points" :vid="item.waybillNumber" :mapStyle="{
          height: '300px', width: '600px',margin: '0 auto'}"></map-path>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ChartLine from './ccs/chart-line';
  import ChartLineHand from './ccs/chart-line-hand';
  import MapPath from './tms/map-path';
  window.$mapInit();
  export default {
    props: {
      currentOrder: Object,
      index: Number,
      showBigMap: Function
    },
    components: {ChartLine, MapPath, ChartLineHand},
    data: function () {
      return {
        loadingData: false,
        waybillInfos: [],
        showIndex: -1,
        tempTypeList: ['有线温度计', '无线温度计', '冷柜温度计', '车头温度计', '湿度计']
      };
    },
    watch: {
      index(val) {
        this.waybillInfos = [];
        this.showIndex = -1;
        if (val !== 2) return;
        this.loadingData = true;
        this.queryWaybillInfo();
      }
    },
    mounted() {
      this.waybillInfos = [];
      this.showIndex = -1;
      this.loadingData = true;
      this.params = {};
      if(this.currentOrder.bizType.charAt(0) === '1') {
        this.params.orgId = this.currentOrder.directionOrgId;
        this.queryWaybillInfo();
      } else  {
        this.params.orgId = this.currentOrder.orgId;
        this.queryWaybillInfo();
      }
    },
    methods: {
      queryWaybillInfo() {
        this.showIndex = 1;
          this.$http.get(`/code-logistics-monitor/${this.currentOrder.orderNo}/waybill`, {params: this.params}).then(res => {
            res.data.forEach(dto => {
              dto.devList = dto.devCodeList;
            dto.tempDataList = [];
            dto.vehicleDevList = [];
            dto.vehicleDevtempDataList = [];
            dto.points = [];
            dto.handOverList = [];
            //交接数据
            this.queryHandOverList(dto);
          });
          this.loadingData = false;
            this.waybillInfos = res.data;
          this.queryWayBillPath(this.waybillInfos);
        }).catch(() => {
          this.loadingData = false;
        });
      },
      queryWayBillPath(waybillInfos) {
          this.$http.get(`/code-logistics-monitor/${this.currentOrder.orderNo}/track/list`, {params: this.params}).then(res => {
          waybillInfos.forEach(i => {
            let ary = res.data && res.data.filter(f => f.waybillNo === i.waybillNumber) || [];
            i.points = ary.length && ary[0].logDtos.map(m => ({
              lnglat: [m.trackLongitude, m.trackLatitude],
              time: this.$moment(m.positioningTime).format('YYYY-MM-DD HH:mm:ss')
            })) || [];
          });
        }).catch(() => {
        });
      },
      queryHandOverList(dto) {
        if (!dto.completeTime) return;
        this.$http.get(`/code-logistics-monitor/handover-data/${dto.waybillNumber}`, {params: this.params}).then(res => {
          dto.handOverList = res.data;
        }).catch(() => {
        });
      },
      formatTime(time, str = 'YYYY-MM-DD HH:mm:ss') {
        return time ? this.$moment(time).format(str) : '';
      },
      getTimeParams(startTime, completeTime) {
        let {formatTime} = this;
        const start = 30 * 60 * 1000;
        const tm = 10 * 60 * 1000;
        return {
          startTime: formatTime(startTime - start),
          endTime: formatTime(completeTime ? completeTime + tm : Date.now())
        };
      },
      $formatDevData(item, type) {
        let unit = ['', '℃', '%', 'V'];
        let prop = ['', 'temperature', 'humidity', 'voltage'];
        if (!item[prop[type]]) return '';
        return item[prop[type]].toFixed(2) + unit[type];
      },
      $formatDevType(item) {
        return item.devType === '4' ? '2' : '1';
      }
    }
  };
</script>
