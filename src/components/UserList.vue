<script setup>
  import { ref, onMounted, shallowRef  } from 'vue'


const props = defineProps(['userList', 'currentPage', 'pageLength', 'showModal'])

const propPage = ref(props.currentPage);
const propPageLength = ref(props.pageLength);


const emit = defineEmits(['mainPageClick', 'showModalPop'])

function handleClick(pageVal) {
console.log("pageVal : " + pageVal)
emit('mainPageClick', pageVal);
}

function modifyPopup(userId) {
alert('modifyPopup props.showModal : ' + props.showModal);

emit('showModalPop', true);
}
/*   import { useStore } from 'vuex'
const store = useStore()
function increment () {
  console.log("store : " + store)
      store.commit('increment')
    } */

  </script>
<template>
<!--   {{props.userList}} -->
<!--   page : {{props.page}}
  pageLength : {{props.pageLength}} -->
  showModal userList : {{showModal}}
  <p>
    <button @click="$store.commit('incrementB')">+</button>
    <button @click="decrement">-</button>
  </p>

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
          @click="$store.commit('showModal'), $store.commit('setUserId', users.id)">Modify</v-btn></td>
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
