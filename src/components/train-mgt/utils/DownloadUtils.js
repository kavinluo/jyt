/**
 * 下载方法（支持三种方式：传入系统内部的请求地址，传入系统外部的请求地址，传入文件流）
 * @param data        系统内部url / 系统外部url
 * @param filename    下载文件名称
 */
export function download(data,filename) {
  return new Promise((resolve,reject) => {
    // 如果传入的是下载地址
    if (typeof data === 'string') {
      let requestUrl = data
      // 判断是否是站外地址
      if (!/^https?:/.test(data)) {
        requestUrl = window.location.origin + data
      }
      // 站外地址使用
      let ajax = new XMLHttpRequest()
      ajax.open('GET',requestUrl,true)
      ajax.responseType = 'blob'
      ajax.onload = function (e) {
        download(e.target.response,filename)
          .then(() => {
            resolve()
          })
          .catch(() => {
            reject()
          })
      }
      ajax.send()
    } else if (data instanceof Blob) {
      // 创建a标签
      let anchor = document.createElement('a')
      // 生成blob url
      if (window.URL) {
        anchor.href = self.URL.createObjectURL(data)
      } else {
        reject('不支持window.URL')
      }
      // 设置下载文件名称
      anchor.setAttribute('download',filename)
      // 隐藏
      anchor.style.display = 'none'
      // 防止冒泡
      anchor.addEventListener('click',function (e) {
        e.stopPropagation()
      })
      document.body.appendChild(anchor)
      anchor.click()
      // 30秒后释放链接并删除a标签
      window.setTimeout(function () {
        window.URL.revokeObjectURL(anchor.href)
        document.body.removeChild(anchor)
      },30000)
      resolve()
    } else {
      console.error('该类型不支持下载')
      reject('该类型不支持下载')
    }
  })
}

/**
 * 下载Excel模板
 * @param tplName   模板名称（位于public/static/ExcelTpl下）
 * @param filename  下载的文件名称
 */
export async function downloadExcelTpl(tplName,filename) {
  await download(`/static/ExcelTpl/${tplName}`,filename)
}
export function getFulFilePath(filename) {
  const basePath = 'http://47.92.167.74:9000/knowledge/headImg/'
  return basePath+filename
}

