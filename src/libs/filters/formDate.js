import Vue from 'vue'
import filters from './formDate.js'
import dictionary from '@/libs/dictionary.js'
export function filterTime (time) {
  const date = new Date(time)
  const Y = date.getFullYear()
  const M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  const D = date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()
  const H = date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()// 小时
  const F = date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()// 分钟
  return `${Y}-${M}-${D} ${H}:${F}`
}
export function dict (filterStr,filterNm) {
  let getStr = String(filterStr)
  let returnVal = ''
  const dicAry = Object.entries(dictionary)
  if (!getStr.includes(',')) {
    dicAry.forEach(item => {
      if (filterNm === item[0]) {
        Object.entries(item[1]).forEach(forItem => {
          if (getStr === forItem[0]) {
            returnVal = forItem[1]
          }
        })
      }
    })
  } else {
    // 这里是如果返回的状态存在多个，以逗号','返回的状态说明就是多个说明拼接起来的
    let strAry = getStr.split(',')
    strAry.forEach(item => {
      dicAry.forEach(item2 => {
        if (filterNm === item2[0]) {
          Object.entries(item2[1]).forEach(forItem => {
            if (item === forItem[0]) {
              returnVal += forItem[1]
            }
          })
        }
      })
    })
  }
  return returnVal
}
export default { filterTime,dict }
Object.keys(filters).map(k=>{
  Vue.filter(k,filters[k])
})
