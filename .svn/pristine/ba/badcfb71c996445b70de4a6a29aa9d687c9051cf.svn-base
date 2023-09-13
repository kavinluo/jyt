<template>
  <div>
    <slot>
      <el-date-picker v-model="startDate" :type="type" :editable="false" placeholder="选择日期" :picker-options="pickerOptions0" @change="handleStartTime"
                      style="width:130px;">
      </el-date-picker>
      {{text}}
      <el-date-picker v-model="endDate" align="right" :editable="false" :type="type" placeholder="选择日期" :picker-options="pickerOptions1"
                      @change="handleEndTime" style="width:130px;">
      </el-date-picker>
    </slot>
    <slot name="start"></slot>
    <slot name="end"></slot>
  </div>
</template>
<style>
  .dateGroupWd {
    width: 80px;
  }

</style>
<script>
  export default {
    props: ['index', 'dateGroup', 'sDate', 'eDate'],
    data () {
      return {
        templateType: '0', //展示形式0整个在一行展示; 1可以根据自己的要求扩展不同的模板,当前默认为0

        startDate: '',
        endDate: '',
        text: '到',
        type: 'date'

      };
    },
    created () {
      if (typeof this.dateGroup != 'undefined') {
        this.startDate = this.dateGroup.startDate || this.startDate;
        this.endDate = this.dateGroup.endDate || this.endDate;
        this.type = this.dateGroup.type || this.type;
        this.text = this.dateGroup.text != 'undefined' ? this.dateGroup.text : this.text;
      }
    },
    watch: {
      sDate (val) {
        if (val != '') {
          this.startDate = val;
        }
      },
      eDate (val) {
        if (val != '') {
          this.endDate = val;
        }
      },
      startDate: function (val, oldVal) {
        if (val == oldVal) return;
        val = this.yearMonthData(val);
        this.$emit('setDateGroupVal', this.index, 'startDate', val);
      },
      endDate: function (val, oldVal) {
        if (val == oldVal) return;
        val = this.yearMonthData(val);
        this.$emit('setDateGroupVal', this.index, 'endDate', val);
      }
    },
    methods: {
      getCurrSltDate () {
        let myData = Util._.defaultsDeep({}, this.formValidate);
        this.formDate(myData, ['startDate', 'endDate'], this.yearMonthData);
        return myData;
      },
      setCurrSltDate (data) {
        this.this.formValidate = data;
      }
    }
  };

</script>
