<template>
  <div>
    <div class="consultation">
      <el-row :gutter="20">
        <el-col :span="5" :offset="6">
          <img src="../../assets/images/u11999.png" alt="" style="width:200px;height:420px;margin-top:40px;">
        </el-col>
        <el-col :span="8">
          <div style="margin-top:30%;">
            <span style="font-size:30px;font-weight:600;">咨讯</span>
            <p style="font-size:20px; margin:30px 0 12px 0;">提供中医药相关的实施讯息</p>
            <p style="font-size:20px;">涵盖新闻动态，正常法规、招聘信息、名人分享等内容</p>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="activity">
      <el-row :gutter="20">
        <el-col :span="9" :offset="6">
          <div style="margin-top:30%;">
            <span style="font-size:30px;font-weight:600;">活动</span>
            <p style="font-size:20px; margin:30px 0 12px 0;">活动为官方组织或国家相关机构组织的阶段性项目</p>
            <p style="font-size:20px;margin:30px 0 12px 0;">内容包括活动报名与活动参与两核心部分。例如学习打卡、</p>
            <p style="font-size:20px;margin:30px 0 12px 0;">知识竞赛等，同时还支持中医学专业（本科）水平测试理</p>
            <p style="font-size:20px;margin:30px 0 12px 0;">论考试等相关考试的考生服务部分。</p>
          </div>
        </el-col>
        <el-col :span="8">
          <img src="../../assets/images/u11998.png" alt="" style="width:200px;height:420px;margin-top:42px;">
        </el-col>
      </el-row>
    </div>
    <div class="study">
      <el-row :gutter="20">
        <el-col :span="5" :offset="6">
          <img src="../../assets/images/u11996.png" alt="" style="width:200px;height:420px;margin-top:40px;">
        </el-col>
        <el-col :span="8">
          <div style="margin-top:30%;">
            <span style="font-size:30px;font-weight:600;">学习</span>
            <p style="font-size:20px; margin:30px 0 12px 0;">汇集了中医药专业各类别题库，并包含错题本、收藏夹、</p>
            <p style="font-size:20px;">模拟试卷、排行榜、试题评论及每日练习等相关功能，</p>
            <p style="font-size:20px;margin:30px 0 12px 0;">便于用户的自我学习。</p>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="customeService">
      <el-row :gutter="20">
        <el-col :span="9" :offset="6">
          <div style="margin-top:30%;">
            <span style="font-size:30px;font-weight:600;">客服</span>
            <p style="font-size:20px; margin:30px 0 12px 0;">提供人工在线客服服务，实时在线为用户答疑解惑。</p>
          </div>
        </el-col>
        <el-col :span="8">
          <img src="../../assets/images/u11995.png" alt="" style="width:200px;height:420px;margin-top:42px;">
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>
<style scoped>
.consultation {
  width:100%;
  height:500px;
  background-image: url('../../assets/images/u11927.png');
}
.activity {
  width:100%;
  height:500px;
}
.study{
  width:100%;
  height:500px;
  background-image: url('../../assets/images/u11927.png');
}
.customeService{
  width:100%;
  height:500px;
}
</style>
