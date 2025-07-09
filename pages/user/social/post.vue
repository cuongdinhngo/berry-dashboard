<template>
  <UserSocialBreadcrumb />

  <UserSocialProfilePhoto />

  <v-row>
    <!-- User Profile Info -->
    <v-col cols="12" sm="12" md="4" lg="4">
      <!--Account counts -->
      <v-card
        class="px-4 rounded-lg elevation-0"
      >
        <v-list>
          <v-list-item
            v-for="(item, index) in accountCounts"
            :key="index"
            :class="[
              'py-3 px-0',
              { 'border-b-thin': index < accountCounts.length - 1 }
            ]"
          >
            <template #prepend>
              <ItemHoverButton
                :button="{
                  icon: item.icon,
                  color: item.color,
                  size: '50',
                  defaultVariant: 'tonal',
                  hoverVariant: 'flat',
                }"
              />
            </template>
            <template #title>
              <span :class="['text-h6 font-weight-bold ml-2', `text-${item.color}`]">{{ formatNumber(item.counts) }}</span>
            </template>
            <template #subtitle>
              <span class="text-subtitle-2 ml-2">{{ item.title }}</span>
            </template>
            <template #append>
              <v-btn
                icon="mdi-chevron-right"
                variant="text"
              ></v-btn>
            </template>
          </v-list-item>
        </v-list>
      </v-card>

      <!-- About -->
      <v-card
        class="mt-4 py-4 rounded-lg elevation-0"
      >
        <v-card-title class="text-h6 font-weight-bold">
          About
        </v-card-title>
        <v-card-text class="text-subtitle-2">
          Passionate full-stack developer with over 5 years of experience building scalable web applications. 
          I love creating beautiful, user-friendly interfaces and solving complex technical challenges.
        </v-card-text>
        
        <v-list>
          <v-list-item
            v-for="(contact, index) in contacts"
            :key="index"
            class="py-2"
            slim
          >
            <template #prepend>
              <v-icon :icon="contact.icon" size="24" :color="contact.color"></v-icon>
            </template>
            <template #title>
              <NuxtLink
                :to="contact.link" class="text-subtitle-2 text-decoration-none"
              >
                {{ contact.link }}
              </NuxtLink>
            </template>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>

    <!-- User Posts -->
    <v-col cols="12" sm="12" md="8" lg="8">
      <!-- Post Creation Card -->
      <v-card
        class="pa-4 rounded-lg elevation-0"
      >
        <v-textarea
          label="What's on your mind?"
          variant="outlined"
          color="blue"
          rows="4"
          outlined
          clearable
        ></v-textarea>

        <v-card-title class="d-flex justify-space-between align-center px-0">
          <v-btn
            variant="text"
            prepend-icon="mdi-attachment"
            color="secondary"
          ><span class="text-caption font-weight-bold">Gallery</span></v-btn>

          <v-btn
            flat
            prepend-icon="mdi-send"
            color="secondary"
            text="Post"
          ></v-btn>
        </v-card-title>
      </v-card>

      <!-- User Posts List -->
      <UserSocialPost
        v-for="(post, index) in posts"
        :key="post.id"
        v-model:post="posts[index]"
      />
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { faker } from '@faker-js/faker';
import { color } from 'chart.js/helpers';
const accountCounts = ref([
  {
    counts: 123000,
    title: 'Friends',
    icon: 'mdi-account-multiple',
    color: 'primary',
  },
  {
    counts: 456000,
    title: 'Followers',
    icon: 'mdi-account',
    color: 'secondary',
  },
]);

const contacts = [
  {
    icon: 'mdi-web',
    link: faker.internet.url(),
    color: 'green',
  },
  {
    icon: 'mdi-github',
    link: faker.internet.url(),
    color: 'black',
  },
  {
    icon: 'mdi-linkedin',
    link: faker.internet.url(),
    color: 'blue',
  },
  {
    icon: 'mdi-twitter',
    link: faker.internet.url(),
    color: 'light-blue',
  }
];

const posts = ref([
  {
    id: 1,
    avatar: 'https://picsum.photos/seed/picsum/40/40',
    user: 'John Doe',
    time: '2 hours ago',
    content: 'Excited to share my latest project! Check it out and let me know what you think.',
    like: 0,
    comments: [],
  },
  {
    id: 2,
    avatar: 'https://picsum.photos/seed/picsum/40/40',
    user: 'Jane Smith',
    time: '3 hours ago',
    content: 'Just finished a new blog post on web development trends. Check it out!',
    like: 0,
    comments: [],
  },
  {
    id: 3,
    avatar: 'https://picsum.photos/seed/picsum/40/40',
    user: 'Alice Johnson',
    time: '1 day ago',
    content: 'Had a great time at the tech conference yesterday! Learned so much and met some amazing people.',
    like: 24,
    comments: [
      {
        id: 1,
        user: 'Bob Brown',
        avatar: 'https://picsum.photos/seed/picsum/40/40',
        text: 'Sounds like a great event! Wish I could have been there.',
        time: '1 hour ago',
        like: 5,
        replies: [
          {
            id: 1,
            user: 'Alice Johnson',
            avatar: 'https://picsum.photos/seed/picsum/40/40',
            text: 'It was! Maybe next time we can go together.',
            time: '30 minutes ago',
            like: 2,
          },
          {
            id: 2,
            user: 'Charlie White',
            avatar: 'https://picsum.photos/seed/picsum/40/40',
            text: 'I heard it was amazing! Looking forward to the next one.',
            time: '15 minutes ago',
            like: 1,
          }
        ]
      }
    ],
  }
]);
</script>