<template>
  <div>
    <h2>退回原因:</h2>
    <el-form ref="formValidate" :model="formValidate">
      <el-form-item>
        <el-input type="textarea" v-model="formValidate.desc" placeholder="请输入不通过原因"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="determine">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      formValidate: {
        desc: ''
      }
    }
  },
  methods: {
    determine () {
      console.log('确定')
    },
    cancel () {
      this.$emit('cancel', 'returns')
    }
  }
}
</script>
<style scoped>

</style>
