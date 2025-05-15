<script setup>
import { ref, onMounted, shallowRef, computed  } from 'vue'
  import { useStore } from 'vuex'
const store = useStore()

function handleInput(inputVal) {
console.log("inputVal : " + inputVal)

}



/* const filterValues = ref({filterList : [{id : '0', value : 'a'}, {id : '1', value : 'b'}, {id : '2', value : 'c'}, {id : '3', value : 'd'}]}) */
const filterValues = ref()

filterValues.value = [{id : '0', value : 'a'}, {id : '1', value : 'b'}, {id : '2', value : 'c'}, {id : '3', value : 'd'}];

const filterValuesTest = ref([{id : '0', value : 'a'}, {id : '1', value : 'b'}, {id : '2', value : 'c'}, {id : '3', value : 'd'}])


const valuesFilter = computed(() => {
  console.log("filterValuesTest.value : " + filterValuesTest.value)
  return filterValuesTest.value.filter((n) => n.id !== "2" && n.id !== "0")
  //return filterValuesTest.value
})


const roleUserFilter = computed(() => {
  console.log("store.state.userDetail.roleUser : " + store.state.userDetail.roleUser)
  const roleFilter = ref([]);
  //roleFilter.value = store.state.userDetail.roleUser;
  Object.assign(roleFilter.value, store.state.userDetail.roleUser);
  console.log("roleFilter.value : " + roleFilter.value.length)
  return roleFilter.value.filter((n) => n.id !== 2)
})

function handleRemove(inputVal) {
console.log("handleRemove inputVal : " + inputVal)
const roleFilter = ref([]);
  //roleFilter.value = store.state.userDetail.roleUser;
  Object.assign(roleFilter.value, store.state.userDetail.roleUser);
  console.log("before roleUser : " + JSON.stringify(store.state.userDetail.roleUser))
  console.log("roleFilter.value.filter : " + roleFilter.value.filter((n) => n.id !== inputVal))
store.commit('setRoleUser', roleFilter.value.filter((n) => n.id !== parseInt(inputVal)))
console.log("before roleUser : " + JSON.stringify(store.state.userDetail.roleUser))
}

</script>
<template>
  showModal ModifyModal : {{store.state.showModal}}
  <v-overlay v-model="store.state.showModal" class="align-center justify-center" position="absolute" width="70%">
        <v-card title="Dialog" height="700px">
          <v-card-text>
            <li>   : {{ valuesFilter }}</li>
            <li>roleUserFilter : {{ roleUserFilter }}</li>
ModifyModal Popup Page
<p>store.state.userDetail : {{ store.state.userDetail }}</p>

<p>ID : {{ store.state.userDetail.loginId }}</p>
<p>NAME : {{ store.state.userDetail.userName }}</p>
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

        <v-sheet class="mx-auto" width="300">
    <v-form fast-fail @submit.prevent>
      <v-text-field
      label="ID : "
            :model-value= "store.state.userDetail.loginId"
            variant="outlined"
            readonly
      ></v-text-field>

      <v-text-field
      label="NAME : "
            :model-value= "store.state.userDetail.userName"
            variant="outlined"
            @update:model-value="handleInput"
      ></v-text-field>

      <v-btn class="mt-2" type="submit" block>Submit</v-btn>
    </v-form>
  </v-sheet>

<v-btn size="small" variant="elevated" @click="store.commit('showModal')">닫기</v-btn>
</v-card-text>
<v-card-actions>
        <v-spacer></v-spacer>

        <v-btn size="small"
          variant="elevated"
          @click="store.commit('showModal')"
        >Close</v-btn>
      </v-card-actions>
</v-card>
</v-overlay>
</template>