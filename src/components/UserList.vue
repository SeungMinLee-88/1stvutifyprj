<script setup>
  import { ref, onMounted, shallowRef  } from 'vue'


const props = defineProps(['userList', 'currentPage', 'pageLength'])

const propPage = ref(props.currentPage);
const propPageLength = ref(props.pageLength);


const emit = defineEmits(['mainPageClick'])

function handleClick(pageVal) {
console.log("pageVal : " + pageVal)
emit('mainPageClick', pageVal);
}

function modifyPopup(userId) {
alert('modifyPopup userId : ' + userId);
}
  </script>
<template>
  {{props.userList}}
<!--   page : {{props.page}}
  pageLength : {{props.pageLength}} -->
  <v-table>
    <thead>
      <tr>
        <th class="text-left">NUM</th>
        <th class="text-left">ID</th>
        <th class="text-left">NAME</th>
        <th class="text-left">ROLE</th>
        <th class="text-left" style="width: 80px;"></th>
        <th class="text-left" style="width: 80px;"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(users, index) in props.userList" :key="users.id">
        <td>{{ index }}</td>
        <td>{{ users.id }} | {{ users.loginId }}</td>
        <td>{{ users.userName }}</td>
        <td>
          <ol>
          <li v-for="role in users.roleUser">
            {{ role.roleName }}
          </li>
        </ol>
        </td>
        <td><v-btn color="#5865f2"
          size="small"
          variant="flat"
          @click="modifyPopup(users.id)">Modify</v-btn></td>
        <td><v-btn color="#5865f2"
          size="small"
          variant="flat">delete</v-btn></td>
      </tr>
    </tbody>
    </v-table>

   <v-pagination
        v-model="props.currentPage"
        :length="props.pageLength"
        rounded="circle"
        @update:model-value="handleClick"
      ></v-pagination>

  </template>
