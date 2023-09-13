import { utils } from '../../libs/util'
const loginFun = {
  state: {
    userInfo: {},
    menu: {},
    structureIndex: {},
    routers: [],
    envPath: '',
    envs: {}
  },
  getters: {
    // getEnvs: state => {
    //   return state.envPath
    // },
    getUserInfo: state => {
      return state.userInfo
    },
    getMenu: state => {
      return state.menu
    },
    getStructureIndex: state => {
      return state.structureIndex
    },
    getRouters: state => {
      return state.routers
    },
    getEnvPath: state => {
      return state.envPath
    },
    getEnvs: state => {
      return state.envs
    }
  },
  mutations: {
    setEnvs (state,envs) {
      state.envs = envs
    },
    setUserInfo (state,userInfo) {
      state.userInfo = userInfo
    },
    // setEnvs (state, envs) {
    //   state.envPath = envs
    // },
    setMenu (state,menu) {
      state.menu = menu
    },
    setStructureIndexs (state,structureIndex) {
      state.structureIndex = structureIndex
    },
    setRouters (state,routers) {
      state.routers = routers
    },
    // 设置系统变量（登录成功后获取）
    setEnvPath (state,$vue) {
      // state.envPath = path
      let options = {
        ajaxSuccess: (res) => {
          state.envPath = res.data
        },
        errorTitle: '获取系统常量失败!',
        ajaxParams: {
          url: '/passport/user/get-import-template'
        }
      }
      $vue.ajax(options)
    }
  },
  actions: {
    storeLogin ({commit,dispatch},$vue) {
      console.log($vue.form,$vue)
      utils.setAjaxQuestHeader('Token','')
      $vue.ajax({
        ajaxSuccess: (res) => {
          const token = res.data.accessToken
          $vue.$cookie.set('Token',token)
          utils.setAjaxQuestHeader('Token',token)
          setTimeout(()=>{
            dispatch('afterLoginAction',$vue)
          })
        },
        ajaxParams: {
          url: '/passport/auth/login',
          method: 'post',
          jsonString: true,
          data: {
            username: $vue.form.username,
            password: $vue.form.password,
            captchaVerification: 'tpXuMWFjvW6YVaqrswIuwmWI5dsVZSg7sGpWtDCUbHuDEX'
          }
        }
      })
    },
    afterLoginAction ({dispatch},$vue) {
      dispatch('setEnvs',$vue) // 获取系统环境变量
      dispatch('setUserInfo',$vue) // 获取用户基本信息
      dispatch('setMenuIndex',$vue)
      // dispatch('requestMenu', true)
    },
    setUserInfo ({commit},$vue) {
      $vue.ajax({
        ajaxSuccess: (res) => {
          commit('setUserInfo',res.data)
        },
        ajaxParams: {
          url: '/passport/user/profile/get',
          method: 'get'
        }
      })
    },
    setEnvs ({commit},$vue) {
      $vue.ajax({
        ajaxSuccess: (res) => {
          console.log(res,'Store.......')
          commit('setEnvs', res.data)
          localStorage.setItem('envs', JSON.stringify(res.data))
        },
        ajaxParams: {
          url: '/passport/envs',
          method: 'get'
        }
      })
    },
    // setenv ({commit}, $vue) {
    //   $vue.ajax({
    //     ajaxSuccess: (res) => {
    //       // let timeStamp = new Date().getTime()
    //       let severTimestamp = res.data
    //       // severTimestamp = (severTimestamp !== null && severTimestamp !== '') ? timeStamp - parseInt(severTimestamp, 10) : null
    //       $vue.$cookie.set('ServerLongTime', severTimestamp, { expires: 1 })
    //       commit('setEnvs', res.data)
    //     },
    //     ajaxParams: {
    //       url: '/envs',
    //       method: 'get'
    //     }
    //   })
    // },
    setMenuIndex ({dispatch},$vue) {
      dispatch('requestMenu',{$vue: $vue,flag: true})
      /* utils.setStructureIndex(topData)
      context.commit('setStructureIndexs', structureIndex)*/
    },
    requestMenu (context,{$vue,flag}) {
      $vue.ajax({
        ajaxSuccess: (res) => {
          let afterLogin = flag
          let data = res && res.data
          console.log(data)
          // 将菜单数据存到store
          context.commit('setMenu',data)
          $vue.setStructureIndex(data)
          console.log($vue.structureIndex)
          context.commit('setStructureIndexs',$vue.structureIndex)
          // 请求回菜单数据后  动态添加路由
          $vue.addRouter(data,afterLogin)
        },
        ajaxParams: {
          url: '/passport/auth/list-menus',
          method: 'get'
        }
      })
    }
    /* loginOut ({commit, dispatch}) {
      loginOut().then((res:any)=>{
        if(!res) {return}
        Cookies.set('Token', '')
        router.push({path: '/login'})
      })
    },
    // 设置账户登录信息(账户\角色信息)
    setUserInfo (context) {
      getUserInfos().then((res: any) => {
        context.commit('setUserInfo', res.data)
      })
    },
    setenv (context) {
      getenvs().then((res: any) => {
        console.log(res)
        if(!res) {return}
        let timeStamp = new Date().getTime()
        let severTimestamp = res.data.timestamp
        severTimestamp = (severTimestamp !== null && severTimestamp != '') ? timeStamp - parseInt(severTimestamp) : null
        Cookies.set('ServerLongTime', severTimestamp, { expires: 1 })
        context.commit('setEnvs', res.data)
      })
    },
    afterLoginAction ({commit, dispatch}, data) {
      // _axios.setAjaxPostToken()
      dispatch('setUserInfo') // 获取用户基本信息
      dispatch('setenv') // 获取系统环境变量
      dispatch('setMenuIndex')
      router.push({path: '/manage/systemAuthorization'})
      // dispatch('requestMenu', true)
    },
    // 获取当前菜单的index值
    setMenuIndex (context) {
      setStructureIndex(topData)
      context.commit('setStructureIndexs', structureIndex)
    },
    requestMenu (context, flag) {
      getMenuData().then((res: any) => {
        if (!res) {return}
        let afterLogin: boolean = flag
        let data = res && res.data && res.data[0] && res.data[0].children
        // 将菜单数据存到store
        context.commit('setMenu', data)
        setStructureIndex(data)
        context.commit('setStructureIndexs', structureIndex)
        // 请求回菜单数据后  动态添加路由
        addrouter(data, afterLogin)
      })
    } */
  }

}

export default loginFun
