<template>
  <div>
    <huodongList v-if="activity === 'entrance'" @setStep="setStep"></huodongList>
    <signUp v-if="activity === 'details'" @setStep="setStep" :rowObj="rowObj"></signUp>
  </div>
</template>
<script>
import huodongList from './huodong_list.vue'
import signUp from './signUp.vue'
export default {
  components: {huodongList, signUp},
  data () {
    return {
      activity: 'entrance',
      rowObj: {}
    }
  },
  methods: {
    // 设置上一步 下一步
    setStep (type, row) {
      this.activity = type
      this.rowObj = row
    }
  }
}
</script>
<style scoped>

</style>
