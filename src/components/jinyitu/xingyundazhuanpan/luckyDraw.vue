<template>
  <div class="box">
    <div
      v-if="showModal"
      class="mask"
    />
    <span class="textH">高分开启“金”医途</span>
    <div class="select">
      <el-select
        v-model="winning"
        :popper-append-to-body="false"
        @change="changeSelect"
      >
        <el-option
          v-for="item in drawList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>

    <div class="list">
      <div class="listText">
        <span class="textH1">抽奖名单</span>
        <p
          v-for="(item) in tableList"
          :key="item.id"
          style="color:rgb(255,255,255)"
        >
          <el-divider />
          <span class="reward">{{ item.winning === 1 ? '一等奖': item.winning === 2 ? '二等奖' : item.winning === 3 ? '三等奖' : '未中奖' }}</span>
          <span class="nickName">{{ item.useUserNikName }}</span>
          <span class="phone">{{ item.userMobile }}</span>
        </p>
      </div>
    </div>
    <div class="turntable">
      <div class="ulList">
        <vue-seamless-scroll
          v-if="listShow === false"
          ref="scroll"
          :data="tableData"
          class="seamless-warp"
          style="width: 100%"
          :class-option="classOption"
        >
          <ul>
            <li
              v-for="(item, index) in tableData"
              :key="index"
              style="width:100%"
            >
              <el-avatar
                :size="40"
                :src="item.avatar"
              />
              <span style="font-size:30px;color:rgb(247, 147, 30);margin-left:10px;">{{ item.useUserNikName }}</span>
              <span class="mobile">{{ item.userMobile }}</span>
            </li>
          </ul>
        </vue-seamless-scroll>
        <p v-if="listShow === true">
          <el-avatar
            :size="40"
            :src="operailityData.avatar"
          />
          <span style="font-size:30px;color:rgb(247, 147, 30);margin-left:10px;">{{ operailityData.useUserNikName }}</span>
          <span class="mobile">{{ operailityData.userMobile }}</span>
        </p>
      </div>
      <el-button
        v-if="showStart === false"
        :disabled="disabled"
        :round="true"
        class="yellow"
        type="warning"
        style="width:190px;height:80px; position:absolute;top: 75%;left:36%;"
        @click="start"
      >
        <span style="font-size:30px;color:rgb(255,255,255)">开始</span>
      </el-button>
      <el-button
        v-if="showStart === true"
        :loading="loading"
        :round="true"
        class="yellow"
        style="width:190px;height:80px; position:absolute;top: 75%;left:36%;"
        @click="stop"
      >
        <span style="font-size:30px;color:rgb(255,255,255)">停止</span>
      </el-button>
    </div>
    <!-- 获奖用户 -->
    <honoree
      v-if="open"
      style="z-index:999"
      :operaility-data="operailityData"
      :setTableData="setTableData"
      :winning="winning"
      @close="close"
    />
  </div>
