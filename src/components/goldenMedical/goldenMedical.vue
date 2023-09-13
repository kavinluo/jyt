<template>
  <div>
    <el-carousel
      :interval="5000"
      arrow="always"
      height="450px"
    >
      <el-carousel-item
        v-for="item in tubox"
        :key="item.id"
      >
        <img
          :src="item.tu"
          class="tu"
          alt=""
        >
        <h3>{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
    <img
      src="../../assets/images/u11911.png"
      alt=""
      class="tu"
    >
    <img
      src="../../assets/images/u11857.png"
      alt=""
      class="tu"
    >
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeIndex: '1',
      tubox: [
        { id: 0, tu: require('../../assets/images/u11853.png')},
        { id: 1, tu: require('../../assets/images/u11863.png')}
      ]
    }
  },
  methods: {
    handleSelect (key) {
      console.log(key)
      localStorage.setItem('index', key)
    }
  }
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
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
