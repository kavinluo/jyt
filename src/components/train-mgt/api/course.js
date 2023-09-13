import request from '../utils/request'

export function getList (params) {
  return request({
    url: '/api/course/trainContent/getPageContent',
    method: 'get',
    params
  })
}

export function create (params) {
  return request({
    url: '/api/course/trainContent/add',
    method: 'post',
    data: params
  })
}
export function update (params) {
  return request({
    url: '/api/course/trainContent/update',
    method: 'put',
    data: params
  })
}

export function del (ids) {
  return request({
    url: '/api/course/trainContent/remove/' + ids,
    method: 'delete'
  })
}

export function updateBatch (params) {
  return request({
    url: '/api/course/trainContent/updateBatch',
    method: 'put',
    data: params
  })
}

export function getLiveUrl (params) {
  return request({
    url: '/api/course/api/v1/live/getLiveJumpUrl',
    method: 'post',
    data: params
  })
}
export function getExamTree(params) {
  return request({
    // url: '/api/tkmanage/app/examTree/tree',
    url: '/api/tkmanage/examTree/list',
    method: 'get',
    params
  })
}

export function sort(params) {
  return request({
    url: '/api/course/trainContent/sort',
    method: 'get',
    params
  })
}

