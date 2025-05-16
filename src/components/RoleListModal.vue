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

function checkRoleList(selected, roles) {
  console.log("selected  "+ selected)
  console.log("roles  "+ JSON.stringify(roles))
  !selected ? store.commit('addUpdateRoleList', roles) : store.commit('removeUpdateRoleList', roles)

}



</script>

<template>

<v-overlay v-model="store.state.showRoleListModal" class="align-center justify-center" position="absolute" width="70%">
  <v-card class="mx-auto" max-width="400">
    <p>store.state.roleList : {{ store.state.roleList }}</p>
    <p>store.state.updateRoleList : {{ store.state.updateRoleList }}</p>
    <v-list
        v-model:selected="settingsSelection"
        lines="three"
        select-strategy="leaf"
      >
        <v-list-subheader>Role List</v-list-subheader>
        <v-list-item
          v-for="roles in store.state.roleList"
          :key="roles.id"
          :subtitle="roles.roleDesc"
          :title="roles.roleName"
        >
          <template v-slot:prepend="{ isSelected, select }">
            <v-list-item-action start>
              <v-checkbox-btn :model-value="isSelected" @update:model-value="select"
              @click="checkRoleList(isSelected, roles)"></v-checkbox-btn>
            </v-list-item-action>
          </template>
        </v-list-item>
      </v-list>
      <v-card-actions>
        <v-spacer></v-spacer>
      <v-btn size="small"
          variant="elevated"
          @click="roleListModal"
        >Add Roles</v-btn>
      </v-card-actions>
  </v-card>
</v-overlay>
</template>