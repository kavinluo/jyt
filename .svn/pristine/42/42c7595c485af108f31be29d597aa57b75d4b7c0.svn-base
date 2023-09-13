<!--  业务字典***下拉框  -->
<template>
  <el-select
    v-model="value"
    :multiple="sltOptions.multiple"
    :filterable="sltOptions.filterable"
    :allow-create="sltOptions.allowCreate"
    placeholder="选择或输入匹配搜索"
    @change="change"
  >
    <el-option
      v-for="item in optionData"
      :key="item.name"
      :label="item.name"
      :value="item.name"
    />
  </el-select>
</template>
<script>
/**
   * 业务字典返回值
   * 情况1
   * {
        "name":"",
        "code":"",
        "value":"",
        "sequence":""
    }
   *
   * 情况2
   * {
        "id":"",
        "parentName":"",
        "parentCode":"",
        "child":[
            {
                "name":"",
                "code":"",
                "value":"",
                "sequence":""
            },
            {
                "name":"",
                "code":"",
                "value":"",
                "sequence":""
            },
            {
                "name":"",
                "code":"",
                "value":"",
                "sequence":""
            }
        ]
    }
   *
   */
let Util = null
export default {
  props: ['selectOptions', 'isClear'],
  data () {
    return {
      optionData: [],

      // 选择框的参数配置
      sltOptions: {
        multiple: true, // 是否多选
        filterable: true, // 是否可搜索
        allowCreate: false, // 是否允许用户创建新条目，需配合 filterable 使用
        value: [], // 当multiple为true时value为[];
        dataType: ''
      },
      value: [], // 当multiple为true时value为[];

      // 当前组件默认请求(list)数据时,ajax处理的 基础信息设置
      listMessTitle: {
        ajaxSuccess: 'updateListData',
        ajaxParams: {
          url: '/passport/pc/dictionary/getItemByCode/SYSTEM_BASIC_INFOMATION' // 向后台请求数据的地址
        }
      }

    }
  },
  watch: {
    isClear () {
      this.value = []
    }
  },
  created () {
    Util = this.$util
    if(typeof this.selectOptions !== 'undefined') {
      this.sltOptions = Object.assign(this.sltOptions, this.selectOptions)
      if(typeof this.selectOptions.value !== 'undefined') {
        this.value = this.selectOptions.value
      }
    }
    this.init()
  },
  methods: {

    // 初始化组件信息
    init () {
      if(typeof this.sltOptions.url !== 'undefined') {
        this.listMessTitle.ajaxParams.url = this.sltOptions.url
      }
      this.ajax(this.listMessTitle)
    },

    // 通过get请求列表数据
    updateListData (responseData) {
      let data = responseData.data
      if(!Util.isEmptyObject(data)) {
        if(typeof data.child === 'undefined') {
          this.optionData = data
        }else{
          this.optionData = data.child
        }
      }
    },

    // 选中值发生变化时触发
    change (val) {
      this.$emit('setSltOptionValue', val, this.value)
    }
  }
}
</script>
