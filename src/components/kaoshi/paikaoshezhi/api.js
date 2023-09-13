let thisFile = '/paper/examArrange/'
let thisFiles = '/paper/examArrangePlace/'
let thisUser = '/paper/examArrangePlaceUser/'
let api = {
  listPage: {
    path: thisFile + 'listPage',
    method: 'get'
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
  removeList: {
    path: thisFile + 'remove/',
    method: 'delete'
  },
  modifyStatus: {
    path: thisFile + 'modifyStatus/',
    method: 'put'
  },
  placeListPage: {
    path: thisFiles + 'listPage',
    method: 'get'
  },
  placeModify: {
    path: thisFiles + 'modify/',
    method: 'put'
  },
  userListPage: {
    path: thisUser + 'listPage',
    method: 'get'
  },
  removeUser: {
    path: thisUser + 'remove/',
    method: 'delete'
  },
  removePlace: {
    path: thisFiles + 'remove/',
    method: 'delete'
  }

}
export default api
