<!----------------------------------
****--@name     ${*}
****--@role     ${*}
****--@date     2023/5/4
****--@author   yyl
----------------------------------->
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
        <upload-file :uploadUrl="uploadUrl" :showFileList="true" :upload-files="uploadFiles"
                     :length="1" :tipShow="false">
        </upload-file>
      </el-col>
    </el-row>

    <el-row class="but-space">
      <el-col
          :span="10"
          :offset="9"
      >
        <el-button
            class="blueBtn"
            @click="success"
        >
          完成
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
          :url="'cms/activityInfo/exportUserTemplate'"
          mess-title="确定要下载模板吗？"
          @cancel="exportModal = false"
      />
      <div slot="footer" />
    </Modal>
  </div>
</template>
<script>
// import toChannel from '@/components/common/toChannel_base.vue'
import toChannel from '../../common/toChannel_base-handsontable.vue'
import ajaxDerive from '@/components/common/ajax-derive.vue'
import uploadFile from '@/components/common/uploadFile.vue'
// 当前组件引入全局的util
let Util = null
export default {
  components: {
    toChannel,
    ajaxDerive
  },
  // props接收父组件传递过来的数据
  props: ['operailityData', 'deptId', 'rowObj', 'setTableData', 'uploadFile'],
  data () {
    return {
      active: 0,
      // 保存按钮基本信息
      uploadFiles: [],
      uploadUrl: '',
      handsontableOptions: {
        columns: ''
      },
      exportModal: false,
      exportId: {id: 'exportId', title: '下载模板'},
      convertedData: {
      },
      // 记录总条数
      totalNumber: 0,
      toChannelModal: false,
      // form表单bind数据
      formValidate: {
        file: ''
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
    this.uploadUrl = '/cms/activityInfo/importUser?activityId=' + this.rowObj.id
    this.init()
    console.log(this.rowObj)
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
       * 当前组件发送事件给父组件
       * 发送关闭(cancel)模态事件给父组件,请求关闭当前模态窗
       * */
    success () {
      this.$emit('successImport', 'toChannel')
    },
    cancel () {
      this.$emit('cancel', 'toChannel')
    },
    load () {
      this.active = 0
    },

    closeChannel () {
      this.toChannelModal = false
    },
    // 点击上传获取文件回调函数
    handleSelectedFile (convertedData) {
      if (convertedData.body === 0) {
        this.errorMess('导入数据为空，请重新选择数据')
        return
      }
      this.handsontableOptions.columns = this.handsontableValidate(convertedData.header)
      this.convertedData = convertedData
      console.log(this.convertedData, 'this.convertedData')
      this.toChannelModal = true
    },

    /** handsontable验证规则  根据列表头部自动生成验证规则
     * @params  data {Array}  头部
     * @return  {null|Array}  头部
     * */
    handsontableValidate (header) {
      let arr = []
      let index = header.indexOf('性别')
      arr[index] = {
        type: 'autocomplete', // 从里面选择
        source: ['男', '女'], // 数据源
        strict: true // 是否是严格模式，严格模式就只允许从数据源里面选择
      }
      index = header.indexOf('部门节点1')
      arr[index] = {data: index + '', validator: this._require, allowInvalid: true}
      return arr

    },

    // 导入成功回调函数
    subHandelEvent (data) {
      this.closeChannel()
      this.totalNumber += data.length
    }

  }

}
</script>

