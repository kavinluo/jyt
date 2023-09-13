let knowledgeApi = {
  knowledgeConfigListPage: { // 知识库模板维护分页信息获取
    path: '/knowledge/knowledgeConfig/listPage',
    method: 'get'
  },
  deleteKnowledgeConfig: { // 知识库模板维护信息删除
    path: '/knowledge/knowledgeConfig/remove/',
    method: 'delete'
  },
  addKnowledgeConfig: { // 知识库模板维护信息新增
    path: '/knowledge/knowledgeConfig/add',
    method: 'post'
  },
  updateKnowledgeConfig: { // 知识库模板维护信息修改
    path: '/knowledge/knowledgeConfig/modify/',
    method: 'put'
  },
  getKnowledgeConfigSubList: { // 知识库模板维护分栏信息获取
    path: '/knowledge/knowledgeConfigSub/listMap',
    method: 'get'
  },
  addKnowledgeConfigSub: { // 知识库模板维护分栏信息添加或者修改
    path: '/knowledge/knowledgeConfigSub/add',
    method: 'post'
  },
  delKnowledgeConfigSubAttr: { // 删除分栏属性行
    path: '/knowledge/knowledgeConfigSubAttr/remove/',
    method: 'delete'
  },
  delKnowledgeConfigSub: { // 删除分栏
    path: '/knowledge/knowledgeConfigSub/remove/',
    method: 'delete'
  },
  getKnowledgeKeywordList: { // 分页查询知识库_关键字
    path: '/knowledge/knowledgeKeyword/listPage',
    method: 'get'
  },
  removeKnowledgeKeywordList: { // 删除知识库_关键字
    path: '/knowledge/knowledgeKeyword/remove/',
    method: 'delete'
  },
  labelKeyKnowledgeKeyword: { // 关键字标注
    path: '/knowledge/knowledgeKeyword/labelKey/',
    method: 'get'
  },
  getknowledgeClumnTree: { // 获取知识库栏目
    path: '/knowledge/knowledgeClumn/tree',
    method: 'get'
  },
  getknowledgeClumnTreeContetn: { // 获取知识库树的内容
    path: '/knowledge/knowledgeTree/listMap',
    method: 'get'
  },
  saveknowledgeClumnTreeContetn: { // 保存知识库树的内容
    path: '/knowledge/knowledgeTree/add',
    method: 'post'
  },
  updateknowledgeClumnTreeContetn: { // 更新知识库树的内容
    path: '/knowledge/knowledgeTree/update',
    method: 'put'
  },
  getknowledgeContetnClumn: { // 获取知识库内容模板
    path: '/knowledge/knowledgeConfigSub/listContentMap',
    method: 'get'
  },
  saveknowledgeContent: { // 保存知识库内容信息
    path: '/knowledge/knowledgeContent/add',
    method: 'post'
  },
  getknowledgeContentList: { // 获取知识库内容列表
    path: '/knowledge/knowledgeContent/listPage',
    method: 'get'
  },
  updateknowledgeContent: { // 更新知识库内容信息
    path: '/knowledge/knowledgeContent/modify/',
    method: 'put'
  },
  delknowledgeContent: { // 中医知识库内容删除
    path: '/knowledge/knowledgeContent/remove/',
    method: 'delete'
  },
  knowledgeFileUpload: { // 文件上传(不需要处理的文件)
    path: '/knowledge/knowledgeInfra/file/uploadFile',
    method: 'post'
  },
  knowledgeExcelFileUpload: { // 中医内容文件上传（不要永久存储，需要实时处理的文件）
    path: '/knowledge/knowledgeInfra/file/upload',
    method: 'post'
  },
  knowledgeExcelFileUploadToUpdate: { // 中医内容文件上传（不要永久存储，需要实时处理的文件）
    path: '/knowledge/knowledgeInfra/file/update',
    method: 'post'
  },
  addKnowledgeConfigShow: { // 添加知识库_配置_展示维护
    path: '/knowledge/knowledgeConfigShow/add',
    method: 'post'
  },
  updataKnowledgeConfigShow: { // 修改知识库_配置_展示维护
    path: '/knowledge/knowledgeConfigShow/modify/',
    method: 'post'
  },
  queryKnowledgeConfigShowList: { // 获取知识库_配置_展示列表
    path: '/knowledge/knowledgeConfigShow/listPage',
    method: 'get'
  },
  queryKnowledgeConfigShow: { // 修改知识库_配置_展示维护
    path: '/knowledge/knowledgeConfigShow/get/',
    method: 'get'
  },
  removeKnowledgeConfigShow: { // 修改知识库_配置_删除
    path: '/knowledge/knowledgeConfigShow/remove/',
    method: 'delete'
  },
  updataKnowledgeConfigShowStatus: { // 修改知识库_配置_停用或者启用
    path: '/knowledge/knowledgeConfigShow/status/',
    method: 'get'
  },
  queryKnowledgeContentNoteList: { // 获取笔记的列表
    path: '/knowledge/knowledgeContentNote/listPage',
    method: 'get'
  },
  delKnowledgeContentNote: { // 删除知识库笔记
    path: '/knowledge/knowledgeContentNote/remove/',
    method: 'delete'
  },
  getKnowledgeContentNote: { // 获得单个知识库_内容_笔记
    path: '/knowledge/knowledgeContentNote/get/',
    method: 'get'
  },
  queryContentCommentList: { // 获取评论列表
    path: '/knowledge/knowledgeContentComment/listPage',
    method: 'get'
  },
  delContentComment: { // 删除知识库笔记
    path: '/knowledge/knowledgeContentComment/remove/',
    method: 'delete'
  },
  queryContentReportList: { // 获取举报列表
    path: '/knowledge/knowledgeContentReport/listPage',
    method: 'get'
  },
  delContentReport: { // 删除知识库举报
    path: '/knowledge/knowledgeContentReport/remove/',
    method: 'delete'
  },
  queryContentErrorList: { // 获取内容纠错列表
    path: '/knowledge/knowledgeContentError/listPage',
    method: 'get'
  },
  delContentError: { // 删除内容纠错
    path: '/knowledge/knowledgeContentError/remove/',
    method: 'delete'
  },
  knowledgeContentRecordList: { // 收藏、浏览量维护列表
    path: '/knowledge/knowledgeContent/knowledgeContentRecordList',
    method: 'get'
  },
  updataContentRecord: { // 收藏、浏览量维护列表
    path: '/knowledge/knowledgeContent/updataContent/',
    method: 'put'
  },
  knowledgeConfigVipList: { // 会员功能设置列表
    path: '/knowledge/knowledgeConfigVip/listPage',
    method: 'get'
  },
  addKnowledgeConfigVip: { // 会员功能设置添加
    path: '/knowledge/knowledgeConfigVip/add',
    method: 'post'
  },
  delKnowledgeConfigVip: { // 会员功能设置删除
    path: '/knowledge/knowledgeConfigVip/remove/',
    method: 'delete'
  },
  dowContentExcelFile: { // 下载知识库内容Excel文件
    path: '/knowledge/knowledgeContent/export',
    method: 'get'
  },
  uploadAliyunFile: { // 上传文件到阿里云服务器
    path: '/knowledge/knowledgeInfra/file/uploadAliyunFile',
    method: 'post'
  }
}
export default knowledgeApi