</template>
<script>
let Util = null
import vueSeamlessScroll from 'vue-seamless-scroll'
import honoree from './honoree.vue'
import api from './api.js'
export default {
  components: {
    vueSeamlessScroll,
    honoree
  },
  data () {
    return {
      api,
      open: false,
      winning: 1,
      showModal: false,
      showId: {id: 'showId', title: ''},
      showStart: false,
      loading: false,
      listShow: false,
      disabled: false,
      winner: '',
      tableData: [],
      tableList: [],
      drawList: [
        {
          value: 1,
          label: '一等奖'
        },
        {
          value: 2,
          label: '二等奖'
        },
        {
          value: 3,
          label: '三等奖'
        },
        {
          value: 4,
          label: '四等奖'
        },
        {
          value: 5,
          label: '五等奖'
        },
        {
          value: 6,
          label: '六等奖'
        }
      ],
      operailityData: {},
      // 初始化加载页面信息
      listMessTitle: {
        ajaxSuccess: 'updateListData',
        ajaxParams: {
          url: api.listPage.path,
          method: api.listPage.method,
          params: {}
        }
      }
    }
  },
  computed: {
    classOption () {
      return {
        step: 15, // 数值越大速度滚动越快
        limitMoveNum: this.tableData.length, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: false, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      }
    }
  },
  mounted () {
    this.$refs.scroll._stopMove()
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      Util = this.$util
      this.myPages = Util.pageInitPrams
      this.queryQptions = {
        params: {
          pageNo: 1,
          pageSize: Util.pageInitPrams.pageSize,
          displayLotteryUser: true,
          joinDay: this.filterTime(Date.now())
        }
      }
      this.setTableData()
      let opt = {
        ajaxSuccess: (res) => {
          this.tableData = res.data.list
        },
        ajaxParams: {
          url: api.listPage.path,
          method: api.listPage.method,
          jsonString: true,
          params: {
            pageNo: 1,
            pageSize: Util.pageInitPrams.pageSize,
            winning: 0,
            joinDay: this.filterTime(Date.now())
          }
        }
      }
      this.ajax(opt)
    },
    close () {
      this.open = false
      this.showModal = false
    },
    // 时间格式转换
    filterTime (time) {
      const date = new Date(time)
      const Y = date.getFullYear()
      const M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      const D = date.getDate() + 1 < 10 ? '0' + (date.getDate()) : date.getDate()
      return `${Y}-${M}-${D}`
    },
    // 初始化加载列表数据
    setTableData () {
      this.listMessTitle.ajaxParams.params = Object.assign(
        this.listMessTitle.ajaxParams.params,
        this.queryQptions.params
      )
      this.ajax(this.listMessTitle)
    },
    // 表格数据列表
    updateListData (res) {
      let data = res.data
      let that = this
      that.tableList = that.addIndex(data.list)
      this.listTotal = data.total || 0
    },
    start () {
      this.showStart = true
      // this.loading = true
      this.listShow = false
      // if (this.listShow === false) {
      try {
        this.$refs.scroll._startMove()
      } catch (error) {
        console.log(error)
      }
      // }
      let opt = {
        ajaxSuccess: (res) => {
          if (res.code === 0) {
            this.loading = false
            this.operailityData = res.data
          }
        },
        ajaxParams: {
          url: api.modifyLottery.path,
          method: 'put',
          jsonString: true,
          data: {
            winning: this.winning,
            joinDay: this.filterTime(Date.now())
          }
        }
      }
      this.ajax(opt)
    },
    stop () {
      this.showStart = false
      this.disabled = true
      this.listShow = true
      this.$refs.scroll._stopMove()
      setTimeout(()=> {
        this.open = true
        this.disabled = false
        this.showModal = true
        this.setTableData()
      }, 1000)
    },
    changeSelect (val) {
      this.winning = val
    }
  }
}
</script>
<style scoped>
.box {
  background-image: url('@/assets/images/bjt.jpg');
  background-repeat:no-repeat;
  background-size:100% 100%;
  height:100%;
  position: relative;
}
.list {
  background-image: url('@/assets/images/zjlb.png');
  width:620px;
  height:500px;
  float: left;
  position:absolute;
  top: 18%;
}
.turntable {
  background-image: url('@/assets/images/dzp.png');
  width:800px;
  height:700px;
  position:absolute;
  top: 10%;
  left:45%;
}
.textH {
  font-size:48px;
  color:rgb(255,255,255);
  position:absolute;
  top: 4%;
  left:51%;
}
.listText {
  width:400px;
  height:380px;
  position: relative;
  position:absolute;
  top: 14%;
  left:24%;
}
.textH1 {
  font-size:30px;
  margin: 5% 0 0 32%;
  text-align: center;
  color:rgb(255, 255, 255)
}
.el-divider--horizontal {
    display: block;
    height: 1px;
    width: 100%;
    margin: 14px 0;
}
.reward {
  font-size:25px;
}
.nickName{
  font-size: 20px;
  margin-left:10px;

}
.phone {
  font-size:20px;
  position:absolute;
  right:0%;
}
.seamless-warp {
  height: 200px;
}
.ulList {
  width:660px;
  height:60px;
  overflow: hidden;
  position: relative;
  position:absolute;
  top: 52%;
  left:21%;
}
.mobile {
  font-size:30px;
  color:rgb(247, 147, 30);
  margin-top:8px;
  position:absolute;
  left:35%;
}
ul li {
  margin: 10px 0;
}
.select {
  position:absolute;
  top: 13%;
  right:5%;
}
  ::v-deep .el-select,
  ::v-deep .el-input,
  ::v-deep .el-input__inner{
    width:250px;
    height:60px;
    background-color:rgb(255, 244, 214) ;
    border:0px;
    border-radius:0px;
    text-align: center;
    font-size:25px;
  }
  ::v-deep .el-select .el-input.is-focus .el-input__inner{
    border:0px;
  }
  ::v-deep .el-select .el-input .el-select__caret{
    color:rgb(0, 0, 0);
    margin-top: 25px;
  }
  ::v-deep .el-select-dropdown{
    background-color: rgb(255, 244, 214);
    margin: 0px;
    border:0px;
    border-radius: 0px;
  }
  ::v-deep .el-select-dropdown__item{
    background-color: transparent;
    font-size:25px;
  }
  ::v-deep .el-select-dropdown__item.hover,
 ::v-deep .el-select-dropdown__item:hover{
    color:#409eff;
  }
  ::v-deep .el-popper .popper__arrow, .el-popper .popper__arrow::after{
    display: none;
  }
 ::v-deep .el-button.is-round {
    border-radius: 40px;
    padding: 12px 23px;
}
.mask {
 background-color: rgb(0, 0, 0);
 opacity: 0.3;
 position: fixed;
 top: 0;
 left: 0;
 width: 100%;
 height: 100%;
 z-index: 1
}
</style>
