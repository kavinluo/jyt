<template>
  <div>
    <paikaoshezhi v-if="activity === 'entrance'" @setStep="setStep" />
    <arrange v-if="activity === 'details'" @setStep="setStep" :rowObj="rowObj"/>
  </div>
</template>
<script>
import arrange from './arrangeName_list.vue'
import paikaoshezhi from './paikaoshezhi_list.vue'
export default {
  components: {arrange, paikaoshezhi},
  data () {
    return {
      activity: 'entrance',
      rowObj: {}
    }
  },
  methods: {
    setStep (type, row) {
      this.activity = type
      this.rowObj = row
    }
  }
}
</script>
