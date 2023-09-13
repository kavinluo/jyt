<!----------------------------------
****--@name     ${*}
****--@role     ${*}
****--@date     2022/12/14
****--@author   yyl
----------------------------------->
<template>
  <div>
    <el-row>
      <el-col :span="12">
        <!-- 每日人数显示 -->
        <headCountDisplay />
        <div>
          <!-- 日活跃度人数 -->
          <dailyActivity />
        </div>
        <div>
          <!-- 每日在线时长 -->
          <online />
        </div>
      </el-col>
      <el-col :span="12">
        <div>
          <p style="font-size:18px;font-weight:600;">总人数统计</p>
          <el-row style="margin-bottom:70px;">
            <el-col :span="8">
              <div class="members">
                <p style="margin-top:25%;color:#9f9f9f;font-size:15px;">会员数</p>
                <p style="margin-top:8%;font-size:20px;font-weight:600;">1,900</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="members">
                <p style="margin-top:25%;color:#9f9f9f;font-size:15px;">注册用户数</p>
                <p style="margin-top:8%;;font-size:20px;font-weight:600;">1,900</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="members">
                <p style="margin-top:25%;color:#9f9f9f;font-size:15px;">机构数</p>
                <p style="margin-top:8%;;font-size:20px;font-weight:600;">1,900</p>
              </div>
            </el-col>
          </el-row>
        </div>
        <div>
          <!-- 月活跃度人数 -->
          <monthly />
        </div>
        <div>
          <!-- 每日做题量 -->
          <exercises />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
/* 当前组件必要引入*/

// 当前组件引入全局的util
import headCountDisplay from './homepage/headCountDisplay.vue'
import dailyActivity from './homepage/dailyActivity.vue'
import monthly from './homepage/monthlyActivity.vue'
import online from './homepage/dailyOnline.vue'
import exercises from './homepage/exercises.vue'
export default {
  components: {headCountDisplay, dailyActivity, monthly, online, exercises},
  data () {
    return {}
  },
  created () {
    this.init()
  },
  mounted () {
  },
  methods: {
    // 初始化请求列表数据
    init () {

    }

  }
}
</script>
<style scoped>
.members {
  text-align: center;
  width:200px;
  height:150px;
  line-height: 150px;
  border: 1px solid #ffffff;
}
</style>
