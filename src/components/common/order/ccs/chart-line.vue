<style scoped="">
  .chart-Line {
    height: 300px;
    width: 100%;
  }
</style>
<template>
  <div>
    <e-charts :options="option" theme="light" class="chart-Line"></e-charts>
  </div>
</template>
<script>
  import 'echarts/lib/chart/line';
  import 'echarts/lib/component/tooltip';
  import 'echarts/lib/component/title';
  import 'echarts/lib/component/legend';
  import 'echarts/lib/component/markPoint';
  import 'echarts/lib/component/markLine';
  import ECharts from 'vue-echarts/components/ECharts.vue';

  import('echarts/lib/component/dataZoom');

  export default {
    props: ['dataList', 'devInfo'],
    components: {ECharts},
    data() {
      return {
        option: {
          progressive: 200,
          progressiveThreshold: 600,
          title: {
            text: '温度计数据',
            textStyle: {
              fontSize: 16
            }
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['温度']
          },
          xAxis: {
            type: 'time',
            splitLine: {
              show: false
            }
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} °C'
            },
            min: function (value) {
              return value.min;
            },
            max: function (value) {
              return value.max;
            }
          },
          dataZoom: [
            {
              id: 'dataZoomXslider',
              type: 'slider',
              xAxisIndex: [0],
              filterMode: 'filter'
            },
            {
              id: 'dataZoomXinside',
              type: 'inside',
              xAxisIndex: [0],
              filterMode: 'filter'
            }
          ],
          grid: {
            bottom: 80
          },
          series: [
            {
              name: '温度',
              type: 'line',
              showSymbol: true,
              data: [],
              smooth: true,
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              },
              markLine: {
                data: [
                  {
                    type: 'average',
                    name: '平均值'
                  }
                ]
              }
            }
          ]
        }
      };
    },
    watch: {
      dataList: {
        handler(val) {
          if (!val || !val.length) return;
          this.option.legend.data = [];
          this.option.series = [];
          val.forEach(i => {
            this.option.legend.data.push(`${i.name}`);
            let data = {
              name: `${i.name}`,
              type: 'line',
              showSymbol: true,
              data: i.tempData.map(m => {
                return {
                  name: m.createTime,
                  value: [m.createTime, m.devActval]
                };
              }),
              smooth: true,
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              },
              markLine: {
                data: [
                  {
                    type: 'average',
                    name: '平均值'
                  }
                ]
              }
            };
            if (this.devInfo) {
              if (this.devInfo.departTime) {
                data.markLine.data.push({
                  xAxis: this.devInfo.departTime,
                  label: {
                    formatter: obj => {
                      return this.$moment(obj.value).format('HH:mm:ss');
                    }
                  },
                  lineStyle: {
                    color: 'red'
                  }
                });
              }
              if (this.devInfo.arriveTime) {
                data.markLine.data.push({
                  xAxis: this.devInfo.arriveTime,
                  label: {
                    formatter: obj => {
                      return this.$moment(obj.value).format('HH:mm:ss');
                    }
                  },
                  lineStyle: {
                    color: 'red'
                  }
                });
              }
            }
            this.option.series.push(data);
          });
        },
        deep: true
      }
    }
  };
</script>
