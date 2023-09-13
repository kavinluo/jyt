import request from '../utils/request'

export function getTreeList (params) {
  return request({
    url: '/api/course/trainTree/getTreeData',
    method: 'get',
    params
  })
}

export function create (params) {
  return request({
    url: '/api/course/trainTree/add',
    method: 'post',
    data: params
  })
}
export function update (params) {
  return request({
    url: '/api/course/trainTree/update',
    method: 'put',
    data: params
  })
}

export function del (ids) {
  return request({
    url: '/api/course/trainTree/remove/' + ids,
    method: 'delete'
  })
}

