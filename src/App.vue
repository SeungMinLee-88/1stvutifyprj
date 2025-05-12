<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
  <v-spacer></v-spacer>
      <v-select
        v-model="model"
        :items="items"
        width="10"
        density="compact"
      label="Search"
      prepend-inner-icon="mdi-magnify"
      variant="underlined"
        flat
      hide-details
      single-line
      @update:modelValue="selectFiled"
      ></v-select>

    <v-text-field
      v-model="search"
      density="compact"
      label="Search"
      prepend-inner-icon="mdi-magnify"
      variant="underlined"
      flat
      hide-details
      single-line
       @update:modelValue="inputSearch"
    ></v-text-field>

</v-card-title>
<v-divider></v-divider>
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
      <tr v-for="(users, index) in userList" :key="users.id">
        <td>{{ index }}</td>
        <td>{{ users.loginId }}</td>
        <td>{{ users.userName }}</td>
        <td>{{ users.roleUserSave }}</td>
      </tr>
    </tbody>
    </v-table>
  </v-card>
   <v-pagination
        v-model="page"
        :length="pageLength"
        rounded="circle"
        @update:model-value="pageClick"
      ></v-pagination>

      <MainComp :userList=userList
      :page=page
      :pageLength=pageLength
      @pageClick="pageClick"
      :modelValue="foo"
      @update:modelValue="$event => (foo = $event)"
      />
      {{ foo }}
  </template>

<script setup>
  import { ref, onMounted, shallowRef  } from 'vue'
  import Axios from "axios";
  import{ selected, headers, desserts } from './assets/tempdata.js'
import MainComp from './components/MainComp.vue'
import MyButton from './components/MyButton.vue'
const foo = ref("test")

const msg = ref('Hello World!')

  const page = ref(1)
  const count = ref(1)
  function increaseCount(n) {
  count.value += n
}

  const userList = ref([]);
  const pageLength = ref();
  const currentPage = ref(1);
  const searchFiled = ref();
  const searchTxt = ref();


const getData = async () => {

await Axios.get("http://localhost:8090/user/userList", {
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
    //getData();
  //alert('1')
  }
  const selectFiled = (selectSearchFiled) => {
    console.log("selectSearchFiled :  "  + selectSearchFiled);
    searchFiled.value = selectSearchFiled;
    getData();

  //alert('1')
  }

  const inputSearch = (inputSearchTxt) => {
    console.log("inputSearchTxt :  "  + inputSearchTxt)
    searchTxt.value = inputSearchTxt;
    getData();

  //alert('1')
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
