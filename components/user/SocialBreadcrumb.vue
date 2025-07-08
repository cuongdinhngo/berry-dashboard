<template>
  <v-card-title class="d-flex justify-space-between align-center bg-background rounded-lg py-2">
    <span class="text-h6 font-weight-bold">Social Profile</span>
    <v-breadcrumbs
      :items="items"
      class="py-2 text-subtitle-2 font-weight-bold"
    >
      <template #title="{ item }">
        <v-icon v-if="item.iconOnly" :icon="item.icon" size="small" color="secondary"></v-icon>
        <span v-else>{{ item.title }}</span>
      </template>
      <template #divider>
        <v-icon icon="mdi-chevron-right" size="x-small"></v-icon>
      </template>
    </v-breadcrumbs>
  </v-card-title>
</template>
<script setup lang="ts">
interface CustomBreadcrumbItem {
  title: string;
  icon?: string;
  iconOnly?: boolean;
  to?: any;
}

const items: CustomBreadcrumbItem[] = [
  {
    title: 'Home',
    icon: 'mdi-home',
    iconOnly: true,
  },
  {
    title: 'Users',
    to: { name: 'index' },
    iconOnly: false,
  },
  {
    title: 'Social Profile',
    iconOnly: false,
  },
];
</script>