import Vuex from 'vuex'
import Axios from "axios";
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
      showModal: true,
      userId: 0,
      userDetail: []

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
    async getUserData ({ state, commit }) {
      await Axios.post("http://localhost:8090/api/v1/user/userDetail", {
          /* id: state.userId */
          id: 2

      }).then((response) => {
        console.log("getUserData : " + JSON.stringify(response.data));

        state.userDetail = response.data;
      }).catch(function (error) {
        console.log("error : " + error)
      });
    }

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