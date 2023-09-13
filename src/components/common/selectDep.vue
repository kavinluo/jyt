<template>
  <div>
    <div class="cal-schoolTit">筛选科室:
      <el-input style="width: 200px;" v-model="filterDep" placeholder="请输入内容"></el-input>
    </div>
    <div class="sltAllDepWrapper">
      <el-checkbox-group v-model="depSelArr">
        <el-checkbox v-for="item in depSortArr" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
      </el-checkbox-group>
    </div>

    <div style="text-align: center;margin-top: 10px;">
      <el-button @click="listenSubEvent" type="primary">确定</el-button>
    </div>
  </div>
</template>
<style lang="less">
  .sltAllDepWrapper {
    .el-checkbox {
      margin-left: 0;
      margin-right: 10px;
      margin-bottom: 10px;
    }
    .el-checkbox + .el-checkbox {
      margin-left: 0;
    }
  }
</style>
<script>
  /*当前组件必要引入*/
  //当前组件引入全局的util
  let Util = null;
  export default {
    //props接收父组件传递过来的数据
    props: ['operailityData'],
    data() {
      return {
        //保存按钮基本信息
        loadBtn: {title: '确定', callParEvent: 'listenSubEvent'},

        depSelArr: [], // 选择的数据
        depInitArr: [], // 显示数据（未排序）
        depSortArr: [], // 显示数据（已排序）
        depObject: {}, // 科室对象

        //查询科室
        filterDep: "",

        //获取所有的科室
        getDepMessTitle: {
          ajaxSuccess: 'setDepData',
          ajaxParams: {
            url: '/passport/pc/hospital/dept/query/allNameId', // 查询所有科室
          }
        },
      }
    },
    methods: {
      //初始化请求列表数据
      init() {
        Util = this.$util;
        this.depSelArr = this.operailityData;
        this.ajax(this.getDepMessTitle);
      },

      //获取server端所有科室
      setDepData(responseData) {
        let data = responseData.data;
        let temp = {};
        if (this.valDataType(data, "Array")) {
          data.sort((a, b) => a.id > b.id);
          this.depInitArr = data;
          this.depSortArr = Util._.defaultsDeep([], data);
          data.map(item => temp[item.id] = item);
          this.depObject = temp;
        }
      },

      /*
       * 点击提交按钮 监听是否提交数据
       * @param isLoadingFun boolean  form表单验证是否通过
       * */
      listenSubEvent() {
        let data = [];
        this.depSelArr.map(id => data.push(this.depObject[id]));
        this.$emit("setDep", data);
        this.cancel();
      },


      /*
       * 列表数据只能选择一个
       * @param isOnly true  是否只选择一个
       */
      isSelected(isOnly) {
        let len = this.depSelArr.length;
        let flag = true;
        if (len == 0) {
          this.showMess("请选择科室!");
          flag = false;
        }
        if (len > 1 && isOnly) {
          this.showMess("只能选择一个科室!")
          flag = false;
        }
        return flag;
      },


      /*
       * 当前组件发送事件给父组件
       * 发送关闭(cancel)模态事件给父组件,请求关闭当前模态窗
       * */
      cancel() {
        this.$emit('cancel', 'setDep');
      },

    },
    created() {
      this.init();
    },
    mounted() {
      //页面dom稳定后调用

    },
    watch: {
      filterDep(val) {
        if (!val) {
          this.depSortArr = Util._.defaultsDeep([], this.depInitArr);
        } else {
          this.depSortArr.sort(function (a, b) {
            return a.name.indexOf(val) < b.name.indexOf(val) || -1;
          })
        }
      }
    },
    components: {}
  }
</script>
