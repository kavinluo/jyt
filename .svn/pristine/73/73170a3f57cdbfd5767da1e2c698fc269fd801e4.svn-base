<!--
****--每日显示人数
****--@date     2023/3/8
****--@author   lm
-->
<template>
  <div>
    <div
      id="headcount"
      style="width: 100%;height:240px;"
    />
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
    // 每日显示人数
    // 基于准备好的dom，初始化echarts实例
    let myChart = this.$echarts.init(document.getElementById('headcount'))
    // 指定图表的配置项和数据
    let option = {
      title: {
        text: '每日人数显示'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['注册人数', '会员人数']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['1/1', '1/1', '1/1', '1/1', '1/1', '1/1', '1/1']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '注册人数',
          type: 'line',
          stack: 'Total',
          data: [120, 111, 3, 134, 90, 230, 210]
        },
        {
          name: '会员人数',
          type: 'line',
          stack: 'Total',
          data: [220, 2, 191, 4, 55, 6, 310]
        }
      ]
    }
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option)
  }
}
</script>
