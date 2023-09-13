<!----------------------------------
****--富文本编辑器(UEditor)
****--@date     2017/6/21
****--@author   zyc<332533011@qq.com
----------------------------------->
<template>
    <div :id="randomId"></div>
</template>

<script>
  export default {
    name: 'fullcalendar',
    props: {
      fullPath: {
        // UEditor 代码的路径
        type: String,
        default: '/static/fullcalendar-3.9.0/'
      },
      fullConfig: {
        // UEditor 配置项
        type: Object,
        default: function () {
          return {};
        }
      }
    },
    data () {
      return {
        // 为了避免麻烦，每个编辑器实例都用不同的 id
        randomId: 'full_' + (Math.random() * 100000000000000000),
        instance: null,
        // scriptTagStatus -> 0:代码未加载，1:两个代码依赖加载了一个，2:两个代码依赖都已经加载完成
        scriptTagStatus: 0,
        UEConfig: { // UEditor 配置项
          autoHeightEnabled: false,
        }
      };
    },
    mounted () {
      console.log($('#' + this.randomId).fullCalendar);
//      autoHeightEnabled: false,
      if ($('#' + this.randomId).fullCalendar) {
        this.initSuccess()
        // 如果全局对象存在，说明编辑器代码已经初始化完成，直接加载编辑器
      } else {
        console.log(3);

        // 如果全局对象不存在，说明编辑器代码还没有加载完成，需要加载编辑器代码
        this.insertScriptTag();
      }
    },
    beforeDestroy () {
      // 组件销毁的时候，要销毁 UEditor 实例
      if ($('#' + this.randomId).fullCalendar) {
        console.log($('#' + this.randomId).fullCalendar);
        $('#' + this.randomId).fullCalendar('destroy')
      }

    },
    methods: {
      insertScriptTag () {
        let fullcalendarCss = '';
        let fullcalendarPrint = '';
        let moment = '';
        let fullcalendar = '';
        let locale = '';

        // 如果这个tag不存在，则生成相关代码tag以加载代码
        fullcalendarCss = document.createElement('link');
        fullcalendarCss.type = 'text/css';
        fullcalendarCss.rel = 'stylesheet';
        fullcalendarCss.href = this.fullPath + 'fullcalendar.min.css';

        fullcalendarPrint = document.createElement('link');
        fullcalendarPrint.type = 'text/css';
        fullcalendarPrint.rel = 'stylesheet';
        fullcalendarPrint.media = 'print';
        fullcalendarPrint.href = this.fullPath + 'fullcalendar.print.css';

        moment = document.createElement('script');
        moment.type = 'text/javascript';
        moment.src = this.fullPath + 'lib/moment.min.js';

        fullcalendar = document.createElement('script');
        fullcalendar.type = 'text/javascript';
        fullcalendar.src = this.fullPath + 'fullcalendar.min.js';

        locale = document.createElement('script');
        locale.type = 'text/javascript';
        locale.src = this.fullPath + 'locale/zh-cn.js';

        let s = document.getElementsByTagName('head')[0];
        s.appendChild(fullcalendarCss);
        s.appendChild(fullcalendarPrint);
        s.appendChild(moment);

        // 等待代码加载完成后初始化编辑器
        fullcalendarCss.addEventListener('load', () => {
          this.scriptTagStatus++;
          this.initEditor();
        });
        fullcalendarPrint.addEventListener('load', () => {
          this.scriptTagStatus++;
          this.initEditor();
        });
        moment.addEventListener('load', () => {
          s.appendChild(fullcalendar);

          this.scriptTagStatus++;
          this.initEditor();
        });
        fullcalendar.addEventListener('load', () => {
          s.appendChild(locale);
          this.scriptTagStatus++;
          this.initEditor();
        });
        locale.addEventListener('load', () => {
          this.scriptTagStatus++;
          this.initEditor();
        });
      },
      initEditor () {
        // scriptTagStatus 为 2 的时候，说明两个必需引入的 js 文件都已经被引入，且加载完成
        if (this.scriptTagStatus === 5 && $('#' + this.randomId).fullCalendar) {
          // Vue 异步执行 DOM 更新，这样一来代码执行到这里的时候可能 template 里面的 script 标签还没真正创建
          // 所以，我们只能在 nextTick 里面初始化 UEditor
          this.initSuccess()
        }
      },
      //初始化成功
      initSuccess () {
        console.log('this.randomId:', this.randomId);
        this.$nextTick(() => {
          this.$emit('setFull', $('#' + this.randomId))
        });
      },

    },

  };
</script>

