const makePaper = {
  state: {
    firstStepContent: {}, // 活动设置第一步数据
    secondStepContent: {}, // 活动设置第二步数据
    firstStepContents: {}
  },
  mutations: {
    setFirstStepContent (state,content) {
      state.firstStepContent = content
    },
    setSecondStepContent (state,content) {
      state.secondStepContent = content
    },
    setfirstStepContents (state,content) {
      state.firstStepContents = content
    }
  },
  getters: {
    getFirstStepContent: state => {
      return state.firstStepContent
    },
    getSecondStepContent (state,content) {
      return state.secondStepContent
    },
    getfirstStepContents (state,content) {
      return state.firstStepContents
    }
  },
  actions: {}
}

export default makePaper
