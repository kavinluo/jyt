import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import loadingFun from './modules/loadingFun'
import loginFun from './modules/login'
import makePaper from './modules/makeTestPaper' // 组卷相关
import huodong from './modules/huodong' // 活动管理相关
import getters from './getters'
import tagsView from './modules/tags-view'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    tagsView,
    loadingFun,
    loginFun,
    makePaper,
    huodong
  },
  getters
})
