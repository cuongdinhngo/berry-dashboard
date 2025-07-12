<template>
  <ItemHeaderBreadcrumb
    header-title="Products"
    :items="items"
  />

  <v-card
    class="mt-4 elevation-0 rounded-lg bg-background pa-4"
  >
    <v-tabs
      v-model="tab"
      :hide-slider="true"
    >
      <v-tab value="cart" color="primary">
        <div class="d-flex flex-row align-center">
          <v-icon class="me-2" size="large">mdi-cart-outline</v-icon>
          <div class="d-flex flex-column align-start">
            <span class="text-caption font-weight-bold">Cart</span>
            <span class="text-caption">Manage cart items</span>
          </div>
        </div>
      </v-tab>
      <v-tab value="billing" color="primary">
        <div class="d-flex flex-row align-center">
          <v-icon class="me-2" size="large">mdi-account-file-text-outline</v-icon>
          <div class="d-flex flex-column align-start">
            <span class="text-caption font-weight-bold">Billing</span>
            <span class="text-caption">Billing Information</span>
          </div>
        </div>
      </v-tab>
      <v-tab value="payment" color="primary">
        <div class="d-flex flex-row align-center">
          <v-icon class="me-2" size="large">mdi-cash-multiple</v-icon>
          <div class="d-flex flex-column align-start">
            <span class="text-caption font-weight-bold">Payment</span>
            <span class="text-caption">Payment Methods</span>
          </div>
        </div>
      </v-tab>
    </v-tabs>

    <v-card-text class="mt-4">
      <v-tabs-window v-model="tab">
        <!-- Cart Items -->
        <v-tabs-window-item value="cart">
          <v-card-title class="text-subtitle-2 font-weight-bold">
            Cart Items ({{ products.length }})
          </v-card-title>

          <v-data-table
            :headers="headers"
            :items="products"
          >
            <template #item.image="{ item }">
              <v-list-item
                class="px-0 my-3"
              >
                <template #prepend>
                  <v-img
                    :src="item.image"
                    width="70"
                    height="70"
                    cover
                    class="rounded-lg mr-2"
                  />
                </template>
                <v-list-item-title class="text-subtitle-2 font-weight-bold">
                  {{ item.name }}
                </v-list-item-title>
                <v-list-item-title class="text-caption">
                  Size: {{ item.size }}, Color: {{ item.color }}
                </v-list-item-title>
              </v-list-item>
            </template>

            <template #item.price="{ item }">
              <span class="text-subtitle-1 font-weight-bold">${{ item.price.toFixed(2) }}</span>
            </template>

            <template #item.quantity="{ item }">
              <v-number-input
                v-model="item.quantity"
                :min="1"
                density="compact"
                hide-details
                rounded="lg"
                control-variant="stacked"
                variant="outlined"
                color="primary"
                width="100px"
              />
            </template>

            <template #item.total="{ item }">
              <span class="text-subtitle-1 font-weight-bold">${{ (item.price * item.quantity).toFixed(2) }}</span>
            </template>

            <template #item.actions="{ item }">
              <v-btn
                variant="text"
                icon="mdi-delete-outline"
              ></v-btn>
            </template>
          </v-data-table>

          <EcomOrderSummaryTable
            v-model:products="products"
            v-model:shipping-cost="shippingCost"
          />

          <v-card-actions class="mt-4 d-flex justify-space-between">
            <v-btn
              variant="outlined"
              color="primary"
              :to="{ name: 'ecom-products' }"
            >
              Continue Shopping
            </v-btn>
            <v-btn
              variant="elevated"
              color="primary"
              @click="tab = 'billing'"
            >
              Place Order
            </v-btn>
          </v-card-actions>
        </v-tabs-window-item>

        <!-- Billing Information -->
        <v-tabs-window-item value="billing">
          <v-row no-gutters>
            <v-col cols="12" sm="12" md="9" lg="9" class="my-2 pa-1">
              <v-card-title class="d-flex justify-space-between">
                <span class="text-subtitle-2 font-weight-bold">Billing Information</span>
                <v-btn
                  variant="flat"
                  color="primary"
                  prepend-icon="mdi-plus-circle-outline"
                  text="Add Address"
                  size="small"
                />
              </v-card-title>

              <v-row no-gutters>
                <v-col
                  v-for="(address, index) in addresses"
                  :key="address.id"
                  cols="12" sm="12" md="6" lg="6"
                  :class="[{
                    'pr-1': index % 2 === 0 && index < addresses.length - 1,
                    'pl-1': index % 2 === 1
                  }, 'my-1']"
                >
                  <v-card class="elevation-0 rounded-lg border-thin" min-height="180px">
                    <v-card-title class="d-flex justify-space-between" style="height: 50px;">
                      <div class="d-flex align-center">
                        <span class="text-subtitle-2 font-weight-bold">{{ address.name }}</span>
                        <span class="text-caption ml-2">({{ address.type }})</span>
                      </div>
                      <v-chip
                        v-if="address.isDefault"
                        color="primary"
                      >Default</v-chip>
                    </v-card-title>
                    <v-card-text>
                      <p class="text-subtitle-2">{{ address.address }}</p>
                      <p class="text-subtitle-2">Phone: {{ address.phone }}</p>
                    </v-card-text>
                    <v-card-actions class="d-flex align-center justify-space-between">
                      <v-btn
                        variant="outlined"
                        color="primary"
                        text="Deliver to this Address"
                        @click="shippingAddress = address"
                      />
                      <div class="d-flex">
                        <v-btn
                          variant="text"
                          icon="mdi-pencil-outline"
                        />
                        <v-btn
                          variant="text"
                          icon="mdi-delete-outline"
                        />
                      </div>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>

              <EcomOrderSummaryTable
                v-model:products="products"
                v-model:shipping-cost="shippingCost"
              />
            </v-col>
            <v-col cols="12" sm="12" md="3" lg="3" class="my-2 pa-1">
              <v-card class="elevation-0 rounded-lg border-thin py-3 px-2">
                <v-list-item slim class="px-1">
                  <template #prepend>
                    <v-avatar size="30" class="mr-1">
                      <v-img :src="faker.image.personPortrait()" />
                    </v-avatar>
                  </template>
                  <v-list-item-title class="text-subtitle-1 font-weight-bold">{{ faker.person.fullName() }}</v-list-item-title>
                </v-list-item>
                <div class="d-flex flex-column ma-2">
                  <span class="text-caption text-medium-emphasis">Email:</span>
                  <span class="text-body-2 font-weight-bold">{{ faker.internet.email() }}</span>
                </div>
                <div class="d-flex flex-column ma-2">
                  <span class="text-caption text-medium-emphasis">Phone:</span>
                  <span class="text-body-2 font-weight-bold">{{ faker.phone.number() }}</span>
                </div>
              </v-card>

              <p class="text-subtitle-1 font-weight-bold my-4 mx-2">Shipping Address</p>

              <v-card class="elevation-0 rounded-lg border-thin" min-height="150px">
                <v-card-title class="d-flex justify-space-between align-center" style="height: 50px;">
                  <div class="d-flex align-center">
                    <span class="text-subtitle-2 font-weight-bold">{{ shippingAddress.name }}</span>
                    <span class="text-caption ml-2">({{ shippingAddress.type }})</span>
                  </div>
                  <v-chip color="primary" size="small">Default</v-chip>
                </v-card-title>
                <v-card-text>
                  <p class="text-subtitle-2">{{ shippingAddress.address }}</p>
                  <p class="text-subtitle-2">Phone: {{ shippingAddress.phone }}</p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <v-card-actions class="mt-4 d-flex justify-space-between">
            <v-btn
              variant="outlined"
              color="primary"
              text="Back"
              @click="tab = 'cart'"
            />
            <v-btn
              variant="elevated"
              color="primary"
              text="Place Order"
              @click="tab = 'payment'"
            />
          </v-card-actions>
        </v-tabs-window-item>

        <!-- Payment Method -->
        <v-tabs-window-item value="payment">
          <v-row no-gutters>
            <v-col cols="12" sm="12" md="7" lg="7" class="my-2 pa-1">
              <v-card-title class="text-subtitle-2 font-weight-bold">
                Delivery Options
              </v-card-title>

              <v-radio-group v-model="selectedDelivery">
                <v-row no-gutters>
                  <v-col cols="12" sm="12" md="6" lg="6" class="my-2 pa-1">
                    <v-card
                      class="elevation-0 rounded-lg border-thin"
                      text="Delivery within 5-7 business days."
                      @click="selectedDelivery = 'standard'; shippingCost = 0"
                      style="cursor: pointer;"
                    >
                      <template #prepend>
                        <v-radio
                          value="standard"
                          color="primary"
                          density="compact"
                          hide-details
                          @change="shippingCost = 0"
                        ></v-radio>
                      </template>
                      <template #title>
                        <div class="d-flex flex-column">
                          <span class="text-subtitle-2 font-weight-bold">Standard Delivery (Free)</span>
                        </div>
                      </template>
                    </v-card>
                  </v-col>
                  <v-col cols="12" sm="12" md="6" lg="6" class="my-2 pa-1">
                    <v-card
                      class="elevation-0 rounded-lg border-thin"
                      text="Delivery within 1-2 business days."
                      @click="selectedDelivery = 'express'; shippingCost = 5"
                      style="cursor: pointer;"
                    >
                      <template #prepend>
                        <v-radio
                          value="express"
                          color="primary"
                          density="compact"
                          hide-details
                          @change="shippingCost = 5"
                        ></v-radio>
                      </template>
                      <template #title>
                        <div class="d-flex flex-column">
                          <span class="text-subtitle-2 font-weight-bold">Express Delivery ($5)</span>
                        </div>
                      </template>
                    </v-card>
                  </v-col>
                </v-row>
              </v-radio-group>

              <v-card-title class="text-subtitle-2 font-weight-bold">
                Payment Options
              </v-card-title>

              <v-radio-group v-model="selectedPayment">
                <v-row no-gutters>
                  <v-col cols="12" sm="12" md="6" lg="6" class="my-2 pa-1">
                    <v-card
                      class="elevation-0 rounded-lg border-thin"
                      text="We support all major credit cards."
                      min-height="110px"
                      @click="selectedPayment = 'card'"
                      style="cursor: pointer;"
                    >
                      <template #prepend>
                        <v-radio
                          value="card"
                          color="primary"
                          density="compact"
                          hide-details
                        ></v-radio>
                      </template>
                      <template #title>
                        <div class="d-flex flex-column">
                          <span class="text-subtitle-2 font-weight-bold">Credit/Debit Card</span>
                        </div>
                      </template>
                    </v-card>
                  </v-col>
                  <v-col cols="12" sm="12" md="6" lg="6" class="my-2 pa-1">
                    <v-card
                      class="elevation-0 rounded-lg border-thin"
                      text="Pay with cash when the product is delivered."
                      min-height="110px"
                      @click="selectedPayment = 'cod'"
                      style="cursor: pointer;"
                    >
                      <template #prepend>
                        <v-radio
                          value="cod"
                          color="primary"
                          density="compact"
                          hide-details
                        ></v-radio>
                      </template>
                      <template #title>
                        <div class="d-flex flex-column">
                          <span class="text-subtitle-2 font-weight-bold">Cash on Delivery</span>
                        </div>
                      </template>
                    </v-card>
                  </v-col>
                </v-row>
              </v-radio-group>
            </v-col>

            <v-col cols="12" sm="12" md="5" lg="5" class="my-2 pa-1">
              <v-card-title class="text-subtitle-2 font-weight-bold px-0">
                Cart Items
              </v-card-title>

              <v-list-item
                v-for="(item, index) in products"
                :key="item.id"
                class="px-0"
              >
                <template #prepend>
                  <v-img :src="item.image" height="70" width="70" rounded="lg" class="mr-2"/>
                </template>
                <template #title>
                  <span class="text-subtitle-1 font-weight-bold">{{ item.name }}</span>
                </template>
                <template #subtitle>
                  <span class="text-subtitle-2">Size: {{ item.size }}, Color: {{ item.color }}</span>
                </template>
                <span class="text-subtitle-1 font-weight-bold">${{ item.price.toFixed(2) }}</span>
              </v-list-item>

              <EcomOrderSummaryTable
                v-model:products="products"
                v-model:shipping-cost="shippingCost"
              />
            </v-col>
          </v-row>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
