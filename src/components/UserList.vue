<script setup>
  import { ref, onMounted, shallowRef  } from 'vue'


const props = defineProps(['userList', 'page', 'pageLength'])

const propPage = ref(props.page);
const propPageLength = ref(props.pageLength);


const emit = defineEmits(['mainPageClick'])

function handleClick(page) {
console.log("page : " + page)
emit('mainPageClick', page);
}
  </script>
<template>
  {{props.userList}}
  page : {{props.page}}
  pageLength : {{props.pageLength}}
  <v-table>
    <thead>
      <tr>
        <th class="text-left">NUM</th>
        <th class="text-left">ID</th>
        <th class="text-left">NAME</th>
        <th class="text-left">ROLE</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(users, index) in props.userList" :key="users.id">
        <td>{{ index }}</td>
        <td>{{ users.loginId }}</td>
        <td>{{ users.userName }}</td>
        <td>{{ users.roleUserSave }}</td>
      </tr>
    </tbody>
    </v-table>

   <v-pagination
        v-model="props.page"
        :length="props.pageLength"
        rounded="circle"
        @update:model-value="handleClick"
      ></v-pagination>

  </template>
