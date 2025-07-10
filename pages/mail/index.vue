<template>
  <ItemHeaderBreadcrumb
    header-title="Chats Page"
    :items="items"
  />

  <v-layout class="mt-4">
    <v-navigation-drawer
      width="320"
      class="elevation-0"
      :rounded="mdAndDown ? '' : 'lg'"
      floating
      v-model="mailList"
      :temporary="mdAndDown"
    >
      <v-list-item class="pt-4">
        <v-btn
          flat
          prepend-icon="mdi-plus-circle-outline"
          text="Compose"
          color="primary"
          width="100%"
          size="large"
        ></v-btn>
      </v-list-item>

      <ItemScrollableCard
        :height="600"
      >
        <v-list
          v-for="(menu, menuIndex) in mailMenu"
          :key="menuIndex"
          density="compact"
        >
          <v-list-subheader
            v-if="menu.head"
            class="text-subtitle-2 font-weight-bold"
          >
            {{ menu.head }}
          </v-list-subheader>
          <v-list-item
            v-for="(item, index) in menu.items"
            :key="index"
            :value="item.value"
            :title="item.title"
            color="secondary"
            class="rounded-lg"
            @click="filterMails(item.filter)"
          >
            <template #prepend>
              <v-icon
                :icon="item.icon"
                :color="item.color"
              />
            </template>
            <template #append>
              <v-chip 
                v-if="item.unread"
                color="primary"
                size="small"
                variant="elevated"
              >
                {{ item.unread }}
              </v-chip>
            </template>
          </v-list-item>
          <v-divider v-if="menuIndex < mailMenu.length - 1" class="my-2" />
        </v-list>
      </ItemScrollableCard>
    </v-navigation-drawer>

    <v-main
      :class="mailList ? 'ml-4' : ''"
    >
      <v-card
        v-if="!showMail"
        class="rounded-lg elevation-0"
      >
        <v-card-title 
          :class="[
            'd-flex border-b-thin',
            mdAndDown ? 'flex-column' : 'justify-space-between align-center'
          ]">
          <div class="d-flex align-center">
            <v-btn
              v-if="mdAndDown"
              variant="text"
              icon="mdi-menu"
              @click="mailList = !mailList"
            />
            <v-checkbox
              hide-details
              color="primary"
              :indeterminate="selectedMails.length > 0 && selectedMails.length < filteredMails.length"
              @click="selectAllMails"
            ></v-checkbox>
            <div
              v-if="selectedMails.length > 0"
              class="actions"
            >
              <v-btn
                variant="text"
                icon="mdi-trash-can-outline"
                size="small"
              />
              <v-btn
                variant="text"
                icon="mdi-email-variant"
                size="small"
              />
              <v-btn
                variant="text"
                icon="mdi-email-open"
                size="small"
              />
            </div>
          </div>

          <div class="d-flex align-center ga-2">
            <span class="text-caption">{{ `1-50 of 100` }}</span>
            <v-btn
              variant="text"
              icon="mdi-chevron-left"
              size="small"
            />
            <v-btn
              variant="text"
              icon="mdi-chevron-right"
              size="small"
            />
          </div>
        </v-card-title>

        <ItemScrollableCard
          :height="600"
        >
          <v-row
            v-for="(mail, index) in filteredMails"
            :key="mail.id"
            no-gutters
            class="border-b-thin cursor-pointer"
          >
            <v-col 
              cols="1" sm="1" md="2" lg="2" class="d-flex align-center justify-center"
            >
              <v-checkbox
                v-model="selectedMails"
                color="primary"
                :value="mail.id"
                hide-details
              ></v-checkbox>
              <v-rating
                v-if="!mdAndDown"
                v-model="mail.starred"
                :length="1"
                :size="40"
                clearable
                active-color="amber"
              />
              <v-rating
                v-if="!mdAndDown"
                v-model="mail.important"
                :length="1"
                :size="40"
                clearable
                empty-icon="mdi-label-variant-outline"
                full-icon="mdi-label-variant"
                active-color="amber"
              />
            </v-col>
            <v-col
              cols="2" sm="2" md="2" lg="2" class="d-flex align-center"
              @click="readMail(mail)"
            >
              <v-list-item>
                <template #prepend>
                  <v-avatar
                    size="30"
                    :image="mail.avatar"
                  />
                </template>
                <template #title>
                  <span
                    v-if="!mdAndDown"
                    :class="['text-caption', {'font-weight-bold': mail.unread}]"
                  >{{ mail.senderName }}</span>
                </template>
              </v-list-item>
            </v-col>
            <v-col
              @click="readMail(mail)"
              cols="8" sm="8" md="6" lg="6" class="d-flex align-center"
            >
              <span :class="['text-caption', mdAndDown ? 'text-wrap' : 'text-truncate', {'font-weight-bold': mail.unread}]">{{ mail.subject }}</span>
            </v-col>
            <v-col
              @click="readMail(mail)"
              cols="1" sm="1" md="2" lg="2" class="d-flex align-center justify-end"
            >
              <span :class="['text-caption', {'font-weight-bold': mail.unread}]">{{ useDateFormat(mail.timestamp, mdAndDown ? 'MMM DD' : 'MMM DD, YYYY') }}</span>
            </v-col>
          </v-row>
        </ItemScrollableCard>

      </v-card>

      <v-card
        v-if="showMail"
        class="rounded-lg elevation-0"
      >
        <v-card-title class="d-flex justify-space-between align-center border-b-thin">
          <div class="d-flex align-center ga-2">
            <v-btn
              variant="text"
              icon="mdi-arrow-left"
              @click="showMail = false"
            />
            <v-list-item>
              <template #prepend>
                <v-avatar
                  size="40"
                  :image="currentMail?.avatar"
                />
              </template>
              <template #title>
                <span class="text-subtitle-1 font-weight-bold">{{ currentMail?.senderName }}</span>
              </template>
              <template #subtitle>
                <span class="text-caption">From: {{ currentMail?.sender }}</span>
              </template>
            </v-list-item>
          </div>
          <span class="text-caption text-medium-emphasis">{{ useDateFormat(currentMail.timestamp, 'MMM DD, YYYY') }}</span>
        </v-card-title>

        <ItemScrollableCard
          :height="600"
        >
          <v-card-title class="text-subtitle-1 font-weight-bold">
            {{ currentMail?.subject }}
          </v-card-title>
          <v-card-text class="text-body-2">
            {{ currentMail?.content }}
          </v-card-text>
          <v-card-actions>
            <v-btn
              variant="outlined"
              prepend-icon="mdi-reply"
              text="Reply"
              size="small"
              color="primary"
            />
            <v-btn
              variant="outlined"
              prepend-icon="mdi-forward"
              text="Forward"
              size="small"
              color="primary"
            />
          </v-card-actions>
        </ItemScrollableCard>

      </v-card>
    </v-main>
  </v-layout>
