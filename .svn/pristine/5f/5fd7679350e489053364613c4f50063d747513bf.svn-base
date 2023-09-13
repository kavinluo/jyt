<template>
  <div>
    <div v-if="title" class="remove">{{ title }}</div>
    <div v-else class="remove">确定要删除吗？</div>
    <el-row>
      <el-col :span="10" :offset="14">
        <load-btn :btn-data="loadBtn" @handleRemove="handleRemove"/>
        <el-button class="but-col cancelBtn" @click="cancel('remove')">取消</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
let Util
export default {
  name: 'Remove',
  props: ['operailityData', 'deleteUrl', 'idKey', 'title', 'treeType'],
  data () {
    return {
      // 保存数据
      addUrl: '/role/add',
      loadBtn: {title: '确定', callParEvent: 'handleRemove'},
      countDate: 0,
      isSecurity: false //   是否需要开启url签名
    }
  },
  created () {
    Util = this.$util
  },
  methods: {
    cancel () {
      this.$emit('cancel', 'remove')
    },
    handleRemove (isLoadingFun) {
      let that = this
      let myUrl = []
      isLoadingFun(true)
      for (let i = 0; i < this.operailityData.length; i++) {
        myUrl.push(this.operailityData[i][this.idKey || 'id'])
      }
      if (this.valDataType(this.operailityData, 'Array')) {
        if (this.operailityData.length > 0) {
          if(this.deleteUrl.substr(this.deleteUrl.length - 1, 1) === '/') {
            myUrl = this.deleteUrl + myUrl.join(',')
          }else if (this.treeType === 'remove') {
            myUrl = this.deleteUrl
          }else {
            myUrl = this.deleteUrl + myUrl.join(',')
          }

        } else {
          myUrl = this.deleteUrl
        }
      } else {
        myUrl = this.deleteUrl
      }
      // 处理服务数据
      if (this.treeType === 'remove') {
        let myPromise = Util.queryData({
          url: myUrl,
          method: 'delete',
          params: {
            id: this.operailityData[0].id
          }
        })()
        myPromise.then(function (res) {
          if(that.isSecurity) {
            const key = 'b86f561d86e0fad896e0028c1b7d64eb' // sm4加密key
            const sm4 = require('sm-crypto').sm4
            res.data = JSON.parse(sm4.decrypt(res.data.data, key))
            console.log(res.data)
          }
          let responseData = res.data
          if (Util._.isObject(responseData) && responseData.code === 0) {
            that.$emit('remove', 'remove', '删除成功')
          } else {
            isLoadingFun(false)
            let flag = Util.handleAjaxError(that, responseData.code, responseData.msg)
            if (!flag) {
              that.errorMess('删除失败')
            }
          }
        }).catch(function (error) {
          if (error.response) {
            isLoadingFun(false)
            Util.handleAjaxError(that, error.response.status + '')
          } else if (error.request) {
            isLoadingFun(false)
            that.errorMess(error.request)
          } else {
            isLoadingFun(false)
            that.errorMess(error.message)
          }
        })
      }else {
        let myPromise = Util.queryData({
          url: myUrl,
          method: 'delete',
          params: {}
        })()
        myPromise.then(function (res) {
          if(that.isSecurity) {
            const key = 'b86f561d86e0fad896e0028c1b7d64eb' // sm4加密key
            const sm4 = require('sm-crypto').sm4
            res.data = JSON.parse(sm4.decrypt(res.data.data, key))
            console.log(res.data)
          }
          let responseData = res.data
          if (Util._.isObject(responseData) && responseData.code === 0) {
            that.$emit('remove', 'remove', '删除成功')
          } else {
            isLoadingFun(false)
            let flag = Util.handleAjaxError(that, responseData.code, responseData.msg)
            if (!flag) {
              that.errorMess('删除失败')
            }
          }
        }).catch(function (error) {
          if (error.response) {
            isLoadingFun(false)
            Util.handleAjaxError(that, error.response.status + '')
          } else if (error.request) {
            isLoadingFun(false)
            that.errorMess(error.request)
          } else {
            isLoadingFun(false)
            that.errorMess(error.message)
          }
        })
      }
    }
  }
}
</script>
