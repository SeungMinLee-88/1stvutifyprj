<template>
  <div class="container">
    <v-card flat>
    <SearchBar />
    <UserList :userList=userList
      :page=page
      :pageLength=pageLength
    />
  </v-card>
  {{page}}
  {{pageLength}}
  </div>
  <v-pagination
        v-model="page"
        :length="5"
        rounded="circle"
        @mainPageClick="mainPageClick"
      ></v-pagination>


      <input
    :value="props.modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
  const pageClick = (page) => {
    console.log("2nd page :  "  + page)
    currentPage.value = page;
    emit('pageClick', page);
    //getData();
  //alert('1')
  }

import { ref, onMounted, shallowRef  } from 'vue'

import SearchBar from './SearchBar.vue'
import UserList from './UserList.vue'

const page = ref(1)

const props = defineProps(['userList', 'page', 'pageLength', 'modelValue'])
/* const emit = defineEmits(['update:modelValue']) */



</script>

<style lang="scss" scoped>
.container {
  padding: 20px;
}
</style>
