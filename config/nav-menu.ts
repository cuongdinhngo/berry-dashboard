export const NAV_MENU = [
  {
    head: 'Dashboard',
    items: [
      {
        title: 'Default',
        icon: 'mdi-view-dashboard',
        value: 'dashboard-default',
      },
      {
        title: 'Analytics',
        icon: 'mdi-chart-bar',
        value: 'dashboard-analytics',
      },
    ]
  },
  {
    head: 'Applications',
    items: [
      {
        title: 'Users',
        icon: 'mdi-account',
        subItems: [
          {
            title: 'Social Profile',
            value: 'users-social-profile',
          },
          {
            title: 'Accounts',
            value: 'users-accounts',
          },
          {
            title: 'Cards',
            value: 'users-cards',
          },
          {
            title: 'List',
            value: 'users-list',
          },
        ]
      },
      {
        title: 'Customers',
        icon: 'mdi-account-multiple',
        subItems: [
          {
            title: 'Customer List',
            value: 'customers-list',
          },
          {
            title: 'Create Invoice',
            value: 'customers-create-invoice',
          },
          {
            title: 'Order Details',
            value: 'customers-order-details',
          },
          {
            title: 'Product List',
            value: 'customers-product-list',
          },
        ]
      },
      {
        title: 'Chat',
        icon: 'mdi-chat',
        value: 'chat',
      },
      {
        title: 'Calendar',
        icon: 'mdi-calendar',
        value: 'calendar',
      },
      {
        title: 'Mail',
        icon: 'mdi-email',
        value: 'mail',
      },
      {
        title: 'Kanban',
        icon: 'mdi-view-dashboard-variant-outline',
        value: 'kanban',
      },
      {
        title: 'Contact',
        icon: 'mdi-card-account-details-outline',
        subItems: [
          {
            title: 'Card',
            value: 'contact-card',
          },
          {
            title: 'List',
            value: 'contact-list',
          },
        ]
      },
      {
        title: 'E-Commerce',
        icon: 'mdi-cart',
        subItems: [
          {
            title: 'Products',
            value: 'ecommerce-products',
          },
          {
            title: 'Product Details',
            value: 'ecommerce-product-details',
          },
          {
            title: 'Product List',
            value: 'ecommerce-product-list',
          },
          {
            title: 'Checkout',
            value: 'ecommerce-checkout',
          },
        ]
      }
    ]
  }
];