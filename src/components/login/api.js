// 访问前缀
let thisFile = '/passport'
let api = {
  authPhone: {
    path: thisFile + '/auth/send-sms-code',
    method: 'post'
  },
  resetPassword: {
    path: thisFile + '/auth/reset-password',
    method: 'post'
  }
}

export default api
