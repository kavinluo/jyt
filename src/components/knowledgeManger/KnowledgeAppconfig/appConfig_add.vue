<template>
  <div>
    <el-form ref="form" :model="form" label-width="140px"  :rules="rules"  :inline="true" style="margin: 14px;width: 100%">
      <el-form-item label="名称" style="width: 48%" prop="name" required>
        <el-input v-model="form.name" style="width: 220px;"></el-input>
      </el-form-item>
      <el-form-item label="排序号" style="width: 48%" prop="orderBy">
        <el-input-number  v-model="form.orderBy" style="width: 220px;"></el-input-number>
      </el-form-item>
      <el-form-item label="编码"  style="width: 48%" prop="code" required>
        <el-select v-model="form.code" placeholder="请选择编码"  style="width: 220px;" @change="hasShowRecommend">
          <el-option  v-for="item in configList"  :key="item.code"  :label="item.name"  :value="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否有搜索功能"  style="width: 48%">
        <el-select v-model="form.hasSearch" placeholder="请选择是否有搜索功能"  style="width: 220px;">
          <el-option label="是" :value="1"></el-option>
          <el-option label="否" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否有广告位"  style="width: 48%">
        <el-select v-model="form.hasAd" placeholder="是否有广告位"  style="width: 220px;">
          <el-option label="是" :value="1"></el-option>
          <el-option label="否" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="APP展示样式"  style="width: 48%">
        <el-select v-model="form.showType" placeholder="请选择APP展示样式"  style="width: 220px;">
          <el-option label="无分级" :value="0"></el-option>
          <el-option label="一级上方" :value="1"></el-option>
          <el-option label="一级左侧" :value="2"></el-option>
          <el-option label="二级上方" :value="3"></el-option>
          <el-option label="二级左侧" :value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="可查看人员身份"  style="width: 48%">
        <el-select v-model="roleIds" placeholder="请选择编码" multiple style="width: 220px;" @change="getLabel">
          <el-option  v-for="item in roleList"  :key="item.id"  :label="item.name"  :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否推荐"  style="width: 48%">
        <el-select v-model="form.isRecommend" placeholder="是否推荐"  style="width: 220px;">
          <el-option label="是" :value="1"></el-option>
          <el-option label="否" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="图标"  style="width: 48%">
        <el-upload
          :headers="headers"
          class="avatar-uploader"
          :action="actionUrl"
          :show-file-list="false"
          :data="upData"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="icon" :src="icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>
    <el-row>
      <el-col :span="24">
        <el-button class="but-col" @click="submitConfig" type="primary" style="float: right;margin: 10px;">确定</el-button>
        <el-button class="but-col"  @click="cancel" type="danger" style="float: right;margin: 10px;">取消</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import config from '../../../config/config'
import knowledgeApi from '../knowledgeApi'
export default {
  props: ['setTableData', 'type', 'operailityData'],
  data () {
    return {
      knowledgeApi,
      headers: {'Token': this.$util.getCookie('Token')},
      actionUrl:config.urlPrefix +knowledgeApi.knowledgeFileUpload.path,
      upData:{bsModule:'knowledge'},
      configList:[], //配置项选择列表
      roleList:[], //角色选择列表
      roleIds:[], //角色已选择值
      roleNames:[],//角色已选择名称
      form:{},
      icon:null,
      rules: {
        name:[
          {required: true,message: '名称不能为空', trigger: 'blur' }
        ],
        code:[
          {required: true, message: '编码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init () {
      this.queryConfigList()
      this.queryRoleList()
      if (this.type === 'edit') {
        let ajaxOptions = {
          ajaxSuccess: res => {
            if(res.code===0){
              this.roleIds=[]
              this.createConfigModal=true
              this.form=res.data
              this.form.hasSearch=res.data.hasSearch?1:0
              this.form.isRecommend=res.data.isRecommend?1:0
              this.form.hasAd=res.data.hasAd?1:0
              const roleIds=(this.form.roleIds).split(',')
              for(let i=0;i<roleIds.length;i++){
                this.roleIds.push(Number(roleIds[i]))
              }
              this.roleNames=this.form.roleNames.split(',')
              this.icon=this.form.icon
              this.hasShowRecommend()
              this.$forceUpdate()
            }
          },
          ajaxParams: {
            url: knowledgeApi.queryKnowledgeConfigShow.path + this.operailityData.id,
            method:knowledgeApi.queryKnowledgeConfigShow.method
          }
        }
        this.ajax(ajaxOptions)
      }
    },
    //提交事件
    submitConfig(){
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const id=this.form.id
          // let url=knowledgeApi.updataKnowledgeConfigShow.path + id
          // let method=knowledgeApi.updataKnowledgeConfigShow.method
          // if(id === undefined || id === 0 ){
          //   url=knowledgeApi.addKnowledgeConfigShow.path
          //   method=knowledgeApi.addKnowledgeConfigShow.method
          // }
          this.form.roleIds=this.roleIds.toString()
          this.form.roleNames=this.roleNames.toString()
          let ajaxOptions = {
            ajaxSuccess: res => {
              if(res.code===0){
                this.$message({ message: this.type === 'edit' ? '修改成功' : '添加成功', type: 'success'})
                this.form = {}
                this.$emit('cancel', 'add')
                this.setTableData()
                this.init()
              }
            },
            ajaxParams: {
              url: this.type === 'edit'? knowledgeApi.updataKnowledgeConfigShow.path + id : knowledgeApi.addKnowledgeConfigShow.path,
              method: 'post',
              data:this.form
            }
          }
          this.ajax(ajaxOptions)
        }
      })
    },
    getLabel(value) {
      let roleIds=[]
      let roleNames=[]
      for(let i =0; i<value.length; i++){
        this.roleList.find(item => {
          if((item.id).toString() === (value[i]).toString()){
            roleIds.push(item.id)
            roleNames.push(item.name)
          }
        })
      }
      this.roleIds=roleIds
      this.roleNames=roleNames
    },
    // 是否显示推荐
    hasShowRecommend(){
      if(this.form.code==='celebrity'||this.form.code==='book'){
        this.hasRecommend=true
      }else{
        this.hasRecommend=false
      }
    },
    //查询知识库配置列
    queryConfigList(){
      let ajaxOptions = {
        ajaxSuccess: res => {
          this.configList=res.data
        },
        ajaxParams: {
          url: '/knowledge/knowledgeConfig/list'
        }
      }
      this.ajax(ajaxOptions)
    },

    //获取角色精简信息列表
    queryRoleList(){
      let ajaxOptions = {
        ajaxSuccess: res => {
          this.roleList=res.data
        },
        ajaxParams: {
          url: '/passport/system/role/list-all-simple'
        }
      }
      this.ajax(ajaxOptions)
    },
    cancel () {
      this.$emit('cancel', 'add')
    },
    //文件上传成功
    handleAvatarSuccess(res, file) {
      this.form.icon=res.data.url
      this.icon= URL.createObjectURL(file.raw)
      this.$forceUpdate()
    },
    //文件上传的钩子
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>
<style scoped>

</style>
