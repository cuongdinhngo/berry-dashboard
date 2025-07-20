<template>
  <ItemHeaderBreadcrumb
    header-title="Mail Page"
    :items="items"
  />

  <v-layout class="mt-4">
    <v-navigation-drawer
      v-model="chatList"
      width="320"
      class="elevation-0"
      :rounded="mdAndDown ? '' : 'lg'"
      floating
    >
      <v-list-item class="py-4">
        <template #prepend>
          <v-avatar
            size="40"
            image="https://cdn.vuetifyjs.com/images/lists/1.jpg"
          >
          </v-avatar>
        </template>

        <template #title>
          <span class="text-subtitle-2 font-weight-bold">John Doe</span>
        </template>

        <template #append>
          <v-btn
            variant="text"
            icon
            size="small"
          >
            <v-icon icon="mdi-chevron-down" />
            <v-menu activator="parent">
              <v-list density="compact" nav slim>
                <v-list-item title="Smile" prepend-icon="mdi-emoticon-excited-outline" />
                <v-list-item title="Cool" prepend-icon="mdi-emoticon-cool-outline" />
                <v-list-item title="Angry" prepend-icon="mdi-emoticon-angry-outline" />
                <v-list-item title="Sad" prepend-icon="mdi-emoticon-sad-outline" />
                <v-list-item title="Neutral" prepend-icon="mdi-emoticon-neutral-outline" />
                <v-list-item title="Winking" prepend-icon="mdi-emoticon-wink-outline" />
                <v-list-item title="Confused" prepend-icon="mdi-emoticon-confused-outline" />
                <v-list-item title="Kiss" prepend-icon="mdi-emoticon-kiss-outline" />
                <v-list-item title="Sick" prepend-icon="mdi-emoticon-sick-outline" />
              </v-list>
            </v-menu>
          </v-btn>
        </template>
      </v-list-item>

      <v-card-title>
        <v-text-field
          v-model="search"
          variant="outlined"
          placeholder="Search Contact"
          prepend-inner-icon="mdi-magnify"
          density="comfortable"
          hide-details
          clearable
          rounded="lg"
          @keyup="filterAccounts()"
        />
      </v-card-title>

      <ItemScrollableCard
        :height="600"
      >
        <v-list class="pa-0">
          <v-list-item
            v-for="(account, index) in filteredAccounts"
            :key="account.id"
            :value="account.id"
            class="border-b-thin py-3"
            @click="currentAccount = account"
          >
            <template #prepend>
              <v-avatar
                size="40"
                :image="account.avatar"
              />
              <v-badge
                v-if="account.color"
                :color="account.color"
                class="mt-4"
                dot
              />
            </template>
            <template #title>
              <span class="text-subtitle-2 font-weight-bold">{{ account.name }}</span>
            </template>
            <template #subtitle>
              <span class="text-caption text-medium-emphasis">{{ account.jobTitle }}</span>
            </template>
            <template #append>
              <div class="d-flex flex-column align-end">
                <p class="text-caption">{{ useTimeAgo(account.timestamp) }}</p>
                <v-chip
                  v-if="account.unreadCounts > 0"
                  color="secondary" size="x-small" variant="elevated"
                >{{ account.unreadCounts }}</v-chip>
              </div>
            </template>
          </v-list-item>
        </v-list>
      </ItemScrollableCard>
    </v-navigation-drawer>

    <v-main
      :class="chatList ? 'ml-4' : ''"
    >
      <v-card class="rounded-lg elevation-0">
        <v-card-title 
          :class="[
            'd-flex border-b-thin py-4',
            mdAndDown ? 'flex-column' : 'justify-space-between align-center'
          ]">
          <div class="d-flex align-center">
            <v-btn
              variant="text"
              icon="mdi-menu"
              @click="chatList = !chatList"
            />
            <v-list-item class="">
              <template #prepend>
                <v-avatar
                  size="40"
                  :image="currentAccount.avatar"
                />
                <v-badge
                  v-if="currentAccount.color"
                  :color="currentAccount.color"
                  class="mt-4"
                  dot
                />
              </template>
              <template #title>
                <span class="text-subtitle-2 font-weight-bold">{{ currentAccount.name }}</span>
              </template>
              <template #subtitle>
                <span class="text-caption text-medium-emphasis">Last seen: {{ useTimeAgo(currentAccount.lastSeen) }}</span>
              </template>
            </v-list-item>
          </div>

          <div class="d-flex align-center ga-2">
            <v-btn
              variant="text"
              icon="mdi-video"
              size="small"
            />
            <v-btn
              variant="text"
              icon="mdi-phone"
              size="small"
            />
            <v-btn
              variant="text"
              icon="mdi-information-variant-circle-outline"
              size="small"
            />
            <v-btn
              variant="text"
              icon
              size="small"
            >
              <v-icon icon="mdi-dots-horizontal" size="small" />
              <v-menu activator="parent">
                <v-list density="compact" nav slim>
                  <v-list-item title="View Profile" prepend-icon="mdi-account" />
                  <v-list-item title="Mute Notifications" prepend-icon="mdi-bell-off-outline" />
                  <v-list-item title="Block User" prepend-icon="mdi-block-helper" />
                  <v-list-item title="Delete Chat" prepend-icon="mdi-delete-outline" />
                </v-list>
              </v-menu>
            </v-btn>
          </div>
        </v-card-title>

        <ItemScrollableCard
          :height="600"
        >
          <div
            v-for="(message, index) in messages"
            :key="message.id"
            :class="[
              'd-flex mb-4',
              message.isSender ? 'justify-start' : 'justify-end'
            ]"
          >
            <div :class="message.isSender ? 'message-bubble-sender' : 'message-bubble-receiver'">
              <v-card-text
                :class="[
                  'pa-3 rounded-lg',
                  message.isSender ? 'bg-blue-lighten-4' : 'bg-purple-lighten-4'
                ]"
              >
                <p class="text-subtitle-2">{{ message.content }}</p>
                <p class="text-caption text-medium-emphasis text-end">{{ useTimeAgo(message.timestamp) }}</p>
              </v-card-text>
            </div>
          </div>
        </ItemScrollableCard>

        <v-card-actions>
          <v-btn variant="text" icon>
            <v-icon icon="mdi-emoticon-wink-outline"/>
            <v-menu activator="parent">
              <v-sheet class="pa-2">
                <v-row no-gutters>
                  <v-col
                    v-for="(emoji, index) in emojiList"
                    :key="index"
                    cols="2" sm="2" md="2" lg="2"
                  >
                    <v-icon :icon="emoji" size="24" />
                  </v-col>
                </v-row>
              </v-sheet>
            </v-menu>
          </v-btn>

          <v-text-field
            variant="outlined"
            placeholder="Type a message"
            density="comfortable"
            hide-details
            clearable
            rounded="lg"
          />

          <v-btn
            variant="text"
            icon="mdi-attachment"
            class="ml-2"
          />
          <v-btn
            variant="text"
            icon="mdi-send"
            class="ml-2"
          />
        </v-card-actions>
      </v-card>
    </v-main>
  </v-layout>
