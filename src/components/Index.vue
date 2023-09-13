<template>
  <div style="min-width: 1280px;height: 100%">
    <div
      class="viewFramework-topbar">
      <div class="ambuf-console-topbar">
        <Headers @setPath="setPath" @setZindex="setZindex" @newmeau="newmeau"/>
      </div>
    </div>
    <div
      class="viewFramework-body"
      :class="{'viewFramework-sidebar-full':isViewSubNav,'viewFramework-sidebar-mini':!isViewSubNav,}"
      :style="{'top': isFullScreen ? '0px' : wizardMode ? '170px' : '50px'}"
    >
      <!-- 如果是向导模式  top:100px -->
      <div
        v-if="!isFullScreen && Nav.length >0"
        class="viewFramework-sidebar"
        :style="{'top': wizardMode ? '170px' : '50px'}"
      >
        <div class="sidebar-content">
          <div class="sidebar-inner">
            <div
              v-if="!gotoRouter"
              style="text-align: center;margin-top: 100px;"
            >
              数据请求{{
                typeof userInfo.name == 'undefined' ? '失败' : '中……' }}!
            </div>
            <span @click="handleViewSubNav" style="font-size: 25px;" :class="{'iconLeft': isViewSubNav}">
              <i class="el-icon-caret-left"></i>
              <i class="el-icon-caret-right"></i>
            </span>
            <Left
              v-if="Nav.length > 0"
              :get-path-name="getPathName"
              :left-nav-data="Nav"
              :sub-index="subIndex"
              :wizard-mode="wizardMode"
              :data-structure="dataStructures"
              @setPath="setPath"
              @setPathName="setPathName"
            />
          </div>
        </div>
      </div>

      <div
        class="viewFramework-main"
        :class="{'IndexLeftMargin':!isFullScreen && Nav.length >0,'IndexLeftMarginZero' : isFullScreen || Nav.length < 0 }"
      >
        <el-tabs
          v-show="secondData.length > 1 && !router && !isFullScreen"
          v-model="activeRouter"
          type="border-card"
          class="secondRouter"
          @tab-click="handleClick"
        >
          <el-tab-pane
            v-for="item in secondData"
            :key="item.id"
            :name="item.name"
          >
            <span slot="label">
              <span
                class="nav-title ng-binding"
                @click="toNewPage(item)"
                v-text="item.name"
              />
            </span>
          </el-tab-pane>
        </el-tabs>
        <div style="clear: both" />
        <div
          v-if="!gotoRouter"
          style="text-align: center;margin-top: 100px;"
        >
          数据请求{{
            typeof userInfo.name == 'undefined' ? '失败' : '中……' }}!
        </div>
        <!-- 必须路由存在，不是全屏路由  且当前二级菜单大于一个 才空出头部位置显示 二级路由数据 -->
        <div class="layout-header">
          <span>{{ pathName }}</span>
        </div>
        <div
          id="layout-content"
          class="layout-content"
        >
          <router-view
            v-if="gotoRouter"
            :get-path-name="getPathName"
            :sub-navs="subNavs"
            :sub-index="subIndex"
            :data-structure="dataStructures"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import headers from './common/header'
import leftmenus from './common/leftmenus'
/*
 * 给数据层级设置索引 [{parIdx:0,index:0},……]
 * @param data []  无限极树结构
 */
const structureIndex = {}
// eslint-disable-next-line no-unused-vars
let Util = null
// eslint-disable-next-line no-unused-vars
function setStructureIndex (data, pobj) {
  if (data.length === 0) {
    return
  }
  let deepChildren = {'pid': [], 'len': []}
  let tempArr = []
  let count = 0
  let count1 = 0
  // eslint-disable-next-line no-unused-vars
  for (var i = 0, parIdx, index; i < data.length; i++) {
    if (typeof pobj !== 'undefined') {
      let len = pobj.len[count]
      parIdx = (len + count1) - 1 <= i ? (count1 += len) && count++ : count
    } else {
      parIdx = null
    }
    data[i].index = i
    data[i].expand = false
    structureIndex[data[i].code] = {'index': i, parIdx: parIdx}
    if (typeof data[i].children !== 'undefined') {
      deepChildren.pid.push(i)
      deepChildren.len.push(data[i].children.length)
      tempArr = tempArr.concat(data[i].children)
    }
  }
  setStructureIndex(tempArr, deepChildren)
}

