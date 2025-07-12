<template>
  <table class="mt-4">
    <tr>
      <td class="text-subtitle-2 font-weight-bold">Subtotal:</td>
      <td class="text-subtitle-2 font-weight-bold text-end">${{ products.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2) }}</td>
    </tr>
    <tr>
      <td class="text-subtitle-2 font-weight-bold">Tax (5%):</td>
      <td class="text-subtitle-2 font-weight-bold text-end">${{ (products.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 0.05).toFixed(2) }}</td>
    </tr>
    <tr>
      <td class="text-subtitle-2 font-weight-bold">Shipping:</td>
      <td class="text-subtitle-2 font-weight-bold text-end">${{ shippingCost }}</td>
    </tr>
    <tr>
      <td class="text-subtitle-2 font-weight-bold">Total:</td>
      <td class="text-subtitle-2 font-weight-bold text-end">
        ${{ totalPrice.toFixed(2) }}
      </td>
    </tr>
  </table>
</template>
<script setup lang="ts">
import { de } from '@faker-js/faker';

const products = defineModel('products', {
  type: Array as () => Array<{ id: number; price: number; quantity: number, name: string, size: string, color: string }>,
  default: () => []
});

const shippingCost = defineModel('shippingCost', {
  type: Number,
  default: 0
});

const totalPrice = computed(() => {
  const subtotal = products.value.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.05;

  return subtotal + tax + shippingCost.value;
});

</script>
<style scoped>
table {
  font-family: arial, sans-serif;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #dddddd;
}

td, th {
  border-bottom: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
</style>