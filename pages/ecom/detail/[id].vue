<template>
  <ItemHeaderBreadcrumb
    header-title="Products"
    :items="items"
  />

  <v-card class="mt-4 pa-4 bg-background elevation-0 rounded-lg">
    <v-row no-gutters>
      <v-col cols="12" sm="12" md="6" lg="6" class="">
        <EcomImageGallery :images="images" />
      </v-col>
      <v-col cols="12" md="6" lg="6" class="">
        <v-card-title class="d-flex justify-space-between align-center px-0">
          <v-chip label rounded="xl" color="green">In Stock</v-chip>
          <v-rating
            length="1"
            clearable
            empty-icon="mdi-heart-outline"
            full-icon="mdi-heart"
            color="red"
            class="rounded-circle border-thin"
          />
        </v-card-title>

        <v-card-title class="d-flex align-center ga-2 px-0">
          <span class="text-h6 font-weight-bold">{{ faker.commerce.productName() }}</span>
          <v-chip color="blue" variant="outlined">New</v-chip>
        </v-card-title>

        <v-card-title class="text-wrap px-0">
          <p class="text-subtitle-2">{{ faker.commerce.productDescription() }}</p>
        </v-card-title>

        <v-card-title class="d-flex align-center ga-2 py-0">
          <v-rating
            model-value="4.5"
            length="5"
            half-increments
            color="amber"
            size="small"
            readonly
            density="compact"
            class="pb-1"
          />
          <span class="text-subtitle-2 text-medium-emphasis">(123)</span>
        </v-card-title>
        <v-card-title class="d-flex align-center ga-3">
          <span class="text-h6 font-weight-bold">
            ${{ faker.commerce.price() }}
          </span>
          <span class="text-subtitle-2 text-decoration-line-through text-medium-emphasis">
            ${{ faker.commerce.price() }}
          </span>
        </v-card-title>

        <v-divider></v-divider>

        <!-- Select Color -->
        <v-row no-gutters class="pa-2">
          <v-col cols="3" sm="3" md="3" lg="3">
            <span class="text-subtitle-1">Color:</span>
          </v-col>
          <v-col cols="9" sm="9" md="9" lg="9">
            <v-row no-gutters>
              <v-col
                v-for="color in ['red', 'blue', 'green', 'yellow']"
                :key="color"
                cols="3"
              >
                <v-avatar
                  :color="color"
                  class="border-thin"
                  size="30"
                  @click="selectedColor = color"
                >
                  <v-icon
                    v-if="selectedColor === color"
                    icon="mdi-check"
                    size="16"
                  />
                </v-avatar>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <!-- Select Size -->
        <v-row no-gutters class="pa-2">
          <v-col cols="3" sm="3" md="3" lg="3" class="align-self-center">
            <span class="text-subtitle-1">Size:</span>
          </v-col>
          <v-col cols="9" sm="9" md="9" lg="9">
            <v-select
              :items="['S', 'M', 'L', 'XL']"
              label="Select Size"
              variant="outlined"
              density="compact"
              width="70%"
              rounded="lg"
              hide-details
            ></v-select>
          </v-col>
        </v-row>

        <!-- Select Quantity -->
        <v-row no-gutters class="pa-2">
          <v-col cols="3" sm="3" md="3" lg="3" class="align-self-center">
            <span class="text-subtitle-1">Quantity:</span>
          </v-col>
          <v-col cols="9" sm="9" md="9" lg="9">
            <v-number-input
              control-variant="stacked"
              :min="1"
              hide-details
              density="compact"
              variant="outlined"
              rounded="lg"
              width="70%"
            ></v-number-input>
          </v-col>
        </v-row>

        <!-- Actions -->
        <v-row no-gutters class="py-4">
          <v-col cols="6" sm="6" md="6" lg="6" class="px-2">
            <v-btn
              variant="elevated"
              color="primary"
              prepend-icon="mdi-cart-plus"
              width="100%"
              rounded="lg"
            >
              Add to Cart
            </v-btn>
          </v-col>
          <v-col cols="6" sm="6" md="6" lg="6" class="px-2">
            <v-btn
              variant="elevated"
              color="secondary"
              prepend-icon="mdi-cash"
              width="100%"
              rounded="lg"
            >
              Buy Now
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-card-text class="px-0">
      <v-tabs
        color="primary"
        v-model="tab"
      >
        <v-tab value="description"><span class="font-weight-bold">Description</span></v-tab>
        <v-tab value="reviews"><span class="font-weight-bold mr-2">Reviews</span><v-chip color="secondary" size="small">230</v-chip></v-tab>
      </v-tabs>

      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="description">
          <v-card-text class="px-0">
            <v-expansion-panels v-model="description">
              <v-expansion-panel elevation="0" value="specifications">
                <template #title>
                  <span class="text-subtitle-1 font-weight-bold">Specifications</span>
                </template>
                <template #text>
                  <v-row>
                    <v-col cols="12" sm="6" md="6" lg="6">
                      <p class="text-subtitle-2">Brand: {{ faker.company.name() }}</p>
                      <p class="text-subtitle-2">Category: {{ faker.commerce.department() }}</p>
                      <p class="text-subtitle-2">Material: {{ faker.commerce.productMaterial() }}</p>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" lg="6">
                      <p class="text-subtitle-2">Color: {{ selectedColor || 'Not selected' }}</p>
                      <p class="text-subtitle-2">Size: M</p>
                      <p class="text-subtitle-2">Weight: 1.5kg</p>
                    </v-col>
                  </v-row>
                </template>
              </v-expansion-panel>

              <v-expansion-panel elevation="0" value="material-wash">
                <template #title>
                  <span class="text-subtitle-1 font-weight-bold">Material & Wash Instructions</span>
                </template>
                <template #text>
                  <v-row>
                    <v-col cols="12" sm="6" md="6" lg="6">
                      <p class="text-subtitle-2">Brand: {{ faker.company.name() }}</p>
                      <p class="text-subtitle-2">Category: {{ faker.commerce.department() }}</p>
                      <p class="text-subtitle-2">Material: {{ faker.commerce.productMaterial() }}</p>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" lg="6">
                      <p class="text-subtitle-2">Color: {{ selectedColor || 'Not selected' }}</p>
                      <p class="text-subtitle-2">Size: M</p>
                      <p class="text-subtitle-2">Weight: 1.5kg</p>
                    </v-col>
                  </v-row>
                </template>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-tabs-window-item>

        <v-tabs-window-item value="reviews" class="mt-4">
          <v-row no-gutters>
            <v-col cols="12" sm="12" md="4" lg="4" class="pa-2">
              <v-sheet class="pa-4 bg-background elevation-0 rounded-lg border-thin" height="250">
                <p class="text-h6 font-weight-bold text-center my-2">Average Rating</p>
                <p class="text-h4 font-weight-bold text-primary text-center my-8">4.5/5</p>
                <div class="d-flex align-center">
                  <v-rating
                    model-value="4.5"
                    length="5"
                    half-increments
                    color="amber"
                    size="large"
                    readonly
                    density="comfortable"
                  />
                  <span class="text-subtitle-2 text-medium-emphasis">
                    (123)
                  </span>
                </div>
              </v-sheet>
            </v-col>
            <v-col cols="12" sm="12" md="4" lg="4" class="pa-2">
              <v-sheet class="pa-4 bg-background elevation-0 rounded-lg border-thin" height="250">
                <v-list-item
                  v-for="(item, index) in reviewData"
                  :key="index"
                >
                  <template #prepend>
                    <span class="mr-2">{{ item.label }}</span>
                  </template>
                  <template #title>
                    <v-progress-linear
                      :model-value="item.value"
                      color="secondary"
                      height="5"
                    ></v-progress-linear>
                  </template>
                  <template #append>
                    <span class="ml-2">({{ item.count }})</span>
                  </template>
                </v-list-item>
              </v-sheet>
            </v-col>
            <v-col cols="12" sm="12" md="4" lg="4" class="pa-2">
              <v-sheet class="pa-4 bg-background elevation-0 rounded-lg border-thin d-flex align-center justify-center" height="250">
                <v-btn
                  variant="outlined"
                  color="primary"
                  width="70%"
                  rounded="lg"
                  prepend-icon="mdi-pencil"
                  size="large"
                >
                  Write a Review
                </v-btn>
              </v-sheet>
            </v-col>
          </v-row>

          <v-list-item
            v-for="(review, index) in reviews"
            :key="index"
            :prepend-avatar="review.avatar"
            class="pa-4 border-thin my-5 rounded-lg mx-2"
          >
            <v-list-item-title class="text-subtitle-2 font-weight-bold">{{ review.name }}</v-list-item-title>
            <v-rating
              :model-value="review.rating"
              length="5"
              half-increments
              color="amber"
              size="x-small"
              density="comfortable"
              readonly
            ></v-rating>
            <p class="text-subtitle-2">{{ review.comment }}</p>
          </v-list-item>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
