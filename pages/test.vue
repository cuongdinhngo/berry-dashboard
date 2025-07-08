<template>
  <v-container class="pa-6">
    <!-- Header Section -->
    <v-row class="mb-6">
      <v-col cols="12">
        <v-card class="pa-6 bg-primary text-white" elevation="4">
          <v-card-title class="text-h4 font-weight-bold">
            Welcome to Berry Dashboard Test Page
          </v-card-title>
          <v-card-subtitle class="text-white">
            Explore the beautiful components and features of the Berry Dashboard
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <!-- Statistics Cards -->
    <v-row class="mb-6">
      <v-col cols="12" sm="6" md="3">
        <v-card class="pa-4 text-center" elevation="2">
          <v-icon size="48" color="primary" class="mb-2">mdi-account-group</v-icon>
          <v-card-title class="text-h5">1,234</v-card-title>
          <v-card-subtitle>Total Users</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card class="pa-4 text-center" elevation="2">
          <v-icon size="48" color="success" class="mb-2">mdi-chart-line</v-icon>
          <v-card-title class="text-h5">$12,345</v-card-title>
          <v-card-subtitle>Revenue</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card class="pa-4 text-center" elevation="2">
          <v-icon size="48" color="warning" class="mb-2">mdi-shopping</v-icon>
          <v-card-title class="text-h5">567</v-card-title>
          <v-card-subtitle>Orders</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card class="pa-4 text-center" elevation="2">
          <v-icon size="48" color="error" class="mb-2">mdi-alert-circle</v-icon>
          <v-card-title class="text-h5">23</v-card-title>
          <v-card-subtitle>Issues</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <!-- Interactive Components -->
    <v-row class="mb-6">
      <v-col cols="12" md="6">
        <v-card class="pa-4" elevation="2">
          <v-card-title class="text-h6 mb-4">Interactive Form</v-card-title>
          <v-form>
            <v-text-field
              v-model="formData.name"
              label="Full Name"
              variant="outlined"
              color="primary"
              class="mb-3"
            ></v-text-field>
            <v-text-field
              v-model="formData.email"
              label="Email Address"
              variant="outlined"
              color="primary"
              type="email"
              class="mb-3"
            ></v-text-field>
            <v-select
              v-model="formData.role"
              :items="['Admin', 'User', 'Manager', 'Developer']"
              label="Role"
              variant="outlined"
              color="primary"
              class="mb-3"
            ></v-select>
            <v-textarea
              v-model="formData.message"
              label="Message"
              variant="outlined"
              color="primary"
              rows="3"
              class="mb-3"
            ></v-textarea>
            <v-btn color="primary" size="large" @click="submitForm">
              Submit Form
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="pa-4" elevation="2">
          <v-card-title class="text-h6 mb-4">Quick Actions</v-card-title>
          <v-row>
            <v-col cols="6">
              <v-btn
                color="primary"
                variant="tonal"
                size="large"
                block
                class="mb-3"
                @click="showAlert('Primary action clicked!')"
              >
                <v-icon left>mdi-plus</v-icon>
                Add New
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                color="secondary"
                variant="tonal"
                size="large"
                block
                class="mb-3"
                @click="showAlert('Secondary action clicked!')"
              >
                <v-icon left>mdi-download</v-icon>
                Download
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                color="success"
                variant="tonal"
                size="large"
                block
                class="mb-3"
                @click="showAlert('Success action clicked!')"
              >
                <v-icon left>mdi-check</v-icon>
                Approve
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                color="error"
                variant="tonal"
                size="large"
                block
                class="mb-3"
                @click="showAlert('Error action clicked!')"
              >
                <v-icon left>mdi-delete</v-icon>
                Delete
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- Data Table -->
    <v-row class="mb-6">
      <v-col cols="12">
        <v-card class="pa-4" elevation="2">
          <v-card-title class="text-h6 mb-4">Sample Data Table</v-card-title>
          <v-data-table
            :headers="headers"
            :items="tableData"
            :items-per-page="5"
            class="elevation-1"
          >
            <template v-slot:item.status="{ item }">
              <v-chip
                :color="getStatusColor(item.status)"
                variant="tonal"
                size="small"
              >
                {{ item.status }}
              </v-chip>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-btn
                color="primary"
                variant="text"
                size="small"
                @click="editItem(item)"
              >
                Edit
              </v-btn>
              <v-btn
                color="error"
                variant="text"
                size="small"
                @click="deleteItem(item)"
              >
                Delete
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- Charts Section -->
    <v-row class="mb-6">
      <v-col cols="12" md="8">
        <v-card class="pa-4" elevation="2">
          <v-card-title class="text-h6 mb-4">Progress Overview</v-card-title>
          <v-row>
            <v-col cols="12" sm="6" class="mb-4">
              <div class="text-subtitle-1 mb-2">Project Completion</div>
              <v-progress-linear
                :model-value="progressData.project"
                color="primary"
                height="8"
                rounded
              ></v-progress-linear>
              <div class="text-caption mt-1">{{ progressData.project }}% Complete</div>
            </v-col>
            <v-col cols="12" sm="6" class="mb-4">
              <div class="text-subtitle-1 mb-2">Team Performance</div>
              <v-progress-linear
                :model-value="progressData.team"
                color="success"
                height="8"
                rounded
              ></v-progress-linear>
              <div class="text-caption mt-1">{{ progressData.team }}% Complete</div>
            </v-col>
            <v-col cols="12" sm="6" class="mb-4">
              <div class="text-subtitle-1 mb-2">Budget Usage</div>
              <v-progress-linear
                :model-value="progressData.budget"
                color="warning"
                height="8"
                rounded
              ></v-progress-linear>
              <div class="text-caption mt-1">{{ progressData.budget }}% Used</div>
            </v-col>
            <v-col cols="12" sm="6" class="mb-4">
              <div class="text-subtitle-1 mb-2">Quality Score</div>
              <v-progress-linear
                :model-value="progressData.quality"
                color="info"
                height="8"
                rounded
              ></v-progress-linear>
              <div class="text-caption mt-1">{{ progressData.quality }}% Score</div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="pa-4" elevation="2">
          <v-card-title class="text-h6 mb-4">Recent Activity</v-card-title>
          <v-timeline density="compact" class="mt-4">
            <v-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :dot-color="activity.color"
              size="small"
            >
              <template v-slot:opposite>
                <span class="text-caption">{{ activity.time }}</span>
              </template>
              <div class="text-subtitle-2">{{ activity.title }}</div>
              <div class="text-caption">{{ activity.description }}</div>
            </v-timeline-item>
          </v-timeline>
        </v-card>
      </v-col>
    </v-row>

    <!-- Snackbar for notifications -->
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="3000"
    >
      {{ snackbar.message }}
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
// Reactive form data
const formData = ref({
  name: '',
  email: '',
  role: '',
  message: ''
})