/*
 * 根据code取出二级菜单展示数据 {"code":[{……},{……},……]}
 * @param data []
 * */

export default {
  components: {
    'Headers': headers,
    'Left': leftmenus
  },
  props: ['navs', 'dataStructure'],
  data () {
    return {
      gotoRouter: true,
      routerPath: {},
      homeRouterPath: {},
      Nav: [],
      subNavs: [{}],
      subIndex: '',
      dataStructures: [{}],
      isViewSubNav: true,
      getMenusData: {
        ajaxSuccess: 'setMeusData',
        ajaxParams: {
          // ...lgApi.menuByUser,
        }
      },
      maxIndx: true,
      timer: null,
      pathName: '',
      expandMenuObj: '',
      isFullScreen: '',
      isShowSecond: true, // 页面顶部二级菜单是否显示
      secondData: [], // 如果存在二级菜单，二级菜单数据
      activeRouter: '', // 当前二级路由路径
      wizardMode: '', // 是否是向导模式
      currentStep: 0, // 向导模式下  当前是第几步 默认第一步
      //  向导模式下   4个路由
      wizardRouterData: ['roomManagement', 'examinerManagement', 'examineeManagement', 'examinationManagement'],
      tipModal: false,
      tipId: {id: 'tipId', title: '获取授权'},
      erjimenuselect: 0,
      sanjimeauselect: -1,
      yijiselectdata: ''
    }
  },
  computed: {
    getPathName () {
      // 显示导航
      let route = this.$route
      let matched = route.matched
      let expandMenuObj = this.expandData()
      let pathNameArr = []
      matched.map((item, index) => {
        let MenuObj = expandMenuObj[item.name]
        if (MenuObj) {
          let obj = expandMenuObj[item.name]
          pathNameArr.push(obj.level === 2 ? obj.pathName : obj.name)
        }
      })
      return pathNameArr.join(' > ')
    },
    userInfo () {
      let info = this.$store.getters.getUserInfo || {}
      return info
    },
    router () {
      let route = this.$route
      let matched = route.matched
      let length = matched[matched.length - 1].path.split('/').length
      // console.log(matched[len],100)
      return length >= 4
    }
  },
  created () {
    Util = this.$util
    this.ajax({
      ajaxSuccess: (res) => {
        let afterLogin = false
        let data = res && res.data
        // 将菜单数据存到store
        this.$store.commit('setMenu', data)
        this.setStructureIndex(data)
        this.$store.commit('setStructureIndexs', this.structureIndex)
        this.Nav = this.$store.getters.getMenu[0].children
        console.log(this.Nav, 'this.Nav')
        this.dataStructures = this.$store.getters.getStructureIndex
        this.ajaxCreateLoading(true)
        this.keepLife()
        // 请求回菜单数据后  动态添加路由
        this.addRouter(data, afterLogin)
      },
      ajaxParams: {
        url: '/passport/auth/list-menus',
        method: 'get'
      }
    })
    this.init()
  },
  beforeDestroy () {
    clearInterval(this.timer)

    console.log('取消心跳检查')
  },
  methods: {
    toNewPage (item) {
      this.$router.push({path: item.path})
    },
    init () {
      this.$root.$on('newmeau', responseData => {
      // this.secondlevelflag = false
        // this.isViewSubNav = true
        // this.erjimenuselect = -1
        // this.sanjimeauselect = -1
        this.Nav = responseData.data
      })
    },
    newmeau (res) {
      // this.setMeusData(res)
    },
    getRouterName (n) {
      let len = 0
      let route = this.$route
      let matched = route.matched
      if (n !== 0) {
        len = matched.length - n
      }
      let currentRoute = matched[len].name
      return currentRoute
    },
    // 展开菜单数据
    expandData () {
      let expandMenuObj = this.expandMenuObj
      if (!expandMenuObj) {
        let data = this.Nav
        let list = this.getExpandData(data)
        // 转换为对象
        expandMenuObj = list.reduce((obj, item) => {
          obj[item.code] = item
          return obj
        }, {})
        // 未获取到菜单不赋值
        if (list.length > 1) {
          this.expandMenuObj = expandMenuObj
        }
      }
      return expandMenuObj

    },
    // 处理科室数据结构（三级以下）
    getExpandData (arr, res) {
      let t = res || []
      if (arr && arr.length) {
        arr.map(item => {
          t.push(item)
          if (item.children) {
            return t.concat(this.getExpandData(item.children, t))
          }
        })
      }
      return t
    },

    setPath (res) {
      this.pathName = res
    },
    setPathName (res) {
      this.pathName = res
    },
    /**
     * 点击左侧一级菜单后，传递二级菜单过来
     * flag   二级菜单是否显示
     * data   如有，二级菜单数据
     **/
    handleClick (tab, event) {
      console.log(tab, event)
      console.log(this.activeRouter)
    },
    handleViewSubNav () {
      this.isViewSubNav = !this.isViewSubNav
    },

    /*
    * 设置头部导航的z-index
    * @param flag blooean  是否需要设置index
    * */
    setZindex (flag) {
      this.maxIndx = flag
    },
    // 与服务器保存连接
    keepLife () {
      console.log('开始心跳检查')
      clearInterval(this.timer)
      // this.timer = setInterval(() => { this.getUserInfo()}, 1000 * 60 * 15)
    }
    /*    // 当前时间
    getUserInfo () {
      this.ajax({
        ajaxLoading: false,
        ajaxSuccess: (res) => {
          this.$store.commit('setUserInfo', res.data)
          console.log(res, 8989)
        },
        ajaxParams: {
          url: '/passport/user/profile/get',
          method: 'get'
        }
      })
    }*/
  }
}
</script>
<style lang="less">
.secondRouter {
  border: none !important;
  margin-left: 15px;
  margin-top: 10px;
  -webkit-box-shadow: 0 0 0 #fff !important;
  box-shadow: 0 0 0 #fff !important;

  .el-tabs__header {
    border-bottom: none !important;
    background-color: rgb(242, 242, 242) !important;
    height: 50px !important;

    .is-active {
      height: 51px !important;
      line-height: 51px;
      font-size: 18px !important;
    }

    .el-tabs__item {
      border: none !important;
      font-size: 18px !important;
      height: 51px !important;
      line-height: 51px;
    }
  }

  .el-tabs__content {
    padding: 0 !important;
  }

  .router-link-active {
    color: #39f !important;
  }
}