</template>
<script setup lang="ts">
import { fa, faker } from '@faker-js/faker';

const chatList = ref(true);
const { mdAndDown } = useDisplay();

const accounts = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: faker.person.fullName(),
  avatar: `https://picsum.photos/seed/${i + 1}/40/40`,
  jobTitle: faker.person.jobTitle(),
  color: faker.helpers.arrayElement(['green', 'amber', 'red', 'grey']),
  unreadCounts: faker.datatype.boolean() ? faker.number.int({ min: 0, max: 20 }) : 0,
  timestamp: faker.date.past({ years: 1, refDate: new Date() }),
  lastSeen: faker.date.past({ years: 1, refDate: new Date() }),
}));

const messages = ref(Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  isSender: faker.datatype.boolean(),
  content: faker.lorem.sentence(),
  timestamp: faker.date.recent({ days: 1 }),
})));

const filteredAccounts = ref(accounts);
const currentAccount = ref(accounts[0]);

const search = ref<string>('');
function filterAccounts() {
  if (!search.value || search.value.trim() === '') {
    filteredAccounts.value = accounts;
  } else {
    filteredAccounts.value = accounts.filter(account =>
      account.name.toLowerCase().includes(search.value.toLowerCase())
    );
  }
}

const emojiList = [
  'mdi-emoticon-excited-outline',
  'mdi-emoticon-cool-outline',
  'mdi-emoticon-angry-outline',
  'mdi-emoticon-sad-outline',
  'mdi-emoticon-neutral-outline',
  'mdi-emoticon-wink-outline',
  'mdi-emoticon-confused-outline',
  'mdi-emoticon-kiss-outline',
  'mdi-emoticon-sick-outline',
  'mdi-emoticon-happy-outline',
  'mdi-emoticon-cry-outline',
  'mdi-emoticon-tongue-outline',
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

<style scoped>
.message-bubble-sender,
.message-bubble-receiver {
  max-width: 70%;
  min-width: 120px;
  width: fit-content;
}

.message-bubble-sender {
  align-self: flex-start;
}

.message-bubble-receiver {
  align-self: flex-end;
}

.message-bubble-sender .v-card-text,
.message-bubble-receiver .v-card-text {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>