// Snackbar notification
const snackbar = ref({
  show: false,
  message: '',
  color: 'success'
})

// Progress data
const progressData = ref({
  project: 75,
  team: 88,
  budget: 60,
  quality: 92
})

// Table headers
const headers = ref([
  { title: 'Name', key: 'name', sortable: true },
  { title: 'Email', key: 'email', sortable: true },
  { title: 'Role', key: 'role', sortable: true },
  { title: 'Status', key: 'status', sortable: true },
  { title: 'Actions', key: 'actions', sortable: false }
])

// Sample table data
const tableData = ref([
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
    status: 'Inactive'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'Manager',
    status: 'Active'
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    role: 'Developer',
    status: 'Pending'
  },
  {
    id: 5,
    name: 'Tom Brown',
    email: 'tom@example.com',
    role: 'User',
    status: 'Active'
  }
])

// Activity timeline data
const activities = ref([
  {
    title: 'New user registered',
    description: 'John Doe has joined the platform',
    time: '2 min ago',
    color: 'success'
  },
  {
    title: 'Project updated',
    description: 'Berry Dashboard v2.0 progress updated',
    time: '15 min ago',
    color: 'primary'
  },
  {
    title: 'System maintenance',
    description: 'Scheduled backup completed successfully',
    time: '1 hour ago',
    color: 'info'
  },
  {
    title: 'Security alert',
    description: 'Unusual login activity detected',
    time: '2 hours ago',
    color: 'warning'
  },
  {
    title: 'Server issue',
    description: 'Database connection timeout resolved',
    time: '3 hours ago',
    color: 'error'
  }
])

// Methods
function submitForm() {
  if (formData.value.name && formData.value.email) {
    showAlert('Form submitted successfully!', 'success')
    // Reset form
    formData.value = {
      name: '',
      email: '',
      role: '',
      message: ''
    }
  } else {
    showAlert('Please fill in all required fields', 'error')
  }
}

function showAlert(message: string, color: string = 'info') {
  snackbar.value = {
    show: true,
    message,
    color
  }
}

function getStatusColor(status: string) {
  const colors: Record<string, string> = {
    'Active': 'success',
    'Inactive': 'error',
    'Pending': 'warning'
  }
  return colors[status] || 'grey'
}

function editItem(item: any) {
  showAlert(`Editing ${item.name}`, 'info')
}

function deleteItem(item: any) {
  showAlert(`Deleting ${item.name}`, 'error')
}

// Meta for page
useHead({
  title: 'Test Page - Berry Dashboard',
  meta: [
    { name: 'description', content: 'Test page showcasing Berry Dashboard components' }
  ]
})
</script>

<style scoped>
/* Add any component-specific styles here */
</style>