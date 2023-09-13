<template>
  <div>
    <mobileEntrance v-if="activity === 'entrance'" @setStep="setStep" :paperTxorder="paperTxorder" :operaility-data="operailityData" :type="type"></mobileEntrance>
    <activityDetails v-if="activity === 'details'" @setStep="setStep" :paperTxorder="paperTxorder" :operaility-data="operailityData" :type="type" :set-table-data="setTableData" @turnOff="turnOff"></activityDetails>
  </div>
</template>
<script>
import activityDetails from './activityDetails.vue'
import mobileEntrance from './mobileEntrance.vue'
export default {
  components: {mobileEntrance, activityDetails},
  props: ['operailityData', 'type', 'setTableData'],
  data () {
    return {
      activity: 'entrance',
      paperTxorder: []
    }
  },
  methods: {
    // 设置上一步 下一步
    setStep (type) {
      this.activity = type
    },
    turnOff () {
      this.$emit('cancel', 'add')
    },
    beforeDestroy () {
      this.$store.commit('setEntranceContent', {})
      this.$store.commit('setDetailsData', {})
    }
  }
}
</script>
<style scoped>

</style>
