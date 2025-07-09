<template>
  <ItemHeaderBreadcrumb
    headerTitle="Account Profile"
    :items="items"
  />

  <v-card class="mt-4 rounded-lg elevation-0">
    <v-card-title class="border-b-thin pb-0 mx-4 px-0">
      <v-tabs
        v-model="tab"
        align-tabs="start"
        color="primary"
        center-active
      >
        <v-tab
          v-for="item in tabItems"
          :key="item.value"
          :value="item.value"
        >
          <template #prepend>
            <v-icon :icon="item.icon" class="text-medium-emphasis"/>
          </template>
          <span class="text-subtitle-2 font-weight-bold text-medium-emphasis">{{ item.title }}</span>
        </v-tab>
      </v-tabs>
    </v-card-title>
    <v-card-text class="mt-6">
      <v-tabs-window v-model="tab">
        <v-tabs-window-item :value="tab">
          <component :is="resolveComponent(tab)" />
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
const tab = useRouteQuery('tab', 'profile');

const resolveComponent = (name: string) => {
  switch (name) {
    case 'profile':
      return defineAsyncComponent(() => import('@/components/account/Profile.vue'));
    case 'change-password':
      return defineAsyncComponent(() => import('@/components/account/ChangePassword.vue'));
    case 'settings':
      return defineAsyncComponent(() => import('@/components/account/Settings.vue'));
  }
};

const tabItems = [
  {
    title: 'Profile',
    icon: 'mdi-account',
    value: 'profile',
    to: { name: 'index' }
  },
  {
    title: 'Change Password',
    icon: 'mdi-shield-lock',
    value: 'change-password',
    to: { name: 'index' }
  },
  {
    title: 'Settings',
    icon: 'mdi-cog',
    value: 'settings',
    to: { name: 'index' }
  }
];

const items = [
  {
    title: 'Home',
    icon: 'mdi-home',
    iconOnly: true,
  },
  {
    title: 'Account',
    to: { name: 'index' },
    iconOnly: false,
  },
  {
    title: 'Profile',
    iconOnly: false,
  },
];
</script>