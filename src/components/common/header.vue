<template>
  <div
    class="topbar-wrap topbar-clearfix"
    @click="hiddenframe"
  >
    <div class="topbar-left">
      <div class="topbar-yylogo-imgBox">
        <img
          src="../../assets/images/u9.png"
          alt=""
          style="width:40px;height:40px;margin-left:15px;"
        >
        <span style="font-size:2.2em;padding:13px;color:white;"><strong>华&nbsp;夏&nbsp;国&nbsp;医</strong></span>
      </div>
    </div>
    <!-- <div
      class="topbar-workbench topbar-left topbar-project-name"
      style="width:200px;margin:-45px 45%;"
    >
      <span style="display: block;width: 100%; height: 100%;font-size: 2.2em;color: #FFFFFFD9;text-align: center">金医途后台管理</span>
    </div> -->
    <div class="topbar-middle">
      <div class="topbar-in">
        <el-button class="topBtn" :class="{ active: item.activeIndex === indexBtn}" v-for="(item, index) in mentList" :key="index" @click.stop="studentchoose(item, index, item.id)">{{ item.name }}</el-button>
      </div>
    </div>
    <div class="topbar-info topbar-right topbar-clearfix">
      <div
        class="topbar-user topbar-left"
        :class="{'topbar-user-showLogout':expendLogin}"
      >
        <a
          ref="showLoginMessId"
          class="topbar-user-box"
        >
          <span
            v-if="typeof userInfo.nickname!='undefined'"
            class="topbar-user-name"
          >{{ userInfo && userInfo.nickname }}
          </span>
          <span class="topbar-user-arrow icon-arrow-down2" />
          <span class="topbar-user-logout">
            <span
              class="topbar-user-logout-text"
              @click="editUsers"
            >修改用户名</span>
            <span
              class="topbar-user-logout-text"
              @click="editPwds"
            >修改密码</span>
            <span
              class="topbar-user-logout-text"
              @click="loginOut"
            >退出</span>
          </span>
        </a>
      </div>
    </div>
    <!--修改密码-->
    <Modal
      v-model="passwordModal"
      :mask-closable="false"
      height="200"
      class-name="vertical-center-modal"
      :width="460"
    >
      <modal-header
        slot="header"
        :content="passwordId"
      />
      <pwd
        v-if="passwordModal"
        :operaility-data="operailityData"
        @cancel="cancel"
        @password="cancel"
      />
      <div slot="footer" />
    </Modal>
    <Modal
      v-model="userModal"
      :mask-closable="false"
      height="200"
      class-name="vertical-center-modal"
      :width="460"
    >
      <modal-header
        slot="header"
        :content="userId"
      />
      <user
        v-if="userModal"
        :operaility-data="operailityData"
        @cancel="cancel"
        @username="cancel"
      />
      <div slot="footer" />
    </Modal>
  </div>
</template>
<script>
let Util = null
import pwd from './password'
import user from './user.vue'
export default {
  props: ['routerData'],
  components: {pwd, user},
  data () {
    return {
      expendLogin: false,
      showLogin: false,
      passwordModal: false,
      userModal: false,
      passwordId: {id: 'passwordId', title: '修改密码'},
      userId: {id: 'userId', title: '修改用户名' },
      noticeCount: 0,
      noticeData: [],
      operailityData: {},
      systemIndex: 0,
      firsts: '',
      indexBtn: 0
    }
  },
  computed: {
    userInfo () {
      let info = this.$store.getters.getUserInfo || {}
      return info
    },
    mentList () {
      let menu = this.$store.getters.getMenu
      return menu
    },
    envsData () {
      return this.$store.state.envPath
    }
  },
  created () {
    Util = this.$util
    this.indexBtn = 0
    console.log(this.indexBtn, 'this.indexBtn')

  },
  mounted () {
    let that = this
    this.$nextTick(() => {
      if (this.$refs.showLoginMessId) { // 如果头部导航条存在
        Util.events.addHandler(this.$refs.showLoginMessId, 'click', function (e) {
          e.stopPropagation()
          that.showLoginMess()
        })
      }
      Util.events.addHandler(document,'click',function () {
        that.expendLogin = false
        that.$emit('setZindex', true)
      })
    })
  },
  methods: {
    showLoginMess () {
      this.expendLogin = !this.expendLogin
      this.$emit('setZindex', this.expendLogin)
    },
    studentchoose (item, firstIndex, secondIndex, thirdIndex) {
      if (item.children[0].children === null || item.children[0].children.length === 0) {
        this.$emit('setPath', item.children[0].name)
      }else {
        this.$emit('setPath', item.children[0].children[0].name)
      }
      this.indexBtn = firstIndex
      this.$set(item, 'activeIndex', firstIndex)
      let obj = {
        data: item.children
      }
      this.$root.$emit('newmeau', obj)
      this.mergeRouter(item.id, firstIndex, secondIndex, thirdIndex, item)
    },
    mergeRouter (id, firstIndex, secondIndex, thirdIndex, val) {
      let firstLevel, mergeRouter
      if (val.children[0].children !== null && val.children[0].children.length !== 0) {
        this.firsts = val.children[0].children[0].path
      }else {
        this.firsts = val.children[0].path
      }
      firstLevel = this.firsts
      mergeRouter = '/manage/' + firstLevel
      this.$root.$emit('eventName', this.firsts) // 传参
      this.$router.push(mergeRouter)
    },
    // 修改用户名
    editUsers (e) {
      e.stopPropagation()
      this.expendLogin = false
      this.operailityData = this.userInfo
      this.userModal = true
      this.$emit('setZindex', true)
    },
    // 修改密码
    editPwds (e) {
      e.stopPropagation()
      this.expendLogin = false
      this.operailityData = this.userInfo
      this.passwordModal = true
      this.$emit('setZindex', true)
    },
    hiddenframe () {
      setTimeout(() => {
        this.$emit('setZindex', true)
      })
    },
    loginOut () {
      // 退出登陆
      Util.loginOut(this, '/')
    },
    cancel () {
      this.passwordModal = false
      this.userModal = false
    }
  }
}
</script>
<style>
.active {
  background-color: rgb(236, 245, 255);
  color:  rgb(64, 158, 255)
}
.version {
  display: inline-block;
  position: absolute;
  left: 20px;
  top: 15px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  display: inline-block;
  z-index: 999;
}

.popUpMenuStyle {
  position: absolute;
  left: 0;
  top: 45px;
  width: 180px;
  height: 300px;
  background-color: skyblue;
}
</style>
