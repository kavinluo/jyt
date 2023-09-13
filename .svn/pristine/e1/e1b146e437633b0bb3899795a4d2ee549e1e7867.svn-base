<template>
  <div>
    <xingyundazhuanpan v-if="activity === 'entrance'" @setStep="setStep"></xingyundazhuanpan>
    <personnel v-if="activity === 'personnels'" @setStep="setStep" :rowObj="rowObj"></personnel>
    <applicant v-if="activity === 'applicants'" @setStep="setStep" :rowObj="rowObj"></applicant>
  </div>
</template>
<script>
import xingyundazhuanpan from './xingyundazhuanpan_list.vue'
import personnel from './personnel.vue'
import applicant from './applicant.vue'
export default {
  components: {xingyundazhuanpan, personnel, applicant},
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
