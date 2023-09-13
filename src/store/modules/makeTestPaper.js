const makePaper = {
  state: {
    styleContent: {}, // 样式设置内容
    contentData: {}, // 内容设置数据
    tempContent: {}, // 内容设置  辅助数据
    paperInformation: [], // 手工组卷 试卷信息
    editFirst: '' // 手工组卷 第二步 是否首次 进入修改页面
  },
  mutations: {
    setStyleContent (state,content) {
      state.styleContent = content
    },
    setContentData (state,content) {
      state.contentData = content
    },
    setTempContent (state,content) {
      state.tempContent = content
    },
    setPaperInformation (state,content) {
      state.paperInformation = content
    },
    setEditFirst (state,content) {
      state.editFirst = content
    }
  },
  getters: {
    getStyleContent: state => {
      return state.styleContent
    },
    getContentData: state => {
      return state.contentData
    },
    getTempContent: state => {
      return state.tempContent
    },
    getPaperInformation: state => {
      return state.paperInformation
    },
    getEditFirst: state => {
      return state.editFirst
    }
  },
  actions: {
    /* onLoading (context, flag) {
      context.commit('setFullLoading', flag)
    } */
  }
}

export default makePaper
