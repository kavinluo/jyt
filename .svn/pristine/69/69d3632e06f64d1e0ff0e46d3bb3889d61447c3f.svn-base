<template>
  <div id="contentSettingContent"  ref="contentSettingContent">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane v-for="(item,index) in levelList"   :key="item.name" :label="item.lable" :name="item.name" >
        <settingLeaveShow v-if="isRouterAlive" @cancelAdd="cancel" :businessType="businessType" :businessId="businessId" :level="index+1" ref="settingLeave"></settingLeaveShow>
      </el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
/* eslint-disable */
import settingLeaveShow from './settingLeaveShow.vue'
let Util = null
export default {
  components: {settingLeaveShow},
  name: 'contentSettingLeave',
  data () {
    return {
      isRouterAlive:false,
      businessType: null,
      businessId: null,
      activeName: 'tab1',
      level:0,
      levelList:[],
    }
  },
  computed: {
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => (this.isRouterAlive = true))
    },
    numberfilter(num) {
      const changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
      const unit = ['', '十', '百']
      num = parseInt(num)
      const getWan = (temp) => {
        const strArr = temp.toString().split('').reverse()
        let newNum = ''
        for (let i = 0; i < strArr.length; i++) {
          newNum = (i == 0 && strArr[i] == 0 ? '' : (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? '' : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i]))) + newNum
        }
        return newNum
      }
      const overWan = Math.floor(num / 100)
      let noWan = num % 100
      if (noWan.toString().length < 2) noWan = '0' + noWan
      return overWan ? getWan(overWan) + '百' + getWan(noWan) : getWan(num)
    },
    handleClick (tab, event) {
      //alert(tab.businessType);
    },
    init(businessId,businessType,level) {
      this.reload ();
      this.businessType=businessType
      this.businessId=businessId
      this.levelList=[];
      this.level=level;
      for(let i=0;i<level;i++){
        const tabObj=new Object();
        const lable="第"+this.getTitle(i+1)+"级";
        tabObj.lable=lable;
        tabObj.name="tab"+(i+1);
        this.levelList.push(tabObj);
      }
      this.activeName="tab1";
      this.$forceUpdate();
    },
    getTitle:function (num) {
      const k=this.numberfilter(num);
      return k;
    },
    //通知父组件关闭本组件
    cancel(){
      this.$emit('cancelAdd', false);
    }
  }
}
</script>

<style scoped>

</style>
