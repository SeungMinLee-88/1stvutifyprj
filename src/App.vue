<template>

      <MainComp :userList=userList
      :currentPage=currentPage
      :pageLength=pageLength
      @pageClick="pageClick"
      @selectFiled="selectFiled"
      @inputSearch="inputSearch"
      :searchFiled="searchFiled"
      :searchTxt="searchTxt"
      :showModal="showModal"
      @userSearch="userSearch"
      @showModalPop="showModalPop"
      />

      <div id="app">
        <div>
  <p>store.state.showModalVal : {{ store.state.showModal }}</p>
  <p>store.state.userId : {{ store.state.userId }}</p>
</div>
</div>

  </template>

<script setup>
  import { ref, onMounted, shallowRef  } from 'vue'
  import Axios from "axios";
  import { useStore } from 'vuex'

import MainComp from './components/MainComp.vue'
import MyButton from './components/MyButton.vue'

const resolve = () => {
        console.log("actionA complete")
      }
const store = useStore()

function increment () {
      store.commit('increment')
    }


  const page = ref(1)
/*   const showModal = ref(false) */
  function showModalPop(showModalVal) {
    console.log("1st showModalVal :  "  + showModalVal)
    store.state.showModal = showModalVal;
}

  const userList = ref([]);
  const pageLength = ref();
  const currentPage = ref(1);
  const searchFiled = ref();
  const searchTxt = ref();


const getData = async () => {

await Axios.get("http://localhost:8090/api/v1/user/userList", {
  params: {
        page: currentPage.value,
        size: "3",
        sort: "createdTime,desc",
        searchKey: searchFiled.value,
        searchValue: searchTxt.value
      },
}
).then((response) => {
  console.log("response.data : " + JSON.stringify(response.data));
  console.log("totalPages : " + JSON.stringify(response.data.totalPages));
  userList.value = response.data.content;
  pageLength.value= response.data.totalPages;
  //console.log("userList 11111111 : " + JSON.stringify(userList));


}).catch(function (error) {
  console.log("error : " + error)
});

//return userList;
}
onMounted(() => {
  /* Promise.resolve(getData()).then((data) => (userList.value = data)); */
  getData();
  console.log("call onMounted");
})

  const pageClick = (page) => {
    console.log("1st page :  "  + page)
    currentPage.value = page;
    getData();
  }
  const selectFiled = (selectSearchFiled) => {
    console.log("selectSearchFiled :  "  + selectSearchFiled);
    searchFiled.value = selectSearchFiled;
  }
  const inputSearch = (inputSearchTxt) => {
    console.log("inputSearchTxt :  "  + inputSearchTxt)
    searchTxt.value = inputSearchTxt;
  //alert('1')
  }

  const userSearch = () => {
    getData();
  }
const model = shallowRef('')

const items = [{title: 'Id', value: "loginId"}, {title: 'Name', value: "userName"}];
/* const items = [
  {
    title: 'Id',
    subtitle: 'loginId',
  },
  {
    title: 'Name',
    subtitle: 'Name',
  },
] */

const search = ref();
  </script>
