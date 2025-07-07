<template>
  <v-hover>
    <template v-slot:default="{ isHovering, props }">
      <v-btn
        v-bind="props"
        :color="button.color"
        :variant="isHovering ? button.hoverVariant : button.defaultVariant"
        icon tile rounded="lg"
        :size="button.size"
        :class="button.class"
        :id="button.id"
        @click="emit('click')"
      >
        <v-icon size="small">{{ button.icon }}</v-icon>
      </v-btn>
    </template>
  </v-hover>
</template>
<script setup lang="ts">
defineProps({
  button: {
    type: Object,
    default: () => ({
      icon: 'mdi-access-point',
      color: 'secondary',
      size: '34',
      defaultVariant: 'tonal',
      hoverVariant: 'flat',
      class: '',
      id: '',
    }),
  },
});

const emit = defineEmits(['click']);
</script>