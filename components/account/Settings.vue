<template>
  <v-card class="border-thin elevation-0 rounded-lg">
    <v-card-title class="text-subtitle-2 font-weight-bold border-b-thin pb-4">
      Email Settings
    </v-card-title>
    <v-card-text class="mt-4">
      <v-card class="border-b-thin elevation-0">
        <v-card-title class="text-subtitle-2 font-weight-bold">
          Notification Preferences
        </v-card-title>
        <v-card-text>
          <v-checkbox
            v-model="emailSettings.notifications"
            label="Receive notifications via email"
            color="primary"
            hide-details
          />
          <v-checkbox
            v-model="emailSettings.promotions"
            label="Receive promotional emails"
            color="primary"
            hide-details
          />
        </v-card-text>
      </v-card>

      <v-card class="mt-4 border-b-thin elevation-0">
        <v-card-title class="text-subtitle-2 font-weight-bold">
          Security Settings
        </v-card-title>
        <v-card-text>
          <v-checkbox
            v-model="securitySettings.twoFactor"
            label="Enable two-factor authentication"
            color="primary"
            hide-details
          />
          <v-checkbox
            v-model="securitySettings.loginAlerts"
            label="Send login alerts"
            color="primary"
            hide-details
          />
          <v-checkbox
            v-model="securitySettings.sessionTimeout"
            label="Auto logout after inactivity"
            color="primary"
            hide-details
          />
        </v-card-text>
      </v-card>

      <v-card class="mt-4 border-b-thin elevation-0">
        <v-card-title class="text-subtitle-2 font-weight-bold">
          Privacy Settings
        </v-card-title>
        <v-card-text>
          <v-checkbox
            v-model="privacySettings.profileVisibility"
            label="Make profile public"
            color="primary"
            hide-details
          />
          <v-checkbox
            v-model="privacySettings.dataCollection"
            label="Allow data collection for analytics"
            color="primary"
            hide-details
          />
          <v-checkbox
            v-model="privacySettings.activityTracking"
            label="Track activity for recommendations"
            color="primary"
            hide-details
          />
        </v-card-text>
      </v-card>

      <v-card class="mt-4 border-b-thin elevation-0">
        <v-card-title class="text-subtitle-2 font-weight-bold">
          Display Preferences
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-select
                v-model="displaySettings.theme"
                :items="themeOptions"
                label="Theme"
                variant="outlined"
                color="primary"
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="displaySettings.language"
                :items="languageOptions"
                label="Language"
                variant="outlined"
                color="primary"
                hide-details
              />
            </v-col>
          </v-row>
          <v-checkbox
            v-model="displaySettings.animations"
            label="Enable animations"
            color="primary"
            hide-details
            class="mt-3"
          />
          <v-checkbox
            v-model="displaySettings.compactMode"
            label="Compact mode"
            color="primary"
            hide-details
          />
        </v-card-text>
      </v-card>

      <v-card class="mt-4 border-b-thin elevation-0">
        <v-card-title class="text-subtitle-2 font-weight-bold">
          Communication Preferences
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-select
                v-model="communicationSettings.frequency"
                :items="frequencyOptions"
                label="Email Frequency"
                variant="outlined"
                color="primary"
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="communicationSettings.timezone"
                :items="timezoneOptions"
                label="Timezone"
                variant="outlined"
                color="primary"
                hide-details
              />
            </v-col>
          </v-row>
          <v-checkbox
            v-model="communicationSettings.weeklyDigest"
            label="Weekly activity digest"
            color="primary"
            hide-details
            class="mt-3"
          />
          <v-checkbox
            v-model="communicationSettings.socialUpdates"
            label="Social activity updates"
            color="primary"
            hide-details
          />
        </v-card-text>
      </v-card>

      <v-card class="mt-4 elevation-0">
        <v-card-title class="text-subtitle-2 font-weight-bold">
          Account Management
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="4">
              <v-btn
                variant="outlined"
                color="primary"
                block
                prepend-icon="mdi-download"
                @click="exportData"
              >
                Export Data
              </v-btn>
            </v-col>
            <v-col cols="12" md="4">
              <v-btn
                variant="outlined"
                color="warning"
                block
                prepend-icon="mdi-lock-reset"
                @click="resetPassword"
              >
                Reset Password
              </v-btn>
            </v-col>
            <v-col cols="12" md="4">
              <v-btn
                variant="outlined"
                color="error"
                block
                prepend-icon="mdi-account-remove"
                @click="deleteAccount"
              >
                Delete Account
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Save Settings Button -->
      <v-card-actions class="mt-4 px-0">
        <v-spacer />
        <v-btn
          variant="text"
          color="secondary"
          @click="resetSettings"
        >
          Reset to Default
        </v-btn>
        <v-btn
          variant="flat"
          color="primary"
          prepend-icon="mdi-content-save"
          @click="saveSettings"
        >
          Save Settings
        </v-btn>
      </v-card-actions>
      
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
// Email Settings
const emailSettings = ref({
  notifications: true,
  promotions: false
});

