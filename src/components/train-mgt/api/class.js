import request from '../utils/request'

export function getList (params) {
  return request({
    url: '/api/course/trainCourseClass/getPageClass',
    method: 'get',
    params
  })
}

export function create (params) {
  return request({
    url: '/api/course/trainCourseClass/add',
    method: 'post',
    data: params
  })
}
export function update (params) {
  return request({
    url: '/api/course/trainCourseClass/update',
    method: 'put',
    data: params
  })
}

export function del (ids) {
  return request({
    url: '/api/course/trainCourseClass/removeById/' + ids,
    method: 'delete'
  })
}

export function updateBatch (params) {
  return request({
    url: '/api/course/trainCourseClass/updateBatch',
    method: 'put',
    data: params
  })
}
//获取附件
export function getAnnexData(data) {
  return request({
    url: '/api/course/appTrainCourseAnnex/getAnnexData',
    method: 'get',
    data:data
  })
}
