import Vue from 'vue'
import VueRouter from 'vue-router'
import { shujushouye,menu,huodong,xingyundazhuanpan,luckyDraw,aboutus,appversionmanage,yindaotu,banner } from './modules/jinyitu'
import {
  templateBank,
  keyWords,
  chineseMedicine,
  prescription,
  KnowledgeContentNote,
  KnowledgeContentComment,
  KnowledgeContentReport,
  KnowledgeConfigVip,
  KnowledgeContentRecord,
  KnowledgeConfigHome,
  KnowledgeContentError,KnowledgeAppconfig,book,acupoint,dictionaries,celebrity} from './modules/knowledge'
import {
  jichutiku,
  jigoutiku,
  tikulianxi,
  xitongtixing,
  zhenglitiku
} from './modules/tiku'
import {
  shijuanguanli,
  kaoshishezhi,
  shijuanlianxi,
  shougongyuejuan,
  jiankao,
  paikaoshezhi,
  kaochangguanli,
  signin,
  signincode,
  kaoshijiankong
} from './modules/kaoshi'
import {
  user,
  yonghuguanli,
  jigouyonghu,
  jueseguanli
} from './modules/yonghu'
import {
  jigouguanli,
  dept,
  role,
  post,
  notice,
  log,
  dict,
  course,
  courseDetails
} from './modules/guanli'
import {
  springBootAdmin,
  job,
  config,
  druid,
  redis,
  loginLog,
  skywalking
} from './modules/sheshi.js'
import {
  // banner,
  zixun
} from './modules/appshouye.js'
import {
  companyProfile,
  aboutWe,
  service,
  goldenMedical,
  userProtocol
} from './modules/daohang.js'
import {
  yonghufabu,
  zixunfabu,
  zixuntongji,
  zixunshenhe,
  zixunjubao
} from './modules/zixun'

import {
  trainMgt,
  bannerMgt,
  commentMgt,
  trainConfig
} from './modules/train'

import {
  changguizhishiku,
  yingyongguanli,
  zhishikuxitongweihu
} from './modules/zhishiku'
Vue.use(VueRouter)

export const constantRouterMap = [
  {
    name: '404',
    path: '/404',
    component: () => import('_c/login/404'),
    hidden: true
  },
  {
    name: 'webPage',
    path: '/webPage',
    component: () => import('_c/webpage/webPage'),
    hidden: true
  },
  {
    name: 'index',
    path: '/index',
    meta: {requireAuth: true},
    component: () => import('_c/goldenMedical/index'),
    children: [
      companyProfile,
      aboutWe,
      service,
      goldenMedical,
      userProtocol
    ]
  },
  {
    name: 'luckyDraw',
    path: '/luckyDraw',
    meta: {requireAuth: true},
    component: () => import('_c/jinyitu/xingyundazhuanpan/luckyDraw')
  },
  {
    name: 'signincode',
    path: '/signincode',
    meta: {requireAuth: true},
    component: () => import('_c/kaoshi/kaoshijiankong/signincode')
  },
  {
    name: 'signin',
    path: '/signin',
    meta: {requireAuth: true},
    component: () => import('_c/kaoshi/jiankao/signin')
  },
  {
    name: 'Login',
    path: '/login',
    meta: {requireAuth: true},
    component: () => import('_c/login/index2'),
    hidden: true
  },
  // {
  //   name: 'golden',
  //   path: '/goldenMedical/goldenMedical',
  //   meta: {requireAuth: true},
  //   component: () => import('_c/goldenMedical/goldenMedical'),
  //   hidden: true
  // },
  // http://www.jinyitu.cn/#/goldenMedical/goldenMedical
  {
    name: 'LoginSelf',
    path: '/loginSelf',
    component: () => import('_c/login/index2'),
    hidden: true
  },
  {path: '*',redirect: '/index/goldenMedical'},
  {
    name: 'Manage',
    path: '/manage',
    meta: { title: '一级路由'},
    component: () => import('../components/Index'),
    children: [
      shujushouye,
      jichutiku,
      jigoutiku,
      tikulianxi,
      xitongtixing,
      zhenglitiku,
      shijuanguanli,
      kaoshishezhi,
      shijuanlianxi,
      shougongyuejuan,
      user,
      jigouguanli,
      dept,
      role,
      post,
      notice,
      menu,
      loginLog,
      log,
      dict,
      springBootAdmin,
      job,
      config,
      druid,
      redis,
      banner,
      huodong,
      zixun,
      skywalking,
      yonghuguanli,
      appversionmanage,
      xingyundazhuanpan,
      templateBank,keyWords,
      chineseMedicine,
      prescription,
      KnowledgeContentNote,
      KnowledgeContentComment,
      KnowledgeContentReport,
      KnowledgeConfigVip,
      KnowledgeContentRecord,
      KnowledgeContentError,
      KnowledgeAppconfig,
      KnowledgeConfigHome,
      book,
      acupoint,
      dictionaries,
      celebrity,
      luckyDraw,
      jiankao,
      paikaoshezhi,
      kaochangguanli,
      signin,
      signincode,
      yonghufabu,
      zixunfabu,
      zixuntongji,
      changguizhishiku,
      yingyongguanli,
      zhishikuxitongweihu,
      jigouyonghu,
      jueseguanli,
      kaoshijiankong,
      yindaotu,
      aboutus,
      zixunshenhe,
      zixunjubao,
      course,
      courseDetails,
      trainMgt,
      bannerMgt,
      commentMgt,
      trainConfig
    ]
  },
  {
    name: 'Manage',
    path: '/manage/log',
    meta: { title: '一级路由'},
    component: () => import('../components/Index'),
    children: [
      log
    ]
  }
]
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location,onResolve,onReject) {
  if (onResolve || onReject) { return originalPush.call(this,location,onResolve,onReject) }
  return originalPush.call(this,location).catch((err) => err)
}
const createRouter = () => new VueRouter({
  routes: constantRouterMap
})
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
const router = createRouter()

export default router
