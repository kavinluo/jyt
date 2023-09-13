<template>
  <div>
    <p class="textP">可判试卷列表</p>
    <tableList :justiciaData="justiciaData"></tableList>
    <p class="textP">已选试卷列表</p>
    <tableList :selectedData="selectedData" :type="'dislodge'"></tableList>
  </div>
</template>
<script>
import tableList from './tableList.vue'
export default {
  components: {tableList},
  data () {
    return {
      selectedData: [
        { name: '张三', age: 25, time: 25,times: 25, id: 1},
        { name: '李四', age: 30, time: 21, id: 2 },
        { name: '李四', age: 30, time: 21, id: 3 },
        { name: '李四', age: 30, time: 21, id: 4 },
        { name: '李四', age: 30, time: 21, id: 5 },
        { name: '李四', age: 30, time: 21 , id: 6},
        { name: '李四', age: 30, time: 21, id: 7 },
        { name: '李四', age: 30, time: 21 , id: 9},
        { name: '李四', age: 30, time: 21, id: 8 },
        { name: '王五', age: 35, id: 11 }
      ],
      justiciaData: [
        { name: '张三', age: 25, time: 2222,times: 22222, id: 1},
        { name: '李四', age: 30, time: 21, id: 2 },
        { name: '李四', age: 30, time: 21, id: 3 },
        { name: '李四', age: 30, time: 21, id: 4 },
        { name: '李四', age: 30, time: 21, id: 5 },
        { name: '李四', age: 30, time: 21 , id: 6},
        { name: '李四', age: 30, time: 21, id: 7 },
        { name: '李四', age: 30, time: 21 , id: 9},
        { name: '李四', age: 30, time: 21, id: 8 },
        { name: '王五', age: 35, id: 11 }
      ]
    }
  }
}
</script>
<style scoped>
.textP {
  font-size:17px;
  margin: 20px 0 ;
}
</style>
