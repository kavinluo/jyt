<template>
  <div id="app">
    <Loading v-if="isLoading"></Loading>
    <router-view></router-view>
  </div>
</template>
<script>
import Loading from './components/common/Loading.vue'
import {mapState} from 'vuex'

export default {
  name: 'App',
  data () {
    return {}
  },
  computed: {
    ...mapState([
      'isLoading'
    ])
  },
  created () {
    this.$store.dispatch('setEnvs', this) // 获取系统环境变量
    if (this.$cookie.get('Token') != null) {
      this.$store.dispatch('setUserInfo', this) // 获取用户基本信息
    }
  },
  components: {
    Loading
  }
}
</script>

<style lang="less">
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: #fff;
}

#app {
  height: 100%;
}
.el-table th {
  background-color: #C6E8FA!important;
}
.el-table .cell {
  color: #1f2d3d!important;
}
.blueBtn {
  padding: 8px 18px !important;
  font-size: 14px !important;
  color: #ffffff !important;
  background-color: #169BD5 !important;
  border-radius: 3px !important;
  border: none !important;
}
.redBtn {
  width:87px;
  height:40px;
  font-size: 16px !important;
  color: #ffffff !important;
  background: linear-gradient(113.099212787741deg, rgba(238, 153, 153, 1) -2%, rgba(210, 21, 21, 1) 105%) !important;
  border-radius: 10px !important;
}
.yellow{
  background: linear-gradient(110.661761094803deg, rgba(255, 193, 0, 1) -2%, rgba(232, 100, 4, 1) 105%);
}
.topBtn {
    width: 150px;
    height: 50px;
    margin-left:5%;
    background: inherit;
    background-color: rgb(87, 201, 254);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(2, 167, 240, 1);
    border-radius: 5px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    font-size: 20px;
    color: #F2F2F2;
}
.headerBtn {
    width: 150px;
    height: 50px;
    margin-left:5%;
    background: inherit;
    background-color: rgb(255, 255, 255);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(2, 167, 240, 1);
    border-radius: 5px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    font-size: 20px;
    color: #F2F2F2;
}
.submitBtn {
  padding: 7px 14px!important;
  background-color: #00a0e9!important;
  border-radius: 3px!important;
  font-family: MicrosoftYaHei;
  font-size: 14px!important;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #fff!important;
}
.submitBtn:hover {
  background-color: rgba(0,160,233,0.8)!important;
}
.cancelBtn {
  padding: 7px 14px!important;
  background-color: #ffffff!important;
  border-radius: 3px;
  border: solid 1px #e5e5e5!important;
  font-family: MicrosoftYaHei;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #959595!important;
}
.cancelBtn:hover {
  border: solid 1px #00a0e9!important;
}
.defaultBtnDis {
  opacity: 0.6;
}
::-webkit-scrollbar-track
{
  background: rgba(0,0,0,.1);
  border-radius: 0;
}

::-webkit-scrollbar
{
  -webkit-appearance: none;
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-thumb
{
  cursor: pointer;
  border-radius: 5px;
  background: rgba(0,0,0,.15);
  transition: color .2s ease;
}
</style>
