<template>
  <div class="box1">
    <div class="hj">
      <i
        class="el-icon-circle-close"
        style="position: absolute;top:7%;right: 4%;font-size:37px;cursor:pointer"
        @click="close"
      />
      <span class="hjr">{{ winning === 1 ? '一等奖': winning === 2 ? '二等奖' : winning === 3 ? '三等奖' : '未中奖' }}:获奖人</span>
      <div>
        <img
          src="@/assets/images/crown.png"
          style="width:49px;height:49px;transform:rotate(-28deg);position: absolute;left: 3.4%;top: 35%;"
          alt=""
        >
      </div>
      <p class="name">
        <el-avatar
          :size="70"
          :src="operailityData.avatar"
        />
        <span style="margin-left:20px;">{{ operailityData.useUserNikName }}</span>
        <span style="margin-left:190px;">{{ operailityData.userMobile }}</span>
      </p>
      <el-button
        :round="true"
        class="yellow"
        style="width:230px;height:85px; position: absolute;left:34%;bottom: 6%;"
      >
        <span
          style="font-size:30px;color:rgb(255,255,255)"
          @click="showDialog"
        >确定</span>
      </el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: ['operailityData', 'winning'],
  data () {
    return {
      dialog: false
    }
  },
  created () {
    console.log(this.operailityData)
  },
  methods: {
    showDialog () {
      this.$emit('close', 'false', 'false')
    },
    close () {
      this.$emit('close', 'false', 'false')
    }
  }
}
</script>
<style scoped>
.box1 {
  position: relative;
}
.hj {
  background-image: url('@/assets/images/hj.png');
  width:860px;
  height:480px;
  margin-top: 10%;
  position: relative;
  position: absolute;
  left: 30%;
}
.hjr {
  font-size:45px;
  color:rgb(134, 44, 16);
  position: absolute;
  left: 30%;
  top: 7%;
}
.name {
  font-size: 56px;
  position: absolute;
  top:42%;
  left: 5%;
}
.submitBtn {
  width:180px;
  height:60px;
}
</style>
