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
      @showModalPop="showModalPop"
    />
    <ModifyModal
    :showModal="$store.state.showModal"/>

  </v-card>

  <div>
  <p>main showModal : {{ $store.state.showModal }}</p>
</div>
  </div>
</template>

<script setup>

import { ref, onMounted, shallowRef  } from 'vue'

import SearchBar from './SearchBar.vue'
import UserList from './UserList.vue'
import ModifyModal from './ModifyModal.vue'
const items = [{title: 'Id', value: "loginId"}, {title: 'Name', value: "userName"}];

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

const props = defineProps(['userList', 'currentPage', 'pageLength', 'modelValue', 'searchFiled', 'searchTxt', 'showModal'])
/* const emit = defineEmits(['update:modelValue']) */

</script>

<style lang="scss" scoped>
.container {
  padding: 20px;
}
</style>