import { fa, faker } from '@faker-js/faker';
const tab = ref('cart');

const selectedDelivery = ref('standard');
const selectedPayment = ref('cod');
const shippingCost = ref(0);

const products = ref([
  {
    id: 1,
    image: faker.image.personPortrait(),
    name: 'Product 1',
    price: 29.99,
    size: 'M',
    color: 'Red',
    quantity: 1
  },
  {
    id: 2,
    image: faker.image.personPortrait(),
    name: faker.commerce.productName(),
    price: 31.99,
    size: 'M',
    color: 'Red',
    quantity: 1
  },
  {
    id: 3,
    image: faker.image.personPortrait(),
    name: faker.commerce.productName(),
    price: 9.99,
    size: 'M',
    color: 'Green',
    quantity: 1
  },
]);

const headers = ref([
  { align: 'start' as const, key: 'image', title: 'Product', sortable: false },
  { key: 'price', title: 'Price', sortable: false },
  { key: 'quantity', title: 'Quantity', sortable: false },
  { key: 'total', title: 'Total', sortable: false },
  { key: 'actions', title: 'Actions', sortable: false }
]);

const addresses = ref([
  {
    id: 1,
    name: 'John Doe',
    type: 'Home',
    address: '123 Main St, Springfield, IL 62701',
    phone: '(555) 123-4567',
    isDefault: true
  },
  {
    id: 2,
    name: 'Jane Smith',
    type: 'Office',
    address: '456 Elm St, Springfield, IL 62701',
    phone: '(555) 987-6543',
    isDefault: false
  }
]);
const shippingAddress = ref(addresses.value[0]);


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
    title: 'Checkout Page',
    iconOnly: false,
  },
];
</script>
