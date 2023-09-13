<!--
****--在线构建
****--@date     2023/3/8
****--@author   lm
-->
<template>
  <div>
    <div
      id="consultation"
      style="width: 800px;height:600px;"
    />
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  mounted () {
    // 在线构建
    let myChart = this.$echarts.init(document.getElementById('consultation'))
    const builderJson = {
      all: 10887,
      charts: {
        map: 3237,
        lines: 2164,
        bar: 7561,
        line: 7778,
        pie: 7355,
        scatter: 2405,
        candlestick: 1842,
        radar: 2090
      },
      components: {
        geo: 2788,
        title: 9575,
        legend: 9400,
        tooltip: 9466,
        grid: 9266,
        markPoint: 3419
      },
      ie: 9743
    }
    let option = {
      title: [
        {
          text: '在线构建'
        }
      ],
      grid: [
        {
          top: 50,
          width: '100%',
          bottom: '45%',
          left: 10,
          containLabel: true
        },
        {
          top: '55%',
          width: '100%',
          bottom: 0,
          left: 10,
          containLabel: true
        }
      ],
      xAxis: [
        {
          type: 'value',
          max: builderJson.all,
          splitLine: {
            show: false
          }
        },
        {
          type: 'value',
          max: builderJson.all,
          gridIndex: 1,
          splitLine: {
            show: false
          }
        }
      ],
      yAxis: [
        {
          type: 'category',
          data: Object.keys(builderJson.charts),
          axisLabel: {
            interval: 0,
            rotate: 30
          },
          splitLine: {
            show: false
          }
        },
        {
          gridIndex: 1,
          type: 'category',
          data: Object.keys(builderJson.components),
          axisLabel: {
            interval: 0,
            rotate: 30
          },
          splitLine: {
            show: false
          }
        }
      ],
      series: [
        {
          type: 'bar',
          stack: 'chart',
          z: 3,
          itemStyle: {
            color: '#fc6f06'
          },
          label: {
            position: 'right',
            show: true
          },
          data: Object.keys(builderJson.charts).map(function (key) {
            return builderJson.charts[key]
          })
        },
        {
          type: 'bar',
          stack: 'chart',
          silent: true,
          itemStyle: {
            color: '#eee'
          },
          data: Object.keys(builderJson.charts).map(function (key) {
            return builderJson.all - builderJson.charts[key]
          })
        },
        {
          type: 'bar',
          stack: 'component',
          xAxisIndex: 1,
          yAxisIndex: 1,
          z: 3,
          itemStyle: {
            color: '#97a0d0'
          },
          label: {
            position: 'right',
            show: true
          },
          data: Object.keys(builderJson.components).map(function (key) {
            return builderJson.components[key]
          })
        },
        {
          type: 'bar',
          stack: 'component',
          silent: true,
          xAxisIndex: 1,
          yAxisIndex: 1,
          itemStyle: {
            color: '#eee'
          },
          data: Object.keys(builderJson.components).map(function (key) {
            return builderJson.all - builderJson.components[key]
          })
        }
      ]
    }
    myChart.setOption(option)
  }
}
</script>
