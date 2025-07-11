<template>
  <v-sheet>
    <v-carousel v-model="currentImage" show-arrows="hover" hide-delimiters height="400">
      <v-carousel-item
        v-for="(item, index) in images"
        :key="index"
        :value="index"
      >
        <v-responsive :aspect-ratio="16/9">
          <v-img
            :src="item"
            rounded="lg"
            width="100%"
            height="100%"
          />
        </v-responsive>
      </v-carousel-item>
    </v-carousel>
    <v-slide-group
      v-model="currentImage"
      selected-class="bg-primary"
      :center-active="true"
      class="mt-5"
    >
      <v-slide-group-item
        v-for="(item, index) in images"
        :key="index"
        :value="index"
        v-slot="{ isSelected, toggle, selectedClass }"
      >
        <v-card
          :class="['pa-1 border-thin mr-1', selectedClass]"
          @click="toggle()"
        >
          <v-responsive :aspect-ratio="4/5">
            <v-img :src="item" cover width="80" height="100"></v-img>
          </v-responsive>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
</template>
<script setup lang="ts">
defineProps({
  images: {
    type: Array as () => string[],
    required: true
  }
});

const currentImage = ref(0);
</script>