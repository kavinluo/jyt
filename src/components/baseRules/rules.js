import baseRules from '../formRules/base' // 公共规则

/*
  登录表单
*/
let loginRules = {
  // account: baseRules.required, // 用户名
  // password: baseRules.required, // 密码
  // mobile: [baseRules.mobile, { required: true, message: '手机号不能为空', trigger: 'blur'}], // 手机号
  // scene: baseRules.required, // 验证码
  newPassword: baseRules.required, // 新密码
  newPasswords: baseRules.required
}
/**
 * 住院医 - 专业基地
 **/
let jdManagement = {
  jdName: baseRules.required, // 基地名称
  jdProclass: baseRules.required, // 基地专业
  jdZrUsername: baseRules.requiredNoEvent, // 基地主任
  jdDep: [ // 基地科室,
    {
      type: 'array',required: true,message: '请至少添加一个科室'
    }]
}

// 档案完善时基本信息追加必填项
let basicAddRules = {
  sex: baseRules.requiredNoEvent,
  nation: baseRules.requiredNoEvent,
  birth: baseRules.requiredNoEvent,
  grade: baseRules.requiredNoEvent,
  origin: baseRules.requiredNoEvent,
  political: baseRules.requiredNoEvent,
  highestEdu: baseRules.requiredNoEvent,
  specialty: baseRules.requiredNoEvent,
  // school:baseRules.requiredNoEvent,
  idNumber: baseRules.requiredNoEvent,
  mobile: [baseRules.requiredNoEvent,baseRules.mobile],
  email: [baseRules.requiredNoEvent,baseRules.email],
  emgContact: baseRules.requiredNoEvent,
  emgContactMobile: [baseRules.requiredNoEvent,baseRules.mobile]
}

// 菜单树
let tree = {
  name: [baseRules.requiredNoEvent,{validator: baseRules.inputLen(1,50)}],
  remark: [baseRules.requiredNoEvent,{validator: baseRules.inputLen(1,50)}]
}

/**
 *  系统设置- 科室管理
 **/
let nosocomialList = {
  name: [{validator: baseRules.inputLen(0,20)},{validator: baseRules.illegalChar()}], // 科室名称
  code: [{validator: baseRules.inputLen(0,20)},{validator: baseRules.illegalChar()}], // 编号
  director: [{validator: baseRules.inputLen(0,20)},{validator: baseRules.illegalChar()}], // 科室主任
  secretary: [{validator: baseRules.inputLen(0,20)},{validator: baseRules.illegalChar()}], // 教学秘书
  nurse: [{validator: baseRules.inputLen(0,20)},{validator: baseRules.illegalChar()}], // 护士长
  capacity: [{validator: baseRules.inputLen(0,20)},{validator: baseRules.illegalChar()}] // 承载量

}
let nosocomial = {
  name: [baseRules.requiredNoEvent,{validator: baseRules.inputLen(0,50)},{validator: baseRules.illegalChar()}] // 科室名称
  // code:[baseRules.requiredNoEvent,baseRules.inputLen(0,50),baseRules.illegalChar()],   //编号
  // director:[baseRules.requiredNoEvent],   //科室主任
  // secretary:[baseRules.requiredNoEvent,],   //教学秘书
  // nurse:[baseRules.requiredNoEvent],   //护士长
  // ssyCapacity:[baseRules.requiredNoEvent,baseRules.greaterThanZero2,baseRules.inputLen(0,20)],   //实习生承载量
  // yjsCapacity:[baseRules.requiredNoEvent,baseRules.greaterThanZero2,baseRules.inputLen(0,20)],   //研究生承载量
  // zyyCapacity:[baseRules.requiredNoEvent,baseRules.greaterThanZero2,baseRules.inputLen(0,20)],   //住院医承载量
  // jxsCapacity:[baseRules.requiredNoEvent,baseRules.greaterThanZero2,baseRules.inputLen(0,20)],   //进修生承载量

}

/**
 *  系统设置- 分组管理
 **/
let groupList = {
  name: [{validator: baseRules.inputLen(0,20)},{validator: baseRules.illegalChar()}] // 组名称

}
let group = {
  name: [baseRules.requiredNoEvent,{validator: baseRules.inputLen(0,50)},{validator: baseRules.illegalChar()}], // 科室名称
  remark: [{validator: baseRules.inputLen(0,50)},{validator: baseRules.illegalChar()}] // 科室名称

}
/**
 *  系统设置- 来源单位
 **/
let sourceUnitList = {
  name: [{validator: baseRules.inputLen(0,20)},{validator: baseRules.illegalChar()}], // 名称
  contacts: [{validator: baseRules.inputLen(0,20)},{validator: baseRules.illegalChar()}] // 联系人
}
let sourceUnit = {
  name: [baseRules.requiredNoEvent,{validator: baseRules.inputLen(0,50)},{validator: baseRules.illegalChar()}], // 单位名称
  contacts: [{validator: baseRules.inputLen(0,50)},{validator: baseRules.illegalChar()}], // 联系人
  phone: [baseRules.mobile], // 联系电话
  remark: [{validator: baseRules.inputLen(0,500)},{validator: baseRules.illegalChar()}] // 备注
}
let systemLog = {
  account: [{validator: baseRules.inputLen(0,20)},{validator: baseRules.illegalChar()}], // 操作账号
  userName: [{validator: baseRules.inputLen(0,20)},{validator: baseRules.illegalChar()}], // 操作人
  ip: [{validator: baseRules.ip}] // 操作ip
}

// 部门调动
let depMoveUser = {
  originalName: [{ required: true,message: '原科室不能为空'}],
  targetDepName: [{ required: true,message: '目标科室不能为空'}],
  userIds: [{ required: true,message: '未选被调人员,请选择左侧原科室并选择相应的被调人员'}]
}
let stationSet = {
  examTime: [baseRules.requiredNoEvent,{validator: baseRules.numbers},{validator: baseRules.numberSection(1,999)}],
  syncUser: baseRules.requiredNoEvent,
  stationIndex: [baseRules.required,{validator: baseRules.inputLen(1,6)}],
  stationContext: [baseRules.required,{validator: baseRules.inputLen(1,20)}],
  examType: baseRules.requiredNoEvent,
  examCategory: baseRules.required,
  subitemTime1: baseRules.number,
  subitemTime2: baseRules.number
}

export {
  jdManagement,
  basicAddRules,
  tree,
  systemLog,
  nosocomialList,
  nosocomial,

  groupList,
  group,

  sourceUnitList,
  sourceUnit,
  depMoveUser,
  stationSet,
  loginRules
}
