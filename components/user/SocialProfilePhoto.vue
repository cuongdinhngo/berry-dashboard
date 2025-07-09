<template>
  <v-card class="my-4 rounded-lg pa-4 elevation-0">
    <v-row>
      <v-col cols="12" sm="12" md="12" lg="12">
        <v-img
          src="https://picsum.photos/id/26/1000/300"
          :aspect-ratio="16/9"
          min-height="50px"
          max-height="300px"
          cover
          class="rounded-lg"
        >
        </v-img>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="12" md="3" lg="3" :class="mdAndDown ? 'text-center' : 'text-end'">
          <v-avatar
            size="150"
            tile
            class="pa-1 rounded-lg elevation-1 bg-white"
            style="margin: -70px 0 0 auto;"
          >
            <v-img
              src="https://picsum.photos/id/1015/100/100"
              cover
              width="100%"
              height="100%"
              rounded="lg"
            ></v-img>
          </v-avatar>
      </v-col>

      <v-col cols="12" sm="12" md="9" lg="9">
        <v-row>
          <v-col cols="12" sm="12" md="12" lg="12">
            <v-row>
              <v-col cols="12" sm="12" md="5" lg="5" :class="mdAndDown ? 'text-center' : 'text-start'">
                <p class="text-subtitle-2 font-weight-bold">John Doe</p>
                <p class="text-subtitle-2">Web Developer</p>
              </v-col>
              <v-col cols="12" sm="12" md="7" lg="7" :class="mdAndDown ? 'text-center' : 'text-end'">
                <v-btn
                  color="primary"
                  variant="outlined"
                  text="Message"
                  class="font-weight-bold text-subtitle-2 mx-1"
                ></v-btn>
                <v-btn
                  color="primary"
                  variant="flat"
                  text="Send Request"
                  prepend-icon="mdi-account-plus"
                  class="font-weight-bold text-subtitle-2 mx-1"
                ></v-btn>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" sm="12" md="12" lg="12">
            <v-tabs
              v-model="tab"
              align-tabs="end"
              color="primary"
              center-active
            >
              <v-tab
                v-for="item in tabItems"
                :key="item.value"
                :value="item.value"
                :prepend-icon="item.icon"
                :to="item.to"
              >
                <span class="text-subtitle-2 font-weight-bold">{{ item.title }}</span>
              </v-tab>
            </v-tabs>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>
<script setup lang="ts">
const tab = ref('profile');
const { mdAndDown } = useDisplay();

const tabItems = [
  {
    title: 'Profile',
    icon: 'mdi-account',
    value: 'profile',
    to: { name: 'user-social-post' }
  },
  {
    title: 'Followers',
    icon: 'mdi-account-multiple',
    value: 'followers',
    to: { name: 'index' }
  },
  {
    title: 'Friends',
    icon: 'mdi-account-supervisor-circle',
    value: 'friends'
  },
  {
    title: 'Gallery',
    icon: 'mdi-image',
    value: 'gallery'
  },
  {
    title: 'Friend Request',
    icon: 'mdi-account-plus',
    value: 'friend-request'
  }
]
</script>