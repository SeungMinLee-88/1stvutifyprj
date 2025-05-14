<script setup>
import { ref, onMounted, shallowRef  } from 'vue'


function handleInput(inputVal) {
console.log("inputVal : " + inputVal)

}

function handleRemove(inputVal) {
console.log("inputVal : " + inputVal)

}
</script>
<template>
  showModal ModifyModal : {{$store.state.showModal}}
  <div class="modal" v-if="$store.state.showModal">
    <div class="inner">
ModifyModal Popup Page
<p>store.state.userDetail : {{ $store.state.userDetail }}</p>

<p>ID : {{ $store.state.userDetail.loginId }}</p>
<p>NAME : {{ $store.state.userDetail.userName }}</p>
<p>
  NAME :
        <ol>
          <li v-for="role in $store.state.userDetail.roleUser">
            {{ role.roleName }}
          </li>
        </ol></p>
        <v-sheet class="mx-auto" width="300">
    <v-form fast-fail @submit.prevent>
      <v-text-field
      label="ID : "
            :model-value= "$store.state.userDetail.loginId"
            variant="outlined"
            readonly
      ></v-text-field>

      <v-text-field
      label="NAME : "
            :model-value= "$store.state.userDetail.userName"
            variant="outlined"
            @update:model-value="handleInput"
      ></v-text-field>
      <v-list-item
        v-for="(role, i) in $store.state.userDetail.roleUser"
        :key="i"
        :value="role"
        color="primary"
      >


        <v-list-item-title v-text="role.roleName"></v-list-item-title>
        <template v-slot:append>
          <v-icon icon="mdi-close" @click="handleRemove(role.roleId)"></v-icon>
        </template>
      </v-list-item>

      <v-btn class="mt-2" type="submit" block>Submit</v-btn>
    </v-form>
  </v-sheet>

<v-btn size="small" variant="elevated" @click="$store.commit('showModal')">닫기</v-btn>

</div>
</div>
</template>