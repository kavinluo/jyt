<template>
  <div>
    <div class="add-scope  to-channel">
      <el-table
        v-if="body[0]"
        :data="body"
        border
        :max-height="500"
        :row-class-name="tableRowClassName"
        style="width: 100%"
        @cell-click="cellClick"
      >
        <el-table-column
          type="index"
          label="序号"
          align="center"
          fixed
          width="80"
        />
        <!--<el-table-column-->
        <!--label="操作"-->
        <!--width="180">-->
        <!--<template scope="scope">-->
        <!--<el-button size="small" type="danger" @click="remove(scope.$index,scope.row)">删除</el-button>-->
        <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column
          v-for="(item,index) in header"
          :key="index"
          :prop="item.key"
          :label="item.label"
          align="center"
          :min-width="180"
        >
          <template slot-scope="scope">
            <span v-if="!scope.row[item.key+'edit']">{{ scope.row[item.key] }}</span>
            <el-input
              v-else
              v-model="scope.row[item.key]"
            />
          </template>
        </el-table-column>
      </el-table>
      <br>
      <el-table
        v-if="error[0]"
        :max-height="300"
        :data="error"
        style="width: 100%"
      >
        <el-table-column
          prop="seq"
          label="行数"
          align="center"
          width="200"
        />
        <el-table-column
          prop="errorMessage"
          label="错误提示"
        />
      </el-table>
      <el-row>
        <el-col
          :span="10"
          :offset="10"
        >
          <div style="margin-top: 20px">
            <load-btn
              :btn-data="loadBtn"
              @handleToChannel="confirm"
            />
            <el-button @click="cancel">
              取消
            </el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {

  /* title ：按钮文字
     *
     * format：格式化数据  把中文转换成英文
     *
     * 如 {
     //        "设备名称":"deviceTypeName",
     //        "设备编号":"deviceIdentifier",
     //        "单价":"price",
     //        "购买日期":"purchaseTime",
     //        "厂商电话":"manufacturerPhone",
     //        "维修电话":"servicingPhone",
     //        "所在位置":"storageLocation",
     //        "购买地址":"buyAdderss",
     //        "生产日期":"manufactureDate",
     //        "保修截止日期":"guaranteeDate",
     //        //"状态":"status",
     //        "描述":"describes"
     //      }
     *
     *
     * width :  单元格宽度
     * height :  最小高度
     *
     * ch2en 值中英文替换
     * 如 {
     *    sex:{ // 格式化数据中文对应的英文
     *      "男": "BOY", // 对应的中文会被替换成英文
     *      "女": "GIRL",
     *    }
     * }
     *
     * addData 附加值（该对象在提交的时候会追加在每一行数据之后）注：该对象会覆盖导入的数据
     * 如 {key:val}
     *
     * validate：验证
     * */
  props: ['format', 'height', 'url', 'data', 'extra', 'id', 'date', 'deptId', 'treeRoad', 'ch2en', 'commitBefFun', 'addData', 'validate', 'rowObj'],
  data () {
    return {
      // 保存按钮基本信息
      loadBtn: {
        title: '确定',
        callParEvent: 'handleToChannel'
      },
      //        widths:'',
      body: [],
      header: [],
      formats: [],
      oldErrorList: [], // 保存的是错误的行号
      row: this.rows || 0, // 省略头部行数
      old: {
        oldRow: {}, // 上一次点击的row
        oldKey: '' // 上一次点击的key
      },
      tempArr: [], // 初始的时候临时body
      error: [],
      errorHeader: [{
        label: '行数',
        key: 'seq'
      },
      {
        label: '错误提示',
        key: 'errorMessage'
      }
      ]

      //        //当前组件提交(edit)数据时,ajax处理的 基础信息设置
      //        toMessTitle:{
      //          type:'edit',
      //          successTitle:'导入成功',
      //          errorTitle:'导入失败,请修改',
      //          ajaxSuccess:'ajaxSuccess',
      //          ajaxParams:{
      //            jsonString:true,
      //            url:'/user/import/user',
      //            method:'post',
      //            data:[]
      //          }
      //        },

    }
  },
  created () {
    if (this.format) {
      this.formats = this.format
    }
    if (!this.url) {
      this.showMess('地址不能为空')
      return
    }

    this.header = this.formatHeader(this.data.header)
    this.formatBody(this.data.body)
  },
  methods: {
    /*  确定
       * 点击提交按钮 监听是否提交数据
       * @param isLoadingFun boolean  form表单验证是否通过
       * */
    confirm (isLoadingFun) {

      //        this.$emit('toChannel',this.body);   //发送body
      let that = this
      let data = this.body === 0 ? this.tempArr : this.body
      console.log(this.placeUserList, 'data')
      if (this.validate) { // 存在验证规则
        let errorData = this.validate(data) // 如果返回的有值则有错误信息，没有会返回空；
        if (errorData) {
          that.conductError(errorData)
          return
        }
      }
      //        this.tableModal = false;
      isLoadingFun(true)
      that.ajaxCreateLoading(true)
      data = this.$util._.defaultsDeep([], data)

      // 中英文值转换
      if (this.ch2en && this.ch2en instanceof Object) {
        data.map(item => {
          for (let key in this.ch2en) {
            // 只对有中英文的键值对进行转换
            this.ch2en[key][item[key]] && (item[key] = this.ch2en[key][item[key]])
          }
        })
      }

      // 附加值
      if (this.addData && this.addData instanceof Object) {
        data.map(item => Object.assign(item, this.addData))
      }

      // 父页面的处理将要发送的data
      if (this.commitBefFun) {
        data = this.commitBefFun(data)
      }

      // 处理服务数据
      let myPromise = that.$util.queryData({
        jsonString: true,
        url: (this.url),
        method: 'post',
        data
      })()
      myPromise.then(function (res) {
        let responseData = res.data
        let data = responseData.data
        if (that.$util._.isObject(responseData.status) && responseData.status.code == 0) {
          that.$emit('success', that.body)
          that.successMess('导入成功')
        } else if (that.$util._.isObject(responseData.status) && responseData.status.code == 52) {
          that.conductError(data)
          that.errorMess('导入失败，请修改')
        } else {
          that.errorMess('系统错误')
        }
        isLoadingFun(false)
        that.ajaxCreateLoading(false)
      }).catch(function (response) {
        if (response instanceof Error) {
          // 意外发生在设置要求引发一个错误
          that.errorMess(response.message)
          isLoadingFun(false)
          that.ajaxCreateLoading(false)
        } else {
          that.errorMess(response.status + '错误!')
          isLoadingFun(false)
          that.ajaxCreateLoading(false)
        }
      })
    },

    // 处理错误
    conductError (data) {
      let old = this.old
      if (old.oldRow) {
        // old.oldRow[old.oldKey + 'edit'] = false
      }

      let oldErrorList = this.oldErrorList
      let bodyData = this.body
      //        this.body = [];  //制空
      //        this.error = [];
      let error = []

      if (~oldErrorList[0]) {
        for (let i = 0; i < oldErrorList.length; i++) {
          // bodyData[oldErrorList[i]].error = false
        }
      }

      this.oldErrorList = []

      for (let i = 0; i < data.length; i++) {
        this.oldErrorList.push(data[i].seq) // 添加上错误行号；
        // bodyData[data[i].seq].error = true
        // 添加错误列表
        error.push({
          seq: data[i].seq + 1,
          errorMessage: data[i].errorMsgList.join(' , ')
        })
      }
      //        if(old.oldRow ){
      //          old.oldRow[old.oldKey+'edit'] = true;
      //        }else {
      //          bodyData[0].error = false;
      //          bodyData[0].error = true;
      //        }
      this.body = bodyData
      this.error = error
    },

    // 双击打开输入框并获取焦点
    cellClick (row, col, obj, a) {
      let old = this.old
      if (old.oldRow) {
        // old.oldRow[old.oldKey + 'edit'] = false
      }
      let key = col.property // 当前点击的key值
      row[key + 'edit'] = true
      old.oldRow = row
      old.oldKey = key
    },

    //      //点击上传
    //      handleSelectedFile (convertedData) {
    //
    //        this.tableModal = true;
    //      },

    // 格式化Header 把中文转换成英文
    formatHeader (data) {
      let format = this.formats
      if (!format) {
        this.showMess('format未定义')
        return data
      }
      let formats = []
      let tempArr = []
      for (let i = 0; i < data.length; i++) {
        tempArr.push({
          key: format[data[i]],
          label: data[i]
        })
        formats.push(format[data[i]])
      }
      this.formats = formats
      return tempArr
    },

    // 格式化body 把中文转换成英文
    formatBody (data) {
      let format = this.formats
      let treeId = this.id
      let deptId = this.deptId
      let treeRoad = this.treeRoad
      if (!format) {return data}
      let tempArr = []
      for (let i = 0; i < data.length; i++) {
        let tempObj = {}
        for (let key in format) {
          if (typeof format[key] === 'function') {continue}
          // tempObj[format[key]]  = data[i][key].replace(/(^\s*)|(\s*$)/g, "");
          tempObj[format[key]] = data[i][key]
          // tempObj[format[key] + 'edit'] = false
        }

        if (this.extra) {
          for (let k = 0; k < this.extra.length; k++) {
            tempObj[this.extra[i].key] = this.extra[i].label
          }
        }
        if (this.date) {
          for (let l = 0; l < this.date.length; l++) {
            if (tempObj[this.date[l]]) {
              tempObj[this.date[l]] = tempObj[this.date[l]].replace(/\//g, '-')
            }
          }
        }
        // tempObj.status='';
        if (treeId) {tempObj.treeId = treeId}
        if (deptId) {tempObj.depId = deptId}
        if (treeRoad) {tempObj.treeRoad = treeRoad}
        // tempObj.error = false
        tempArr.push(tempObj)
      }
      this.tempArr = tempArr
      console.log(this.tempArr)
      // this.confirm(function(){})
      // 分段添加数据
      let len = tempArr.length
      let that = this
      that.body = []

      for (let i = 0, n = 0; i < tempArr.length; i += 100, n++) {
        setTimeout(() => {
          that.body = that.body.concat(tempArr.splice(0, 100))
        }, n * 10)
      }

      this.formats = this.format
    },

    // 取消弹窗
    cancel () {
      this.$emit('cancel')
    },

    remove (index, row) {
      this.body.splice(index, 1)
    },

    tableRowClassName (row, index) {
      if (row.error) {
        return 'positive-row'
      }
    }
  }
}

</script>
