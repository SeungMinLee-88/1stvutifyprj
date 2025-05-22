<template>

      <MainComp :userList=userList
      :currentPage=currentPage
      :pageLength=pageLength
      @pageClick="pageClick"
      @selectFiled="selectFiled"
      @inputSearch="inputSearch"
      :searchFiled="searchFiled"
      :searchTxt="searchTxt"
      @userSearch="userSearch"
      @showModalPop="showModalPop"
      />

      <div id="app">
        <div>
  <p>store.state.showModalVal : {{ store.state.showModifyModal }}</p>

</div>
</div>

  </template>

<script setup>
  import { ref, onMounted  } from 'vue'
  import Axios from "axios";
  import { useStore } from 'vuex'

import MainComp from './components/MainComp.vue'

const store = useStore()

/*   const showModifyModal = ref(false) */
  function showModalPop(showModalVal) {
    console.log("1st showModalVal :  "  + showModalVal)
    store.state.showModifyModal = showModalVal;
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
      headers: {
            access: localStorage.getItem("access")
            }
}
).then((response) => {

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
  store.dispatch('getUserData')

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
  }
  const userSearch = () => {
    getData();
  }
  </script>