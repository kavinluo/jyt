<template>
  <vue-u-editor class="ueditorBox" @ready="editorReady" :ueditorConfig="ueditorConfig" style="width: 800px"></vue-u-editor>
</template>
<style>
  .ueditorBox {
    line-height: initial;
  }
</style>
<script>
  import VueUEditor from './UEditorFull.vue';

  export default {
    name: 'ueditor',
    props: {
      name: {    //编辑的name标示
        type: String,
        default: '',
      },
      valKey: { // 值需要绑定到的key
        type: String,
        default: '',
      },
      ueditorVal: {  //  默认的值设置
        type: Object,
        default: '',
      },
      ueditorConfig: {  // UEditor 配置项
        type: Object,
        default: function () {
          return {};
        },
      },
    },
    data () {
      return {
        UEeditor: null,
      }
    },
    components: {VueUEditor},
    methods: {
      editorReady (editorInstance) {
        this.UEeditor = editorInstance
        this.$emit('storeUE', this.valKey || this.name, editorInstance)
        editorInstance.setContent(this.ueditorVal[this.name]);
        editorInstance.addListener('contentChange', () => {
          //console.log('编辑器内容发生了变化：', editorInstance.getContent());
          this.$emit('getUeditorVal', this.valKey || this.name, editorInstance.getContent());
        });
      },
    },
    watch: {
      ueditorVal () {
        this.UEeditor.setContent(this.ueditorVal[this.name]);
      },
    },
  };
</script>
