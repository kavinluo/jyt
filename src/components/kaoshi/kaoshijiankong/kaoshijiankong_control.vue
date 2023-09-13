<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="考试成绩" name="first">
      <achievement :operailityData="operailityData"/>
    </el-tab-pane>
    <el-tab-pane label="缺席考生" name="second" >
      <absent :operailityData="operailityData" />
    </el-tab-pane>
    <el-tab-pane label="继续考试授权码" name="author" v-if="operailityData.enableReExamCode === 1">
      <author :operailityData="operailityData"/>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import achievement from './control/achievement.vue'
import absent from './control/absentCandidates.vue'
import author from './control/authorization.vue'
export default {
  components: {
    achievement,
    absent,
    author
  },
  props: ['operailityData'],
  data () {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
