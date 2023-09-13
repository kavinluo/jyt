<template>
  <div ref="videoWrapper">
    <video-player v-if="playFilePath!=''" class="vjs-custom-skin"
                  ref="videoPlayer"
                  :options="playerOptions"
                  :playsinline="true"
                  @play="onPlayerPlay($event)"
                  @pause="onPlayerPause($event)"
                  @ended="onPlayerEnded($event)"
                  @loadeddata="onPlayerLoadeddata($event)"
                  @waiting="onPlayerWaiting($event)"
                  @playing="onPlayerPlaying($event)"
                  @timeupdate="onPlayerTimeupdate($event)"
                  @canplay="onPlayerCanplay($event)"
                  @canplaythrough="onPlayerCanplaythrough($event)"
                  @ready="playerReadied"
                  @statechanged="playerStateChanged($event)">
    </video-player>
  </div>
</template>
<script>
  export default {
    props: {
      filePath: {
        type: String,
        default: ''
      },
      videoType: {
        type: String,
        default: 'mp4'
      },
      isAutoPlay: {
        type: Boolean,
        default: false
      },
      poster: {
        type: String,
        default: ''
      },
      currentTime: {
        type: Number,
        default: 0
      }
    },
    //["videoOptions"],
    data () {
      return {
        // videojs options
        playerOptions: {
          muted: true,
          language: 'en',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [{
            type: 'video/' + this.videoType,
            src: this.filePath //'http://192.168.1.116:8999/3.mp4 '//this.filePath,
          }],
          poster: this.poster,
          height: 100
        },
        playFilePath: ''
      };
    },
    mounted () {
      // console.log('this is current player instance object', this.player)
      setTimeout(() => {
        // console.log('dynamic change options', this.player)
        this.player.muted(false);
      }, 10);
      this.$nextTick(function () {
        let videoPlayer = this.$refs.videoWrapper;
        let parHt = videoPlayer.parentNode.offsetHeight;
        this.playerOptions.height = parHt;
        this.playFilePath = this.filePath;
      });
    },
    computed: {
      player () {
        return this.$refs.videoPlayer.player;
      }
    },

    created () {
    },
    methods: {
      // listen event
      onPlayerPlay (player) {
        // console.log('player play!', player)
      },
      onPlayerPause (player) {
        // console.log('player pause!', player)
      },
      onPlayerEnded (player) {
        this.$emit('ended', player);
        // console.log('player ended!', player)
      },
      onPlayerLoadeddata (player) {
        // console.log('player Loadeddata!', player)
      },
      onPlayerWaiting (player) {
        // console.log('player Waiting!', player)
      },
      onPlayerPlaying (player) {
        // console.log('player Playing!', player)
      },
      onPlayerTimeupdate (player) {
        this.$emit('currentTime', player.currentTime());
//         console.log('player Timeupdate!', player.currentTime())
      },
      onPlayerCanplay (player) {
        // console.log('player Canplay!', player)
      },
      onPlayerCanplaythrough (player) {
        // console.log('player Canplaythrough!', player)
      },
      // or listen state event
      playerStateChanged (playerCurrentState) {
        // console.log('player current update state', playerCurrentState)
      },
      // player is ready
      playerReadied (player) {  //设置开始播放开始时间(从什么时间开始播放),单位为秒
        // seek to 10s
        player.currentTime(this.currentTime);
        // console.log('example 01: the player is readied', player)
      }
    },
    watch: {
      filePath (val) {
        this.player.src(val);
        this.player.load(val);
        if (this.isAutoPlay) {
          this.player.play();
        }
      }
    }
  };
</script>
