<template>
  <el-container>
    <el-header>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <img
          src="../../assets/images/u3560.png"
          style="width:40px;height:40px;margin:20px 0 0 120px;"
          alt=""
        >
        <span style="font-size:30px;margin-top:20px">金医途</span>
        <el-button
          class="redBtn"
          style="float:right;margin:20px 70px"
          @click="login"
        >
          登录
        </el-button>
        <el-menu-item index="/index/aboutWe">
          关于我们
        </el-menu-item>
        <el-menu-item index="/index/service">
          服务功能
        </el-menu-item>
        <el-menu-item index="/index/companyProfile">
          公司简介
        </el-menu-item>
        <el-menu-item index="/index/goldenMedical">
          首页
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-main style="background-color:white">
      <router-view />
    </el-main>
    <el-footer>
      <el-row class="row-bg">
        <el-col :span="8">
          <div>
            <p style="color:white;font-size:18px;">
              联系方式
            </p>
            <p style="font-size:14px;color:white;margin-top:5px;">
              邮箱：2189610091@qq.com
            </p>
            <p style="font-size:14px;color:white;margin-top:5px;">
              电话：15611575979
            </p>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <p style="color:white;font-size:18px;">
              版权所有
            </p>
            <p style="font-size:14px;color:white;margin-top:5px;">
              @华夏国医(北京)信息技术有限公司 版权所有
            </p>
            <p style="font-size:14px;color:white;margin-top:5px;">
              保留所有权、使用规定、以及最终解释权
            </p>
            <p style="font-size:14px;color:white;margin-top:20px;">
              <span><img
                src="../../assets/images/batb.png"
                alt=""
              ></span>
              <span>
                <a
                  target="_blank"
                  href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802041291"
                  style="display:inline-block;text-decoration:none;height:20px;line-height:20px;color:white;margin-right:20px;"
                ><img
                  src=""
                  style="float:left;"
                >
                  京公网安备 11010802041291号
                </a>
              </span>
              京ICP备2023001609号
            </p>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <p style="color:white;font-size:18px;">
              服务
            </p>
            <!-- <a href="/goldenMedical/userProtocol" style="font-size:14px;color:white;margin-top:5px;" >用户协议</a> -->
            <el-link
              style="font-size:14px;color:white;margin-top:5px;"
              @click="userPro"
            >
              用户协议
            </el-link>
          </div>
        </el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      activeIndex: '/goldenMedical/goldenMedical',
      tubox: [
        { id: 0, tu: require('../../assets/images/u11853.png')},
        { id: 1, tu: require('../../assets/images/u11863.png')}
      ]
    }
  },
  methods: {
    login () {
      this.$router.push('/login')
    },
    handleSelect (key) {
      this.$router.push(key)
    },
    getHeight () {
      // this.defaultHeight.height = window.outerHeight + 'px'
    },
    userPro () {
      this.$router.push('/index/userProtocol')
    }
  }
}
</script>
<style scoped>
header.el-header {
  position: sticky;
  top:0;
  z-index: 999;
}
::v-deep .el-menu--horizontal>.el-menu-item {
    float: right;
    height: 60px;
    font-size:17px;
    line-height: 60px;
    margin: 10px 20px;
    border-bottom: 2px solid transparent;
    color: #020202;
}
 .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    /* line-height: 300px; */
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .tu {
    width:100%;
    height:100%;
  }
 .row-bg.el-row {
   height:200px;
   text-align: center;;
   background-color: #282c31;
 }
 .el-col.el-col-8 {
    margin-top: 3%;
}
</style>
