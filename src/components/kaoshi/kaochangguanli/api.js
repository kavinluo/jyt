// 访问前缀
let thisFile = '/paper/examPlace/'
let api = {
  listPage: {
    path: thisFile + 'listPage',
    method: 'get'
  },
  removeList: {
    path: thisFile + 'remove/',
    method: 'delete'
  },
  addList: {
    path: thisFile + 'add',
    method: 'post'
  },
  editList: {
    path: thisFile + 'modify/',
    method: 'put'
  },
  getList: {
    path: thisFile + 'get/',
    method: 'get'
  },
  import: {
    path: thisFile + 'importExamPlace',
    method: 'post'
  }
}

export default api
