<!----------------------------------
****--@name     手工组卷 统计页面
****--@role     ${*}
****--@date     2022/12/27
****--@author   yyl
----------------------------------->
<template>
  <div class="statisticsPage">
    <div class="title">设置分数</div>

    <table class="tmInfo">
      <thead>
      <tr>
        <th>题型</th>
        <th v-for="item in paperTxorder" :key="item">{{item}}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(Item, Index) in paperInformation" :key="Item.treeId">
        <td>第{{Index + 1}}份试卷-数量统计</td>
        <td v-for="(item, key) in Item.tacTmtypeObj" :key="key">{{item.length}}</td>
      </tr>
      <tr>
        <td>题型分数（双击可修改）</td>
        <td v-for="(val, key) in questionTypeScore" :key="key" @dblclick="showInput(val)">
          <span v-if="val.showType">{{val.score}}</span>
          <span v-else><el-input v-model.number="val.score" size="small" @blur="typeScoreBlur(val)"></el-input></span>
        </td>
<!--        <td v-for="(val, key) in paperTxorder" :key="key" @dblclick="showInput">
          <span>{{questionScore[val]}}</span>
        </td>-->
      </tr>
      </tbody>
    </table>
    <br>

    <table class="statistics">
      <thead>
      <tr>
        <th>分数定义</th>
        <th>通过分数</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td><el-radio v-model="scoreStatistics.paperRegularmark" :label="1">使用题库中试题的分数，并将总分折算为
          <el-input size="mini" style="width: 100px" v-model.number="scoreStatistics.paperConversion100" :readonly="scoreStatistics.paperRegularmark === '1'" @change="paperConversion100Change"></el-input></el-radio></td>
        <td><el-input size="mini" v-model.number="scoreStatistics.paperPassmarkOne" :readonly="scoreStatistics.paperRegularmark === 0" style="width: 100px"></el-input></td>
      </tr>
      <tr>
        <td><el-radio v-model="scoreStatistics.paperRegularmark" :label="0">忽略试题原分数，按题型指定分数，总分：{{scoreStatistics.paperConversionTwo100}}</el-radio></td>
        <td><el-input size="mini" v-model.number="scoreStatistics.paperPassmarkTwo" :readonly="scoreStatistics.paperRegularmark === 1 || !scoreStatistics.paperConversionTwo100" @change="paperPassmarkTwoChange" style="width: 100px"></el-input></td>
      </tr>
      </tbody>
    </table>
    <div style="text-align: center;margin-top: 20px">
      <el-button class="blueBtn" @click="lastStep">上一步</el-button>
      <el-button class="blueBtn" @click="sureComit">确定</el-button>
    </div>
  </div>
</template>
<script>
/* 当前组件必要引入 */

