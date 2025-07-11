<template>
  <ItemHeaderBreadcrumb
    header-title="Products"
    :items="items"
  />

  <!-- Search Product & Quick price filter -->
  <v-sheet class="border-b-thin bg-transparent my-4 py-4">
    <v-row no-gutters>
      <v-col cols="12" md="6" lg="6" class="d-flex align-center">
        <span class="text-h6 font-weight-bold">Shop</span>
      </v-col>
      <v-col
        cols="12" md="6" lg="6"
        class="d-flex text-end ga-2"
      >
        <v-text-field
          v-model="searchQuery"
          variant="outlined"
          placeholder="Search Product"
          prepend-inner-icon="mdi-magnify"
          hide-details
          density="compact"
          rounded="lg"
          @keyup="searchProducts"
        />
        <v-btn
          variant="text"
          color="secondary"
          prepend-icon="mdi-filter-outline"
          density="comfortable"
          text="Filter"
          size="large"
          @click="toggleFilter"
        ></v-btn>
        <v-select
          v-if="!mdAndDown"
          v-model="selectedSortBy"
          rounded="lg"
          variant="outlined"
          density="compact"
          color="primary"
          hide-details
          :items="['Price: Low to High', 'Price: High to Low', 'Popularity', 'Newest']"
          @update:model-value="sortProducts"
        ></v-select>
      </v-col>
      
    </v-row>
  </v-sheet>

  <v-sheet class="bg-transparent">
    <v-row no-gutters>
      <!-- Product List -->
      <v-col :cols="breakpoints.cols" :sm="breakpoints.sm" :md="breakpoints.md" :lg="breakpoints.lg">
        <v-row no-gutters>
          <v-col
            v-for="(product, index) in filteredProducts"
            :key="product.id"
            cols="12" sm="6" md="4" lg="4" class="pa-2"
          >
            <v-card class="elevation-0 rounded-lg">
              <v-responsive :aspect-ratio="16/9">
                <v-img
                  :src="product.imageUrl"
                  height="300px"
                  cover
                ></v-img>
              </v-responsive>
              <v-card-title class="text-subtitle-1 font-weight-bold py-4">{{ product.name }}</v-card-title>
              <v-card-subtitle class="text-subtitle-2 text-wrap" style="height: 40px;">{{ product.description }}</v-card-subtitle>
              <v-card-title class="d-flex align-center">
                <v-rating
                  :model-value="product.rating"
                  length="5"
                  half-increments
                  color="amber"
                  size="small"
                  readonly
                  density="compact"
                  class="pb-1"
                />
                <span class="text-subtitle-2 font-weight-bold ml-2">
                  ({{ product.vote }})
                </span>
              </v-card-title>
              <v-card-actions class="px-4">
                <span class="text-subtitle-1 font-weight-bold">
                  ${{ product.price }}
                </span>
                <v-spacer></v-spacer>
                <v-btn
                  variant="flat"
                  color="primary"
                  prepend-icon="mdi-cart-plus"
                  size="small"
                ></v-btn>                
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <!-- Filter Sidebar -->
      <v-col
        v-if="lgAndUp"
        v-show="filterSidebar"
        cols="12" md="3" lg="3" class="pa-2"
      >
        <EcomFilterSidebar
          v-model:selected-categories="selectedCategories"
          v-model:selected-color="selectedColor"
          v-model:selectedGender="selectedGender"
          v-model:selected-price="selectedPrice"
          v-model:selected-rating="selectedRating"
          @filter-change="filterProducts"
        />
      </v-col>
    </v-row>
  </v-sheet>

  <v-navigation-drawer
    v-model="drawer"
    app
    class="elevation-0"
    width="300"
    location="right"
    floating
  >
    <EcomFilterSidebar
      v-model:selected-categories="selectedCategories"
      v-model:selected-color="selectedColor"
      v-model:selectedGender="selectedGender"
      v-model:selected-price="selectedPrice"
      v-model:selected-rating="selectedRating"
      @filter-change="filterProducts"
    />
  </v-navigation-drawer>
</template>
<script setup lang="ts">
import { faker } from '@faker-js/faker';
const { mdAndDown, lgAndUp } = useDisplay();

