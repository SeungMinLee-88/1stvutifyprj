<script setup>

const props = defineProps(['showModal'])


</script>
<template>
  showModal ModifyModal : {{showModal}}
  <div class="modal" v-if="showModal">
ModifyModal Popup Page
</div>
</template>