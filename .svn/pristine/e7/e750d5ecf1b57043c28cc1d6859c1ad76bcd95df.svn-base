<!--
****--每日在线时长
****--@date     2023/3/8
****--@author   lm
-->
<template>
  <div>
    <div
      id="online"
      style="width: 420px;height:320px;"
    />
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  mounted () {
    // 每日在线时长
    let myOnline = this.$echarts.init(document.getElementById('online'))
    let online = {
      title: {
        text: '每日在线时长',
        subtext: 'Fake Data',
        left: 'left'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'right'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: '1小时' },
            { value: 735, name: '2小时' },
            { value: 580, name: '3小时' },
            { value: 484, name: '4小时' },
            { value: 300, name: '5小时' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    myOnline.setOption(online)
  }
}
</script>
