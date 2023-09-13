<template>
  <!-- 用户头像 -->
  <div
    class="userAvatarBox"
    :class="{'border': border, 'cursor': cursor}"
  >
    <template v-if="tipText">
      <img
        v-if="src"
        :src="src"
        class="userAvatarImg"
      >
      <p
        v-else
        class="userAvatarTips"
      >
        {{ tipText }}
      </p>
    </template>
    <img
      v-else
      :src="src"
      class="userAvatarImg"
    >
  </div>
</template>

<script>
export default {
  props: {
    border: { // 是否需要边框
      type: Boolean,
      default: false
    },
    cursor: { // 是否需要手势（鼠标可点击图标）
      type: Boolean,
      default: false
    },
    radius: { // 是否需要圆角（传值示例：10px || 50%）
      type: [Number, String],
      default: 0
    },
    tipText: { // 没有头像时的提示文本
      type: String,
      default: ''
    },
    src: { // 头像地址
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  },
  created () {
    this.init()
  },
  methods: {
    // 初始化
    init () {

    }
  }
}

</script>

<style lang="scss">
  .userAvatarBox{width: 100%;height: 100%;overflow: hidden;text-align: center;
    &.border{border:1px solid #bfcbd9;}
    &.cursor{cursor:pointer;}
  }
  .userAvatarImg{height: 100%;}
  .userAvatarTips{text-align: center;margin-top: 50%;transform: translateY(-50%);}
</style>
