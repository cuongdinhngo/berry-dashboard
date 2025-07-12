<template>
  <v-row>
    <v-col cols="12" sm="12" md="8" lg="8">
      <!-- Data Card -->
      <v-row>
        <v-col cols="12" sm="12" md="6" lg="6">
          <v-card width="100%" min-height="200px" class="bg-secondary rounded-lg">
            <v-card-title class="d-flex justify-space-between mt-4 mb-5">
              <ItemHoverButton
                :button="{
                  icon: 'mdi-access-point',
                  color: 'white',
                  size: '42',
                  defaultVariant: 'tonal',
                  hoverVariant: 'tonal',
                  class: '',
                  id: '',
                }"
                @click="() => console.log('Button clicked')"
              />

              <ItemHoverButton
                :button="{
                  icon: 'mdi-dots-horizontal',
                  color: 'white',
                  size: '42',
                  defaultVariant: 'tonal',
                  hoverVariant: 'tonal',
                  class: '',
                  id: 'menu-activator',
                }"
                @click="() => console.log('Button clicked')"
              />
              <v-menu activator="#menu-activator">
                <v-list density="compact" slim nav>
                  <v-list-item
                    v-for="(item, index) in dataActions"
                    :key="index"
                    :value="index"
                    :title="item.title"
                    :prepend-icon="item.icon"
                  >
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-title>

            <v-card-title class="text-white">
              <div class="d-flex align-center">
                <p class="text-h3 text-white font-weight-bold mr-2">$900.00</p>
                <v-icon size="small">mdi-arrow-top-right-thin-circle-outline</v-icon>
              </div>
              <p class="text-caption font-weight-bold">Total Revenue</p>
            </v-card-title>
          </v-card>
        </v-col>

        <v-col cols="12" sm="12" md="6" lg="6">
          <v-card width="100%" min-height="200px" class="bg-primary rounded-lg">
            <v-card-title class="d-flex justify-space-between mt-4 mb-5">
              <ItemHoverButton
                :button="{
                  icon: 'mdi-cart-outline',
                  color: 'white',
                  size: '42',
                  defaultVariant: 'tonal',
                  hoverVariant: 'tonal',
                  class: '',
                  id: '',
                }"
                @click="() => console.log('Button clicked')"
              />

              <v-item-group>
                <v-item v-slot="{ isSelected }">
                  <v-btn
                    @click="tab = 'month'"
                    class="text-white font-weight-bold rounded-pill"
                    text="Month"
                    :variant="isSelected ? 'tonal' : 'text'"
                  >
                  </v-btn>
                </v-item>
                <v-item v-slot="{ isSelected }">
                  <v-btn
                    @click="tab = 'Year'"
                    class="text-white font-weight-bold rounded-pill"
                    text="Year"
                    :variant="isSelected ? 'tonal' : 'text'"
                  >
                  </v-btn>
                </v-item>
              </v-item-group>
            </v-card-title>
            <v-card-text>
              <v-tabs-window v-model="tab">
                <v-tabs-window-item value="month">
                  <v-row>
                    <v-col cols="6" sm="6" md="6" lg="6">
                      <v-card-title class="text-white px-0">
                        <div class="d-flex align-center">
                          <p class="text-h3 text-white font-weight-bold mr-2">$875</p>
                          <v-icon size="small">mdi-arrow-bottom-left-thin-circle-outline</v-icon>
                        </div>
                        <p class="text-caption font-weight-bold">Total Order</p>
                      </v-card-title>
                    </v-col>

                    <v-col cols="6" sm="6" md="6" lg="6">
                        <v-sparkline
                          :model-value="[0, 43, 12, 45, 23, 56, 34, 67, 89, 45, 23, 10]"
                          color="white"
                          auto-draw
                          :smooth="true"
                          :line-width="5"
                          padding="0"
                          height="100%"
                        >
                        </v-sparkline>
                    </v-col>
                  </v-row>
                </v-tabs-window-item>

                <v-tabs-window-item value="Year">
                  <v-row>
                    <v-col cols="6" sm="6" md="6" lg="6">
                      <v-card-title class="text-white px-0">
                        <div class="d-flex align-center">
                          <p class="text-h3 text-white font-weight-bold mr-2">$1300</p>
                          <v-icon size="x-small">mdi-arrow-top-right-bold-box-outline</v-icon>
                        </div>
                        <p class="text-caption font-weight-bold">Total Order</p>
                      </v-card-title>
                    </v-col>

                    <v-col cols="6" sm="6" md="6" lg="6">
                      <v-sparkline
                        :model-value="[10, 20, 30, 40, 50, 40, 70, 76, 89, 68, 104, 120]"
                        color="white"
                        auto-draw
                        :smooth="true"
                        :line-width="5"
                        padding="0"
                        height="100%"
                      >
                      </v-sparkline>
                    </v-col>
                  </v-row>
                </v-tabs-window-item>
              </v-tabs-window>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Bar Chart -->
      <v-row>
        <v-col cols="12" sm="12" md="12" lg="12">
          <v-card width="100%" min-height="300px" class="bg-background my-4 elevation-0 rounded-lg">
            <v-card-title class="d-flex justify-space-between align-center mt-4">
              <span class="text-subtitle-1 font-weight-bold">Sales Overview</span>
              <v-btn
                icon="mdi-dots-horizontal"
                variant="text"
                id="menu-actions"
                size="small"
                tile
                rounded="lg"
              ></v-btn>
              <v-menu activator="#menu-actions">
                <v-list density="compact" slim nav>
                  <v-list-item
                    v-for="(item, index) in ['Today', 'This Month', 'This Year']"
                    :key="index"
                    :value="index"
                    :title="item"
                  >
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-title>

            <v-card-text>
              <v-sparkline
                :model-value="[10, 20, 30, 40, 50, 40, 70, 76, 89, 68, 104, 120]"
                color="primary"
                :smooth="true"
                :line-width="5"
                padding="0"
                height="100%"
                auto-draw
                :fill="true"
              >
              </v-sparkline>
            </v-card-text>
          </v-card>

          <v-card width="100%" min-height="300px" class="bg-background my-4 elevation-0 rounded-lg">
            <v-card-title class="d-flex justify-space-between align-center mt-4">
              <span class="text-subtitle-1 font-weight-bold">Visitor Counts</span>
              <v-btn
                icon="mdi-dots-horizontal"
                variant="text"
                id="menu-actions"
                size="small"
                tile
                rounded="lg"
              ></v-btn>
              <v-menu activator="#menu-actions">
                <v-list density="compact" slim nav>
                  <v-list-item
                    v-for="(item, index) in ['Daily', 'Weekly', 'Monthly']"
                    :key="index"
                    :value="index"
                    :title="item"
                  >
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-title>

            <v-card-text>
              <v-sparkline
                :model-value="[1432, 2352, 3243, 1200, 4321, 2345, 6789, 1234, 5678, 9101, 1121, 3141]"
                color="secondary"
                :smooth="true"
                :line-width="2"
                padding="0"
                height="100%"
                auto-draw
              >
              </v-sparkline>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" sm="12" md="4" lg="4">
      <v-row>
        <v-col cols="12" sm="12" md="12" lg="12">
          <v-card width="100%" min-height="90px" class="bg-primary">
            <template #title>
              <span class="text-subtitle-1 text-white font-weight-bold">$203K</span>
            </template>
            <template #subtitle>
              <span class="text-caption text-white font-weight-bold">Total Income</span>
            </template>
            <template #prepend>
              <ItemHoverButton
                :button="{
                  icon: 'mdi-id-card',
                  color: 'white',
                  size: '42',
                  defaultVariant: 'tonal',
                  hoverVariant: 'tonal',
                  class: '',
                  id: 'menu-activator',
                }"
                @click="() => console.log('Button clicked')"
              />
            </template>
          </v-card>
        </v-col>

        <v-col cols="12" sm="12" md="12" lg="12">
          <v-card width="100%" min-height="85px" class="bg-background">
            <template #title>
              <span class="text-subtitle-1 text-on-surface font-weight-bold">$203K</span>
            </template>
            <template #subtitle>
              <span class="text-caption text-on-surface font-weight-bold">Total Income</span>
            </template>
            <template #prepend>
              <ItemHoverButton
                :button="{
                  icon: 'mdi-storefront-outline',
                  color: 'orange',
                  size: '42',
                  defaultVariant: 'tonal',
                  hoverVariant: 'tonal',
                  class: '',
                  id: 'menu-activator',
                }"
                @click="() => console.log('Button clicked')"
              />
            </template>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="12" md="12" lg="12">
          <v-card width="100%" min-height="600px" class="bg-background">
            <v-card-title class="d-flex justify-space-between align-center mt-4">
              <span class="text-subtitle-1 font-weight-bold">Popular Stocks</span>
              <v-btn
                icon="mdi-dots-horizontal"
                variant="text"
                id="menu-actions"
                size="small"
                tile
                rounded="lg"
              ></v-btn>
              <v-menu activator="#menu-actions">
                <v-list density="compact" slim nav>
                  <v-list-item
                    v-for="(item, index) in ['Today', 'This Month', 'This Year']"
                    :key="index"
                    :value="index"
                    :title="item"
                  >
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-title>

            <v-card class="mx-4 elevation-0 bg-deep-purple-lighten-5 rounded-lg mb-5">
              <template #title>
                <span class="text-subtitle-1 text-primary font-weight-bold">VN Index</span>
              </template>
              <template #subtitle>
                <span class="text-caption text-on-surface font-weight-bold">+0.5%</span>
              </template>
              <template #append>
                <span class="text-h6 text-on-surface font-weight-bold">$1345.00</span>
              </template>
              <v-card-text>
                <v-sparkline
                  :model-value="[10, 34, 67, 67, 89, 13, 56, 89, 59, 90, 104, 120]"
                  color="secondary"
                  auto-draw
                  :smooth="true"
                  :line-width="5"
                  padding="0"
                  height="100%"
                  :fill="true"
                >
                </v-sparkline>
              </v-card-text>
            </v-card>

            <ItemScrollableCard
              :height="300"
            >
              <v-list class="px-0">
                <v-list-item
                  v-for="(item, index) in stocks"
                  :key="index"
                  :title="item.title"
                  :subtitle="`${item.percent}%`"
                  class="px-0"
                >
                  <template #title>
                    <span class="text-subtitle-2 text-on-surfacek font-weight-bold">{{ item.title }}</span>
                  </template>
                  <template #subtitle>
                    <span class="text-caption text-on-surface font-weight-bold">{{ item.percent }}%</span>
                  </template>
                  <template #append>
                    <span :class="[
                      'text-subtitle-2 font-weight-bold', item.status === 'up' ? 'text-green' : 'text-red'
                    ]">${{ item.price }}</span>
                    <v-icon
                      :color="item.status === 'up' ? 'green' : 'red'"
                      size="small"
                      :icon="item.status === 'down' ? 'mdi-arrow-down-bold-box' : 'mdi-arrow-up-bold-box'"
                    ></v-icon>
                  </template>
                </v-list-item>
              </v-list>
            </ItemScrollableCard>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { faker } from '@faker-js/faker';

