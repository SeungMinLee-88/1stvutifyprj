<template>
  <div class="container">
    <v-card flat>
    <SearchBar
      @selectFiled="selectFiled"
      @inputSearch="inputSearch"
      @userSearch="userSearch"
    />
    <UserList :userList=userList
      :currentPage=currentPage
      :pageLength=pageLength
      @mainPageClick="mainPageClick"
    />
    <ModifyModal
    :showModifyModal="store.state.showModifyModal"/>

    <RoleListModal
    :showRoleListModal="store.state.showModifyModal"/>

  </v-card>

  <div>
  <p>main showModifyModal : {{ store.state.showModifyModal }}</p>
</div>
  </div>
</template>

<script setup>

import { ref, onMounted, shallowRef  } from 'vue'

import SearchBar from './SearchBar.vue'
import UserList from './UserList.vue'
import ModifyModal from './ModifyModal.vue'
import RoleListModal from './RoleListModal.vue'
const items = [{title: 'Id', value: "loginId"}, {title: 'Name', value: "userName"}];
import { useStore } from 'vuex'
const store = useStore()

function handleClick(pageVal) {
console.log("pageVal : " + pageVal)
emit('mainPageClick', pageVal);
}

const emit = defineEmits(['pageClick', 'selectFiled', 'inputSearch', 'showModalPop'])
/* const showModalPop = (showModalVal) => {
    console.log("2nd showModalPop :  "  + showModalVal)
    emit('showModalPop', showModalVal);
    //getData();
  //alert('1')
  } */


const selectFiled = (selectSearchFiled) => {
    console.log("2nd selectSearchFiled :  "  + selectSearchFiled)
    emit('selectFiled', selectSearchFiled);
    //getData();
  //alert('1')
  }

  const inputSearch = (inputSearch) => {
    console.log("2nd inputSearch :  "  + inputSearch)
    emit('inputSearch', inputSearch);
    //getData();
  //alert('1')
  }
  const mainPageClick = (pageVal) => {
    console.log("2nd pageVal :  "  + pageVal)
    emit('pageClick', pageVal);
    //getData();
  //alert('1')
  }
  const userSearch = () => {
    console.log("2nd userSearch")
    emit('userSearch');
    //getData();
  //alert('1')
  }

const page = ref(1)

const props = defineProps(['userList', 'currentPage', 'pageLength', 'modelValue', 'searchFiled', 'searchTxt', 'showModifyModal'])
/* const emit = defineEmits(['update:modelValue']) */

</script>

<style lang="scss" scoped>
.container {
  padding: 20px;
}
</style>
