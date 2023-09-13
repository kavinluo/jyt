<!--
****--每日做题量
****--@date     2023/3/8
****--@author   lm
-->
<template>
  <div>
    <div
      id="doaProblem"
      style="width: 100%;height:240px;"
    />
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  mounted () {
    // 每日做题量
    let mydoaProblem = this.$echarts.init(document.getElementById('doaProblem'))
    let doaProblem = {
      title: {
        text: '每日做题量'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          itemStyle: {
            color: '#fc6f06'
          },
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    }
    mydoaProblem.setOption(doaProblem)
  }
}
</script>
