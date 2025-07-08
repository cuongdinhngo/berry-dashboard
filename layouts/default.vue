<template>
  <v-app>
    <!-- Navigation Drawer -->
    <SectionNavDrawer
      v-model:rail="rail"
      v-model:navDrawer="navDrawer"
    />

    <!-- App Bar -->
    <SectionAppBar
      v-model:rail="rail"
      v-model:navDrawer="navDrawer"
    />

    <!-- Main Content -->
    <v-main>
      <v-container fluid class="bg-container-bg rounded-lg" min-height="90vh">
        <slot />
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer app class="bg-background" :absolute="true">
      <span class="text-center">Made with ❤️ by Cuong Ngo © 2025</span>
    </v-footer>
  </v-app>
</template>
<script setup lang="ts">
import { NAV_MENU } from '@/config/nav-menu';
const rail = ref(false);
const navDrawer = ref(true);
</script>