import request from '../utils/request'

export function getList (params) {
  return request({
    url: '/api/course/trainHome/getTrainHomeDataByPage',
    method: 'get',
    data: params
  })
}

export function create (params) {
  return request({
    url: '/api/course/trainHome/add',
    method: 'post',
    data: params
  })
}
export function update (params) {
  return request({
    url: '/api/course/trainHome/update',
    method: 'put',
    data: params
  })
}

export function del (ids) {
  return request({
    url: '/api/course/trainHome/remove/' + ids,
    method: 'delete'
  })
}

