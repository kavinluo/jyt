export function deepClone (source, noClone = []) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys) => {
    if (
      source[keys] &&
      typeof source[keys] === 'object' &&
      noClone.indexOf(keys) === -1
    ) {
      targetObj[keys] = deepClone(source[keys], noClone)
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}
/**
 * 截取URL参数
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj (url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}
/**
 * 防抖
 * @param {function, number} fn
 * @returns {Function}
 */
export function debounce (fn, wait) {
  const time = wait || 1000
  let timer = null
  return function () {
    let that = this
    let args = arguments
    if(timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function () {
      timer = null
      fn.apply(that, args)
    }, time)
  }
}
/**
 * 节流
 * @param {function, number} fn,wait
 * @returns {Function}
 */
export function throttle (fn, wait = 1000) {
  let last
  let timer
  return function () {
    const th = this
    const args = arguments
    const now = +new Date()
    if (last && now - last < wait) {
      clearTimeout(timer)
      timer = setTimeout(function () {
        last = now
        fn.apply(th, args)
      }, wait)
    } else {
      last = now
      fn.apply(th, args)
    }
  }
}