</template>
<script setup lang="ts">
import { faker, fi } from '@faker-js/faker';
const { mdAndDown } = useDisplay();

interface MailFilter {
  type: string;
  value: string;
}

const mails = Array.from({ length: 50 }, () => ({
  id: faker.string.uuid(),
  subject: faker.lorem.sentence(),
  sender: faker.internet.email(),
  avatar: faker.image.avatar(),
  senderName: faker.person.fullName(),
  date: faker.date.past().toLocaleDateString(),
  type: faker.helpers.arrayElement(['inbox', 'sent', 'drafts', 'spam', 'trash']),
  content: faker.lorem.paragraphs(2),
  unread: faker.datatype.boolean(),
  attachments: faker.datatype.boolean(),
  starred: faker.number.int({ min: 0, max: 1 }),
  important: faker.number.int({ min: 0, max: 1 }),
  labels: faker.helpers.arrayElements(['work', 'personal', 'family', 'friends'], faker.number.int({ min: 1, max: 3 })),
  timestamp: faker.date.past(),
}));

const selectedMails = ref<string[]>([]);
const mailList = ref(false);
const currentMail = ref({});
const showMail = ref(false);
const filteredMails = ref(mails);

function readMail(mail: any) {
  currentMail.value = mail;
  showMail.value = true;
}

function selectAllMails() {
  if (selectedMails.value.length === filteredMails.value.length) {
    selectedMails.value = [];
  } else {
    selectedMails.value = filteredMails.value.map(mail => mail.id);
  }
}

function filterMails(filter: MailFilter = { type: 'menu', value: 'all' }) {
  if (filter.type === 'menu' && filter.value === 'all') {
    filteredMails.value = mails;
  }

  filteredMails.value = mails.filter(mail => {
    switch (filter.type) {
      case 'menu':
        return mail.type === filter.value;
      case 'label':
        return mail.labels.includes(filter.value);
      case 'starred':
        return mail.starred === 1;
      case 'important':
        return mail.important === 1;
      case 'unread':
        return mail.unread;
      default:
        return true;
    }
  });

}

const mailMenu = [
  {
    head: '',
    items: [
      {
        title: 'Inbox',
        icon: 'mdi-inbox',
        value: 'inbox',
        unread: 5,
        filter: { type: 'menu', value: 'inbox' }
      },
      {
        title: 'Sent',
        icon: 'mdi-send',
        value: 'sent',
        filter: { type: 'menu', value: 'sent' }
      },
      {
        title: 'Drafts',
        icon: 'mdi-file-document-outline',
        value: 'drafts',
        filter: { type: 'menu', value: 'drafts' }
      },
      {
        title: 'Spam',
        icon: 'mdi-alert-octagon-outline',
        value: 'spam',
        filter: { type: 'menu', value: 'spam' }
      },
      {
        title: 'Trash',
        icon: 'mdi-delete-outline',
        value: 'trash',
        unread: 5,
        filter: { type: 'menu', value: 'trash' }
      },
    ]
  },
  {
    head: 'Filters',
    items: [
      {
        title: 'Starred',
        icon: 'mdi-star',
        value: 'starred',
        filter: { type: 'starred', value: 1 }
      },
      {
        title: 'Important',
        icon: 'mdi-label-variant',
        value: 'important',
        filter: { type: 'important', value: 1 }
      },
      {
        title: 'Unread',
        icon: 'mdi-email-variant',
        value: 'unread',
        filter: { type: 'unread', value: true }
      },
    ]
  },
  {
    head: 'Labels',
    items: [
      {
        title: 'Work',
        icon: 'mdi-label',
        value: 'work',
        color: 'blue',
        filter: { type: 'label', value: 'work' }
      },
      {
        title: 'Personal',
        icon: 'mdi-label',
        value: 'personal',
        color: 'green',
        filter: { type: 'label', value: 'personal' }
      },
      {
        title: 'Family',
        icon: 'mdi-label',
        value: 'family',
        color: 'orange',
        filter: { type: 'label', value: 'family' }
      },
      {
        title: 'Friends',
        icon: 'mdi-label',
        value: 'friends',
        color: 'purple',
        filter: { type: 'label', value: 'friends' }
      }
    ]
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