/**
* @description: 富文本内容显示
* @author: zy
* @create: 创建内容 zy cai 2023-01-26
*/
<template>
  <div class="ql-container ql-snow">
    <div class="ql-editor" v-html="content">
    </div>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import '@/assets/quillEditor.css'
export default {
  name: "RichEditorDisplay",
  props: {
    content:{
      type:String
    }
  },
}
</script>

<style scoped lang="less" >
.ql-container.ql-snow {
  border: 0px solid #ccc;
}
::v-deep img{
  max-width: 100%;
  height: auto;

}

</style>
