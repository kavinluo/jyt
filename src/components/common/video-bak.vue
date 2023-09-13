<template>
  <div
    id="player"
    ref="player"
    style="width: 100%; height: 100%;"
  />
</template>
<script>
/* 当前组件必要引入*/

// 当前组件引入全局的util
let Util = null
export default{
  components: {},
  props: {
    type: { // 点播视频的格式:mp4、m3u8、oga、webm、theora、flv、f4v
      type: String,
      default: 'mp4'
    },
    skin: { // 播放器皮肤:
      type: String,
      default: 'vodWhite'
    },
    lang: { // 播放器语言:
      type: String,
      default: 'zh_CN'
    },
    title: { // 播放器皮肤:
      type: String,
      default: '6666666'
    },
    url: { // 视频服务器所在地址:
      type: String,
      default: 'http://192.168.1.116:8999/hls/888.m3u8'
      // default:"http://jackzhang1204.github.io/materials/mov_bbb.mp4",
    },
    poster: { // 视频服务器所在地址:
      type: String,
      default: 'http://jackzhang1204.github.io/materials/poster.png'
    },
    videoName: { // 视频服名称:
      type: String,
      default: '我在测试呢'
    },
    startTime: { // 视频播放开始时间:
      type: Number,
      default: 0
    },
    isAutoPaly: { // 视频是否自动播放:
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  beforeDestroy () {
    if(window.SewisePlayer) {
      // eslint-disable-next-line no-undef
      SewisePlayer.doStop()
    }
    this.$refs.player.innerHTML = ''
  },
  created () {
    this.init()
  },
  mounted () {
  },
  methods: {
    // 初始化请求列表数据
    init () {
      this.$nextTick(function () {
        // 播放形式1
        // eslint-disable-next-line no-undef
        SewisePlayer.setup({
          server: 'vod',
          type: 'm3u8',
          autostart: 'true',
          poster: 'http://jackzhang1204.github.io/materials/poster.png',
          videourl: 'http://192.168.1.116:8999/hls/888.m3u8',
          skin: 'vodWhite',
          title: 'Live M3U8',
          claritybutton: 'disable',
          lang: 'zh_CN'
        }, 'player')
      })
    },

    // 点播接口调用方法
    startPlay () { // 开始播放
      // eslint-disable-next-line no-undef
      SewisePlayer.doPlay()
    },
    playPause () { // 暂停播放
      // eslint-disable-next-line no-undef
      SewisePlayer.doPause()
    },
    seekTo (n) { // 跳转到某个时间点(单位秒)
      // eslint-disable-next-line no-undef
      SewisePlayer.doSeek(n)
    },
    playStop () { // 停止播放
      // eslint-disable-next-line no-undef
      SewisePlayer.doStop()
    },
    changeVolume (n) { // 更改音量调节
      // eslint-disable-next-line no-undef
      SewisePlayer.setVolume(n)
    },
    getDuration () { // 获取视频的总时长
      // eslint-disable-next-line no-undef
      alert(SewisePlayer.duration())
    },
    getPlayTime () { // 获取当前播放时间位置、日期  点播返回当前视频播放到的位置（秒）。直播返回当前视频播放到的时间点（日期）
      // eslint-disable-next-line no-undef
      alert(SewisePlayer.playTime())
    },
    switchVideo () {
      setTimeout(()=>{
        // eslint-disable-next-line no-undef
        SewisePlayer.toPlay(this.url, this.videoName, this.startTime, this.isAutoPaly)
        // SewisePlayer.fullScreen();
      }, 500)
    }
  }
}
</script>
