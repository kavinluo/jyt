<template>
  <div id="leftwrapperid" ref="leftwrapperid">
    <div class="sidebar-nav" v-for="(item,index) in menusData" :key="index">
      <div v-if="item.children !== null && item.children.length !== 0">
        <div class="sidebar-title" :title="item.name" @click="showAndHide(item)">
          <span class="yijiIcon">
            <i v-if="item.expand" class="el-icon-folder-opened"></i>
            <i v-else class="el-icon-folder"></i>
          </span>
          <span v-if="item.expand" class="sidebar-title-text ng-binding">{{ item.name }}</span>
          <span v-else style="color: rgb(167, 177, 194);font-size:17px;margin-top:10px;">{{ item.name }}</span>
        </div>
        <ul v-if="item.expand && !item.leaf" class="sidebar-trans">
          <li v-for="(subitem,pIdx) in item.children" :key="pIdx"
            class="nav-item" :class="{active:subitem.id == selected}" @click="selectedMenus(subitem.id,pIdx,subitem)">
            <router-link v-if="subitem.children && subitem.children.length " :to="'/manage'+'/'+subitem.path+'/'+subitem.children[0].path">
              <div class="nav-icon sidebar-trans" data-container="body" data-toggle="tooltip"
                data-placement="right" :title="subitem.name">
                <span style="width: 50px" class="icon-zpyq" />
                <span class="nav-title ng-binding" v-text="subitem.name"/>
              </div>
            </router-link>
            <router-link v-else :to="'/manage'+'/'+subitem.path" @click="getSelect(item)">
              <div class="nav-icon sidebar-trans" data-container="body" data-toggle="tooltip"
                data-placement="right" :title="subitem.name">
                <span class="erjiIcon"><i v-if="showModal === subitem.id || subitem.id == selected" class="el-icon-document"></i></span>
                <span class="nav-title ng-binding erjiName" ca="1" v-text="subitem.name"></span>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <ul class="sidebar-trans" v-else>
        <li
          class="nav-item" :class="{active:item.id == selected}" @click="selectedMenus(item.id, item)">
          <router-link :to="'/manage'+'/'+item.path" @click="getSelect(item)">
            <div class="nav-icon sidebar-trans" data-container="body" data-toggle="tooltip"
                 data-placement="right" :title="item.name">
              <span class="erjiIcon">
                <i v-if="showModal === item.id || item.id == selected" :class="{'el-icon-document':item.id == selected}"></i>
              </span>
              <span class="nav-title" ca="1" v-text="item.name"></span>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
// const routerIdx = 1
export default{
  props: ['leftNavData', 'dataStructure'],
  data () {
    return{
      showModal: '',
      parIdx: 0,
      selected: 0,
      onlyOnce: true,
      menusData: [],
      structureIndex: {},
      leftNavDatas: this.leftNavData

    }
  },
  computed: {
    router () {
      let getStrIndex = this.getStructureIndex(this.getRouterIdx())
      let currSubIdx = getStrIndex.currSubIdx
      let parIdx = getStrIndex.parIdx
      let val = {}
      this.selectedMenus(currSubIdx, parIdx, val)
      return this.getRouterName(0)
    }
  },
  created () {
    this.init()
    this.getRoot()
  },
  methods: {
    // 登录后默认选中第一个二级菜单
    getFirstMenuInfo () {
      let getStrIndex = this.getStructureIndex(this.getRouterIdx())
      let currSubIdx = getStrIndex.currSubIdx
      let parIdx = getStrIndex.parIdx
      let val = {}
      this.selectedMenus(currSubIdx, parIdx, val)
    },
    getRoot () {
      this.$root.$on('newmeau', responseData => {
        if (!responseData.data || !responseData.data.length) {return} // 如果只有一级菜单
        this.menusData = responseData.data
        this.selected = this.menusData[0].id
        // this.setStructureIndexs(data);
        let dataStructure = this.getSubData(responseData.data)
        // 将设置完成的structureIndex赋值给 navs
        // dataStructure['structureIndex'] = this.structureIndex
        // this.subNavs = data
        this.dataStructures = dataStructure
        // this.yijimenuselect = 0
        // this.init()
      })
    },
    // 获取当前路由的层级
    getRouterIdx () {
      let len = 0
      let route = this.$route
      let matched = route.matched
      len = matched.length
      return len - 1 < 1 ? 1 : len - 1
    },
    getSelect (item) {
    },
    getSubData (data) {
      let tempData = []
      let dataStructure = {}
      _.forEach(data, function (v, k) {
        if (v.children) {
          tempData.push(v.children)
        }
      })
      tempData = _.flattenDeep(tempData)

      _.forEach(tempData, function (v, k) {
        if (v.code) {
          dataStructure[v.code] = v
        }
      })
      return dataStructure
    },
    init () {
      this.getMenusData()
      // let getStrIndex = this.getStructureIndex(this.getRouterIdx())
      // let parIdx = getStrIndex.parIdx
      if(this.onlyOnce) {
        // this.menusData[parIdx].expand = true
      }
      this.onlyOnce = false
      this.getFirstMenuInfo()
    },
    getStructureIndex (n) {
      let currentRoute = this.getRouterName(n)
      let currSubIdx = this.dataStructure[currentRoute].index
      let parIdx = this.dataStructure[currentRoute].parIdx
      return {currSubIdx: currSubIdx, parIdx: parIdx}
    },
    getMenusData () {
      let data = []
      data = this.leftNavData
      data.map((item, index)=>{
        // item.expand = false
        item.index = index
        item.children = item.children || []
        item.children.map((item1, index1)=>{
          // item1.expand = false
          item1.index = index1 + item.index
          item1.pathName = item.name + ' > ' + item1.name
        })
      })
      this.menusData = data
    },
    showAndHide (item) {
      item.expand = !item.expand
      this.$forceUpdate()
    },
    selectedMenus (id, parIdx, val, item) {
      if (this.showModal === id) {
        this.showModal = ''
      } else {
        this.showModal = id
      }
      if(parIdx) {
        this.$emit('setPath', parIdx.name)
      }
      if (val !== undefined) {
        this.$emit('setPathName', val.name)

      }
      let route = this.$route
      sessionStorage.setItem('currentRouter', JSON.stringify(route.path))
      // 存储当前路由到浏览器
      this.selected = id
      this.parIdx = parIdx
    },
    getRouterName (n) {
      let len = 0
      let route = this.$route
      let matched = route.matched
      if(n !== 0) {
        len = matched.length - n
      }
      let currentRoute = matched[len].name
      return currentRoute
    }
  }
}
</script>
