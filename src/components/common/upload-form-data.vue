<script>
export default {
  name: 'UploadFormData',
  props: {
    name: {
      type: String,
      default: 'file'
    },
    attrs: {
      type: Object || Array,
      default: ()=> {}
    },
    multiple: {
      type: Boolean,
      default: false
    },
    accept: {
      type: Array,
      default: ()=> []
    },
    disabled: Boolean,
    onStart: Function,
    limit: Number
  },
  data () {
    return {

    }
  },
  methods: {
    handleChange (ev) {
      const files = ev.target.files
      if (!files) {return}
      this.uploadFiles(files)
    },
    // 文件类型验证
    checkFileType (fileName) {
      if(this.accept.length === 0) {return true}
      const regExp = new RegExp(`\.(${this.accept.join('|')})$`, 'g')
      return regExp.test(fileName)
    },
    // 文件选择成功事件
    uploadFiles (files) {
      let postFiles = Array.prototype.slice.call(files)
      const typeIsPass = this.checkFileType(postFiles[0].name)
      if(!typeIsPass) {
        this.errorMess('目前仅支持：' + this.accept.join(','))
        return
      }
      this.$emit('uploadPost', postFiles)
    },
    handleButtons (files) {

    },
    // 选择文件事件
    handleClick () {
      if (!this.disabled) {
        this.$refs.input.value = null
        this.$refs.input.click()
      }
    },
    // 回车事件
    handleKeydown (e) {
      if (e.target !== e.currentTarget) {return}
      if (e.keyCode === 13 || e.keyCode === 32) {
        this.handleClick()
      }
    }
  },
  render (createElement, context) {
    let {
      name,
      multiple,
      disabled,
      attrs,
      handleClick,
      handleChange,
      handleKeydown,
      handleButtons
    } = this
    const _attributes = {
      attrs: {
        ...attrs
      }
    }
    const data = {
      class: {
        'el-upload': true
      },
      on: {
        click: handleClick,
        keydown: handleKeydown
      }
    }
    // 页面模板
    return (
      <div {...data} tabindex="0" >
        <el-button {..._attributes} class="but-col blueBtn" disabled={disabled} on-click={handleButtons}>{this.$slots.default}</el-button>
        <input class="el-upload__input" type="file" ref="input" name={name} on-change={handleChange} multiple={multiple}></input>
      </div>
    )
  }
}
</script>

<style scoped>

</style>
