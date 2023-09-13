<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="考试状态" name="first">
      <achievement :operailityData="operailityData"/>
    </el-tab-pane>
    <el-tab-pane label="缺席考生" name="second" >
      <absent :operailityData="operailityData"/>
    </el-tab-pane>
    <el-tab-pane label="继续考试授权码" name="author" v-if="operailityData.enableReExamCode === 1">
      <author :operailityData="operailityData"/>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import achievement from './console/achievement.vue'
import absent from './console/absentCandidates.vue'
import author from './console/authorization.vue'
export default {
  props: ['operailityData'],
  components: {
    achievement,
    absent,
    author
  },
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
