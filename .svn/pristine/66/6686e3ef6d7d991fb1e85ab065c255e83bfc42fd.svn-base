<template>
  <div>
    <el-form ref="formValidate" :model="formValidate" label-width="80px">
      <el-form-item label="发布人:">
        <span>空含笑戏</span>
      </el-form-item>
      <el-form-item label="举报内容:">
        <span>淫秽色情、营销广告、网络暴力、违法信息、虚假谣言、养老诈骗</span>
      </el-form-item>
      <el-form-item label="发布时间:">
        <span>2023-05-06 19:45:00</span>
      </el-form-item>
      <el-form-item label="发布内容:">
        <p>
          <el-input type="textarea" v-model="formValidate.names"></el-input>
        </p>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">忽略</el-button>
        <el-button @click="notPass">退回</el-button>
      </el-form-item>
    </el-form>
    <!-- 不通过 -->
    <Modal v-model="returnsModal" :mask-closable="false" close-on-click-modal="false" width="500" title="对话框标题" class-name="vertical-center-modal">
      <modal-header slot="header" :content="returnsId" />
      <returns v-if="returnsModal" :operaility-data="operailityData" :type="type" @cancel="cancel" />
      <div slot="footer" />
    </Modal>
  </div>
</template>
<script>
import returns from './zixunjubao_return.vue'
export default {
  components: {
    returns
  },
  data () {
    return {
      returnsModal: false,
      returnsId: {id: 'returnsId', title: '退回'},
      formValidate: {
        name: '',
        names: ''
      }
    }
  },
  methods: {
    onSubmit () {
    },
    notPass () {
      this.openModel('returns')
    }
  }
}
</script>
<style scoped>

</style>
