<!--知识库_配置 查看-->
<template>
  <div class="knowledgeConfig_view">
    <div>
      <div>
        <div class="headline">
          <span class="headline-text">1</span><span> . &nbsp;名称</span>
        </div>
      </div>
      <div class="content-wrap">
        <p
          class="content"
          prop="name"
        >
&nbsp;
        </p>
      </div>
    </div>
    <div>
      <div>
        <div class="headline">
          <span class="headline-text">2</span><span> . &nbsp;编码(全局唯一)</span>
        </div>
      </div>
      <div class="content-wrap">
        <p
          class="content"
          prop="code"
        >
&nbsp;
        </p>
      </div>
    </div>
    <div>
      <div>
        <div class="headline">
          <span class="headline-text">3</span><span> . &nbsp;层级(目录深度)</span>
        </div>
      </div>
      <div class="content-wrap">
        <p
          class="content"
          prop="level"
        >
&nbsp;
        </p>
      </div>
    </div>
    <div>
      <div>
        <div class="headline">
          <span class="headline-text">4</span><span> . &nbsp;创建时间</span>
        </div>
      </div>
      <div class="content-wrap">
        <p
          class="content"
          prop="createTime"
        >
&nbsp;
        </p>
      </div>
    </div>
    <div>
      <div>
        <div class="headline">
          <span class="headline-text">5</span><span> . &nbsp;修改时间</span>
        </div>
      </div>
      <div class="content-wrap">
        <p
          class="content"
          prop="updateTime"
        >
&nbsp;
        </p>
      </div>
    </div>
    <div>
      <div>
        <div class="headline">
          <span class="headline-text">6</span><span> . &nbsp;创建者</span>
        </div>
      </div>
      <div class="content-wrap">
        <p
          class="content"
          prop="creator"
        >
&nbsp;
        </p>
      </div>
    </div>
    <div>
      <div>
        <div class="headline">
          <span class="headline-text">7</span><span> . &nbsp;更新者</span>
        </div>
      </div>
      <div class="content-wrap">
        <p
          class="content"
          prop="updater"
        >
&nbsp;
        </p>
      </div>
    </div>
    <div>
      <div>
        <div class="headline">
          <span class="headline-text">8</span><span> . &nbsp;是否删除 0：否 1：是</span>
        </div>
      </div>
      <div class="content-wrap">
        <p
          class="content"
          prop="deleted"
        >
&nbsp;
        </p>
      </div>
    </div>
    <el-row class="btn">
      <el-col
        :span="5"
        :offset="16"
      >
        <Button
          type="primary"
          @click="confirm()"
        >
          确定
        </Button>
      </el-col>
    </el-row>
  </div>
</template>
<script >
// import util from '../../../../libs/util'
// eslint-disable-next-line no-unused-vars
// const getList = util.getList
// eslint-disable-next-line no-unused-vars
const url = 'data1.json'
export default {
  props: ['showData', 'parent'],
  data () {
    return{
      formValidate: {
        name: '',
        school: '',
        status: ''
      },
      show: {},
      tableData: [{
        'name': '张莎',
        'gender': '女',
        'phone': '13223222222'
      },
      {
        'name': '黎明',
        'gender': '男',
        'phone': '13223222222'
      }]
    }
  },
  /*   watch:{
      showData(){
        let that = this;
        let parm = this.showData;
        let response = getList(url,parm);
        response.then(function (res) {
          let responseData = res.data;
          if (_.isObject(responseData["status"]) && responseData["status"]["code"] == 0) {
            that.show = responseData.data[0];
            that.$emit('loading')

          }
        })
          .catch(function (err) {
            //捕获错误异常
            console.log("err"
              , err);
          });
      }
    },*/
  computed: {
    countDate () {
      if(!this.show.beginTime) {return}
      let beginTime = this.show.beginTime
      let endTime = this.show.endTime
      beginTime = Date.parse(new Date(beginTime))
      endTime = Date.parse(new Date(endTime))
      if(endTime + 1 < beginTime) {return}
      let time = endTime - beginTime
      var time2 = time / 86400000 + 1
      return time2
    }
  },
  methods: {
    confirm () {
      this.$emit('show')
    }
  }

}
</script>