// 当前组件引入全局的util
export default {
  props: ['editData'],
  data () {
    return {
      styleContent: {},
      paperInformation: [],
      paperTxorder: [],
      questionScore: {},
      scoreStatistics: {
        paperRegularmark: 0, // 是否固定分
        paperConversion100: 100, // 满分
        paperPassmark: 0, // 通过分数
        paperPassmarkOne: 60,
        paperPassmarkTwo: 0,
        paperConversionTwo100: '',
        examPaperTmTypeVOList: [],
        tmInfoList: [],
        editFirst: true // 是否是首次进入到修改页面，首次进入修改页面才回显后台返回的值
      },
      questionTypeScore: [] // 题型分数用  判断题型和是否可以修改题型分数
    }
  },
  methods: {
    // 初始化请求列表数据
    init () {
    },
    // showInput 双击修改分数
    showInput (item) {
      item.showType = !item.showType
    },
    // 题型分数改变后  重新计算题型指定总分
    typeScoreBlur (item) {
      this.questionScore[item.type] = item.score
      item.showType = true
      this.getTmTypeScore()
    },
    // 改变满分  重新计算通过分数
    paperConversion100Change (val) {
      this.scoreStatistics.paperPassmarkOne = (val * 0.6).toFixed(1)
    },
    // 第二行通过分数改变
    paperPassmarkTwoChange (val) {
      if(val > this.scoreStatistics.paperConversionTwo100) {
        this.errorMess('通过分数应小于题型分数')
        this.scoreStatistics.paperPassmarkTwo = (this.scoreStatistics.paperConversionTwo100 * 0.6).toFixed(1)
        return
      }
    },
    // 提交
    sureComit () {
      console.log(this.scoreStatistics.paperRegularmark === 0)
      if(this.scoreStatistics.paperRegularmark === 1) {
        this.scoreStatistics.paperPassmark = this.scoreStatistics.paperPassmarkOne
      }else if(this.scoreStatistics.paperRegularmark === 0) {
        this.scoreStatistics.paperPassmark = this.scoreStatistics.paperPassmarkTwo
        this.scoreStatistics.paperConversion100 = this.scoreStatistics.paperConversionTwo100
        let scoreObj = {}
        for(let i = 0; i < this.questionTypeScore.length; i++) {
          scoreObj[this.questionTypeScore[i].type] = this.questionTypeScore[i].score
        }
        let tempArr = []
        for(let i = 0; i < this.styleContent.paperTmTypeInfo.length; i++) {
          let item = this.styleContent.paperTmTypeInfo[i]
          tempArr.push({
            tmTypeId: item.id,
            tmTypeName: item.name,
            tmTypeOrder: i,
            tmTypeScore: scoreObj[item.name]
          })
        }
        this.scoreStatistics.examPaperTmTypeVOList = tempArr
      }
      let submitData = {}
      for(let k in this.styleContent) {
        submitData[k] = this.styleContent[k]
      }
      for(let k in this.scoreStatistics) {
        submitData[k] = this.scoreStatistics[k]
      }
      submitData.paperGruopType = 2
      this.ajax({
        ajaxSuccess: (res) => {
          this.$emit('success')
          console.log(res)
        },
        ajaxParams: {
          url: '/paper/examPaperInfo/saveDistillPaper',
          method: 'post',
          data: submitData,
          jsonString: true
        }
      })
    },
    lastStep () {
      this.$emit('setSteps', 'content', true)
    },
    getTmTypeScore () {
      this.paperInformation.forEach((Item, Index) => {
        Item.score = 0
        for(let k in Item.tacTmtypeObj) {
          let score = 0
          for(let i = 0; i < this.questionTypeScore.length; i++) {
            if(k === this.questionTypeScore[i].type) {
              score = this.questionTypeScore[i].score
            }
          }
          Item.tempScore[k] = Item.tacTmtypeObj[k].length * score
        }
        for(let k in Item.tempScore) {
          Item.score += Item.tempScore[k]
        }
      })
      this.scoreStatistics.paperConversionTwo100 = this.paperInformation[0].score
      this.scoreStatistics.paperPassmarkTwo = (this.scoreStatistics.paperConversionTwo100 * 0.6).toFixed(1)
    }
  },
  created () {
    // 样式设置数据   提交数据用
    if(Object.keys(this.$store.getters.getStyleContent).length) {
      this.styleContent = this.$store.getters.getStyleContent
    }
    this.paperTxorder = this.styleContent.paperTmTypeList
    if(this.$store.getters.getPaperInformation.length) {
      this.paperInformation = this.$store.getters.getPaperInformation
    }

    console.log(this.questionTypeScore)
    this.paperInformation.forEach((Item, Index) => {
      this.$set(Item, 'score', 0)
      Item.questionInformation.forEach(item => {
        this.scoreStatistics.tmInfoList.push({
          paperNo: Index + 1,
          id: item.id
        })
      })
    })
    // 回显后台返回的值
    if(Object.keys(this.editData).length && this.scoreStatistics.editFirst) {
      if(this.editData.paperRegularmark === 0) { // 选择了忽略原试题分数
        this.scoreStatistics.paperConversionTwo100 = this.editData.paperConversion100 // 总分
        this.scoreStatistics.paperPassmarkTwo = this.editData.paperPassmark // 通过分数
        this.scoreStatistics.paperConversion100 = 100 // 总分
        this.scoreStatistics.paperPassmarkOne = 60 // 通过分数
      }else if(this.editData.paperRegularmark === 1) { // 选择了使用题库中的分数
        this.scoreStatistics.paperConversion100 = this.editData.paperConversion100 // 总分
        this.scoreStatistics.paperPassmarkOne = this.editData.paperPassmark // 通过分数
      }
      this.editData.examPaperTmTypeVOList.forEach(item=>{
        this.questionScore[item.tmTypeName] = 1
        this.questionTypeScore.push({
          type: item.tmTypeName,
          showType: true,
          score: item.tmTypeScore
        })
      })
    }else {
      this.paperTxorder.forEach(item=>{
        this.questionScore[item] = 1
        this.questionTypeScore.push({
          type: item,
          showType: true,
          score: 1
        })
      })
      this.getTmTypeScore()
    }
    console.log(this.paperInformation)
    this.init()
  },
  mounted () {
  },
  components: {}
}
</script>
<style lang="less">
.statisticsPage {
  .statistics, .tmInfo {
    text-align: center;
    width: 100%;
    border-collapse: collapse;
    thead {
      line-height: 45px;
      tr {
        background-color: #00a3da;
        color: #fff;
        font-weight: 400;
        th {
          padding: 0 5px;
          border: 1px solid #409eff;
          text-align: center;
        }
      }
    }

    tbody {
      tr {
        th, td {
          border: 1px solid #409eff;
          text-align: center;
          line-height: 45px;
        }
        td:nth-child(1) {
          text-align: left;
          padding-left: 180px;
        }
      }
    }
  }
  .tmInfo {
    thead {
      line-height: 30px;
      tr {
        background-color: #fff;
        color: #606266;
      }
    }
    tbody {
      tr {
        th, td {
          line-height: 30px;
        }
        td:nth-child(1) {
          text-align: center;
          padding-left: 3px;
        }
      }
    }
  }
}
</style>
