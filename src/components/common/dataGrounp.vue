<template>

  <el-date-picker
    v-model="value1"
    align="right"
    type="date"
    placeholder="选择日期"
    :picker-options="pickerOptions1">
  </el-date-picker>
  到
  <el-date-picker
    v-model="value2"
    align="right"
    type="date"
    placeholder="选择日期"
    :picker-options="pickerOptions1">
  </el-date-picker>
</template>
