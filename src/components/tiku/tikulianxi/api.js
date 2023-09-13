// 访问前缀
let thisFile = '/tkmanage'
let api = {
  removeTree: thisFile + '/examTree/remove/',
  getExamTree: {
    path: thisFile + '/examTree/get/',
    method: 'get'
  },
  modifyExamTree: {
    path: thisFile + '/examTree/modify/',
    method: 'put'
  },
  addTree: {
    path: thisFile + '/examTree/add',
    method: 'post'
  },
  statistic: {
    path: thisFile + '/examTree/statisticAppTree',
    method: 'post'
  },
  getlistPage: {
    path: thisFile + '/examTmType/listPage',
    method: 'post'
  }
}

export default api
