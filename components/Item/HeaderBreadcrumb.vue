<template>
  <v-card-title class="d-flex justify-space-between align-center bg-background rounded-lg py-2">
    <v-row no-gutters>
      <v-col cols="12" sm="12" md="6" lg="6">
        <span class="text-h6 font-weight-bold">{{ headerTitle }}</span>
      </v-col>
      <v-col
        cols="12" sm="12" md="6" lg="6"
        :class="['d-flex align-center', { 'justify-end': !mdAndDown }]"
      >
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
      </v-col>
    </v-row>
  </v-card-title>
</template>
<script setup lang="ts">
interface CustomBreadcrumbItem {
  title: string;
  icon?: string;
  iconOnly?: boolean;
  to?: any;
}

defineProps({
  headerTitle: {
    type: String,
    required: true,
  },
  items: {
    type: Array as () => CustomBreadcrumbItem[],
    required: true,
  },
});

const { mdAndDown } = useDisplay();
</script>