<script setup>
import { ref, computed  } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

function handleInput(inputVal) {
  store.commit('setUserName', inputVal);

}

/* const filterValues = ref({filterList : [{id : '0', value : 'a'}, {id : '1', value : 'b'}, {id : '2', value : 'c'}, {id : '3', value : 'd'}]})
const filterValues = ref()

filterValues.value = [{id : '0', value : 'a'}, {id : '1', value : 'b'}, {id : '2', value : 'c'}, {id : '3', value : 'd'}];
const filterValuesTest = ref([{id : '0', value : 'a'}, {id : '1', value : 'b'}, {id : '2', value : 'c'}, {id : '3', value : 'd'}])

const filterValuesTest = ref([{ "id": 60, "roleId": "1", "userId": "qqq", "roleName": "admin" }, { "id": 61, "roleId": "2", "userId": "qqq", "roleName": "manager" } ])
const valuesFilter = computed(() => {
  console.log("filterValuesTest.value : " + filterValuesTest.value)
  return filterValuesTest.value.filter((n) => n.id !== 60)
  return filterValuesTest.value
}) */


const roleUserFilter = computed(() => {
  const roleFilter = ref([]);
  Object.assign(roleFilter.value, store.state.userDetail.roleUser);
  return roleFilter.value.filter((n) => n.id !== 2)
})

function handleRemove(inputVal) {
  const roleFilter = ref([]);
  Object.assign(roleFilter.value, store.state.userDetail.roleUser);
  store.commit('setRoleUser', roleFilter.value.filter((n) => n.roleId !== inputVal))
}
function roleListModal() {
  const exceptRoleIds = ref([]);

  if(store.state.userDetail.roleUser.length != 0){
    store.state.userDetail.roleUser.map((roles) =>{
        console.log("roles.id : " + roles.roleId)
        //Object.assign(exceptRoleIds.value, roles.id);
        exceptRoleIds.value.push(roles.roleId)
    })
    store.commit('setExceptRoleIds', exceptRoleIds.value)
  }

  store.dispatch('getRoleList')
  store.commit('showRoleListModal')
}
function userUpdate(){
  const roleUserSave = ref([]);

  store.state.userDetail.roleUser.map((roles) =>{
  roleUserSave.value.push(roles.roleId)
  })

  store.commit('setRoleUserSave', roleUserSave.value)
  store.dispatch('userUpdate')
}
</script>
<template>
  <v-overlay v-model="store.state.showModifyModal" class="align-center justify-center" position="absolute" width="70%">
        <v-card title="Dialog" height="700px">
          <v-card-text>

<v-list-item
        v-for="(role, i) in store.state.userDetail.roleUser"
        :key="i"
        :value="role"
        color="primary"
      >
      <!-- https://vuetifyjs.com/en/components/lists/#density -->
        <v-list-item-title v-text="role.roleName"></v-list-item-title>
        <template v-slot:append>
          <v-icon icon="mdi-close" @click="handleRemove(role.roleId)"></v-icon>
        </template>
      </v-list-item>
      <v-spacer></v-spacer>

        <v-btn size="small"
          variant="elevated"
          @click="roleListModal">
          Add Roles
        </v-btn>

        <v-sheet class="mx-auto" width="300">
    <v-form fast-fail @submit.prevent>
      <v-text-field
      label="ID : "
      :model-value= "store.state.userDetail.loginId"
      variant="outlined"
      readonly>
    </v-text-field>

    <v-text-field
      label="NAME : "
      :model-value= "store.state.userDetail.userName"
      variant="outlined"
      @update:model-value="handleInput">
    </v-text-field>
      <v-btn class="mt-2" type="submit" @click="userUpdate" block>Submit</v-btn>
    </v-form>
  </v-sheet>
  </v-card-text>
    <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn size="small"
            variant="elevated"
            @click="store.commit('showModifyModal')">
            Close
          </v-btn>
      </v-card-actions>
  </v-card>
</v-overlay>
</template>