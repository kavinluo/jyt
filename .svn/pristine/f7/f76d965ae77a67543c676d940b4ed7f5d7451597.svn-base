export default {
  /**
   * 存储localStorage
   */
  setLocalStorage (name,content) {
    if (!name) {return}
    if (typeof content !== 'string') {
      content = JSON.stringify(content)
    }
    window.localStorage.setItem(name,content)
  },

  /**
   * 获取localStorage
   */
  getLocalStorage (name) {
    if (!name) {return}
    let val = window.localStorage.getItem(name)
    return val ? JSON.parse(val) : val
  },

  /**
   * 删除localStorage
   */
  removeLocalStorage (name) {
    if (!name) {return}
    window.localStorage.removeItem(name)
  },

  // 存取cookie方法
  setCookie (name,value,days,ckObj) {
    this.$cookie.set(name,value,days)
  },

  deleteCookie (name,ckObj) {
    this.$cookie.delete(name)
  },

  // 获取浏览器中原始的cookie
  getCookie (name) {
    let arr; let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    // eslint-disable-next-line no-cond-assign
    if (arr = document.cookie.match(reg)) {return unescape(arr[2])} else {return null}
  }
}
