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
  <p>store.state.showModalVal : {{ store.state.showModal }}</p>

</div>
</div>

  </template>

<script setup>
  import { ref, onMounted, shallowRef  } from 'vue'
  import Axios from "axios";
  import { useStore } from 'vuex'

import MainComp from './components/MainComp.vue'
import MyButton from './components/MyButton.vue'

const store = useStore()



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
  store.dispatch('getUserData')
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

  </script>


<style>
* {
  box-sizing: border-box;
  margin: 0;
}

body {
  max-width: 768px;
  margin: 0 auto;
}

h1,
h2,
h3 {
  margin-bottom: 1rem;
}

p {
  margin-bottom: 0.5rem;
}

button {
  margin-right: 10px;
  margin-top: 1rem;
}

.item {
  width: 100%;
  border: 1px solid #ccc;
  display: flex;
  margin-bottom: 20px;
  padding: 1rem;
}

.item figure {
  width: 30%;
  margin-right: 1rem;
}

.item img {
  width: 100%;
}

.item .info {
  width: 100%;
}

.modal {
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal .inner {
  background: #fff;
  width: 80%;
  height: 80%;
  padding: 20px;
  border-radius: 10px;
}

p:has(.btn-all) {
  text-align: center;
}
</style>