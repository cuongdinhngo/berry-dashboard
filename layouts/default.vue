<template>
  <v-app>
    <!-- Navigation Drawer -->
    <SectionNavDrawer
      v-model:rail="rail"
    />

    <!-- App Bar -->
    <SectionAppBar
      v-model:rail="rail"
    />

    <!-- Main Content -->
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>
<script setup lang="ts">
import { NAV_MENU } from '@/config/nav-menu';
const rail = ref(false);
</script>