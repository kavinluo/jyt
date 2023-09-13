// 访问前缀
let thisFile = '/mark/admin/examMark/console/'
let examCode = '/mark/admin/examReExamCode/'
let examPaper = '/mark/admin/examPaperQrcodeSign/'
let api = {
  listPage: {
    path: '/paper/examArrangePlaceMonitor/listPage',
    method: 'get'
  },
  conListPage: {
    path: thisFile + 'listPage',
    method: 'get'
  },
  importExcel: {
    path: thisFile + 'export',
    method: 'get'
  },
  modifyStatus: {
    path: thisFile + 'modifyStatus/',
    method: 'put'
  },
  codeListPage: {
    path: examCode + 'listPage',
    method: 'get'
  },
  addCode: {
    path: examCode + 'add',
    method: 'post'
  },
  exportCode: {
    path: examCode + 'export',
    method: 'get'
  },
  examPaperList: {
    path: examPaper + 'listPage',
    method: 'get'
  },
  removeList: {
    path: examCode + 'remove/',
    method: 'delete'
  },
  imgCode: {
    path: '/mark/admin/examPaperQrcode/createPaperBase64Qrcode/',
    method: 'post'
  },
  listMissExamPage: {
    path: thisFile + 'listMissExamPage',
    method: 'get'
  }
}

export default api
