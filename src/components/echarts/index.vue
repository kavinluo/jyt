<template>
  <div
    :id="id"
    :class="className"
    :style="{ height: height, width: width }"
  />
</template>
<script>
import * as echarts from 'echarts'
// import tdTheme from './theme.json' // 引入默认主题
// echarts.registerTheme('tdTheme', tdTheme) // 覆盖默认主题
export default {
  name: 'Echarts',
  props: {
    className: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    },
    options: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      chart: null
    }
  },
  watch: {
    options: {
      handler (val) {
        this.init(val)
      },
      deep: true
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init (options) {
      let chart = echarts.init(this.$el, 'tdTheme')
      chart.setOption(options || this.options || {})
      window.addEventListener('resize', () => {
        if (chart) {
          chart.resize()
        }
      })
    }
  }
}
</script>
