<template>
  <div class="container">
    <v-card flat>
    <SearchBar />
    <UserList :userList=userList
      :currentPage=currentPage
      :pageLength=pageLength
      @mainPageClick="mainPageClick"
    />
  </v-card>
  {{currentPage}}
  {{pageLength}}
  </div>
      <input
    :value="props.modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
const emit = defineEmits(['pageClick', 'update:modelValue'])
  const mainPageClick = (pageVal) => {
    console.log("2nd pageVal :  "  + pageVal)
    emit('pageClick', pageVal);
    //getData();
  //alert('1')
  }

import { ref, onMounted, shallowRef  } from 'vue'

import SearchBar from './SearchBar.vue'
import UserList from './UserList.vue'

const page = ref(1)

const props = defineProps(['userList', 'currentPage', 'pageLength', 'modelValue'])
/* const emit = defineEmits(['update:modelValue']) */



</script>

<style lang="scss" scoped>
.container {
  padding: 20px;
}
</style>
