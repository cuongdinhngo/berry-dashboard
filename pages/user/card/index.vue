<template>
  <ItemHeaderBreadcrumb
    headerTitle="Card Profile"
    :items="items"
  />

  <v-card class="mt-4 elevation-0 pa-4 rounded-lg">
    <v-card-title class="">
      <v-row no-gutters>
        <v-col cols="12" sm="12" md="9" lg="9">
          <span class="text-subtitle-1 font-weight-bold">Cards</span>
        </v-col>

        <v-col cols="12" sm="12" md="3" lg="3" class="d-flex justify-end">
          <v-text-field
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            density="compact"
            placeholder="Search cards..."
            clearable
            hide-details
          />
        </v-col>
      </v-row>
    </v-card-title>

    <v-card-text class="mt-4 px-0">
      <v-row no-gutters>
        <v-col
          v-for="(item, index) in cardItems"
          :key="item.id"
          cols="12" sm="6" md="6" lg="4"
          class="pa-2"
        >
          <v-card class="pa-4 rounded-lg elevation-0 bg-container-bg">
            <v-card-title class="d-flex align-center justify-space-between px-0">
              <v-avatar
                size="80"
                :image="item.avatar"
              />
              <v-btn
                variant="text"
                size="small"
              >
                <v-icon icon="mdi-dots-horizontal"/>
                <v-menu activator="parent">
                  <v-list>
                    <v-list-item title="Edit"></v-list-item>
                    <v-list-item title="Delete"></v-list-item>
                  </v-list>
                </v-menu>
              </v-btn>
            </v-card-title>
            <v-list-item class="pa-0">
              <template #title>
                <span class="text-subtitle-2 font-weight-bold">{{ item.name }}</span>
              </template>
              <template #subtitle>
                <span class="text-caption text-medium-emphasis">{{ item.jobTitle }}</span>
              </template>
            </v-list-item>
            <v-card-text class="px-0 texat-caption" style="min-height: 115px;">
              {{ item.description }}
            </v-card-text>
            <v-card-title class="px-0">
              <div class="d-flex flex-column">
                <span class="text-caption text-medium-emphasis">Email</span>
                <span class="text-caption">{{ item.email }}</span>
              </div>
            </v-card-title>
            <v-card-title class="d-flex justify-space-between align-center px-0">
              <div class="d-flex flex-column">
                <span class="text-caption text-medium-emphasis">Phone</span>
                <span class="text-caption">{{ item.phone }}</span>
              </div>
              <div class="d-flex flex-column">
                <span class="text-caption text-medium-emphasis">Lcoation</span>
                <span class="text-caption">{{ item.location }}</span>
              </div>
            </v-card-title>
            <v-card-actions class="d-flex justify-space-between px-0">
              <v-btn
                variant="outlined"
                color="primary"
                size="small"
              >View Profile</v-btn>
              <v-btn
                variant="tonal"
                color="secondary"
                size="small"
              >Send Message</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
import { fa, faker } from '@faker-js/faker';
const items = [
  {
    title: 'Home',
    icon: 'mdi-home',
    iconOnly: true,
  },
  {
    title: 'Card',
    to: { name: 'index' },
    iconOnly: false,
  },
  {
    title: 'Profile',
    iconOnly: false,
  },
];

const cardItems = Array.from({ length: 15 }, () => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  location: faker.location.city(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  avatar: faker.image.avatar(),
  jobTitle: faker.person.jobTitle(),
  description: faker.lorem.paragraph(2),
}));
</script>