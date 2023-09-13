<template>
  <div>
    <layout-tree>
      <el-menu
        slot="left"
        default-active="1"
        class="el-menu-vertical-demo"
      >
        <el-menu-item
          v-for="(item, index) in menuList"
          :key="item.id"
          :index="(index + 1).toString()"
          @click="add(item)"
        >
          <i class="el-icon-folder-opened" />
          <span slot="title">{{ item.categoryTitle }}</span>
        </el-menu-item>
      </el-menu>
      <div
        slot="right"
        :style="{'max-height': timeLineHeight + 'px' }"
        style="overflow-y:scroll;"
      >
        <!-- <banner
          v-if="categoryType === '2'"
          :operaility-data="operailityData"
          :data-obj="dataObj"
        /> -->
        <!-- <zixun
          v-if="categoryType === '1' "
          :operaility-data="operailityData"
        /> -->
        <guanyuwomen
          v-if="categoryType === '4'"
          :operaility-data="operailityData"
          :data-obj="dataObj"
          style="height:80%"
        />
        <!-- <tubiao v-if="categoryType === '3'"></tubiao> -->
        <!-- <yindaotu v-if="categoryType === '2'"></yindaotu> -->
      </div>
    </layout-tree>
  </div>
</template>
<script>
import api from './api'
// import zixun from ''
// import guanyuwomen from './guanyuwomen/guanyuwomen_list.vue'
// import tubiao from './tubiao/tubiao_list.vue'
// import yindaotu from './yindaotu/yindaotu_list.vue'
// import banner from './shouyeBanner/shouyeBanner_list.vue'
export default {
  components: {
    // zixun,
    // tubiao,
    // yindaotu,
    // banner
  },
  data () {
    return {
      api,
      menuList: [],
      categoryType: '',
      operailityData: {},
      dataObj: {},
      timeLineHeight: ''
    }
  },
  created () {
    this.init()
  },
  mounted () {
    this.timeLineHeight = document.documentElement.clientHeight - 110
    window.onresize = () => {
      this.timeLineHeight = document.documentElement.clientHeight - 110
    }
  },
  methods: {
    init () {
      let opt = {
        ajaxSuccess: res => {
          this.menuList = res.data
        },
        ajaxParams: {
          url: api.listAll.path,
          method: 'get'
        }
      }
      this.ajax(opt)
    },
    add (val) {
      console.log(val)
      this.operailityData = val
      this.categoryType = val.categoryType
      // if (this.categoryType !== '1') {
      //   let opt = {
      //     ajaxSuccess: res => {
      //       this.dataObj = res.data
      //       console.log(res.data.contentDetails, 'resresres')
      //     },
      //     ajaxParams: {
      //       url: api.getByLink.path + val.id,
      //       method: 'get'
      //     }
      //   }
      //   this.ajax(opt)
      // }
    }
  }
}
</script>
<style scoped>
.toolbar {
    margin-top: 20px;
}
.container {
    position: relative;
    height: 1100px;
}
</style>
