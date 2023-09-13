<template>
  <div>
    <p class="title">
      {{ $route.query.arrangeName }}
    </p>
    <div style="text-align: center; margin-top:2%;">
      <img
        style="width:400px;height:400px;"
        :src="previewImgUrl"
        alt=""
      >
    </div>
    <div style="width:300px;margin: 10px auto;">
      <p style="text-align:center;">
        请在倒计时结束前完成扫码签到
      </p>
      <el-progress
        :text-inside="true"
        :stroke-width="26"
        :percentage="parseFloat(time)"
      />
    </div>
  </div>
</template>
<script>
import api from '../jiankao/api'
export default {
  data () {
    return {
      api,
      previewImgUrl: '',
      frequency: 0,
      countdown: 0,
      time: 0,
      code: '',
      timer: null
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      let opt = {
        ajaxSuccess: res => {
          this.previewImgUrl = res.data.qrcodeBase64Str
          this.countdown = res.data.remainTimeLength / 100
          this.frequency = res.data.refreshTimeLength / 100
        },
        ajaxParams: {
          url: api.imgCode.path + this.$route.query.arrangeId,
          method: api.imgCode.method
        }
      }
      this.ajax(opt).then(() => {
        this.timers()
      })
    },
    timers () {
      this.timer = setInterval(() => {
        this.countdown--
        let time
        time = this.countdown / this.frequency * 100
        this.time = time.toFixed(0)
        if (time.toFixed(0) === '0') {
          this.init()
          clearInterval(this.timer)
        }
      }, 100)
    }
  }
}
</script>
<style scoped>
.title {
  text-align: center;
  padding-top: 5%;
  font-size: 20px;
  font-weight: 600;
}
</style>
