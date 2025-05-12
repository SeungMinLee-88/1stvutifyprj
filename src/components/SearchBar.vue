<template>
 <v-card-title class="d-flex align-center pe-2">
  <v-spacer></v-spacer>
      <v-select
        v-model="model"
        :items="items"
        width="10"
        density="compact"
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
</template>

<script setup>
  import { ref, onMounted, shallowRef  } from 'vue'
const model = shallowRef('')
const items = [{title: 'Id', value: "loginId"}, {title: 'Name', value: "userName"}];
</script>