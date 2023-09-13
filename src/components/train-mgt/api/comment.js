import request from '../utils/request'

export function getList (params) {
  return request({
    url: '/api/course/trainComment/getPageCommentList',
    method: 'get',
    params
  })
}

export function del (ids) {
  return request({
    url: '/api/course/trainComment/removeCommentByIds/'+ids,
    method: 'delete'
  })
}
export function add(params) {
  return request({
    url: '/api/course/trainComment/add',
    method: 'post',
    data: params
  })
}

