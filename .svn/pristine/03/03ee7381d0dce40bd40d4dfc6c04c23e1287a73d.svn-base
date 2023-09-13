<template>
  <!-- 打印 -->
  <div>
    <p :align="btnAlign" style="padding-bottom:16px;">
      <el-button type="info" v-if="!tilte" size="small" @click="printContent">打印</el-button>
    </p>
    <div class="printContent" id="printContent">
      <slot></slot>
    </div>
    <div style="margin-top: 10px;text-align: center">
      <el-button v-if="showChangeBtn" type="info" class="sureBtn" @click="changePages">切换视图</el-button>
      <el-button type="info" v-if="tilte" class="sureBtn" @click="printContent">打印</el-button>
      <el-button type="info" v-if="disabledItem" class="sureBtn" @click="disabledSure">一键禁用</el-button>
    </div>
    <div style="clear: both"></div>
  </div>
</template>

<script>
  export default {
    props: {
      // 打印按钮位置 left,center,right
      btnAlign: {
        type: String,
        default: 'right'
      },
      // 打印之后返回的数据集
      operailityData: {
        default: () => {}
      },
      beforePrint: { // 打印前的回调
        type: Function,
        default: () => true
      },
      tilte:{
        type: Boolean,
        default: false
      },
      disabledItem:{
        type: Boolean,
        default: false
      },
      showChangeBtn:{
        type: Boolean,
        default: false
      },
      setStyle:{
        type: Boolean,
        default: false
      }

    },
    methods: {
      cancel(){
        this.emit('cancel','print')
      },
      disabledSure(){
//        consol
      },
      // 切换视图
      changePages(){
        this.$emit('changePages')
      },
      // 打印
      printContent() {
        console.log(this.setStyle,"setStyle")
        if(!this.beforePrint()){ // 如果打印之前返回false，则不进行打印
          return false;
        }
        this.$emit('print', this.operailityData);
        let printContent = document.getElementById('printContent');
        let printContentBox = document.getElementById('printContentBox');
        if (!printContentBox) {
          printContentBox = document.createElement('div');
          printContentBox.setAttribute('id', 'printContentBox');
        }
        printContentBox.innerHTML = printContent.innerHTML;
        document.body.appendChild(printContentBox)
        console.log(document.body,"document.body")
        if (this.getExplorer() == "IE") {　　　　
          this.pageSetupUull();　
        }
        window.print();
        this.$emit('print', this.operailityData);
         setTimeout(()=>printContentBox.innerHTML = '',300)
      },
      /**
       * 对IE设置打印预览
       */
      pageSetupUull() {
        var hkey_root, hkey_path, hkey_key;
        hkey_root = "HKEY_CURRENT_USER";
        hkey_path = "\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";
        try {
          var RegWsh = new ActiveXObject("WScript.Shell");
          hkey_key = "header";
          RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "");
          hkey_key = "footer";
          RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "");
        /*  hkey_key="margin_top";
          RegWsh.RegWrite(hkey_root+hkey_path+hkey_key,"0.8");*/

        } catch (e) {}
      },
      // 获取浏览器类型
      getExplorer() {
        var explorer = window.navigator.userAgent;
        //ie
        if (explorer.indexOf("MSIE") >= 0) {
          return "IE";
        }
        //firefox
        else if (explorer.indexOf("Firefox") >= 0) {
          return "Firefox";
        }
        //Chrome
        else if (explorer.indexOf("Chrome") >= 0) {
          return "Chrome";
        }
        //Opera
        else if (explorer.indexOf("Opera") >= 0) {
          return "Opera";
        }
        //Safari
        else if (explorer.indexOf("Safari") >= 0) {
          return "Safari";
        }
      }
    }
  }

</script>

<style lang="scss">
  /* 打印 */
  #printContentBox {
    display: none;
    text-align: center;
  }

  @media print {
    body {
      height: auto;
    }
     .default_font{
       padding: 0 50px;
     }
    #app,
    .el-message {
      visibility: hidden;
    }
    #printContentBox {
      /* width: 1000px; */
      display: block;
      padding: 20px;
      z-index: -9999;
    }
    .printNoBorder{border: none !important;}
    /* 下一页 */
    .printPageNext {
      page-break-after: always;
    }
    // 打印时隐藏
    .printHidden{display: none !important;}
    // 打印时块级显示
    .printShow{display: block !important;}
    // 打印时行类显示
    .printShowInline{display: inline-block !important;}
    @page {
      size: auto;
      /* 边距 */
      /*margin: 2mm 10mm;*/
      margin: 5mm 0;
    }
    /* 表格重置 */
    table{border:1px solid #dfe6ec;border-collapse: collapse;cellspacing:0;cellpadding:0;}
    /*table td,th{border:1px solid #dfe6ec !important;}*/
    table th{border-bottom: none !important;}
    .el-table{border:none;background-color: transparent;overflow: visible;}
    .el-table table th.gutter{display: none;}
    .el-table__body-wrapper{width: 100%;}
    .el-table__header[style]{width: 100% !important;}
    .el-table__body[style]{width: 100% !important;}
    .el-tooltip[style]{width: auto !important;}
    .el-table__empty-block[style]{width: 100% !important;}
    .el-table__body, .el-table__footer, .el-table__header{table-layout: auto;}
    .el-table__body-wrapper{margin-top: -1px;}
    .el-table__empty-block{border:1px solid #dfe6ec;border-top: none;margin-top: -1px;}
    .el-table::after, .el-table::before{background-color: transparent;}
    /* 交费单 */
    .printBPMain .printBPItem{margin-top: 150px;}
    .printBPMain .printBPItem:nth-child(2n){ margin-top: 350px;  page-break-after: always;}

    /* 设备二维码 */
    .deviceQRCodePrintBox{
      .deviceStoragePrintCodePageItem{
        margin-top: -1.4mm;
        max-height: 290mm;
        overflow: hidden;
        &:first-child{
          margin-top: -5mm;
        }
        .printBPMain-codePrint{
          .showPrintUi{
            background: none;
            border: none;
          }
          &:nth-child(19), &:nth-child(20), &:nth-child(21) {
            margin-bottom: 0;
            .showPrintUi{
              .img{
                margin-top: -7mm;
              }
            }
          }
        }
      }
    }

    .Stylee{
      .el-table thead.is-group th{
        background:none !important;
      }
      .printDataList .el-table td .cell,
      .printDataList .el-table th .cell {
        max-width: 500px !important;
        min-width: 50px !important;
        margin: 0 auto !important;
        padding: 0 10px !important;
      }
    }
    .printtables {
      border: 1px solid #000;
      th, td {
        border: 1px solid #000;
      }
    }
  }

</style>
