import request from '../utils/request'
const fsPrefix = '/api'

/**
 * 上传头像
 * @param data
 * @returns {AxiosPromise}
 */
export function uploadAvatar (data) {
  return request({
    url: `${fsPrefix}/fs/common/file/upload/avatar`,
    method: 'post',
    data
  })
}

/**
 * 上传文件
 * @param data
 * @param onUploadProgress 文件上传进度
 * @returns {AxiosPromise}
 */
export function uploadFiles (data,onUploadProgress) {
  return request({
    url: '/api/passport/infra/file/upload',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data,
    onUploadProgress
  })
}

/**
 * 上传业务文件
 * @param data
 * @param onUploadProgress 文件上传进度
 * @returns {AxiosPromise}
 */
export function uploadBizFiles (data,onUploadProgress) {
  return request({
    url: `${fsPrefix}/fs/common/bizFile/upload`,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data,
    onUploadProgress
  })
}
/**
 * 业务文件上传（上传至边缘节点本地环境）
 * @param data
 * @param onUploadProgress 文件上传进度
 * @returns {AxiosPromise}
 */
export function ekuiperEdgesUpload (data,onUploadProgress) {
  return request({
    url: '/so-fast-fs/fs/common/bizFile/ekuiperEdgesUpload',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data,
    onUploadProgress
  })
}
/**
 *业务文件上传（对象存储）
 * @param data
 * @param onUploadProgress 文件上传进度
 * @returns {AxiosPromise}
 */
export function ossUpload (data,onUploadProgress) {
  return request({
    url: '/so-fast-fs/fs/common/bizFile/ossUpload',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data,
    onUploadProgress
  })
}

/**
 * 删除业务文件
 * @param id
 * @returns {AxiosPromise}
 */
export function deleteBizFiles (id) {
  return request({
    url: `${fsPrefix}/fs/common/bizFile/delete/${id}`,
    method: 'post'
  })
}

/**
 * 根据业务ID获取文件列表
 * @param businessId
 * @param businessType
 * @returns {AxiosPromise}
 */
export function getBizFileList (businessId,businessType) {
  return request({
    url: `${fsPrefix}/fs/common/bizFile/list`,
    method: 'get',
    params: {
      businessId,
      businessType
    }
  })
}
