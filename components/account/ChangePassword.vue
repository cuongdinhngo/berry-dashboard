<template>
  <v-card class="border-thin elevation-0 rounded-lg">
    <v-card-title class="text-subtitle-2 font-weight-bold border-b-thin pb-4">
      Change Password
    </v-card-title>
    <v-card-text class="mt-4">
      <v-row no-gutters>
        <v-col cols="12" md="8" class="mx-auto mt-4">
          <v-text-field
            label="Current Password"
            variant="outlined"
            hide-details
            :append-inner-icon="visibility.currentPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="toggleVisibility('currentPassword')"
            :type="visibility.currentPassword ? 'text' : 'password'"
            color="primary"
            clearable
          />
        </v-col>
         <v-col cols="12" md="8" class="mx-auto mt-4">
          <v-text-field
            label="New Password"
            variant="outlined"
            hide-details
            :append-inner-icon="visibility.newPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="toggleVisibility('newPassword')"
            :type="visibility.newPassword ? 'text' : 'password'"
            color="primary"
            clearable
          />
        </v-col>
        <v-col cols="12" md="8" class="mx-auto mt-4">
          <v-text-field
            label="Confirm Password"
            variant="outlined"
            hide-details
            :append-inner-icon="visibility.confirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="toggleVisibility('confirmPassword')"
            :type="visibility.confirmPassword ? 'text' : 'password'"
            color="primary"
            clearable
          />
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions class="d-flex justify-center">
      <v-btn
        variant="flat"
        color="primary"
        class="font-weight-bold"
      >Change Password</v-btn>
      <v-btn
        variant="outlined"
        color="secondary"
        class="font-weight-bold ml-4"
      >Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script setup lang="ts">
const visibility = ref({
  currentPassword: false,
  newPassword: false,
  confirmPassword: false
});

const toggleVisibility = (field: string) => {
  visibility.value[field] = !visibility.value[field];
};
</script>