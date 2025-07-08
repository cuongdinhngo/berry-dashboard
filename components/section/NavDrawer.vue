<template>
  <v-navigation-drawer
    app
    expand-on-hover
    :rail="rail"
    class="pl-2"
    v-model="navDrawer"
    floating
  >
    <!-- Logo -->
    <v-list-item
      title="Berry"
      density="compact"
      height="80"
      class="px-1"
      slim
    >
      <template #prepend>
        <v-icon
          size="40"
          color="secondary"
          class="rounded-circle"
          style="opacity: 1 !important;"
        >mdi-fruit-grapes-outline</v-icon>
      </template>
    </v-list-item>

    <v-list
      v-for="(menu, index) in NAV_MENU"
      :key="index"
      slim
    >
      <v-list-subheader v-if="menu.head" :key="menu.head" class="text-subtitle-2 font-weight-bold text-black px-0">{{ menu.head }}</v-list-subheader>
      <template
        v-for="(item, idx) in menu.items"
      >
        <v-list-item
          v-if="!item.subItems"
          :key="idx"
          :title="item.title"
          :prepend-icon="item.icon"
          :value="item.title"
          color="secondary"
          density="compact"
          nav
        />

        <!-- Sub Items-->
        <v-list-group
          v-if="item.subItems"
          :value="item.title"
        >
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              :title="item.title"
              :value="item.title"
              :prepend-icon="item.icon"
              nav density="compact"
              color="secondary"
            ></v-list-item>
          </template>

          <v-list-item
            v-for="(subMenu, i) in item.subItems"
            :key="i"
            :title="subMenu.title"
            :value="subMenu.title"
            prepend-icon="mdi-circle-small"
            density="compact" nav
            color="secondary"
          >
            
          </v-list-item>
        </v-list-group>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>
<script setup lang="ts">
import { NAV_MENU } from '@/config/nav-menu';

const rail = defineModel('rail', {
  type: Boolean,
  default: false,
});

const navDrawer = defineModel('navDrawer', {
  type: Boolean,
  default: false,
});

const { smAndUp } = useDisplay();
</script>