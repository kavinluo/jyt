<template>
  <div>
    <!--左侧树-->
    <layout-tree style="height: 550px">
      <left-tree
        slot="left"
        :tree-options="treeDefaults"
        :from-where-tree-type="fromWhereTree"
        @tree-click="treeClick"
      />
      <div
        id="content"
        slot="right"
        ref="content"
        class="modal"
      >
        <!--查询-->
        <!-- <div>
          <el-input
            v-model="searchUserInfo"
            placeholder="可输入姓名、手机号或者邮箱进行查询"
            suffix-icon="el-icon-search"
            :on-icon-click="handleIconClick"
          />
        </div>-->
        <br>
        <div style="margin: 0 auto;width: 650px;">
          <ambufTransfer
            :data="leftListData"
            :target-keys="rightTargetKeys"
            :list-style="listStyle"
            :render-format="render3"
            :operations="['向左移动','向右移动']"
            not-found-text="无信息,请选择左侧菜单!"
            filterable
            class="my-select-user"
            @on-change="handleChange3"
          />
        </div>
        <br>
        <div class="ivu-tabs-bar" />
        <div style="text-align: center">
          <load-btn
            :btn-data="loadBtn"
            @listenSubEvent="listenSubEvent"
          />
          <el-button
            class="cancelBtn"
            @click="cancel"
          >
            取消
          </el-button>
        </div>
      </div>
    </layout-tree>
  </div>
</template>
<script>
import ambufTransfer from './ambufTransfer.vue'
import layoutTree from './layoutTree.vue'
import leftTree from './leftTree.vue'
import {
  getConfigByProps,
  getSearchParamsVal
} from '../plugins/selecteUser'

