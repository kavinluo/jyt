<!--
****--月活跃度人数
****--@date     2023/3/8
****--@author   lm
-->
<template>
  <div>
    <div
      id="monthlyActivity"
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
    // 月活跃度
    let myActivitys = this.$echarts.init(document.getElementById('monthlyActivity'))
    let activitys = {
      title: {
        text: '月活跃度人数'
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
            color: '#49ceec'
          },
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    }
    myActivitys.setOption(activitys)

  }
}
</script>
