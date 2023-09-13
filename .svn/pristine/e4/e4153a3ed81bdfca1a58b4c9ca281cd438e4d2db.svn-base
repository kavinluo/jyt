<template>
  <div class="subModBox">
    <div class="row-layout">
      <el-row :gutter="10">
        <el-col :span="16" :class="{'disableCheck':!model.checked&&model.leaf}">
          <i v-if="!model.checked&&model.leaf" class="el-icon-circle-cross"></i>
          <i v-if="model.checked" class="el-icon-circle-check" style="color: #00f21c"></i>
          &nbsp;{{model.name}}</el-col>
        <el-col :span="8">{{model.remark}}</el-col>
      </el-row>
    </div>
    <div v-if="!model.leaf" class="subModBox">
      <tiems :model="cl" :key="x" v-for="(cl,x) in model.children"> </tiems>
    </div>
  </div>
</template>
<script>
// 显示tree结构视图
export default{
  name: 'tiems',
  props: ['model'],
  components: {},
  data () {
    return{}
  },
  computed: {
    isFolder: function () {
      return this.model.children && this.model.children.length
    }
  },
  created () {
  }
}
</script>

<style>
  .disableCheck{
    color: #e1e1e1;
  }
</style>
