<template>
  <div class="task-label" :style="`background-color: ${color};`">
    <v-tooltip
      activator="parent"
      location="top"
    >{{ label }}</v-tooltip>
  </div>
</template>
<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: 'green',
    required: true,
  }
});
</script>
<style scoped>
.task-label {
  width: 40px;
  height: 7px;
  border-radius: 4px;
}
</style>