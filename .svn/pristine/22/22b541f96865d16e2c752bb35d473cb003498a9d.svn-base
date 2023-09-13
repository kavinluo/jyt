<template>
  <div>
    <video controls style="widht: 200px;height:200px;" v-if="type=== 'videoId'">
      <source :src="operailityData.stemFilePath" type="audio/mpeg">
    </video>
    <video controls style="widht: 200px;height:200px;" v-if="type=== 'videoAnswerExplainFileId'">
      <source :src="operailityData.answerExplainFilePath" type="audio/mpeg">
    </video>
    <video controls style="widht: 200px;height:200px;" v-if="type=== 'fileId'">
      <source :src="operailityData.filePath" type="audio/mpeg">
    </video>
  </div>
</template>
<script>
export default {
  props: ['operailityData', 'type'],
  data () {
    return {}
  },
  created() {
    console.log(this.operailityData, this.type)
  }
}
</script>
