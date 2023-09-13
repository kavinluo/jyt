<template>
  <layout-tree >
    <LeftTree
      slot="left"
      style="margin-top: 3px"
      @nodeClick="nodeClick"
      @showClass="showClass"
    />
    <div slot="right">
      <ListClass v-if="!showCourseMgt && activity === 'entrance'"  @setStep="setStep" :treeId="currentTreeData.id" @showCourse="showCourse" @closeLoading="closeLoading"/>
      <addPersonnel v-if="!showCourseMgt && activity === 'detail'" @setStep="setStep" :rowObj="rowObj"></addPersonnel>
      <ListCourse v-if="showCourseMgt"  :classId="classId" :treeId="currentTreeData.id" @showClass="showClass" @closeLoading="closeLoading"/>
    </div>
  </layout-tree>
</template>
<script>

/* 当前组件必要引入*/
import LeftTree from '../components/LeftTree.vue'
import ListClass from '../components/ListClass.vue'
import ListCourse from '../components/ListCourse.vue'
import addPersonnel from '../components/addPersonnel.vue'
export default {
  components: {
    LeftTree,
    ListClass,
    ListCourse,
    addPersonnel
  },
  data () {
    return {
      loading:false,
      showCourseMgt:false,
      classId:'',
      activity: 'entrance',
      currentTreeData: {} // 当前点击的数节点数据
    }
  },
  created() {
    let show = sessionStorage.getItem('showCourse')
    if(Boolean(show)===true){
      this.showCourseMgt=true
      sessionStorage.removeItem('showCourse')
    }
  },
  methods: {
    nodeClick (node) {
      // console.log('点击左边切换',node)
      this.loading=true
      this.currentTreeData = node
    },
    showClass(){
      this.showCourseMgt = false
    },
    showCourse(classId){
      this.classId= classId
      this.showCourseMgt = true
    },
    closeLoading(){
      this.loading=false
    },
    // 设置上一步 下一步
    setStep (type, row) {
      console.log(type,row, 'typetypetype')
      this.activity = type
      console.log(this.activity, 'activity')
      this.rowObj = row
    }
  }

}
</script>
