<template>
  <v-app-bar app height="80" class="px-2 elevation-0 bg-background">
    <v-sheet
      v-if="mobileSearch"
      width="100%"
    >
      <v-row no-gutters>
        <v-col cols="12" sm="12" md="12" lg="12" >
          <v-text-field
            density="comfortable"
            variant="outlined"
            placeholder="Search..."
            prepend-inner-icon="mdi-magnify"
            hide-details
            min-width="100%"
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
              <ItemHoverButton
                :button="{
                  icon: 'mdi-close',
                  color: 'red',
                  size: '34',
                  defaultVariant: 'tonal',
                  hoverVariant: 'flat',
                  class: 'ml-2',
                }"
                @click="mobileSearch = false"
              />
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </v-sheet>

    <ItemHoverButton
      v-if="!mobileSearch"
      :button="{
        icon: 'mdi-menu',
        color: 'secondary',
        size: '34',
        defaultVariant: 'tonal',
        hoverVariant: 'flat',
        class: 'mr-2',
      }"
      @click="toggleNavDrawer"
    />

    <ItemHoverButton
      v-if="smAndDown && !mobileSearch"
      :button="{
        icon: 'mdi-magnify',
        color: 'secondary',
        size: '34',
        defaultVariant: 'tonal',
        hoverVariant: 'flat',
      }"
      @click="mobileSearch = !mobileSearch"
    />
    <v-sheet
      v-if="!smAndDown"
    >
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

    <!-- Quick Access -->
    <ItemHoverButton
      v-if="!smAndDown"
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
              <v-list-subheader :key="menu.head" class="font-weight-bold text-on-surface">{{ menu.head }}</v-list-subheader>
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
                  <span class="text-subtitle-2 text-on-surface">{{ item.title }}</span>
                </template>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-card>
    </v-menu>

    <!-- Language Selection -->
    <ItemHoverButton
      v-if="!mobileSearch"
      :button="{
        icon: 'mdi-translate',
        color: 'primary',
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
              <span class="text-subtitle-2 text-on-surface">{{ lang.title }}</span>
            </template>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>

    <!-- Notification Menu -->
    <ItemHoverButton
      v-if="!mobileSearch"
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
          <NuxtLink class="text-caption">
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

        <ItemScrollableCard
          :height="400"
        >
            <v-list-item
              v-for="(notification, index) in 10"
              :key="index"
              class="d-flex align-center border-t-thin pa-4"
              link
            >
              <template #prepend>
                <v-avatar
                  image="https://randomuser.me/api/portraits/lego/1.jpg"
                  size="small"
                ></v-avatar>
              </template>
              <v-list-item-title class="d-flex justify-space-between">
                <span class="text-subtitle-2 text-on-surface">Notification {{ index + 1 }}</span>
                <span class="text-caption">2 min ago</span>
              </v-list-item-title>
              <v-list-item-subtitle class="text-caption">
                This is a sample notification message to demonstrate the notification feature.
              </v-list-item-subtitle>
            </v-list-item>
        </ItemScrollableCard>

        <v-card-actions class="border-t-thin">
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

    <!-- Toggle Theme -->
    <ItemHoverButton
      :button="{
        icon: currentTheme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night',
        color: 'secondary',
        size: '34',
        defaultVariant: 'tonal',
        hoverVariant: 'flat',
        class: 'mr-2',
        id: 'message-menu'
      }"
      @click="toggleTheme"
    />

    <!-- User Settings Menu -->
    <v-hover v-if="!mobileSearch">
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
          id="user-settings-menu"
        >
          <v-avatar image="https://randomuser.me/api/portraits/lego/5.jpg" size="small" class="mx-2"></v-avatar>
          <v-icon :color="isHovering ? 'white' : ''" class="mx-2">mdi-cog-outline</v-icon>
        </v-btn>
      </template>
    </v-hover>
    <v-menu activator="#user-settings-menu" :close-on-content-click="false">
      <v-card min-width="200px" class="bg-white rounded-lg pa-4" elevation="10">
        <v-card-title class="d-flex flex-column px-0">
          <div class="text-subtitle-2">
            <span class="font-weight-bold">Good Morning, </span>
            <span>John Doe</span>
          </div>
          <span class="text-caption">Project admin</span>
        </v-card-title>

        <v-card-title class="my-2 px-0">
          <v-text-field
            variant="outlined"
            placeholder="Search ..."
            prepend-inner-icon="mdi-magnify"
            hide-details
            color="blue"
            rounded="lg"
            density="comfortable"
          ></v-text-field>
        </v-card-title>


        <v-divider></v-divider>

        <v-card class="my-4 elevation-0 bg-yellow-lighten-4 rounded-lg">
          <v-row no-gutters>
            <v-col sm="8" md="8" lg="8">
              <v-card-title class="text-on-surface pa-3">
                <div class="d-flex flex-column">
                  <p class="text-subtitle-1 mb-1 font-weight-bold">Upgrade your plan</p>
                  <p class="text-caption mb-0" style="white-space: normal; word-wrap: break-word; overflow-wrap: break-word;">
                    70% discount for 1 year subscriptions.
                  </p>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn
                  color="yellow-darken-3"
                  text="Go Premium"
                  variant="flat"
                  class="font-weight-bold"
                >
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>

        <v-divider></v-divider>

        <v-card class="my-4 elevation-0 bg-blue-lighten-5 rounded-lg">
          <v-list-item
            density="compact"
            class="my-0 py-0"
          >
            <template #title>
              <span class="text-subtitle-2 font-weight-bold">Start DND Mode</span>
            </template>
            <template #append>
              <v-switch
                color="primary"
                hide-details
              ></v-switch>
            </template>
          </v-list-item>
          <v-list-item
            density="compact"
            class="my-0 py-0"
          >
            <template #title>
              <span class="text-subtitle-2 font-weight-bold">Allow Notifications</span>
            </template>
            <template #append>
              <v-switch
                color="primary"
                hide-details
              ></v-switch>
            </template>
          </v-list-item>
        </v-card>

        <v-divider></v-divider>

        <v-list nav slim>
          <v-list-item
            v-for="(setting, index) in USER_SETTINGS"
            :key="index"
            :value="setting.value"
            :prepend-icon="setting.icon"
            :title="setting.title"
            density="comfortable"
            color="secondary"
            link
          >
            <template #append>
              <v-chip v-if="setting?.count" color="yellow-darken-3">{{ setting.count }}</v-chip>
            </template>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>

  </v-app-bar>
</template>
<script setup lang="ts">
import { QUICK_ACCESS, LANGUAGES, USER_SETTINGS } from '~/config/app-bar';

const rail = defineModel('rail', {
  type: Boolean,
  default: false,
});
const navDrawer = defineModel('navDrawer', {
  type: Boolean,
  default: false,
});

const { smAndDown } = useDisplay();
const theme = useTheme();

const selectedLanguage = ref('en');
const mobileSearch = ref(false);
const currentTheme = ref('light');

function toggleNavDrawer() {
  if (smAndDown.value) {
    console.log('Toggling Nav Drawer =>>>');
    navDrawer.value = !navDrawer.value;
  } else {
    console.log('Toggling Rail =>>>');
    rail.value = !rail.value;
  }
}

function toggleTheme () {
  theme.global.name.value = theme.global.current.value.dark ? 'berry' : 'berry-dark'
  currentTheme.value = theme.global.name.value === 'berry' ? 'light' : 'dark';
}
</script>