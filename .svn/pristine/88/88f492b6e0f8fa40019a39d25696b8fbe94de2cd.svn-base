<!----------------------------------
****--@name     样式设置
****--@role     ${*}
****--@date     2022/12/26
****--@author   yyl
----------------------------------->
<template>
  <div class="styleSettings">
    <div class="title">样式设置</div>
    <el-form
        ref="formValidate"
        :model="formValidate"
        :rules="rules"
        class="el-form-item-search"
        label-width="110px"
        onsubmit="return false"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="试卷名称：" prop="name">
            <el-input v-model="formValidate.name" placeholder="请输入试卷名称"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="试卷数量：" prop="paperRanNum">
            <el-select v-model="formValidate.paperRanNum" placeholder="请选择">
              <el-option v-for="item in paperNum" :key="item" :label="item" :value="item"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="题号排序：" prop="paperTmOrder">
            <el-select v-model="formValidate.paperTmOrder" placeholder="请选择">
              <el-option label="题型内排序" :value="1"/>
              <el-option label="整体排序" :value="2"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="考试时长：" prop="paperTime">
            <span><el-input v-model="formValidate.paperTime" style="width: 388px" placeholder="请输入考试时长"/></span> <span> 分钟</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="题目重复时限：" prop="paperOther1">
            <el-select v-model="duplicateNot" placeholder="请选择" style="width: 200px">
              <el-option label="未启用" value="未启用"/>
              <el-option label="启用" value="启用"/>
            </el-select>
            <el-date-picker
                v-if="duplicateNot === '启用'"
                v-model="formValidate.paperOther1"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item label="出题顺序：" prop="tmTypeId">
            <el-transfer
              v-model="formValidate.paperTmTypeList"
              :data="shuttleData"
              :titles="['源列表', '目的地列表']"
              :props="{
                key: 'name',
                label: 'name'
              }"
              target-order="push"
              :right-default-checked="rightChecked"
              @right-check-change="targetCheck"
            ></el-transfer>
          </el-form-item>
        </el-col>
        <el-col :span="6" style="height: 290px">
          <div style="height: 90px;margin-top: 100px">
            <i @click="moveOrder('last')" class="el-icon-top" style="font-size: 44px;font-weight: 700;color: rgba(64, 158, 255, 1);cursor: pointer"></i>
            <br>
            <i @click="moveOrder('next')" class="el-icon-bottom" style="font-size: 44px;font-weight: 700;color: rgba(64, 158, 255, 1);cursor: pointer"></i></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="试卷说明：" prop="tmTypeId">
            <el-input v-model="formValidate.paperMore"/>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="创建人：" prop="categoryCode">
            <span>{{ userInfo.username }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间：" prop="categoryCode">
            <span>{{ getNowFormatDate() }}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div style="text-align: center;margin-top: 20px">
      <el-button class="blueBtn" @click="nextStep">下一步</el-button>
    </div>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import {intelligentPaper as rules} from '../rules'
// 当前组件引入全局的util
export default {
  props: ['currentTreeData', 'paperTxorder', 'editData'],
  data () {
    return {
      rules,
      formValidate: {
        name: '',
        paperMore: '',
        paperOther1: '',
        paperGruopType: 1, // 组卷方式
        paperTxorder: '', // 选择的题型
        paperRanNum: 1,
        paperTmOrder: 1,
        treeId: '',
        paperTime: 120, // 考试时长
        paperRegular: 1,
        paperTmTypeList: [], // 选择的题型,
        paperTmTypeInfo: [], // 选择的题型的详细信息
        editFirst: true // 是否是首次进入到修改页面，首次进入修改页面才回显后台返回的值
      },
      paperNum: [1, 2, 3, 4, 5, 10, 15, 20],
      shuttleData: [],
      shuttleDataIds: [],
      duplicateNot: '未启用',
      targetCheckData: [], // 穿梭框右侧被选中的数据
      rightChecked: []

    }
  },
  methods: {
    // 初始化请求列表数据
    init () {
      this.formValidate.treeId = this.currentTreeData.id
      if(!this.formValidate.paperMore) {
        this.formValidate.paperMore = this.getNowFormatDate() + ' ' + this.userInfo.username + ' 定义'
      }
      if(this.paperTxorder && this.paperTxorder.length) {
        this.formValidate.paperTmTypeList = this.paperTxorder
        this.formValidate.paperTmOrder = this.paperTxorder.join(',')
      }
      if(Object.keys(this.$store.getters.getStyleContent).length) {
        this.formValidate = this.$store.getters.getStyleContent
      }
      if(this.editData && Object.keys(this.editData).length && this.formValidate.editFirst) {
        for(let k in this.editData) {
          this.formValidate[k] = this.editData[k]
          this.formValidate.paperTmTypeList = this.editData.paperTxorder.split(',') // 回显选择的题型
        }
        this.formValidate.editFirst = false
      }
      this.getExamTmType()
    },
    // 获取所有题型
    getExamTmType () {
      this.ajax({
        ajaxSuccess: (res) => {
          console.log(res)
          this.shuttleData = res.data
          res.data.map( item => {
            this.shuttleDataIds.push(item.id)
          })

        },
        ajaxParams: {
          url: '/tkmanage/examTmType/allList',
          method: 'get'
        }
      })
    },
    // 穿梭框右侧数据被选中取消的时候
    targetCheck (val) {
      this.targetCheckData = val
    },
    // 移动选中题型的位置
    moveOrder (type) {
      if(this.targetCheckData.length !== 1) {
        this.errorMess('请选择一个题型进行移动')
        return
      }
      let indexOf = (this.formValidate.paperTmTypeList || []).findIndex((item) => item === this.targetCheckData[0]) // 找到当前勾选元素的下标
      if(type === 'last') {
        this.formValidate.paperTmTypeList = this.changeLast(this.formValidate.paperTmTypeList, indexOf)
      }else if(type === 'next') {
        this.formValidate.paperTmTypeList = this.changeNext(this.formValidate.paperTmTypeList, indexOf)
      }
      this.rightChecked = [] // 右侧默认勾选的值
      this.$forceUpdate()
    },
    // 向前移动一位
    changeLast (arr, index) {
      let temp
      if(index === 0 || index > arr.length - 1) {
        return arr
      }
      temp = arr[index]
      arr[index] = arr[index - 1]
      arr[index - 1] = temp
      return arr
    },
    // 向后移动一位
    changeNext (arr, index) {
      let temp
      if(index >= arr.length - 1) {
        return arr
      }
      temp = arr[index]
      arr[index] = arr[index + 1]
      arr[index + 1] = temp
      return arr
    },
    nextStep () {
      this.formValidate.paperTime = Number(this.formValidate.paperTime)
      let isSubmit = this.submitForm('formValidate')
      if (!isSubmit) {return}
      if(this.duplicateNot === '启用' && !this.formValidate.paperOther1) {
        this.errorMess('请选择题目重复时限')
        return
      }
      if(!this.formValidate.paperTmTypeList.length) {
        this.errorMess('请选择出题顺序')
        return
      }
      this.formValidate.paperTmTypeInfo = []
      this.formValidate.paperTmTypeList.forEach(item => {
        this.shuttleData.map(Item => {
          if(item === Item.name) {
            this.formValidate.paperTmTypeInfo.push(Item)
          }
        })
      })
      this.formValidate.paperTxorder = this.formValidate.paperTmTypeList.join(',')
      this.$store.commit('setStyleContent', this.formValidate)
      this.$emit('setStep', 'content', this.formValidate.paperTmTypeList)
    },
    getNowFormatDate () {
      let date = new Date()
      let seperator1 = '-'
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      let hh = date.getHours() // 时
      let mm = date.getMinutes()
      let currentdate = year + seperator1 + month + seperator1 + strDate + '   '
      if(hh < 10) {
        currentdate += '0'
      }

      currentdate += hh + ':'
      if (mm < 10) {currentdate += '0'}
      currentdate += mm
      return currentdate
    },
    submitForm (formName) {
      let flag = false
      this.$refs[formName].validate(valid => {
        if (valid) {
          flag = true
        }
      })
      return flag
    }
  },
  created () {
    this.init()
  },
  mounted () {
  },
  computed: {
    userInfo () {
      let info = this.$store.getters.getUserInfo || {}
      return info
    }
  },
  components: {}
}
</script>
<style lang="less">
  .styleSettings {
    .el-form-item {
      width: 100%;
      .el-select {
        width: 424px;
      }
    }
    .el-transfer__buttons {
      width: 260px;
      text-align: center;
    }
  }
</style>
