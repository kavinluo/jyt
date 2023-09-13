const tagsView = {
  state: {
    tagsList: [],
    cacheViews: []
  },
  mutations: {
    ADD_TAGS_VIEWS: (state,route) => {
      if (state.tagsList.some(v => v.path === route.path)) {return}
      state.tagsList.push(Object.assign({},route,{
        title: route.meta.title || 'no-name'
      }))
      if(!route.meta.noCache) {
        state.cacheViews.push(route.name)
      }
    },
    DEL_TAGS_VIEWS: (state,route) => {
      for (const [i,v] of state.tagsList.entries()) {
        if(v.path === route.path) {
          state.tagsList.splice(i,1)
          break
        }
      }
      for (const i of state.cacheViews) {
        if(i === route.name) {
          const index = state.cacheViews.indexOf(i)
          state.cacheViews.splice(index,1)
          break
        }
      }
    }
  },
  actions: {
    addVisitedViews ({ commit },route) {
      return new Promise((resolve,reject) => {
        try {
          commit('ADD_TAGS_VIEWS',route)
          resolve()
        } catch {
          reject()
        }
      })
    },
    delVisitedViews ({ commit,state },route) {
      return new Promise((resolve,reject) => {
        try {
          commit('DEL_TAGS_VIEWS',route)
          resolve([...state.tagsList])
        } catch {
          reject()
        }
      })
    }
  }
}

export default tagsView
