import Vuex from 'vuex'
/*     async incrementA (state) {
      console.log("call incrementA")
      console.log("before state.count : " + state.count)
      state.count++;
      state.count2++;
      console.log("after state.count : " + state.count)
  },
  async incrementB ({commit}) {
    console.log("call incrementB")
    await commit('incrementA')
} */

export const store = new Vuex.Store({
  state: {
      count: 0,
      count2: 10,
      showModal: false,
      userId: 0
  },
  mutations: {

    increment (state) {
      console.log("before state.count : " + state.count)
      state.count++;
      state.count2++;
      console.log("after state.count : " + state.count)
  },
    showModal (state) {
      state.showModal = !state.showModal
  },
  setUserId (state, userId) {
    state.userId = userId
  }
  },
  actions: {

  }
});

/* async actionA ({ commit }) {
  console.log("call actionA")
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      commit('increment')
      resolve()
    }, 1000)
  })
},
async actionB ({ dispatch, commit }) {
  console.log("call actionB")
  await dispatch('actionA') // actionA가 끝나기를 기다립니다.
}
 */