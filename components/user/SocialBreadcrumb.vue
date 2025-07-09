<template>
  <ItemHeaderBreadcrumb
    headerTitle="Social Profile"
    :items="items"
  />
</template>
<script setup lang="ts">
const items = [
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