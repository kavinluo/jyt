<template>
  <div>
    <viewUEditor :name="'ud1'" @storeUE="storeUE" @getUeditorVal="getUeditorVal" :ueditor-val="ueditorVal" :ueditor-config="ueditorConfig"></viewUEditor>
    <viewUEditor :name="'ud2'" @storeUE="storeUE" @getUeditorVal="getUeditorVal" :ueditor-val="ueditorVal" :ueditor-config="ueditorConfig"></viewUEditor>
    <el-button @click="setMyVal('ud1','789789897')">获取内容</el-button>
    <el-button @click="setMyVal('ud2','卡卡借开讲了可了解')">获取内容</el-button>
  </div>
</template>

<script>
  import viewUEditor from './showUeditor.vue';
  export default {
    data(){
      return{
        UE:{},
        ueditorVal:{
          ud1:"第一个编辑器",
          ud2:"第二个编辑器"
        },  //
        ueditorConfig:{
          //详细配置参考UEditor 官网api
          initialFrameHeight:220  //初始化编辑器高度,默认320
        },
      }
    },
    components: { viewUEditor },
    methods: {
      /**
       *
       * 存储编辑器的value值
       * @param name {string}  编辑器的name
       *
       * @param val  {string}  编辑器的内容
       *
       */
      getUeditorVal(name,val){
        this.ueditorVal[name] = val;
      },


      /**
       *
       * 存储编辑器的UE.editor对象
       * @param name {string}  编辑器的name
       *
       * @param editor {}      编辑器的对象
       *
       */
      storeUE(name,editor){
        this.UE[name] = editor;
      },

      setMyVal(name,v){
        this.UE[name].setContent(v);
      }
    },


  };
</script>
