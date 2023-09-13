import baseRules from '../../formRules/base' // 公共规则

/*
  登录表单
*/
let intelligentPaper = {
  name: baseRules.required,
  paperRanNum: baseRules.selectId,
  paperTmOrder: baseRules.required,
  paperTime: [baseRules.required,{validator: baseRules.numbers}]
}
// 创建试题
let newTopic = {
  tmKnowledge: [baseRules.requiredNoEvent,{validator: baseRules.inputLen(1,50)}],
  tmDifficulty: baseRules.selectText,
  tmMark: [baseRules.required,{validator: baseRules.numbers}],
  tmTypeId: baseRules.selectId,
  tmRequire: baseRules.selectText
}

export {
  intelligentPaper,
  newTopic
}