import { fa, faker } from '@faker-js/faker';

const selectedColor = ref('');
const tab = ref('one');
const description = ref('specifications');

const images = [
  'https://picsum.photos/id/1015/400/400',
  'https://picsum.photos/id/1016/400/400',
  'https://picsum.photos/id/1018/400/400',
  'https://picsum.photos/id/1020/400/400',
  'https://picsum.photos/id/1022/400/400',
  'https://picsum.photos/id/1023/400/400',
  'https://picsum.photos/id/1021/400/400',
  'https://picsum.photos/id/1024/400/400',
  'https://picsum.photos/id/1025/400/400',
];

const reviews = Array.from({ length: 10 }, () => ({
  name: faker.person.fullName(),
  avatar: faker.image.avatar(),
  rating: faker.number.int({ min: 1, max: 5 }),
  comment: faker.lorem.paragraph(),
}));

const reviewData = [
  {
    label: '1 Stars',
    value: 20,
    count: 123,
  },
  {
    label: '2 Stars',
    value: 30,
    count: 45,
  },
  {
    label: '3 Stars',
    value: 40,
    count: 67,
  },
  {
    label: '4 Stars',
    value: 50,
    count: 89,
  },
  {
    label: '5 Stars',
    value: 60,
    count: 123,
  },
];

const items = [
  {
    title: 'Home',
    icon: 'mdi-home',
    iconOnly: true,
  },
  {
    title: 'Ecommerce',
    to: { name: 'ecom-products' },
    iconOnly: false,
  },
  {
    title: 'Product Detail',
    iconOnly: false,
  },
];
</script>