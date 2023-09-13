<!--左右机构的tree-->
<template>
  <div class="container">
    <div class="treeLeft" v-if="showLeft">
      <slot name="left"></slot>
    </div>
    <div class="treeRight">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<style lang="less">
  .container {
    position: relative;
    height: 100%;
  }

  .treeLeft {
    width: 220px;
    height: 100%;
    & ~ .treeRight {
      left: 228px;
    }
  }

  .treeRight {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: hidden
  }
</style>
<script>
  export default {
    props: ['treeOptions', 'hasLeft'],
    data () {
      return {
        showLeft: true
      };
    },
    methods: {
      init () {
        if (this.hasLeft !== undefined) {
          this.showLeft = this.hasLeft;
        } else {
          this.showLeft = true;
        }
      }
    },
    watch: {
      hasLeft () {
        this.init();
      }
    },
    created () {
      this.init();
    }
  };
</script>

