<template>
  <v-sheet class="pa-4 rounded-lg elevation-0">
    <v-expansion-panels>
      <!-- Gender Filter -->
      <v-expansion-panel elevation="0">
        <template #title>
          <span class="text-subtitle-2 font-weight-bold">Gender</span>
        </template>
        <template #text>
          <div class="d-flex flex-row justify-space-between">
            <v-checkbox
              v-for="item in gender"
              :key="item.value"
              v-model="selectedGender"
              :value="item.value"
              density="compact"
              hide-details
              color="primary"
              @change="handleFilterChange"
            >
              <template #label>
                <span class="text-subtitle-2">{{ item.title }}</span>
              </template>
            </v-checkbox>
          </div>
        </template>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-expansion-panels>
      <!-- Categories Filter -->
      <v-expansion-panel elevation="0">
        <template #title>
          <span class="text-subtitle-2 font-weight-bold">Categories</span>
        </template>
        <template #text>
          <v-row no-gutters>
            <v-col
              v-for="item in categories"
              :key="item.value"
              cols="6" sm="6"
            >
              <v-checkbox
                v-model="selectedCategories"
                :value="item.value"
                density="compact"
                hide-details
                color="primary"
                @change="handleFilterChange"
              >
                <template #label>
                  <span class="text-subtitle-2">{{ item.title }}</span>
                </template>
              </v-checkbox>
            </v-col>
          </v-row>
        </template>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-expansion-panels>
      <!-- Color Filter -->
      <v-expansion-panel elevation="0">
        <template #title>
          <span class="text-subtitle-2 font-weight-bold">Colors</span>
        </template>
        <template #text>
          <v-row no-gutters>
            <v-col
              v-for="item in colors"
              :key="item.value"
              cols="2" sm="2"
              class="my-2"
            >
              <v-avatar
                v-model="selectedColor"
                :color="item.value"
                size="32"
                class="border-thin"
                @click="selectedColor = item.value; handleFilterChange()"
              >
                <v-icon
                  v-if="selectedColor === item.value"
                  icon="mdi-check"
                />
              </v-avatar>
            </v-col>
          </v-row>
        </template>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-expansion-panels>
      <!-- Price Filter -->
      <v-expansion-panel elevation="0">
        <template #title>
          <span class="text-subtitle-2 font-weight-bold">Price</span>
        </template>
        <template #text>
          <v-radio-group
            hide-details
            v-model="selectedPrice"
          >
          <v-row no-gutters>
              <v-col
                v-for="item in priceOptions"
                :key="item.value"
                cols="6" sm="6"
              >
                <v-radio
                  :value="item.value"
                  density="compact"
                  hide-details
                  color="primary"
                  @change="handleFilterChange"
                >
                  <template #label>
                    <span class="text-subtitle-2">{{ item.title }}</span>
                  </template>
                </v-radio>
              </v-col>
          </v-row>
          </v-radio-group>
        </template>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-expansion-panels>
      <!-- Rating Filter -->
      <v-expansion-panel elevation="0">
        <template #title>
          <span class="text-subtitle-2 font-weight-bold">Rating</span>
        </template>
        <template #text>
          <v-rating
            v-model="selectedRating"
            length="5"
            color="amber"
            density="compact"
            clearable
            @update:model-value="handleFilterChange"
          />
        </template>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-card-actions>
      <v-btn
        variant="elevated"
        color="primary"
        size="large"
        width="100%"
        @click="resetFilters"
      >
        Clear All
      </v-btn>
    </v-card-actions>
  </v-sheet>
</template>
<script setup lang="ts">

const emit = defineEmits(['filterChange']);

function handleFilterChange() {
  emit('filterChange');
}

function resetFilters() {
  selectedColor.value = null;
  selectedGender.value = [];
  selectedCategories.value = [];
  selectedPrice.value = null;
  selectedRating.value = 0;
  handleFilterChange();
}

const selectedColor = defineModel<string | null>('selectedColor', {
  default: null
});
const selectedGender = defineModel('selectedGender', {
  default: [] as string[]
});
const selectedCategories = defineModel<string[]>('selectedCategories', {
  default: []
});
const selectedPrice = defineModel<string | null>('selectedPrice', {
  default: null
});
const selectedRating = defineModel<number>('selectedRating', {
  default: 0
});

const priceOptions = [
  {
    title: 'Below $10',
    value: 'below-10'
  },
  {
    title: '$20 - $50',
    value: '20-50'
  },
  {
    title: '$50 - $100',
    value: '50-100'
  },
  {
    title: 'Above $100',
    value: 'above-100'
  }
];

const colors = [
  {
    title: 'Red',
    value: 'red'
  },
  {
    title: 'Blue',
    value: 'blue'
  },
  {
    title: 'Green',
    value: 'green'
  },
  {
    title: 'Yellow',
    value: 'yellow'
  },
  {
    title: 'Purple',
    value: 'purple'
  },
  {
    title: 'Orange',
    value: 'orange'
  },
  {
    title: 'Pink',
    value: 'pink'
  },
  {
    title: 'Grey',
    value: 'grey'
  },
  {
    title: 'Black',
    value: 'black'
  },
  {
    title: 'White',
    value: 'white'
  }
];

const gender = [
  {
    title: 'Male',
    value: 'male'
  },
  {
    title: 'Female',
    value: 'female'
  },
  {
    title: 'Kids',
    value: 'kids'
  }
];

const categories = [
  {
    title: 'All',
    value: 'all'
  },
  {
    title: 'Clothing',
    value: 'clothing'
  },
  {
    title: 'Electronics',
    value: 'electronics'
  },
  {
    title: 'Kitchen',
    value: 'kitchen'
  },
  {
    title: 'Sports',
    value: 'sports'
  },
  {
    title: 'Toys',
    value: 'toys'
  }
];
</script>