const stocks = [
  {
    title: faker.finance.accountName(),
    percent: faker.finance.amount({ min: 0, max: 100, dec: 2 }),
    price: faker.finance.amount({ min: 10, max: 1000, dec: 2 }),
    status: faker.helpers.arrayElement(['up', 'down']),
  },
  {
    title: faker.finance.accountName(),
    percent: faker.finance.amount({ min: 0, max: 100, dec: 2 }),
    price: faker.finance.amount({ min: 10, max: 1000, dec: 2 }),
    status: faker.helpers.arrayElement(['up', 'down']),
  },
  {
    title: faker.finance.accountName(),
    percent: faker.finance.amount({ min: 0, max: 100, dec: 2 }),
    price: faker.finance.amount({ min: 10, max: 1000, dec: 2 }),
    status: faker.helpers.arrayElement(['up', 'down']),
  },
  {
    title: faker.finance.accountName(),
    percent: faker.finance.amount({ min: 0, max: 100, dec: 2 }),
    price: faker.finance.amount({ min: 10, max: 1000, dec: 2 }),
    status: faker.helpers.arrayElement(['up', 'down']),
  },
  {
    title: faker.finance.accountName(),
    percent: faker.finance.amount({ min: 0, max: 100, dec: 2 }),
    price: faker.finance.amount({ min: 10, max: 1000, dec: 2 }),
    status: faker.helpers.arrayElement(['up', 'down']),
  },
  {
    title: faker.finance.accountName(),
    percent: faker.finance.amount({ min: 0, max: 100, dec: 2 }),
    price: faker.finance.amount({ min: 10, max: 1000, dec: 2 }),
    status: faker.helpers.arrayElement(['up', 'down']),
  },
  {
    title: faker.finance.accountName(),
    percent: faker.finance.amount({ min: 0, max: 100, dec: 2 }),
    price: faker.finance.amount({ min: 10, max: 1000, dec: 2 }),
    status: faker.helpers.arrayElement(['up', 'down']),
  },
  {
    title: faker.finance.accountName(),
    percent: faker.finance.amount({ min: 0, max: 100, dec: 2 }),
    price: faker.finance.amount({ min: 10, max: 1000, dec: 2 }),
    status: faker.helpers.arrayElement(['up', 'down']),
  },
]

const dataActions = [
  {
    title: 'Download Report',
    icon: 'mdi-download',
  },
  {
    title: 'Share Report',
    icon: 'mdi-share',
  },
  {
    title: 'Copy Data',
    icon: 'mdi-content-copy',
  },
  {
    title: 'Export Report',
    icon: 'mdi-export',
  },
];

const tab = ref('month');

function switchTab(newTab: string) {
  tab.value = newTab;
}
</script>