interface Product {
  id: string;
  name: string;
  description: string;
  gender: string;
  categories: string[];
  color: string;
  price: string;
  rating: number;
  vote: number;
  imageUrl: string;
}

const products = Array.from({ length: 12 }, () => ({
  id: faker.string.uuid(),
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  gender: faker.helpers.arrayElement(['male', 'female', 'kids']),
  categories: faker.helpers.arrayElements(['clothing', 'electronics', 'kitchen', 'sports', 'toys'], { min: 1, max: 3 }),
  color: faker.helpers.arrayElement(['red', 'blue', 'grey', 'green', 'yellow', 'purple', 'orange', 'pink', 'black', 'white']),
  price: faker.commerce.price({ min: 10, max: 100, dec: 2 }),
  rating: faker.number.int({ min: 1, max: 5 }),
  vote: faker.number.int({ min: 100, max: 10000 }),
  imageUrl: `https://picsum.photos/200/300?random=${faker.number.int({ min: 1, max: 100 })}`,
  createdAt: faker.date.past().toISOString(),
}));


const drawer = ref(false);
const filterSidebar = ref(true);
const breakpoints = ref({
  cols: 12,
  sm: 12,
  md: 9,
  lg: 9,
});

const selectedColor = ref<string | null>(null);
const selectedGender = ref<string[]>([]);
const selectedCategories = ref<string[]>([]);
const selectedPrice = ref<string | null>(null);
const selectedRating = ref<number>(0);
const filteredProducts = ref([] as Product[]);
const selectedSortBy = ref<string>('Price: Low to High');
const searchQuery = ref('');

onMounted(() => {
  filteredProducts.value = products;
  sortProducts();
  filterProducts();
});

function searchProducts() {
  if (searchQuery.value) {
    filteredProducts.value = products.filter((product: Product) =>
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  } else {
    filteredProducts.value = products;
  }
  sortProducts();
}

function sortProducts() {
  if (selectedSortBy.value === 'Price: Low to High') {
    filteredProducts.value.sort((a, b) => a.price - b.price);
  } else if (selectedSortBy.value === 'Price: High to Low') {
    filteredProducts.value.sort((a, b) => b.price - a.price);
  } else if (selectedSortBy.value === 'Popularity') {
    filteredProducts.value.sort((a, b) => b.vote - a.vote);
  } else if (selectedSortBy.value === 'Newest') {
    filteredProducts.value.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
}

function filterProducts() {
  const matchedProducts = products.filter((product: Product) => {
    const matchesColor = !selectedColor.value || product.color === selectedColor.value;
    const matchesGender = selectedGender.value.length === 0 || selectedGender.value.includes(product.gender);
    const matchesCategories = selectedCategories.value.length === 0 || 
                             selectedCategories.value.includes('all') || 
                             selectedCategories.value.some(category => category !== 'all' && product.categories.includes(category));
    const matchesRating = selectedRating.value === 0 || product.rating >= selectedRating.value;

    let matchesPrice = true;
    if (selectedPrice.value) {
      switch (selectedPrice.value) {
        case 'below-10':
          matchesPrice = product.price < 10;
          break;
        case '20-50':
          matchesPrice = product.price >= 20 && product.price <= 50;
          break;
        case '50-100':
          matchesPrice = product.price >= 50 && product.price <= 100;
          break;
        case 'above-100':
          matchesPrice = product.price > 100;
          break;
        default:
          matchesPrice = false;
      }
    }

    return matchesColor && matchesGender && matchesCategories && matchesRating && matchesPrice;
  });

  filteredProducts.value = matchedProducts;
}

function toggleFilter() {
  if (mdAndDown.value) {
    drawer.value = !drawer.value;
  } else {
    breakpoints.value = {
      cols: filterSidebar.value ? 12 : 12,
      sm: filterSidebar.value ? 12 : 12,
      md: filterSidebar.value ? 12 : 9,
      lg: filterSidebar.value ? 12 : 9,
    };
    filterSidebar.value = !filterSidebar.value;
  }
}

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
    title: 'Product Page',
    iconOnly: false,
  },
];
</script>