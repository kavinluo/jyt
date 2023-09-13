// eslint-disable-next-line no-unused-vars
const templateBank = { // 知识库模板
  path: 'templateBank',
  name: 'templateBank',
  meta: {requireAuth: false},
  component: resolve=> {
    require.ensure([],() => {
      resolve(require('_c/knowledgeManger/templateBank/templateBankList'))
    },'templateBank')
  }
}

const keyWords = { // 关键字维护
  path: 'keyWords',
  name: 'keyWords',
  meta: {requireAuth: false},
  component: resolve=> {
    require.ensure([],() => {
      resolve(require('_c/knowledgeManger/keyWords/keyWordsList'))
    },'keyWords')
  }
}

const chineseMedicine = { // 中药管理
  path: 'chineseMedicine',
  name: 'chineseMedicine',
  meta: {requireAuth: false},
  component: resolve=> {
    require.ensure([],() => {
      resolve(require('_c/knowledgeManger/chineseMedicine/chineseMedicineList'))
    },'chineseMedicine')
  }
}

const prescription = { // 方剂管理
  path: 'prescription',
  name: 'prescription',
  meta: {requireAuth: false},
  component: resolve=> {
    require.ensure([],() => {
      resolve(require('_c/knowledgeManger/chineseMedicine/chineseMedicineList'))
    },'prescription')
  }
}

const KnowledgeContentNote = { // 课堂笔记管理
  path: 'KnowledgeContentNote',
  name: 'KnowledgeContentNote',
  meta: {requireAuth: false},
  component: resolve=> {
    require.ensure([],() => {
      resolve(require('_c/knowledgeManger/KnowledgeContentNote/KnowledgeContentNoteList'))
    },'KnowledgeContentNote')
  }
}
const KnowledgeContentComment = { // 评论查看
  path: 'KnowledgeContentComment',
  name: 'KnowledgeContentComment',
  meta: {requireAuth: false},
  component: resolve=> {
    require.ensure([],() => {
      resolve(require('_c/knowledgeManger/KnowledgeContentComment/KnowledgeContentCommentList'))
    },'KnowledgeContentComment')
  }
}
const KnowledgeContentReport = { // 举报内容管理
  path: 'KnowledgeContentReport',
  name: 'KnowledgeContentReport',
  meta: {requireAuth: false},
  component: resolve=> {
    require.ensure([],() => {
      resolve(require('_c/knowledgeManger/KnowledgeContentReport/KnowledgeContentReport_list'))
    },'KnowledgeContentReport')
  }
}

const KnowledgeConfigVip = { // 会员功能设置
  path: 'KnowledgeConfigVip',
  name: 'KnowledgeConfigVip',
  meta: {requireAuth: false},
  component: resolve=> {
    require.ensure([],() => {
      resolve(require('_c/knowledgeManger/KnowledgeConfigVip/KnowledgeConfigVip_list'))
    },'KnowledgeConfigVip')
  }
}

const KnowledgeContentRecord = { // 收藏、浏览量维护
  path: 'KnowledgeContentRecord',
  name: 'KnowledgeContentRecord',
  meta: {requireAuth: false},
  component: resolve=> {
    require.ensure([],() => {
      resolve(require('_c/knowledgeManger/KnowledgeContentRecord/KnowledgeContentRecord_list'))
    },'KnowledgeContentRecord')
  }
}

const KnowledgeContentError = { // 内容纠错
  path: 'KnowledgeContentError',
  name: 'KnowledgeContentError',
  meta: {requireAuth: false},
  component: resolve=> {
    require.ensure([],() => {
      resolve(require('_c/knowledgeManger/KnowledgeContentError/KnowledgeContentError_list'))
    },'KnowledgeContentError')
  }
}

const KnowledgeAppconfig = { // 知识库APP配置
  path: 'KnowledgeAppconfig',
  name: 'KnowledgeAppconfig',
  meta: {requireAuth: false},
  component: resolve=> {
    require.ensure([],() => {
      resolve(require('_c/knowledgeManger/KnowledgeAppconfig/KnowledgeAppconfigList'))
    },'KnowledgeAppconfig')
  }
}

const KnowledgeConfigHome = { // 知识库首页Banner配置
  path: 'KnowledgeConfigHome',
  name: 'KnowledgeConfigHome',
  meta: {requireAuth: false},
  component: resolve=> {
    require.ensure([],() => {
      resolve(require('_c/knowledgeManger/KnowledgeConfigHome/index'))
    },'KnowledgeConfigHome')
  }
}
const book = { // 经典书城
  path: 'book',
  name: 'book',
  meta: {requireAuth: false},
  component: resolve=> {
    require.ensure([],() => {
      resolve(require('_c/knowledgeManger/chineseMedicine/chineseMedicineList'))
    },'book')
  }
}

const acupoint = { // 穴位管理
  path: 'acupoint',
  name: 'acupoint',
  meta: {requireAuth: false},
  component: resolve=> {
    require.ensure([],() => {
      resolve(require('_c/knowledgeManger/chineseMedicine/chineseMedicineList'))
    },'acupoint')
  }
}

const dictionaries = { // 词典管理
  path: 'dictionaries',
  name: 'dictionaries',
  meta: {requireAuth: false},
  component: resolve=> {
    require.ensure([],() => {
      resolve(require('_c/knowledgeManger/chineseMedicine/chineseMedicineList'))
    },'dictionaries')
  }
}

const celebrity = { // 名家讲堂
  path: 'celebrity',
  name: 'celebrity',
  meta: {requireAuth: false},
  component: resolve=> {
    require.ensure([],() => {
      resolve(require('_c/knowledgeManger/chineseMedicine/chineseMedicineList'))
    },'celebrity')
  }
}

export {
  templateBank,
  keyWords,
  chineseMedicine,
  prescription,
  KnowledgeContentNote,
  KnowledgeContentComment,
  KnowledgeContentReport,
  KnowledgeConfigVip,
  KnowledgeContentRecord,
  KnowledgeContentError,
  KnowledgeAppconfig,
  KnowledgeConfigHome,
  book,acupoint,dictionaries,celebrity}
