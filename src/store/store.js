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
      showModifyModal: true,
      showRoleListModal: false,
      userId: 0,
      userDetail: [],
      exceptRoleList: [0],
      roleList: [],
      updateRoleList: [],
      roleUserSave: []

  },
  mutations: {

    increment (state) {
      console.log("before state.count : " + state.count)
      state.count++;
      state.count2++;
      console.log("after state.count : " + state.count)
  },
    showModifyModal (state) {
      state.showModifyModal = !state.showModifyModal
  },
  showRoleListModal (state) {
    state.showRoleListModal = !state.showRoleListModal
},
  setUserId (state, userId) {
    state.userId = userId
  }
  ,
  setUserDetail (state, userDetails) {
    state.userDetail = userDetails
  },
  setUserName (state, roleList) {
    state.userDetail.userName = roleList
  }
  ,
  setRoleUser (state, filterRoleUser) {
    state.userDetail.roleUser = filterRoleUser
  },
  setExceptRoleIds (state, exceptRoleIds) {
    state.exceptRoleList = exceptRoleIds;
    //Object.assign(state.userDetail.exceptRoleList, exceptRoleIds)
  },
  setRoleList (state, roleList) {
    state.roleList = roleList
  },
  addUpdateRoleList (state, updateRoleList) {
    state.updateRoleList.push(updateRoleList)
  },
  removeUpdateRoleList (state, updateRoleList) {
    state.updateRoleList.pop(updateRoleList)
  },
  updateRoleUser (state) {
    console.log("updateRoleUser  "+ JSON.stringify(store.state.updateRoleList[0]))
    store.state.updateRoleList.map((roles) =>{
      //Object.assign(exceptRoleIds.value, roles.id);
      state.userDetail.roleUser.push(roles)
  })

    //Object.assign(state.userDetail.roleUser, state.updateRoleList)
  }

  ,
  setRoleUserSave (state, roleUserSave) {
    state.roleUserSave = roleUserSave;
    //Object.assign(state.userDetail.roleUser, state.updateRoleList)
  }
  ,
  },
  actions: {
    async getUserData ({ state, commit }) {
      await Axios.post("http://localhost:8090/api/v1/user/userDetail", {
          /* id: state.userId */
          id: 2

      }).then((response) => {
        console.log("getUserData : " + JSON.stringify(response.data));

        commit("setUserDetail", response.data);
      }).catch(function (error) {
        console.log("error : " + error)
      });
    },
    async getRoleList ({ state, commit }) {
      console.log("state.exceptRoleList : " + JSON.stringify(state.exceptRoleList));
      await Axios.post("http://localhost:8090/api/v1/user/roleList", state.exceptRoleList).then((response) => {
        console.log("getRoleList : " + JSON.stringify(response.data));

        commit("setRoleList", response.data);
      }).catch(function (error) {
        console.log("error : " + error)
      });
    },
    async userUpdate ({ state, commit }) {
      console.log("userUpdate state.userDetail : " + JSON.stringify(state.userDetail));
      await Axios.post("http://localhost:8090/api/v1/user/userUpdate",
        {
          id: state.userDetail.id,
          loginId: state.userDetail.loginId,
          userName: state.userDetail.userName,
          userPassword: state.userDetail.userPassword,
          roleUserSave: state.roleUserSave
      }
      ).then((response) => {
        console.log("getRoleList : " + JSON.stringify(response.data));

        commit("setRoleList", response.data);
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