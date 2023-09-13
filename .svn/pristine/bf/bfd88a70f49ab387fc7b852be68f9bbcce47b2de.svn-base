<template>
  <iframe
    frameborder="0"
    marginheight="0"
    marginwidth="0"
    scrolling="auto"
    :src="getSrc"
    class="iframeView"
  />
</template>
<script>
export default {
  name: 'IframeView',
  props: ['url'],
  data () {
    return{
      token: this.$cookie.get('Token') || '',
      getSrc: ''
    }
  },
  watch: {
    url (val) {
      this.getSrcByUrl()
    }
  },
  created () {
    this.getSrcByUrl()
  },
  methods: {
    getSrcByUrl () {
      let src = ''
      if (this.url) {
        src = this.url + (this.url.indexOf('?') > -1 ? '&' : '?') + 'token=' + this.token
      }
      this.getSrc = src
    }
  }
}
</script>

<style>
.iframeView{width: 100%;height: 100%;}
</style>
