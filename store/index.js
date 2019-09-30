
export const state = () => ({
  counter: 0
})

export const mutations = {
  increment (state) {
    state.counter++
  }
}

export const actions = {
    async nuxtServerInit ({ commit, dispatch }, { req }) {
        await dispatch('wp/loadInitialData');
        await dispatch('user/loadInitialData', {req});
//        await dispatch('workflow/loadInitialData', {req});
    },
//    initOnClient(context, data) {
//    }
    helloClientInit(context) {
//        context.commit('user/loadFromStorageLoggedUserJWT')
    }
}


