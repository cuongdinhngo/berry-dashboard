<template>
  <v-card class="content-wrapper elevation-0 bg-transparent" :style="{'height': `${props.height}px`}">
    <v-card-text class="content-area" :style="{'min-height': minHeight}">
      <slot />
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
const props = defineProps({
  height: {
    type: Number,
    default: 400,
    required: true,
  },
})

const minHeight = computed(() => {
  return `${props.height + 150}px`;
});
</script>
<style scoped>
.content-wrapper {
  background: #f5f5f5;
  overflow-y: scroll !important;
}

.content-wrapper::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  visibility: hidden;
}

.content-wrapper:hover::-webkit-scrollbar-track {
  visibility: visible;
  background-color: #f5f5f5;
}

.content-wrapper::-webkit-scrollbar {
  width: 5px;
  visibility: hidden;
}

.content-wrapper:hover::-webkit-scrollbar {
  background-color: #f5f5f5;
  visibility: visible;
}

.content-wrapper::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  visibility: hidden;
}

.content-wrapper:hover::-webkit-scrollbar-thumb {
  background-color: #555;
  visibility: visible;
}
</style>