let Util = null
export default {
  components: {
    layoutTree, leftTree, ambufTransfer
  },
  props: ['initUser', 'isOnlyOne', 'url', 'unSelect', 'treeOptions', 'selectOption', 'searchParams', 'type'],
  data () {
    return {
      // tree默认项设置
      treeDefaults: {
        selectUser: true,
        getDataUrl: '',
        isShowMenus: false,
        isInitSltedNode: false // 是否需要默认选中tree节点
      },
      fromWhereTree: 'user',

      searchUserInfo: '', // 全局查询人员信息
      leftListData: [], // 左侧列表的数据
      rightTargetKeys: [], // 右侧选中数据的id
      splitDataToObject: {}, // 将源数据转化为以源数据key为对象的key的数据对象
      rightSltedData: [], // 存储右侧框中选中的数据
      onlyOne: this.isOnlyOne || false,
      listStyle: {
        width: '260px',
        height: '400px'
      },
      loadBtn: {title: '提交', callParEvent: 'listenSubEvent'},
      //        clickId: '',
      selectTreeData: {
        id: '', // 当前选中的树节点id,
        node: null, self: null, isLeaf: null
      }
    }
  },
  created () {
    Util = this.$util
    this.init()
  },
  methods: {

    // 初始化
    init () {
      console.log(this.selectOption)
      if (typeof this.treeOptions !== 'undefined') {
        this.treeDefaults = Object.assign(this.treeDefaults, this.treeOptions)
      }

      if (typeof this.initUser !== 'undefined') {
        this.rightSltedData = this.initUser
      }
      if (this.url) {
        this.treeDefaults.getTreeUrl = this.url
      }
      this.getMockData()
    },

    /*
       * 初始化时获取左侧框中的数据
       * @return mockData [{},{}]  左侧框的源数据
       * */
    getMockData () {
      if (this.rightSltedData.length === 0) {return}
      let keys = []
      this.leftListData = this.rightSltedData

      for (let i = 0, item; i < this.initUser.length; i++) {
        item = this.initUser[i]
        if (typeof item.specialty === 'undefined') {
          item.specialty = ''
        }
        this.splitDataToObject[item.key] = item
        keys.push(item.key)
      }
      this.rightTargetKeys = keys
    },

    // 点击查询图标调用
    handleIconClick () {
      console.log(this.searchParams, this.searchUserInfo, 2)
      if (this.searchUserInfo === '') {
        return
      }
      let ajaxParams = getConfigByProps(this.searchParams) // 获取ajax配置
      let params = getSearchParamsVal(this.searchUserInfo) // 根据输入值智能判断类型
      params.deptIds = this.selectTreeData.id
      if (ajaxParams.method === 'post') { // 根据ajax请求方式进行赋值
        ajaxParams.data = Object.assign(ajaxParams.data || {}, params)
      } else {
        ajaxParams.params = Object.assign(ajaxParams.params || {}, params)
      }
      let opt = {
        ajaxSuccess: 'setLeftData',
        ajaxParams
      }
      this.ajax(opt)
    },

    // 保存成功回调
    listenSubEvent () {
      let users = [] // 需要提交的id信息
      let depIds = [] // 选中的所有部门id
      let tempObj = {} // 临时存储的所有人员信息
      Util._.forEach(this.rightSltedData, function (obj, key) {
        if (obj.label.indexOf('dep=') > -1) {
          depIds.push(obj.key)
        } else {
          tempObj[obj.key] = obj
        }
      })
      // 请求ajax
      let userList = {
        ajaxSuccess: (res) => {
          let rawData = res.data
          for (var i = 0, item; i < rawData.length; i++) {
            item = rawData[i]
            let codeNumber = '' // 人员编号
            if (item.codeNumber !== null || typeof item.codeNumber !== 'undefined') {
              codeNumber = item.codeNumber
            }
            tempObj[item.id] = {
              key: item.id,
              label: item.nickname,
              mobile: item.mobile,
              sex: item.sex,
              idCardNo: item.idCardNo,
              specialty: item.specialty,
              codeNumber: codeNumber,
              description: '编号---' + codeNumber,
              disabled: false,
              data: item
            }
          }
          Util._.forEach(tempObj, (n, key) => {
            console.log(n)
            users.push(n)
          })
          this.$emit('setUsers', users)
        },
        // ajaxParams: {
        //   url: '/appraising/vote/project/add/' + depIds.join(',')
        // }
        ajaxParams: {
          url: '/passport/user/list',
          params: {
            depId: depIds.join(',')
          }
        }
      }
      if (depIds.length > 0) {
        this.ajax(userList)
      } else {
        Util._.forEach(tempObj, (n, key) => {
          users.push(n)
        })
        this.$emit('setUsers', users)
      }
    },

    // 调用父组件关闭当前模态框
    cancel () {
      this.$emit('cancel', 'selectUser', false)
    },

    /*
       * 左侧目录树节点click调用方法
       *
       * @param obj {} 当前选中节点的一级数据
       *
       * @param node  {}  整个tree节点所有数据
       *
       * @param  self  {}  当前tree vue实例
       *
       * @param isLeaf boolean  当前节点是否为叶子节点
       * */
    treeClick (obj, node, self, isLeaf) {
      console.log('treeClick', obj, node)
      let id = obj.id
      this.selectTreeData = {id, node, self, isLeaf}
      this.searchUserInfo = ''
      this.formateTreeData(obj, isLeaf, node)
    },

    /*
       * 设置右侧框中选择的数据
       * @param obj {}  右侧框中的数据
       * */
    setRightSltedData (obj) {
      this.rightSltedData = []
      Util._.forEach(obj, (n, key) => {
        this.rightSltedData.push(n)
      })
    },

    /**
       * 设置左侧框中选择的数据
       * @param res {}  ajax返回的数据
       */
    // eslint-disable-next-line complexity
    setLeftData (res) {
      console.log(this.selectTreeData)
      res.data.map((item)=>{
        item.userId = this.selectTreeData.id
      })
      let rawData = res.data
      let node = this.selectTreeData.node
      /* [{
          id:12,
          name:"123",
          specialty:"内科"
        }]*/
      let tempArr = []
      if (node && node.childNodes.length > 0) {
        for (let i = 0, item; i < node.childNodes.length; i++) {
          item = node.childNodes[i]
          if (typeof item.specialty === 'undefined') {
            item.specialty = ''
          }
          let nodeId = item.key || item.id
          tempArr.push({
            isParent: true,
            key: nodeId,
            userId: this.selectTreeData.id,
            label: '<i dep="dep" class="ivu-icon ivu-icon-android-folder ambuf-tree-icon" style="margin-left:0;font-size:16px;"></i>' + item.label,
            specialty: item.specialty,
            codeNumber: item.codeNumber,
            description: '内容---' + nodeId + '的描述信息',
            disabled: false
          })
        }
      }
      console.log(rawData.length)
      for (let i = 0, item; i < rawData.length; i++) {
        item = rawData[i]
        let codeNumber = '' // 人员编号
        if (item.codeNumber !== null || typeof item.codeNumber !== 'undefined') {
          // eslint-disable-next-line no-unused-vars
          codeNumber = item.codeNumber
        }
        tempArr.push({
          isParent: false,
          key: item.id,
          label: item.nickname,
          mobile: item.mobile,
          specialty: item.specialty,
          codeNumber: item.codeNumber,
          description: '人员id---' + item.id + '的描述信息',
          disabled: false,
          data: item
        })
      }
      if (this.rightSltedData.length > 0) {
        let userObj = this.splitDataToObjFun(tempArr)
        // eslint-disable-next-line no-redeclare
        for (var i = 0, item; i < this.rightSltedData.length; i++) {
          item = this.rightSltedData[i]
          delete (userObj[item.key])
        }
        tempArr = []
        Util._.forEach(userObj, function (n, key) {
          tempArr.push(n)
        })
      }
      this.leftListData = this.removeSelected(this.rightSltedData.concat(tempArr))
      this.setSltCatinerVal()
    },

    /*
       * 查询叶子节点数据
       * @param id number | string  当前选中的节点的ID
       * */
    searchLeafData (id, isLeaf, node) {

      let userList = {
        ajaxSuccess: 'setLeftData',
        ajaxParams: {
          url: '/passport/user/list',
          params: {
            depId: id
          }
        }
      }
      if (this.selectOption) {
        userList.ajaxParams.url = this.selectOption.url + id
      }
      if(this.type) {
        userList.ajaxParams.url = this.selectOption.url
        userList.ajaxParams.params.treeId = id
        userList.ajaxParams.params.pageSize = 0
        userList.ajaxParams.params.curPage = 1
        userList.ajaxParams.params.name = ''
      }
      this.ajax(userList)
    },

    /* 如果有禁止选择的则在列表上清空，
       * unSelect   为 [123,233] id数组
       * */
    removeSelected (data) {
      if (!this.unSelect) {return data}
      for (let i = 0; i < data.length; i++) {
        if (~this.unSelect.indexOf(data[i].key)) {
          data.splice(i--, 1)
        }
      }
      return data
    },

    /*
       * 格式化左侧列表的数据展示形式
       *
       * @param obj {} 当前选中节点的一级数据
       *
       * @param isLeaf boolean  当前节点是否为叶子节点
       *
       * @param node {}  当前节点、当前节点下所有子节点
       * */
    formateTreeData (obj, isLeaf, node) {
      // 去重:右侧框中已经有当前的值
      this.searchLeafData(obj.id, isLeaf, node)
      if(!isLeaf) {
        // eslint-disable-next-line no-prototype-builtins
        if(this.splitDataToObject.hasOwnProperty(obj.id)) {
          this.leftListData = this.rightSltedData
          this.setSltCatinerVal()
          return
        }
        let tempArr = []
        tempArr.push({
          key: obj.id,
          label: '<i dep="dep" class="ivu-icon ivu-icon-android-folder ambuf-tree-icon" style="margin-left:0;font-size:16px;"></i>' + obj.nickname,
          description: '内容---' + obj.id + '的描述信息',
          disabled: false
        })
        this.leftListData = this.rightSltedData.concat(tempArr)
        this.setSltCatinerVal()
      }else{

      }
    },

    /*
       * 设置左右选中框中的值
       *
       * */
    setSltCatinerVal () {
      /* let arr = this.rightTargetKeys;
        this.rightTargetKeys = [];
        setTimeout(
          () => {
            if (arr.length > 0) {
              this.rightTargetKeys = arr;
            }
          }, 1);*/
    },

    /*
       * 将源数据转化为以源数据key为对象的key的数据对象
       * @param data [{},{}]  源数据转data
       * */
    splitDataToObjFun (data) {
      let myData = data
      let keyValUser = {}
      for (var i = 0, item, myKey; i < myData.length; i++) {
        item = myData[i]
        myKey = item.key + ''
        keyValUser[myKey] = item
      }
      return keyValUser
    },

    /*
       * 设置默认右侧已选数据
       * @return [] 返回当前需要设置右侧已经选择的id
       * */
    getTargetKeys () {
      /* let initRightData = ["99","100"];
        this.setRightSltedData(initRightData);
        return ["99","100"];*/
      return []
    },

    /*
       * 选项在两栏之间转移时的回调函数
       * @param targetKeys  string  右侧选择框中的值
       * @param direction   string  移动的方向left right
       * @param moveKeys    string  移动过程中的值
       */
    // eslint-disable-next-line complexity
    handleChange3 (targetKeys, direction, moveKeys) {
      console.log(targetKeys, direction, moveKeys)
      if (this.onlyOne) { // 如果选择一个
        if (targetKeys.length > 1) {
          this.showMess('只能选择一个人员')
          return
        } else {
          for (let i = 0, item; i < this.leftListData.length; i++) {
            item = this.leftListData[i]
            if (item.key === targetKeys[0] && item.isParent) {
              this.showMess('只能选择一个人员')
              return
            }
          }
        }
      }

      this.rightTargetKeys = targetKeys
      console.log('this.rightTargetKeys ', this.rightTargetKeys)
      if (direction === 'right') {
        // 向对象中添加
        let tempObj = {}
        for (var i = 0, item; i < this.leftListData.length; i++) {
          item = this.leftListData[i]
          tempObj[item.key] = item
        }
        // eslint-disable-next-line no-redeclare
        for (var i = 0, item; i < moveKeys.length; i++) {
          item = moveKeys[i]
          this.splitDataToObject[item] = tempObj[item]
        }

      } else {
        // eslint-disable-next-line no-redeclare
        for (var i = 0, item; i < moveKeys.length; i++) {
          item = moveKeys[i]
          delete (this.splitDataToObject[item])
        }
      }
      this.setRightSltedData(this.splitDataToObject)
    },

    /*
       * 格式化数据的展示形式
       * @param item {} 左侧列表的数据
       * todo  描述信息暂时没有,用到selectUser的地方可以先把描述信息传递过来,这里不做展示
       * */
    render3 (item) {
      if (typeof item.codeNumber === 'undefined' || item.codeNumber === null || item.codeNumber === '') {
        item.codeNumber = '无'
      }
      return item.label // item.description;
    }

  }
}
</script>
