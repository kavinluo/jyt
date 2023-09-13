import baseRules from '../../formRules/base' // 公共规则

// 创建试题
let newTopic = {
  tmKnowledge: [baseRules.requiredNoEvent,{validator: baseRules.inputLen(1,50)}],
  tmDifficulty: baseRules.selectText,
  tmMark: [baseRules.required,{validator: baseRules.numbers}],
  tmTypeId: baseRules.selectId,
  tmRequire: baseRules.selectText
}
export {
  newTopic
}
