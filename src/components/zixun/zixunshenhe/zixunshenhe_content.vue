<template>
  <div>
    <el-form ref="formValidate" :model="formValidate" label-width="80px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="发布人:">
            <span>{{ dataObj.nickname }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="权值:">
            <el-input style="width:200px;" placeholder="请输入权值" v-model="formValidate.weight"/>
            <p>注:</p>
            <p>1、数据内容充实+10</p>
            <p>2、想放推荐页+20以上</p>
            <p>3、数据内容过少则不加</p>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button class="blueBtn" @click="weight">设置权值</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="发布时间:">
        <span v-if="dataObj.contentDatetime !== null">{{dataObj.contentDatetime| filterTime}}</span>
        <span v-else>-</span>
      </el-form-item>
      <el-form-item label="发布内容:">
        <editor-bar
          v-model="contentDetails"
          :is-clear="isClear"
          :id-edit="editorType"
        />
      </el-form-item>
      <el-form-item>
        <el-button class="blueBtn" @click="onSubmit">通过</el-button>
        <el-button class="blueBtn" @click="notPass">不通过</el-button>
      </el-form-item>
    </el-form>
    <!-- 不通过 -->
    <Modal v-model="passModal" :mask-closable="false" close-on-click-modal="false" width="500" title="对话框标题" class-name="vertical-center-modal">
      <modal-header slot="header" :content="passId" />
      <failtopass v-if="passModal" :operaility-data="operailityData" @cancel="cancel" @concentCancel="concentCancel" />
      <div slot="footer" />
    </Modal>
  </div>
</template>
<script>
import failtopass from './zixunshenhe_failToPass.vue'
import editorBar from '@/components/tiku/jichutiku/editor/editoritem.vue'
import api from './api'
export default {
  components: {
    failtopass,
    editorBar
  },
  props: ['operailityData', 'setTableData'],
  data () {
    return {
      api,
      dataObj: {},
      isClear: false,
      editorType: 'edit',
      batchModal: false,
      passModal: false,
      contentDetails: '',
      passId: {id: 'passId', title: '不通过'},
      formValidate: {
        weight: 1
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      let opt = {
        ajaxSuccess: res => {
          this.dataObj = res.data
          this.formValidate.weight = res.data.manWeight
          this.contentDetails = res.data.contentDetails
        },
        ajaxParams: {
          url: api.getList.path + this.operailityData.id,
          method: 'get'
        }
      }
      this.ajax(opt)
    },
    concentCancel () {
      this.$emit('cancel', 'content')
    },
    onSubmit () {
      let opt = {
        ajaxSuccess: res => {
          if (res.code === 0) {
            this.$message({
              message: '已通过',
              type: 'success'
            })
            this.setTableData()
            this.$emit('cancel', 'content')
          }
        },
        ajaxParams: {
          url: api.auditPut.path + this.operailityData.id,
          method: 'put',
          jsonString: true,
          data: {
            auditReason: '',
            flag: 1
          }
        }
      }
      this.ajax(opt)
    },
    // 设置权值
    weight () {
      let opt = {
        ajaxSuccess: res => {
          if (res.code === 0) {
            this.$message({
              message: '设置成功',
              type: 'success'
            })
            this.$emit('cancel', 'batch')
            this.setTableData()
          }
        },
        ajaxParams: {
          url: api.weightPut.path + this.operailityData.id,
          method: 'put',
          jsonString: true,
          data: this.formValidate
        }
      }
      this.ajax(opt)
    },
    notPass () {
      this.openModel('pass')
    }
  }
}
</script>
<style scoped>

</style>
