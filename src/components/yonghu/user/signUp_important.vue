<template>
  <div>
    <el-row class="but-space">
      <el-col
        :span="3"
        :offset="2"
      >
        <Icon
          style="font-size: 50px"
          type="arrow-down-a"
        />
      </el-col>
      <el-col :span="16">
        <p>填写导入人员的信息</p></br>
        <el-button
          size="mini"
          type="primary"
          @click="downloadExcel"
        >
          下载模板<i class="ivu-icon ivu-icon-arrow-down-a" />
        </el-button>
      </el-col>
    </el-row>
    <el-row class="but-space">
      <el-col
        :span="3"
        :offset="2"
      >
        <Icon
          style="font-size: 50px"
          type="upload"
        />
      </el-col>
      <el-col :span="16">
        <p>上传填好的人员信息表 ( 仅支持.xls/.xlsx格式)</p></br>
        <xlsx
          :row="1"
          @on-select-file="handleSelectedFile"
        >
          上传
        </xlsx>
      </el-col>
    </el-row>
    <el-row class="but-space">
      <el-col
        :span="18"
        :offset="5"
      >
        <p>本次已导入记录数 : {{ totalNumber }}条</p>
      </el-col>
    </el-row>

    <el-row class="but-space">
      <el-col
        :span="10"
        :offset="9"
      >
        <el-button
          @click="success"
          size="small"
          type="primary">
          完成
        </el-button>
        <el-button @click="cancel" size="small" type="warning">
          取消
        </el-button>
      </el-col>
    </el-row>
    <!--导出弹窗-->
    <Modal
      v-model="exportModal"
      :mask-closable="false"
      height="200"
      class-name="vertical-center-modal"
      :width="500"
    >
      <modal-header
        slot="header"
        :content="exportId"
      />
      <ajaxDerive
        v-if="exportModal"
        type="excel"
        file-name="人员信息模板"
        :url="'/passport/user/get-import-template'"
        mess-title="确定要下载模板吗？"
        @cancel="exportModal = false"
      />
      <div slot="footer" />
    </Modal>
    <!--导入-->
    <Modal
      v-model="toChannelModal"
      close-on-click-modal="false"
      width="1100"
      title="对话框标题"
      class-name="vertical-center-modal"
    >
      <modal-header
        slot="header"
        :content="toChannelId"
      />
      <to-channel
        v-if="toChannelModal"
        :handsontable-options="handsontableOptions"
        :url="'/knowledge/knowledgeTree/importOpenTree'"
        :data="convertedData"
        :format="format"
        @refresh="refresh"
        @cancel="closeChannel"
        @success="subHandelEvent"
      />
      <div slot="footer" />
    </Modal>
  </div>
</template>
<script>
// import toChannel from '../../common/toChannel_base.vue'
import toChannel from './toChannel_base-handsontable.vue'
import ajaxDerive from '@/components/common/ajax-derive.vue'
// 当前组件引入全局的util
let Util = null
export default {
  components: {
    toChannel,
    ajaxDerive
  },
  // props接收父组件传递过来的数据
  props: ['treeIdList'],
  data () {
    return {
      active: 0,
      // 保存按钮基本信息

      handsontableOptions: {
        columns: ''
      },
      exportModal: false,
      exportId: {id: 'exportId', title: '下载模板'},

      // 导入条件
      toChannelId: {id: 'toChannelId', title: '人员信息表'},
      convertedData: {},
      format: {
        '手机号码': 'mobile'
        // '姓名':'userName'
      },

      // 记录总条数
      totalNumber: 0,
      toChannelModal: false,
      // form表单bind数据
      formValidate: {
        file: '',
        updateSupport: false
      },

      // table
      dynamicHt: 100,
      tableData1: [{l: '1'}, {l: '1'}],
      http: ''
    }
  },
  created () {
    // 给当前组件注入全局util
    Util = this.$util
    this.init()
  },
  mounted () {
    // 初始化
    // let http = this.$store.getters.getEnvPath.http
    // this.http = '/api/passport/user/get-import-template'
    // console.log(this.$store.getters.getEnvPath.http, 'http21123')
    this.init()
  },
  methods: {
    /*
       * 组件初始化入口
       * */
    init () {
      // 默认请求加载数据
      // 初始化
    },
    downloadExcel () {
      this.exportModal = true
    },
    /*
       * 点击提交按钮 监听是否验证通过
       * @param formName string  form表单v-model数据对象名称
       * @return flag boolean   form表单验证是否通过
       * */
    submitForm (formName) {
      let flag = false
      this.$refs[formName].validate((valid) => {
        if (valid) {
          flag = true
        }
      })
      return flag
    },

    /*
       * 当前组件发送事件给父组件
       * 发送关闭(cancel)模态事件给父组件,请求关闭当前模态窗
       * */
    success () {
      this.$emit('cancel', 'import', `导入${this.totalNumber}条数据`)
    },
    refresh () {
      // this.setTableData()
    },
    cancel () {
      this.$emit('cancel', 'import')
    },
    /*
       * 获取表单数据
       * @return string  格式:id=0&name=aa
       * */
    getFormData (data) {
      let myData = Util._.defaultsDeep({}, data)
      myData.type = data.type.join(',')
      return myData
    },

    closeChannel () {
      this.toChannelModal = false
    },
    // 点击上传获取文件回调函数
    handleSelectedFile (convertedData) {
      console.log(convertedData, 'convertedData')
      if (convertedData.body === 0) {
        this.errorMess('导入数据为空，请重新选择数据')
        return
      }
      // this.handsontableOptions.columns = this.handsontableValidate(convertedData.header)
      this.convertedData = convertedData
      this.convertedData.treeIdList = this.treeIdList
      this.toChannelModal = true
    },

    // 验证必填
    _require (value, callback, message) {
      if (value !== '' && value != null) {
        callback(true)
      } else {
        callback(false)
      }
    },

    // 导入成功回调函数
    subHandelEvent (data) {
      this.closeChannel()
      this.totalNumber += data.length
    }

  }

}
</script>
