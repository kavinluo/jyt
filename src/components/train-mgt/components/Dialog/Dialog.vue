<template>
  <el-dialog
    class="sf-dialog"
    :visible="visible"
    :title="title"
    :modal="modal"
    :modalAppendToBody="modalAppendToBody"
    :appendToBody="appendToBody"
    :lockScroll="lockScroll"
    :closeOnClickModal="closeOnClickModal"
    :closeOnPressEscape="closeOnPressEscape"
    :showClose="showClose"
    :width="width"

    :customClass="customClass"
    :top="top"
    :beforeClose="beforeClose"
    :center="center"
    @open="open"
    @opened="opened"
    @close="close"
    @closed="closed"
    @update:visible="val => $emit('update:visible', val)"
  >
    <slot slot="title" name="title"></slot>
    <slot></slot>
    <slot slot="footer" name="footer"></slot>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SfDialog',
  provide() {
    return {
      isInDialog: true
    }
  },
  props: {
    // 以下为Element-ui原生属性（参照Dialog）
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },

    modal: {
      type: Boolean,
      default: true
    },

    modalAppendToBody: {
      type: Boolean,
      default: true
    },

    appendToBody: {
      type: Boolean,
      default: true
    },

    lockScroll: {
      type: Boolean,
      default: true
    },

    closeOnClickModal: {
      type: Boolean,
      default: false
    },

    closeOnPressEscape: {
      type: Boolean,
      default: true
    },

    showClose: {
      type: Boolean,
      default: true
    },

    width: String,

    fullscreen: Boolean,

    customClass: {
      type: String,
      default: ''
    },

    top: {
      type: String,
      default: '15vh'
    },
    beforeClose: Function,
    center: {
      type: Boolean,
      default: false
    },

    destroyOnClose: Boolean
  },
  computed: {
    // ...mapGetters(['device']),
    // fullscreenFlag() {
    //   return this.device === 'mobile' ? true : this.fullscreen
    // }
  },
  methods: {
    open() {
      this.$emit('open', {})
    },
    opened() {
      this.$emit('opened', {})
    },
    close() {
      this.$emit('close', {})
    },
    closed() {
      this.$emit('closed', {})
    }
  }
}
</script>

<style lang="less" scoped>
.sf-dialog {
  ::v-deep .el-dialog {
    box-sizing: content-box;
    .el-dialog__body {
      max-height: 70vh;
      position: relative;
      padding: 0;
      overflow-y: auto;
      box-sizing: content-box;
      & > .el-form {
        padding: 18px 15px;
      }
    }
    .el-dialog__footer {
      border-top: 1px solid #dcdfe6;
    }
    .el-dialog__header{
      background-color: #347ACC;;
      .el-dialog__title,.el-icon-close{
        color: #fff;
      }

    }
    &.is-fullscreen {
      width: calc(100% - 30px);
      & > .el-dialog__body {
        height: calc(100% - 108px);
        max-height: 100%;
      }
    }
  }
}
</style>
