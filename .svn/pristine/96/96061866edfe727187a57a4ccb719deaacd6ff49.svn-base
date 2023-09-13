<template>
  <!-- 下载考核视频 -->
  <Modal
    v-model="viewVideoModal"
    :mask-closable="false"
    height="200"
    class-name="vertical-center-modal"
    :width="900"
    @on-cancel="cancel"
  >
    <modal-header
      slot="header"
      :content="viewVideoId"
    />
    <el-row class="viewExamineVideoBox">
      <template v-if="videoArr && videoArr.length">
        <el-col
          :span="16"
          class="vevbItem vePlayBox"
        >
          <e-video
            v-if="playPath"
            :is-auto-play="true"
            :file-path="playPath"
          />
        </el-col>
        <el-col
          :span="8"
          class="vevbItem"
        >
          <div class="vevbList">
            <p
              v-for="(item,index) in videoArr"
              :key="index"
              class="vevblItem"
              :class="{active:activeIndex===index}"
              @click="play(item.filePath,index)"
            >
              {{ index + 1 }}. {{ item.name }}
            </p>
          </div>
        </el-col>
      </template>
      <p
        v-else
        class="vevbTips"
      >
        {{ videoArr === null ? '监控视频准备中，请稍等...' : '暂无监控视频' }}
      </p>
    </el-row>
    <div slot="footer" />
  </Modal>
</template>
<style lang="scss">
  $viewExamineVideoBoxHeight: 360px;
  .viewExamineVideoBox {
    height: $viewExamineVideoBoxHeight;
    border: 1px solid #ccc;
    .vevbItem {
      height: $viewExamineVideoBoxHeight;
      position: relative;
    }
    .vevbList {
      height: 100%;
      padding: 10px;
      overflow: auto;
    }
    .vevblItem {
      cursor: pointer;
      margin: 10px 0;
      padding: 4px;
      font-size: 14px;
      &.active {
        font-weight: bold;
      }
      &:hover {
        background: #d7dde4;
      }
    }
    .vevbTips {
      line-height: $viewExamineVideoBoxHeight;
      text-align: center;
    }
    .vePlayBox {
      background-color: #222;
      &:after {
        content: ' ';
        width: 1px;
        height: 100%;
        background: #ccc;
        position: absolute;
        right: 0;
        top: 0;
      }
    }
  }
</style>
<script>
/* 当前组件必要引入*/
import eVideo from './video.vue'
// 当前组件引入全局的util
// eslint-disable-next-line no-unused-vars
let Util = null
export default {
  name: 'ViewExamineVideo',
  components: {
    eVideo
  },
  props: ['operailityData'],
  data () {
    return {
      activeIndex: '',
      viewVideoModal: true,
      viewVideoId: {
        id: 'viewVideoId',
        title: '查看考核监控视频'
      },
      videoArr: null,
      playPath: ''
    }
  },
  created () {
    this.init()
  },
  mounted () {
  },
  methods: {
    // 初始化请求列表数据
    init () {
      Util = this.$util
      this.operailityData && this.getVideo()
    },
    // 播放
    play (path, index) {
      this.activeIndex = index
      this.playPath = this.getVideoPath(path)
    },
    // 下载监控视频
    getVideo () {
      this.videoArr = null
      let opt = {
        ajaxSuccess: res => this.videoArr = res.data,
        ajaxError: () => {
          this.errorMess('获取监控视频异常，请重试...')
          this.cancel()
        },
        ajaxParams: {
          url: 'scene/maintain/video/download/' + this.operailityData.id
        }
      }
      this.ajax(opt)
    },

    // 获取监控视频下载地址
    getVideoPath (path) {
      return this.$store.getters.getEnvPath.http + path
    },
    // 取消下载
    cancel () {
      this.viewVideoModal = false
      this.$emit('cancel')
    }
  }
}

</script>