// Security Settings
const securitySettings = ref({
  twoFactor: false,
  loginAlerts: true,
  sessionTimeout: true
});

// Privacy Settings
const privacySettings = ref({
  profileVisibility: true,
  dataCollection: false,
  activityTracking: true
});

// Display Settings
const displaySettings = ref({
  theme: 'berry',
  language: 'en',
  animations: true,
  compactMode: false
});

// Communication Settings
const communicationSettings = ref({
  frequency: 'weekly',
  timezone: 'UTC',
  weeklyDigest: true,
  socialUpdates: true
});

// Dropdown Options
const themeOptions = [
  { title: 'Light Theme', value: 'berry' },
  { title: 'Dark Theme', value: 'berry-dark' },
  { title: 'Auto (System)', value: 'auto' }
];

const languageOptions = [
  { title: 'English', value: 'en' },
  { title: 'Spanish', value: 'es' },
  { title: 'French', value: 'fr' },
  { title: 'German', value: 'de' },
  { title: 'Japanese', value: 'ja' },
  { title: 'Korean', value: 'ko' }
];

const frequencyOptions = [
  { title: 'Never', value: 'never' },
  { title: 'Daily', value: 'daily' },
  { title: 'Weekly', value: 'weekly' },
  { title: 'Monthly', value: 'monthly' }
];

const timezoneOptions = [
  { title: 'UTC', value: 'UTC' },
  { title: 'Eastern Time (ET)', value: 'America/New_York' },
  { title: 'Pacific Time (PT)', value: 'America/Los_Angeles' },
  { title: 'Central European Time (CET)', value: 'Europe/Paris' },
  { title: 'Japan Standard Time (JST)', value: 'Asia/Tokyo' },
  { title: 'Australian Eastern Time (AET)', value: 'Australia/Sydney' }
];

// Functions
function saveSettings() {
  // Implement save functionality
  console.log('Saving settings:', {
    email: emailSettings.value,
    security: securitySettings.value,
    privacy: privacySettings.value,
    display: displaySettings.value,
    communication: communicationSettings.value
  });
  // You could emit an event or call an API here
  alert('Settings saved successfully!');
}

function resetSettings() {
  // Reset to default values
  emailSettings.value = {
    notifications: true,
    promotions: false
  };
  securitySettings.value = {
    twoFactor: false,
    loginAlerts: true,
    sessionTimeout: true
  };
  privacySettings.value = {
    profileVisibility: true,
    dataCollection: false,
    activityTracking: true
  };
  displaySettings.value = {
    theme: 'berry',
    language: 'en',
    animations: true,
    compactMode: false
  };
  communicationSettings.value = {
    frequency: 'weekly',
    timezone: 'UTC',
    weeklyDigest: true,
    socialUpdates: true
  };
  alert('Settings reset to default values!');
}

function exportData() {
  // Implement data export functionality
  console.log('Exporting user data...');
  alert('Data export initiated. You will receive an email when ready.');
}

function resetPassword() {
  // Implement password reset functionality
  console.log('Initiating password reset...');
  alert('Password reset email sent to your registered email address.');
}

function deleteAccount() {
  // Implement account deletion with confirmation
  if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
    console.log('Deleting account...');
    alert('Account deletion initiated. You will receive a confirmation email.');
  }
}
</script>