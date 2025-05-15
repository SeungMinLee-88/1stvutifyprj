<script setup>
import { ref, onMounted, shallowRef, computed  } from 'vue'
  import { useStore } from 'vuex'
const store = useStore()

const userControls = [
  { title: 'Content filtering', subtitle: 'Set the content filtering level to restrict appts that can be downloaded' },
  { title: 'Password', subtitle: 'Require password for purchase or use password to restrict purchase' },
]

const settingsItems = [
  { value: 'notifications', title: 'Notifications', subtitle: 'Notify me about updates to apps or games that I downloaded' },
  { value: 'sound', title: 'Sound', subtitle: 'Auto-update apps at any time. Data charges may apply' },
  { value: 'widgets', title: 'Auto-add widgets', subtitle: 'Automatically add home screen widgets when downloads complete' },
]

const settingsSelection = ref([])

</script>

<template>
    <v-overlay v-model="store.state.showRoleListModal" class="align-center justify-center" position="absolute" width="70%">
<v-card class="mx-auto" max-width="400">

  <v-list
      v-model:selected="settingsSelection"
      lines="three"
      select-strategy="leaf"
    >
      <v-list-subheader>General</v-list-subheader>
      <v-list-item
        v-for="item in settingsItems"
        :key="item.value"
        :subtitle="item.subtitle"
        :title="item.title"
        :value="item.value"
      >
        <template v-slot:prepend="{ isSelected, select }">
          <v-list-item-action start>
            <v-checkbox-btn :model-value="isSelected" @update:model-value="select"></v-checkbox-btn>
          </v-list-item-action>
        </template>
      </v-list-item>
    </v-list>

</v-card>
</v-overlay>
</template>