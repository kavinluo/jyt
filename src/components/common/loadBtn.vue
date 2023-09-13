<template>
  <el-button
    :size="btnData.size"
    :type="type"
    :loading="loading"
    class="sureBtn submitBtn"
    @click="submit"
  >
    <span v-if="!loading">{{ btnData.title }}</span>
    <span v-else>加载中</span>
  </el-button>
</template>
<script>
export default{
  // props.data=>{title:'提交',callParEvent:"success"}
  props: ['btnData'],
  data () {
    return{
      loading: false,
      size: '',
      type: 'primary'
    }
  },
  created () {
    if(typeof this.btnData.type !== 'undefined') {
      this.type = this.btnData.type
    }
    if(typeof this.btnData.size !== 'undefined') {
      this.size = this.btnData.size
    }
  },
  mounted () {
  },
  methods: {
    postData () {
      // for(var i=0;i<1000;i++){
      this.$emit(this.btnData.callParEvent, this.isLoadingFun)
      // }
    },
    isLoadingFun (status) {
      this.loading = status
    },
    submit () {
      this.postData()
    }
  }
}
</script>
