const loadingFun = {
  state: {
    isLoading: false
  },
  mutations: {
    setFullLoading (state,flag) {
      state.isLoading = flag
    }
  },
  getters: {
    getFullLoading: state => {
      return state.isLoading
    }
  },
  actions: {
    onLoading (context,flag) {
      context.commit('setFullLoading',flag)
    }
  }
}

export default loadingFun