.wizardMode {
  position: fixed;
  height: 120px;
  width: 100%;
  top: 50px;
  left: 0;
  background-color: #424F5D;

  .sidebar-title {
    float: left;
    width: 100px;
    text-align: center;
    color: #fff;
    font-size: 18px;
    line-height: 40px;
  }

  .navigationSteps {
    float: left;
    width: calc(100% - 340px);
    height: 120px;
    padding: 0 50px 0 20px;

    .steps {
      width: 100%;
      border-bottom: 1px solid #7F7F7F;
      line-height: 50px;

      .currentSelect {
        color: #fff;
        font-size: 20px;
        font-weight: 600;
      }

      span {
        font-size: 16px;
        color: #c4c3c3;
      }
    }

    .stepDescription {
      color: #fff;
      font-size: 18px;
      line-height: 50px;
    }
  }

  .closeWizardBtn {
    position: absolute;
    left: 15px;
    top: 15px;
    width: 97px;
    height: 89px;
    background-color: #fff;
    color: #666;

  }

  .stepsBtn {
    margin-left: 130px !important;
    width: 90px;
    height: 40px;
    padding: 0 !important;
    margin-top: 15px !important;
    background-color: #38A0EF !important;
    border: 1px solid #38A0EF !important;
    color: #fff !important;
  }

  .stepsBtn:hover {
    opacity: .9;
  }
}
.iconLeft {
  margin-left: 50px;
}
</style>
