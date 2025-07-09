<template>
  <UserSocialLayout>
    <v-card class="rounded-lg elevation-0">
      <v-card-title :class="['d-flex align-center border-b-thin py-4', smAndDown ? 'flex-column' : 'justify-space-between']">
        <div>
          <span class="text-h6 font-weight-bold">Followers</span>
          <div class="text-caption text-medium-emphasis">{{ searchResultsCount }}</div>
        </div>
        <v-sheet :width="smAndDown ? '100%' : '20%' ">
          <v-row no-gutters>
            <v-col cols="12" sm="12" md="12" lg="12">
              <v-text-field
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                variant="outlined"
                density="compact"
                placeholder="Search followers..."
                clearable
                hide-details
                width="100%"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-sheet>
      </v-card-title>

      <v-card-text class="mt-4">
        <v-row no-gutters>
          <v-col
            v-for="(follower, index) in filteredFollowers"
            :key="follower.id"
            cols="12" sm="12" md="6" lg="3"
            class="pa-2"
          >
            <v-card
              class="pa-4 rounded-lg elevation-0 bg-container-bg"
              border="thin primary"
              variant="flat"
            >
              <v-list-item class="pa-0" min-height="64">
                <template #prepend>
                  <v-avatar
                    size="40"
                    :image="follower.avatar"
                  />
                </template>
                <template #title>
                  <span class="text-subtitle-2 font-weight-bold">{{ follower.name }}</span>
                </template>
                <template #subtitle>
                  <v-icon icon="mdi-map-marker" size="16" class="mr-1" />
                  <span class="text-caption text-wrap">{{  follower.location }}</span>
                </template>
                <template #append>
                  <v-btn
                    variant="text"
                    size="x-small"
                  >
                    <v-icon icon="mdi-dots-horizontal" size="small" />
                    <v-menu activator="parent">
                      <v-list density="compact" nav>
                        <v-list-item title="View Profile" prepend-icon="mdi-account" />
                        <v-list-item title="Send Message" prepend-icon="mdi-message" />
                        <v-list-item title="Unfollow" prepend-icon="mdi-account-remove" />
                      </v-list>
                    </v-menu>
                  </v-btn>
                </template>
              </v-list-item>
              <v-card-actions class="pa-0 mt-4">
                <v-btn
                  variant="outlined"
                  color="primary"
                  prepend-icon="mdi-account-plus"
                  width="100%"
                >Follow</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </UserSocialLayout>
</template>
<script setup lang="ts">
import { faker } from '@faker-js/faker';

interface Follower {
  id: string;
  name: string;
  location: string;
  avatar: string;
}

const { mdAndDown, smAndDown } = useDisplay();
const search = ref<string>('');

const followers = ref<Follower[]>(Array.from({ length: 20 }, () => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  location: faker.location.city(),
  avatar: `https://randomuser.me/api/portraits/lego/${faker.number.int({ min: 1, max: 10 })}.jpg`,
})));

const filteredFollowers = computed(() => {
  if (!search.value || search.value.trim() === '') {
    return followers.value;
  }
  
  const searchTerm = search.value.toLowerCase().trim();
  return followers.value.filter(follower => 
    follower.name.toLowerCase().includes(searchTerm)
  );
});

const searchResultsCount = computed(() => {
  if (!search.value || search.value.trim() === '') {
    return `${followers.value.length} followers`;
  }
  return `${filteredFollowers.value.length} of ${followers.value.length} followers found`;
});
</script>