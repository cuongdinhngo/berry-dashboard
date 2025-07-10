<template>
  <v-avatar
    :size="size"
    style="margin-left: -10px; padding: 3px; border: 1px solid #e7e7e4; background-color: #ffffff;"
  >
    <v-img
      v-if="isImage"
      :src="source"
      rounded="circle"
    ></v-img>
    <v-icon
      v-else :size="size">{{ source }}</v-icon>
  </v-avatar>
</template>
<script setup lang="ts">
defineProps({
  source: {
    type: String,
    required: true,
  },
  size: {
    type: [String, Number],
    default: '35',
  },
  isImage: {
    type: Boolean,
    default: true,
  },
});
</script>