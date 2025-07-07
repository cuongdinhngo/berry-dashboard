<template>
  <v-app-bar app elevation="1" height="80">
    <ItemHoverButton
      :button="{
        icon: 'mdi-menu',
        color: 'secondary',
        size: '34',
        defaultVariant: 'tonal',
        hoverVariant: 'flat',
        class: 'mr-2',
      }"
      @click="rail = !rail"
    />
    <v-sheet>
      <v-row no-gutters>
        <v-col lg="12" md="12">
          <v-text-field
            density="comfortable"
            variant="outlined"
            placeholder="Search..."
            prepend-inner-icon="mdi-magnify"
            hide-details
            min-width="300px"
            color="blue"
            rounded="lg"
          >
            <template #append-inner>
              <ItemHoverButton
                :button="{
                  icon: 'mdi-tune',
                  color: 'secondary',
                  size: '34',
                  defaultVariant: 'tonal',
                  hoverVariant: 'flat',
                }"
              />
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </v-sheet>
    
    <v-spacer></v-spacer>

    <ItemHoverButton
      :button="{
        icon: 'mdi-access-point',
        color: 'secondary',
        size: '34',
        defaultVariant: 'tonal',
        hoverVariant: 'flat',
        class: 'mr-2',
        id: 'quick-access-menu'
      }"
    />
    <v-menu activator="#quick-access-menu">
      <v-card min-width="730px" class="bg-white rounded-lg pa-4" elevation="10">
        <v-row no-gutters>
          <v-col sm="4" md="4" lg="4">
            <v-sheet>
              <v-img
                src="/images/quick-menu.svg"
                cover
              />
            </v-sheet>
          </v-col>

          <v-col sm="8" md="8" lg="8" class="d-flex pl-5">
            <v-list
              v-for="(menu, index) in QUICK_ACCESS"
              :key="index"
              class="pa-0"
            >
              <v-list-subheader :key="menu.head" class="font-weight-bold text-black">{{ menu.head }}</v-list-subheader>
              <v-list-item
                v-for="(item, idx) in menu.items"
                :key="idx"
                :value="item.title"
                density="compact"
                slim
                rounded="xl"
              >
                <template #title>
                  <v-icon class="mr-1" size="large">{{ item.icon }}</v-icon>
                  <span class="text-subtitle-2 text-black">{{ item.title }}</span>
                </template>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-card>
    </v-menu>

    <ItemHoverButton
      :button="{
        icon: 'mdi-translate',
        color: 'secondary',
        size: '34',
        defaultVariant: 'tonal',
        hoverVariant: 'flat',
        class: 'mr-2',
        id: 'language-menu'
      }"
    />
    <v-menu activator="#language-menu" :close-on-content-click="false">
      <v-card min-width="200px" class="bg-white rounded-lg" elevation="10">
        <v-list v-model="selectedLanguage">
          <v-list-item
            v-for="(lang, index) in LANGUAGES"
            :key="index"
            :value="lang.value"
            density="comfortable"
            color="secondary"
            link
            active-class="text-secondary"
            @click="selectedLanguage = lang.value"
          >
            <template #title>
              <v-avatar
                :image="lang.icon"
                size="x-small"
                class="mr-2"
              />
              <span class="text-subtitle-2 text-black">{{ lang.title }}</span>
            </template>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>

    <ItemHoverButton
      :button="{
        icon: 'mdi-bell-outline',
        color: 'secondary',
        size: '34',
        defaultVariant: 'tonal',
        hoverVariant: 'flat',
        class: 'mr-2',
        id: 'notification-menu'
      }"
    />
    <v-menu activator="#notification-menu" :close-on-content-click="false">
      <v-card max-width="350px" class="bg-white rounded-lg" elevation="10">
        <v-card-title class="d-flex align-center justify-space-between">
          <div>
            <span>All Notifications</span>
            <v-chip color="yellow-darken-4" class="ml-2">10</v-chip>
          </div>
          <NuxtLink to="/notifications" class="text-caption">
            Mark as all read
          </NuxtLink>
        </v-card-title>
        
        <v-card-title class="my-2">
          <v-select
            placeholder="Select"
            :items="['All Notifications', 'Unread', 'New', 'Other']"
            variant="outlined"
            color="blue"
            hide-details
            rounded="lg"
          ></v-select>
        </v-card-title>

        <v-card-text class="px-0">
          <v-list-item
            v-for="(notification, index) in 10"
            :key="index"
            class="d-flex align-center border-t-thin border-b-thin pa-4"
            link
          >
            <template #prepend>
              <v-avatar
                image="https://randomuser.me/api/portraits/lego/1.jpg"
                size="small"
              ></v-avatar>
            </template>
            <v-list-item-title class="d-flex justify-space-between">
              <span class="text-subtitle-2 text-black">Notification {{ index + 1 }}</span>
              <span class="text-caption">2 min ago</span>
            </v-list-item-title>
            <v-list-item-subtitle class="text-caption">
              This is a sample notification message to demonstrate the notification feature.
            </v-list-item-subtitle>
          </v-list-item>
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="blue-darken-1"
            variant="text"
            class="mx-auto text-none font-weight-bold"
          >
            View All
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>

    <v-hover>
      <template v-slot:default="{ isHovering, props }">
        <v-btn
          color="blue-lighten-1"
          rounded="pill"
          variant="tonal"
          size="large"
          v-bind="props"
          :class="[
            isHovering ? 'bg-blue-darken-1': '',
            'px-2 mx-4'
          ]"
        >
          <v-avatar image="https://randomuser.me/api/portraits/lego/5.jpg" size="small" class="mx-2"></v-avatar>
          <v-icon :color="isHovering ? 'white' : ''" class="mx-2">mdi-cog-outline</v-icon>
        </v-btn>
      </template>
    </v-hover>

  </v-app-bar>
</template>
<script setup lang="ts">
import { QUICK_ACCESS, LANGUAGES } from '~/config/app-bar';

const rail = defineModel('rail', {
  type: Boolean,
  default: false,
});
const selectedLanguage = ref('en');
</script>