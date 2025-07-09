<template>
  <UserSocialLayout>
    <v-card>
      <!-- Header -->
      <v-card-title :class="['d-flex align-center', mdAndDown ? 'flex-column' : 'justify-space-between']">
        <v-col cols="12" sm="12" md="4" lg="4" class="pa-0">
          <span class="text-h6 font-weight-bold">Gallery</span>
        </v-col>
        <v-col cols="12" sm="12" md="8" lg="8" class="pa-0">
          <v-row no-gutters :class="mdAndDown ? 'justify-start' : 'justify-end'">
            <v-col cols="auto" :class="mdAndDown ? 'my-2' : 'px-2'">
              <v-text-field
                variant="outlined"
                placeholder="Search photos"
                prepend-inner-icon="mdi-magnify"
                clearable
                density="compact"
                hide-details
                style="width: 300px;"
              ></v-text-field>
            </v-col>
            <v-col cols="auto">
              <v-btn
                variant="flat"
                class="font-weight-bold"
                color="primary"
              >Add Photo</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-card-title>

      <!-- Gallery Items -->
      <v-card-text class="mt-4">
        <v-row no-gutters>
          <v-col
            v-for="(item, index) in galleryItems"
            :key="item.id"
            cols="12" sm="12" md="6" lg="3"
            class="pa-2"
          >
            <v-card class="elevation-0 bg-container-bg rounded-lg">
              <v-img
                :src="item.src"
                aspect-ratio="4/5"
              ></v-img>
              <v-list-item class="py-2">
                <template #title>
                  <span class="text-subtitle-2 font-weight-bold">{{ item.title }}</span>
                </template>
                <template #subtitle>
                  <v-icon icon="mdi-calendar-clock" size="16" class="mr-1" />
                  <span class="text-caption text-medium-emphasis">{{ item.timestamp }}</span>
                </template>
                <template #append>
                  <v-btn
                    variant="text"
                    size="small"
                  >
                    <v-icon icon="mdi-dots-horizontal" size="small" />
                    <v-menu activator="parent">
                      <v-list density="compact" nav slim>
                        <v-list-item title="View Album" prepend-icon="mdi-eye" link/>
                        <v-list-item title="Share Album" prepend-icon="mdi-share" link/>
                        <v-list-item title="Delete Album" prepend-icon="mdi-delete" link/>
                      </v-list>
                    </v-menu>
                  </v-btn>
                </template>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </UserSocialLayout>
</template>
<script setup lang="ts">
import { faker } from '@faker-js/faker';
import { timestamp } from '@vueuse/core';
const { mdAndDown } = useDisplay();

const galleryItems = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  src: `https://picsum.photos/200/150?random=${i + 1}`,
  title: faker.location.city(),
  timestamp: faker.date.past().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}));
</script>