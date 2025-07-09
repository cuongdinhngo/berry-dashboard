<template>
  <v-row>
    <!-- Profile Card -->
    <v-col cols="12" sm="12" md="4" lg="4">
      <v-card class="border-thin elevation-0 rounded-lg">
        <v-list-item
          prepend-avatar="https://picsum.photos/200/200?random=1"
          title="John Doe"
          subtitle="Web Developer"
          class="border-b-thin py-4"
        >
          <template #append>
            <v-chip color="primary"><span class="text-caption font-weight-bold">Pro</span></v-chip>
          </template>
        </v-list-item>

        <v-card-text>
          <v-list>
            <v-list-item
              v-for="(item, index) in contacts"
              :key="index"
              :class="['py-2', { 'border-b-thin': index < contacts.length - 1 }]"
              slim
            >
              <template #prepend>
                <v-icon :icon="item.icon" />
              </template>
              <template #title>
                <span class="text-subtitle-2 font-weight-bold">{{ item.title }}</span>
              </template>
              <template #append>
                <span class="text-subtitle-2 text-medium-emphasis">{{ item.value }}</span>
              </template>
            </v-list-item>
          </v-list>
        </v-card-text>

        <v-card-actions class="d-flex justify-space-between align-center">
          <div class="text-center flex-grow-1">
            <p class="text-h6 font-weight-bold">37</p>
            <span class="text-caption text-medium-emphasis">Mails</span>
          </div>
          <div class="text-center flex-grow-1">
            <p class="text-h6 font-weight-bold">3256</p>
            <span class="text-caption text-medium-emphasis">Followers</span>
          </div>
          <div class="text-center flex-grow-1">
            <p class="text-h6 font-weight-bold">986</p>
            <span class="text-caption text-medium-emphasis">Following</span>
          </div>
        </v-card-actions>
      </v-card>
    </v-col>

    <v-col cols="12" sm="12" md="8" lg="8">
      <v-card class="border-thin elevation-0 rounded-lg">
        <v-card-title class="d-flex justify-space-between align-center border-b-thin py-4">
          <span class="text-subtitle-2 font-weight-bold">About Me</span>
          <v-btn
            variant="text"
            icon="mdi-pencil"
            color="primary"
          />
        </v-card-title>
        <v-card-text>
          <v-card-text class="text-body-2">
            I am a web developer with a passion for creating beautiful and functional websites. I have experience in various web technologies and enjoy learning new skills.
            In my free time, I love to explore new places, read books, and spend time with my family and friends.
          </v-card-text>
          <v-card-text class="text-subtitle-2 font-weight-bold border-b-thin px-0 mx-4">Personal Details</v-card-text>
          <v-card-text class="">
            <v-row
              v-for="(detail, index) in personalDetails"
              :key="index"
            >
              <v-col cols="3" class="font-weight-bold">{{ detail.title }}</v-col>
              <v-col cols="1" class="font-weight-bold">:</v-col>
              <v-col cols="8">{{ detail.value }}</v-col>
            </v-row>
          </v-card-text>
        </v-card-text>
      </v-card>

      <v-card class="border-thin elevation-0 rounded-lg mt-4">
        <v-card-title class="d-flex justify-space-between align-center border-b-thin py-4">
          <span class="text-subtitle-2 font-weight-bold">Education</span>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-row
            v-for="(detail, index) in educationItems"
            :key="index"
          >
            <v-col cols="4" class="d-flex flex-column">
              <span class="text-subtitle-2 font-weight-bold">{{ detail.year }}</span>
              <span class="text-caption text-medium-emphasis">{{ detail.degree }}</span>
            </v-col>
            <v-col cols="8" class="d-flex flex-column">
              <span class="text-subtitle-2 font-weight-bold">{{ detail.title }}</span>
              <span class="text-caption text-medium-emphasis">{{ detail.institution }}</span>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <v-card class="border-thin elevation-0 rounded-lg mt-4">
        <v-card-title class="d-flex justify-space-between align-center border-b-thin py-4">
          <span class="text-subtitle-2 font-weight-bold">Employment</span>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-row
            v-for="(detail, index) in employmentItems"
            :key="index"
          >
            <v-col cols="4" class="d-flex flex-column">
              <span class="text-subtitle-2 font-weight-bold">{{ detail.year }}</span>
              <span class="text-caption text-medium-emphasis">{{ detail.type }}</span>
            </v-col>
            <v-col cols="8" class="d-flex flex-column">
              <span class="text-subtitle-2 font-weight-bold">{{ detail.title }}</span>
              <span class="text-caption text-medium-emphasis">{{ detail.description }}</span>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <v-card class="border-thin elevation-0 rounded-lg mt-4">
        <v-card-title class="d-flex justify-space-between align-center border-b-thin py-4">
          <span class="text-subtitle-2 font-weight-bold">Skills</span>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-row>
            <v-col
              v-for="(skill, index) in skills"
              :key="index"
              cols="6" class="d-flex flex-column"
            >
              <span class="text-subtitle-2 font-weight-bold">{{ skill.title }}</span>
                <v-progress-linear
                  height="20"
                  :model-value="skill.level"
                  color="primary"
                >
                  <span class="font-weight-bold text-caption">{{ Math.ceil(skill.level) }}%</span>
                </v-progress-linear>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { faker } from '@faker-js/faker';

const skills = [
  {
    title: 'JavaScript',
    level: 90,
  },
  {
    title: 'Vue.js',
    level: 85,
  },
  {
    title: 'Node.js',
    level: 80,
  },
  {
    title: 'HTML & CSS',
    level: 95,
  },
  {
    title: 'Python',
    level: 75,
  },
  {
    title: 'SQL',
    level: 70,
  }
];

const employmentItems = [
  {
    title: 'Senior Software Engineer',
    description: 'Leading the development team to build scalable web applications.',
    year: '2022 - Present',
    type: 'Full-time',
  },
  {
    title: 'Software Engineer Intern',
    description: 'Assisted in developing features for the company\'s main product.',
    year: '2019 - 2020',
    type: 'Internship',
  },
];

const educationItems = [
  {
    title: 'Master of Science in Software Engineering',
    institution: 'Tech University',
    year: '2020 - 2022',
    degree: 'Master',
  },
  {
    title: 'Bachelor of Science in Computer Science',
    institution: 'University of Technology',
    year: '2015 - 2019',
    degree: 'Bachelor',
  },
];

const contacts = [
  {
    title: 'Email',
    icon: 'mdi-email',
    value: faker.internet.email(),
  },
  {
    title: 'Phone',
    icon: 'mdi-phone',
    value: faker.phone.number(),
  },
  {
    title: 'Address',
    icon: 'mdi-map-marker',
    value: faker.location.city(),
  }
];

const personalDetails = [
  {
    title: 'Full Name',
    icon: 'mdi-account',
    value: faker.person.fullName(),
  },
  {
    title: 'Zodiac Sign',
    icon: 'mdi-account-circle',
    value: faker.person.zodiacSign(),
  },
  {
    title: 'Email',
    icon: 'mdi-email',
    value: faker.internet.email(),
  },
  {
    title: 'Phone Number',
    icon: 'mdi-phone',
    value: faker.phone.number(),
  },
  {
    title: 'Date of Birth',
    icon: 'mdi-cake',
    value: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).toLocaleDateString(),
  },
  {
    title: 'Location',
    icon: 'mdi-map-marker',
    value: faker.location.city(),
  },
  {
    title: 'Joined',
    icon: 'mdi-calendar',
    value: new Date().toLocaleDateString(),
  }
];
</script>