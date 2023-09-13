<template>
  <div>
    <!--左侧树-->
    <layout-tree style="height: 550px">
      <left-tree slot="left" @tree-click="treeClick" :treeOptions="treeDefaults" :fromWhereTreeType="fromWhereTree"></left-tree>
      <div slot="right" id="content" ref="content" class="modal">
        <!--查询-->
        <div :class="'searchHas'+(searchs.length > 3 ? 2 : 1)" v-if="searchs.length">
          <template v-if="searchs.length === 1">
            <el-form ref="searchObj" :model="searchObj">
              <el-input :placeholder="`请选输入${searchs[0].label}相关查询信息`" icon="search" v-model="searchObj[searchs[0].keys]" :on-icon-click="getSearchData"></el-input>
            </el-form>
          </template>
          <template v-else-if="searchs.length > 1">
            <el-form label-width="60px" ref="searchObj" :model="searchObj">
              <el-row>
                <el-col :span="getSearchSpan(index)" v-for="(item,index) in searchs" :key="item.keys">
                  <el-form-item :label="item.label">
                    <el-input v-model="searchObj[item.keys]"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="3" align="right">
                  <el-button @click="getSearchData" type="info">搜索</el-button>
                </el-col>
              </el-row>
            </el-form>
            <div class="ivu-tabs-bar"></div>
          </template>
        </div>
        <div class="transferBox">
          <el-transfer filterable :filter-placeholder="placeholder" :titles="titles" :render-content="renderContent" v-model="selectVal"
            :data="transferData" :props="props">
          </el-transfer>
        </div>
        <br />
        <div class="ivu-tabs-bar"></div>
        <div style="text-align: center">
          <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
          <el-button @click="cancel">取消</el-button>
        </div>
      </div>
    </layout-tree>
  </div>
</template>
<script>
  let Util = null;

  import layoutTree from './layoutTree'
  import leftTree from './leftTree'

  export default {
    props: {
      treeDefaults: { //tree默认项设置
        type: Object,
        default: () => ({
          getDataUrl: '',
          isShowMenus: false,
          isInitSltedNode: false, //是否需要默认选中tree节点
        })
      },
      fromWhereTree: {
        type: String,
        default: 'user'
      },
      search: { // 自定义搜索项
        type: [Array, Object],
        default: () => [], // {label:'搜索名称',keys:'name'} || [{label:'搜索名称',keys:'name'}] // 需要搜索的对象，没有则不显示搜索框，有一个只需传一个搜索对象，多个为搜索对象数组
      },
      placeholder: { // 穿梭框搜索占位符
        type: String,
        default: ''
      },
      titles: { // 穿梭框顶部列表标题
        type: Array,
        default: () => ['请选择', '已选择']
      },
      props: { // 数据源的字段别名
        type: Object,
        default: () => ({
          key: 'id',
          label: 'name',
          // disabled: 'disabled'
        })
      },
      readerList: { // 自定义列表内容
        type: Function,
        default: (h, option) => {
          return <span class = "" > {
            option.name
          } < /span>
        }
      },
      initData: { // 初始化选择数据
        type: Array,
        default: () => []
      },
      api: { // 请求数据api
        type: Object,
        default: () => ({
          path: '/user/search/user/search',
          method: 'get'
        })
      }
    },
    data () {
      return {
        ajaxOpt: {}, // ajax配置
        searchObj: {}, // 搜索键值对
        searchs: [], // 构建dom使用
        tree: { // 菜单树
          treeId: '', // 选中树id
          treeRoad: '' // 节点路径
        },
        onlyOne: true,
        // 底部按钮
        loadBtn: {
          title: '提交',
          callParEvent: "listenSubEvent"
        },
        selectVal: [], // 已选择
        selectData: {}, // 选择的数据集(供返回选中数据源使用)
        transferData: [] // 选择数据源
      }
    },
    created() {
      Util = this.$util;
      this.init();
    },
    components: {
      layoutTree,
      leftTree
    },
    methods: {
      //初始化
      init() {
        this.selectVal = this.initData;
        this.ajaxOpt = {
          ajaxSuccess: 'addSelectData',
          ajaxParams: {
            url: this.api.path,
            params: {
              deptIds: this.tree.treeId
            }
          }
        };
        this.initSearchObj();
        this.initSelectData();
      },
      /********************* 数据处理 ************************/
      // 初始化搜索数据
      initSearchObj() {
        // [{label: '测试',keys: 'test'}, {label: '名字',keys: 'name'}, {label: '性别',keys: 'sexs'}]
        let searchArr = [];
        console.log(this.search)
        if (!this.search.length) {
          if (typeof this.search === 'object' && typeof this.search.keys === 'string') {
            searchArr.push(this.search)
          } else {
            return
          }
        } else {
          searchArr = this.search;
        }
        // 遍历获取需要搜索的key
        for (var item in searchArr) {
          if (searchArr.hasOwnProperty(item)) {
            console.log(searchArr[item].keys)
            this.searchObj[searchArr[item].keys] = ''
          }
        }
        this.searchs = searchArr
      },
      // 获取搜索的span
      getSearchSpan(index) {
        let len = this.searchs.length;
        if (!len) return;
        let span = [ // 布局
          [10, 10],
          [7, 7, 7],
          [7, 7, 7, 21],
          [8, 8, 8, 11, 10],
          [8, 8, 8, 7, 7, 7]
        ];
        return span[len - 2][index] // 减去下标（从零开始）和第一个（默认布局）
      },
      // 自定义渲染列表内容
      renderContent(h, option) {
        return this.readerList(h, option)
      },
      // 初始化数据集
      initSelectData(res) {
        let data = [];
        if (!res) {
          data = this.transferData;
        } else {
          data = res;
        }
        for (let i = 0, l = data.length; i < l; i++) {
          this.selectData[data[i][this.props.key]] = data[i]
        }
      },
      /********************* 搜索 ****************************/
      getSearchData() {
        Object.assign(this.ajaxOpt.ajaxParams.params, this.searchObj);
        this.getselectData();
      },
      /********************* 菜单树 **************************/
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
      treeClick(obj, node, self, isLeaf) {
        this.tree.treeId = obj.id;
        this.tree.treeRoad = obj.level + '-' + obj.id;
        this.$refs['searchObj'].resetFields();
        this.getSearchData()
      },
      /**
       * 获取选择数据源
       * */
      getselectData() {
        this.ajaxOpt.ajaxParams.params.deptIds = this.tree.treeId;
        this.ajax(this.ajaxOpt)
      },
      // 服务器数据添加到选择数据源中
      addSelectData(res) {
        this.transferData = res.data;
        this.initSelectData(res)
      },
      /********************* 底部按钮 ************************/
      listenSubEvent() {
        let selected = [];
        let items = this.selectVal;
        for (let i = 0, l = items.length; i < l; i++) {
          for (var key in this.transferData) {
            if (this.transferData.hasOwnProperty(key) && this.transferData[key][this.props.key] === items[i])
              selected.push(this.transferData[key])
          }
        }
        this.$emit('setData', {
          selectId: items,
          selected
        })
      },
      cancel() {
        this.$emit('cancel')
      }
    }
  }

</script>

<style lang="scss">
  .transferBox {
    width: 630px;
    .el-transfer-panel {
      width: 286px;
      height: 470px
    }
  }

  .searchHas1~.transferBox .el-transfer-panel {
    height: 400px;
  }

  .searchHas2~.transferBox .el-transfer-panel {
    height: 340px;
  }

</style>
